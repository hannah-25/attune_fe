import { getJournals, getJournalTags } from '../api/journal';
import { getMedications, getAllMedicationLogs, type MedicationPeriodLog } from '../api/medication';
import { getSchedules, getScheduleCategories } from '../api/schedule';
import { getReports } from '../api/medicationAnalysis';
import { getConsultations } from '../api/consultation';
import { getMyProfile, getUserSettings } from '../api/user';
import { apiRequest, ApiError, getAccessToken } from '../api/client';
import { db, type SyncQueueItem } from './db';
import { toLocalDateString, parseLocalDate, toLocalDateStringFromTimestamp } from './pathUtils';

export const syncEvents = new EventTarget();

// 짧은 오프라인 창(터널·엘리베이터 등)을 가정 — 장기 열람용 캐시는 두지 않는다.
const CACHE_PERIOD_DAYS = 30;
const SCHEDULE_FUTURE_DAYS = 14;
const MAX_SYNC_RETRY_COUNT = 5;
let isFlushing = false;

// 큐 보존(preserveQueue) 시 비우지 않을 테이블 — 아직 서버에 못 보낸 오프라인 쓰기.
const QUEUE_TABLES = ['syncQueue'];

async function clearTables(preserveQueue: boolean): Promise<void> {
  const tables = preserveQueue
    ? db.tables.filter(table => !QUEUE_TABLES.includes(table.name))
    : db.tables;
  await db.transaction('rw', tables, async () => {
    await Promise.all(tables.map(table => table.clear()));
  });
}

// 서버가 명시적으로 해당 쓰기를 거부한 상태코드 (재시도하지 않음)
function isPermanentError(status: number): boolean {
  return [400, 403, 404, 409, 410, 422].includes(status);
}

function createEmptyLogsByDate(startDate: string, endDate: string): Map<string, MedicationPeriodLog[]> {
  const byDate = new Map<string, MedicationPeriodLog[]>();
  const cursor = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);
  if (!cursor || !end) return byDate;

  while (cursor <= end) {
    byDate.set(toLocalDateString(cursor), []);
    cursor.setDate(cursor.getDate() + 1);
  }

  return byDate;
}

function getCacheRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - CACHE_PERIOD_DAYS);
  return {
    startDate: toLocalDateString(start),
    endDate: toLocalDateString(end),
  };
}

function isSameSession(sessionToken: string): boolean {
  return getAccessToken() === sessionToken;
}

async function cacheJournals(sessionToken: string) {
  const { startDate, endDate } = getCacheRange();
  const response = await getJournals({ startDate, endDate });
  await db.transaction('rw', [db.activeTags, db.journals], async () => {
    if (!isSameSession(sessionToken)) return;
    const now = new Date().toISOString();
    await db.activeTags.put({ id: 'tags', data: response.activeTags, cachedAt: now });
    await db.journals.bulkPut(
      response.journals.map(j => ({ date: j.date, checked: j.checked, cachedAt: now })),
    );
  });
}

async function cacheJournalTags(sessionToken: string) {
  const [conditions, sideEffects, troubles] = await Promise.all([
    getJournalTags('CONDITION'),
    getJournalTags('SIDE_EFFECT'),
    getJournalTags('TROUBLE'),
  ]);
  await db.transaction('rw', db.journalTagsByCategory, async () => {
    if (!isSameSession(sessionToken)) return;
    const now = new Date().toISOString();
    await db.journalTagsByCategory.bulkPut([
      { category: 'CONDITION', data: conditions, cachedAt: now },
      { category: 'SIDE_EFFECT', data: sideEffects, cachedAt: now },
      { category: 'TROUBLE', data: troubles, cachedAt: now },
    ]);
  });
}

async function cacheMedications(sessionToken: string) {
  const { startDate, endDate } = getCacheRange();
  const now = new Date().toISOString();

  const [meds, logsResponse] = await Promise.all([
    getMedications(),
    getAllMedicationLogs({ startDate, endDate }),
  ]);
  await db.transaction('rw', [db.medications, db.medicationLogs], async () => {
    if (!isSameSession(sessionToken)) return;
    await db.medications.put({ id: 'list', data: meds, cachedAt: now });

    if (Array.isArray(logsResponse?.logs)) {
      const byDate = createEmptyLogsByDate(startDate, endDate);
      for (const log of logsResponse.logs) {
        if (typeof log?.intakeTime !== 'string') continue;
        const date = toLocalDateStringFromTimestamp(log.intakeTime);
        if (!date) continue;
        if (!byDate.has(date)) byDate.set(date, []);
        byDate.get(date)!.push(log);
      }
      await db.medicationLogs.bulkPut(
        [...byDate.entries()].map(([date, data]) => ({ date, data, cachedAt: now })),
      );
    }
  });
}

async function cacheSchedules(sessionToken: string) {
  const start = new Date();
  start.setDate(start.getDate() - CACHE_PERIOD_DAYS);
  const end = new Date();
  end.setDate(end.getDate() + SCHEDULE_FUTURE_DAYS);
  const startDate = toLocalDateString(start);
  const endDate = toLocalDateString(end);
  const now = new Date().toISOString();

  const [catsResponse, schedsResponse] = await Promise.all([
    getScheduleCategories(),
    getSchedules({ startDate, endDate }),
  ]);
  // 일정은 무한히 쌓이지 않도록 매번 초기화 후 재적재. scheduleDetails는 조회 캐시이므로 유지.
  await db.transaction('rw', [db.scheduleCategories, db.schedules], async () => {
    if (!isSameSession(sessionToken)) return;
    await db.scheduleCategories.put({ id: 'categories', data: catsResponse.categories, cachedAt: now });
    await db.schedules.clear();
    await db.schedules.bulkPut(
      schedsResponse.schedules.map(s => ({
        scheduleId: s.scheduleId,
        startTime: s.startTime,
        endTime: s.endTime ?? s.startTime,
        data: s,
        cachedAt: now,
      })),
    );
  });
}

async function cacheReports(sessionToken: string) {
  const reports = await getReports();
  await db.transaction('rw', db.reports, async () => {
    if (!isSameSession(sessionToken)) return;
    await db.reports.put({ id: 'list', data: reports, cachedAt: new Date().toISOString() });
  });
}

async function cacheConsultations(sessionToken: string) {
  const { startDate, endDate } = getCacheRange();
  const items = await getConsultations({ startDate, endDate });
  await db.transaction('rw', db.consultations, async () => {
    if (!isSameSession(sessionToken)) return;
    await db.consultations.put({
      id: 'list',
      data: items,
      cachedAt: new Date().toISOString(),
    });
  });
}

async function cacheUser(sessionToken: string) {
  const [profile, settings] = await Promise.all([
    getMyProfile(),
    getUserSettings(),
  ]);
  await db.transaction('rw', [db.userProfile, db.userSettings], async () => {
    if (!isSameSession(sessionToken)) return;
    const now = new Date().toISOString();
    await Promise.all([
      db.userProfile.put({ id: 'profile', data: profile, cachedAt: now }),
      db.userSettings.put({ id: 'settings', data: settings, cachedAt: now }),
    ]);
  });
}

async function pruneOldCache() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - CACHE_PERIOD_DAYS);
  const cutoffStr = toLocalDateString(cutoff);
  const cutoffTimestamp = cutoff.toISOString();
  await Promise.all([
    db.journals.where('date').below(cutoffStr).delete(),
    db.medicationLogs.where('date').below(cutoffStr).delete(),
    db.scheduleDetails.toCollection().filter(x => x.cachedAt < cutoffTimestamp).delete(),
    db.consultationDetails.toCollection().filter(x => x.cachedAt < cutoffTimestamp).delete(),
  ]);
}

// 오프라인에서 쌓인 쓰기 큐를 입력 순서(FIFO)대로 서버에 재전송한다.
// 각 항목은 서로 독립적이므로 의존성 해소·ID 재작성이 필요 없다.
async function replaySyncQueue(): Promise<void> {
  if (isFlushing) return;
  isFlushing = true;

  try {
    const initialPending = await db.syncQueue.where('status').equals('pending').count();
    if (initialPending === 0) return;

    syncEvents.dispatchEvent(new Event('sync-start'));

    let allFlushed = true;

    while (navigator.onLine) {
      const [item] = await db.syncQueue.where('status').equals('pending').sortBy('id');
      if (!item) break;

      try {
        await apiRequest<unknown>(item.path, { method: item.method, body: item.body, offlineFallback: false });
        await db.syncQueue.delete(item.id!);
      } catch (err) {
        if (err instanceof ApiError && isPermanentError(err.status)) {
          await db.syncQueue.update(item.id!, { status: 'failed' as const });
          continue;
        }
        if (err instanceof ApiError) {
          const nextRetryCount = item.retryCount + 1;
          await db.syncQueue.update(item.id!, {
            retryCount: nextRetryCount,
            ...(nextRetryCount >= MAX_SYNC_RETRY_COUNT ? { status: 'failed' as const } : {}),
          });
        }
        allFlushed = false;
        break;
      }
    }

    if (!navigator.onLine) allFlushed = false;
    if (allFlushed) syncEvents.dispatchEvent(new Event('sync-complete'));
  } finally {
    isFlushing = false;
  }
}

let isInitializing = false;
let listeningStarted = false;

export const SyncService = {
  async initialize(): Promise<void> {
    const sessionToken = getAccessToken();
    if (isInitializing || !navigator.onLine || !sessionToken) return;
    isInitializing = true;

    try {
      await replaySyncQueue();
      await Promise.allSettled([
        cacheJournals(sessionToken),
        cacheJournalTags(sessionToken),
        cacheMedications(sessionToken),
        cacheSchedules(sessionToken),
        cacheReports(sessionToken),
        cacheConsultations(sessionToken),
        cacheUser(sessionToken),
      ]);
      if (!isSameSession(sessionToken)) return;
      await pruneOldCache();
    } finally {
      isInitializing = false;
    }
  },

  startListening(): void {
    if (listeningStarted) return;
    listeningStarted = true;

    window.addEventListener('online', async () => {
      await replaySyncQueue();
      await SyncService.initialize();
    });
  },

  async addToQueue(item: Omit<SyncQueueItem, 'id' | 'retryCount' | 'status'>): Promise<void> {
    await db.syncQueue.add({ ...item, retryCount: 0, status: 'pending' });
  },

  async getPendingCount(): Promise<number> {
    return db.syncQueue.where('status').equals('pending').count();
  },

  // 개인정보를 즉시 삭제한다(동기화 진행 여부와 무관).
  // preserveQueue=true(세션 만료 등 같은 사용자 재로그인)일 때만 미전송 오프라인 쓰기 큐를 남긴다.
  // 명시적 로그아웃/탈퇴는 계정 전환 가능성이 있으므로 큐까지 비워 다른 사용자 계정으로 재전송되는 것을 막는다.
  async clearAllCache(options: { preserveQueue?: boolean } = {}): Promise<void> {
    await clearTables(options.preserveQueue ?? false);
  },
};

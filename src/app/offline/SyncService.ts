import { getJournals, getJournalTags } from '../api/journal';
import { getMedications, getAllMedicationLogs, type MedicationPeriodLog } from '../api/medication';
import { getSchedules, getScheduleCategories } from '../api/schedule';
import { getReports } from '../api/medicationAnalysis';
import { getConsultations } from '../api/consultation';
import { getMyProfile, getUserSettings } from '../api/user';
import { apiRequest, ApiError, getAccessToken } from '../api/client';
import { db, type LocalEntityType, type SyncQueueItem } from './db';
import { toLocalDateString, parseLocalDate, toLocalDateStringFromTimestamp } from './pathUtils';

export const syncEvents = new EventTarget();

const CACHE_PERIOD_DAYS = 90;
const MAX_SYNC_RETRY_COUNT = 5;
let isFlushing = false;

// 큐 보존(preserveQueue) 시 비우지 않을 테이블.
// syncQueue: 아직 서버에 못 보낸 오프라인 쓰기, syncEntityMap: 그 쓰기의 임시ID→서버ID 의존성 매핑.
const QUEUE_TABLES = ['syncQueue', 'syncEntityMap'];

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

function get3MonthRange() {
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

function entityMapKey(localEntityType: LocalEntityType, localEntityId: number): string {
  return `${localEntityType}:${localEntityId}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readNumberFromPayload(payload: unknown, keys: string[]): number | null {
  if (!isRecord(payload)) return null;

  for (const key of keys) {
    const value = payload[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
  }

  for (const nestedKey of ['data', 'result']) {
    const value = readNumberFromPayload(payload[nestedKey], keys);
    if (value != null) return value;
  }

  return null;
}

function serverIdKeys(localEntityType: LocalEntityType): string[] {
  switch (localEntityType) {
    case 'journalTag':
      return ['tagId'];
    case 'journalGoal':
      return ['goalId'];
    case 'schedule':
      return ['scheduleId'];
    case 'consultation':
      return ['consultationId'];
    case 'consultationQuestion':
      return ['questionId'];
    case 'medication':
      return ['userMedicationId'];
  }
}

async function rememberEntityMap(item: SyncQueueItem, response: unknown): Promise<void> {
  if (item.method !== 'POST' || !item.localEntityType || item.localEntityId == null) return;

  const serverEntityId = readNumberFromPayload(response, serverIdKeys(item.localEntityType));
  if (serverEntityId == null) return;

  await db.syncEntityMap.put({
    key: entityMapKey(item.localEntityType, item.localEntityId),
    localEntityType: item.localEntityType,
    localEntityId: item.localEntityId,
    serverEntityId,
    createdAt: new Date().toISOString(),
  });
}

type ResolvedQueueItem =
  | { status: 'ready'; path: string; body: unknown }
  | { status: 'waiting' }
  | { status: 'missing-dependency' };

async function hasPendingCreate(localEntityType: LocalEntityType, localEntityId: number): Promise<boolean> {
  const count = await db.syncQueue
    .where('status')
    .equals('pending')
    .filter(item =>
      item.method === 'POST'
      && item.localEntityType === localEntityType
      && item.localEntityId === localEntityId)
    .count();
  return count > 0;
}

async function resolveQueueItem(item: SyncQueueItem): Promise<ResolvedQueueItem> {
  const localEntityType = item.dependsOnLocalEntityType;
  const localEntityId = item.dependsOnLocalEntityId;
  if (!localEntityType || localEntityId == null) {
    return { status: 'ready', path: item.path, body: item.body };
  }

  const mapped = await db.syncEntityMap.get(entityMapKey(localEntityType, localEntityId));
  if (!mapped) {
    return await hasPendingCreate(localEntityType, localEntityId)
      ? { status: 'waiting' }
      : { status: 'missing-dependency' };
  }

  const path = item.rewritePathTemplate
    ? item.rewritePathTemplate.replace('{id}', String(mapped.serverEntityId))
    : item.path.replace(String(localEntityId), String(mapped.serverEntityId));

  if (!isRecord(item.body) || !item.rewriteBodyFields?.length) {
    return { status: 'ready', path, body: item.body };
  }

  const body = { ...item.body };
  for (const field of item.rewriteBodyFields) {
    body[field] = mapped.serverEntityId;
  }

  return { status: 'ready', path, body };
}

async function cacheJournals(sessionToken: string) {
  const { startDate, endDate } = get3MonthRange();
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
  const { startDate, endDate } = get3MonthRange();
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
  end.setDate(end.getDate() + CACHE_PERIOD_DAYS);
  const startDate = toLocalDateString(start);
  const endDate = toLocalDateString(end);
  const now = new Date().toISOString();

  const [catsResponse, schedsResponse] = await Promise.all([
    getScheduleCategories(),
    getSchedules({ startDate, endDate }),
  ]);
  // 동적 일정 교체: 미래의 일정은 무한히 쌓이지 않도록 매번 초기화
  // scheduleDetails는 지우지 않음: 사용자가 조회한 상세 캐시는 살려둠
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
  const { startDate, endDate } = get3MonthRange();
  const items = await getConsultations({ startDate, endDate });
  await db.transaction('rw', db.consultations, async () => {
    if (!isSameSession(sessionToken)) return;
    await db.consultations.put({ id: 'list', data: items, cachedAt: new Date().toISOString() });
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
    // 동기화 완료된 임시→서버 ID 매핑은 무한 증가 + ID 재활용 오염을 막기 위해 만료 정리
    db.syncEntityMap.toCollection().filter(x => x.createdAt < cutoffTimestamp).delete(),
  ]);
}

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
        const resolved = await resolveQueueItem(item);
        if (resolved.status === 'waiting') {
          allFlushed = false;
          break;
        }
        if (resolved.status === 'missing-dependency') {
          // 의존 대상이 영구 실패한 항목 — terminal('failed')로 종결.
          // 다시 시도되지 않으므로 allFlushed를 막지 않는다(나머지 큐는 정상 완료 가능).
          await db.syncQueue.update(item.id!, { status: 'failed' as const });
          continue;
        }

        const response = await apiRequest<unknown>(resolved.path, { method: item.method, body: resolved.body, offlineFallback: false });
        await rememberEntityMap(item, response);
        await db.syncQueue.delete(item.id!);
      } catch (err) {
        if (err instanceof ApiError && isPermanentError(err.status)) {
          await db.syncQueue.update(item.id!, { status: 'failed' as const });
        } else {
          const nextRetryCount = item.retryCount + 1;
          await db.syncQueue.update(item.id!, {
            retryCount: nextRetryCount,
            ...(nextRetryCount >= MAX_SYNC_RETRY_COUNT ? { status: 'failed' as const } : {}),
          });
          allFlushed = false;
          break;
        }
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

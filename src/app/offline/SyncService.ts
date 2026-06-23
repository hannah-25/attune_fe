import { getJournals, getJournalTags } from '../api/journal';
import { getMedications, getAllMedicationLogs } from '../api/medication';
import { getSchedules, getScheduleCategories } from '../api/schedule';
import { getReports } from '../api/medicationAnalysis';
import { getConsultations } from '../api/consultation';
import { apiRequest, ApiError } from '../api/client';
import { db, type SyncQueueItem } from './db';

export const syncEvents = new EventTarget();

const CACHE_PERIOD_DAYS = 90;

// 서버가 명시적으로 해당 쓰기를 거부한 상태코드 — 재시도해도 의미 없음
function isPermanentError(status: number): boolean {
  return [400, 404, 409, 410, 422].includes(status);
}

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
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

async function cacheJournals() {
  const { startDate, endDate } = get3MonthRange();
  const response = await getJournals({ startDate, endDate });
  const now = new Date().toISOString();

  await db.activeTags.put({ id: 'tags', data: response.activeTags, cachedAt: now });
  await db.journals.bulkPut(
    response.journals.map(j => ({ date: j.date, checked: j.checked, cachedAt: now })),
  );
}

async function cacheJournalTags() {
  const now = new Date().toISOString();
  const [conditions, sideEffects, troubles] = await Promise.all([
    getJournalTags('CONDITION'),
    getJournalTags('SIDE_EFFECT'),
    getJournalTags('TROUBLE'),
  ]);
  await db.journalTagsByCategory.bulkPut([
    { category: 'CONDITION', data: conditions, cachedAt: now },
    { category: 'SIDE_EFFECT', data: sideEffects, cachedAt: now },
    { category: 'TROUBLE', data: troubles, cachedAt: now },
  ]);
}

async function cacheMedications() {
  const { startDate, endDate } = get3MonthRange();
  const now = new Date().toISOString();

  const [meds, logsResponse] = await Promise.all([
    getMedications(),
    getAllMedicationLogs({ startDate, endDate }),
  ]);

  await db.medications.put({ id: 'list', data: meds, cachedAt: now });

  const byDate = new Map<string, typeof logsResponse.logs>();
  for (const log of logsResponse.logs) {
    const date = log.intakeTime.slice(0, 10);
    if (!byDate.has(date)) byDate.set(date, []);
    byDate.get(date)!.push(log);
  }
  await db.medicationLogs.bulkPut(
    [...byDate.entries()].map(([date, data]) => ({ date, data, cachedAt: now })),
  );
}

async function cacheSchedules() {
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

  await db.scheduleCategories.put({ id: 'categories', data: catsResponse.categories, cachedAt: now });

  // 누적 대신 교체: 오래된 일정이 무한히 쌓이지 않도록 매번 초기화
  // scheduleDetails는 유지 — 사용자가 조회한 상세 캐시를 살려둠
  await db.transaction('rw', db.schedules, async () => {
    await db.schedules.clear();
    await db.schedules.bulkPut(
      schedsResponse.schedules.map(s => ({
        scheduleId: s.scheduleId,
        startTime: s.startTime,
        endTime: s.endTime,
        data: s,
        cachedAt: now,
      })),
    );
  });
}

async function cacheReports() {
  const reports = await getReports();
  await db.reports.put({ id: 'list', data: reports, cachedAt: new Date().toISOString() });
}

async function cacheConsultations() {
  const { startDate, endDate } = get3MonthRange();
  const items = await getConsultations({ startDate, endDate });
  await db.consultations.put({ id: 'list', data: items, cachedAt: new Date().toISOString() });
}

async function pruneOldCache() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - CACHE_PERIOD_DAYS);
  const cutoffStr = toLocalDateString(cutoff);
  await Promise.all([
    db.journals.where('date').below(cutoffStr).delete(),
    db.medicationLogs.where('date').below(cutoffStr).delete(),
  ]);
}

async function flushSyncQueue(): Promise<void> {
  const pending = await db.syncQueue.where('status').equals('pending').sortBy('id');
  if (pending.length === 0) return;

  syncEvents.dispatchEvent(new Event('sync-start'));

  let allFlushed = true;

  for (const item of pending) {
    if (!navigator.onLine) { allFlushed = false; break; }

    try {
      // apiRequest 사용으로 401 시 토큰 자동 갱신 + 재시도가 보장됨
      await apiRequest(item.path, { method: item.method, body: item.body });
      await db.syncQueue.delete(item.id!);
    } catch (err) {
      if (err instanceof ApiError && isPermanentError(err.status)) {
        // 서버가 명확히 거부한 요청 (404, 409, 422 등) — 더 이상 재시도 불필요
        await db.syncQueue.delete(item.id!);
      } else {
        // 429, 5xx, 네트워크 오류, 401(토큰 재발급도 실패) — 보존 후 중단
        await db.syncQueue.update(item.id!, { retryCount: item.retryCount + 1 });
        allFlushed = false;
        break;
      }
    }
  }

  // 큐가 실제로 모두 처리됐을 때만 complete 발화
  if (allFlushed) {
    syncEvents.dispatchEvent(new Event('sync-complete'));
  }
}

let isInitializing = false;
let listeningStarted = false;

export const SyncService = {
  async initialize(): Promise<void> {
    if (isInitializing || !navigator.onLine) return;
    isInitializing = true;

    try {
      await Promise.allSettled([
        cacheJournals(),
        cacheJournalTags(),
        cacheMedications(),
        cacheSchedules(),
        cacheReports(),
        cacheConsultations(),
      ]);
      await pruneOldCache();
    } finally {
      isInitializing = false;
    }
  },

  startListening(): void {
    if (listeningStarted) return;
    listeningStarted = true;

    window.addEventListener('online', async () => {
      await flushSyncQueue();
      await SyncService.initialize();
    });
  },

  async addToQueue(item: Omit<SyncQueueItem, 'id' | 'retryCount' | 'status'>): Promise<void> {
    await db.syncQueue.add({ ...item, retryCount: 0, status: 'pending' });
  },

  async getPendingCount(): Promise<number> {
    return db.syncQueue.where('status').equals('pending').count();
  },
};

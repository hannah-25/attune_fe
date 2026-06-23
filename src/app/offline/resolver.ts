import { db } from './db';
import { SyncService } from './SyncService';
import { cleanPath, searchParams } from './pathUtils';
import type { ApiRequestOptions } from '../api/client';
import type { SyncQueueItem } from './db';

export class OfflineCacheMissError extends Error {
  constructor(path: string) {
    super(`오프라인 캐시 없음: ${path}`);
    this.name = 'OfflineCacheMissError';
  }
}

type WriteMethod = SyncQueueItem['method'];

// path는 쿼리 스트링 포함 전체 경로를 보존해야 재전송 시 파라미터가 유지됨
async function queueWrite(method: WriteMethod, path: string, body: unknown): Promise<void> {
  await SyncService.addToQueue({ method, path, body, localTimestamp: new Date().toISOString() });
}

export async function resolveOfflineRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const method = ((options.method as string | undefined) ?? 'GET').toUpperCase();
  const base = cleanPath(path);
  const params = searchParams(path);
  const body = options.body;

  // ── Journal tags (must come before /v1/journals/:date to avoid false match) ─

  if (base === '/v1/journals/tags') {
    if (method === 'GET') {
      const category = params.get('category') as 'CONDITION' | 'SIDE_EFFECT' | 'TROUBLE' | null;
      if (!category) throw new OfflineCacheMissError(path);
      const cached = await db.journalTagsByCategory.get(category);
      if (!cached) throw new OfflineCacheMissError(path);
      return cached.data as T;
    }
    await queueWrite('POST', path, body);
    return {} as T;
  }

  // /v1/journals/tags/:tagId/preference  (PATCH)
  const tagPrefMatch = base.match(/^\/v1\/journals\/tags\/(\d+)\/preference$/);
  if (tagPrefMatch) {
    await queueWrite('PATCH', path, body);
    return undefined as T;
  }

  // /v1/journals/tags/:tagId  (DELETE)
  const tagDeleteMatch = base.match(/^\/v1\/journals\/tags\/(\d+)$/);
  if (tagDeleteMatch && method === 'DELETE') {
    await queueWrite('DELETE', path, body);
    return undefined as T;
  }

  // /v1/journals/tags/:tagId/checks  (POST / DELETE)
  const tagChecksMatch = base.match(/^\/v1\/journals\/tags\/(\d+)\/checks$/);
  if (tagChecksMatch) {
    await queueWrite(method as WriteMethod, path, body);
    return {} as T;
  }

  // /v1/journals/dates
  if (base === '/v1/journals/dates') {
    if (method === 'GET') {
      const startDate = params.get('startDate') ?? '';
      const endDate = params.get('endDate') ?? '';
      const all = await db.journals.where('date').between(startDate, endDate, true, true).toArray();
      return { dates: all.map(j => j.date) } as T;
    }
  }

  // /v1/journals  (bulk)
  if (base === '/v1/journals') {
    if (method === 'GET') {
      const startDate = params.get('startDate') ?? '';
      const endDate = params.get('endDate') ?? '';
      const [journals, tagsCache] = await Promise.all([
        db.journals.where('date').between(startDate, endDate, true, true).toArray(),
        db.activeTags.get('tags'),
      ]);
      return {
        activeTags: tagsCache?.data ?? { conditions: [], sideEffects: [], troubles: [], goals: [] },
        journals: journals.map(j => ({ date: j.date, checked: j.checked })),
      } as T;
    }
    if (method === 'DELETE') {
      await queueWrite('DELETE', path, body);
      return undefined as T;
    }
  }

  // /v1/journals/goals  (POST / PATCH / DELETE)
  if (base === '/v1/journals/goals') {
    await queueWrite(method as WriteMethod, path, body);
    return {} as T;
  }

  // /v1/journals/goals/:id
  const journalGoalMatch = base.match(/^\/v1\/journals\/goals\/(\d+)$/);
  if (journalGoalMatch) {
    await queueWrite(method as WriteMethod, path, body);
    return {} as T;
  }

  // /v1/journals/:date  and sub-paths (/memo, /sleep-meal, /goals)
  const journalDateMatch = base.match(/^\/v1\/journals\/([0-9]{4}-[0-9]{2}-[0-9]{2})(\/.*)?$/);
  if (journalDateMatch) {
    const date = journalDateMatch[1];
    const sub = journalDateMatch[2] ?? '';

    if (method === 'GET' && !sub) {
      const [journal, tagsCache] = await Promise.all([
        db.journals.get(date),
        db.activeTags.get('tags'),
      ]);
      if (!journal) return null as T;
      return {
        activeTags: tagsCache?.data ?? { conditions: [], sideEffects: [], troubles: [], goals: [] },
        checked: journal.checked,
      } as T;
    }

    if (method !== 'GET') {
      await queueWrite(method as WriteMethod, path, body);
      return {} as T;
    }
  }

  // ── Medication ──────────────────────────────────────────────────────────

  if (base === '/v1/user-medications' && method === 'GET') {
    const cached = await db.medications.get('list');
    if (!cached) throw new OfflineCacheMissError(path);
    return cached.data as T;
  }

  if (base === '/v1/user-medications/logs' && method === 'GET') {
    const startDate = params.get('startDate') ?? '';
    const endDate = params.get('endDate') ?? '';
    const cached = await db.medicationLogs.where('date').between(startDate, endDate, true, true).toArray();
    return { logs: cached.flatMap(c => c.data) } as T;
  }

  // /v1/user-medications/:id/log/quick
  const quickLogMatch = base.match(/^\/v1\/user-medications\/(\d+)\/log\/quick$/);
  if (quickLogMatch && method === 'POST') {
    await queueWrite('POST', path, body);
    const action = (typeof body === 'object' && body !== null && 'action' in body)
      ? (body as { action?: unknown }).action
      : undefined;
    return { logId: 0, action, recordedAt: new Date().toISOString() } as T;
  }

  // /v1/user-medications/:id  (PATCH)
  const userMedMatch = base.match(/^\/v1\/user-medications\/(\d+)$/);
  if (userMedMatch && method === 'PATCH') {
    await queueWrite('PATCH', path, body);
    return {} as T;
  }

  // ── Schedule ────────────────────────────────────────────────────────────

  if (base === '/v1/schedule-categories') {
    if (method === 'GET') {
      const cached = await db.scheduleCategories.get('categories');
      if (!cached) throw new OfflineCacheMissError(path);
      return { categories: cached.data } as T;
    }
    await queueWrite(method as WriteMethod, path, body);
    return {} as T;
  }

  if (base === '/v1/schedules') {
    if (method === 'GET') {
      const startDate = params.get('startDate') ?? '';
      const endDate = params.get('endDate') ?? '';
      const all = await db.schedules.toArray();
      const filtered = all
        .map(c => c.data)
        .filter(s => s.startTime.slice(0, 10) <= endDate && s.endTime.slice(0, 10) >= startDate);
      return { schedules: filtered } as T;
    }
    await queueWrite('POST', path, body);
    return undefined as T;
  }

  // /v1/schedules/:id/alarms
  const scheduleAlarmsMatch = base.match(/^\/v1\/schedules\/(\d+)\/alarms$/);
  if (scheduleAlarmsMatch) {
    await queueWrite(method as WriteMethod, path, body);
    return undefined as T;
  }

  // /v1/schedules/:id
  const scheduleDetailMatch = base.match(/^\/v1\/schedules\/(\d+)$/);
  if (scheduleDetailMatch) {
    const scheduleId = parseInt(scheduleDetailMatch[1], 10);
    if (method === 'GET') {
      const cached = await db.scheduleDetails.get(scheduleId);
      if (!cached) throw new OfflineCacheMissError(path);
      return cached.data as T;
    }
    await queueWrite(method as WriteMethod, path, body);
    return undefined as T;
  }

  // ── Reports ─────────────────────────────────────────────────────────────

  if (base === '/v1/medication-analysis/reports' && method === 'GET') {
    const cached = await db.reports.get('list');
    if (!cached) throw new OfflineCacheMissError(path);
    return cached.data as T;
  }

  // ── Consultations ───────────────────────────────────────────────────────

  if (base === '/v1/consultations') {
    if (method === 'GET') {
      const cached = await db.consultations.get('list');
      if (!cached) throw new OfflineCacheMissError(path);
      return cached.data as T;
    }
    // POST (createConsultation) 등 쓰기 → 큐
    await queueWrite(method as WriteMethod, path, body);
    return undefined as T;
  }

  // /v1/consultations/:id/questions — 오프라인에서 질문 목록은 캐시 미지원
  const consultQuestionMatch = base.match(/^\/v1\/consultations\/(\d+)\/questions(\/\d+)?$/);
  if (consultQuestionMatch) {
    if (method === 'GET') {
      throw new OfflineCacheMissError(path);
    }
    await queueWrite(method as WriteMethod, path, body);
    return {} as T;
  }

  // /v1/consultations/:id/result
  const consultResultMatch = base.match(/^\/v1\/consultations\/(\d+)\/result$/);
  if (consultResultMatch) {
    await queueWrite(method as WriteMethod, path, body);
    return undefined as T;
  }

  // /v1/consultations/:id
  const consultDetailMatch = base.match(/^\/v1\/consultations\/(\d+)$/);
  if (consultDetailMatch) {
    const consultationId = parseInt(consultDetailMatch[1], 10);
    if (method === 'GET') {
      const cached = await db.consultationDetails.get(consultationId);
      if (!cached) throw new OfflineCacheMissError(path);
      return cached.data as T;
    }
    await queueWrite(method as WriteMethod, path, body);
    return undefined as T;
  }

  throw new OfflineCacheMissError(path);
}

import { db } from './db';
import { SyncService } from './SyncService';
import { cleanPath, searchParams, toLocalDateString, toLocalDateStringFromTimestamp, nextLocalDateString } from './pathUtils';
import { getAccessToken, type ApiRequestOptions } from '../api/client';
import { getBrowserTimezone } from '../lib/timezone';
import { getUserIdFromToken } from '../lib/jwt';
import type {
  JournalActiveTags,
  JournalChecked,
  SleepMealPayload,
} from '../api/journal';
import type { MedicationPeriodLog } from '../api/medication';
import type { CalendarEvent } from '../api/calendarEvents';


export class OfflineCacheMissError extends Error {
  status = 503;

  constructor(path: string) {
    super(`오프라인 캐시 없음: ${path}`);
    this.name = 'OfflineCacheMissError';
  }
}

// 소유자를 특정할 수 없는 쓰기는 큐에 넣지 않는다. 나중에 누구의 토큰으로 나갈지 알 수 없기 때문.
export class OfflineQueueOwnerUnknownError extends Error {
  status = 401;

  constructor(path: string) {
    super(`오프라인 쓰기 소유자를 확인할 수 없음: ${path}`);
    this.name = 'OfflineQueueOwnerUnknownError';
  }
}

type WriteMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// 약 복용 로그의 로컬 표시용 임시 ID. 동기화 후 서버 데이터로 덮어써지며, 다른 곳에서 재참조되지 않는다.
let localLogIdSeed = 0;
function createLocalLogId(): number {
  localLogIdSeed = (localLogIdSeed + 1) % 1000;
  return -(Date.now() * 1000 + localLogIdSeed);
}

// path는 쿼리 스트링 포함 전체 경로를 보존해야 재전송 시 파라미터가 유지됨
async function queueWrite(method: WriteMethod, path: string, body: unknown): Promise<void> {
  // 적재 시점의 사용자를 함께 남긴다. 재전송은 이 값이 현재 사용자와 같을 때만 수행한다.
  const userId = getUserIdFromToken(getAccessToken());
  if (!userId) throw new OfflineQueueOwnerUnknownError(path);

  await SyncService.addToQueue({ method, path, body, localTimestamp: new Date().toISOString(), userId });
}

function isWriteMethod(method: string): method is WriteMethod {
  return method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === 'string' ? value : undefined;
}

function readNumber(record: Record<string, unknown>, key: string): number | undefined {
  const value = record[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function rangeKey(startDate: string | null, endDate: string | null): string {
  return `${startDate ?? ''}:${endDate ?? ''}`;
}

function emptyActiveTags(): JournalActiveTags {
  return { conditions: [], sideEffects: [], troubles: [], goals: [] };
}

function emptyChecked(): JournalChecked {
  return {
    conditions: [],
    sideEffects: [],
    troubles: [],
    checkedCatalogTagIds: [],
    goals: [],
    memo: null,
  };
}

async function getActiveTags(): Promise<JournalActiveTags> {
  return (await db.activeTags.get('tags'))?.data ?? emptyActiveTags();
}

async function getOrCreateJournal(date: string) {
  return (await db.journals.get(date)) ?? { date, checked: emptyChecked(), cachedAt: new Date().toISOString() };
}

async function updateCachedJournal(date: string, updater: (checked: JournalChecked) => JournalChecked): Promise<void> {
  await db.transaction('rw', db.journals, async () => {
    const cached = await getOrCreateJournal(date);
    await db.journals.put({ date, checked: updater(cached.checked), cachedAt: new Date().toISOString() });
  });
}

async function updateCatalogTagCheck(tagId: number, date: string, checked: boolean): Promise<void> {
  await updateCachedJournal(date, current => {
    const ids = new Set(current.checkedCatalogTagIds ?? []);
    if (checked) ids.add(tagId);
    else ids.delete(tagId);
    return { ...current, checkedCatalogTagIds: [...ids] };
  });
}

async function scoreOfflineGoal(date: string, body: unknown): Promise<{ goalId: number; score: number; journalDate: string }> {
  if (!isRecord(body)) throw new OfflineCacheMissError(`/v1/journals/${date}/goals`);
  const goalId = readNumber(body, 'goalId');
  const score = readNumber(body, 'score');
  if (goalId == null || score == null) throw new OfflineCacheMissError(`/v1/journals/${date}/goals`);
  const activeTags = await getActiveTags();
  const goal = activeTags.goals.find(item => item.goalId === goalId);
  await updateCachedJournal(date, checked => ({
    ...checked,
    goals: [
      ...(checked.goals ?? []).filter(item => item.goalId !== goalId),
      { goalId, content: goal?.content ?? '', score },
    ],
  }));
  return { goalId, score, journalDate: date };
}

async function updateOfflineSleepMeal(date: string, body: unknown) {
  if (!isRecord(body)) throw new OfflineCacheMissError(`/v1/journals/${date}/sleep-meal`);
  const payload = body as SleepMealPayload;
  await updateCachedJournal(date, checked => ({
    ...checked,
    sleep: payload.sleepHour == null
      ? null
      : { sleepHour: payload.sleepHour, sleepQuality: payload.sleepQuality ?? 'NORMAL' },
    meal: {
      ateBreakfast: Boolean(payload.ateBreakfast),
      ateLunch: Boolean(payload.ateLunch),
      ateDinner: Boolean(payload.ateDinner),
    },
  }));
  return {
    journalDate: date,
    sleepHour: payload.sleepHour ?? null,
    sleepQuality: payload.sleepQuality ?? null,
    ateBreakfast: payload.ateBreakfast ?? null,
    ateLunch: payload.ateLunch ?? null,
    ateDinner: payload.ateDinner ?? null,
  };
}

async function updateOfflineMemo(date: string, body: unknown) {
  if (!isRecord(body)) throw new OfflineCacheMissError(`/v1/journals/${date}/memo`);
  const memo = readString(body, 'memo') ?? '';
  await updateCachedJournal(date, checked => ({ ...checked, memo }));
  return { journalDate: date, memo };
}

async function addOfflineMedicationLog(userMedicationId: number, body: unknown) {
  // 큐에 실어 보낸 takenAt과 같은 값을 써야 로컬 표시와 서버 기록의 복용일이 어긋나지 않는다.
  const now = (isRecord(body) ? readString(body, 'takenAt') : undefined) ?? new Date().toISOString();
  const date = toLocalDateStringFromTimestamp(now) ?? toLocalDateString(new Date());
  const action = isRecord(body) && typeof body.action === 'string' ? body.action : undefined;
  const scheduleId = isRecord(body) && typeof body.scheduleId === 'number' ? body.scheduleId : undefined;
  const logId = createLocalLogId();
  const log: MedicationPeriodLog & { logId: number } = {
    logId,
    userMedicationId,
    scheduleId,
    name: '',
    intakeTime: now,
    taken: action === 'TAKEN',
  };
  await db.transaction('rw', db.medicationLogs, async () => {
    const cached = await db.medicationLogs.get(date);
    await db.medicationLogs.put({
      date,
      data: [...(cached?.data ?? []), log],
      cachedAt: now,
    });
  });
  return { logId, action, recordedAt: now };
}

async function getOfflineCalendarEvents(startDate: string, endDate: string): Promise<CalendarEvent[]> {
  const cached = await db.calendarEvents.get(rangeKey(startDate, endDate));
  const externalEvents = (cached?.data ?? []).filter(event => event.source !== 'ATTUNE');

  const endExclusive = `${nextLocalDateString(endDate)}T00:00:00`;
  const [schedules, categories] = await Promise.all([
    db.schedules
      .where('startTime')
      .below(endExclusive)
      .and(item => item.endTime >= startDate)
      .toArray(),
    db.scheduleCategories.get('categories'),
  ]);
  const categoryById = new Map((categories?.data ?? []).map(category => [category.categoryId, category]));

  const attuneEvents = schedules
    .map(({ data }): CalendarEvent => {
      const category = categoryById.get(data.categoryId);
      return {
        id: `attune:${data.scheduleId}`,
        scheduleId: data.scheduleId,
        source: 'ATTUNE',
        provider: null,
        title: data.title,
        isAllDay: data.isAllDay,
        startTime: data.startTime,
        endTime: data.endTime ?? data.startTime,
        categoryId: data.categoryId,
        color: category?.color ?? null,
        editable: true,
      };
    });
  return [...externalEvents, ...attuneEvents];
}

// 오프라인 쓰기는 "오프라인 진입 전부터 서버에 존재하던 항목에 대한 기록"으로 한정한다.
// (약 복용 로그, 일지 수면/식사·메모·목표 점수·기존 태그 체크)
// 새 항목 생성이나 생성 항목의 재수정은 OfflineCacheMissError로 막아 온라인에서 처리하도록 유도한다.
export async function resolveOfflineRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const method = ((options.method as string | undefined) ?? 'GET').toUpperCase();
  const base = cleanPath(path);
  const params = searchParams(path);
  const body = options.body;

  // ── Journal tags (must come before /v1/journals/:date to avoid false match) ─

  if (base === '/v1/journals/tags') {
    if (method !== 'GET') throw new OfflineCacheMissError(path);
    const category = params.get('category') as 'CONDITION' | 'SIDE_EFFECT' | 'TROUBLE' | null;
    if (!category) throw new OfflineCacheMissError(path);
    const cached = await db.journalTagsByCategory.get(category);
    return (cached?.data ?? []) as T;
  }

  // /v1/journals/tags/:tagId/checks  (POST / DELETE) — 기존 태그 체크/언체크
  const tagChecksMatch = base.match(/^\/v1\/journals\/tags\/(\d+)\/checks$/);
  if (tagChecksMatch) {
    if (!isWriteMethod(method)) throw new OfflineCacheMissError(path);
    const tagId = Number(tagChecksMatch[1]);
    const date = method === 'POST' && isRecord(body)
      ? readString(body, 'journalDate')
      : params.get('date');
    if (date) await updateCatalogTagCheck(tagId, date, method === 'POST');
    await queueWrite(method, path, body);
    return {} as T;
  }

  // /v1/journals/dates
  if (base === '/v1/journals/dates' && method === 'GET') {
    const startDate = params.get('startDate') ?? '';
    const endDate = params.get('endDate') ?? '';
    const all = await db.journals.where('date').between(startDate, endDate, true, true).toArray();
    return { dates: all.map(j => j.date) } as T;
  }

  // /v1/journals  (bulk read)
  if (base === '/v1/journals' && method === 'GET') {
    const startDate = params.get('startDate') ?? '';
    const endDate = params.get('endDate') ?? '';
    const [journals, tagsCache] = await Promise.all([
      db.journals.where('date').between(startDate, endDate, true, true).toArray(),
      db.activeTags.get('tags'),
    ]);
    return {
      activeTags: tagsCache?.data ?? emptyActiveTags(),
      journals: journals.map(j => ({ date: j.date, checked: j.checked })),
    } as T;
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
        activeTags: tagsCache?.data ?? emptyActiveTags(),
        checked: journal.checked,
      } as T;
    }

    if (sub === '/sleep-meal' && method === 'POST') {
      await queueWrite('POST', path, body);
      return await updateOfflineSleepMeal(date, body) as T;
    }
    if (sub === '/memo' && method === 'POST') {
      await queueWrite('POST', path, body);
      return await updateOfflineMemo(date, body) as T;
    }
    if (sub === '/goals' && method === 'POST') {
      await queueWrite('POST', path, body);
      return await scoreOfflineGoal(date, body) as T;
    }
    throw new OfflineCacheMissError(path);
  }

  // ── Medication ──────────────────────────────────────────────────────────

  if (base === '/v1/user-medications' && method === 'GET') {
    const cached = await db.medications.get('list');
    return (cached?.data ?? []) as T;
  }

  if (base === '/v1/user-medications/logs' && method === 'GET') {
    const startDate = params.get('startDate') ?? '';
    const endDate = params.get('endDate') ?? '';
    const cached = await db.medicationLogs.where('date').between(startDate, endDate, true, true).toArray();
    return { logs: cached.flatMap(c => c.data) } as T;
  }

  // /v1/user-medications/:id/log/quick — 기존 약 빠른 복용 기록
  const quickLogMatch = base.match(/^\/v1\/user-medications\/(\d+)\/log\/quick$/);
  if (quickLogMatch && method === 'POST') {
    const userMedicationId = Number(quickLogMatch[1]);
    // 재전송은 나중에(자정을 넘겨서도) 일어난다. 서버가 수신 시각을 복용 시각으로 삼지 않도록
    // 사용자가 기록한 시각을 body에 함께 실어 보낸다. 낙관적 로컬 로그도 같은 값을 쓴다.
    const takenAt = new Date().toISOString();
    const bodyWithTakenAt = isRecord(body) ? { ...body, takenAt } : { takenAt };
    await queueWrite('POST', path, bodyWithTakenAt);
    return await addOfflineMedicationLog(userMedicationId, bodyWithTakenAt) as T;
  }

  // ── Schedule (읽기 전용) ──────────────────────────────────────────────────

  if (base === '/v1/schedule-categories' && method === 'GET') {
    const cached = await db.scheduleCategories.get('categories');
    return { categories: cached?.data ?? [] } as T;
  }

  if (base === '/v1/schedules' && method === 'GET') {
    const startDate = params.get('startDate') ?? '';
    const endDate = params.get('endDate') ?? '';
    // startTime 인덱스로 범위를 좁힌 뒤 endTime 으로 필터링하여 날짜 범위 내 일정 조회
    const endExclusive = `${nextLocalDateString(endDate)}T00:00:00`;
    const results = await db.schedules
      .where('startTime')
      .below(endExclusive)
      .and(item => item.endTime >= startDate)
      .toArray();
    return { schedules: results.map(c => c.data) } as T;
  }

  const scheduleDetailMatch = base.match(/^\/v1\/schedules\/(\d+)$/);
  if (scheduleDetailMatch && method === 'GET') {
    const scheduleId = parseInt(scheduleDetailMatch[1], 10);
    const cached = await db.scheduleDetails.get(scheduleId);
    if (!cached) throw new OfflineCacheMissError(path);
    return cached.data as T;
  }

  // ── Calendar (읽기 전용) ──────────────────────────────────────────────────

  if (base === '/v1/calendar/events' && method === 'GET') {
    const startDate = params.get('startDate') ?? '';
    const endDate = params.get('endDate') ?? '';
    return { events: await getOfflineCalendarEvents(startDate, endDate) } as T;
  }

  if (base === '/v1/calendar-connections' && method === 'GET') {
    const cached = await db.calendarConnections.get('list');
    return { connections: cached?.data ?? [] } as T;
  }

  // ── Reports (읽기 전용) ───────────────────────────────────────────────────

  if (base === '/v1/medication-analysis/reports' && method === 'GET') {
    const cached = await db.reports.get('list');
    return (cached?.data ?? []) as T;
  }

  if (base === '/v1/medication-analysis/summary' && method === 'GET') {
    return {
      totalScheduled: 0,
      takenCount: 0,
      skippedCount: 0,
      unrecordedCount: 0,
      adherenceRate: 0,
      recordingRate: 0,
    } as T;
  }

  if (base === '/v1/medication-analysis/availability' && method === 'GET') {
    return { available: false, recordedDays: 0, unavailableReasons: ['OFFLINE'] } as T;
  }

  // ── Todos (읽기 전용) ─────────────────────────────────────────────────────

  if (base === '/v1/todos' && method === 'GET') {
    const date = params.get('date') ?? '';
    const startDate = params.get('startDate');
    const endDate = params.get('endDate');
    if (startDate && endDate) {
      const cached = await db.todosByDate.where('date').between(startDate, endDate, true, true).toArray();
      return { todos: cached.flatMap((entry) => entry.data) } as T;
    }
    const cached = date ? await db.todosByDate.get(date) : null;
    return { todos: cached?.data ?? [] } as T;
  }

  // ── User (읽기 전용) ──────────────────────────────────────────────────────

  if (base === '/v1/users/me/profile' && method === 'GET') {
    const cached = await db.userProfile.get('profile');
    if (cached) return cached.data as T;
    // 콜드 캐시(첫 설치 직후 오프라인 등) — 화면이 깨지지 않도록 안전한 기본값 반환
    return {
      nickname: '',
      profileImageUrl: null,
      email: '',
      notifications: { medication: false, report: false, marketing: false },
    } as T;
  }

  if (base === '/v1/users/settings' && method === 'GET') {
    const cached = await db.userSettings.get('settings');
    if (cached) return cached.data as T;
    // 콜드 캐시 — 안전한 기본값 반환
    return {
      medicationNotification: false,
      reportNotification: false,
      marketingNotification: false,
      communityNotification: false,
      todoNotification: false,
      takeMedicationOnHoliday: false,
      theme: 'SYSTEM',
      timezone: getBrowserTimezone() ?? 'Asia/Seoul',
    } as T;
  }

  // ── Community (읽기 전용) ─────────────────────────────────────────────────

  if (base === '/v1/community/posts' && method === 'GET') {
    const cached = await db.communityPayloads.get(path) ?? await db.communityPayloads.get('/v1/community/posts');
    return (cached?.data ?? { posts: [] }) as T;
  }

  const communityPostCommentsMatch = base.match(/^\/v1\/community\/posts\/(-?\d+)\/comments$/);
  if (communityPostCommentsMatch && method === 'GET') {
    const cached = await db.communityPayloads.get(base);
    return (cached?.data ?? []) as T;
  }

  const communityPostMatch = base.match(/^\/v1\/community\/posts\/(-?\d+)$/);
  if (communityPostMatch && method === 'GET') {
    const postId = Number(communityPostMatch[1]);
    const cached = await db.communityPayloads.get(base);
    if (cached) return cached.data as T;
    const list = await db.communityPayloads.get('/v1/community/posts');
    const items = Array.isArray(list?.data)
      ? list.data
      : isRecord(list?.data) && Array.isArray(list.data.posts)
        ? list.data.posts
        : [];
    const match = items.find(item => isRecord(item) && item.postId === postId);
    if (match) return match as T;
    throw new OfflineCacheMissError(path);
  }

  // ── Consultations (읽기 전용) ─────────────────────────────────────────────

  if (base === '/v1/consultations' && method === 'GET') {
    const cached = await db.consultations.get('list');
    return (cached?.data ?? []) as T;
  }

  const consultDetailMatch = base.match(/^\/v1\/consultations\/(\d+)$/);
  if (consultDetailMatch && method === 'GET') {
    const consultationId = parseInt(consultDetailMatch[1], 10);
    const cached = await db.consultationDetails.get(consultationId);
    if (!cached) throw new OfflineCacheMissError(path);
    return cached.data as T;
  }

  throw new OfflineCacheMissError(path);
}

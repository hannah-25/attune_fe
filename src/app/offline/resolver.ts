import { db } from './db';
import { SyncService } from './SyncService';
import { cleanPath, searchParams } from './pathUtils';
import type { ApiRequestOptions } from '../api/client';
import type { LocalEntityType, SyncQueueItem } from './db';
import type {
  JournalActiveTags,
  JournalChecked,
  JournalGoal,
  JournalTag,
  JournalTagCategory,
  SleepMealPayload,
} from '../api/journal';
import type {
  CreateMedicationRequest,
  CreateMedicationResponse,
  MedicationLogRequest,
  MedicationPeriodLog,
  MedicationScheduleSummary,
  MedicationSummary,
  UpdateMedicationRequest,
} from '../api/medication';
import type { ScheduleDetail, SchedulePayload, ScheduleSummary } from '../api/schedule';
import type { ConsultationDetail, ConsultationPayload, ConsultationQuestion } from '../api/consultation';
import type { CalendarConnection } from '../api/calendarConnection';
import type { CalendarEvent } from '../api/calendarEvents';


export class OfflineCacheMissError extends Error {
  status = 503;

  constructor(path: string) {
    super(`오프라인 캐시 없음: ${path}`);
    this.name = 'OfflineCacheMissError';
  }
}

type WriteMethod = SyncQueueItem['method'];
type QueueWriteMeta = Pick<
  SyncQueueItem,
  | 'localEntityType'
  | 'localEntityId'
  | 'dependsOnLocalEntityType'
  | 'dependsOnLocalEntityId'
  | 'rewritePathTemplate'
  | 'rewriteBodyFields'
>;
let temporaryLogIdSeed = 0;

function createTemporaryLogId(): number {
  temporaryLogIdSeed = (temporaryLogIdSeed + 1) % 1000;
  return -(Date.now() * 1000 + temporaryLogIdSeed);
}

function createTemporaryId(): number {
  return createTemporaryLogId();
}

function isTemporaryId(id: number): boolean {
  return id < 0;
}

// path는 쿼리 스트링 포함 전체 경로를 보존해야 재전송 시 파라미터가 유지됨
async function queueWrite(
  method: WriteMethod,
  path: string,
  body: unknown,
  meta: QueueWriteMeta = {},
): Promise<void> {
  await SyncService.addToQueue({ method, path, body, localTimestamp: new Date().toISOString(), ...meta });
}

function isWriteMethod(method: string): method is WriteMethod {
  return method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE';
}

async function queueWriteRequest(method: string, path: string, body: unknown): Promise<void> {
  if (!isWriteMethod(method)) throw new OfflineCacheMissError(path);
  await queueWrite(method, path, body);
}

async function queueLocalCreate(path: string, body: unknown, localEntityType: LocalEntityType, localEntityId: number): Promise<void> {
  await queueWrite('POST', path, body, { localEntityType, localEntityId });
}

async function queueDependentWrite(
  method: WriteMethod,
  path: string,
  body: unknown,
  dependsOnLocalEntityType: LocalEntityType,
  dependsOnLocalEntityId: number,
  rewritePathTemplate: string,
  rewriteBodyFields?: string[],
): Promise<void> {
  await queueWrite(method, path, body, {
    dependsOnLocalEntityType,
    dependsOnLocalEntityId,
    rewritePathTemplate,
    rewriteBodyFields,
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

async function findPendingLocalCreate(localEntityType: LocalEntityType, localEntityId: number): Promise<SyncQueueItem | undefined> {
  const matches = await db.syncQueue
    .where('status')
    .equals('pending')
    .filter(item =>
      item.method === 'POST'
      && item.localEntityType === localEntityType
      && item.localEntityId === localEntityId)
    .toArray();
  return matches[0];
}

async function mergePendingLocalCreateBody(
  localEntityType: LocalEntityType,
  localEntityId: number,
  patch: Record<string, unknown>,
): Promise<boolean> {
  const item = await findPendingLocalCreate(localEntityType, localEntityId);
  if (!item?.id) return false;
  const current = isRecord(item.body) ? item.body : {};
  await db.syncQueue.update(item.id, { body: { ...current, ...patch } });
  return true;
}

async function deletePendingLocalCreate(localEntityType: LocalEntityType, localEntityId: number): Promise<boolean> {
  const item = await findPendingLocalCreate(localEntityType, localEntityId);
  const dependentItems = await db.syncQueue
    .where('status')
    .equals('pending')
    .filter(queueItem =>
      queueItem.dependsOnLocalEntityType === localEntityType
      && queueItem.dependsOnLocalEntityId === localEntityId)
    .toArray();

  await Promise.all(dependentItems.map(queueItem => queueItem.id != null
    ? db.syncQueue.delete(queueItem.id)
    : Promise.resolve()));

  if (!item?.id) return dependentItems.length > 0;
  await db.syncQueue.delete(item.id);
  return true;
}

function readString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === 'string' ? value : undefined;
}

function readNumber(record: Record<string, unknown>, key: string): number | undefined {
  const value = record[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function normalizeJournalTagBody(body: unknown): unknown {
  if (!isRecord(body)) return body;
  return body.category === 'SIDE_EFFECT'
    ? { ...body, tagType: 'NONE' }
    : body;
}

function rangeKey(startDate: string | null, endDate: string | null): string {
  return `${startDate ?? ''}:${endDate ?? ''}`;
}

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function toLocalDateStringFromTimestamp(value: string): string | null {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return toLocalDateString(date);
}

function nextLocalDateString(value: string): string {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + 1);
  return toLocalDateString(date);
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

async function putActiveTags(data: JournalActiveTags, cachedAt: string): Promise<void> {
  await db.activeTags.put({ id: 'tags', data, cachedAt });
}

async function getOrCreateJournal(date: string) {
  return (await db.journals.get(date)) ?? { date, checked: emptyChecked(), cachedAt: new Date().toISOString() };
}

async function updateCachedJournal(date: string, updater: (checked: JournalChecked) => JournalChecked): Promise<void> {
  const cached = await getOrCreateJournal(date);
  await db.journals.put({ date, checked: updater(cached.checked), cachedAt: new Date().toISOString() });
}

async function createOfflineJournalTag(body: unknown): Promise<JournalTag> {
  const normalizedBody = normalizeJournalTagBody(body);
  if (!isRecord(normalizedBody)) throw new OfflineCacheMissError('/v1/journals/tags');
  const category = readString(normalizedBody, 'category') as JournalTagCategory | undefined;
  const name = readString(normalizedBody, 'name');
  const tagType = category === 'SIDE_EFFECT' ? 'NONE' : readString(body, 'tagType') ?? 'USER_INPUT';
  const visible = typeof normalizedBody.visible === 'boolean' ? normalizedBody.visible : true;
  if (!category || !name) throw new OfflineCacheMissError('/v1/journals/tags');

  const now = new Date().toISOString();
  const tag: JournalTag = {
    tagId: createTemporaryId(),
    category,
    name,
    tagType,
    scope: 'USER',
    enabled: true,
    visible,
  };
  const cached = await db.journalTagsByCategory.get(category);
  await db.journalTagsByCategory.put({
    category,
    data: [...(cached?.data ?? []), tag],
    cachedAt: now,
  });
  return tag;
}

async function updateCatalogTagCheck(tagId: number, date: string, checked: boolean): Promise<void> {
  await updateCachedJournal(date, current => {
    const ids = new Set(current.checkedCatalogTagIds ?? []);
    if (checked) ids.add(tagId);
    else ids.delete(tagId);
    return { ...current, checkedCatalogTagIds: [...ids] };
  });
}

async function updateOfflineJournalTagPreference(tagId: number, body: unknown): Promise<void> {
  if (!isRecord(body)) return;
  const visible = typeof body.visible === 'boolean' ? body.visible : undefined;
  const enabled = typeof body.enabled === 'boolean' ? body.enabled : undefined;
  const categories: JournalTagCategory[] = ['CONDITION', 'SIDE_EFFECT', 'TROUBLE'];
  await Promise.all(categories.map(async category => {
    const cached = await db.journalTagsByCategory.get(category);
    if (!cached?.data.some(tag => tag.tagId === tagId)) return;
    await db.journalTagsByCategory.put({
      ...cached,
      data: cached.data.map(tag => tag.tagId === tagId ? {
        ...tag,
        visible: visible ?? tag.visible,
        enabled: enabled ?? tag.enabled,
      } : tag),
      cachedAt: new Date().toISOString(),
    });
  }));
}

async function createOfflineGoal(body: unknown): Promise<JournalGoal> {
  if (!isRecord(body)) throw new OfflineCacheMissError('/v1/journals/goals');
  const content = readString(body, 'content');
  if (!content) throw new OfflineCacheMissError('/v1/journals/goals');
  const goal = { goalId: createTemporaryId(), content };
  const activeTags = await getActiveTags();
  await putActiveTags({ ...activeTags, goals: [...activeTags.goals, goal] }, new Date().toISOString());
  return goal;
}

async function updateOfflineGoal(goalId: number, body: unknown): Promise<JournalGoal> {
  if (!isRecord(body)) throw new OfflineCacheMissError(`/v1/journals/goals/${goalId}`);
  const content = readString(body, 'content');
  if (!content) throw new OfflineCacheMissError(`/v1/journals/goals/${goalId}`);
  const activeTags = await getActiveTags();
  const nextGoals = activeTags.goals.map(goal => goal.goalId === goalId ? { ...goal, content } : goal);
  const goal = nextGoals.find(item => item.goalId === goalId) ?? { goalId, content };
  await putActiveTags({ ...activeTags, goals: nextGoals.some(item => item.goalId === goalId) ? nextGoals : [...nextGoals, goal] }, new Date().toISOString());
  return goal;
}

async function deleteOfflineGoal(goalId: number, journalDate: string | null): Promise<void> {
  const activeTags = await getActiveTags();
  await putActiveTags({ ...activeTags, goals: activeTags.goals.filter(goal => goal.goalId !== goalId) }, new Date().toISOString());
  if (journalDate) {
    await updateCachedJournal(journalDate, checked => ({
      ...checked,
      goals: checked.goals.filter(goal => goal.goalId !== goalId),
    }));
  }
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
      ...checked.goals.filter(item => item.goalId !== goalId),
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
  const now = new Date().toISOString();
  const date = toLocalDateStringFromTimestamp(now) ?? toLocalDateString(new Date());
  const action = isRecord(body) && typeof body.action === 'string' ? body.action : undefined;
  const log: MedicationPeriodLog = {
    userMedicationId,
    name: '',
    intakeTime: now,
    taken: action === 'TAKEN',
  };
  const cached = await db.medicationLogs.get(date);
  await db.medicationLogs.put({
    date,
    data: [...(cached?.data ?? []), log],
    cachedAt: now,
  });
  return { logId: createTemporaryId(), action: (body as MedicationLogRequest | undefined)?.action, recordedAt: now };
}

async function updateOfflineMedication(userMedicationId: number, body: unknown): Promise<void> {
  if (!isRecord(body)) return;
  const cached = await db.medications.get('list');
  if (!cached) return;
  const patch = body as UpdateMedicationRequest;
  await db.medications.put({
    ...cached,
    data: cached.data.map(item => item.userMedicationId === userMedicationId ? { ...item, ...patch } : item),
    cachedAt: new Date().toISOString(),
  });
}

function medicationSchedulesFromPayload(payload: CreateMedicationRequest): MedicationScheduleSummary[] {
  return payload.schedules.map(schedule => ({
    scheduleId: createTemporaryId(),
    doseTime: schedule.doseTime,
    label: schedule.label,
  }));
}

async function createOfflineMedication(body: unknown): Promise<CreateMedicationResponse> {
  if (!isRecord(body)) throw new OfflineCacheMissError('/v1/user-medications');
  const payload = body as CreateMedicationRequest;
  const userMedicationId = createTemporaryId();
  const now = new Date().toISOString();
  const item: MedicationSummary = {
    userMedicationId,
    medicationDosageId: payload.medicationDosageId,
    medicationName: '',
    consultationId: payload.consultationId ?? null,
    isActive: true,
    startedAt: payload.startedAt,
    endAt: payload.endAt ?? null,
    alarmActive: true,
    schedules: medicationSchedulesFromPayload(payload),
  };
  const cached = await db.medications.get('list');
  await db.medications.put({
    id: 'list',
    data: [...(cached?.data ?? []), item],
    cachedAt: now,
  });
  return { userMedicationId, name: item.medicationName, isActive: item.isActive };
}

async function deleteOfflineMedication(userMedicationId: number): Promise<void> {
  const cached = await db.medications.get('list');
  if (!cached) return;
  await db.medications.put({
    ...cached,
    data: cached.data.filter(item => item.userMedicationId !== userMedicationId),
    cachedAt: new Date().toISOString(),
  });
}

function scheduleSummaryFromPayload(scheduleId: number, payload: SchedulePayload): ScheduleSummary {
  return {
    scheduleId,
    title: payload.title,
    categoryId: payload.categoryId,
    isAllDay: payload.isAllDay,
    startTime: payload.startTime,
    endTime: payload.endTime,
  };
}

function scheduleDetailFromPayload(payload: SchedulePayload): ScheduleDetail {
  return {
    title: payload.title,
    description: payload.description,
    categoryId: payload.categoryId,
    place: payload.place,
    isAllDay: payload.isAllDay,
    startTime: payload.startTime,
    endTime: payload.endTime,
    alarmEnabled: payload.alarmEnabled,
    alarms: payload.alarmedAt,
  };
}

async function createOfflineSchedule(body: unknown): Promise<number> {
  if (!isRecord(body)) throw new OfflineCacheMissError('/v1/schedules');
  const payload = body as SchedulePayload;
  const scheduleId = createTemporaryId();
  const now = new Date().toISOString();
  await Promise.all([
    db.schedules.put({
      scheduleId,
      startTime: payload.startTime,
      endTime: payload.endTime,
      data: scheduleSummaryFromPayload(scheduleId, payload),
      cachedAt: now,
    }),
    db.scheduleDetails.put({
      scheduleId,
      data: scheduleDetailFromPayload(payload),
      cachedAt: now,
    }),
  ]);
  return scheduleId;
}

async function updateOfflineSchedule(scheduleId: number, body: unknown): Promise<void> {
  if (!isRecord(body)) return;
  const now = new Date().toISOString();
  const [summary, detail] = await Promise.all([
    db.schedules.get(scheduleId),
    db.scheduleDetails.get(scheduleId),
  ]);
  const patch = body as Partial<SchedulePayload>;
  const nextDetail: ScheduleDetail = {
    ...(detail?.data ?? summary?.data ?? {
      title: '',
      categoryId: 0,
      isAllDay: false,
      startTime: '',
      endTime: '',
      alarmEnabled: false,
      alarms: [],
    }),
    ...patch,
    alarms: patch.alarmedAt ?? detail?.data.alarms ?? [],
  };
  const nextSummary: ScheduleSummary = {
    scheduleId,
    title: nextDetail.title,
    categoryId: nextDetail.categoryId,
    isAllDay: nextDetail.isAllDay,
    startTime: nextDetail.startTime,
    endTime: nextDetail.endTime,
  };
  await Promise.all([
    db.schedules.put({ scheduleId, startTime: nextSummary.startTime, endTime: nextSummary.endTime, data: nextSummary, cachedAt: now }),
    db.scheduleDetails.put({ scheduleId, data: nextDetail, cachedAt: now }),
  ]);
}

async function deleteOfflineSchedule(scheduleId: number): Promise<void> {
  await Promise.all([
    db.schedules.delete(scheduleId),
    db.scheduleDetails.delete(scheduleId),
  ]);
}

async function createOfflineConsultation(body: unknown): Promise<number> {
  if (!isRecord(body)) throw new OfflineCacheMissError('/v1/consultations');
  const payload = body as ConsultationPayload;
  const now = new Date().toISOString();
  const item: ConsultationDetail = {
    consultationId: createTemporaryId(),
    consultationDate: payload.consultationDate,
    place: payload.place,
    doctorName: payload.doctorName,
    isFirstVisit: payload.isFirstVisit,
  };
  const cached = await db.consultations.get('list');
  await Promise.all([
    db.consultations.put({ id: 'list', data: [...(cached?.data ?? []), item], cachedAt: now }),
    db.consultationDetails.put({ consultationId: item.consultationId, data: item, cachedAt: now }),
  ]);
  return item.consultationId;
}

async function updateOfflineConsultation(consultationId: number, body: unknown): Promise<void> {
  if (!isRecord(body)) return;
  const now = new Date().toISOString();
  const [list, detail] = await Promise.all([
    db.consultations.get('list'),
    db.consultationDetails.get(consultationId),
  ]);
  const patch = body as Partial<ConsultationPayload>;
  const update = (item: ConsultationDetail): ConsultationDetail => ({ ...item, ...patch });
  await Promise.all([
    list ? db.consultations.put({ ...list, data: list.data.map(item => item.consultationId === consultationId ? update(item) : item), cachedAt: now }) : Promise.resolve(),
    detail ? db.consultationDetails.put({ consultationId, data: update(detail.data), cachedAt: now }) : Promise.resolve(),
  ]);
}

async function updateOfflineConsultationResult(consultationId: number, body: unknown): Promise<void> {
  if (!isRecord(body)) return;
  const now = new Date().toISOString();
  const detail = await db.consultationDetails.get(consultationId);
  if (!detail) return;
  const summaryReport = body.doctorAdvice === null ? null : readString(body, 'doctorAdvice') ?? detail.data.summaryReport;
  const prescriptionNote = body.prescriptionNote === null ? null : readString(body, 'prescriptionNote') ?? detail.data.prescriptionNote;
  const next: ConsultationDetail = {
    ...detail.data,
    summaryReport,
    prescriptionNote,
  };
  await db.consultationDetails.put({ consultationId, data: next, cachedAt: now });
}

async function deleteOfflineConsultation(consultationId: number): Promise<void> {
  const list = await db.consultations.get('list');
  await Promise.all([
    list ? db.consultations.put({
      ...list,
      data: list.data.filter(item => item.consultationId !== consultationId),
      cachedAt: new Date().toISOString(),
    }) : Promise.resolve(),
    db.consultationDetails.delete(consultationId),
  ]);
}

function createOfflineConsultationQuestion(body: unknown): ConsultationQuestion {
  if (!isRecord(body)) throw new OfflineCacheMissError('/v1/consultations/questions');
  const text = readString(body, 'text');
  if (!text) throw new OfflineCacheMissError('/v1/consultations/questions');
  return { questionId: createTemporaryId(), text };
}

async function getOfflineCalendarEvents(startDate: string, endDate: string): Promise<CalendarEvent[]> {
  const cached = await db.calendarEvents.get(rangeKey(startDate, endDate));
  if (cached) return cached.data;

  const endExclusive = `${nextLocalDateString(endDate)}T00:00:00`;
  const [byStart, byEnd, categories] = await Promise.all([
    db.schedules.where('startTime').below(endExclusive).primaryKeys(),
    db.schedules.where('endTime').aboveOrEqual(startDate).primaryKeys(),
    db.scheduleCategories.get('categories'),
  ]);
  const startSet = new Set(byStart);
  const matchIds = byEnd.filter(k => startSet.has(k));
  const categoryById = new Map((categories?.data ?? []).map(category => [category.categoryId, category]));

  return (await db.schedules.bulkGet(matchIds))
    .filter((cachedSchedule): cachedSchedule is NonNullable<typeof cachedSchedule> => cachedSchedule != null)
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
      return (cached?.data ?? []) as T;
    }
    if (method !== 'POST') throw new OfflineCacheMissError(path);
    const tag = await createOfflineJournalTag(body);
    await queueLocalCreate(path, normalizeJournalTagBody(body), 'journalTag', tag.tagId);
    return tag as T;
  }

  // /v1/journals/tags/:tagId/preference  (PATCH)
  const tagPrefMatch = base.match(/^\/v1\/journals\/tags\/(-?\d+)\/preference$/);
  if (tagPrefMatch) {
    if (method !== 'PATCH') throw new OfflineCacheMissError(path);
    const tagId = Number(tagPrefMatch[1]);
    if (isTemporaryId(tagId)) {
      await updateOfflineJournalTagPreference(tagId, body);
      if (isRecord(body)) {
        if (body.enabled === false) {
          await deletePendingLocalCreate('journalTag', tagId);
          return undefined as T;
        }
        const patch: Record<string, unknown> = {};
        if (typeof body.visible === 'boolean') patch.visible = body.visible;
        if (Object.keys(patch).length > 0) await mergePendingLocalCreateBody('journalTag', tagId, patch);
      }
      return undefined as T;
    }
    await queueWrite('PATCH', path, body);
    return undefined as T;
  }

  // /v1/journals/tags/:tagId  (DELETE)
  const tagDeleteMatch = base.match(/^\/v1\/journals\/tags\/(-?\d+)$/);
  if (tagDeleteMatch && method === 'DELETE') {
    const tagId = Number(tagDeleteMatch[1]);
    if (isTemporaryId(tagId)) {
      await deletePendingLocalCreate('journalTag', tagId);
      const categories: JournalTagCategory[] = ['CONDITION', 'SIDE_EFFECT', 'TROUBLE'];
      await Promise.all(categories.map(async category => {
        const cached = await db.journalTagsByCategory.get(category);
        if (!cached) return;
        await db.journalTagsByCategory.put({
          ...cached,
          data: cached.data.filter(tag => tag.tagId !== tagId),
          cachedAt: new Date().toISOString(),
        });
      }));
      return undefined as T;
    }
    await queueWrite('DELETE', path, body);
    return undefined as T;
  }

  // /v1/journals/tags/:tagId/checks  (POST / DELETE)
  const tagChecksMatch = base.match(/^\/v1\/journals\/tags\/(-?\d+)\/checks$/);
  if (tagChecksMatch) {
    const tagId = Number(tagChecksMatch[1]);
    const date = method === 'POST' && isRecord(body)
      ? readString(body, 'journalDate')
      : params.get('date');
    if (date) await updateCatalogTagCheck(tagId, date, method === 'POST');
    if (isTemporaryId(tagId)) {
      if (!isWriteMethod(method)) throw new OfflineCacheMissError(path);
      await queueDependentWrite(method, path, body, 'journalTag', tagId, '/v1/journals/tags/{id}/checks');
    } else {
      await queueWriteRequest(method, path, body);
    }
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
    if (method === 'POST') {
      const goal = await createOfflineGoal(body);
      await queueLocalCreate(path, body, 'journalGoal', goal.goalId);
      return goal as T;
    }
    await queueWriteRequest(method, path, body);
    return {} as T;
  }

  // /v1/journals/goals/:id
  const journalGoalMatch = base.match(/^\/v1\/journals\/goals\/(-?\d+)$/);
  if (journalGoalMatch) {
    const goalId = Number(journalGoalMatch[1]);
    if (!isTemporaryId(goalId)) await queueWriteRequest(method, path, body);
    if (isTemporaryId(goalId) && method === 'PATCH' && isRecord(body)) {
      await mergePendingLocalCreateBody('journalGoal', goalId, body);
    }
    if (isTemporaryId(goalId) && method === 'DELETE') {
      await deletePendingLocalCreate('journalGoal', goalId);
    }
    if (method === 'PATCH') return await updateOfflineGoal(goalId, body) as T;
    if (method === 'DELETE') await deleteOfflineGoal(goalId, params.get('journalDate'));
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
      const tempGoalScore = sub === '/goals'
        && method === 'POST'
        && isRecord(body)
        && typeof body.goalId === 'number'
        && isTemporaryId(body.goalId);
      if (tempGoalScore && isRecord(body) && typeof body.goalId === 'number') {
        await queueDependentWrite(method, path, body, 'journalGoal', body.goalId, path, ['goalId']);
      } else {
        await queueWriteRequest(method, path, body);
      }
      if (sub === '/sleep-meal' && method === 'POST') return await updateOfflineSleepMeal(date, body) as T;
      if (sub === '/memo' && method === 'POST') return await updateOfflineMemo(date, body) as T;
      if (sub === '/goals' && method === 'POST') return await scoreOfflineGoal(date, body) as T;
      return {} as T;
    }
  }

  // ── Medication ──────────────────────────────────────────────────────────

  if (base === '/v1/user-medications' && method === 'GET') {
    const cached = await db.medications.get('list');
    return (cached?.data ?? []) as T;
  }

  if (base === '/v1/user-medications') {
    if (method !== 'POST') throw new OfflineCacheMissError(path);
    const medication = await createOfflineMedication(body);
    await queueLocalCreate(path, body, 'medication', medication.userMedicationId);
    return medication as T;
  }

  if (base === '/v1/user-medications/logs' && method === 'GET') {
    const startDate = params.get('startDate') ?? '';
    const endDate = params.get('endDate') ?? '';
    const cached = await db.medicationLogs.where('date').between(startDate, endDate, true, true).toArray();
    return { logs: cached.flatMap(c => c.data) } as T;
  }

  // /v1/user-medications/:id/log/quick
  const quickLogMatch = base.match(/^\/v1\/user-medications\/(-?\d+)\/log\/quick$/);
  if (quickLogMatch && method === 'POST') {
    const userMedicationId = Number(quickLogMatch[1]);
    if (isTemporaryId(userMedicationId)) {
      await queueDependentWrite('POST', path, body, 'medication', userMedicationId, '/v1/user-medications/{id}/log/quick');
    } else {
      await queueWrite('POST', path, body);
    }
    return await addOfflineMedicationLog(userMedicationId, body) as T;
  }

  // /v1/user-medications/:id  (PATCH)
  const userMedMatch = base.match(/^\/v1\/user-medications\/(-?\d+)$/);
  if (userMedMatch && method === 'PATCH') {
    const userMedicationId = Number(userMedMatch[1]);
    if (isTemporaryId(userMedicationId)) {
      if (isRecord(body) && body.isActive === false) {
        await deletePendingLocalCreate('medication', userMedicationId);
        await deleteOfflineMedication(userMedicationId);
        return {} as T;
      }
      // PATCH 본문(endAt/alarmActive 등)은 생성 payload와 필드 구조가 달라 병합할 수 없다.
      // 생성이 서버에 반영된 뒤 실제 ID로 재전송되도록 의존 쓰기로 큐잉 — alarmActive 등 누락 방지.
      await queueDependentWrite('PATCH', path, body, 'medication', userMedicationId, '/v1/user-medications/{id}');
    } else {
      await queueWrite('PATCH', path, body);
    }
    await updateOfflineMedication(userMedicationId, body);
    return {} as T;
  }

  // ── Schedule ────────────────────────────────────────────────────────────

  if (base === '/v1/schedule-categories') {
    if (method === 'GET') {
      const cached = await db.scheduleCategories.get('categories');
      return { categories: cached?.data ?? [] } as T;
    }
    await queueWriteRequest(method, path, body);
    return {} as T;
  }

  if (base === '/v1/schedules') {
    if (method === 'GET') {
      const startDate = params.get('startDate') ?? '';
      const endDate = params.get('endDate') ?? '';
      // startTime, endTime 인덱스를 각각 쿼리하여 교집합으로 날짜 범위 내 일정 조회
      const endExclusive = `${nextLocalDateString(endDate)}T00:00:00`;
      const [byStart, byEnd] = await Promise.all([
        db.schedules.where('startTime').below(endExclusive).primaryKeys(),
        db.schedules.where('endTime').aboveOrEqual(startDate).primaryKeys(),
      ]);
      const startSet = new Set(byStart);
      const matchIds = byEnd.filter(k => startSet.has(k));
      const results = (await db.schedules.bulkGet(matchIds))
        .filter((c): c is NonNullable<typeof c> => c != null);
      return { schedules: results.map(c => c.data) } as T;
    }
    if (method !== 'POST') throw new OfflineCacheMissError(path);
    const scheduleId = await createOfflineSchedule(body);
    await queueLocalCreate(path, body, 'schedule', scheduleId);
    return undefined as T;
  }

  // /v1/schedules/:id/alarms
  const scheduleAlarmsMatch = base.match(/^\/v1\/schedules\/(-?\d+)\/alarms$/);
  if (scheduleAlarmsMatch) {
    const scheduleId = Number(scheduleAlarmsMatch[1]);
    if (!isTemporaryId(scheduleId)) await queueWriteRequest(method, path, body);
    if (isTemporaryId(scheduleId) && method === 'PUT' && isRecord(body)) {
      await mergePendingLocalCreateBody('schedule', scheduleId, {
        alarmEnabled: body.alarmEnabled,
        alarmedAt: Array.isArray(body.alarmedAt) ? body.alarmedAt : [],
      });
    }
    if (method === 'PUT' && isRecord(body)) {
      await updateOfflineSchedule(scheduleId, {
        alarmEnabled: body.alarmEnabled,
        alarmedAt: Array.isArray(body.alarmedAt) ? body.alarmedAt : [],
      });
    }
    return undefined as T;
  }

  // /v1/schedules/:id
  const scheduleDetailMatch = base.match(/^\/v1\/schedules\/(-?\d+)$/);
  if (scheduleDetailMatch) {
    const scheduleId = parseInt(scheduleDetailMatch[1], 10);
    if (method === 'GET') {
      const cached = await db.scheduleDetails.get(scheduleId);
      if (!cached) throw new OfflineCacheMissError(path);
      return cached.data as T;
    }
    if (!isTemporaryId(scheduleId)) await queueWriteRequest(method, path, body);
    if (isTemporaryId(scheduleId) && (method === 'PATCH' || method === 'PUT') && isRecord(body)) {
      await mergePendingLocalCreateBody('schedule', scheduleId, body);
    }
    if (isTemporaryId(scheduleId) && method === 'DELETE') {
      await deletePendingLocalCreate('schedule', scheduleId);
    }
    if (method === 'PATCH' || method === 'PUT') await updateOfflineSchedule(scheduleId, body);
    if (method === 'DELETE') await deleteOfflineSchedule(scheduleId);
    return undefined as T;
  }

  // ── Reports ─────────────────────────────────────────────────────────────

  if (base === '/v1/calendar/events' && method === 'GET') {
    const startDate = params.get('startDate') ?? '';
    const endDate = params.get('endDate') ?? '';
    return { events: await getOfflineCalendarEvents(startDate, endDate) } as T;
  }

  if (base === '/v1/calendar-connections') {
    if (method === 'GET') {
      const cached = await db.calendarConnections.get('list');
      return { connections: cached?.data ?? [] } as T;
    }
    await queueWriteRequest(method, path, body);
    return {
      connectionId: createTemporaryId(),
      provider: 'GOOGLE',
      accountEmail: null,
      selectedCalendarIds: [],
      lastSyncedAt: null,
      active: true,
    } as CalendarConnection as T;
  }

  const calendarConnectionSyncMatch = base.match(/^\/v1\/calendar-connections\/(-?\d+)\/sync$/);
  if (calendarConnectionSyncMatch && method === 'POST') {
    return {
      connectionId: Number(calendarConnectionSyncMatch[1]),
      lastSyncedAt: new Date().toISOString(),
      syncedCount: 0,
    } as T;
  }

  const calendarConnectionMatch = base.match(/^\/v1\/calendar-connections\/(-?\d+)$/);
  if (calendarConnectionMatch && method !== 'GET') {
    await queueWriteRequest(method, path, body);
    return undefined as T;
  }

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

  if (base === '/v1/todos') {
    if (method === 'GET') {
      const date = params.get('date') ?? '';
      const cached = date ? await db.todosByDate.get(date) : null;
      return { todos: cached?.data ?? [] } as T;
    }
    await queueWriteRequest(method, path, body);
    return undefined as T;
  }

  const todoDetailMatch = base.match(/^\/v1\/todos\/(-?\d+)$/);
  if (todoDetailMatch && method !== 'GET') {
    await queueWriteRequest(method, path, body);
    return {} as T;
  }

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
    } as T;
  }

  if (base === '/v1/community/posts') {
    if (method === 'GET') {
      const cached = await db.communityPayloads.get(path) ?? await db.communityPayloads.get('/v1/community/posts');
      return (cached?.data ?? { posts: [] }) as T;
    }
    throw new OfflineCacheMissError(path);
  }

  const communityPostCommentsMatch = base.match(/^\/v1\/community\/posts\/(-?\d+)\/comments$/);
  if (communityPostCommentsMatch) {
    if (method === 'GET') {
      const cached = await db.communityPayloads.get(base);
      return (cached?.data ?? []) as T;
    }
    throw new OfflineCacheMissError(path);
  }

  const communityPostMatch = base.match(/^\/v1\/community\/posts\/(-?\d+)$/);
  if (communityPostMatch) {
    const postId = Number(communityPostMatch[1]);
    if (method === 'GET') {
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
    throw new OfflineCacheMissError(path);
  }

  const communityCommentMatch = base.match(/^\/v1\/community\/comments\/(-?\d+)$/);
  if (communityCommentMatch && method !== 'GET') {
    throw new OfflineCacheMissError(path);
  }

  // ── Consultations ───────────────────────────────────────────────────────

  if (base === '/v1/consultations') {
    if (method === 'GET') {
      const cached = await db.consultations.get('list');
      return (cached?.data ?? []) as T;
    }
    // POST (createConsultation) 등 쓰기 → 큐
    if (method === 'POST') {
      const consultationId = await createOfflineConsultation(body);
      await queueLocalCreate(path, body, 'consultation', consultationId);
    } else {
      await queueWriteRequest(method, path, body);
    }
    return undefined as T;
  }

  // /v1/consultations/:id/questions — 오프라인에서 질문 목록은 캐시 미지원
  const consultQuestionMatch = base.match(/^\/v1\/consultations\/(-?\d+)\/questions(?:\/(-?\d+))?$/);
  if (consultQuestionMatch) {
    if (!isWriteMethod(method)) throw new OfflineCacheMissError(path);
    const consultationId = Number(consultQuestionMatch[1]);
    const questionId = consultQuestionMatch[2] != null ? Number(consultQuestionMatch[2]) : null;

    // 특정 질문에 대한 쓰기 (DELETE 등)
    if (questionId != null) {
      // 오프라인에서 만든 임시 질문 삭제 → 대기 중인 생성 요청 자체를 취소 (서버 미반영)
      if (isTemporaryId(questionId)) {
        await deletePendingLocalCreate('consultationQuestion', questionId);
        return {} as T;
      }
      if (isTemporaryId(consultationId)) {
        await queueDependentWrite(method, path, body, 'consultation', consultationId, `/v1/consultations/{id}/questions/${questionId}`);
      } else {
        await queueWriteRequest(method, path, body);
      }
      return {} as T;
    }

    // 질문 생성 (POST /questions)
    if (method !== 'POST') throw new OfflineCacheMissError(path);
    const question = createOfflineConsultationQuestion(body);
    // 임시 질문 ID를 큐 항목에 기록 → 이후 삭제 시 대기 중인 생성 요청을 식별/취소 가능.
    await queueWrite('POST', path, body, isTemporaryId(consultationId)
      ? {
          localEntityType: 'consultationQuestion',
          localEntityId: question.questionId,
          dependsOnLocalEntityType: 'consultation',
          dependsOnLocalEntityId: consultationId,
          rewritePathTemplate: '/v1/consultations/{id}/questions',
        }
      : {
          localEntityType: 'consultationQuestion',
          localEntityId: question.questionId,
        });
    return question as T;
  }

  // /v1/consultations/:id/result
  const consultResultMatch = base.match(/^\/v1\/consultations\/(-?\d+)\/result$/);
  if (consultResultMatch) {
    const consultationId = Number(consultResultMatch[1]);
    if (isTemporaryId(consultationId)) {
      if (!isWriteMethod(method)) throw new OfflineCacheMissError(path);
      await queueDependentWrite(method, path, body, 'consultation', consultationId, '/v1/consultations/{id}/result');
    } else {
      await queueWriteRequest(method, path, body);
    }
    if (method === 'PATCH' || method === 'PUT') await updateOfflineConsultationResult(consultationId, body);
    if (method === 'DELETE') await updateOfflineConsultationResult(consultationId, {
      doctorAdvice: null,
      prescriptionNote: null,
    });
    return undefined as T;
  }

  // /v1/consultations/:id
  const consultDetailMatch = base.match(/^\/v1\/consultations\/(-?\d+)$/);
  if (consultDetailMatch) {
    const consultationId = parseInt(consultDetailMatch[1], 10);
    if (method === 'GET') {
      const cached = await db.consultationDetails.get(consultationId);
      if (!cached) throw new OfflineCacheMissError(path);
      return cached.data as T;
    }
    if (!isTemporaryId(consultationId)) await queueWriteRequest(method, path, body);
    if (isTemporaryId(consultationId) && (method === 'PATCH' || method === 'PUT') && isRecord(body)) {
      await mergePendingLocalCreateBody('consultation', consultationId, body);
    }
    if (isTemporaryId(consultationId) && method === 'DELETE') {
      await deletePendingLocalCreate('consultation', consultationId);
    }
    if (method === 'PATCH' || method === 'PUT') await updateOfflineConsultation(consultationId, body);
    if (method === 'DELETE') await deleteOfflineConsultation(consultationId);
    return undefined as T;
  }

  throw new OfflineCacheMissError(path);
}

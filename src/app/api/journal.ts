import { apiRequest } from './client';

const JOURNALS_BASE_PATH = '/v1/journals';

export type ConditionType = 'UP' | 'DOWN' | 'TIGHT' | 'FOGGY' | 'CALM' | 'USER_INPUT';
export type SleepQuality = 'GOOD' | 'NORMAL' | 'BAD';
export type TroubleType = 'INATTENTION' | 'HYPERACTIVITY' | 'IMPULSIVITY' | 'TIME_MANAGEMENT' | 'COGNITIVE_ERROR' | 'USER_INPUT';

export type JournalDateRange = {
  startDate: string;
  endDate: string;
};

export type ConditionTag = {
  tagId: number;
  condition: string;
  conditionType: ConditionType;
  visible: boolean;
};

export type SideEffectTag = {
  tagId: number;
  sideEffect: string;
  visible: boolean;
};

export type TroubleTag = {
  tagId: number;
  trouble: string;
  type: TroubleType;
  visible: boolean;
};

export type JournalGoal = {
  goalId: number;
  content: string;
};

export type SleepMealPayload = {
  sleepHour?: number | null;
  sleepQuality?: SleepQuality | null;
  ateBreakfast?: boolean | null;
  ateLunch?: boolean | null;
  ateDinner?: boolean | null;
};

export type JournalActiveTags = {
  conditions: ConditionTag[];
  sideEffects: SideEffectTag[];
  troubles: TroubleTag[];
  goals: JournalGoal[];
};

export type JournalChecked = {
  conditions: Array<ConditionTag & { checkedAt: string }>;
  sideEffects: Array<SideEffectTag & { checkedAt: string }>;
  troubles: Array<TroubleTag & { checkedAt: string }>;
  checkedCatalogTagIds?: number[];
  sleep?: { sleepHour: number; sleepQuality: SleepQuality } | null;
  meal?: { ateBreakfast: boolean; ateLunch: boolean; ateDinner: boolean } | null;
  goals: Array<JournalGoal & { score: number }>;
  memo?: string | null;
};

export type JournalDetail = {
  activeTags: JournalActiveTags;
  checked: JournalChecked;
};

export function getJournal(date: string) {
  return apiRequest<JournalDetail | null | undefined>(`${JOURNALS_BASE_PATH}/${date}`);
}

export function getJournalDates(params: JournalDateRange) {
  return apiRequest<{ dates: string[] }>(`${JOURNALS_BASE_PATH}/dates?${new URLSearchParams(params)}`);
}

export type JournalEntry = {
  date: string;
  checked: JournalChecked;
};

export type JournalListResponse = {
  activeTags: JournalActiveTags;
  journals: JournalEntry[];
};

export function getJournals(params: JournalDateRange) {
  return apiRequest<JournalListResponse>(`${JOURNALS_BASE_PATH}?${new URLSearchParams(params)}`);
}

export function deleteJournal(date: string) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}/${date}`, { method: 'DELETE' });
}

export function deleteJournals(params: JournalDateRange) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}?${new URLSearchParams(params)}`, { method: 'DELETE' });
}

export function getConditionTags() {
  return apiRequest<ConditionTag[]>(`${JOURNALS_BASE_PATH}/condition-tags`);
}

export function createConditionTag(payload: { condition: string; conditionType: ConditionType; journalDate: string }) {
  return apiRequest<ConditionTag>(`${JOURNALS_BASE_PATH}/condition-tags`, { method: 'POST', body: payload });
}

export function deleteConditionTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}/condition-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function toggleConditionTagVisible(tagId: number) {
  return apiRequest<ConditionTag>(`${JOURNALS_BASE_PATH}/condition-tags/${tagId}/visible`, { method: 'PATCH' });
}

export function checkCondition(tagId: number) {
  return apiRequest<ConditionTag & { checkedAt: string }>(`${JOURNALS_BASE_PATH}/conditions`, { method: 'POST', body: { tagId } });
}

export function uncheckCondition(tagId: number, date: string) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}/conditions?tagId=${tagId}&date=${encodeURIComponent(date)}`, { method: 'DELETE' });
}

export function getSideEffectTags() {
  return apiRequest<SideEffectTag[]>(`${JOURNALS_BASE_PATH}/side-effect-tags`);
}

export function createSideEffectTag(payload: { sideEffect: string; journalDate: string }) {
  return apiRequest<SideEffectTag>(`${JOURNALS_BASE_PATH}/side-effect-tags`, { method: 'POST', body: payload });
}

export function deleteSideEffectTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}/side-effect-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function toggleSideEffectTagVisible(tagId: number) {
  return apiRequest<SideEffectTag>(`${JOURNALS_BASE_PATH}/side-effect-tags/${tagId}/visible`, { method: 'PATCH' });
}

export function checkSideEffect(tagId: number) {
  return apiRequest<SideEffectTag & { checkedAt: string }>(`${JOURNALS_BASE_PATH}/side-effects`, { method: 'POST', body: { tagId } });
}

export function uncheckSideEffect(tagId: number, date: string) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}/side-effects?tagId=${tagId}&date=${encodeURIComponent(date)}`, { method: 'DELETE' });
}

export function getTroubleTags() {
  return apiRequest<TroubleTag[]>(`${JOURNALS_BASE_PATH}/trouble-tags`);
}

export function createTroubleTag(payload: { trouble: string; type: TroubleType; journalDate: string }) {
  return apiRequest<TroubleTag>(`${JOURNALS_BASE_PATH}/trouble-tags`, { method: 'POST', body: payload });
}

export function deleteTroubleTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}/trouble-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function toggleTroubleTagVisible(tagId: number) {
  return apiRequest<TroubleTag>(`${JOURNALS_BASE_PATH}/trouble-tags/${tagId}/visible`, { method: 'PATCH' });
}

export function checkTrouble(tagId: number) {
  return apiRequest<TroubleTag & { checkedAt: string }>(`${JOURNALS_BASE_PATH}/troubles`, { method: 'POST', body: { tagId } });
}

export function uncheckTrouble(tagId: number, date: string) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}/troubles?tagId=${tagId}&date=${encodeURIComponent(date)}`, { method: 'DELETE' });
}

export type SleepMealRecord = {
  journalDate: string;
  sleepHour: number | null;
  sleepQuality: SleepQuality | null;
  ateBreakfast: boolean | null;
  ateLunch: boolean | null;
  ateDinner: boolean | null;
};

export type MemoRecord = {
  journalDate: string;
  memo: string;
};

export function getMemo(date: string) {
  return apiRequest<MemoRecord | undefined>(`${JOURNALS_BASE_PATH}/${date}/memo`);
}

export function createSleepMeal(date: string, payload: SleepMealPayload) {
  return apiRequest<SleepMealRecord>(`${JOURNALS_BASE_PATH}/${date}/sleep-meal`, { method: 'POST', body: payload });
}

export function createJournalGoal(payload: { content: string; journalDate: string }) {
  return apiRequest<JournalGoal>(`${JOURNALS_BASE_PATH}/goals`, {
    method: 'POST',
    body: payload,
  });
}

export function updateJournalGoal(goalId: number, content: string) {
  return apiRequest<JournalGoal>(`${JOURNALS_BASE_PATH}/goals/${goalId}`, {
    method: 'PATCH',
    body: { content },
  });
}

export function deleteJournalGoal(goalId: number, journalDate: string) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}/goals/${goalId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function scoreJournalGoal(date: string, payload: { goalId: number; score: number }) {
  return apiRequest<{ goalId: number; score: number; journalDate: string }>(`${JOURNALS_BASE_PATH}/${date}/goals`, { method: 'POST', body: payload });
}

export function createMemo(date: string, memo: string) {
  return apiRequest<MemoRecord>(`${JOURNALS_BASE_PATH}/${date}/memo`, { method: 'POST', body: { memo } });
}

// ── Journal tag API ───────────────────────────────────────────────────────────

export type JournalTagCategory = 'CONDITION' | 'SIDE_EFFECT' | 'TROUBLE';
export type JournalTagScope = 'SYSTEM' | 'USER';

export type JournalTag = {
  tagId: number;
  category: JournalTagCategory;
  name: string;
  tagType: string;
  scope: JournalTagScope;
  enabled: boolean;
  visible: boolean;
};

export type JournalTagCheck = {
  tagId: number;
  category: JournalTagCategory;
  name: string;
  tagType: string;
  journalDate: string;
  checkedAt: string;
};

export function getJournalTags(category: JournalTagCategory, options: { manage?: boolean } = {}) {
  const params = new URLSearchParams({ category });
  if (options.manage) params.set('manage', 'true');
  return apiRequest<JournalTag[]>(`${JOURNALS_BASE_PATH}/tags?${params}`);
}

export function updateJournalTagPreference(tagId: number, payload: { enabled: boolean; visible: boolean }) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}/tags/${tagId}/preference`, {
    method: 'PATCH',
    body: payload,
  });
}

export type CreateJournalTagPayload = {
  category: JournalTagCategory;
  name: string;
  tagType: string;
  visible: boolean;
};

function normalizeJournalTagPayload(payload: CreateJournalTagPayload): CreateJournalTagPayload {
  return {
    ...payload,
    tagType: payload.category === 'SIDE_EFFECT' ? 'NONE' : payload.tagType,
  };
}

export function createJournalTag(payload: CreateJournalTagPayload) {
  return apiRequest<JournalTag>(`${JOURNALS_BASE_PATH}/tags`, {
    method: 'POST',
    body: normalizeJournalTagPayload(payload),
  });
}

export function checkJournalTag(tagId: number, journalDate: string) {
  return apiRequest<JournalTagCheck>(`${JOURNALS_BASE_PATH}/tags/${tagId}/checks`, {
    method: 'POST',
    body: { journalDate },
  });
}

export function uncheckJournalTag(tagId: number, date: string) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}/tags/${tagId}/checks?date=${encodeURIComponent(date)}`, {
    method: 'DELETE',
  });
}

export function deleteJournalTag(tagId: number) {
  return apiRequest<void>(`${JOURNALS_BASE_PATH}/tags/${tagId}`, {
    method: 'DELETE',
  });
}

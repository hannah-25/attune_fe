import { apiRequest } from './client';

export type ConditionType = 'UP' | 'DOWN' | 'TIGHT' | 'FOGGY' | 'CALM';
export type SleepQuality = 'GOOD' | 'NORMAL' | 'BAD';
export type TroubleType = 'INATTENTION' | 'HYPERACTIVITY' | 'IMPULSIVITY' | 'TIME_MANAGEMENT' | 'COGNITIVE_ERROR';

export type JournalDateRange = {
  startDate: string;
  endDate: string;
};

export type ConditionTag = {
  tagId: number;
  condition: string;
  conditionType: ConditionType;
};

export type SideEffectTag = {
  tagId: number;
  sideEffect: string;
};

export type TroubleTag = {
  tagId: number;
  trouble: string;
  type: TroubleType;
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

export type JournalDetail = {
  activeTags: {
    conditions: ConditionTag[];
    sideEffects: SideEffectTag[];
    troubles: TroubleTag[];
    goals: JournalGoal[];
  };
  checked: {
    conditions: Array<ConditionTag & { checkedAt: string }>;
    sideEffects: Array<SideEffectTag & { checkedAt: string }>;
    troubles: Array<TroubleTag & { checkedAt: string }>;
    sleep?: { sleepHour: number; sleepQuality: SleepQuality } | null;
    meal?: { ateBreakfast: boolean; ateLunch: boolean; ateDinner: boolean } | null;
    goals: Array<JournalGoal & { score: number }>;
    memo?: string | null;
  };
};

export function getJournal(date: string) {
  return apiRequest<JournalDetail>(`/v1/journals/${date}`);
}

export function getJournalDates(params: JournalDateRange) {
  return apiRequest<{ dates: string[] }>(`/v1/journals?${new URLSearchParams(params)}`);
}

export function deleteJournal(date: string) {
  return apiRequest<{ deletedDate: string; success: boolean }>(`/v1/journals/${date}`, { method: 'DELETE' });
}

export function deleteJournals(params: JournalDateRange) {
  return apiRequest<{ deletedRange: JournalDateRange; count: number }>(`/v1/journals?${new URLSearchParams(params)}`, { method: 'DELETE' });
}

export function getConditionTags() {
  return apiRequest<ConditionTag[]>('/v1/journals/condition-tags');
}

export function createConditionTag(payload: { condition: string; conditionType: ConditionType; journalDate: string }) {
  return apiRequest<ConditionTag>('/v1/journals/condition-tags', { method: 'POST', body: payload });
}

export function deleteConditionTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`/v1/journals/condition-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function checkCondition(tagId: number) {
  return apiRequest<ConditionTag & { checkedAt: string }>('/v1/journals/conditions', { method: 'POST', body: { tagId } });
}

export function uncheckCondition(tagId: number, date: string) {
  return apiRequest<void>(`/v1/journals/conditions?tagId=${tagId}&date=${encodeURIComponent(date)}`, { method: 'DELETE' });
}

export function getSideEffectTags() {
  return apiRequest<SideEffectTag[]>('/v1/journals/side-effect-tags');
}

export function createSideEffectTag(payload: { sideEffect: string; journalDate: string }) {
  return apiRequest<SideEffectTag>('/v1/journals/side-effect-tags', { method: 'POST', body: payload });
}

export function deleteSideEffectTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`/v1/journals/side-effect-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function checkSideEffect(tagId: number) {
  return apiRequest<SideEffectTag & { checkedAt: string }>('/v1/journals/side-effects', { method: 'POST', body: { tagId } });
}

export function uncheckSideEffect(tagId: number, date: string) {
  return apiRequest<void>(`/v1/journals/side-effects?tagId=${tagId}&date=${encodeURIComponent(date)}`, { method: 'DELETE' });
}

export function getTroubleTags() {
  return apiRequest<TroubleTag[]>('/v1/journals/trouble-tags');
}

export function createTroubleTag(payload: { trouble: string; type: TroubleType; journalDate: string }) {
  return apiRequest<TroubleTag>('/v1/journals/trouble-tags', { method: 'POST', body: payload });
}

export function deleteTroubleTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`/v1/journals/trouble-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function checkTrouble(tagId: number) {
  return apiRequest<TroubleTag & { checkedAt: string }>('/v1/journals/troubles', { method: 'POST', body: { tagId } });
}

export function uncheckTrouble(tagId: number, date: string) {
  return apiRequest<void>(`/v1/journals/troubles?tagId=${tagId}&date=${encodeURIComponent(date)}`, { method: 'DELETE' });
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

export function getSleepMeal(date: string) {
  return apiRequest<SleepMealRecord | undefined>(`/v1/journals/${date}/sleep-meal`);
}

export function getMemo(date: string) {
  return apiRequest<MemoRecord | undefined>(`/v1/journals/${date}/memo`);
}

export function createSleepMeal(date: string, payload: SleepMealPayload) {
  return apiRequest<SleepMealPayload>(`/v1/journals/${date}/sleep-meal`, { method: 'POST', body: payload });
}

export function createJournalGoal(payload: { content: string; journalDate: string }) {
  return apiRequest<JournalGoal>('/v1/journals/goals', {
    method: 'POST',
    body: payload,
  });
}

export function updateJournalGoal(goalId: number, content: string) {
  return apiRequest<JournalGoal>(`/v1/journals/goals/${goalId}`, {
    method: 'PATCH',
    body: { content },
  });
}

export function deleteJournalGoal(goalId: number, journalDate: string) {
  return apiRequest<void>(`/v1/journals/goals/${goalId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function scoreJournalGoal(date: string, payload: { goalId: number; score: number }) {
  return apiRequest<{ goalId: number; score: number; journalDate: string }>(`/v1/journals/${date}/goals`, { method: 'POST', body: payload });
}

export function createMemo(date: string, memo: string) {
  return apiRequest<{ memo: string }>(`/v1/journals/${date}/memo`, { method: 'POST', body: { memo } });
}

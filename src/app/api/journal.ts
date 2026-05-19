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
  return apiRequest<JournalDetail>(`/api/journals/${date}`);
}

export function getJournalDates(params: JournalDateRange) {
  return apiRequest<{ dates: string[] }>(`/api/journals?${new URLSearchParams(params)}`);
}

export function deleteJournal(date: string) {
  return apiRequest<{ deletedDate: string; success: boolean }>(`/api/journals/${date}`, { method: 'DELETE' });
}

export function deleteJournals(params: JournalDateRange) {
  return apiRequest<{ deletedRange: JournalDateRange; count: number }>(`/api/journals?${new URLSearchParams(params)}`, { method: 'DELETE' });
}

export function getConditionTags() {
  return apiRequest<ConditionTag[]>('/api/journals/condition-tags');
}

export function createConditionTag(payload: { condition: string; conditionType: ConditionType; journalDate: string }) {
  return apiRequest<ConditionTag>('/api/journals/condition-tags', { method: 'POST', body: payload });
}

export function deleteConditionTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`/api/journals/condition-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function checkCondition(tagId: number) {
  return apiRequest<ConditionTag & { checkedAt: string }>('/api/journals/conditions', { method: 'POST', body: { tagId } });
}

export function getSideEffectTags() {
  return apiRequest<SideEffectTag[]>('/api/journals/side-effect-tags');
}

export function createSideEffectTag(payload: { sideEffect: string; journalDate: string }) {
  return apiRequest<SideEffectTag>('/api/journals/side-effect-tags', { method: 'POST', body: payload });
}

export function deleteSideEffectTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`/api/journals/side-effect-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function checkSideEffect(tagId: number) {
  return apiRequest<SideEffectTag & { checkedAt: string }>('/api/journals/side-effects', { method: 'POST', body: { tagId } });
}

export function getTroubleTags() {
  return apiRequest<TroubleTag[]>('/api/journals/trouble-tags');
}

export function createTroubleTag(payload: { trouble: string; type: TroubleType; journalDate: string }) {
  return apiRequest<TroubleTag>('/api/journals/trouble-tags', { method: 'POST', body: payload });
}

export function deleteTroubleTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`/api/journals/trouble-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function checkTrouble(tagId: number) {
  return apiRequest<TroubleTag & { checkedAt: string }>('/api/journals/troubles', { method: 'POST', body: { tagId } });
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
  return apiRequest<SleepMealRecord | undefined>(`/api/journals/${date}/sleep-meal`);
}

export function getMemo(date: string) {
  return apiRequest<MemoRecord | undefined>(`/api/journals/${date}/memo`);
}

export function createSleepMeal(date: string, payload: SleepMealPayload) {
  return apiRequest<SleepMealPayload>(`/api/journals/${date}/sleep-meal`, { method: 'POST', body: payload });
}

export function createJournalGoal(payload: { content: string; journalDate: string }) {
  return apiRequest<JournalGoal>('/api/journals/goals', {
    method: 'POST',
    body: payload,
  });
}

export function updateJournalGoal(goalId: number, content: string) {
  return apiRequest<JournalGoal>(`/api/journals/goals/${goalId}`, {
    method: 'PATCH',
    body: { content },
  });
}

export function deleteJournalGoal(goalId: number, journalDate: string) {
  return apiRequest<void>(`/api/journals/goals/${goalId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function scoreJournalGoal(date: string, payload: { goalId: number; score: number }) {
  return apiRequest<{ goalId: number; score: number; journalDate: string }>(`/api/journals/${date}/goals`, { method: 'POST', body: payload });
}

export function createMemo(date: string, memo: string) {
  return apiRequest<{ memo: string }>(`/api/journals/${date}/memo`, { method: 'POST', body: { memo } });
}

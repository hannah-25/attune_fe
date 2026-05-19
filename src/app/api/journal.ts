import { apiRequest } from './client';

export type ConditionType = 'UP' | 'DOWN' | 'TIGHT' | 'FOGGY' | 'CALM';
export type SleepQuality = 'GOOD' | 'NORMAL' | 'BAD';

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
  type: string;
};

export type JournalGoal = {
  goalId: number;
  dailyGoal: string;
  isActive?: boolean;
};

export type SleepMealPayload = {
  sleepHour?: number | null;
  sleepQuality?: SleepQuality | null;
  ateBreakfast?: boolean | null;
  ateLunch?: boolean | null;
  ateDinner?: boolean | null;
};

export function getJournal(date: string) {
  return apiRequest<unknown>(`/api/journals/${date}`);
}

export function getJournalDates(params: JournalDateRange) {
  return apiRequest<{ dates: string[] }>(`/api/journals?${new URLSearchParams(params)}`);
}

export function deleteJournal(date: string) {
  return apiRequest<void>(`/api/journals/${date}`, { method: 'DELETE' });
}

export function deleteJournals(params: JournalDateRange) {
  return apiRequest<void>(`/api/journals?${new URLSearchParams(params)}`, { method: 'DELETE' });
}

export function getConditionTags() {
  return apiRequest<ConditionTag[]>('/api/journals/condition-tags');
}

export function createConditionTag(payload: { condition: string; conditionType: ConditionType; journalDate: string }) {
  return apiRequest<void>('/api/journals/condition-tags', { method: 'POST', body: payload });
}

export function deleteConditionTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`/api/journals/condition-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function checkCondition(tagId: number) {
  return apiRequest<void>('/api/journals/conditions', { method: 'POST', body: { tagId } });
}

export function getSideEffectTags() {
  return apiRequest<SideEffectTag[]>('/api/journals/side-effect-tags');
}

export function createSideEffectTag(payload: { sideEffect: string; journalDate: string }) {
  return apiRequest<void>('/api/journals/side-effect-tags', { method: 'POST', body: payload });
}

export function deleteSideEffectTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`/api/journals/side-effect-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function checkSideEffect(tagId: number) {
  return apiRequest<void>('/api/journals/side-effects', { method: 'POST', body: { tagId } });
}

export function getTroubleTags() {
  return apiRequest<TroubleTag[]>('/api/journals/trouble-tags');
}

export function createTroubleTag(payload: { trouble: string; type: string; journalDate: string }) {
  return apiRequest<void>('/api/journals/trouble-tags', { method: 'POST', body: payload });
}

export function deleteTroubleTag(tagId: number, journalDate: string) {
  return apiRequest<void>(`/api/journals/trouble-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function checkTrouble(tagId: number) {
  return apiRequest<void>('/api/journals/troubles', { method: 'POST', body: { tagId } });
}

export function createSleepMeal(date: string, payload: SleepMealPayload) {
  return apiRequest<void>(`/api/journals/${date}/sleep-meal`, { method: 'POST', body: payload });
}

export function updateSleepMeal(date: string, payload: SleepMealPayload) {
  return apiRequest<void>(`/api/journals/${date}/sleep-meal`, { method: 'PATCH', body: payload });
}

export function createJournalGoal(dailyGoal: string) {
  return apiRequest<{ goalId: number; dailyGoal: string }>('/api/journals/goals', {
    method: 'POST',
    body: { dailyGoal },
  });
}

export function deleteJournalGoal(goalId: number, journalDate: string) {
  return apiRequest<void>(`/api/journals/goals/${goalId}?journalDate=${encodeURIComponent(journalDate)}`, {
    method: 'DELETE',
  });
}

export function scoreJournalGoal(date: string, payload: { goalId: number; score: number }) {
  return apiRequest<void>(`/api/journals/${date}/goals`, { method: 'POST', body: payload });
}

export function createMemo(date: string, content: string) {
  return apiRequest<void>(`/api/journals/${date}/memo`, { method: 'POST', body: { content } });
}

export function updateMemo(date: string, content: string) {
  return apiRequest<void>(`/api/journals/${date}/memo`, { method: 'PATCH', body: { content } });
}

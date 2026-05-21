import { apiRequest } from './client';

export type ScheduleSource = 'MANUAL' | 'IMPORTED';

export type ScheduleCategory = {
  categoryId: number;
  categoryName: string;
  color: string;
};

export type SchedulePayload = {
  title: string;
  description?: string;
  categoryId: number;
  place?: string;
  isAllDay: boolean;
  startTime: string;
  endTime: string;
  alarmEnabled: boolean;
  alarmedAt: string[];
};

export type ScheduleSummary = {
  scheduleId: number;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  source: ScheduleSource;
};

export type ScheduleDetail = {
  title: string;
  description?: string;
  categoryId: number;
  place?: string;
  isAllDay: boolean;
  startTime: string;
  endTime: string;
};

export function getScheduleCategories() {
  return apiRequest<{ categories: ScheduleCategory[] }>('/api/schedule-categories');
}

export function createScheduleCategory(payload: { categoryName: string; color: string }) {
  return apiRequest<{ categoryId: number; categoryName: string }>('/api/schedule-categories', { method: 'POST', body: payload });
}

export function updateScheduleCategory(categoryId: number, payload: { categoryName: string; color: string }) {
  return apiRequest<void>(`/api/schedule-categories/${categoryId}`, { method: 'PATCH', body: payload });
}

export function deleteScheduleCategory(categoryId: number) {
  return apiRequest<void>(`/api/schedule-categories/${categoryId}`, { method: 'DELETE' });
}

export function createSchedule(payload: SchedulePayload) {
  return apiRequest<void>('/api/schedules', { method: 'POST', body: payload });
}

export function getSchedules(params: { startDate: string; endDate: string; source?: ScheduleSource }) {
  return apiRequest<{ schedules: ScheduleSummary[] }>(`/api/schedules?${new URLSearchParams(removeEmpty(params))}`);
}

export function getSchedule(scheduleId: number) {
  return apiRequest<ScheduleDetail>(`/api/schedules/${scheduleId}`);
}

export function updateSchedule(scheduleId: number, payload: Partial<SchedulePayload>) {
  return apiRequest<void>(`/api/schedules/${scheduleId}`, { method: 'PATCH', body: payload });
}

export function deleteSchedule(scheduleId: number) {
  return apiRequest<void>(`/api/schedules/${scheduleId}`, { method: 'DELETE' });
}

export function updateScheduleAlarms(scheduleId: number, payload: { alarmEnabled: boolean; alarmedAt: string[] }) {
  return apiRequest<void>(`/api/schedules/${scheduleId}/alarms`, { method: 'PUT', body: payload });
}

function removeEmpty(params: Record<string, string | undefined>) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined)) as Record<string, string>;
}

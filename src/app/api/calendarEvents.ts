import { apiRequest } from './client';
import type { CalendarProvider } from './calendarConnection';

export type CalendarEventSource = 'ATTUNE' | 'EXTERNAL';

export type CalendarEvent = {
  id: string;
  scheduleId: number | null;
  source: CalendarEventSource;
  provider: CalendarProvider | null;
  title: string;
  description?: string | null;
  location?: string | null;
  isAllDay: boolean;
  startTime: string;
  endTime: string;
  categoryId: number | null;
  color?: string | null;
  editable: boolean;
};

export function getCalendarEvents(params: { startDate: string; endDate: string }) {
  return apiRequest<{ events: CalendarEvent[] }>(`/v1/calendar/events?${new URLSearchParams(params)}`);
}

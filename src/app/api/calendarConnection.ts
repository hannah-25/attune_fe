import { apiRequest } from './client';

export type CalendarProvider = 'GOOGLE';

export type CalendarConnection = {
  connectionId: number;
  provider: CalendarProvider;
  accountEmail: string | null;
  selectedCalendarIds: string[];
  lastSyncedAt: string | null;
  active: boolean;
};

export type CalendarSyncResult = {
  connectionId: number;
  lastSyncedAt: string;
  syncedCount: number;
};

export function getCalendarConnections() {
  return apiRequest<{ connections: CalendarConnection[] }>('/v1/calendar-connections');
}

export function connectGoogleCalendar(payload: { authorizationCode: string; redirectUri: string }) {
  return apiRequest<CalendarConnection>('/v1/calendar-connections/google', {
    method: 'POST',
    body: payload,
  });
}

export function syncCalendarConnection(connectionId: number) {
  return apiRequest<CalendarSyncResult>(`/v1/calendar-connections/${connectionId}/sync`, {
    method: 'POST',
  });
}

export function disconnectCalendarConnection(connectionId: number) {
  return apiRequest<void>(`/v1/calendar-connections/${connectionId}`, {
    method: 'DELETE',
  });
}

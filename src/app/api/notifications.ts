import { apiRequest } from './client';

export type NotificationHistoryStatus = 'SENDING' | 'SENT' | 'FAILED' | 'SKIPPED';
export type NotificationDeliveryStatus = 'PROVIDER_ACCEPTED' | 'RECEIVED' | 'DISPLAYED' | 'OPENED';
export type NotificationReadFilter = 'UNREAD' | 'READ';

export type NotificationItem = {
  id: number;
  alarmType: string;
  title: string;
  body: string;
  url: string;
  status: NotificationHistoryStatus;
  deliveryStatus: NotificationDeliveryStatus | null;
  sentAt: string;
  readAt: string | null;
};

export type NotificationListResponse = {
  notifications: NotificationItem[];
  nextCursor: string | null;
};

export type GetNotificationsParams = {
  status?: NotificationReadFilter;
  cursor?: string | null;
  size?: number;
};

export function getNotifications(params?: GetNotificationsParams) {
  const query = new URLSearchParams();
  if (params?.status) query.set('status', params.status);
  if (params?.cursor) query.set('cursor', params.cursor);
  if (params?.size) query.set('size', String(params.size));

  const qs = query.toString();
  const path = qs ? `/v1/notifications?${qs}` : '/v1/notifications';

  return apiRequest<NotificationListResponse>(path, { method: 'GET' });
}

export function markNotificationRead(notificationId: number) {
  return apiRequest<void>(`/v1/notifications/${notificationId}/read`, { method: 'PATCH' });
}

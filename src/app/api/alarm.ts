import { apiRequest } from './client';

export type AlarmSubscriptionRequest = {
  platform: 'WEB';
  provider: 'WEB_PUSH';
  endpoint: string;
  p256dh: string;
  auth: string;
};

export type AlarmSubscription = {
  id: number;
  platform: string;
  provider: string;
  enabled: boolean;
};

export function subscribeAlarm(payload: AlarmSubscriptionRequest) {
  return apiRequest<AlarmSubscription>('/v1/alarm/subscriptions', {
    method: 'POST',
    body: payload,
  });
}

export function unsubscribeAlarm(endpointOrToken: string) {
  return apiRequest<void>(`/v1/alarm/subscriptions?endpointOrToken=${encodeURIComponent(endpointOrToken)}`, {
    method: 'DELETE',
  });
}

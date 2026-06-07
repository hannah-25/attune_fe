import { subscribeAlarm, unsubscribeAlarm } from '../api/alarm';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;

export function supportsPush(): boolean {
  return Boolean(
    VAPID_PUBLIC_KEY
    && 'Notification' in window
    && 'serviceWorker' in navigator
    && 'PushManager' in window,
  );
}

export async function isPushSubscribed(): Promise<boolean> {
  if (!supportsPush() || Notification.permission !== 'granted') return false;
  const registration = await navigator.serviceWorker.getRegistration();
  return Boolean(await registration?.pushManager?.getSubscription());
}

export async function syncPushSubscription(): Promise<boolean> {
  if (!supportsPush() || Notification.permission !== 'granted') return false;

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager?.getSubscription();
    if (!subscription) return false;

    return await registerSubscription(subscription);
  } catch (err) {
    console.error('[push] subscription sync failed:', err);
    return false;
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export async function subscribeToPush(): Promise<boolean> {
  if (!supportsPush() || !VAPID_PUBLIC_KEY) {
    console.warn('[push] Web Push is not supported or VITE_VAPID_PUBLIC_KEY is missing');
    return false;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;

  try {
    let registration: ServiceWorkerRegistration;
    let existing = await navigator.serviceWorker.getRegistration();
    if (!existing && import.meta.env.PROD) {
      existing = await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
        scope: import.meta.env.BASE_URL,
      });
    }

    if (existing?.active) {
      registration = existing;
    } else {
      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      try {
        const timeout = new Promise<never>((_, reject) => {
          const error = new Error('ServiceWorker ready timeout');
          error.name = 'ServiceWorkerTimeoutError';
          timeoutId = setTimeout(() => reject(error), 15000);
        });
        registration = await Promise.race([navigator.serviceWorker.ready, timeout]);
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }
    }
    const subscription = await registration.pushManager.getSubscription()
      ?? await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

    return await registerSubscription(subscription);
  } catch (err) {
    console.error('[push] subscribe failed:', err);
    if (err instanceof Error && err.name === 'ServiceWorkerTimeoutError') throw err;
    return false;
  }
}

async function registerSubscription(subscription: PushSubscription): Promise<boolean> {
  const json = subscription.toJSON();
  const endpoint = json.endpoint;
  const p256dh = json.keys?.['p256dh'];
  const auth = json.keys?.['auth'];

  if (!endpoint || !p256dh || !auth) return false;

  await subscribeAlarm({ platform: 'WEB', provider: 'WEB_PUSH', endpoint, p256dh, auth });
  return true;
}

export async function unsubscribeFromPush(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) return;

    const endpoint = subscription.endpoint;
    try {
      await unsubscribeAlarm(endpoint);
    } catch (err) {
      console.error('[push] server unsubscribe failed:', err);
    }
    await subscription.unsubscribe();
  } catch (err) {
    console.error('[push] unsubscribe failed:', err);
  }
}

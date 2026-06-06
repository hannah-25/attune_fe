import { subscribeAlarm, unsubscribeAlarm } from '../api/alarm';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export async function subscribeToPush(): Promise<boolean> {
  if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    return false;
  }

  if (!VAPID_PUBLIC_KEY) {
    console.warn('[push] VITE_VAPID_PUBLIC_KEY not set — skipping push subscription');
    return false;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    const json = subscription.toJSON();
    const endpoint = json.endpoint;
    const p256dh = json.keys?.['p256dh'];
    const auth = json.keys?.['auth'];

    if (!endpoint || !p256dh || !auth) return false;

    await subscribeAlarm({ platform: 'WEB', provider: 'WEB_PUSH', endpoint, p256dh, auth });
    return true;
  } catch (err) {
    console.error('[push] subscribe failed:', err);
    return false;
  }
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

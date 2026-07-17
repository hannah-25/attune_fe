import { subscribeAlarm, unsubscribeAlarm } from '../api/alarm';
import { createMutex } from './mutex';
import { decidePushSync, type PushOptIn } from './pushPolicy';
import { isStaleApplicationServerKey, urlBase64ToArrayBuffer } from './webPushKey';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;
const OPT_IN_KEY = 'push_opt_in';
const SW_READY_TIMEOUT_MS = 15_000;

// 등록·해제·재동기화는 모두 "이 기기의 구독"이라는 하나의 상태를 건드린다. 직렬화하지 않으면
// 해제 도중 뒤늦게 착지한 재동기화 POST가 방금 해제한 구독을 서버에 되살린다.
const withDeviceLock = createMutex();

let syncInFlight: Promise<boolean> | null = null;

function readOptIn(): PushOptIn {
  const value = localStorage.getItem(OPT_IN_KEY);
  return value === 'true' || value === 'false' ? value : null;
}

function writeOptIn(value: 'true' | 'false'): void {
  localStorage.setItem(OPT_IN_KEY, value);
}

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

async function resolveRegistration(): Promise<ServiceWorkerRegistration> {
  let existing = await navigator.serviceWorker.getRegistration();
  if (!existing && import.meta.env.PROD) {
    existing = await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
      scope: import.meta.env.BASE_URL,
    });
  }

  if (existing?.active) return existing;

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<never>((_, reject) => {
      const error = new Error('ServiceWorker ready timeout');
      error.name = 'ServiceWorkerTimeoutError';
      timeoutId = setTimeout(() => reject(error), SW_READY_TIMEOUT_MS);
    });
    return await Promise.race([navigator.serviceWorker.ready, timeout]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

// 권한이 이미 granted라는 전제 — 그래야 subscribe()가 권한 프롬프트를 띄우지 않는다.
// 호출부는 반드시 락 안에서 부른다.
async function ensureSubscribedAndRegister(optIn: PushOptIn): Promise<boolean> {
  if (!VAPID_PUBLIC_KEY) return false;

  const registration = await resolveRegistration();
  let subscription = await registration.pushManager.getSubscription();

  // 판정은 낡은 키를 걷어내기 전에 한다. 걷어낸 뒤에 판정하면 레거시 기기의 낡은 구독이
  // "구독 없음"으로 보여 skip되고, 방금 해제한 구독을 되살리지 못한 채 끝난다.
  const { action, promoteOptIn } = decidePushSync(optIn, Boolean(subscription));
  if (action === 'skip') return false;

  const applicationServerKey = urlBase64ToArrayBuffer(VAPID_PUBLIC_KEY);
  if (subscription && isStaleApplicationServerKey(subscription.options.applicationServerKey, applicationServerKey)) {
    await subscription.unsubscribe();
    subscription = null;
  }

  subscription ??= await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });

  const registered = await registerSubscription(subscription);
  if (registered && promoteOptIn) writeOptIn('true');
  return registered;
}

export async function subscribeToPush(): Promise<boolean> {
  if (!supportsPush() || !VAPID_PUBLIC_KEY) {
    console.warn('[push] Web Push is not supported or VITE_VAPID_PUBLIC_KEY is missing');
    return false;
  }

  // 권한 프롬프트는 사용자가 응답할 때까지 열려 있으므로 락 밖에서 처리한다.
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;

  return withDeviceLock(async () => {
    try {
      const subscribed = await ensureSubscribedAndRegister('true');
      if (subscribed) writeOptIn('true');
      return subscribed;
    } catch (err) {
      console.error('[push] subscribe failed:', err);
      if (err instanceof Error && err.name === 'ServiceWorkerTimeoutError') throw err;
      return false;
    }
  });
}

// 앱 시작·로그인 직후의 배경 재동기화.
//
// 브라우저는 구독 endpoint를 주기적으로 교체·폐기하는데, 그러면 서버가 들고 있는 endpoint는
// 죽은 채로 남아 발송이 조용히 실패한다. 서버 구독 상태를 조회할 API가 없으므로
// (POST/DELETE만 존재) 매번 재등록해서 서버를 현재 구독에 맞춘다.
//
// 배경 작업이므로 절대 throw하지 않는다 — 실패는 false로 흡수하고 여기서만 로깅한다.
export function syncPushSubscription(): Promise<boolean> {
  if (syncInFlight) return syncInFlight;

  syncInFlight = withDeviceLock(async () => {
    try {
      if (!supportsPush() || Notification.permission !== 'granted') return false;

      // 락을 기다리는 동안 사용자가 껐을 수 있으므로 여기서 다시 읽는다.
      const optIn = readOptIn();
      if (optIn === 'false') return false;

      return await ensureSubscribedAndRegister(optIn);
    } catch (err) {
      console.error('[push] subscription sync failed:', err);
      return false;
    }
  }).finally(() => {
    syncInFlight = null;
  });

  return syncInFlight;
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

async function unsubscribeSubscription(): Promise<void> {
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

// 기기 정리용(로그아웃). 이 기기에서 알림을 받겠다는 의도 자체는 바꾸지 않으므로 opt-in을
// 건드리지 않는다 — 여기서 끄면 재로그인 후 알림이 오지 않고 사용자가 다시 켜야 한다.
export function unsubscribeFromPush(): Promise<void> {
  return withDeviceLock(unsubscribeSubscription);
}

// 사용자가 알림 설정에서 이 기기의 알림을 끈 경우.
export function disablePushOnThisDevice(): Promise<void> {
  return withDeviceLock(async () => {
    // 의도를 먼저 기록한다. 락을 기다리던 재동기화가 이 값을 읽고 물러난다.
    writeOptIn('false');
    await unsubscribeSubscription();
  });
}

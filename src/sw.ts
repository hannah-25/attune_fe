/// <reference lib="webworker" />

export {};

type PushPayload = {
  title?: string;
  body?: string;
  url?: string;
  deliveryAttemptId?: string;
  receiptToken?: string;
};

type DeliveryEvent = 'RECEIVED' | 'DISPLAYED' | 'OPENED';

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision?: string }>;
};

const sw = self;
const PRECACHE_NAME = 'attune-precache-v2';
const RUNTIME_CACHE_NAME = 'attune-runtime-v1';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? 'http://localhost:8080';
const RECEIPT_TIMEOUT_MS = 3000;
const precacheUrls = (self.__WB_MANIFEST ?? []).map((entry) => entry.url);
const precachePathnames = new Set(precacheUrls.map((url) => new URL(url, sw.location.origin).pathname));

function hasDeliveryReceipt(payload: PushPayload): payload is PushPayload & { deliveryAttemptId: string; receiptToken: string } {
  return typeof payload.deliveryAttemptId === 'string' && payload.deliveryAttemptId.length > 0
    && typeof payload.receiptToken === 'string' && payload.receiptToken.length > 0;
}

// 영수증 전송은 관측용이며 절대 알림 표시·클릭 이동을 막지 않는다(fail-open) — 타임아웃과
// 네트워크 실패를 여기서 전부 삼킨다. 서버는 성공·중복·토큰 오류·만료 모두 204로 응답한다.
function sendDeliveryEvent(deliveryAttemptId: string, receiptToken: string, event: DeliveryEvent): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), RECEIPT_TIMEOUT_MS);

  return fetch(`${API_BASE_URL}/v1/notification-delivery-attempts/${deliveryAttemptId}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, receiptToken }),
    signal: controller.signal,
  })
    .then(() => undefined)
    .catch(() => undefined)
    .finally(() => clearTimeout(timeoutId));
}

function offlineResponse(headers?: HeadersInit): Response {
  return new Response('', { headers, status: 504, statusText: 'Offline' });
}

function isApiPath(pathname: string): boolean {
  return pathname.startsWith('/v1/');
}

function isAuthOrAccountPath(pathname: string): boolean {
  return pathname.startsWith('/v1/auth/') || pathname.startsWith('/v1/account/');
}

async function cachedOrNetwork(
  request: Request,
  extendLifetime: (promise: Promise<unknown>) => void,
): Promise<Response> {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.status === 200) {
      // 캐시 저장은 응답 반환과 분리하되(저장 실패가 응답을 망치지 않도록),
      // event.waitUntil로 SW 수명을 연장해 저장이 잘리지 않게 한다.
      extendLifetime(
        caches.open(RUNTIME_CACHE_NAME)
          .then(cache => cache.put(request, response.clone()))
          .catch(() => {}),
      );
    }
    return response;
  } catch {
    return offlineResponse();
  }
}

async function navigationResponse(request: Request): Promise<Response> {
  const cached = await caches.match('/index.html', { ignoreSearch: true });
  if (cached) return cached;

  try {
    return await fetch(request);
  } catch {
    return new Response('<!doctype html><title>Offline</title>', {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      status: 503,
      statusText: 'Offline',
    });
  }
}

sw.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      sw.skipWaiting(),
      (async () => {
        try {
          const cache = await caches.open(PRECACHE_NAME);
          const results = await Promise.allSettled(precacheUrls.map((url) => cache.add(url)));
          const failedUrls = results.flatMap((result, index) => result.status === 'rejected' ? [precacheUrls[index]] : []);
          if (failedUrls.length > 0) {
            console.warn('[service-worker] precache failed for:', failedUrls);
          }
        } catch (err) {
          console.warn('[service-worker] precache error:', err);
        }
      })(),
    ]),
  );
});

sw.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys()
        .then((keys) => Promise.all(keys.filter((key) => key !== PRECACHE_NAME && key !== RUNTIME_CACHE_NAME).map((key) => caches.delete(key)))),
      caches.open(PRECACHE_NAME).then((cache) =>
        cache.keys().then((requests) =>
          Promise.all(
            requests
              .filter((req) => !precachePathnames.has(new URL(req.url).pathname))
              .map((req) => cache.delete(req)),
          ),
        ),
      ),
    ]).then(() => sw.clients.claim()),
  );
});

sw.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (isApiPath(url.pathname) && !isAuthOrAccountPath(url.pathname)) {
    event.respondWith(
      fetch(event.request).catch(() => offlineResponse({ 'X-Attune-Offline-Fallback': '1' })),
    );
    return;
  }

  if (event.request.method !== 'GET') return;

  if (url.origin === 'https://storage.googleapis.com') {
    event.respondWith(
      caches.open(RUNTIME_CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        const network = fetch(event.request).then((response) => {
          if (response.status === 200) cache.put(event.request, response.clone()).catch(() => {});
          return response;
        });
        if (cached) {
          event.waitUntil(network.catch(() => {}));
          return cached;
        }
        try {
          return await network;
        } catch {
          return offlineResponse();
        }
      }),
    );
    return;
  }

  if (url.origin === sw.location.origin) {
    if (event.request.mode === 'navigate') {
      event.respondWith(navigationResponse(event.request));
      return;
    }

    if (url.pathname === '/manifest.json') {
      event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(response => response ?? offlineResponse())));
      return;
    }

    event.respondWith(cachedOrNetwork(event.request, (promise) => event.waitUntil(promise)));
  }
});

sw.addEventListener('push', (event) => {
  let payload: PushPayload = {};
  try {
    payload = (event.data?.json() as PushPayload) ?? {};
  } catch {
    payload = { body: event.data?.text() };
  }

  if (!payload || typeof payload !== 'object') {
    payload = {};
  }

  // 구 payload(deliveryAttemptId/receiptToken 없음)는 영수증 전송 없이 기존처럼 표시만 한다.
  const receipt = hasDeliveryReceipt(payload) ? payload : null;

  event.waitUntil((async () => {
    const receivedPromise = receipt
      ? sendDeliveryEvent(receipt.deliveryAttemptId, receipt.receiptToken, 'RECEIVED')
      : Promise.resolve();

    // showNotification()과 RECEIVED 영수증은 서로 의존하지 않는다 — 둘 다 끝날 때까지만 기다린다.
    const [showResult] = await Promise.allSettled([
      sw.registration.showNotification(payload.title ?? 'a.tune 알림', {
        body: payload.body,
        icon: '/pwa-v3-192x192.png',
        badge: '/pwa-v3-192x192.png',
        data: {
          url: payload.url ?? '/home',
          deliveryAttemptId: payload.deliveryAttemptId,
          receiptToken: payload.receiptToken,
        },
      }),
      receivedPromise,
    ]);

    // DISPLAYED는 "표시 요청 성공"을 뜻하므로 showNotification()이 실제로 완료됐을 때만 보낸다.
    if (receipt && showResult.status === 'fulfilled') {
      await sendDeliveryEvent(receipt.deliveryAttemptId, receipt.receiptToken, 'DISPLAYED');
    }
  })());
});

sw.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const data = (event.notification.data as PushPayload | undefined) ?? {};
  const url = new URL(data.url ?? '/home', sw.location.origin).href;

  const isSameOrigin = new URL(url).origin === sw.location.origin;
  const receipt = hasDeliveryReceipt(data) ? data : null;

  event.waitUntil(
    Promise.allSettled([
      receipt
        ? sendDeliveryEvent(receipt.deliveryAttemptId, receipt.receiptToken, 'OPENED')
        : Promise.resolve(),
      (async () => {
        const clients = await sw.clients.matchAll({ type: 'window', includeUncontrolled: true });
        if (isSameOrigin) {
          const exact = clients.find((client) => client.url === url);
          if (exact && 'focus' in exact) {
            await exact.focus();
            return;
          }
          const any = clients.find((client) => 'focus' in client);
          if (any) {
            await any.focus();
            await any.navigate(url);
            return;
          }
        }
        await sw.clients.openWindow(url);
      })(),
    ]),
  );
});

/// <reference lib="webworker" />

export {};

type PushPayload = {
  title?: string;
  body?: string;
  url?: string;
};

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision?: string }>;
};

const sw = self;
const PRECACHE_NAME = 'attune-precache-v2';
const RUNTIME_CACHE_NAME = 'attune-runtime-v1';
const precacheUrls = (self.__WB_MANIFEST ?? []).map((entry) => entry.url);
const precachePathnames = new Set(precacheUrls.map((url) => new URL(url, sw.location.origin).pathname));

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

  event.waitUntil(sw.registration.showNotification(payload.title ?? 'a.tune 알림', {
    body: payload.body,
    icon: '/pwa-v2-192x192.png',
    badge: '/pwa-v2-192x192.png',
    data: { url: payload.url ?? '/home' },
  }));
});

sw.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL((event.notification.data as { url?: string } | undefined)?.url ?? '/home', sw.location.origin).href;

  const isSameOrigin = new URL(url).origin === sw.location.origin;

  event.waitUntil(
    sw.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async (clients) => {
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
    }),
  );
});

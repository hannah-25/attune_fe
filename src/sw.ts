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
const PRECACHE_NAME = 'attune-precache-v1';
const RUNTIME_CACHE_NAME = 'attune-runtime-v1';
const precacheUrls = self.__WB_MANIFEST.map((entry) => entry.url);
const precachePathnames = new Set(precacheUrls.map((url) => new URL(url, sw.location.origin).pathname));

sw.addEventListener('install', (event) => {
  event.waitUntil(caches.open(PRECACHE_NAME).then((cache) => cache.addAll(precacheUrls)));
  void sw.skipWaiting();
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
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin === 'https://storage.googleapis.com') {
    event.respondWith(
      caches.open(RUNTIME_CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        const network = fetch(event.request).then((response) => {
          if (response.ok) void cache.put(event.request, response.clone());
          return response;
        });
        if (cached) {
          event.waitUntil(network.catch(() => {}));
          return cached;
        }
        return network;
      }),
    );
    return;
  }

  if (url.origin === sw.location.origin) {
    if (event.request.mode === 'navigate') {
      event.respondWith(
        caches.match('/index.html', { ignoreSearch: true }).then((cached) => cached ?? fetch(event.request)),
      );
      return;
    }

    if (url.pathname.startsWith('/v1/')) return;

    event.respondWith(
      caches.match(event.request).then((cached) => cached ?? fetch(event.request)),
    );
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
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    data: { url: payload.url ?? '/home' },
  }));
});

sw.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL((event.notification.data as { url?: string } | undefined)?.url ?? '/home', sw.location.origin).href;

  event.waitUntil(
    sw.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async (clients) => {
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
      await sw.clients.openWindow(url);
    }),
  );
});

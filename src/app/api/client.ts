import { isGuestMode } from '../guest';
import { cacheResponse } from '../offline/cache';
import { resolveOfflineRequest } from '../offline/resolver';

const DEFAULT_API_BASE_URL = 'http://localhost:8080';
const ACCESS_TOKEN_KEY = 'access_token';
const NETWORK_FAILURE_OFFLINE_MS = 15_000;
let reissueInFlight: Promise<boolean> | null = null;
let loginRedirectTriggered = false;
let browserOffline = typeof navigator !== 'undefined' ? !navigator.onLine : false;
let assumeOfflineUntil = 0;

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    browserOffline = false;
    assumeOfflineUntil = 0;
  });
  window.addEventListener('offline', () => {
    browserOffline = true;
  });
}

export type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  auth?: boolean;
  retryOnUnauthorized?: boolean;
  offlineFallback?: boolean;
};

export class ApiError extends Error {
  status: number;
  payload: unknown;
  backendMessage: string | null;

  constructor(status: number, payload: unknown, message?: string) {
    super(message ?? `API request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
    this.backendMessage = message ?? null;
  }
}

export const apiBaseUrl =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? DEFAULT_API_BASE_URL;

function normalizePath(path: string): string {
  return path.replace(/^\/api\//, '/v1/');
}

function shouldBypassGuestMock(path: string): boolean {
  // Even in guest mode, auth/account flows must hit real backend APIs.
  return path.startsWith('/v1/auth/') || path.startsWith('/v1/account/');
}

function shouldUseOfflineResolver(path: string): boolean {
  return !shouldBypassGuestMock(path) && (browserOffline || !navigator.onLine || Date.now() < assumeOfflineUntil);
}

async function resolveOffline<T>(path: string, options: ApiRequestOptions): Promise<T> {
  return resolveOfflineRequest<T>(path, options);
}

function markNetworkUnavailable(): void {
  assumeOfflineUntil = Date.now() + NETWORK_FAILURE_OFFLINE_MS;
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const normalizedPath = normalizePath(path);

  if (isGuestMode() && !shouldBypassGuestMock(normalizedPath)) {
    const { resolveGuestRequest } = await import('../mocks/resolver');
    return resolveGuestRequest<T>(normalizedPath, options);
  }

  const useOfflineFallback = options.offlineFallback !== false;

  if (useOfflineFallback && shouldUseOfflineResolver(normalizedPath)) {
    return resolveOffline<T>(normalizedPath, options);
  }

  const { auth = true, body, headers, retryOnUnauthorized = true, offlineFallback: _offlineFallback, ...init } = options;
  let response: Response;
  try {
    response = await request(path, { auth, body, headers, ...init });
  } catch (err) {
    if (useOfflineFallback && !shouldBypassGuestMock(normalizedPath)) {
      markNetworkUnavailable();
      return resolveOffline<T>(normalizedPath, options);
    }
    throw err;
  }

  if (useOfflineFallback && !shouldBypassGuestMock(normalizedPath)) {
    // 실제 네트워크 단절: Service Worker가 fetch 실패를 감지해 폴백 헤더를 세움.
    const networkDown = response.headers.get('X-Attune-Offline-Fallback') === '1';
    // 서버 다운(502/503/504): 네트워크는 정상. 쓰기는 504 시 이미 반영됐을 수 있어 큐 중복 위험이 있으므로 GET만 폴백.
    const serverDown = (options.method ?? 'GET').toUpperCase() === 'GET'
      && [502, 503, 504].includes(response.status);
    if (networkDown || serverDown) {
      // 전역 오프라인 가정(assumeOfflineUntil)은 실제 네트워크 단절일 때만 둔다.
      // 서버 5xx는 네트워크가 살아있으므로 이 요청만 캐시로 폴백하고, 후속 요청·쓰기는 정상적으로 서버를 친다.
      if (networkDown) markNetworkUnavailable();
      return resolveOffline<T>(normalizedPath, options);
    }
  }

  if (response.status === 401 && auth && retryOnUnauthorized) {
    const refreshed = await reissueSessionSingleFlight();
    if (refreshed) {
      return apiRequest<T>(path, { ...options, retryOnUnauthorized: false });
    }

    redirectToLoginOnce();
    throw new ApiError(401, null, 'Session expired');
  }

  const result = await parseResponse<T>(response);

  const method = (options.method ?? 'GET').toUpperCase();
  const cacheSessionToken = getAccessToken();
  if (method === 'GET' && !isGuestMode() && cacheSessionToken) {
    Promise.resolve()
      .then(() => {
        if (getAccessToken() !== cacheSessionToken) return undefined;
        return cacheResponse(normalizedPath, result, () => getAccessToken() === cacheSessionToken);
      })
      .catch(err => {
        if (import.meta.env.DEV) console.warn('[offline/cache] async cache failed:', normalizedPath, err);
      });
  }

  return result;
}

async function request(path: string, options: ApiRequestOptions) {
  const { auth = true, body, headers, ...init } = options;
  const requestHeaders = new Headers(headers);

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  requestHeaders.set('X-Client-Type', 'web');

  if (auth) {
    const token = getAccessToken();
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  const normalizedPath = normalizePath(path);

  return fetch(`${apiBaseUrl}${normalizedPath}`, {
    ...init,
    body: body === undefined || body instanceof FormData ? (body as BodyInit | undefined) : JSON.stringify(body),
    credentials: 'include',
    headers: requestHeaders,
  });
}

async function reissueSession() {
  try {
    const response = await request('/v1/auth/reissue', {
      auth: true,
      method: 'POST',
    });

    if (!response.ok) {
      return false;
    }

    const nextToken = await readReissuedAccessToken(response);
    if (nextToken) {
      setAccessToken(nextToken);
      return true;
    }

    // If reissue is "ok" but we still don't have a token, retry would keep using
    // the stale token and fail again. Treat this as refresh failure.
    return false;
  } catch {
    return false;
  }
}

async function readReissuedAccessToken(response: Response): Promise<string | null> {
  const headerToken =
    parseBearerToken(response.headers.get('authorization'))
    ?? response.headers.get('x-access-token')
    ?? response.headers.get('x-new-access-token');

  if (headerToken) return headerToken;

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return null;

  try {
    const payload = await response.json();
    return findAccessToken(payload);
  } catch {
    return null;
  }
}

function parseBearerToken(value: string | null): string | null {
  if (!value) return null;
  const match = value.match(/^Bearer\s+(.+)$/i);
  if (!match?.[1]) return null;
  const token = match[1].trim();
  return token.length > 0 ? token : null;
}

function findAccessToken(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object') return null;
  const record = payload as Record<string, unknown>;

  const direct = record.accessToken;
  if (typeof direct === 'string' && direct.trim()) {
    return direct;
  }

  const data = record.data;
  if (data && typeof data === 'object') {
    const nested = (data as Record<string, unknown>).accessToken;
    if (typeof nested === 'string' && nested.trim()) {
      return nested;
    }
  }

  const result = record.result;
  if (result && typeof result === 'object') {
    const nested = (result as Record<string, unknown>).accessToken;
    if (typeof nested === 'string' && nested.trim()) {
      return nested;
    }
  }

  return null;
}

function reissueSessionSingleFlight() {
  if (!reissueInFlight) {
    reissueInFlight = reissueSession().finally(() => {
      reissueInFlight = null;
    });
  }

  return reissueInFlight;
}

function redirectToLoginOnce() {
  if (loginRedirectTriggered) return;
  loginRedirectTriggered = true;
  clearAccessToken();
  void import('../offline/SyncService')
    // 세션 만료는 같은 사용자의 재로그인이 대부분이므로 미전송 오프라인 쓰기 큐는 보존한다.
    .then(m => m.SyncService.clearAllCache({ preserveQueue: true }))
    .catch(err => {
      if (import.meta.env.DEV) console.warn('[offline/cache] clear on session expiry failed:', err);
    })
    .finally(() => {
      window.location.replace('/login');
    });
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') ?? '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String((payload as { message?: unknown }).message)
        : undefined;
    throw new ApiError(response.status, payload, message);
  }

  return payload as T;
}

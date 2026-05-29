const DEFAULT_API_BASE_URL = 'http://localhost:8080';
const ACCESS_TOKEN_KEY = 'access_token';
let reissueInFlight: Promise<boolean> | null = null;
let loginRedirectTriggered = false;

export type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  auth?: boolean;
  retryOnUnauthorized?: boolean;
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
  const { auth = true, body, headers, retryOnUnauthorized = true, ...init } = options;
  const response = await request(path, { auth, body, headers, ...init });

  if (response.status === 401 && auth && retryOnUnauthorized) {
    const refreshed = await reissueSessionSingleFlight();
    if (refreshed) {
      return apiRequest<T>(path, { ...options, retryOnUnauthorized: false });
    }

    redirectToLoginOnce();
    throw new ApiError(401, null, 'Session expired');
  }

  return parseResponse<T>(response);
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

  const normalizedPath = path.replace(/^\/api\//, '/v1/');

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
  window.location.replace('/login');
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

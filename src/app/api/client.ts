const DEFAULT_API_BASE_URL = 'http://localhost:8080';

export type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  auth?: boolean;
  retryOnUnauthorized?: boolean;
};

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(status: number, payload: unknown, message?: string) {
    super(message ?? `API request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

export const apiBaseUrl =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? DEFAULT_API_BASE_URL;

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { auth = true, body, headers, retryOnUnauthorized = true, ...init } = options;
  const response = await request(path, { auth, body, headers, ...init });

  if (response.status === 401 && auth && retryOnUnauthorized) {
    const refreshed = await reissueSession();
    if (refreshed) {
      return apiRequest<T>(path, { ...options, retryOnUnauthorized: false });
    }
  }

  return parseResponse<T>(response);
}

async function request(path: string, options: ApiRequestOptions) {
  const { auth = true, body, headers, ...init } = options;
  const requestHeaders = new Headers(headers);

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
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
      auth: false,
      method: 'POST',
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
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

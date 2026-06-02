const GOOGLE_SDK_SRC = 'https://accounts.google.com/gsi/client';
const KAKAO_SDK_SRC = 'https://developers.kakao.com/sdk/js/kakao.min.js';
const APPLE_SDK_SRC = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
const SCRIPT_READY_ATTR = 'data-attune-sdk-ready';
const SOCIAL_LOGIN_TIMEOUT_MS = 60_000;

const scriptPromises = new Map<string, Promise<void>>();

export type SocialIdentityResult = {
  email: string | null;
  token: string;
};

function createSettler<T>(
  resolve: (value: T) => void,
  reject: (reason?: unknown) => void,
  timeoutMessage: string,
) {
  let settled = false;
  const timer = window.setTimeout(() => {
    if (settled) return;
    settled = true;
    reject(new Error(timeoutMessage));
  }, SOCIAL_LOGIN_TIMEOUT_MS);

  const safeResolve = (value: T) => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timer);
    resolve(value);
  };

  const safeReject = (message: string) => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timer);
    reject(new Error(message));
  };

  return { safeResolve, safeReject };
}

function loadScript(src: string): Promise<void> {
  const existingPromise = scriptPromises.get(src);
  if (existingPromise) return existingPromise;

  const promise = new Promise<void>((resolve, reject) => {
    const settleAsLoaded = (script: HTMLScriptElement) => {
      script.setAttribute(SCRIPT_READY_ATTR, 'true');
      resolve();
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (existing.getAttribute(SCRIPT_READY_ATTR) === 'true') {
        resolve();
        return;
      }

      const handleLoad = () => {
        cleanup();
        settleAsLoaded(existing);
      };
      const handleError = () => {
        cleanup();
        reject(new Error('소셜 로그인 SDK를 불러오지 못했습니다.'));
      };
      const cleanup = () => {
        existing.removeEventListener('load', handleLoad);
        existing.removeEventListener('error', handleError);
      };

      existing.addEventListener('load', handleLoad);
      existing.addEventListener('error', handleError);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => settleAsLoaded(script);
    script.onerror = () => reject(new Error('소셜 로그인 SDK를 불러오지 못했습니다.'));
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    scriptPromises.delete(src);
    throw error;
  });

  scriptPromises.set(src, promise);
  return promise;
}

async function ensureGoogleSdk() {
  if (window.google?.accounts?.id) return;
  await loadScript(GOOGLE_SDK_SRC);
  if (!window.google?.accounts?.id) {
    throw new Error('Google SDK를 불러오지 못했습니다.');
  }
}

async function ensureKakaoSdk() {
  const appKey = import.meta.env.VITE_KAKAO_APP_KEY as string | undefined;
  if (!appKey) {
    throw new Error('Kakao App Key가 설정되지 않았습니다.');
  }

  if (!window.Kakao) {
    await loadScript(KAKAO_SDK_SRC);
  }

  if (!window.Kakao) {
    throw new Error('Kakao SDK를 불러오지 못했습니다.');
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(appKey);
  }
}

async function ensureAppleSdk() {
  if (window.AppleID?.auth) return;
  await loadScript(APPLE_SDK_SRC);
  if (!window.AppleID?.auth) {
    throw new Error('Apple SDK를 불러오지 못했습니다.');
  }
}

function normalizeEmail(email: string | null | undefined): string | null {
  if (!email) return null;
  const normalized = email.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split('.');
  if (parts.length < 2) return null;

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const decoded = window.atob(padded);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function extractEmailFromIdentityToken(token: string): string | null {
  const payload = decodeJwtPayload(token);
  return normalizeEmail(typeof payload?.email === 'string' ? payload.email : null);
}

export function preloadSocialSdks() {
  void ensureGoogleSdk().catch(() => undefined);
  void ensureKakaoSdk().catch(() => undefined);
}

export function signInWithGoogle(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const { safeResolve, safeReject } = createSettler(
      resolve,
      reject,
      'Google 로그인 시간이 초과되었습니다. 다시 시도해주세요.',
    );

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
    if (!clientId) {
      safeReject('Google Client ID가 설정되지 않았습니다.');
      return;
    }

    try {
      await ensureGoogleSdk();
    } catch (error) {
      safeReject(error instanceof Error ? error.message : 'Google SDK를 불러오지 못했습니다.');
      return;
    }

    const googleId = window.google?.accounts?.id;
    if (!googleId) {
      safeReject('Google SDK를 불러오지 못했습니다.');
      return;
    }

    googleId.initialize({
      client_id: clientId,
      callback: (response) => {
        if (response.credential) {
          safeResolve(response.credential);
        } else {
          safeReject('Google 로그인에 실패했습니다.');
        }
      },
      auto_select: false,
      cancel_on_tap_outside: false,
    });

    googleId.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        const reason = notification.getNotDisplayedReason();
        safeReject(`Google 로그인 창을 표시할 수 없습니다. (${reason})`);
        return;
      }

      if (notification.isSkippedMoment()) {
        const skippedReason = notification.getSkippedReason();
        if (skippedReason === 'user_cancel') {
          safeReject('Google 로그인이 취소되었습니다.');
        } else {
          safeReject(`Google 로그인을 완료하지 못했습니다. (${skippedReason})`);
        }
        return;
      }

      if (notification.isDismissedMoment()) {
        const dismissedReason = notification.getDismissedReason();
        if (dismissedReason === 'credential_returned') return;
        if (dismissedReason === 'cancel_called' || dismissedReason === 'tap_outside') {
          safeReject('Google 로그인이 취소되었습니다.');
        } else {
          safeReject(`Google 로그인을 완료하지 못했습니다. (${dismissedReason})`);
        }
      }
    });
  });
}

async function fetchKakaoAccountEmail(): Promise<string | null> {
  if (!window.Kakao?.API) return null;

  const kakaoApi = window.Kakao?.API;
  if (!kakaoApi) return null;

  return new Promise((resolve) => {
    kakaoApi.request({
      url: '/v2/user/me',
      success: (response) => {
        resolve(normalizeEmail(response.kakao_account?.email ?? null));
      },
      fail: () => {
        resolve(null);
      },
    });
  });
}

export function signInWithKakao(): Promise<SocialIdentityResult> {
  return new Promise(async (resolve, reject) => {
    const { safeResolve, safeReject } = createSettler(
      resolve,
      reject,
      'Kakao 로그인 응답이 지연되고 있습니다. 팝업 차단 여부를 확인하고 다시 시도해주세요.',
    );

    try {
      await ensureKakaoSdk();
    } catch (error) {
      safeReject(error instanceof Error ? error.message : 'Kakao SDK를 불러오지 못했습니다.');
      return;
    }

    const kakao = window.Kakao;
    if (!kakao) {
      safeReject('Kakao SDK를 불러오지 못했습니다.');
      return;
    }

    kakao.Auth.login({
      throughTalk: false,
      success: async (authObj) => {
        const email = await fetchKakaoAccountEmail();
        safeResolve({ token: authObj.access_token, email });
      },
      fail: (err) => safeReject(err.error_description || 'Kakao 로그인에 실패했습니다.'),
    });
  });
}

export function signInWithApple(): Promise<SocialIdentityResult> {
  return new Promise(async (resolve, reject) => {
    const { safeResolve, safeReject } = createSettler(
      resolve,
      reject,
      'Apple 로그인 시간이 초과되었습니다. 다시 시도해주세요.',
    );

    const clientId = import.meta.env.VITE_APPLE_CLIENT_ID as string | undefined;
    if (!clientId) {
      safeReject('Apple Client ID가 설정되지 않았습니다.');
      return;
    }

    try {
      await ensureAppleSdk();
    } catch (error) {
      safeReject(error instanceof Error ? error.message : 'Apple SDK를 불러오지 못했습니다.');
      return;
    }

    const appleAuth = window.AppleID?.auth;
    if (!appleAuth) {
      safeReject('Apple SDK를 불러오지 못했습니다.');
      return;
    }

    appleAuth.init({
      clientId,
      scope: 'name email',
      redirectURI: window.location.origin,
      usePopup: true,
    });

    try {
      const response = await appleAuth.signIn();
      const token = response.authorization.id_token;
      const email = normalizeEmail(response.user?.email ?? extractEmailFromIdentityToken(token));
      safeResolve({ token, email });
    } catch (err: unknown) {
      const reason = (err as { error?: string })?.error;
      if (reason === 'popup_closed_by_user' || reason === 'user_trigger_new_signin_flow') {
        safeReject('Apple 로그인이 취소되었습니다.');
      } else {
        safeReject('Apple 로그인에 실패했습니다.');
      }
    }
  });
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('스크립트를 불러오지 못했습니다.'));
    document.head.appendChild(script);
  });
}

const SOCIAL_LOGIN_TIMEOUT_MS = 60_000;

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

export function signInWithGoogle(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const { safeResolve, safeReject } = createSettler(
      resolve,
      reject,
      'Google 로그인 시간이 초과되었습니다. 다시 시도해주세요.',
    );

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      safeReject('Google Client ID가 설정되지 않았습니다.');
      return;
    }

    try {
      await loadScript('https://accounts.google.com/gsi/client');
    } catch {
      safeReject('Google SDK를 불러오지 못했습니다.');
      return;
    }

    if (!window.google?.accounts?.id) {
      safeReject('Google SDK를 불러오지 못했습니다.');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        if (response.credential) {
          safeResolve(response.credential);
        } else {
          safeReject('Google 로그인에 실패했습니다.');
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        safeReject('Google 로그인 창을 표시할 수 없습니다. 브라우저에서 Google 계정으로 로그인 후 다시 시도해주세요.');
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
        if (dismissedReason === 'cancel_called') {
          safeReject('Google 로그인이 취소되었습니다.');
        } else {
          safeReject(`Google 로그인을 완료하지 못했습니다. (${dismissedReason})`);
        }
      }
    });
  });
}

export function signInWithKakao(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const { safeResolve, safeReject } = createSettler(
      resolve,
      reject,
      'Kakao 로그인 응답이 지연되고 있습니다. 팝업 차단 여부를 확인하고 다시 시도해주세요.',
    );

    const appKey = import.meta.env.VITE_KAKAO_APP_KEY;
    if (!appKey) {
      safeReject('Kakao App Key가 설정되지 않았습니다.');
      return;
    }

    try {
      await loadScript('https://developers.kakao.com/sdk/js/kakao.min.js');
    } catch {
      safeReject('Kakao SDK를 불러오지 못했습니다.');
      return;
    }

    if (!window.Kakao) {
      safeReject('Kakao SDK를 불러오지 못했습니다.');
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(appKey);
    }

    window.Kakao.Auth.login({
      success: (authObj) => safeResolve(authObj.access_token),
      fail: (err) => safeReject(err.error_description || 'Kakao 로그인에 실패했습니다.'),
    });
  });
}

export function signInWithApple(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const { safeResolve, safeReject } = createSettler(
      resolve,
      reject,
      'Apple 로그인 시간이 초과되었습니다. 다시 시도해주세요.',
    );

    const clientId = import.meta.env.VITE_APPLE_CLIENT_ID;
    if (!clientId) {
      safeReject('Apple Client ID가 설정되지 않았습니다.');
      return;
    }

    try {
      await loadScript('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js');
    } catch {
      safeReject('Apple SDK를 불러오지 못했습니다.');
      return;
    }

    if (!window.AppleID?.auth) {
      safeReject('Apple SDK를 불러오지 못했습니다.');
      return;
    }

    window.AppleID.auth.init({
      clientId,
      scope: 'name email',
      // Apple Developer에 등록된 리다이렉트 URI와 일치해야 합니다
      redirectURI: window.location.origin,
      usePopup: true,
    });

    try {
      const response = await window.AppleID.auth.signIn();
      safeResolve(response.authorization.id_token);
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

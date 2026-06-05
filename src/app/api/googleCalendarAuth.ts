const GOOGLE_SDK_SRC = 'https://accounts.google.com/gsi/client';
const GOOGLE_CALENDAR_SCOPE = 'openid email https://www.googleapis.com/auth/calendar.readonly';

function loadGoogleSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GOOGLE_SDK_SRC}"]`);
    if (existing) {
      const onLoad = () => {
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        reject(new Error('Google SDK를 불러오지 못했어요.'));
      };
      const cleanup = () => {
        existing.removeEventListener('load', onLoad);
        existing.removeEventListener('error', onError);
      };

      existing.addEventListener('load', onLoad);
      existing.addEventListener('error', onError);
      return;
    }

    const script = document.createElement('script');
    script.src = GOOGLE_SDK_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google SDK를 불러오지 못했어요.'));
    document.head.appendChild(script);
  });
}

export async function requestGoogleCalendarAuthorizationCode(): Promise<string> {
  const clientId = import.meta.env.VITE_GOOGLE_CALENDAR_CLIENT_ID
    ?? import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw new Error('Google Calendar Client ID가 설정되지 않았어요.');
  }

  await loadGoogleSdk();

  const oauth2 = window.google?.accounts?.oauth2;
  if (!oauth2) {
    throw new Error('Google Calendar 연결을 시작하지 못했어요.');
  }

  return new Promise((resolve, reject) => {
    const codeClient = oauth2.initCodeClient({
      client_id: clientId,
      scope: GOOGLE_CALENDAR_SCOPE,
      ux_mode: 'popup',
      prompt: 'consent',
      callback: (response) => {
        if (response.error) {
          reject(new Error(response.error_description ?? response.error));
          return;
        }
        if (!response.code) {
          reject(new Error('Google Calendar 권한 코드를 받지 못했어요.'));
          return;
        }
        resolve(response.code);
      },
    });

    codeClient.requestCode();
  });
}

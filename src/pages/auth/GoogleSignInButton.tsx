import React, { useEffect, useRef } from 'react';
import { GoogleMark } from './socialMarks';

type GoogleSignInButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  onError: (message: string) => void;
  onSuccess: (credential: string) => void | Promise<void>;
};

const GOOGLE_SDK_SRC = 'https://accounts.google.com/gsi/client';

function loadGoogleSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
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
        reject(new Error('Google SDK를 불러오지 못했습니다.'));
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
    script.onerror = () => reject(new Error('Google SDK를 불러오지 못했습니다.'));
    document.head.appendChild(script);
  });
}

export function GoogleSignInButton({
  disabled = false,
  loading = false,
  onError,
  onSuccess,
}: GoogleSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [onError, onSuccess]);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
    if (!clientId) {
      onErrorRef.current('Google Client ID가 설정되지 않았습니다.');
      return;
    }

    let cancelled = false;

    const renderButton = async () => {
      try {
        await loadGoogleSdk();
      } catch (error) {
        if (!cancelled) {
          onErrorRef.current(error instanceof Error ? error.message : 'Google SDK를 불러오지 못했습니다.');
        }
        return;
      }

      if (cancelled || !containerRef.current || !window.google?.accounts?.id) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response.credential) {
            void onSuccessRef.current(response.credential);
            return;
          }
          onErrorRef.current('Google 로그인을 완료하지 못했습니다.');
        },
        auto_select: false,
        cancel_on_tap_outside: false,
      });

      containerRef.current.innerHTML = '';

      const width = Math.max(Math.floor(containerRef.current.offsetWidth), 280);
      window.google.accounts.id.renderButton(containerRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
        logo_alignment: 'left',
        width,
        locale: 'ko',
      });
    };

    void renderButton();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={`relative w-full h-[50px] ${disabled ? 'opacity-50' : ''}`}>
      <div
        className="absolute inset-0 z-10 overflow-hidden rounded-xl"
        style={{ opacity: 0.01, pointerEvents: disabled || loading ? 'none' : 'auto' }}
        aria-hidden="true"
      >
        <div ref={containerRef} className="flex h-full w-full items-center justify-center" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 shadow-[rgba(60,40,90,0.06)_0px_2px_8px_0px]">
        <span className="absolute left-4 flex items-center">
          {loading
            ? <span className="block w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
            : <GoogleMark className="w-5 h-5" />}
        </span>
        <span className="font-bold text-sm">Google로 계속하기</span>
      </div>
      {disabled && !loading ? <div className="absolute inset-0 rounded-xl bg-white/35" aria-hidden="true" /> : null}
    </div>
  );
}

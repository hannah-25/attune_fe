import React, { useEffect, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { login, restoreAccount, restoreSocialAccount, socialLogin } from '../../app/api/auth';
import { extractEmailFromIdentityToken, preloadSocialSdks, signInWithApple, signInWithKakao } from '../../app/api/social';
import { ApiError, setAccessToken } from '../../app/api/client';
import { enterGuestMode, exitGuestMode } from '../../app/guest';
import { clearGuestStore } from '../../app/mocks/guest-store';
import { clearPendingRestoreEmail, isPendingRestoreEmail } from '../../app/withdrawal-restore';
import { AccountRestorePrompt } from './AccountRestorePrompt';
import { AppleMark, KakaoMark } from './socialMarks';
import { GoogleSignInButton } from './GoogleSignInButton';

type SocialProvider = 'google' | 'kakao' | 'apple';
type SocialProviderKey = 'GOOGLE' | 'KAKAO' | 'APPLE';
type PendingSocialRestore = {
  email: string | null;
  provider: SocialProviderKey;
  token: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [pendingSocialRestore, setPendingSocialRestore] = useState<PendingSocialRestore | null>(null);

  useEffect(() => {
    preloadSocialSdks();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    if (isPendingRestoreEmail(email)) {
      setError('');
      setPendingSocialRestore(null);
      setShowRestorePrompt(true);
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const { accessToken } = await login({ email: email.trim(), password });
      exitGuestMode();
      clearGuestStore();
      clearPendingRestoreEmail(email.trim());
      setAccessToken(accessToken);
      navigate('/home');
    } catch (err) {
      if (isWithdrawalCandidateError(err)) {
        setPendingSocialRestore(null);
        setShowRestorePrompt(true);
      } else {
        setError(err instanceof ApiError && err.backendMessage ? err.backendMessage : '로그인에 실패했습니다. 입력한 정보를 확인해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    setError('');
    setSocialLoading(provider);
    try {
      let token: string;
      let provider_key: SocialProviderKey;
      let socialEmail: string | null = null;
      if (provider === 'kakao') {
        const result = await signInWithKakao();
        token = result.token;
        socialEmail = result.email;
        provider_key = 'KAKAO';
      } else {
        const result = await signInWithApple();
        token = result.token;
        socialEmail = result.email;
        provider_key = 'APPLE';
      }

      if (socialEmail && isPendingRestoreEmail(socialEmail)) {
        setPendingSocialRestore({ provider: provider_key, token, email: socialEmail });
        setShowRestorePrompt(true);
        return;
      }

      const { accessToken } = await socialLogin(provider_key, token);
      exitGuestMode();
      clearGuestStore();
      clearPendingRestoreEmail();
      setAccessToken(accessToken);
      navigate('/home');
    } catch (err) {
      if (isWithdrawalCandidateError(err)) {
        setError('');
        setPendingSocialRestore({ provider: provider_key, token, email: socialEmail });
        setShowRestorePrompt(true);
        return;
      }

      const providerLabel = provider === 'google' ? 'Google' : provider === 'kakao' ? 'Kakao' : 'Apple';

      if (err instanceof ApiError) {
        const payloadMessage =
          err.backendMessage
          ?? (typeof err.payload === 'string' ? err.payload : null)
          ?? '알 수 없는 오류';
        setError(`${providerLabel} 로그인 실패 (${err.status}): ${payloadMessage}`);
      } else {
        const message = err instanceof Error ? err.message : '소셜 로그인에 실패했습니다.';
        if (!message.includes('취소')) {
          setError(message);
        }
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const handleGoogleCredential = async (token: string) => {
    setError('');
    setSocialLoading('google');

    try {
      const socialEmail = extractEmailFromIdentityToken(token);
      if (socialEmail && isPendingRestoreEmail(socialEmail)) {
        setPendingSocialRestore({ provider: 'GOOGLE', token, email: socialEmail });
        setShowRestorePrompt(true);
        return;
      }

      const { accessToken } = await socialLogin('GOOGLE', token);
      exitGuestMode();
      clearGuestStore();
      clearPendingRestoreEmail();
      setAccessToken(accessToken);
      navigate('/home');
    } catch (err) {
      if (isWithdrawalCandidateError(err)) {
        setError('');
        setPendingSocialRestore({ provider: 'GOOGLE', token, email: extractEmailFromIdentityToken(token) });
        setShowRestorePrompt(true);
        return;
      }

      if (err instanceof ApiError) {
        const payloadMessage =
          err.backendMessage
          ?? (typeof err.payload === 'string' ? err.payload : null)
          ?? '알 수 없는 오류';
        setError(`Google 로그인 실패 (${err.status}): ${payloadMessage}`);
      } else {
        const message = err instanceof Error ? err.message : 'Google 로그인에 실패했습니다.';
        setError(message);
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const isSocialDisabled = isSubmitting || socialLoading !== null;

  const handleRestore = async () => {
    if (pendingSocialRestore) {
      setError('');
      setIsRestoring(true);

      try {
        const { accessToken } = await restoreSocialAccount(pendingSocialRestore.provider, pendingSocialRestore.token);
        exitGuestMode();
        clearGuestStore();
        clearPendingRestoreEmail(pendingSocialRestore.email ?? undefined);
        setAccessToken(accessToken);
        navigate('/home');
      } catch (err) {
        setError(err instanceof ApiError && err.backendMessage ? err.backendMessage : '계정 복구에 실패했습니다. 다시 시도해주세요.');
        setShowRestorePrompt(false);
        setPendingSocialRestore(null);
      } finally {
        setIsRestoring(false);
      }
      return;
    }

    if (!email.trim() || !password) {
      setError('계정 복구를 위해 이메일과 비밀번호를 입력해주세요.');
      setShowRestorePrompt(false);
      return;
    }

    setError('');
    setIsRestoring(true);

    try {
      const { accessToken } = await restoreAccount(email.trim(), password);
      exitGuestMode();
      clearGuestStore();
      clearPendingRestoreEmail(email.trim());
      setAccessToken(accessToken);
      navigate('/home');
    } catch (err) {
      setError(err instanceof ApiError && err.backendMessage ? err.backendMessage : '계정 복구에 실패했습니다. 다시 시도해주세요.');
      setShowRestorePrompt(false);
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="로그인" centered showBack />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-16 pr-5 pb-8 pl-5">

          {/* 소셜 로그인 버튼 */}
          <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${isEmailOpen ? 'max-h-0 opacity-0' : 'max-h-[200px] opacity-100'}`}>
            <GoogleSignInButton
              onSuccess={handleGoogleCredential}
              onError={setError}
              loading={socialLoading === 'google'}
              disabled={isSocialDisabled}
            />
            <SocialLoginButton
              icon={<AppleMark className="w-[18px] h-[18px] text-white" />}
              label="Apple로 계속하기"
              className="bg-[rgb(31,27,46)] text-white"
              onClick={() => handleSocialLogin('apple')}
              loading={socialLoading === 'apple'}
              disabled={isSocialDisabled}
            />
            <SocialLoginButton
              icon={<KakaoMark className="w-5 h-5 text-gray-900" />}
              label="카카오로 계속하기"
              className="text-gray-900"
              style={{ backgroundColor: '#FEE500' }}
              onClick={() => handleSocialLogin('kakao')}
              loading={socialLoading === 'kakao'}
              disabled={isSocialDisabled}
            />
          </div>

          {/* 이메일 로그인 접기/펼치기 */}
          <button
            type="button"
            onClick={() => setIsEmailOpen((v) => !v)}
            className="flex items-center justify-between w-full mt-6 py-2 text-gray-500 text-xs"
          >
            <div className="grow h-px bg-gray-200" />
            <span className="mx-3 whitespace-nowrap">이메일로 로그인</span>
            <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isEmailOpen ? 'rotate-180' : ''}`} />
            <div className="grow h-px bg-gray-200" />
          </button>

          {/* 이메일 폼 (접기/펼치기) */}
          <div className={`overflow-hidden transition-all duration-300 ${isEmailOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col gap-2.5 pt-1">
              <TextField label="이메일" value={email} onChange={setEmail} placeholder="name@example.com" type="email" />
              <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
                <label className="font-semibold text-gray-500 text-[11px] leading-tight">비밀번호</label>
                <div className="items-center flex w-full h-6">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="grow h-full bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0 basis-[0%]"
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="font-medium text-gray-500 text-xs pl-3 shrink-[0]">
                    {showPassword ? '숨기기' : '보기'}
                  </button>
                </div>
              </div>
            </div>
            <div className="items-center flex gap-2 mt-4 px-1 text-xs">
              <button type="button" onClick={() => setAutoLogin((v) => !v)} className={`items-center flex justify-center w-4 h-4 rounded shrink-[0] transition-colors ${autoLogin ? 'bg-purple-500' : 'border border-gray-300 bg-white'}`}>
                {autoLogin ? <Check className="w-3 h-3 text-white" strokeWidth={3} /> : null}
              </button>
              <button type="button" onClick={() => setAutoLogin((v) => !v)}>자동 로그인</button>
              <div className="grow basis-[0%]" />
              <button type="button" onClick={() => navigate('/reset-password/1')} className="font-medium underline text-gray-600 whitespace-nowrap">
                비밀번호 찾기
              </button>
            </div>
            {error ? <div className="text-red-500 text-xs mt-3 px-1">{error}</div> : null}
            <button
              type="button"
              onClick={handleLogin}
              disabled={isSubmitting}
              className="items-center flex font-bold justify-center w-full h-[46px] mt-4 bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 rounded-xl disabled:opacity-60"
            >
              <span className="block">{isSubmitting ? '로그인 중...' : '로그인'}</span>
            </button>
          </div>

          <div className="text-center text-gray-600 mt-6">
            <span>계정이 없으신가요? </span>
            <button type="button" onClick={() => navigate('/signup')} className="font-bold text-gray-900">가입하기</button>
          </div>
          <button
            type="button"
            onClick={() => { enterGuestMode(); navigate('/home'); }}
            className="flex items-center font-medium justify-center w-full h-[44px] mt-1 text-gray-400 text-xs select-none transition-all active:text-gray-600"
          >
            로그인 없이 둘러보기
          </button>
        </div>
      </div>
      <AccountRestorePrompt
        open={showRestorePrompt}
        email={pendingSocialRestore?.email ?? email.trim()}
        isSubmitting={isRestoring}
        onConfirm={handleRestore}
        onCancel={() => {
          setPendingSocialRestore(null);
          setShowRestorePrompt(false);
        }}
      />
    </div>
  );
}

function isWithdrawalCandidateError(error: unknown): boolean {
  if (!(error instanceof ApiError)) return false;

  const messageParts: string[] = [];

  if (typeof error.backendMessage === 'string') {
    messageParts.push(error.backendMessage);
  }

  if (typeof error.payload === 'string') {
    messageParts.push(error.payload);
  } else if (error.payload && typeof error.payload === 'object') {
    const record = error.payload as Record<string, unknown>;
    if (typeof record.message === 'string') {
      messageParts.push(record.message);
    }
    if (typeof record.error === 'string') {
      messageParts.push(record.error);
    }
  }

  const message = messageParts.join(' ').toLowerCase();
  return message.includes('탈퇴') || message.includes('withdraw') || message.includes('비활성') || message.includes('disabled');
}

function TextField({ label, onChange, placeholder, type = 'text', value }: { label: string; onChange: (value: string) => void; placeholder: string; type?: string; value: string }) {
  return (
    <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
      <label className="font-semibold text-gray-500 text-[11px] leading-tight">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-6 bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0" />
    </div>
  );
}

function SocialLoginButton({ icon, label, className, style, onClick, loading, disabled }: {
  icon: React.ReactNode;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center justify-center w-full h-[50px] rounded-xl font-bold text-sm transition-opacity disabled:opacity-50 ${className ?? ''}`}
      style={style}
    >
      <span className="absolute left-4 flex items-center">
        {loading
          ? <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          : icon}
      </span>
      {label}
    </button>
  );
}

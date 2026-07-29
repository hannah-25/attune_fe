import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { verifyEmail, resendVerificationEmail } from '../../app/api/auth';

type VerifyState = 'idle' | 'verifying' | 'success' | 'error';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  // 회원가입 → verify-email?email=xxx 경로로 올 때 sessionStorage에 저장
  const urlEmail = searchParams.get('email');
  useEffect(() => {
    if (urlEmail) sessionStorage.setItem('verifyEmail', urlEmail);
  }, [urlEmail]);

  const email = urlEmail ?? sessionStorage.getItem('verifyEmail') ?? '';

  const [state, setState] = useState<VerifyState>(token ? 'verifying' : 'idle');
  const [resendMessage, setResendMessage] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!token) return;

    let ignore = false;

    verifyEmail(token)
      .then(() => {
        if (!ignore) {
          setState('success');
          setTimeout(() => navigate('/onboarding/1'), 1500);
        }
      })
      .catch((err) => {
        console.error('Failed to verify email:', err);
        if (!ignore) setState('error');
      });

    return () => {
      ignore = true;
    };
  }, [token]);

  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    setResendMessage('');
    try {
      await resendVerificationEmail(email);
      setResendMessage('인증 메일을 다시 보냈습니다.');
    } catch (err) {
      console.error('Failed to resend verification email:', err);
      setResendMessage('메일 재발송에 실패했습니다.');
    } finally {
      setIsResending(false);
    }
  };

  const statusText = {
    idle: '인증 메일이 발송되었습니다.',
    verifying: '인증을 확인하고 있습니다.',
    success: '메일 인증이 완료되었습니다.',
    error: '유효하지 않은 인증입니다.\n이메일 주소를 다시 인증해주세요.',
  }[state];

  const isError = state === 'error';
  const showResend = state === 'idle';

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="메일 인증" centered showBack />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-16 pr-5 pb-4 pl-5">

          {/* 아이콘 + 상태 메시지 */}
          <div className="items-center flex flex-col text-center">
            <div className={`items-center flex justify-center w-16 h-16 ${isError ? 'text-red-400' : 'text-purple-600'}`}>
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16v12H4z" />
                <path d="M4 7l8 6l8-6" />
              </svg>
            </div>
            <div className="font-semibold text-gray-900 text-base leading-snug mt-5 whitespace-pre-line">
              {statusText}
            </div>
            {showResend && (
              <div className="text-gray-500 text-sm leading-tight mt-2">{email}</div>
            )}
          </div>

          {/* 재발송 안내 — idle/error 공통 */}
          {showResend && (
            <div className="items-center flex flex-col text-center mt-6 text-xs leading-relaxed">
              <div className="text-gray-600">인증메일을 받지 못하셨나요?</div>
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="font-bold text-purple-700 underline mt-1 select-none transition-all active:scale-[0.97] active:opacity-70 disabled:opacity-50"
              >
                {isResending ? '재발송 중...' : '인증메일 재발송'}
              </button>
              {resendMessage && <div className="mt-2 text-gray-500">{resendMessage}</div>}
            </div>
          )}

          {/* 에러 상태 전용 — 회원가입으로 돌아가기 */}
          {isError && (
            <div className="mt-8 px-1">
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="w-full h-12 rounded-xl bg-[rgb(31,27,46)] text-white font-bold text-sm select-none transition-all active:scale-[0.97] active:bg-black"
              >
                회원가입 재시도
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

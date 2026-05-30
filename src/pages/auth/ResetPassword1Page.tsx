import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { requestPasswordReset } from '../../app/api/auth';
import { ApiError } from '../../app/api/client';

export default function ResetPassword1Page() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendResetEmail = async () => {
    if (!email.trim()) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await requestPasswordReset(email.trim());
      navigate(`/reset-password/2?email=${encodeURIComponent(email.trim())}`);
    } catch (err) {
      setError(err instanceof ApiError && err.backendMessage ? err.backendMessage : '재설정 메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="비밀번호 재설정" centered showBack />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-16 pr-5 pb-4 pl-5">
          <p className="text-gray-600 text-xs leading-relaxed">가입 시 등록한 이메일로 비밀번호 재설정 링크를 보내드립니다.</p>
          <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 mt-5">
            <label className="font-semibold text-gray-500 text-[11px] leading-tight">이메일</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-6 bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0"
            />
          </div>
          <button
            type="button"
            onClick={handleSendResetEmail}
            disabled={isSubmitting}
            className="items-center flex font-bold justify-center w-full h-[46px] mt-5 bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl select-none transition-all active:scale-[0.97] active:bg-black disabled:opacity-60"
          >
            {isSubmitting ? '발송 중...' : '재설정 링크 보내기'}
          </button>
          {error ? <div className="text-red-500 text-xs mt-3 px-1">{error}</div> : null}
        </div>
      </div>
    </div>
  );
}

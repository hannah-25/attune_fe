import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { changePassword, confirmPasswordReset, validatePasswordResetToken } from '../../app/api/auth';
import { ApiError } from '../../app/api/client';

export default function ResetPassword3Page() {
  const navigate = useNavigate();
  const { token: routeToken } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const token = routeToken ?? searchParams.get('token') ?? '';
  const isLoggedInFlow = !token;
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(isLoggedInFlow);

  useEffect(() => {
    if (!token) return;

    let ignore = false;

    validatePasswordResetToken(token)
      .then(() => {
        if (!ignore) setIsTokenValid(true);
      })
      .catch((err) => {
        console.error('Failed to validate password reset token:', err);
        if (!ignore) {
          setIsTokenValid(false);
          setError('비밀번호 재설정 링크가 만료되었거나 올바르지 않습니다.');
        }
      });

    return () => {
      ignore = true;
    };
  }, [token]);

  const handleConfirm = async () => {
    if (!password || password !== confirm) {
      setError('새 비밀번호와 확인 값이 일치하는지 확인해주세요.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      if (isLoggedInFlow) {
        if (!currentPassword) {
          setError('현재 비밀번호를 입력해주세요.');
          return;
        }
        await changePassword(currentPassword, password);
        navigate('/settings');
      } else {
        await confirmPasswordReset({ token, newPassword: password });
        navigate('/login');
      }
    } catch (err) {
      setError(err instanceof ApiError && err.backendMessage ? err.backendMessage : '비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
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
        <TopBar title="새 비밀번호 설정" centered showBack />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-16 pr-5 pb-4 pl-5">
          <p className="text-gray-600 text-xs leading-relaxed">새로 사용할 비밀번호를 입력해주세요.</p>
          <div className="flex flex-col gap-2.5 mt-5">
            {isLoggedInFlow && (
              <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
                <label className="font-semibold text-gray-500 text-[11px] leading-tight">현재 비밀번호</label>
                <div className="items-center flex w-full h-6">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="현재 비밀번호 입력"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="grow h-full bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0 basis-[0%]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((v) => !v)}
                    className="font-medium text-gray-500 text-xs pl-3 shrink-0"
                  >
                    {showCurrentPassword ? '숨기기' : '보기'}
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
              <label className="font-semibold text-gray-500 text-[11px] leading-tight">새 비밀번호</label>
              <div className="items-center flex w-full h-6">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="grow h-full bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0 basis-[0%]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="font-medium text-gray-500 text-xs pl-3 shrink-0"
                >
                  {showPassword ? '숨기기' : '보기'}
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
              <label className="font-semibold text-gray-500 text-[11px] leading-tight">비밀번호 확인</label>
              <div className="items-center flex w-full h-6">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 입력"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="grow h-full bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0 basis-[0%]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="font-medium text-gray-500 text-xs pl-3 shrink-0"
                >
                  {showConfirm ? '숨기기' : '보기'}
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting || !isTokenValid}
            className="items-center flex font-bold justify-center w-full h-[46px] mt-6 bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl select-none transition-all active:scale-[0.97] active:bg-black disabled:opacity-60"
          >
            {isSubmitting ? '변경 중...' : '비밀번호 변경하기'}
          </button>
          {error ? <div className="text-red-500 text-xs mt-3 px-1">{error}</div> : null}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import logoImage from '@src/assets/logo.png';
import { TopBar } from '../../app/components/TopBar';
import { completeOnboarding } from '@/api/onboarding';

export default function Onboarding5Page() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finishOnboarding = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await completeOnboarding();
      navigate('/home');
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
      setError('자가 체크 완료 처리에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex h-dvh min-h-dvh w-full flex-col overflow-hidden bg-gray-50 text-sm"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="자가 체크 완료" centered />
        <div className="items-center flex flex-col grow min-h-0 overflow-y-auto overscroll-contain justify-center text-center basis-[0%] px-5 py-8">
          <div className="flex items-center justify-center text-center w-24 h-24">
            <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
          </div>
          <div className="font-bold text-gray-900 text-xl leading-tight mt-5">이제 시작할 준비가 되었어요</div>
          <p className="text-gray-500 text-sm leading-relaxed mt-3">
            일지 · 복약 · 캘린더 · 리포트로
            <br />
            하루의 작은 변화를 함께 만들어봐요.
          </p>
          {error ? <div className="text-red-500 text-xs mt-4">{error}</div> : null}
          <button
            type="button"
            onClick={finishOnboarding}
            disabled={isSubmitting}
            className="items-center flex font-bold justify-center text-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base min-h-11 mt-8 pt-0 pr-5 pb-0 pl-5 rounded-xl transition-all active:scale-[0.97] disabled:opacity-60"
          >
            <span className="block text-center">{isSubmitting ? '완료 중...' : '앱으로 가기'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import logoImage from '@src/assets/logo.png';
import { skipOnboarding } from '@/api/onboarding';

export default function Onboarding1Page() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSkipping, setIsSkipping] = useState(false);

  const handleSkip = async () => {
    setError('');
    setIsSkipping(true);
    try {
      await skipOnboarding();
      navigate('/home');
    } catch (err) {
      console.error('Failed to skip onboarding:', err);
      setError('온보딩 건너뛰기에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSkipping(false);
    }
  };

  return (
    <div
      className="flex h-dvh min-h-dvh w-full flex-col overflow-hidden bg-purple-100 text-sm"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="items-center flex flex-col grow min-h-0 overflow-y-auto overscroll-contain justify-center text-center basis-[0%] px-5 py-8">
          <div className="flex items-center justify-center text-center w-32 h-32">
            <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
          </div>
          <div className="font-semibold text-gray-900 text-base leading-tight mt-5">나를 이해하는 기록이 시작돼요.</div>
          <div className="text-gray-600 text-sm leading-relaxed mt-2">
            단 3분 동안 몇 가지 질문에 답하면
            <br />
            맞춤 기록을 준비해드려요.
          </div>
          <div className="w-full mt-10">
            <button
              type="button"
              onClick={() => navigate('/onboarding/2')}
              className="items-center flex font-bold justify-center text-center w-full h-[46px] bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl select-none transition-all active:scale-[0.97] active:bg-black"
            >
              <span className="block text-center">시작하기</span>
            </button>
            <button
              type="button"
              onClick={handleSkip}
              disabled={isSkipping}
              className="font-bold text-purple-700 underline mt-4 text-xs select-none transition-all active:opacity-60 disabled:opacity-50"
            >
              {isSkipping ? '처리 중...' : '건너뛰고 둘러보기'}
            </button>
            {error ? <div className="text-red-500 text-xs mt-2">{error}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

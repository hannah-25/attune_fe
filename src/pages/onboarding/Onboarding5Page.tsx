import React from 'react';
import logoImage from '@src/assets/logo.png';
import { TopBar } from '../../app/components/TopBar';

export default function Onboarding5Page() {
  return (
    <div
      className="flex h-dvh min-h-dvh w-full flex-col overflow-hidden bg-gray-50 text-sm"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="온보딩 완료" centered />
        <div className="items-center flex flex-col grow min-h-0 overflow-y-auto overscroll-contain justify-center text-center basis-[0%] px-5 py-8">
          <div className="flex items-center justify-center text-center w-24 h-24">
            <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
          </div>
          <div className="font-bold text-gray-900 text-xl leading-tight mt-5">이제 시작할 준비가 됐어요!</div>
          <p className="text-gray-500 text-sm leading-relaxed mt-3">일지 · 복약 · 캘린더 · 리포트로<br />하루의 작은 변화를 함께 살펴봐요.</p>
          <div className="items-center flex font-bold justify-center text-center w-full h-[46px] bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base min-h-11 mt-8 pt-0 pr-5 pb-0 pl-5 rounded-xl">
            <span className="block text-center">홈으로 가기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

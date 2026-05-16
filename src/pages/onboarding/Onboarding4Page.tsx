import React from 'react';
import { OnboardingTopBar } from '../../app/components/OnboardingTopBar';

export default function Onboarding4Page() {
  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <OnboardingTopBar
          title="어떤 변화가 있었으면 좋겠어요?"
          description="최소 1개 이상"
          progressClassName="w-[75%] bg-purple-300"
          step={3}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-5 pr-5 pb-4 pl-5">
          <div className="flex flex-wrap gap-1.5">
            <div className="items-center flex font-semibold bg-purple-500 text-white text-xs gap-1.5 tracking-tight py-1.5 pl-3 pr-2 rounded-full shadow-sm">
              <span className="block">한 가지 일을 20분 이상 이어가기</span>
              <button className="flex items-center justify-center w-4 h-4 hover:bg-purple-600 rounded-full transition-colors">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="items-center flex font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs gap-1.5 tracking-tight py-1.5 px-3 rounded-full transition-colors cursor-pointer">
              <span className="block">해야 할 일을 10분 안에 시작하기</span>
            </div>
            <div className="items-center flex font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs gap-1.5 tracking-tight py-1.5 px-3 rounded-full transition-colors cursor-pointer">
              <span className="block">약속·일정 10분 전 준비 완료하기</span>
            </div>
            <div className="items-center flex font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs gap-1.5 tracking-tight py-1.5 px-3 rounded-full transition-colors cursor-pointer">
              <span className="block">하루 5분 주변 정리하기</span>
            </div>
            <div className="items-center flex font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs gap-1.5 tracking-tight py-1.5 px-3 rounded-full transition-colors cursor-pointer">
              <span className="block">목표 취침·기상 시간 ±1시간 안에 지키기</span>
            </div>
            <div className="items-center flex font-semibold whitespace-nowrap bg-white hover:bg-gray-50 border-gray-400 border-dashed border text-gray-600 text-xs gap-1.5 tracking-tight py-1.5 px-3 rounded-full transition-colors cursor-pointer">
              <span className="block">+ 직접입력</span>
            </div>
          </div>
          <div className="grow basis-[0%]"></div>
          <div className="items-center flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl">
            <span className="block">다음</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import logoImage from '@src/imports/logo.png';

export default function Onboarding1Page() {
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
          <div className="font-semibold text-gray-900 text-base leading-tight mt-5">나를 이해하는 기록을 시작해요.</div>
          <div className="text-gray-600 text-sm leading-relaxed mt-2">
            약 3분 동안 몇 가지 질문에 답하면<br />맞춤 기록이 준비됩니다.
          </div>
          <div className="w-full mt-10">
            <div className="items-center flex font-bold justify-center text-center w-full h-[46px] bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl">
              <span className="block text-center">시작하기</span>
            </div>
            <button className="font-bold text-purple-700 underline mt-4 text-xs">나중에 할게요</button>
          </div>
        </div>
      </div>
    </div>
  );
}

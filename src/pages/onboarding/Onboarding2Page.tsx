import React, { useState } from 'react';
import { OnboardingTopBar } from '../../app/components/OnboardingTopBar';

export default function Onboarding2Page() {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <OnboardingTopBar
          title="증상 서술"
          description="어떤 어려움을 겪어오셨나요?"
          progressClassName="w-[25%] bg-purple-500"
          step={1}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-5 pr-5 pb-4 pl-5">
          <div className="flex flex-col bg-white shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] min-h-44 p-3.5 rounded-xl border border-gray-300 mt-5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
            <label className="font-semibold text-gray-500 text-[11px] leading-tight">증상 서술</label>
            <textarea
              placeholder="자유롭게 적어주세요. 나중에 일지 태그로 추천해드려요."
              className="grow w-full min-h-[116px] bg-transparent text-gray-900 text-sm leading-relaxed placeholder:text-gray-400 outline-none resize-none mt-2 p-0"
            />
            <div className="text-right text-gray-400 text-xs leading-tight mt-2">0/500</div>
          </div>
          <div className="bg-purple-50 border border-purple-100 p-3 rounded-xl mt-5">
            <button className="items-center flex gap-2 w-full" onClick={() => setGuideOpen(v => !v)}>
              <div className="overflow-hidden w-3 h-3 shrink-0">
                <img src="/icons/51c0b100c6c8da5a7080133c33e0d3164ca5032a.svg" className="block size-full" style={{ filter: "invert(26%) sepia(89%) saturate(1583%) hue-rotate(248deg) brightness(97%) contrast(98%)" }} />
              </div>
              <div className="font-bold text-purple-700">
                증상 서술 가이드라인 보기
              </div>
              <div className="grow basis-[0%]"></div>
              <svg className={`w-3 h-3 text-purple-500 shrink-0 transition-transform duration-200 ${guideOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {guideOpen && (
              <ul className="mt-3 flex flex-col gap-2 overflow-y-auto max-h-36">
                {[
                  '최근만이 아니라, 어릴 때부터 반복된 경험을 적어주세요.',
                  '학교·집·직장 등 여러 환경에서 나타난 경험이면 좋아요.',
                  '단순한 스트레스나 우울 시기만의 변화와 구분될 수 있게 작성해주세요.',
                  '"집중이 안 됨"보다 구체적인 상황을 적어주세요.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-1.5 text-purple-800 text-xs leading-relaxed">
                    <span className="shrink-0 mt-0.5">·</span>
                    <span>{item}</span>
                  </li>
                ))}
                <li className="flex gap-1.5 text-purple-500 text-xs leading-relaxed">
                  <span className="shrink-0 mt-0.5">예)</span>
                  <span>숙제를 자주 미루고 마감 직전에 함 / 물건을 반복해서 잃어버림</span>
                </li>
              </ul>
            )}
          </div>
          <div className="grow basis-[0%]"></div>
          <div className="text-center text-gray-500 text-xs">최소 50자 이상 입력해 주세요</div>
          <div className="items-center flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 mt-3 pt-0 pr-5 pb-0 pl-5 rounded-xl">
            <span className="block">다음</span>
          </div>
        </div>
      </div>
    </div>
  );
}

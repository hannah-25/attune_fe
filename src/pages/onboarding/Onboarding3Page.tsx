import React from 'react';

export default function Onboarding3Page() {
  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-2.5 pt-0 pr-0 pb-0 pl-0 shrink-[0]">
          <div className="relative h-1 bg-purple-50 rounded-sm">
            <div className="absolute w-[50%] left-0 top-0 bottom-0 bg-purple-300 rounded-sm"></div>
          </div>
          <div className="items-start flex pt-1 pr-4 pl-1">
            <button className="items-center flex justify-center w-11 h-11 text-gray-700 rounded-xl shrink-0 hover:bg-white/60 transition-colors" aria-label="이전 화면">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18L9 12L15 6" /></svg>
            </button>
            <div className="grow">
              <div className="font-semibold text-gray-900 text-sm leading-tight">ASRS 자가 체크</div>
              <div className="mt-1 text-gray-600 text-xs leading-relaxed">18문항 · 약 3분</div>
            </div>
            <div className="text-gray-600 text-xs whitespace-nowrap ml-2 mt-0.5 shrink-0">2 / 4</div>
          </div>
        </div>
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-5 pr-5 pb-4 pl-5">
          <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] p-3 rounded-xl">
            <div className="font-medium mb-3 text-sm leading-snug">
              <span className="font-semibold text-gray-500 mr-2">Q3</span>일을 마무리하는 데 얼마나 자주 어려움을 겪나요?
            </div>
            <div className="space-y-1">
              <div className="flex justify-between w-full">
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">1</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">2</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">3</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-500 shadow-sm rounded-lg">
                  <div className="text-base font-bold text-white">4</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">5</div>
                </button>
              </div>
              <div className="flex justify-between w-full text-[10px] text-gray-600">
                <span>전혀</span>
                <span>매우 자주</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] p-3 rounded-xl">
            <div className="font-medium mb-3 text-sm leading-snug">
              <span className="font-semibold text-gray-500 mr-2">Q4</span>체계적으로 정리해야 할 일을 미루는 경향이 있나요?
            </div>
            <div className="space-y-1">
              <div className="flex justify-between w-full">
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">1</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">2</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-500 shadow-sm rounded-lg">
                  <div className="text-base font-bold text-white">3</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">4</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">5</div>
                </button>
              </div>
              <div className="flex justify-between w-full text-[10px] text-gray-600">
                <span>전혀</span>
                <span>매우 자주</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] p-3 rounded-xl">
            <div className="font-medium mb-3 text-sm leading-snug">
              <span className="font-semibold text-gray-500 mr-2">Q5</span>약속이나 의무를 잊어버리는 경우가 있나요?
            </div>
            <div className="space-y-1">
              <div className="flex justify-between w-full">
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">1</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-500 shadow-sm rounded-lg">
                  <div className="text-base font-bold text-white">2</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">3</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">4</div>
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="text-base font-bold text-purple-600">5</div>
                </button>
              </div>
              <div className="flex justify-between w-full text-[10px] text-gray-600">
                <span>전혀</span>
                <span>매우 자주</span>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-100 p-2.5 rounded-xl">
            <div className="text-gray-800 text-xs leading-normal">
              ⚠︎ 본 검사는 선별 도구로 실제 진단과 다를 수 있습니다. 정확한 진단을 위해 전문의와 상담해 주세요.
            </div>
          </div>
        </div>
        <div className="pt-0 pr-5 pb-4 pl-5">
          <div className="items-center inline-flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl">
            <span className="block">다음</span>
          </div>
        </div>
      </div>
    </div>
  );
}

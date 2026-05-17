import React from 'react';

export default function CommunityWritePage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
          <div className="items-center flex justify-between relative">
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F748bff70642e790d3da4f67ab0478b2847c249a0.svg?generation=1778677418486773&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="absolute left-[50%] translate-x-[-50%] font-bold text-base">새 글</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="font-bold text-white bg-[rgb(31,27,46)] px-3 py-1 rounded-lg">
                  발행
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-2 pl-4">
          <div className="flex mb-3 gap-1.5">
            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
              <span className="block">콘서타</span>
            </div>
            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-700 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
              <span className="block">+ 카테고리</span>
            </div>
            <div className="grow basis-[0%]"></div>
            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-[rgb(185,166,255)] border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block">익명</span>
            </div>
          </div>
          <div className="font-bold mb-1 text-lg" style={{ fontFamily: "NanumSquare, system-ui" }}>
            제목
          </div>
          <div className="w-[68%] h-[9px] bg-purple-50 rounded-[0.5625rem]"></div>
          <div className="h-[14px]"></div>
          <div className="flex flex-col gap-[9px]">
            <div className="w-[92%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
            <div className="w-[78%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
            <div className="w-[85%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
            <div className="w-[40%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

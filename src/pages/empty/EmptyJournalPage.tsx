import React from 'react';
import logoImage from '@src/imports/logo.png';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';

export default function EmptyJournalPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
          <div className="items-center flex justify-between">
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa661aedb84aa79c6a3b2e710ca7b9f1064b5aea7.svg?generation=1778677418544330&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-bold text-sm">오늘 일지</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F55c9c7102106ee9fe76c6f15a70c64598dab46d3.svg?generation=1778677418557065&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollArea className="items-center flex flex-col justify-center text-center gap-4 pt-5 px-6">
          <div className="flex items-center justify-center text-center w-28 h-28 mb-1">
            <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
          </div>
          <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{ fontFamily: "NanumSquare, system-ui" }}>
            <span className="text-center">오늘은 어떤 하루였어요?</span>
          </div>
          <div className="text-center text-gray-600 leading-[20.15px] max-w-[220px]"><span className="text-center">작은 감정 하나, 컨디션 한 줄도 좋아요.</span><br /><span className="text-center">하루 1번이면 충분해요.</span></div>
          <div className="flex flex-wrap justify-center text-center mt-1 gap-1.5 max-w-60">
            <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">😊 평온</div>
            <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">😣 집중 어려움</div>
            <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">💊 복용</div>
            <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">🌙 수면</div>
          </div>
          <div className="text-center h-2"></div>
          <div className="items-center flex font-bold justify-center text-center h-[50px] bg-purple-500 shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[200px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
            <span className="block text-center">오늘 첫 기록 시작</span>
          </div>
          <div className="text-center text-gray-500 text-xs">
            <span className="text-center">걸리는 시간 · 평균 18초</span>
          </div>
        </ScrollArea>
        <TabBar active="일지" />
      </div>
    </div>
  );
}

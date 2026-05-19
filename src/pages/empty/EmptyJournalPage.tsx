import React from 'react';
import logoImage from '@src/assets/emotion2.png';
import { ChevronLeft, X } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

export default function EmptyJournalPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="오늘 일지"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
          right={<HeaderIconButton icon={<X className="h-4 w-4 text-gray-700" strokeWidth={2.4} />} />}
        />
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
          <div className="items-center flex font-bold justify-center text-center h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[200px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
            <span className="block text-center">첫 기록 시작</span>
          </div>
        </ScrollArea>
        <TabBar active="일지" />
      </div>
    </div>
  );
}

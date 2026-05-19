import React from 'react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';

export default function EmptyCalendarPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="items-center flex justify-between pt-2 pr-4 pb-1 pl-4">
          <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
            5월 13일
          </div>
          <div className="flex gap-1.5">
            <div className="items-center flex justify-center w-9 h-9 bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
              <div className="overflow-hidden w-[14px] h-[14px]">
                <img src="/icons/c9e88ecb3a87f7274e3e7692f5801de092f97e1f.svg" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex justify-center w-9 h-9 bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
              <div className="overflow-hidden w-[14px] h-[14px]">
                <img src="/icons/3c178cf4154d75bbfdb8a67c0f62d2d2b4f48a05.svg" className="block size-full" />
              </div>
            </div>
          </div>
        </div>
        <ScrollArea className="items-center flex flex-col justify-center text-center gap-[14px] pt-5 px-6">
          <div className="relative text-center w-[180px] pt-4 pr-[10px] pb-[14px] pl-[10px]">
            <div className="items-center flex text-center mb-[10px] gap-2.5 opacity-[0.5]">
              <div className="text-center w-[30px] h-2 bg-purple-50 rounded-sm"></div>
              <div className="text-center w-[6px] h-[6px] bg-[rgb(208,_201,_189)] rounded-[0.1875rem]"></div>
              <div className="border-dashed grow text-center h-7 bg-purple-50 border-gray-400 border basis-[0%] rounded-lg"></div>
            </div>
            <div className="items-center flex text-center mb-[10px] gap-2.5 opacity-[0.5]">
              <div className="text-center w-[30px] h-2 bg-purple-50 rounded-sm"></div>
              <div className="text-center w-[6px] h-[6px] bg-[rgb(208,_201,_189)] rounded-[0.1875rem]"></div>
              <div className="border-dashed grow text-center h-7 bg-purple-50 border-gray-400 border basis-[0%] rounded-lg"></div>
            </div>
            <div className="items-center flex text-center mb-[10px] gap-2.5 opacity-[0.5]">
              <div className="text-center w-[30px] h-2 bg-purple-50 rounded-sm"></div>
              <div className="text-center w-[6px] h-[6px] bg-[rgb(208,_201,_189)] rounded-[0.1875rem]"></div>
              <div className="border-dashed grow text-center h-7 bg-purple-50 border-gray-400 border basis-[0%] rounded-lg"></div>
            </div>
            <div className="absolute text-center left-0 top-0 right-0 bottom-0" style={{"backgroundImage":"linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(255, 250, 240) 80%)"}}></div>
          </div>
          <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
            <span className="text-center">오늘은 여유로운 하루</span>
          </div>
          <div className="text-center text-gray-600 leading-[20.15px] max-w-60">
            <span className="text-center">예정된 일정이 없어요. 새로 추가하거나 외부 캘 린더를 연동해보세요.</span>
          </div>
          <div className="text-center h-1"></div>
          <div className="items-center flex font-bold justify-center text-center h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[180px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
            <span className="block text-center">+ 새 일정</span>
          </div>
          <div className="items-center flex font-bold justify-center text-center h-11 border border-gray-300 text-gray-700 text-sm tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.375rem]">
            <span className="block text-center">Google 캘린더 연동하기</span>
          </div>
        </ScrollArea>
        <TabBar active="캘린더" />
      </div>
    </div>
  );
}

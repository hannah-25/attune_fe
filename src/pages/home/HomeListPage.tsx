import React from 'react';
import logoImage from '@src/imports/logo.png';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';

export default function HomeListPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="relative items-center flex pt-2 pr-5 pb-2 pl-5 min-h-[52px]">
          <div className="w-8 h-8 shrink-0">
            <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
          </div>
          <div className="grow basis-[0%]"></div>
          <div className="items-center flex gap-2 shrink-0">
            <div className="items-center flex justify-center w-8 h-8 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-full shrink-0">
              <div className="overflow-hidden w-[14px] h-[14px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F65f847e691f2e01088069fffb3ba8a278705ebdd.svg?generation=1778677414177110&alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex justify-center w-8 h-8 bg-purple-200 rounded-full shrink-0">
              <span className="font-bold text-purple-700 text-xs">J</span>
            </div>
          </div>
        </div>
        <ScrollArea className="flex flex-col gap-2 pt-1">
          <div className="items-center flex justify-between px-1">
            <div className="font-semibold text-sm text-gray-800">주간 통계</div>
            <button className="text-xs text-gray-400">전체보기</button>
          </div>
          <div className="flex gap-2">
            <div className="grow bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] basis-[0%] pt-2.5 px-3 pb-2.5 rounded-2xl text-center">
              <div className="text-[10px] text-gray-500 leading-tight">달성률</div>
              <div className="font-bold text-lg mt-0.5 text-gray-900" style={{"fontFamily":"NanumSquare, system-ui"}}>71%</div>
            </div>
            <div className="grow bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] basis-[0%] pt-2.5 px-3 pb-2.5 rounded-2xl text-center">
              <div className="text-[10px] text-gray-500 leading-tight">복약률</div>
              <div className="font-bold text-lg mt-0.5 text-gray-900" style={{"fontFamily":"NanumSquare, system-ui"}}>86%</div>
            </div>
            <div className="grow bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] basis-[0%] pt-2.5 px-3 pb-2.5 rounded-2xl text-center">
              <div className="text-[10px] text-gray-500 leading-tight">일지 작성</div>
              <div className="font-bold text-lg mt-0.5 text-gray-900" style={{"fontFamily":"NanumSquare, system-ui"}}>3/6</div>
            </div>
          </div>
          <div className="items-center flex justify-between px-1 mt-3">
            <div className="font-semibold text-sm text-gray-800">오늘 할일</div>
            <button className="text-xs text-gray-400">전체보기</button>
          </div>
          <div className="items-center flex justify-between bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] px-4 py-3 rounded-2xl">
            <div>
              <div className="font-semibold text-sm text-gray-800">오늘 일지 작성하기</div>
              <div className="text-[11px] text-purple-600 mt-0.5">감정 · 증상 · 수면 · 목표</div>
            </div>
            <div className="items-center flex justify-center w-8 h-8 bg-purple-200 shrink-0 rounded-full">
              <svg className="w-[15px] h-[15px] text-purple-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
          </div>
          <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] p-3 rounded-2xl">
            <div className="flex flex-col gap-2">
              <div className="items-center flex gap-2">
                <div className="items-center flex justify-center w-4 h-4 bg-purple-300 shrink-0 rounded-full">
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <div className="text-xs text-gray-400 line-through">병원 서류 챙기기</div>
              </div>
              <div className="items-center flex gap-2">
                <div className="w-4 h-4 border border-gray-300 shrink-0 rounded-full"></div>
                <div className="text-xs text-gray-700">리포트 초안 제출</div>
              </div>
              <div className="items-center flex gap-2">
                <div className="w-4 h-4 border border-gray-300 shrink-0 rounded-full"></div>
                <div className="text-xs text-gray-700">저녁 약 챙기기</div>
              </div>
            </div>
          </div>
          <div className="items-center flex justify-between px-1 mt-3">
            <div className="font-semibold text-sm text-gray-800">예정 일정</div>
            <button className="text-xs text-gray-400">전체보기</button>
          </div>
          <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] px-3 py-2 rounded-2xl flex flex-col">
            <div className="items-center flex gap-3 py-2">
              <div className="font-medium text-[11px] text-purple-500 w-[34px] shrink-0">오늘</div>
              <div className="w-2 h-2 bg-purple-500 shrink-0 rounded-full"></div>
              <div className="font-semibold text-xs text-gray-800 grow">병원 진료</div>
              <div className="text-[10px] text-gray-400 shrink-0">14:00</div>
            </div>
            <div className="items-center flex gap-3 py-2 border-t border-gray-100">
              <div className="font-medium text-[11px] text-gray-400 w-[34px] shrink-0">내일</div>
              <div className="w-2 h-2 bg-purple-300 shrink-0 rounded-full"></div>
              <div className="font-semibold text-xs text-gray-800 grow">팀 미팅</div>
              <div className="text-[10px] text-gray-400 shrink-0">09:00</div>
            </div>
            <div className="items-center flex gap-3 py-2 border-t border-gray-100">
              <div className="font-medium text-[11px] text-gray-400 w-[34px] shrink-0">목</div>
              <div className="w-2 h-2 bg-purple-300 shrink-0 rounded-full"></div>
              <div className="font-semibold text-xs text-gray-800 grow">정신건강의학과 상담</div>
              <div className="text-[10px] text-gray-400 shrink-0">14:00</div>
            </div>
          </div>
          <div className="items-center flex justify-between px-1 mt-3">
            <div className="font-semibold text-sm text-gray-800">주간 인사이트</div>
            <button className="text-xs text-gray-400">전체보기</button>
          </div>
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] px-4 py-3 rounded-[1.375rem] items-center flex gap-3">
            <div className="items-center flex justify-center w-9 h-9 bg-purple-200 shrink-0 rounded-xl">
              <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
              </svg>
            </div>
            <div className="grow">
              <div className="font-bold text-xs text-gray-900 leading-tight whitespace-nowrap">복용 2시간 후 집중력 <span className="text-purple-600">+24%</span></div>
              <div className="text-[10px] text-gray-500 mt-1">복약률 86% · 달성률 71%</div>
            </div>
            <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </ScrollArea>
        <TabBar active="홈" />
      </div>
    </div>
  );
}

import React from 'react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

export default function CommunityNoticePage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="공지사항"
          left={<HeaderIconButton src="/icons/6d07fc7b7d550d443283422ac15fea3de29aaa18.svg" />}
          right={<HeaderIconButton src="/icons/54801ab4fa8db759bc53fa6b9af4ca068dee6da9.svg" />}
        />
        <ScrollArea className="flex flex-col gap-2">
          <div className="items-center flex bg-red-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] gap-2.5 p-3 rounded-[1.125rem]">
            <div className="items-center flex justify-center w-[26px] h-[26px] bg-white rounded-[0.8125rem]">
              <div className="overflow-hidden w-3 h-3">
                <img src="/icons/b29419fe5049084df816425a309c1fc382ccbb0e.svg" className="block size-full" />
              </div>
            </div>
            <div className="grow basis-[0%]">
              <div className="font-extrabold">
                [중요] 개인정보 처리방침 개정 안내
              </div>
              <div className="mt-[2px] text-gray-600 text-xs">
                30일 내 명시적 거부가 없으면 동의로 간주
              </div>
            </div>
            <div className="overflow-hidden w-[11px] h-[11px]">
              <img src="/icons/0d624e7072e06ed07c07f6aafc3c44b136bfc2b6.svg" className="block size-full" />
            </div>
          </div>
          <div className="h-2" />
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="font-semibold">v2.1 업데이트 — 캘린더 연동 추가</div>
            <div className="mt-1 text-gray-600 text-xs">5월 10일</div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="font-semibold">서버 점검 안내 (5/15 02:00 ~ 04:00)</div>
            <div className="mt-1 text-gray-600 text-xs">5월 9일</div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="font-semibold">상담 기록 PDF 내보내기 베타 오픈</div>
            <div className="mt-1 text-gray-600 text-xs">5월 2일</div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="font-semibold">이용약관 일부 개정 안내</div>
            <div className="mt-1 text-gray-600 text-xs">4월 28일</div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="font-semibold">v2.0 정식 출시 — 주간 리포트 추가</div>
            <div className="mt-1 text-gray-600 text-xs">4월 15일</div>
          </div>
          <div className="items-center flex justify-center gap-1.5 pt-2 pb-1">
            <div className="w-[6px] h-[6px] bg-purple-500 rounded-full" />
            <div className="w-[6px] h-[6px] bg-purple-100 rounded-full" />
            <div className="w-[6px] h-[6px] bg-purple-100 rounded-full" />
          </div>
        </ScrollArea>
        <TabBar active="커뮤니티" />
      </div>
    </div>
  );
}

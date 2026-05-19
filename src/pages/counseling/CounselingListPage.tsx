import React from 'react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { TopBar } from '@/components/TopBar';

export default function CounselingListPage() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="상담 일정" reserveLeft reserveRight />
        <ScrollArea className="flex flex-col gap-3">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="flex items-center gap-4">
              <div className="shrink-0 text-center">
                <div className="text-[10px] text-purple-700 font-semibold">다음 상담까지</div>
                <div className="font-extrabold text-4xl leading-none text-gray-700 mt-1" style={{ fontFamily: "NanumSquare, system-ui" }}>D-3</div>
              </div>
              <div className="w-px self-stretch bg-purple-200" />
              <div className="min-w-0">
                <div className="font-bold text-base text-gray-900">청담심리상담센터</div>
                <div className="text-sm text-gray-500 mt-0.5">김지수 원장</div>
                <div className="text-xs text-purple-700 font-semibold mt-1">5월 16일 금 · 14:00</div>
              </div>
            </div>
            <div className="flex mt-4 gap-2">
              <button
                type="button"
                onClick={() => navigate('/counseling/prepare')}
                className="flex flex-1 items-center justify-center h-11 bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white font-bold rounded-[1.125rem]"
              >
                상담 준비 시작
              </button>
              <button
                type="button"
                className="flex items-center justify-center h-11 border border-gray-300 text-gray-500 font-semibold px-5 rounded-[1.125rem]"
              >
                일정 변경
              </button>
            </div>
          </div>
          <div className="font-bold text-gray-600 pt-1 pr-1 pb-0 pl-1">
            지난 상담
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
            <div className="mb-[6px]">
              <div className="font-bold text-gray-600">4월 16일 금</div>
            </div>
            <div className="font-semibold">청담심리상담센터</div>
            <div className="mt-1 text-gray-600">처방 유지 · 콘서타 18mg</div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
            <div className="mb-[6px]">
              <div className="font-bold text-gray-600">3월 19일 금</div>
            </div>
            <div className="font-semibold">청담심리상담센터</div>
            <div className="mt-1 text-gray-600">용량 조정 18 → 27mg 검토</div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
            <div className="mb-[6px]">
              <div className="font-bold text-gray-600">2월 20일 금</div>
            </div>
            <div className="font-semibold">청담심리상담센터</div>
            <div className="mt-1 text-gray-600">초기 상담</div>
          </div>
        </ScrollArea>
        <TabBar />
      </div>
    </div>
  );
}

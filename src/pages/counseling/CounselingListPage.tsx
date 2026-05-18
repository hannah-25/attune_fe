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
        <TopBar title="상담" reserveLeft reserveRight />
        <ScrollArea className="flex flex-col gap-3">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="font-bold text-gray-600 text-xs">
              다음 상담까지
            </div>
            <div className="font-extrabold mt-[2px] text-3xl" style={{ fontFamily: "NanumSquare, system-ui" }}>
              D-3
            </div>
            <div className="mt-1 text-gray-800">
              5월 16일 금 · 14:00 · 청담심리상담센터
            </div>
            <div className="flex mt-3 gap-1.5">
              <button
                type="button"
                onClick={() => navigate('/counseling/prepare')}
                className="items-center flex grow font-bold justify-center h-9 bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem]"
              >
                <span className="block">상담 준비 시작</span>
              </button>
              <button
                type="button"
                className="items-center flex grow font-bold justify-center h-9 border-gray-900 border basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem]"
              >
                <span className="block">일정 변경</span>
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
        <TabBar active="상담" variant="counseling" />
      </div>
    </div>
  );
}

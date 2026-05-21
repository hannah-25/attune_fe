import React from 'react';
import { ChevronRight, Download, Link2, Pill } from 'lucide-react';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';

export default function ReportMonthlyDetailPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="2026년 4월"
          left={<NavBackButton />}
          right={<HeaderIconButton icon={<ChevronRight className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="font-bold text-gray-600">월 요약</div>
            <div className="font-extrabold mt-1 text-lg leading-[25.2px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
              아침 루틴을 지킨 날에 집중이 더 안정적이었어요
            </div>
            <div className="flex mt-3 gap-1.5">
              <Chip>복용 92%</Chip>
              <Chip>기록 24일</Chip>
              <Chip>감정 +0.8</Chip>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="font-bold mb-[10px]">월간 캘린더</div>
            <div className="grid-cols-7 grid gap-1">
              {Array.from({ length: 35 }, (_, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-md ${['bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-500'][index % 4]} ${index === 19 ? 'border border-gray-900' : ''}`}
                />
              ))}
            </div>
            <div className="items-center flex mt-3 text-gray-600 text-xs gap-1.5">
              <span className="block">적음</span>
              <div className="w-3 h-2 bg-purple-100 rounded-xs"></div>
              <div className="w-3 h-2 bg-purple-200 rounded-xs"></div>
              <div className="w-3 h-2 bg-purple-300 rounded-xs"></div>
              <div className="w-3 h-2 bg-purple-500 rounded-xs"></div>
              <span className="block">많음</span>
            </div>
          </div>
          <Insight icon={<Link2 className="w-[14px] h-[14px] text-purple-500" strokeWidth={2.5} />} title="상관관계 인사이트">
            수면 6시간 미만인 날의 다음 날 업무 실수가 평소보다 1.7배 더 많았어요.
          </Insight>
          <Insight icon={<Pill className="w-[14px] h-[14px] text-purple-500" strokeWidth={2.5} />} title="약물 반응">
            콘서타 복용 시작 후 3주차부터 식욕 저하 빈도가 줄었습니다.
          </Insight>
          <button type="button" className="items-center flex font-bold justify-center w-full h-[50px] border-gray-900 border text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
            <Download className="w-[14px] h-[14px]" strokeWidth={2.5} />
            <span className="block ml-[6px]">PDF로 내보내기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-50 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
      <span className="block">{children}</span>
    </div>
  );
}

function Insight({ children, icon, title }: { children: React.ReactNode; icon: React.ReactNode; title: string }) {
  return (
    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
      <div className="items-center flex mb-2 gap-1.5">
        {icon}
        <div className="font-bold">{title}</div>
      </div>
      <div className="text-gray-800 leading-[20.15px]">{children}</div>
    </div>
  );
}

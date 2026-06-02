import React from 'react';
import { BarChart3, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';

const MONTHS = [
  { month: '2026년 5월', status: '진행 중 · 5/12 업데이트', current: true },
  { month: '2026년 4월', status: '완료 · 5/01 생성' },
  { month: '2026년 3월', status: '완료 · 4/01 생성' },
  { month: '2026년 2월', status: '완료 · 3/01 생성' },
];

export default function ReportMonthlyListPage() {
  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="월별 리포트"
          left={<NavBackButton />}
          right={<HeaderIconButton icon={<ChevronRight className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
        />
        <ScrollArea className="flex flex-col gap-2.5">
          {MONTHS.map((item) => (
            <div key={item.month} className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
              <div className="items-center flex gap-2.5">
                <div className="items-center flex justify-center w-11 h-11 bg-white rounded-[0.875rem]">
                  <BarChart3 className="w-5 h-5 text-purple-500" strokeWidth={2.4} />
                </div>
                <div className="grow basis-[0%]">
                  <div className="font-extrabold text-base" style={{ fontFamily: 'NanumSquare, system-ui' }}>{item.month}</div>
                  <div className="mt-[2px] text-gray-600 text-xs">{item.status}</div>
                </div>
                {!item.current ? (
                  <div className="items-center flex justify-center w-8 h-8 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-2xl">
                    <ChevronRight className="w-3 h-3 text-gray-600" strokeWidth={2.5} />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </ScrollArea>
        <TabBar active="리포트" />
      </div>
    </div>
  );
}

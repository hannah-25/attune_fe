import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TabBar } from '@/components/TabBar';
import { formatMonthDay } from '@/lib/date';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { mockDayRecords } from '@/mocks/journal.mock';

type DotColor = 'purple' | 'orange' | 'blue' | 'green';

const dotColorClass: Record<DotColor, string> = {
  purple: 'bg-purple-500',
  orange: 'bg-[rgb(255,140,80)]',
  blue: 'bg-[rgb(80,140,220)]',
  green: 'bg-[rgb(80,190,130)]',
};

const dotLabel: Record<DotColor, string> = {
  purple: '감정',
  orange: '부작용',
  blue: '업무',
  green: '컨디션',
};

const dayRecords = mockDayRecords;

const TODAY_DATE = new Date();
const TODAY = TODAY_DATE.getDate();
const CURRENT_YEAR = TODAY_DATE.getFullYear();
const CURRENT_MONTH = TODAY_DATE.getMonth();

const firstDayOfMonth = new Date(CURRENT_YEAR, CURRENT_MONTH, 1).getDay();
const daysInMonth = new Date(CURRENT_YEAR, CURRENT_MONTH + 1, 0).getDate();

function getDay(row: number, col: number): number | null {
  const day = (row - 1) * 7 + col - firstDayOfMonth;
  return day >= 1 && day <= daysInMonth ? day : null;
}

// Current week (Sun–Sat)
const weekStart = new Date(TODAY_DATE);
weekStart.setDate(TODAY_DATE.getDate() - TODAY_DATE.getDay());
const WEEK_DAYS = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(weekStart);
  d.setDate(weekStart.getDate() + i);
  return d.getDate();
});

const DOW = ['일', '월', '화', '수', '목', '금', '토'];
const ROWS = [1, 2, 3, 4, 5, 6];
const COLS = [1, 2, 3, 4, 5, 6, 7];

export default function JournalCalendarPage() {
  const [viewMode, setViewMode] = useState<'월' | '주'>('월');

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">

        <TopBar
          title="캘린더"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
          right={<HeaderIconButton icon={<ChevronRight className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
        />

        {/* 고정 캘린더 영역 */}
        <div className="shrink-0">
          {/* 월 네비게이션 + 뷰 전환 */}
          <div className="pt-0 pr-4 pb-1 pl-4">
            <div className="items-center flex mb-2 gap-2">
              <div className="overflow-hidden w-[14px] h-[14px]">
                <img src="/icons/dc481ce5ba4d58b23a7460e5c99b3dfedea9c82a.svg" className="block size-full" />
              </div>
              <div className="font-bold text-lg" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                {CURRENT_YEAR}년 {CURRENT_MONTH + 1}월
              </div>
              <div className="overflow-hidden w-[14px] h-[14px]">
                <img src="/icons/7a6542fea4feea5b0aefcb93656c6349f537576b.svg" className="block size-full" />
              </div>
              <div className="grow basis-[0%]" />
              {(['월', '주'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`items-center flex font-semibold whitespace-nowrap text-xs tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-full transition-colors ${
                    viewMode === mode
                      ? 'bg-purple-100 border border-[rgb(185,166,255)] text-purple-800'
                      : 'text-gray-500'
                  }`}
                >
                  <span className="block">{mode}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 캘린더 */}
          <div className="pt-0 pr-3 pb-0 pl-3">
            <div className="grid-cols-7 grid mb-[6px] gap-1">
              {DOW.map((d, i) => (
                <div
                  key={d}
                  className="font-bold text-center text-gray-600 text-xs"
                  style={{ gridArea: `1 / ${i + 1} / 2 / ${i + 2}` }}
                >
                  {d}
                </div>
              ))}
            </div>

            {viewMode === '주' ? (
              <div className="grid-cols-7 grid gap-1">
                {WEEK_DAYS.map((day, i) => {
                  const isToday = day === TODAY;
                  const records = dayRecords[day] ?? [];
                  return (
                    <div
                      key={day}
                      className={`relative text-center aspect-square flex items-center justify-center flex-col rounded-xl ${isToday ? 'bg-[rgb(31,27,46)] text-white' : ''}`}
                      style={{ gridArea: `1 / ${i + 1} / 2 / ${i + 2}` }}
                    >
                      <span className={`font-${isToday ? 'extrabold' : 'semibold'} leading-none`}>{day}</span>
                      {records.length > 0 && (
                        <div className="flex mt-[3px] gap-[2px]">
                          {records.map((color, j) => (
                            <div key={j} className={`w-1 h-1 rounded-full ${isToday ? 'bg-white' : dotColorClass[color]}`} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid-cols-7 grid gap-1">
                {ROWS.flatMap(row =>
                  COLS.map(col => {
                    const day = getDay(row, col);
                    const gridArea = `${row} / ${col} / ${row + 1} / ${col + 1}`;

                    if (day === null) {
                      return <div key={`empty-${row}-${col}`} className="aspect-square rounded-xl" style={{ gridArea }} />;
                    }

                    if (day === TODAY) {
                      return (
                        <div
                          key={day}
                          className="items-center aspect-square flex font-extrabold justify-center relative bg-[rgb(31,27,46)] text-white rounded-xl"
                          style={{ gridArea }}
                        >
                          {day}
                        </div>
                      );
                    }

                    const records = dayRecords[day] ?? [];
                    return (
                      <div
                        key={day}
                        className="items-center aspect-square flex font-semibold justify-center relative rounded-xl"
                        style={{ gridArea }}
                      >
                        {day}
                        {records.length > 0 && (
                          <div className="absolute flex left-[50%] bottom-[3px] translate-x-[-50%] gap-[2px]">
                            {records.map((color, i) => (
                              <div key={i} className={`w-1 h-1 rounded-full ${dotColorClass[color]}`} />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* 범례 */}
          <div className="flex text-gray-500 text-xs gap-2.5 pt-3 pr-5 pb-2 pl-5">
            <div className="items-center flex gap-1"><div className="w-2 h-2 bg-purple-500 rounded-full" />감정</div>
            <div className="items-center flex gap-1"><div className="w-2 h-2 bg-[rgb(255,140,80)] rounded-full" />부작용</div>
            <div className="items-center flex gap-1"><div className="w-2 h-2 bg-[rgb(80,140,220)] rounded-full" />업무</div>
            <div className="items-center flex gap-1"><div className="w-2 h-2 bg-[rgb(80,190,130)] rounded-full" />좋은 날</div>
          </div>

          <div className="h-px mx-4 bg-purple-50" />
        </div>

        {/* 최근 기록만 스크롤 */}
        <div className="grow min-h-0 overflow-y-auto overscroll-contain px-4 pt-3 pb-[100px]">
          <div className="font-bold mb-2 text-gray-900">최근 기록</div>
          {[1, 2, 3].map((offset) => {
            const d = new Date(TODAY_DATE);
            d.setDate(TODAY_DATE.getDate() - offset);
            const label = formatMonthDay(d);
            const records = dayRecords[d.getDate()];
            if (!records || records.length === 0) return null;
            return (
              <div key={offset} className="mb-2 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
                <div className="text-xs text-gray-500">{label}</div>
                <div className="flex flex-wrap gap-2 mt-[6px]">
                  {records.map((color, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full inline-block shrink-0 ${dotColorClass[color]}`} />
                      <span className="font-semibold text-gray-600 text-xs">{dotLabel[color]}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <TabBar active="일지" />
      </div>
    </div>
  );
}

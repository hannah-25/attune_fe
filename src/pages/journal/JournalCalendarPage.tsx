import React from 'react';
import { Check } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { formatMonthDay } from '@/lib/date';

type DotColor = 'purple' | 'orange' | 'blue' | 'green';

const dotColorClass: Record<DotColor, string> = {
  purple: 'bg-purple-500',
  orange: 'bg-[rgb(255,140,80)]',
  blue: 'bg-[rgb(80,140,220)]',
  green: 'bg-[rgb(80,190,130)]',
};

// 날짜별 기록 카테고리 (mock data)
const dayRecords: Record<number, DotColor[]> = {
  2:  ['purple'],
  3:  ['purple', 'blue'],
  5:  ['orange'],
  6:  ['purple', 'orange'],
  7:  ['purple'],
  8:  ['green'],
  9:  ['purple', 'blue'],
  11: ['orange', 'blue'],
  12: ['purple', 'green'],
  16: ['purple'],
  17: ['orange'],
  18: ['purple', 'blue'],
  19: ['purple'],
  20: ['green'],
  22: ['purple', 'orange'],
  23: ['blue'],
  24: ['purple'],
  25: ['green', 'purple'],
  26: ['purple', 'orange'],
  27: ['purple'],
};

const TODAY_DATE = new Date();
const TODAY = TODAY_DATE.getDate();
const CURRENT_YEAR = TODAY_DATE.getFullYear();
const CURRENT_MONTH = TODAY_DATE.getMonth(); // 0-indexed

const firstDayOfMonth = new Date(CURRENT_YEAR, CURRENT_MONTH, 1).getDay(); // 0=Sun
const daysInMonth = new Date(CURRENT_YEAR, CURRENT_MONTH + 1, 0).getDate();

// col offset from Sunday (col=1). startCol = firstDayOfMonth + 1
function getDay(row: number, col: number): number | null {
  const day = (row - 1) * 7 + col - firstDayOfMonth;
  return day >= 1 && day <= daysInMonth ? day : null;
}

const DOW = ['일', '월', '화', '수', '목', '금', '토'];
const ROWS = [1, 2, 3, 4, 5, 6];
const COLS = [1, 2, 3, 4, 5, 6, 7];

export default function JournalCalendarPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">

        {/* 탑바 */}
        <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
          <div className="items-center flex justify-between">
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0f148e246b2f2bb3a69872ea8396c06705d1c413.svg?generation=1778677415336099&alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-bold text-sm">캘린더</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff69b80758895256011eb548cf58375ba9863075c.svg?generation=1778677415343589&alt=media" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 스크롤 영역 전체 */}
        <ScrollArea>

          {/* 월 네비게이션 + 뷰 전환 */}
          <div className="pt-0 pr-4 pb-1 pl-4">
            <div className="items-center flex mb-2 gap-2">
              <div className="overflow-hidden w-[14px] h-[14px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fdc481ce5ba4d58b23a7460e5c99b3dfedea9c82a.svg?generation=1778677415378610&alt=media" className="block size-full" />
              </div>
              <div className="font-bold text-lg" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                {CURRENT_YEAR}년 {CURRENT_MONTH + 1}월
              </div>
              <div className="overflow-hidden w-[14px] h-[14px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F7a6542fea4feea5b0aefcb93656c6349f537576b.svg?generation=1778677415401373&alt=media" className="block size-full" />
              </div>
              <div className="grow basis-[0%]" />
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border border-[rgb(185,166,255)] text-purple-800 text-xs gap-1 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[9px] rounded-full">
                <Check className="w-[10px] h-[10px] shrink-0" strokeWidth={3} />
                <span className="block">월</span>
              </div>
              <div className="items-center flex font-semibold whitespace-nowrap text-gray-500 text-xs tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-full">
                <span className="block">주</span>
              </div>
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
          </div>

          {/* 범례 */}
          <div className="flex text-gray-500 text-xs gap-2.5 pt-4 pr-5 pb-1.5 pl-5">
            <div className="items-center flex gap-1"><div className="w-2 h-2 bg-purple-500 rounded-full" />감정</div>
            <div className="items-center flex gap-1"><div className="w-2 h-2 bg-[rgb(255,140,80)] rounded-full" />부작용</div>
            <div className="items-center flex gap-1"><div className="w-2 h-2 bg-[rgb(80,140,220)] rounded-full" />업무</div>
            <div className="items-center flex gap-1"><div className="w-2 h-2 bg-[rgb(80,190,130)] rounded-full" />좋은 날</div>
          </div>

          {/* 최근 기록 */}
          <div className="pt-2 pr-4 pl-4">
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
                  <div className="font-semibold mt-[2px] text-gray-400 text-xs">기록 있음</div>
                </div>
              );
            })}
          </div>

        </ScrollArea>

        <TabBar active="일지" />
      </div>
    </div>
  );
}

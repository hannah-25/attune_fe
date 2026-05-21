import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TabBar } from '@/components/TabBar';
import { formatMonthDay } from '@/lib/date';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { getJournalDates } from '@/api/journal';

type DotColor = 'purple' | 'orange' | 'blue' | 'green';
type ViewMode = '월' | '주';

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
  green: '좋은 날',
};

const TODAY_DATE = new Date();
const TODAY = TODAY_DATE.getDate();
const CURRENT_YEAR = TODAY_DATE.getFullYear();
const CURRENT_MONTH = TODAY_DATE.getMonth();
const firstDayOfMonth = new Date(CURRENT_YEAR, CURRENT_MONTH, 1).getDay();
const daysInMonth = new Date(CURRENT_YEAR, CURRENT_MONTH + 1, 0).getDate();
const DOW = ['일', '월', '화', '수', '목', '금', '토'];

function getDay(row: number, col: number): number | null {
  const day = (row - 1) * 7 + col - firstDayOfMonth;
  return day >= 1 && day <= daysInMonth ? day : null;
}

const weekStart = new Date(TODAY_DATE);
weekStart.setDate(TODAY_DATE.getDate() - TODAY_DATE.getDay());
const WEEK_DAYS = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(weekStart);
  d.setDate(weekStart.getDate() + i);
  return d.getDate();
});

export default function JournalCalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('월');
  const [recordDates, setRecordDates] = useState<Set<string>>(new Set());
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    getJournalDates({
      startDate: toDateKey(new Date(CURRENT_YEAR, CURRENT_MONTH, 1)),
      endDate: toDateKey(new Date(CURRENT_YEAR, CURRENT_MONTH + 1, 0)),
    })
      .then((response) => {
        if (!ignore) setRecordDates(new Set(response.dates));
      })
      .catch(() => {
        if (!ignore) setError('일지 기록을 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, []);

  const recentDates = useMemo(
    () => Array.from(recordDates).sort((a, b) => b.localeCompare(a)).slice(0, 3),
    [recordDates],
  );

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="일지"
          left={<NavBackButton />}
          right={<HeaderIconButton icon={<ChevronRight className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
        />
        <div className="shrink-0">
          <div className="pt-0 pr-4 pb-1 pl-4">
            <div className="items-center flex mb-2 gap-2">
              <ChevronLeft className="w-[14px] h-[14px] text-gray-700" strokeWidth={2.5} />
              <div className="font-bold text-lg" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                {CURRENT_YEAR}년 {CURRENT_MONTH + 1}월
              </div>
              <ChevronRight className="w-[14px] h-[14px] text-gray-700" strokeWidth={2.5} />
              <div className="grow basis-[0%]" />
              {(['월', '주'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`items-center flex font-semibold whitespace-nowrap text-xs tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-full transition-colors ${viewMode === mode ? 'bg-purple-100 border border-[rgb(185,166,255)] text-purple-800' : 'text-gray-500'}`}
                >
                  <span className="block">{mode}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-0 pr-3 pb-0 pl-3">
            <div className="grid-cols-7 grid mb-[6px] gap-1">
              {DOW.map((d, i) => (
                <div key={d} className="font-bold text-center text-gray-600 text-xs" style={{ gridArea: `1 / ${i + 1} / 2 / ${i + 2}` }}>{d}</div>
              ))}
            </div>
            {viewMode === '주' ? <WeekGrid recordDates={recordDates} /> : <MonthGrid recordDates={recordDates} />}
          </div>
          <div className="flex text-gray-500 text-xs gap-2.5 pt-3 pr-5 pb-2 pl-5">
            {Object.entries(dotLabel).map(([color, label]) => (
              <div key={color} className="items-center flex gap-1">
                <div className={`w-2 h-2 ${dotColorClass[color as DotColor]} rounded-full`} />
                {label}
              </div>
            ))}
          </div>
          <div className="h-px mx-4 bg-purple-50" />
        </div>
        <div className="grow min-h-0 overflow-y-auto overscroll-contain px-4 pt-3 pb-[100px]">
          <div className="font-bold mb-2 text-gray-900">최근 기록</div>
          {error ? <div className="text-red-500 text-xs mb-2">{error}</div> : null}
          {recentDates.map((dateKey) => {
            const d = new Date(dateKey);
            const records: DotColor[] = ['purple'];
            return (
              <div key={dateKey} className="mb-2 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
                <div className="text-xs text-gray-500">{formatMonthDay(d)}</div>
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

function WeekGrid({ recordDates }: { recordDates: Set<string> }) {
  return (
    <div className="grid-cols-7 grid gap-1">
      {WEEK_DAYS.map((day, i) => {
        const isToday = day === TODAY;
        const date = new Date(CURRENT_YEAR, CURRENT_MONTH, day);
        const records: DotColor[] = recordDates.has(toDateKey(date)) ? ['purple'] : [];
        return <DayCell key={day} day={day} records={records} isToday={isToday} style={{ gridArea: `1 / ${i + 1} / 2 / ${i + 2}` }} />;
      })}
    </div>
  );
}

function MonthGrid({ recordDates }: { recordDates: Set<string> }) {
  return (
    <div className="grid-cols-7 grid gap-1">
      {[1, 2, 3, 4, 5, 6].flatMap((row) =>
        [1, 2, 3, 4, 5, 6, 7].map((col) => {
          const day = getDay(row, col);
          const gridArea = `${row} / ${col} / ${row + 1} / ${col + 1}`;
          if (day === null) return <div key={`empty-${row}-${col}`} className="aspect-square rounded-xl" style={{ gridArea }} />;
          const date = new Date(CURRENT_YEAR, CURRENT_MONTH, day);
          return <DayCell key={day} day={day} records={recordDates.has(toDateKey(date)) ? ['purple'] : []} isToday={day === TODAY} style={{ gridArea }} />;
        })
      )}
    </div>
  );
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function DayCell({ day, isToday, records, style }: { day: number; isToday: boolean; records: DotColor[]; style: React.CSSProperties }) {
  return (
    <div className={`items-center aspect-square flex justify-center relative rounded-xl ${isToday ? 'bg-[rgb(31,27,46)] text-white font-extrabold' : 'font-semibold'}`} style={style}>
      {day}
      {records.length > 0 ? (
        <div className="absolute flex left-[50%] bottom-[3px] translate-x-[-50%] gap-[2px]">
          {records.map((color, i) => <div key={i} className={`w-1 h-1 rounded-full ${isToday ? 'bg-white' : dotColorClass[color]}`} />)}
        </div>
      ) : null}
    </div>
  );
}

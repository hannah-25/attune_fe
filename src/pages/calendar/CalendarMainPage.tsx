import React, { useEffect, useMemo, useState } from 'react';
import { CalendarPlus, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TabBar } from '@/components/TabBar';
import { getScheduleCategories, getSchedules, ScheduleCategory, ScheduleSummary } from '@/api/schedule';

type ViewMode = '월' | '주';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function CalendarMainPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('월');
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [events, setEvents] = useState<ScheduleSummary[]>([]);
  const [categories, setCategories] = useState<ScheduleCategory[]>([]);
  const [error, setError] = useState('');
  const today = new Date();
  const selectedDateKey = toDateKey(selectedDate);

  const visibleEvents = useMemo(
    () => events.filter((event) => event.startTime.startsWith(selectedDateKey)),
    [events, selectedDateKey],
  );

  useEffect(() => {
    let ignore = false;
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    Promise.all([
      getSchedules({ startDate: toDateKey(monthStart), endDate: toDateKey(monthEnd) }),
      getScheduleCategories(),
    ])
      .then(([scheduleResponse, categoryResponse]) => {
        if (ignore) return;
        setEvents(scheduleResponse.schedules);
        setCategories(categoryResponse.categories);
      })
      .catch(() => {
        if (!ignore) setError('일정을 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex h-dvh flex-col min-h-0">
        <div className="items-center flex justify-between pt-2 pr-4 pb-1 pl-4">
          <button type="button" className="items-center flex gap-1 rounded-xl pr-1 transition-all active:scale-[0.97]" aria-label="월 선택">
            <div className="font-extrabold text-2xl" style={{ fontFamily: 'NanumSquare, system-ui' }}>{today.getMonth() + 1}월</div>
            <ChevronDown className="mt-0.5 h-4 w-4 text-gray-500" strokeWidth={2.5} />
          </button>
          <div className="flex gap-1.5">
            {(['월', '주'] as const).map((mode) => {
              const selected = viewMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem] transition-all active:scale-[0.97] ${selected ? 'bg-purple-100 text-purple-800' : 'text-gray-500'}`}
                >
                  <span className="block">{mode}</span>
                </button>
              );
            })}
            <button type="button" onClick={() => navigate('/calendar/new')} className="items-center flex justify-center w-[30px] h-[30px] bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-[0.9375rem]">
              <CalendarPlus className="w-[14px] h-[14px] text-gray-700" strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <div className="pt-3 pr-3 pb-0 pl-3">
          <div className="grid-cols-7 grid mb-[6px] gap-1">
            {WEEKDAYS.map((day, index) => (
              <div key={day} className={`font-bold text-center text-xs ${index === 0 || index === 6 ? 'text-[rgb(185,166,255)]' : 'text-gray-600'}`}>
                {day}
              </div>
            ))}
          </div>
          <CalendarGrid compact={viewMode === '주'} events={events} selectedDate={selectedDate} onSelectDate={setSelectedDate} onDoubleClickDate={(date) => navigate(`/calendar/new?date=${toDateKey(date)}`)} />
        </div>
        <div className="h-px mt-1 ml-[16px] mr-[16px] bg-purple-50 shrink-0"></div>
        <div className="grow min-h-0 overflow-y-auto overscroll-contain px-4 pt-2 pb-[100px]">
          <div className="font-bold mb-2">{selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 · {visibleEvents.length}개 일정</div>
          {error ? <div className="text-red-500 text-xs mb-2">{error}</div> : null}
          {visibleEvents.map((event) => {
            const category = categories.find((item) => item.color === event.color);
            return (
            <button key={event.scheduleId} type="button" onClick={() => navigate(`/calendar/event?id=${event.scheduleId}`)} className="items-center flex w-full text-left mb-2 bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] gap-2.5 p-[10px] rounded-[0.875rem]">
              <div className="self-stretch w-1 rounded-xs" style={{ backgroundColor: event.color || 'rgb(216,180,254)' }}></div>
              <div className="grow basis-[0%]">
                <div className="font-bold">{event.title}</div>
                <div className="mt-[2px] text-gray-600 text-xs">{formatScheduleTime(event)}</div>
              </div>
              <div className="font-bold text-gray-600 text-xs">{category?.categoryName ?? '일정'}</div>
            </button>
          );
          })}
        </div>
        <TabBar active="캘린더" />
      </div>
    </div>
  );
}

function CalendarGrid({
  compact,
  events,
  onDoubleClickDate,
  onSelectDate,
  selectedDate,
}: {
  compact: boolean;
  events: ScheduleSummary[];
  onDoubleClickDate: (date: Date) => void;
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
}) {
  const today = new Date();
  const days = compact
    ? weekDays(selectedDate)
    : Array.from({ length: 35 }, (_, index) => index < firstDayOffset(today) ? null : new Date(today.getFullYear(), today.getMonth(), index - firstDayOffset(today) + 1));

  return (
    <div className="grid-cols-7 grid gap-1">
      {days.map((day, index) => {
        const isSelected = day !== null && toDateKey(day) === toDateKey(selectedDate);
        const hasEvent = day !== null && events.some((event) => event.startTime.startsWith(toDateKey(day)));
        return (
          <button type="button" key={`${day?.toISOString() ?? 'empty'}-${index}`} disabled={day === null} onClick={() => day && onSelectDate(day)} onDoubleClick={() => day && onDoubleClickDate(day)} className={`relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg ${day === null ? 'opacity-[0.35]' : ''} ${isSelected ? 'bg-[rgb(31,27,46)]' : ''}`}>
            <div className={`font-${isSelected ? 'extrabold' : 'semibold'} text-center ${isSelected ? 'text-white' : ''}`}>{day?.getDate() ?? ''}</div>
            {hasEvent ? (
              <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                <div className={`text-center w-1 h-1 ${isSelected ? 'bg-white' : 'bg-purple-300'} rounded-xs`} />
                {isSelected ? <div className="text-center w-1 h-1 bg-white rounded-xs" /> : null}
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function firstDayOffset(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

function weekDays(date: Date) {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  return Array.from({ length: 7 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index));
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function formatScheduleTime(event: ScheduleSummary) {
  return `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`;
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(11, 16);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

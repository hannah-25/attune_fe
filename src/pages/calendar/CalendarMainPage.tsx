import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TabBar } from '@/components/TabBar';
import { getScheduleCategories, getSchedules, ScheduleCategory, ScheduleSummary } from '@/api/schedule';

type ViewMode = 'month' | 'week';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function CalendarMainPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [events, setEvents] = useState<ScheduleSummary[]>([]);
  const [categories, setCategories] = useState<ScheduleCategory[]>([]);
  const [error, setError] = useState('');
  const addMenuRef = useRef<HTMLDivElement | null>(null);
  const selectedDateKey = toDateKey(selectedDate);

  const [rangeStartDate, rangeEndDate] = useMemo(() => {
    if (viewMode === 'week') {
      const days = weekDays(selectedDate);
      return [toDateKey(days[0]), toDateKey(days[6])] as const;
    }

    const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    return [toDateKey(monthStart), toDateKey(monthEnd)] as const;
  }, [selectedDate, viewMode]);

  const visibleEvents = useMemo(
    () => [...events].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()),
    [events],
  );

  const groupedEvents = useMemo(() => {
    const groups = new Map<string, ScheduleSummary[]>();

    visibleEvents.forEach((event) => {
      const dateKey = toDateKeyFromDateTime(event.startTime);
      const current = groups.get(dateKey);
      if (current) {
        current.push(event);
        return;
      }
      groups.set(dateKey, [event]);
    });

    return Array.from(groups.entries()).map(([dateKey, items]) => ({ dateKey, items }));
  }, [visibleEvents]);

  const listTitle = useMemo(() => {
    if (viewMode === 'month') {
      return `${selectedDate.getMonth() + 1}월 전체`;
    }
    return `${formatDateLabel(rangeStartDate)} ~ ${formatDateLabel(rangeEndDate)}`;
  }, [rangeEndDate, rangeStartDate, selectedDate, viewMode]);

  useEffect(() => {
    let ignore = false;

    getSchedules({ startDate: rangeStartDate, endDate: rangeEndDate })
      .then((scheduleResponse) => {
        if (ignore) return;
        setEvents(scheduleResponse.schedules);
        setError('');
      })
      .catch(() => {
        if (!ignore) setError('일정을 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, [rangeEndDate, rangeStartDate]);

  useEffect(() => {
    let ignore = false;

    getScheduleCategories()
      .then((categoryResponse) => {
        if (ignore) return;
        setCategories(categoryResponse.categories);
      })
      .catch(() => {
        if (!ignore) setCategories([]);
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!addMenuOpen) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        setAddMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [addMenuOpen]);

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="relative flex h-dvh flex-col min-h-0">
        <div className="items-center flex justify-between pt-2 pr-4 pb-1 pl-4">
          <div className="items-center flex gap-1 rounded-xl pr-1">
            <div className="font-extrabold text-2xl" style={{ fontFamily: 'NanumSquare, system-ui' }}>{selectedDate.getMonth() + 1}월</div>
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}
              aria-pressed={viewMode === 'week'}
              className="items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem] transition-all active:scale-[0.97] bg-purple-100 text-purple-800"
            >
              <span className="block">{viewMode === 'month' ? '주간 보기' : '월간 보기'}</span>
            </button>
          </div>
        </div>
        <div className="pt-5 pr-3 pb-0 pl-3">
          <div className="grid-cols-7 grid mb-[6px] gap-1">
            {WEEKDAYS.map((day, index) => (
              <div key={day} className={`font-bold text-center text-xs ${index === 0 || index === 6 ? 'text-[rgb(185,166,255)]' : 'text-gray-600'}`}>
                {day}
              </div>
            ))}
          </div>
          <CalendarGrid
            compact={viewMode === 'week'}
            events={events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onDoubleClickDate={(date) => navigate(`/calendar/new?date=${toDateKey(date)}`)}
          />
        </div>
        <div className="h-px mt-1 ml-[16px] mr-[16px] bg-purple-50 shrink-0"></div>
        <div className="grow min-h-0 overflow-y-auto overscroll-contain px-4 pt-2 pb-[100px]">
          <div className="font-bold mb-2">{listTitle} · {visibleEvents.length}개 일정</div>
          {error ? <div className="text-red-500 text-xs mb-2">{error}</div> : null}
          {groupedEvents.map((group) => (
            <div key={group.dateKey} className="mb-3">
              <div className="text-xs font-bold text-gray-500 px-1 mb-1.5">
                {formatGroupDateLabel(group.dateKey)}
              </div>
              {group.items.map((event) => {
                const category = categories.find((item) => item.categoryId === event.categoryId);
                return (
                  <button
                    key={event.scheduleId}
                    type="button"
                    onClick={() => navigate(`/calendar/event?id=${event.scheduleId}`)}
                    className="items-center flex w-full text-left mb-2 bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] gap-2.5 p-[10px] rounded-[0.875rem]"
                  >
                    <div className="self-stretch w-1 bg-purple-300 rounded-xs" style={category?.color ? { backgroundColor: category.color } : undefined}></div>
                    <div className="grow basis-[0%]">
                      <div className="font-bold">{event.title}</div>
                      <div className="mt-[2px] text-gray-600 text-xs">{formatScheduleTime(event)}</div>
                    </div>
                    <div className="font-bold text-gray-600 text-xs">{category?.categoryName ?? '일정'}</div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="absolute right-4 z-20" style={{ bottom: 'calc(84px + env(safe-area-inset-bottom))' }}>
          <div ref={addMenuRef} className="relative">
            {addMenuOpen ? (
              <div role="menu" className="absolute right-0 bottom-[58px] z-20 min-w-[120px] bg-white border border-gray-200 shadow-[rgba(0,0,0,0.12)_0px_8px_20px_0px] rounded-xl p-1">
                <button
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    setAddMenuOpen(false);
                    navigate(`/calendar/new?date=${selectedDateKey}`);
                  }}
                  className="w-full text-left text-xs font-semibold text-gray-700 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  일정 추가
                </button>
                <button
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    setAddMenuOpen(false);
                    navigate(`/calendar/new-todo?date=${selectedDateKey}`);
                  }}
                  className="w-full text-left text-xs font-semibold text-purple-700 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  할일 추가
                </button>
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => setAddMenuOpen((open) => !open)}
              aria-expanded={addMenuOpen}
              aria-haspopup="menu"
              className="items-center flex justify-center w-12 h-12 bg-purple-500 text-white shadow-[rgba(122,86,255,0.32)_0px_8px_20px_0px] rounded-full transition-all active:scale-[0.97]"
              aria-label="추가 메뉴 열기"
            >
              <Plus className="w-5 h-5" strokeWidth={2.8} />
            </button>
          </div>
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
  const days = compact
    ? weekDays(selectedDate)
    : monthDays(selectedDate);

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

function monthDays(date: Date) {
  const offset = firstDayOffset(date);
  const dayCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const totalSlots = Math.ceil((offset + dayCount) / 7) * 7;

  return Array.from({ length: totalSlots }, (_, index) => {
    if (index < offset || index >= offset + dayCount) return null;
    return new Date(date.getFullYear(), date.getMonth(), index - offset + 1);
  });
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

function toDateKeyFromDateTime(value: string) {
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value.slice(0, 10);
  }
  return toDateKey(parsed);
}

function formatDateLabel(dateKey: string) {
  const [year, month, day] = dateKey.split('-');
  return `${year}.${month}.${day}`;
}

function formatGroupDateLabel(dateKey: string) {
  const [yearText, monthText, dayText] = dateKey.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return dateKey;
  }

  const date = new Date(year, month - 1, day);
  const weekday = WEEKDAYS[date.getDay()] ?? '';
  return `${month}월 ${day}일 (${weekday})`;
}

function formatScheduleTime(event: ScheduleSummary) {
  if (event.isAllDay) return '종일';
  return `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`;
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(11, 16);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

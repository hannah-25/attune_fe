import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarDays, CheckSquare, CheckCircle2, ChevronDown, ChevronUp, Circle, Plus, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TabBar } from '@/components/TabBar';
import { getScheduleCategories, ScheduleCategory } from '@/api/schedule';
import { getTodosByDate, TodoItem, updateTodo } from '@/api/todo';
import { CalendarEvent, getCalendarEvents } from '@/api/calendarEvents';
import { getCalendarConnections, syncCalendarConnection } from '@/api/calendarConnection';

type ViewMode = 'month' | 'week';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const TODO_LONG_PRESS_MS = 450;

export default function CalendarMainPage() {
  const navigate = useNavigate();
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTriggeredRef = useRef(false);
  const touchPressActiveRef = useRef(false);
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [dateMenuDate, setDateMenuDate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [categories, setCategories] = useState<ScheduleCategory[]>([]);
  const [error, setError] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [todoError, setTodoError] = useState('');
  const [todosOpen, setTodosOpen] = useState(true);
  const [eventsOpen, setEventsOpen] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [hasConnection, setHasConnection] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
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
    const groups = new Map<string, CalendarEvent[]>();

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
    return () => {
      if (longPressTimerRef.current !== null) {
        window.clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    getCalendarEvents({ startDate: rangeStartDate, endDate: rangeEndDate })
      .then((calendarResponse) => {
        if (ignore) return;
        setEvents(calendarResponse.events);
        setError('');
      })
      .catch(() => {
        if (!ignore) setError('일정을 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, [rangeEndDate, rangeStartDate, refreshTrigger]);

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
    let ignore = false;

    getTodosByDate(selectedDateKey)
      .then((response) => {
        if (ignore) return;
        setTodos(response.todos);
        setTodoError('');
      })
      .catch(() => {
        if (!ignore) setTodoError('할일을 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, [selectedDateKey]);

  useEffect(() => {
    let ignore = false;

    getCalendarConnections()
      .then(({ connections }) => {
        if (!ignore) setHasConnection(connections.some((c) => c.active));
      })
      .catch(() => {});

    return () => {
      ignore = true;
    };
  }, []);

  const handleSync = async () => {
    if (syncing) return;

    setSyncing(true);
    setError('');
    try {
      const { connections } = await getCalendarConnections();
      const active = connections.filter((c) => c.active);
      const results = await Promise.allSettled(active.map((c) => syncCalendarConnection(c.connectionId)));
      const rejectedResults = results.filter((r) => r.status === 'rejected');
      if (rejectedResults.length > 0) {
        setError('일부 캘린더 동기화에 실패했어요.');
        console.error('Failed calendar syncs:', rejectedResults);
      }
      setRefreshTrigger((prev) => prev + 1);
    } catch {
      setError('동기화에 실패했어요.');
    } finally {
      setSyncing(false);
    }
  };

  const handleToggleTodo = async (todo: TodoItem) => {
    const nextCompleted = !todo.isCompleted;
    setTodos((current) =>
      current.map((t) => (t.todoId === todo.todoId ? { ...t, isCompleted: nextCompleted } : t)),
    );
    try {
      await updateTodo(todo.todoId, { isCompleted: nextCompleted });
    } catch {
      setTodos((current) =>
        current.map((t) => (t.todoId === todo.todoId ? { ...t, isCompleted: !nextCompleted } : t)),
      );
    }
  };

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current === null) return;
    window.clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;
  };

  const startTodoLongPress = (todoId: number) => {
    clearLongPressTimer();
    longPressTriggeredRef.current = false;
    longPressTimerRef.current = window.setTimeout(() => {
      longPressTriggeredRef.current = true;
      navigate(`/calendar/new-todo?id=${todoId}`);
    }, TODO_LONG_PRESS_MS);
  };

  const handleTodoPressEnd = () => {
    clearLongPressTimer();
  };

  const startTodoTouchPress = (todoId: number) => {
    touchPressActiveRef.current = true;
    startTodoLongPress(todoId);
  };

  const endTodoTouchPress = () => {
    handleTodoPressEnd();
    window.setTimeout(() => {
      touchPressActiveRef.current = false;
    }, 0);
  };

  const startTodoMousePress = (todoId: number) => {
    if (touchPressActiveRef.current) return;
    startTodoLongPress(todoId);
  };

  const handleTodoClick = (todo: TodoItem) => {
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      return;
    }

    void handleToggleTodo(todo);
  };

  const handleEventClick = (event: CalendarEvent) => {
    if (event.source === 'EXTERNAL') {
      navigate('/calendar/event', { state: { externalEvent: event } });
      return;
    }
    if (event.scheduleId) {
      navigate(`/calendar/event?id=${event.scheduleId}`);
    }
  };

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="relative flex h-full flex-col min-h-0">
        <div className="flex items-center justify-between pt-2 pr-3 pb-3 pl-4 shrink-0">
          <div className="flex flex-col gap-2">
            <div className="font-extrabold text-2xl" style={{ fontFamily: 'NanumSquare, system-ui' }}>{selectedDate.getMonth() + 1}월</div>
            <div className="flex bg-gray-100 p-[3px] rounded-xl gap-[2px]">
              <button
                type="button"
                onClick={() => setViewMode('month')}
                className={`text-xs font-bold px-4 py-1.5 rounded-[0.625rem] transition-all ${viewMode === 'month' ? 'bg-white shadow-[rgba(60,40,90,0.08)_0px_1px_3px_0px] text-gray-800' : 'text-gray-500'}`}
              >
                월간
              </button>
              <button
                type="button"
                onClick={() => setViewMode('week')}
                className={`text-xs font-bold px-4 py-1.5 rounded-[0.625rem] transition-all ${viewMode === 'week' ? 'bg-white shadow-[rgba(60,40,90,0.08)_0px_1px_3px_0px] text-gray-800' : 'text-gray-500'}`}
              >
                주간
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasConnection ? (
              <button
                type="button"
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center justify-center w-9 h-9 bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_4px_0px] rounded-[1.125rem] disabled:opacity-45"
                aria-label="캘린더 동기화"
              >
                <RefreshCw className={`h-4 w-4 text-gray-600 ${syncing ? 'animate-spin' : ''}`} strokeWidth={2.25} />
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setDateMenuDate(selectedDateKey)}
              className="flex items-center justify-center w-9 h-9 bg-purple-100 rounded-[1.125rem]"
            >
              <Plus className="h-4 w-4 text-purple-600" strokeWidth={3} />
            </button>
          </div>
        </div>
        <div className="pr-3 pb-0 pl-3">
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
            onDoubleClickDate={(date) => { setSelectedDate(date); setDateMenuDate(toDateKey(date)); }}
          />
        </div>
        <div className="h-px mt-1 ml-[16px] mr-[16px] bg-purple-50 shrink-0" />
        {dateMenuDate ? (
          <div
            className="fixed inset-0 z-30 flex flex-col justify-end bg-black/30"
            style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
            onClick={() => setDateMenuDate(null)}
          >
            <div
              className="bg-gray-50 rounded-t-[2rem] p-5 pb-8 flex flex-col gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs font-bold text-gray-400 text-center mb-1">{formatGroupDateLabel(dateMenuDate)}</div>
              <button
                type="button"
                onClick={() => { navigate(`/calendar/new?date=${dateMenuDate}`); setDateMenuDate(null); }}
                className="flex items-center gap-4 w-full bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] rounded-2xl p-5 text-left transition-all active:scale-[0.98]"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl flex-shrink-0">
                  <CalendarDays className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-extrabold text-base text-gray-900" style={{ fontFamily: 'NanumSquare, system-ui' }}>일정 추가</div>
                  <div className="text-xs text-gray-500 mt-0.5">시간과 날짜가 있는 약속·이벤트</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => { navigate(`/calendar/new-todo?date=${dateMenuDate}`); setDateMenuDate(null); }}
                className="flex items-center gap-4 w-full bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] rounded-2xl p-5 text-left transition-all active:scale-[0.98]"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl flex-shrink-0">
                  <CheckSquare className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-extrabold text-base text-gray-900" style={{ fontFamily: 'NanumSquare, system-ui' }}>할일 추가</div>
                  <div className="text-xs text-gray-500 mt-0.5">완료 체크가 필요한 할 일</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDateMenuDate(null)}
                className="w-full font-bold text-gray-500 text-sm py-3 rounded-2xl bg-white border border-gray-100 transition-all active:scale-[0.98]"
              >
                취소
              </button>
            </div>
          </div>
        ) : null}
        <div className="grow min-h-0 overflow-y-auto overscroll-contain px-4 pt-2 pb-[100px]">
          <button
            type="button"
            onClick={() => setTodosOpen((open) => !open)}
            className="items-center flex w-full text-left pt-1 pb-2 gap-1"
          >
            <div className="font-bold text-gray-600 grow">
              할일 · {todos.length}개
            </div>
            {todosOpen
              ? <ChevronUp className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
              : <ChevronDown className="w-4 h-4 text-gray-400" strokeWidth={2.5} />}
          </button>
          {todosOpen ? (
            <div className="mb-3">
              {todoError ? <div className="text-red-500 text-xs mb-2">{todoError}</div> : null}
              {todos.length === 0 ? (
                <div className="text-gray-400 text-xs px-1 py-1">할일이 없어요</div>
              ) : todos.map((todo) => (
                <div
                  key={todo.todoId}
                  role="button"
                  tabIndex={0}
                  onMouseDown={() => startTodoMousePress(todo.todoId)}
                  onMouseUp={handleTodoPressEnd}
                  onMouseLeave={handleTodoPressEnd}
                  onTouchStart={() => startTodoTouchPress(todo.todoId)}
                  onTouchMove={handleTodoPressEnd}
                  onTouchEnd={endTodoTouchPress}
                  onTouchCancel={endTodoTouchPress}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    navigate(`/calendar/new-todo?id=${todo.todoId}`);
                  }}
                  onClick={() => handleTodoClick(todo)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      void handleToggleTodo(todo);
                    }
                  }}
                  className="items-center flex w-full text-left mb-2 bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] gap-2.5 p-[10px] rounded-[0.875rem] select-none"
                >
                  {todo.isCompleted
                    ? <CheckCircle2 className="w-[18px] h-[18px] text-purple-400 flex-shrink-0" strokeWidth={2.2} />
                    : <Circle className="w-[18px] h-[18px] text-gray-300 flex-shrink-0" strokeWidth={2.2} />}
                  <div className={`font-bold grow basis-[0%] ${todo.isCompleted ? 'line-through text-gray-400' : ''}`}>
                    {todo.text}
                  </div>
                  {!todo.isAllDay ? (
                    <div className="font-bold text-gray-500 text-xs flex-shrink-0">{formatTime(todo.dueAt)}</div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setEventsOpen((open) => !open)}
            className="items-center flex w-full text-left pt-1 pb-2 gap-1"
          >
            <div className="font-bold text-gray-600 grow">{listTitle} · {visibleEvents.length}개 일정</div>
            {eventsOpen
              ? <ChevronUp className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
              : <ChevronDown className="w-4 h-4 text-gray-400" strokeWidth={2.5} />}
          </button>
          {eventsOpen ? (
            <>
              {error ? <div className="text-red-500 text-xs mb-2">{error}</div> : null}
              {groupedEvents.map((group) => (
                <div key={group.dateKey} className="mb-3">
                  <div className="text-xs font-bold text-gray-500 px-1 mb-1.5">
                    {formatGroupDateLabel(group.dateKey)}
                  </div>
                  {group.items.map((event) => {
                    const category = event.categoryId
                      ? categories.find((item) => item.categoryId === event.categoryId)
                      : null;
                    const color = event.color ?? category?.color;
                    const label = event.source === 'EXTERNAL' ? 'Google' : (category?.categoryName ?? '일정');
                    return (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => handleEventClick(event)}
                        className={`items-center flex w-full text-left mb-2 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] gap-2.5 p-[10px] rounded-[0.875rem] ${
                          event.source === 'EXTERNAL' ? 'bg-white border border-gray-100' : 'bg-purple-100'
                        }`}
                      >
                        <div className="self-stretch w-1 bg-purple-300 rounded-xs" style={color ? { backgroundColor: color } : undefined} />
                        <div className="grow basis-[0%]">
                          <div className="font-bold">{event.title}</div>
                          <div className="mt-[2px] text-gray-600 text-xs">{formatScheduleTime(event)}</div>
                        </div>
                        <div className="font-bold text-gray-600 text-xs">{label}</div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </>
          ) : null}
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
  events: CalendarEvent[];
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
            <div className={`font-${isSelected ? 'extrabold' : 'semibold'} text-center ${isSelected ? 'text-white' : (day?.getDay() === 0 || day?.getDay() === 6) ? 'text-[rgb(185,166,255)]' : ''}`}>{day?.getDate() ?? ''}</div>
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

function formatScheduleTime(event: CalendarEvent) {
  if (event.isAllDay) return '종일';
  return `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`;
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(11, 16);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

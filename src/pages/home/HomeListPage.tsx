import React, { useEffect, useState } from 'react';
import { ArrowRight, Bell, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router';
import logoImage from '@src/assets/logo.png';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { getOnboardingStatus, type OnboardingResumeStep } from '@/api/onboarding';
import { getTodosByDate, updateTodo } from '@/api/todo';
import { getSchedules, type ScheduleSummary } from '@/api/schedule';
import { mockWeeklyStats, mockInsight } from '@/mocks/home.mock';
import HomeMedicationSection from './HomeMedicationSection';

type HomeTodo = {
  id: number;
  text: string;
  done: boolean;
  dueAt: string;
  isAllDay: boolean;
};

type HomeScheduleItem = Pick<ScheduleSummary, 'scheduleId' | 'title' | 'startTime' | 'endTime' | 'isAllDay'> & {
  color?: string;
};

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const DEFAULT_ONBOARDING_STEP: OnboardingResumeStep = 2;

export default function HomeListPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<HomeTodo[]>([]);
  const [scheduleItems, setScheduleItems] = useState<HomeScheduleItem[]>([]);
  const [resumeStep, setResumeStep] = useState<OnboardingResumeStep | null>(null);
  const [todoError, setTodoError] = useState('');
  const [updatingTodoIds, setUpdatingTodoIds] = useState<number[]>([]);

  useEffect(() => {
    let ignore = false;

    getOnboardingStatus()
      .then((status) => {
        if (ignore) return;
        if (status.onboarded || status.skipped) {
          setResumeStep(null);
          return;
        }

        setResumeStep(status.resumeStep ?? DEFAULT_ONBOARDING_STEP);
      })
      .catch(() => {
        if (!ignore) {
          setResumeStep(null);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const today = new Date();
    const startDate = toDateKey(today);
    const endDate = toDateKey(addDays(today, 6));

    getTodosByDate(startDate)
      .then((response) => {
        if (ignore) return;
        const nextTodos = response.todos
          .map((item) => ({
            id: item.todoId,
            text: item.text,
            done: item.isCompleted,
            dueAt: item.dueAt,
            isAllDay: item.isAllDay,
          }))
          .sort((a, b) => toTimestamp(a.dueAt) - toTimestamp(b.dueAt));
        setTodos(nextTodos);
      })
      .catch(() => {
        if (!ignore) setTodos([]);
      });

    getSchedules({ startDate, endDate })
      .then((response) => {
        if (ignore) return;
        const nextSchedules = response.schedules
          .map((item) => ({
            scheduleId: item.scheduleId,
            title: item.title,
            startTime: item.startTime,
            endTime: item.endTime,
            isAllDay: item.isAllDay,
            color: (item as { color?: string }).color,
          }))
          .sort((a, b) => toTimestamp(a.startTime) - toTimestamp(b.startTime));
        setScheduleItems(nextSchedules);
      })
      .catch(() => {
        if (!ignore) setScheduleItems([]);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const toggleTodo = async (id: number) => {
    if (updatingTodoIds.includes(id)) return;
    const previousTodo = todos.find((todo) => todo.id === id);
    if (!previousTodo) return;
    const nextDone = !previousTodo.done;

    setTodoError('');
    setUpdatingTodoIds((current) => [...current, id]);
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, done: nextDone } : todo))
    );

    try {
      const response = await updateTodo(id, { isCompleted: nextDone });
      const resolvedDone = typeof response?.isCompleted === 'boolean' ? response.isCompleted : nextDone;
      setTodos((current) =>
        current.map((todo) => (todo.id === id ? { ...todo, done: resolvedDone } : todo))
      );
    } catch {
      setTodos((current) =>
        current.map((todo) => (todo.id === id ? { ...todo, done: previousTodo.done } : todo))
      );
      setTodoError('할일 상태를 변경하지 못했습니다.');
    } finally {
      setUpdatingTodoIds((current) => current.filter((todoId) => todoId !== id));
    }
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="relative items-center flex pt-2 pr-5 pb-2 pl-5 min-h-[52px]">
          <div className="w-8 h-8 shrink-0">
            <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
          </div>
          <div className="grow basis-[0%]"></div>
          <div className="items-center flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/settings/notifications')}
              className="items-center flex justify-center w-8 h-8 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-full shrink-0 transition-transform active:scale-95"
              aria-label="알림 설정으로 이동"
            >
              <Bell className="h-[15px] w-[15px] text-[rgb(31,27,46)]" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={() => navigate('/settings')}
              className="items-center flex justify-center w-8 h-8 bg-purple-200 rounded-full shrink-0 transition-transform active:scale-95"
              aria-label="마이페이지로 이동"
            >
              <span className="font-bold text-purple-700 text-xs">J</span>
            </button>
          </div>
        </div>
        <ScrollArea className="flex flex-col gap-2 pt-1">
          <div className="items-center flex justify-between px-1">
            <div className="font-semibold text-sm text-gray-800">주간 통계</div>
            <button type="button" onClick={() => navigate('/report')} className="text-xs text-gray-400">전체보기</button>
          </div>
          <div className="flex gap-2">
            <div className="grow bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] basis-[0%] pt-2.5 px-3 pb-2.5 rounded-2xl text-center">
              <div className="text-[10px] text-gray-500 leading-tight">달성률</div>
              <div className="font-bold text-lg mt-0.5 text-gray-900" style={{"fontFamily":"NanumSquare, system-ui"}}>{mockWeeklyStats.goalAchievement}</div>
            </div>
            <div className="grow bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] basis-[0%] pt-2.5 px-3 pb-2.5 rounded-2xl text-center">
              <div className="text-[10px] text-gray-500 leading-tight">복약률</div>
              <div className="font-bold text-lg mt-0.5 text-gray-900" style={{"fontFamily":"NanumSquare, system-ui"}}>{mockWeeklyStats.adherence}</div>
            </div>
            <div className="grow bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] basis-[0%] pt-2.5 px-3 pb-2.5 rounded-2xl text-center">
              <div className="text-[10px] text-gray-500 leading-tight">일지 작성</div>
              <div className="font-bold text-lg mt-0.5 text-gray-900" style={{"fontFamily":"NanumSquare, system-ui"}}>
                {todos.filter((t) => t.done).length}/{todos.length}
              </div>
            </div>
          </div>
          {resumeStep !== null ? (
            <button
              type="button"
              onClick={() => navigate(`/onboarding/${resumeStep}`)}
              className="items-center flex gap-3 bg-red-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] px-4 py-3 rounded-2xl w-full text-left"
            >
              <div className="items-center flex justify-center w-9 h-9 bg-red-200 shrink-0 rounded-xl">
                <ClipboardList className="h-5 w-5 text-red-700" strokeWidth={2} />
              </div>
              <div className="grow">
                <div className="font-semibold text-sm text-gray-800">{'온보딩 시작하기'}</div>
                <div className="text-[11px] text-red-700 mt-0.5">{'증상 서술 · ASRS 체크 · 목표 설정'}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-red-400 shrink-0" strokeWidth={2.5} />
            </button>
          ) : null}
          <div className="px-1 mt-3">
            <div className="font-semibold text-sm text-gray-800">오늘 할일</div>
          </div>
          {todoError ? <div className="text-red-500 text-xs px-1">{todoError}</div> : null}
          <HomeMedicationSection />
          <button
            type="button"
            onClick={() => navigate('/journal')}
            className="items-center flex justify-between bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] px-4 py-3 rounded-2xl w-full text-left"
          >
            <div>
              <div className="font-semibold text-sm text-gray-800">오늘 일지 작성하기</div>
              <div className="text-[11px] text-purple-600 mt-0.5">감정 · 증상 · 수면 · 목표</div>
            </div>
            <div className="items-center flex justify-center w-8 h-8 bg-purple-200 shrink-0 rounded-full">
              <svg className="w-[15px] h-[15px] text-purple-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
          </button>
          <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] p-3 rounded-2xl">
            {todos.length > 0 ? (
              <div className="flex flex-col gap-2">
                {todos.map((todo) => (
                  <button
                    key={todo.id}
                    type="button"
                    onClick={() => toggleTodo(todo.id)}
                    disabled={updatingTodoIds.includes(todo.id)}
                    className="items-center flex gap-2 text-left w-full disabled:opacity-60"
                  >
                    <div
                      className={`items-center flex justify-center w-4 h-4 shrink-0 rounded-full transition-colors ${
                        todo.done ? 'bg-purple-300' : 'border border-gray-300'
                      }`}
                    >
                      {todo.done && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 13l4 4L19 7"/>
                        </svg>
                      )}
                    </div>
                    <div className={`text-xs transition-colors ${todo.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {todo.text}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <EmptyActionCard
                description="오늘 등록된 할일이 없어요."
                actionLabel="할일 추가하기"
                onClick={() => navigate(`/calendar/new-todo?date=${toDateKey(new Date())}`)}
              />
            )}
          </div>
          <div className="items-center flex justify-between px-1 mt-3">
            <div className="font-semibold text-sm text-gray-800">예정 일정</div>
            <button type="button" onClick={() => navigate('/calendar')} className="text-xs text-gray-400">전체보기</button>
          </div>
          <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] px-3 py-2 rounded-2xl flex flex-col">
            {scheduleItems.length > 0 ? (
              scheduleItems.map((item, index) => {
                const label = formatRelativeDateLabel(item.startTime);
                const timeText = item.isAllDay ? '종일' : formatTime(item.startTime);
                const isToday = label === '오늘';

                return (
                  <div key={item.scheduleId} className={`items-center flex gap-3 py-2 ${index > 0 ? 'border-t border-gray-100' : ''}`}>
                    <div className={`font-medium text-[11px] w-[34px] shrink-0 ${isToday ? 'text-purple-500' : 'text-gray-400'}`}>{label}</div>
                    <div
                      className={`w-2 h-2 shrink-0 rounded-full ${item.color ? '' : isToday ? 'bg-purple-500' : 'bg-purple-300'}`}
                      style={item.color ? { backgroundColor: item.color } : undefined}
                    />
                    <div className="font-semibold text-xs text-gray-800 grow">{item.title}</div>
                    <div className="text-[10px] text-gray-400 shrink-0">{timeText}</div>
                  </div>
                );
              })
            ) : (
              <EmptyActionCard
                description="예정된 일정이 없어요."
                actionLabel="일정 추가하기"
                onClick={() => navigate('/empty/calendar')}
              />
            )}
          </div>
          <div className="items-center flex justify-between px-1 mt-3">
            <div className="font-semibold text-sm text-gray-800">주간 인사이트</div>
            <button type="button" onClick={() => navigate('/report')} className="text-xs text-gray-400">전체보기</button>
          </div>
          <button
            type="button"
            onClick={() => navigate('/report')}
            className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] px-4 py-3 rounded-[1.375rem] items-center flex gap-3 w-full text-left"
          >
            <div className="items-center flex justify-center w-9 h-9 bg-purple-200 shrink-0 rounded-xl">
              <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
              </svg>
            </div>
            <div className="grow">
              <div className="font-bold text-xs text-gray-900 leading-tight whitespace-nowrap">{mockInsight.title.replace(mockInsight.highlight, '')} <span className="text-purple-600">{mockInsight.highlight}</span></div>
              <div className="text-[10px] text-gray-500 mt-1">{mockInsight.subtitle}</div>
            </div>
            <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </ScrollArea>
        <TabBar active="홈" />
      </div>
    </div>
  );
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function toDateKeyFromDateTime(value: string) {
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return toDateKey(date);
}

function formatRelativeDateLabel(value: string) {
  const dateKey = toDateKeyFromDateTime(value);
  const todayKey = toDateKey(new Date());
  const tomorrowKey = toDateKey(addDays(new Date(), 1));

  if (dateKey === todayKey) return '오늘';
  if (dateKey === tomorrowKey) return '내일';

  if (!dateKey) return '-';
  const [yearText, monthText, dayText] = dateKey.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return '-';
  return WEEK_DAYS[new Date(year, month - 1, day).getDay()] ?? '-';
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(11, 16);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function toTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return Number.POSITIVE_INFINITY;
  return date.getTime();
}

function EmptyActionCard({
  actionLabel,
  description,
  onClick,
}: {
  actionLabel: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-1 py-1 rounded-lg"
    >
      <div>
        <div className="text-xs text-gray-500">{description}</div>
        <div className="items-center flex font-semibold text-xs text-purple-700 gap-0.5 mt-0.5">
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 text-purple-400 shrink-0" strokeWidth={2.5} />
        </div>
      </div>
    </button>
  );
}

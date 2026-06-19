import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Bell,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  CheckSquare2,
  MessageCircle,
  UserRound,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import logoImage from '@src/assets/logo.png';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { getTodosByDate } from '@/api/todo';
import { getSchedules, type ScheduleSummary } from '@/api/schedule';
import { getSummary, type SummaryStats } from '@/api/medicationAnalysis';
import { getMyProfile } from '@/api/user';
import HomeMedicationSection from './HomeMedicationSection';

type HomeTodo = {
  id: number;
  text: string;
  done: boolean;
  dueAt: string;
  isAllDay: boolean;
};

type HomeScheduleItem = Pick<
  ScheduleSummary,
  'scheduleId' | 'title' | 'startTime' | 'endTime' | 'isAllDay'
>;

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function HomeListPage() {
  const navigate = useNavigate();
  const mountedRef = useRef(false);
  const todoRequestIdRef = useRef(0);
  const scheduleRequestIdRef = useRef(0);
  const [todos, setTodos] = useState<HomeTodo[]>([]);
  const [scheduleItems, setScheduleItems] = useState<HomeScheduleItem[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<SummaryStats | null>(null);
  const [profile, setProfile] = useState<{
    nickname: string;
    profileImageUrl: string | null;
  } | null>(null);
  const [todosLoading, setTodosLoading] = useState(true);
  const [todosLoadError, setTodosLoadError] = useState('');
  const [schedulesLoading, setSchedulesLoading] = useState(true);
  const [schedulesLoadError, setSchedulesLoadError] = useState('');
  const [weeklyStatsLoading, setWeeklyStatsLoading] = useState(true);
  const [weeklyStatsLoadError, setWeeklyStatsLoadError] = useState('');

  const loadTodos = useCallback(async () => {
    const requestId = todoRequestIdRef.current + 1;
    todoRequestIdRef.current = requestId;
    setTodosLoading(true);
    setTodosLoadError('');

    try {
      const response = await getTodosByDate(toDateKey(new Date()));
      if (!mountedRef.current || requestId !== todoRequestIdRef.current) return;

      setTodos(
        response.todos
          .map((item) => ({
            id: item.todoId,
            text: item.text,
            done: item.isCompleted,
            dueAt: item.dueAt,
            isAllDay: item.isAllDay,
          }))
          .sort((a, b) => toTimestamp(a.dueAt) - toTimestamp(b.dueAt)),
      );
    } catch (err) {
      console.error('Failed to load todos:', err);
      if (mountedRef.current && requestId === todoRequestIdRef.current) {
        setTodosLoadError('할 일을 불러오지 못했어요.');
      }
    } finally {
      if (mountedRef.current && requestId === todoRequestIdRef.current) {
        setTodosLoading(false);
      }
    }
  }, []);

  const loadSchedules = useCallback(async () => {
    const requestId = scheduleRequestIdRef.current + 1;
    scheduleRequestIdRef.current = requestId;
    setSchedulesLoading(true);
    setSchedulesLoadError('');

    const today = new Date();
    try {
      const response = await getSchedules({
        startDate: toDateKey(today),
        endDate: toDateKey(addDays(today, 6)),
      });
      if (!mountedRef.current || requestId !== scheduleRequestIdRef.current) return;

      setScheduleItems(
        response.schedules
          .map((item) => ({
            scheduleId: item.scheduleId,
            title: item.title,
            startTime: item.startTime,
            endTime: item.endTime,
            isAllDay: item.isAllDay,
          }))
          .sort((a, b) => toTimestamp(a.startTime) - toTimestamp(b.startTime)),
      );
    } catch (err) {
      console.error('Failed to load schedules:', err);
      if (mountedRef.current && requestId === scheduleRequestIdRef.current) {
        setSchedulesLoadError('일정을 불러오지 못했어요.');
      }
    } finally {
      if (mountedRef.current && requestId === scheduleRequestIdRef.current) {
        setSchedulesLoading(false);
      }
    }
  }, []);

  const loadWeeklyStats = useCallback(async () => {
    setWeeklyStatsLoading(true);
    setWeeklyStatsLoadError('');

    const today = new Date();
    try {
      const stats = await getSummary(toDateKey(addDays(today, -6)), toDateKey(today));
      if (!mountedRef.current) return;
      setWeeklyStats(stats);
    } catch (err) {
      console.error('Failed to load weekly stats:', err);
      if (mountedRef.current) {
        setWeeklyStatsLoadError('주간 요약을 불러오지 못했어요.');
      }
    } finally {
      if (mountedRef.current) {
        setWeeklyStatsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    getMyProfile()
      .then(({ nickname, profileImageUrl }) => {
        if (!mountedRef.current) return;
        setProfile({ nickname, profileImageUrl: profileImageUrl ?? null });
      })
      .catch((err) => {
        console.error('Failed to load profile:', err);
      });

    void loadWeeklyStats();
    void loadTodos();
    void loadSchedules();

    return () => {
      mountedRef.current = false;
    };
  }, [loadSchedules, loadTodos, loadWeeklyStats]);

  const hasConsultationSchedule = scheduleItems.some((item) =>
    /(병원|진료|상담|의원)/.test(item.title),
  );
  const completedTodoCount = todos.filter((todo) => todo.done).length;
  const nextSchedule = scheduleItems[0] ?? null;
  const nextIncompleteTodo = todos.find((todo) => !todo.done) ?? null;

  return (
    <div
      className="relative mx-auto flex h-full w-full max-w-[480px] flex-col bg-gray-50 text-sm"
      style={{
        fontFamily:
          "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <header className="flex min-h-[60px] items-center px-4 py-2">
        <img src={logoImage} alt="attune" className="h-8 w-8 object-contain" />
        <div className="grow" />
        <HeaderButton label="알림 설정으로 이동" onClick={() => navigate('/settings/notifications')}>
          <Bell className="h-[18px] w-[18px] text-gray-900" strokeWidth={2.25} />
        </HeaderButton>
        <HeaderButton label="마이페이지로 이동" onClick={() => navigate('/settings')}>
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-purple-200">
            {profile?.profileImageUrl ? (
              <img src={profile.profileImageUrl} alt="" className="h-full w-full object-cover" />
            ) : profile?.nickname.trim() ? (
              <span className="text-xs font-bold text-purple-700">
                {Array.from(profile.nickname.trim())[0]}
              </span>
            ) : (
              <UserRound className="h-4 w-4 text-purple-700" strokeWidth={2.25} />
            )}
          </span>
        </HeaderButton>
      </header>

      <ScrollArea className="flex flex-col gap-4 pt-2">
        <button
          type="button"
          onClick={() => navigate('/journal')}
          className="relative min-h-[108px] w-full overflow-hidden rounded-2xl border border-purple-100 bg-purple-100 p-4 text-left shadow-[rgba(60,40,90,0.08)_0px_5px_18px_0px] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2"
        >
          <span className="block pr-16 text-base font-extrabold text-gray-900">
            오늘 일지 작성하기
          </span>
          <span className="mt-1.5 block pr-16 text-xs font-medium leading-relaxed text-gray-700">
            감정 · 증상 · 수면 · 목표를 기록해 보세요
          </span>
          <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-200 text-purple-700">
            <ClipboardList className="h-5 w-5" strokeWidth={2} />
          </span>
          <ChevronRight className="absolute right-4 top-4 h-4 w-4 text-purple-700" />
        </button>

        <HomeMedicationSection />

        <section>
          <div className="grid grid-cols-2 gap-3">
            <DashboardCard
              title="오늘 일정"
              icon={<CalendarDays className="h-5 w-5" strokeWidth={2} />}
              value={
                schedulesLoading ? '…' : schedulesLoadError ? '–' : `${scheduleItems.length}개`
              }
              detail={
                schedulesLoading
                  ? '불러오는 중'
                  : schedulesLoadError
                    ? '다시 확인해 주세요'
                    : nextSchedule
                      ? `${nextSchedule.isAllDay ? '종일' : formatTime(nextSchedule.startTime)} · ${nextSchedule.title}`
                      : '예정된 일정 없음'
              }
              onClick={() => {
                if (schedulesLoadError) {
                  void loadSchedules();
                  return;
                }
                navigate('/calendar');
              }}
            />
            <DashboardCard
              title="오늘 할 일"
              icon={<CheckSquare2 className="h-5 w-5" strokeWidth={2} />}
              value={todosLoading ? '…' : todosLoadError ? '–' : `${completedTodoCount}/${todos.length}개`}
              detail={
                todosLoading
                  ? '불러오는 중'
                  : todosLoadError
                    ? '다시 확인해 주세요'
                    : nextIncompleteTodo
                      ? `${todos.length - completedTodoCount}개 남음 · ${nextIncompleteTodo.text}`
                      : todos.length > 0
                        ? '오늘 할 일 완료'
                        : '등록된 할 일 없음'
              }
              onClick={() => {
                if (todosLoadError) {
                  void loadTodos();
                  return;
                }
                navigate('/calendar');
              }}
            />
          </div>
          {hasConsultationSchedule ? (
            <button
              type="button"
              onClick={() => navigate('/counseling')}
              className="mt-2 flex min-h-11 w-full items-center gap-2 rounded-xl px-1 text-left text-xs font-semibold text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              다음 진료를 위한 기록 정리하기
              <ChevronRight className="ml-auto h-4 w-4" />
            </button>
          ) : null}
        </section>

        <section>
          <SectionHeader
            title="이번 주"
            action="전체 기록"
            onAction={() => navigate('/report')}
          />
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[rgba(60,40,90,0.08)_0px_5px_18px_0px]">
            {weeklyStatsLoading ? (
              <StatusRow>주간 요약을 불러오고 있어요.</StatusRow>
            ) : weeklyStatsLoadError ? (
              <div className="flex min-h-[56px] items-center justify-between gap-3" role="alert">
                <span className="text-xs text-red-700">{weeklyStatsLoadError}</span>
                <button
                  type="button"
                  onClick={() => void loadWeeklyStats()}
                  className="min-h-11 shrink-0 rounded-lg px-2 text-xs font-semibold text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
                >
                  다시 시도
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 divide-x divide-gray-300">
                <StatItem
                  label="기록률"
                  value={weeklyStats ? `${Math.round(weeklyStats.recordingRate)}%` : '–'}
                />
                <StatItem
                  label="복약"
                  value={
                    weeklyStats
                      ? `${weeklyStats.takenCount}/${weeklyStats.totalScheduled}회`
                      : '–'
                  }
                />
              </div>
            )}
          </div>
        </section>
      </ScrollArea>

      <TabBar active="홈" />
    </div>
  );
}

function HeaderButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full transition-colors active:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2"
      aria-label={label}
    >
      {children}
    </button>
  );
}

function SectionHeader({
  action,
  onAction,
  title,
}: {
  action: string;
  onAction: () => void;
  title: string;
}) {
  return (
    <div className="mb-2 flex items-center justify-between px-1">
      <h2 className="text-sm font-bold text-gray-900">{title}</h2>
      <button
        type="button"
        onClick={onAction}
        className="min-h-11 rounded-lg px-2 text-xs font-semibold text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
      >
        {action}
      </button>
    </div>
  );
}

function DashboardCard({
  detail,
  icon,
  onClick,
  title,
  value,
}: {
  detail: string;
  icon: ReactNode;
  onClick: () => void;
  title: string;
  value: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative min-h-[124px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-[rgba(60,40,90,0.08)_0px_5px_18px_0px] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2"
    >
      <span className="block text-sm font-bold text-gray-900">{title}</span>
      <span className="mt-2 block text-xl font-extrabold text-gray-900">{value}</span>
      <span className="mt-1 block max-w-[75%] truncate text-xs font-medium text-gray-600">
        {detail}
      </span>
      <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
        {icon}
      </span>
    </button>
  );
}

function StatusRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[68px] items-center text-xs font-medium text-gray-600" role="status">
      {children}
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 first:pl-0 last:pr-0">
      <div className="text-xs font-medium text-gray-600">{label}</div>
      <div className="mt-1 text-xl font-extrabold text-gray-900">{value}</div>
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

function toTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return Number.POSITIVE_INFINITY;
  return date.getTime();
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
  return `${WEEK_DAYS[new Date(year, month - 1, day).getDay()] ?? '-'}요일`;
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(11, 16) || '--:--';
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

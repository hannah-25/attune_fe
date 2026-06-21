import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  BarChart2,
  Bell,
  BookOpen,
  Calendar,
  CalendarCheck,
  Check,
  ChevronRight,
  ClipboardList,
  NotebookPen,
  Square,
  UserRound,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import logoImage from '@src/assets/logo.png';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { getTodosByDate } from '@/api/todo';
import { getSchedules, type ScheduleSummary } from '@/api/schedule';
import { getSummary, type SummaryStats } from '@/api/medicationAnalysis';
import { getJournal, getJournals, type JournalDetail } from '@/api/journal';
import { getConsultations, type ConsultationDetail } from '@/api/consultation';
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

type WeeklyJournalStats = {
  recordedDays: number;
  goalAchievementRate: number | null;
};

type PlanItem =
  | (HomeScheduleItem & { kind: 'schedule'; sortKey: number })
  | (HomeTodo & { kind: 'todo'; sortKey: number });


export default function HomeListPage() {
  const navigate = useNavigate();
  const mountedRef = useRef(false);
  const todoRequestIdRef = useRef(0);
  const scheduleRequestIdRef = useRef(0);
  const [todos, setTodos] = useState<HomeTodo[]>([]);
  const [scheduleItems, setScheduleItems] = useState<HomeScheduleItem[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<SummaryStats | null>(null);
  const [weeklyJournalStats, setWeeklyJournalStats] = useState<WeeklyJournalStats | null>(null);
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
  const [todayJournal, setTodayJournal] = useState<JournalDetail | null>(null);
  const [upcomingConsultation, setUpcomingConsultation] = useState<ConsultationDetail | null>(null);
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

  const loadTodayJournal = useCallback(async () => {
    try {
      const result = await getJournal(toDateKey(new Date()));
      if (!mountedRef.current) return;
      setTodayJournal(result ?? null);
    } catch {
      // 실패 시 CTA 유지
    }
  }, []);

  const loadUpcomingConsultation = useCallback(async () => {
    try {
      const today = new Date();
      const result = await getConsultations({
        startDate: toDateKey(today),
        endDate: toDateKey(addDays(today, 90)),
      }) as ConsultationDetail[];
      if (!mountedRef.current) return;
      const next = Array.isArray(result)
        ? [...result].sort(
            (a, b) =>
              new Date(a.consultationDate).getTime() - new Date(b.consultationDate).getTime(),
          )[0] ?? null
        : null;
      setUpcomingConsultation(next);
    } catch {
      // 실패 시 카드 미표시
    }
  }, []);

  const loadWeeklyStats = useCallback(async () => {
    setWeeklyStatsLoading(true);
    setWeeklyStatsLoadError('');
    setWeeklyJournalStats(null);

    const today = new Date();
    try {
      const startDate = toDateKey(addDays(today, -6));
      const endDate = toDateKey(today);
      const [stats, journalsResponse] = await Promise.all([
        getSummary(startDate, endDate),
        getJournals({ startDate, endDate }),
      ]);
      const journals = Array.isArray(journalsResponse?.journals) ? journalsResponse.journals : [];
      let recordedDays = 0;
      let goalScoreTotal = 0;
      let goalScoreMaximum = 0;

      journals.forEach((entry) => {
        if (!entry.checked) return;
        recordedDays += 1;
        const goals = entry.checked.goals ?? [];
        const checkedScores = new Map(goals.map((goal) => [goal.goalId, goal.score]));
        const activeGoals = entry.activeTags?.goals ?? [];
        activeGoals.forEach((goal) => {
          goalScoreTotal += checkedScores.get(goal.goalId) ?? 0;
          goalScoreMaximum += 10;
        });
      });

      if (!mountedRef.current) return;
      setWeeklyStats(stats);
      setWeeklyJournalStats({
        recordedDays,
        goalAchievementRate:
          goalScoreMaximum > 0 ? Math.round((goalScoreTotal / goalScoreMaximum) * 100) : null,
      });
    } catch (err) {
      console.error('Failed to load weekly stats:', err);
      if (mountedRef.current) {
        setWeeklyStatsLoadError('주간 요약을 불러오지 못했어요.');
        setWeeklyJournalStats(null);
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
    void loadTodayJournal();
    void loadUpcomingConsultation();

    return () => {
      mountedRef.current = false;
    };
  }, [loadSchedules, loadTodos, loadWeeklyStats, loadTodayJournal, loadUpcomingConsultation]);

  const upcomingConsultationDday =
    upcomingConsultation !== null ? calcDday(upcomingConsultation.consultationDate) : null;
  const consultationDday =
    upcomingConsultationDday !== null
    && upcomingConsultationDday >= 0
    && upcomingConsultationDday <= 7
      ? upcomingConsultationDday
      : null;

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

      <ScrollArea className="flex flex-col gap-6 pt-4">
        <button
          type="button"
          onClick={() => navigate('/journal')}
          className="relative min-h-[108px] w-full overflow-hidden rounded-[1.75rem] bg-purple-100 p-4 text-left shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2"
        >
          <span
            className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-purple-200/65"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-4 right-4 flex h-8 w-8 rotate-6 items-center justify-center rounded-[0.75rem] bg-purple-200 text-purple-700"
            aria-hidden="true"
          >
            <NotebookPen className="h-4 w-4" strokeWidth={1.8} />
          </span>
          {todayJournal ? (() => {
            const { percent, isComplete } = calcJournalCompletion(todayJournal);
            const checked = todayJournal.checked;
            const contentPreview = (
              <div className="mt-2 space-y-1.5">
                {checked?.sleep ? (
                  <p className="text-xs text-gray-700">
                    수면 {checked.sleep.sleepHour}h · {sleepQualityLabel(checked.sleep.sleepQuality)}
                  </p>
                ) : null}
                {checked?.meal ? (() => {
                  const { ateBreakfast, ateLunch, ateDinner } = checked.meal;
                  const eaten = [ateBreakfast && '아침', ateLunch && '점심', ateDinner && '저녁'].filter(Boolean) as string[];
                  return eaten.length > 0 ? (
                    <p className="text-xs text-gray-700">{eaten.join(' · ')}</p>
                  ) : null;
                })() : null}
                {(() => {
                  const tags = [
                    ...(checked?.conditions?.map((t) => t.condition) ?? []),
                    ...(checked?.sideEffects?.map((t) => t.sideEffect) ?? []),
                    ...(checked?.troubles?.map((t) => t.trouble) ?? []),
                  ];
                  return tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="rounded-full bg-purple-200/70 px-2 py-0.5 text-[10px] font-semibold text-purple-800">
                          {tag}
                        </span>
                      ))}
                      {tags.length > 3 ? (
                        <span className="self-center text-[10px] font-medium text-purple-700/60">+{tags.length - 3}</span>
                      ) : null}
                    </div>
                  ) : null;
                })()}
              </div>
            );

            if (isComplete) {
              return (
                <div className="relative z-[1] pr-12">
                  <div className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-purple-700" strokeWidth={2.5} />
                    <span className="text-sm font-extrabold text-gray-900">오늘 일지 작성 완료</span>
                  </div>
                  {contentPreview}
                </div>
              );
            }
            return (
              <div className="relative z-[1] pr-12">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-gray-900">오늘 일지</span>
                  <span className="rounded-full bg-purple-300/60 px-2 py-0.5 text-[10px] font-bold leading-none text-purple-900">
                    {percent}%
                  </span>
                </div>
                <span className="mt-1 block text-xs font-medium text-gray-700">
                  감정 · 증상 · 수면 · 목표를 기록해 보세요
                </span>
                {contentPreview}
              </div>
            );
          })() : (
            <div className="relative z-[1] pr-12">
              <span className="block text-base font-extrabold text-gray-900">오늘 일지 작성하기</span>
              <span className="mt-1.5 block text-xs font-medium text-gray-700">
                감정 · 증상 · 수면 · 목표를 기록해 보세요
              </span>
            </div>
          )}
        </button>

        <HomeMedicationSection />

        {upcomingConsultation !== null && upcomingConsultationDday !== null ? (
          <button
            type="button"
            onClick={() => navigate('/counseling')}
            className="w-full overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white p-4 text-left shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900">다음 상담</p>
                <p className="mt-1 text-xs text-gray-600">
                  {formatConsultationDate(upcomingConsultation.consultationDate)}
                  {upcomingConsultation.place ? ` · ${upcomingConsultation.place}` : ''}
                </p>
                {upcomingConsultation.doctorName ? (
                  <p className="mt-0.5 text-xs text-gray-500">{upcomingConsultation.doctorName}</p>
                ) : null}
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                upcomingConsultationDday === 0
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {upcomingConsultationDday === 0 ? 'D-day' : `D-${upcomingConsultationDday}`}
              </span>
            </div>
          </button>
        ) : null}

        <section>
          <SectionHeader
            title="오늘 계획"
            action="캘린더 보기"
            onAction={() => navigate('/calendar')}
          />
          <div className="border-y border-gray-200">
            {schedulesLoading || todosLoading ? (
              <StatusRow>계획을 불러오고 있어요.</StatusRow>
            ) : schedulesLoadError || todosLoadError ? (
              <div className="flex min-h-[56px] flex-col justify-center gap-1 px-4" role="alert">
                {schedulesLoadError ? (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-red-700">{schedulesLoadError}</span>
                    <button
                      type="button"
                      onClick={() => void loadSchedules()}
                      className="min-h-11 shrink-0 rounded-lg px-2 text-xs font-semibold text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
                    >
                      다시 시도
                    </button>
                  </div>
                ) : null}
                {todosLoadError ? (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-red-700">{todosLoadError}</span>
                    <button
                      type="button"
                      onClick={() => void loadTodos()}
                      className="min-h-11 shrink-0 rounded-lg px-2 text-xs font-semibold text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
                    >
                      다시 시도
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (() => {
              const planItems: PlanItem[] = [
                ...scheduleItems.map((item) => ({
                  ...item,
                  kind: 'schedule' as const,
                  sortKey: item.isAllDay ? Number.NEGATIVE_INFINITY : toTimestamp(item.startTime),
                })),
                ...todos.map((todo) => ({
                  ...todo,
                  kind: 'todo' as const,
                  sortKey: todo.isAllDay ? Number.NEGATIVE_INFINITY : toTimestamp(todo.dueAt),
                })),
              ].sort((a, b) => a.sortKey - b.sortKey);

              return planItems.length === 0 ? (
                <StatusRow>오늘 예정된 계획이 없어요.</StatusRow>
              ) : (
                planItems.slice(0, 5).map((item) => (
                  <PlanItemRow
                    key={item.kind === 'schedule' ? `s-${item.scheduleId}` : `t-${item.id}`}
                    item={item}
                    onClick={() => navigate('/calendar')}
                  />
                ))
              );
            })()}
          </div>
        </section>

        <section>
          <SectionHeader
            title="이번 주"
            action="전체 기록"
            onAction={() => navigate('/report')}
          />
          <div>
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
            ) : weeklyStats ? (
              <div className="grid grid-cols-3 gap-3">
                <StatItem
                  label="복약률"
                  value={`${Math.round(weeklyStats.adherenceRate)}%`}
                  detail={`${weeklyStats.takenCount}/${weeklyStats.totalScheduled}회`}
                  progress={weeklyStats.adherenceRate}
                  tone="strong"
                />
                <StatItem
                  label="기록률"
                  value={`${Math.round(((weeklyJournalStats?.recordedDays ?? 0) / 7) * 100)}%`}
                  detail={`${weeklyJournalStats?.recordedDays ?? 0}/7일`}
                  progress={((weeklyJournalStats?.recordedDays ?? 0) / 7) * 100}
                  tone="medium"
                />
                <StatItem
                  label="목표 달성률"
                  value={
                    weeklyJournalStats?.goalAchievementRate == null
                      ? '–'
                      : `${weeklyJournalStats.goalAchievementRate}%`
                  }
                  detail={
                    weeklyJournalStats?.goalAchievementRate == null ? '기록 없음' : '목표 점수'
                  }
                  progress={weeklyJournalStats?.goalAchievementRate ?? 0}
                  tone="soft"
                />
              </div>
            ) : (
              <StatusRow>표시할 주간 통계가 없어요.</StatusRow>
            )}
          </div>
        </section>

        <section className="py-1">
          <div className="flex justify-around">
            <ShortcutCircle
              icon={<BookOpen className="h-5 w-5" strokeWidth={1.8} />}
              label="자가체크 이력"
              onClick={() => navigate('/onboarding/history')}
            />
            <ShortcutCircle
              icon={<BarChart2 className="h-5 w-5" strokeWidth={1.8} />}
              label="리포트 이력"
              onClick={() => navigate('/report/monthly')}
            />
            <ShortcutCircle
              icon={<ClipboardList className="h-5 w-5" strokeWidth={1.8} />}
              label="상담 기록"
              onClick={() => navigate('/counseling')}
            />
            {consultationDday !== null ? (
              <ShortcutCircle
                icon={<CalendarCheck className="h-5 w-5" strokeWidth={1.8} />}
                label="상담 준비"
                badge={
                  consultationDday === 0
                    ? 'D-day'
                    : `D-${consultationDday}`
                }
                onClick={() => navigate('/counseling/prepare')}
              />
            ) : null}
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
  icon,
  onAction,
  title,
}: {
  action: string;
  icon?: ReactNode;
  onAction: () => void;
  title: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
        {icon}
        {title}
      </h2>
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

function PlanItemRow({ item, onClick }: { item: PlanItem; onClick: () => void }) {
  const timeLabel =
    item.isAllDay
      ? '종일'
      : item.kind === 'schedule'
        ? formatTime(item.startTime)
        : formatTime(item.dueAt);

  const isDone = item.kind === 'todo' && item.done;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[68px] w-full items-center gap-3 border-b border-gray-200 px-4 text-left last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-inset"
    >
      <span className="w-11 shrink-0 text-xs font-extrabold text-gray-700">{timeLabel}</span>
      {item.kind === 'schedule'
        ? <Calendar className="h-3.5 w-3.5 shrink-0 text-purple-400" strokeWidth={2} />
        : <Square className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2} />
      }
      <span className="min-w-0 grow">
        <span
          className={`block truncate text-xs font-extrabold ${
            isDone ? 'text-gray-400 line-through' : 'text-gray-900'
          }`}
        >
          {item.kind === 'schedule' ? item.title : item.text}
        </span>
      </span>
      {isDone ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100">
          <Check className="h-3.5 w-3.5 text-purple-600" strokeWidth={2.5} />
        </span>
      ) : (
        <ChevronRight className="h-4 w-4 shrink-0 text-gray-600" />
      )}
    </button>
  );
}

function StatusRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[68px] items-center px-4 text-xs font-medium text-gray-600" role="status">
      {children}
    </div>
  );
}

function StatItem({
  detail,
  label,
  progress,
  tone,
  value,
}: {
  detail: string;
  label: string;
  progress: number;
  tone: 'strong' | 'medium' | 'soft';
  value: string;
}) {
  const barColor = {
    strong: 'bg-purple-700',
    medium: 'bg-purple-500',
    soft: 'bg-purple-300',
  }[tone];

  return (
    <div className="min-w-0">
      <div className="truncate text-[11px] font-semibold text-gray-600">{label}</div>
      <div className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-gray-900">{value}</div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-purple-100">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${clampPercentage(progress)}%` }}
        />
      </div>
      <div className="mt-1.5 truncate text-[10px] font-medium text-gray-500">{detail}</div>
    </div>
  );
}

function clampPercentage(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
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

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(11, 16) || '--:--';
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function sleepQualityLabel(quality: string): string {
  if (quality === 'GOOD') return '좋음';
  if (quality === 'NORMAL') return '보통';
  return '나쁨';
}

function formatConsultationDate(dateString: string): string {
  const parts = dateString.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return dateString;
  const [y, m, d] = parts;
  const date = new Date(y, m - 1, d);
  if (isNaN(date.getTime())) return dateString;
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  return `${m}월 ${d}일 (${weekDays[date.getDay()] ?? ''})`;
}

function calcJournalCompletion(journal: JournalDetail): { percent: number; isComplete: boolean } {
  const hasActiveTags =
    (journal.activeTags?.conditions?.length ?? 0) > 0 ||
    (journal.activeTags?.sideEffects?.length ?? 0) > 0 ||
    (journal.activeTags?.troubles?.length ?? 0) > 0;
  const hasActiveGoals = (journal.activeTags?.goals?.length ?? 0) > 0;

  const sections: boolean[] = [
    !!journal.checked?.sleep,
    !!journal.checked?.meal,
    ...(hasActiveTags
      ? [
          (journal.checked?.conditions?.length ?? 0) > 0 ||
            (journal.checked?.sideEffects?.length ?? 0) > 0 ||
            (journal.checked?.troubles?.length ?? 0) > 0,
        ]
      : []),
    ...(hasActiveGoals
      ? [
          (journal.activeTags?.goals ?? []).every((g) =>
            (journal.checked?.goals ?? []).some((cg) => cg.goalId === g.goalId),
          ),
        ]
      : []),
  ];

  const total = sections.length;
  if (total === 0) return { percent: 0, isComplete: false };
  const completed = sections.filter(Boolean).length;
  return {
    percent: Math.round((completed / total) * 100),
    isComplete: completed === total,
  };
}

function calcDday(dateString: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  if (!match) return null;

  const [, yearString, monthString, dayString] = match;
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  const target = new Date(year, month - 1, day);

  if (
    target.getFullYear() !== year ||
    target.getMonth() !== month - 1 ||
    target.getDate() !== day
  ) {
    return null;
  }

  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const targetUtc = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  return (targetUtc - todayUtc) / (1000 * 60 * 60 * 24);
}

function ShortcutCircle({
  badge,
  icon,
  label,
  onClick,
}: {
  badge?: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2"
    >
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-purple-700 transition-colors active:bg-purple-200">
        {icon}
        {badge ? (
          <span className="absolute -right-1 -top-1 rounded-full bg-purple-600 px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">
            {badge}
          </span>
        ) : null}
      </span>
      <span className="text-[10px] font-semibold text-gray-700">{label}</span>
    </button>
  );
}

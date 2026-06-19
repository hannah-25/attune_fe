import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardList,
  Home,
  MessageCircle,
  NotebookPen,
  Pill,
  UserRound,
} from 'lucide-react';
import type { ReactNode } from 'react';
import logoImage from '@src/assets/logo.png';

const weeklyStats = [
  { label: '기록', value: '5/7일' },
  { label: '복약', value: '12/14회' },
  { label: '계획', value: '8/10개' },
];

export default function HomePreviewPage() {
  return (
    <div
      className="h-full w-full overflow-y-auto bg-gray-50 text-gray-900"
      style={{
        fontFamily:
          "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <main className="relative mx-auto min-h-full w-full max-w-[480px] pb-32">
        <header className="flex min-h-[60px] items-center px-4 py-2">
          <img src={logoImage} alt="attune" className="h-8 w-8 object-contain" />
          <span className="ml-2 rounded-full bg-purple-100 px-2 py-1 text-[10px] font-bold text-purple-700">
            홈 시안
          </span>
          <div className="grow" />
          <HeaderButton label="알림 보기">
            <Bell className="h-[18px] w-[18px]" strokeWidth={2.25} />
          </HeaderButton>
          <HeaderButton label="마이페이지 보기">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-200 text-purple-700">
              <UserRound className="h-4 w-4" strokeWidth={2.25} />
            </span>
          </HeaderButton>
        </header>

        <div className="flex flex-col px-4 pt-2">
          <section className="relative min-h-[180px] overflow-hidden rounded-[1.75rem] bg-purple-100 p-5 shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px]">
            <div
              className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-purple-200/65"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-5 right-5 flex h-14 w-14 rotate-6 items-center justify-center rounded-[1.25rem] bg-purple-200 text-purple-700"
              aria-hidden="true"
            >
              <NotebookPen className="h-7 w-7" strokeWidth={1.8} />
            </div>
            <div className="relative z-[1] max-w-[250px]">
              <p className="text-xs font-bold text-purple-700">오늘 일지</p>
              <h1 className="mt-2 text-[22px] font-extrabold leading-[1.35] tracking-[-0.03em]">
                오늘의 마음과 증상을
                <br />
                기록해 보세요
              </h1>
              <p className="mt-2 text-xs font-medium text-gray-700">
                작은 변화도 나를 이해하는 기록이 돼요.
              </p>
              <button
                type="button"
                className="mt-4 flex min-h-11 items-center gap-1 rounded-full bg-purple-700 px-4 text-xs font-extrabold text-white transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2"
              >
                기록하기
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </section>

          <HomeSection title="오늘 복약" action="전체 관리">
            <div className="border-y border-gray-300">
              <MedicationRow time="08:00" title="아침 약 2개" description="식후 30분" completed />
              <MedicationRow time="21:00" title="저녁 약 1개" description="다음 복약까지 4시간" />
            </div>
            <p className="mt-3 text-xs font-semibold text-gray-600">
              오늘 1/2회 완료 · <span className="text-purple-700">한 번 남았어요</span>
            </p>
          </HomeSection>

          <HomeSection title="오늘 계획" action="캘린더 보기">
            <div className="border-y border-gray-300">
              <PlanRow
                time="14:00"
                title="병원 상담"
                description="상담 기록 정리하기"
                accent
              />
              <PlanRow time="18:30" title="20분 산책하기" description="할 일 · 미완료" />
            </div>
          </HomeSection>

          <section className="border-t border-gray-300 py-5">
            <button
              type="button"
              className="flex min-h-[68px] w-full items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <ClipboardList className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="min-w-0 grow">
                <span className="block text-sm font-extrabold text-gray-900">
                  자가 체크할 시기가 되었어요
                </span>
                <span className="mt-1 block text-xs font-medium text-gray-600">
                  현재 상태를 간단히 확인해 보세요
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-gray-600" />
            </button>
          </section>

          <HomeSection title="이번 주" action="전체 기록" className="border-t-0 pt-3">
            <div className="grid grid-cols-3 divide-x divide-gray-300">
              {weeklyStats.map(({ label, value }) => (
                <div key={label} className="px-4 first:pl-0 last:pr-0">
                  <p className="text-xs font-medium text-gray-600">{label}</p>
                  <p className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-gray-900">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold text-gray-600">
              지난주보다 하루 더 기록했어요
            </p>
          </HomeSection>
        </div>

        <PreviewNavigation />
      </main>
    </div>
  );
}

function HeaderButton({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex h-11 w-11 items-center justify-center rounded-full transition-colors active:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
      aria-label={label}
    >
      {children}
    </button>
  );
}

function HomeSection({
  action,
  children,
  className = '',
  title,
}: {
  action: string;
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <section className={`border-t border-gray-300 py-6 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-extrabold text-gray-900">{title}</h2>
        <button
          type="button"
          className="flex min-h-11 items-center gap-0.5 rounded-lg px-2 text-xs font-semibold text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
        >
          {action}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
      {children}
    </section>
  );
}

function MedicationRow({
  completed = false,
  description,
  time,
  title,
}: {
  completed?: boolean;
  description: string;
  time: string;
  title: string;
}) {
  return (
    <div className="flex min-h-[72px] items-center gap-3 border-b border-gray-200 last:border-b-0">
      <span className="w-11 shrink-0 text-xs font-extrabold text-gray-700">{time}</span>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          completed ? 'bg-gray-100 text-gray-600' : 'bg-purple-100 text-purple-700'
        }`}
      >
        {completed ? <Check className="h-4 w-4" strokeWidth={2.6} /> : <Pill className="h-4 w-4" />}
      </span>
      <span className="min-w-0 grow">
        <span
          className={`block text-xs font-extrabold ${
            completed ? 'text-gray-600 line-through' : 'text-gray-900'
          }`}
        >
          {title}
        </span>
        <span className="mt-1 block text-[11px] font-medium text-gray-600">{description}</span>
      </span>
      {completed ? (
        <span className="text-xs font-bold text-gray-600">완료</span>
      ) : (
        <button
          type="button"
          className="min-h-11 shrink-0 rounded-xl border border-purple-300 bg-purple-50 px-3 text-xs font-extrabold text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
        >
          복용하기
        </button>
      )}
    </div>
  );
}

function PlanRow({
  accent = false,
  description,
  time,
  title,
}: {
  accent?: boolean;
  description: string;
  time: string;
  title: string;
}) {
  return (
    <button
      type="button"
      className="flex min-h-[68px] w-full items-center gap-3 border-b border-gray-200 text-left last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-inset"
    >
      <span className="w-11 shrink-0 text-xs font-extrabold text-gray-700">{time}</span>
      <span className="min-w-0 grow">
        <span className="block text-xs font-extrabold text-gray-900">{title}</span>
        <span
          className={`mt-1 block text-[11px] font-semibold ${
            accent ? 'text-purple-700' : 'text-gray-600'
          }`}
        >
          {description}
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-gray-600" />
    </button>
  );
}

function PreviewNavigation() {
  const items = [
    { label: '홈', icon: Home, active: true },
    { label: '일지', icon: NotebookPen },
    { label: '약', icon: Pill },
    { label: '캘린더', icon: CalendarDays },
    { label: '커뮤니티', icon: MessageCircle },
  ];

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[19] mx-auto h-[calc(6rem+env(safe-area-inset-bottom))] max-w-[480px] bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent"
        aria-hidden="true"
      />
      <nav
        className="fixed bottom-[calc(14px+env(safe-area-inset-bottom))] left-1/2 z-20 flex h-[62px] w-[calc(100%-24px)] max-w-[456px] -translate-x-1/2 items-center rounded-[1.9375rem] border border-white/60 bg-white/80 px-1 shadow-[rgba(60,40,90,0.12)_0px_10px_30px_0px,_rgba(255,255,255,0.7)_0px_1px_0px_0px_inset] backdrop-blur-[20px] backdrop-saturate-[1.8]"
        aria-label="시안 하단 내비게이션"
      >
        {items.map(({ active = false, icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            className={`flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-xs ${
              active ? 'font-bold text-gray-950' : 'font-medium text-gray-600'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-inset`}
            aria-current={active ? 'page' : undefined}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.8} />
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}

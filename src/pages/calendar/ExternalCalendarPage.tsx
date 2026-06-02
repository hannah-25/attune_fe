import React, { useState } from 'react';
import { Check, ChevronDown, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';

type CalendarOption = {
  colorClass: string;
  id: string;
  label: string;
};

const CALENDAR_OPTIONS: CalendarOption[] = [
  { id: 'work', label: '업무 일정', colorClass: 'bg-purple-300' },
  { id: 'personal', label: '개인 일정', colorClass: 'bg-purple-300' },
  { id: 'family', label: '가족 캘린더', colorClass: 'bg-purple-300' },
];

export default function ExternalCalendarPage() {
  const navigate = useNavigate();
  const [accountOpen, setAccountOpen] = useState(false);
  const [lastSynced, setLastSynced] = useState('4분 전 동기화');
  const [syncing, setSyncing] = useState(false);
  const [visibleCalendars, setVisibleCalendars] = useState<Record<string, boolean>>({
    work: true,
    personal: true,
    family: false,
  });

  const toggleCalendar = (id: string) => {
    setVisibleCalendars((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const visibleCount = CALENDAR_OPTIONS.filter((option) => visibleCalendars[option.id]).length;
  const allVisible = visibleCount === CALENDAR_OPTIONS.length;

  const toggleAllCalendars = () => {
    const nextVisible = !allVisible;
    setVisibleCalendars(
      CALENDAR_OPTIONS.reduce<Record<string, boolean>>((next, option) => {
        next[option.id] = nextVisible;
        return next;
      }, {}),
    );
  };

  const syncCalendar = () => {
    if (syncing) return;

    setSyncing(true);
    window.setTimeout(() => {
      setLastSynced('방금 동기화');
      setSyncing(false);
    }, 700);
  };

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="캘린더 연동"
          left={<NavBackButton onClick={() => navigate(-1)} />}
          right={
            <button
              type="button"
              onClick={syncCalendar}
              className="items-center flex justify-center w-11 h-11"
              aria-label="캘린더 동기화"
            >
              <span className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <RefreshCw className={`h-4 w-4 text-gray-700 ${syncing ? 'animate-spin' : ''}`} strokeWidth={2.25} />
              </span>
            </button>
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 border border-purple-50 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.375rem]">
            <div className="font-extrabold text-lg leading-[23.4px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
              {visibleCount}개 캘린더를
              <br />
              함께 보고 있어요
            </div>
            <div className="mt-[6px] text-gray-600 leading-normal">
              {syncing ? 'Google 캘린더와 동기화 중이에요' : `Google 캘린더 · ${lastSynced}`}
            </div>
          </div>

          <div className="font-bold text-gray-600 text-xs pt-1 pr-1 pb-0 pl-1">
            연결된 계정
          </div>
          <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setAccountOpen((open) => !open)}
              className="items-center flex w-full text-left gap-2.5 pt-[13px] pr-[14px] pb-[13px] pl-[14px] rounded-[0.875rem] transition-all active:scale-[0.99]"
              aria-expanded={accountOpen}
            >
              <div className="items-center flex font-extrabold justify-center w-8 h-8 bg-purple-100 text-[rgb(185,166,255)] text-sm rounded-2xl">
                <span className="block">G</span>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-bold text-gray-900">
                  Google 캘린더
                </div>
                <div className="text-xs text-gray-600">
                  main@gmail.com · {lastSynced}
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${accountOpen ? 'rotate-180' : ''}`} />
            </button>
            {accountOpen ? (
              <div className="mx-[14px] mb-3 rounded-xl bg-gray-50 px-3 py-2 text-xs text-gray-600">
                <div className="items-center flex justify-between gap-2">
                  <span>가져온 일정</span>
                  <span className="font-bold text-gray-900">{visibleCount}개 표시 중</span>
                </div>
                <div className="items-center flex justify-between gap-2 mt-1.5">
                  <span>동기화 상태</span>
                  <span className="items-center inline-flex gap-1 font-bold text-purple-700">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                    정상
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="items-center flex justify-between pt-1 pr-1 pb-0 pl-1">
            <div className="font-bold text-gray-600 text-xs">
              표시 옵션
            </div>
            <button
              type="button"
              onClick={toggleAllCalendars}
              className="font-bold text-xs text-purple-700 transition-all active:scale-[0.97]"
            >
              {allVisible ? '모두 숨기기' : '모두 표시'}
            </button>
          </div>
          <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            {CALENDAR_OPTIONS.map((option, index) => {
              const active = visibleCalendars[option.id];

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleCalendar(option.id)}
                  className={`items-center flex w-full text-left gap-2.5 pt-[11px] pr-[14px] pb-[11px] pl-[14px] transition-all active:scale-[0.99] disabled:opacity-45 ${
                    index < CALENDAR_OPTIONS.length - 1 ? 'border-b' : ''
                  }`}
                  style={{ borderBottomColor: 'rgb(233, 228, 220)' }}
                >
                  <div className={`w-3 h-3 rounded-md ${active ? option.colorClass : 'bg-purple-50'}`} />
                  <div className="grow basis-[0%]">{option.label}</div>
                  <ToggleSwitch active={active} />
                </button>
              );
            })}
          </div>

          <div className="bg-purple-100 border border-purple-50 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="text-gray-800 leading-normal">
              숨긴 캘린더의 일정은 메인 캘린더에서만 보이지 않아요.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ active }: { active: boolean }) {
  return (
    <span className={`relative block w-[38px] h-[22px] rounded-[0.6875rem] transition-colors ${
      active ? 'bg-purple-300' : 'bg-purple-50'
    }`}>
      <span className={`absolute w-[18px] h-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem] transition-all ${
        active ? 'left-[18px]' : 'left-[2px]'
      }`} />
    </span>
  );
}

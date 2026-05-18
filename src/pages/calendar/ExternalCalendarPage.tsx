import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';

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
  const [googleConnected, setGoogleConnected] = useState(true);
  const [visibleCalendars, setVisibleCalendars] = useState<Record<string, boolean>>({
    work: true,
    personal: true,
    family: false,
  });

  const toggleCalendar = (id: string) => {
    setVisibleCalendars((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="w-full h-dvh bg-gray-100 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="캘린더 연동"
          left={
            <HeaderIconButton
              src="/icons/69b9506be14cb1cfd9fad41f5e5b691f2f2a39b4.svg"
              onClick={() => navigate(-1)}
            />
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.375rem]">
            <div className="font-extrabold text-lg leading-[23.4px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
              병원·회사 일정도
              <br />
              한 곳에서 봐요
            </div>
            <div className="mt-[6px] text-gray-600 leading-normal">
              외부 캘린더는 색상으로 구분해 표시돼요
            </div>
          </div>

          <div className="font-bold text-gray-600 text-xs pt-1 pr-1 pb-0 pl-1">
            연결된 계정
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setGoogleConnected((prev) => !prev)}
              className="items-center flex w-full text-left gap-2.5 pt-[13px] pr-[14px] pb-[13px] pl-[14px] rounded-[0.875rem] transition-all active:scale-[0.99]"
            >
              <div className={`items-center flex font-extrabold justify-center w-8 h-8 text-sm rounded-2xl ${
                googleConnected ? 'bg-purple-100 text-[rgb(185,166,255)]' : 'bg-gray-100 text-gray-400'
              }`}>
                <span className="block">G</span>
              </div>
              <div className="grow basis-[0%]">
                <div className={`font-bold ${googleConnected ? 'text-gray-900' : 'text-gray-500'}`}>
                  Google 캘린더
                </div>
                <div className={`text-xs ${googleConnected ? 'text-gray-600' : 'text-gray-500'}`}>
                  {googleConnected ? 'main@gmail.com · 4분 전 동기화' : '연결되지 않음'}
                </div>
              </div>
              <ToggleSwitch active={googleConnected} />
            </button>
          </div>

          <div className="font-bold text-gray-600 text-xs pt-1 pr-1 pb-0 pl-1">
            표시 옵션
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            {CALENDAR_OPTIONS.map((option, index) => {
              const active = visibleCalendars[option.id];
              const disabled = !googleConnected;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    if (!disabled) toggleCalendar(option.id);
                  }}
                  disabled={disabled}
                  className={`items-center flex w-full text-left gap-2.5 pt-[11px] pr-[14px] pb-[11px] pl-[14px] transition-all active:scale-[0.99] disabled:opacity-45 ${
                    index < CALENDAR_OPTIONS.length - 1 ? 'border-b' : ''
                  }`}
                  style={{ borderBottomColor: 'rgb(233, 228, 220)' }}
                >
                  <div className={`w-3 h-3 rounded-md ${active && !disabled ? option.colorClass : 'bg-purple-50'}`} />
                  <div className="grow basis-[0%]">{option.label}</div>
                  <ToggleSwitch active={active && !disabled} />
                </button>
              );
            })}
          </div>

          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="text-gray-800 leading-normal">
              연결 해제 시 동기화된 외부 일정과 토큰이 모두 삭제돼요.
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

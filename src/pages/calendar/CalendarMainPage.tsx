import React, { useState } from 'react';
import { CalendarPlus, ChevronDown } from 'lucide-react';
import { TabBar } from '@/components/TabBar';

type ViewMode = '월' | '주';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
const EVENTS = [
  { title: '오전 회의', time: '09:30 - 10:30', category: '회사', color: 'bg-purple-300' },
  { title: '콘서타 18mg', time: '12:30', category: '복용', color: 'bg-purple-300' },
  { title: '병원 진료', time: '14:00 - 14:40', category: '상담', color: 'bg-purple-500' },
];

export default function CalendarMainPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('월');

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex h-dvh flex-col min-h-0">
        <div className="items-center flex justify-between pt-2 pr-4 pb-1 pl-4">
          <button type="button" className="items-center flex gap-1 rounded-xl pr-1 transition-all active:scale-[0.97]" aria-label="월 선택">
            <div className="font-extrabold text-2xl" style={{ fontFamily: 'NanumSquare, system-ui' }}>5월</div>
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
            <div className="items-center flex justify-center w-[30px] h-[30px] bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-[0.9375rem]">
              <CalendarPlus className="w-[14px] h-[14px] text-gray-700" strokeWidth={2.5} />
            </div>
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
          <CalendarGrid compact={viewMode === '주'} />
        </div>
        <div className="h-px mt-1 ml-[16px] mr-[16px] bg-purple-50 shrink-0"></div>
        <div className="grow min-h-0 overflow-y-auto overscroll-contain px-4 pt-2 pb-[100px]">
          <div className="font-bold mb-2">5월 13일 · 3개 일정</div>
          {EVENTS.map((event) => (
            <div key={event.title} className="items-center flex mb-2 bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] gap-2.5 p-[10px] rounded-[0.875rem]">
              <div className={`self-stretch w-1 ${event.color} rounded-xs`}></div>
              <div className="grow basis-[0%]">
                <div className="font-bold">{event.title}</div>
                <div className="mt-[2px] text-gray-600 text-xs">{event.time}</div>
              </div>
              <div className="font-bold text-gray-600 text-xs">{event.category}</div>
            </div>
          ))}
        </div>
        <TabBar active="캘린더" />
      </div>
    </div>
  );
}

function CalendarGrid({ compact }: { compact: boolean }) {
  const days = compact
    ? [11, 12, 13, 14, 15, 16, 17]
    : Array.from({ length: 35 }, (_, index) => index < 4 ? null : index - 3);

  return (
    <div className="grid-cols-7 grid gap-1">
      {days.map((day, index) => {
        const isToday = day === 13;
        const hasEvent = day !== null && [3, 7, 10, 12, 13, 16, 18, 21, 23].includes(day);
        return (
          <div key={`${day ?? 'empty'}-${index}`} className={`relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg ${day === null ? 'opacity-[0.35]' : ''} ${isToday ? 'bg-[rgb(31,27,46)]' : ''}`}>
            <div className={`font-${isToday ? 'extrabold' : 'semibold'} text-center ${isToday ? 'text-white' : ''}`}>{day ?? ''}</div>
            {hasEvent ? (
              <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                <div className={`text-center w-1 h-1 ${isToday ? 'bg-white' : 'bg-purple-300'} rounded-xs`} />
                {isToday ? <div className="text-center w-1 h-1 bg-white rounded-xs" /> : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

import React, { useState } from 'react';
import { Bell, CalendarPlus } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';

const WEEK_DAYS = [
  { day: '월', date: 12, hasEvent: true },
  { day: '화', date: 13, hasEvent: true },
  { day: '수', date: 14, hasEvent: true },
  { day: '목', date: 15, hasEvent: false },
  { day: '금', date: 16, hasEvent: true },
  { day: '토', date: 17, hasEvent: true },
  { day: '일', date: 18, hasEvent: false },
];

const EVENTS = [
  { time: '08:00', title: '콘서타 18mg', category: '복용', color: 'bg-purple-300' },
  { time: '09:30', title: '오전 회의', category: '회사', color: 'bg-purple-300' },
  { time: '12:30', title: '콘서타 18mg', category: '복용', color: 'bg-purple-300' },
  { time: '14:00', title: '병원 진료', category: '상담', color: 'bg-purple-500' },
  { time: '19:00', title: '스트라테라 40mg', category: '복용', color: 'bg-purple-300' },
];

export default function HomeCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(13);

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="items-center flex justify-between pt-[10px] pr-5 pb-1.5 pl-5">
          <div className="font-bold text-2xl" style={{ fontFamily: 'NanumSquare, system-ui' }}>5월</div>
          <div className="flex gap-2">
            <IconTile><Bell className="w-[18px] h-[18px] text-gray-700" strokeWidth={2.4} /></IconTile>
            <IconTile><CalendarPlus className="w-[18px] h-[18px] text-gray-700" strokeWidth={2.4} /></IconTile>
          </div>
        </div>
        <div className="flex gap-1 pt-1.5 pr-3 pb-0 pl-3">
          {WEEK_DAYS.map(({ day, date, hasEvent }) => {
            const selected = selectedDate === date;
            return (
              <button
                key={date}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedDate(date)}
                className={`grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem] transition-all active:scale-[0.97] ${selected ? 'bg-[rgb(31,27,46)] text-white' : 'text-gray-900'}`}
              >
                <span className="block font-semibold text-center text-xs opacity-[0.7]">{day}</span>
                <span className="block font-bold text-center mt-[2px] text-base">{date}</span>
                <span className={`block ml-auto mr-auto text-center w-1 h-1 mt-1 rounded-xs ${hasEvent ? 'bg-purple-300' : ''}`} />
              </button>
            );
          })}
        </div>
        <ScrollArea className="flex flex-col gap-2.5 pt-3">
          {EVENTS.map((event) => (
            <div key={`${event.time}-${event.title}`} className="items-center flex gap-3">
              <div className="font-semibold w-[38px] text-gray-600 text-xs">{event.time}</div>
              <div className={`w-2 h-2 ${event.color} shrink-[0] rounded-sm`}></div>
              <div className="items-center flex grow bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-2 p-[10px] rounded-[0.875rem]">
                <div className="grow font-semibold basis-[0%]">{event.title}</div>
                <div className="font-bold text-gray-600 text-xs">{event.category}</div>
              </div>
            </div>
          ))}
          <div className="mt-4 bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="font-semibold text-gray-600">{selectedDate === 13 ? '오늘 일정' : `${selectedDate}일 일정`}</div>
            <div className="font-bold mt-[2px] text-sm text-gray-600">중요한 행사 한 번 더 기록해보세요</div>
          </div>
        </ScrollArea>
        <TabBar active="캘린더" />
      </div>
    </div>
  );
}

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="items-center flex justify-center w-11 h-11 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-[0.9375rem]">
      {children}
    </div>
  );
}

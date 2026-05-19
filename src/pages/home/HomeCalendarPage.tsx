import React, { useState } from 'react';
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

export default function HomeCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(13);

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="items-center flex justify-between pt-[10px] pr-5 pb-1.5 pl-5">
          <div className="font-bold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
            5월
          </div>
          <div className="flex gap-2">
            <div className="items-center flex justify-center w-11 h-11 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-[0.9375rem]">
              <div className="overflow-hidden w-[18px] h-[18px]">
                <img src="/icons/5d8d993a0397c0c32edf0c73ae3fd195ca241b6f.svg" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex justify-center w-11 h-11 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-[0.9375rem]">
              <div className="overflow-hidden w-[18px] h-[18px]">
                <img src="/icons/441d181493fed6f91159f901fc2b85bc102346e0.svg" className="block size-full" />
              </div>
            </div>
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
                className={`grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem] transition-all active:scale-[0.97] ${
                  selected ? 'bg-[rgb(31,27,46)] text-white' : 'text-gray-900'
                }`}
              >
                <span className="block font-semibold text-center text-xs opacity-[0.7]">{day}</span>
                <span className="block font-bold text-center mt-[2px] text-base">{date}</span>
                <span className={`block ml-auto mr-auto text-center w-1 h-1 mt-1 rounded-xs ${
                  hasEvent ? 'bg-purple-300' : ''
                }`} />
              </button>
            );
          })}
        </div>
        <ScrollArea className="flex flex-col gap-2.5 pt-3">
          <div className="items-center flex gap-3">
            <div className="font-semibold w-[38px] text-gray-600 text-xs">08:00</div>
            <div className="w-2 h-2 bg-purple-300 shrink-[0] rounded-sm"></div>
            <div className="items-center flex grow bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-2 p-[10px] rounded-[0.875rem]">
              <div className="grow font-semibold basis-[0%]">콘서타 18mg</div>
              <div className="font-bold text-gray-600 text-xs">복용</div>
            </div>
          </div>
          <div className="items-center flex gap-3">
            <div className="font-semibold w-[38px] text-gray-600 text-xs">09:30</div>
            <div className="w-2 h-2 bg-purple-300 shrink-[0] rounded-sm"></div>
            <div className="items-center flex grow bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-2 p-[10px] rounded-[0.875rem]">
              <div className="grow font-semibold basis-[0%]">오전 회의</div>
              <div className="font-bold text-gray-600 text-xs">회사</div>
            </div>
          </div>
          <div className="items-center flex gap-3">
            <div className="font-semibold w-[38px] text-gray-600 text-xs">12:30</div>
            <div className="w-2 h-2 bg-purple-300 shrink-[0] rounded-sm"></div>
            <div className="items-center flex grow bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-2 p-[10px] rounded-[0.875rem]">
              <div className="grow font-semibold basis-[0%]">콘서타 18mg</div>
              <div className="font-bold text-gray-600 text-xs">복용</div>
            </div>
          </div>
          <div className="items-center flex gap-3">
            <div className="font-semibold w-[38px] text-gray-600 text-xs">14:00</div>
            <div className="w-2 h-2 bg-purple-500 shrink-[0] rounded-sm"></div>
            <div className="items-center flex grow bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-2 p-[10px] rounded-[0.875rem]">
              <div className="grow font-semibold basis-[0%]">병원 진료</div>
              <div className="font-bold text-gray-600 text-xs">상담</div>
            </div>
          </div>
          <div className="items-center flex gap-3">
            <div className="font-semibold w-[38px] text-gray-600 text-xs">19:00</div>
            <div className="w-2 h-2 bg-purple-300 shrink-[0] rounded-sm"></div>
            <div className="items-center flex grow bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-2 p-[10px] rounded-[0.875rem]">
              <div className="grow font-semibold basis-[0%]">스트라테라 40mg</div>
              <div className="font-bold text-gray-600 text-xs">복용</div>
            </div>
          </div>
          <div className="mt-4 bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="font-semibold text-gray-600">
              {selectedDate === 13 ? '오늘 일지' : `${selectedDate}일 일지`}
            </div>
            <div className="font-bold mt-[2px] text-sm text-gray-600">
              저녁 식사 전 1번 더 기록해보세요
            </div>
          </div>
        </ScrollArea>
        <TabBar active="캘린더" />
      </div>
    </div>
  );
}

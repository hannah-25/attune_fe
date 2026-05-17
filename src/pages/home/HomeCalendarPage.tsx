import React from 'react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';

export default function HomeCalendarPage() {
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
            <div className="items-center flex justify-center w-[30px] h-[30px] bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-[0.9375rem]">
              <div className="overflow-hidden w-[13px] h-[13px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F5d8d993a0397c0c32edf0c73ae3fd195ca241b6f.svg?generation=1778677414699694&alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex justify-center w-[30px] h-[30px] bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-[0.9375rem]">
              <div className="overflow-hidden w-[13px] h-[13px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F441d181493fed6f91159f901fc2b85bc102346e0.svg?generation=1778677414646994&alt=media" className="block size-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1 pt-1.5 pr-3 pb-0 pl-3">
          <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
            <div className="font-semibold text-center text-xs opacity-[0.7]">월</div>
            <div className="font-bold text-center mt-[2px] text-base">12</div>
            <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 bg-purple-300 rounded-xs"></div>
          </div>
          <div className="grow text-center bg-[rgb(31,_27,_46)] text-white basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
            <div className="font-semibold text-center text-xs opacity-[0.7]">화</div>
            <div className="font-bold text-center mt-[2px] text-base">13</div>
            <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 bg-purple-300 rounded-xs"></div>
          </div>
          <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
            <div className="font-semibold text-center text-xs opacity-[0.7]">수</div>
            <div className="font-bold text-center mt-[2px] text-base">14</div>
            <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 bg-purple-300 rounded-xs"></div>
          </div>
          <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
            <div className="font-semibold text-center text-xs opacity-[0.7]">목</div>
            <div className="font-bold text-center mt-[2px] text-base">15</div>
            <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 rounded-xs"></div>
          </div>
          <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
            <div className="font-semibold text-center text-xs opacity-[0.7]">금</div>
            <div className="font-bold text-center mt-[2px] text-base">16</div>
            <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 bg-purple-300 rounded-xs"></div>
          </div>
          <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
            <div className="font-semibold text-center text-xs opacity-[0.7]">토</div>
            <div className="font-bold text-center mt-[2px] text-base">17</div>
            <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 bg-purple-300 rounded-xs"></div>
          </div>
          <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
            <div className="font-semibold text-center text-xs opacity-[0.7]">일</div>
            <div className="font-bold text-center mt-[2px] text-base">18</div>
            <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 rounded-xs"></div>
          </div>
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
          <div className="mt-1 bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="font-semibold text-gray-600">
              오늘 일지
            </div>
            <div className="font-bold mt-[2px] text-sm">
              저녁 식사 전 1번 더 기록해보세요
            </div>
          </div>
        </ScrollArea>
        <TabBar active="캘린더" />
      </div>
    </div>
  );
}

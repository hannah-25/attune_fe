import React from 'react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';

export default function MedicationListPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
          <div className="items-center flex justify-between">
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fced07539bf3d43afa327439e8d06f98fdbda335c.svg?generation=1778677415577643&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-bold text-sm">복용 중인 약</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F19cab3f28bf032ab1fda393ddb98fb1eabb87179.svg?generation=1778677415609729&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollArea className="flex flex-col gap-3 pt-1">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="font-bold text-gray-600 text-xs">
              다음 복용까지
            </div>
            <div className="items-baseline flex mt-1 gap-1.5">
              <div className="font-extrabold text-4xl" style={{ fontFamily: "NanumSquare, system-ui" }}>
                2:14
              </div>
              <div className="font-bold text-gray-500">
                · 콘서타 18mg · 12:30
              </div>
            </div>
            <div className="flex mt-3 gap-1.5">
              <div className="items-center flex grow font-bold justify-center h-9 bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem]">
                <span className="block">지금 복용</span>
              </div>
              <div className="items-center flex grow font-bold justify-center h-9 border-gray-900 border basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem]">
                <span className="block">10분 미루기</span>
              </div>
            </div>
          </div>
          <div className="font-bold text-gray-600 pt-1 pr-1 pb-0 pl-1">
            복용 중 (2)
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex gap-2.5">
              <div className="items-center flex justify-center w-[38px] h-[38px] bg-purple-300 rounded-xl">
                <div className="overflow-hidden w-[18px] h-[18px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff487caf883fee29fd8f5d6a6367147ff53ff6eeb.svg?generation=1778677415616709&amp;alt=media" className="block size-full" />
                </div>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-bold text-sm">콘서타 18mg</div>
                <div className="text-gray-600 text-xs">메틸페니데이트 · 2월 3일~</div>
              </div>
              <div className="relative w-[38px] h-[22px] bg-purple-300 rounded-[0.6875rem]">
                <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
              </div>
            </div>
            <div className="items-center flex mt-3 bg-gray-100 text-gray-800 gap-1.5 pt-2 pr-[10px] pb-2 pl-[10px] rounded-xl">
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F5334f614b5607f110abfe488851205e977f22b14.svg?generation=1778677415671127&amp;alt=media" className="block size-full" />
              </div>
              하루 2회 · 8:00, 12:30
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex gap-2.5">
              <div className="items-center flex justify-center w-[38px] h-[38px] bg-purple-500 rounded-xl">
                <div className="overflow-hidden w-[18px] h-[18px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F8fb8f0ff61b3f813a2a9b5e18b6950f525e506f3.svg?generation=1778677415651458&amp;alt=media" className="block size-full" />
                </div>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-bold text-sm">스트라테라 40mg</div>
                <div className="text-gray-600 text-xs">아토목세틴 · 4월 1일~</div>
              </div>
              <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
              </div>
            </div>
            <div className="items-center flex mt-3 bg-gray-100 text-gray-800 gap-1.5 pt-2 pr-[10px] pb-2 pl-[10px] rounded-xl">
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F363f99902730ebd698aff94492d5d4dc0e981bb1.svg?generation=1778677415672889&amp;alt=media" className="block size-full" />
              </div>
              하루 1회 · 19:00
            </div>
          </div>
          <div className="font-bold text-gray-600 pt-2 pr-1 pb-0 pl-1">
            지난 약 (1)
          </div>
          <div className="bg-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex gap-2.5 opacity-[0.7]">
              <div className="items-center flex justify-center w-[38px] h-[38px] bg-[rgb(208,_201,_189)] rounded-xl">
                <div className="overflow-hidden w-[18px] h-[18px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F82f6316729e2405770bf424ad5357aa78565cb47.svg?generation=1778677415705856&amp;alt=media" className="block size-full" />
                </div>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-bold text-sm">
                  아데랄 10mg
                </div>
                <div className="text-gray-600 text-xs">
                  1월 14일 — 2월 28일
                </div>
              </div>
              <div className="items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                <span className="block">이력</span>
              </div>
            </div>
          </div>
        </ScrollArea>
        <TabBar active="약" />
      </div>
    </div>
  );
}

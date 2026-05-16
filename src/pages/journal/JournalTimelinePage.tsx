import React from 'react';
import { TabBar } from '@/components/TabBar';

export default function JournalTimelinePage() {
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
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F5596f8f2c2f41bd0a4f5995e89c038339d171079.svg?generation=1778677415207876&alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-bold text-sm">오늘 일지</div>
            <div className="w-11 h-11"></div>
          </div>
          <div className="text-center text-gray-600 text-xs">5월 13일 화 · 6번째 기록</div>
        </div>
        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-[100px] pl-4">
          <div className="relative pt-0 pr-0 pb-0 pl-[18px]">
            <div className="absolute w-[2px] left-[6px] top-[6px] bottom-[30px] bg-purple-50"></div>
            <div className="relative pt-0 pr-0 pb-3 pl-0">
              <div className="absolute w-[14px] h-[14px] left-[-18px] top-2 bg-purple-300 border-[rgb(255,_250,_240)] border-[2.22222px] rounded-[0.4375rem]"></div>
              <div className="items-baseline flex mb-1 gap-2">
                <div className="font-bold text-gray-600 text-xs">08:00</div>
                <div className="font-bold text-gray-500 text-xs">· 복용</div>
              </div>
              <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[10px] rounded-[0.875rem]">
                <div className="font-bold">
                  콘서타 18mg
                  <span className="font-medium text-gray-600">
                    · 복용 완료
                  </span>
                </div>
              </div>
            </div>
            <div className="relative pt-0 pr-0 pb-3 pl-0">
              <div className="absolute w-[14px] h-[14px] left-[-18px] top-2 bg-purple-500 border-[rgb(255,_250,_240)] border-[2.22222px] rounded-[0.4375rem]"></div>
              <div className="items-baseline flex mb-1 gap-2">
                <div className="font-bold text-gray-600 text-xs">09:30</div>
                <div className="font-bold text-gray-500 text-xs">· 감정</div>
              </div>
              <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[10px] rounded-[0.875rem]">
                <div>
                  <div className="font-bold text-gray-600">
                    15분 전
                  </div>
                  <div className="flex flex-wrap mt-1 gap-1">
                    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border border-[rgb(185,166,255)] text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-full">
                      <span className="block">😰 불안</span>
                    </div>
                    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border border-[rgb(185,166,255)] text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-full">
                      <span className="block">멍해짐</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative pt-0 pr-0 pb-3 pl-0">
              <div className="absolute w-[14px] h-[14px] left-[-18px] top-2 bg-purple-300 border-[rgb(255,_250,_240)] border-[2.22222px] rounded-[0.4375rem]"></div>
              <div className="items-baseline flex mb-1 gap-2">
                <div className="font-bold text-gray-600 text-xs">12:00</div>
                <div className="font-bold text-gray-500 text-xs">· 식사</div>
              </div>
              <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[10px] rounded-[0.875rem]">
                <div className="font-semibold">
                  점심 ✓
                </div>
              </div>
            </div>
            <div className="relative pt-0 pr-0 pb-3 pl-0">
              <div className="absolute w-[14px] h-[14px] left-[-18px] top-2 bg-purple-300 border-[rgb(255,_250,_240)] border-[2.22222px] rounded-[0.4375rem]"></div>
              <div className="items-baseline flex mb-1 gap-2">
                <div className="font-bold text-gray-600 text-xs">14:20</div>
                <div className="font-bold text-gray-500 text-xs">· 업무</div>
              </div>
              <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[10px] rounded-[0.875rem]">
                <div>
                  <div className="font-bold text-gray-600">
                    방금 전
                  </div>
                  <div className="flex flex-wrap mt-1 gap-1">
                    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border border-[rgb(185,166,255)] text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-full">
                      <span className="block">마감 놓침</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative pt-0 pr-0 pb-3 pl-0">
              <div className="absolute w-[14px] h-[14px] left-[-18px] top-2 bg-purple-300 border-[rgb(255,_250,_240)] border-[2.22222px] rounded-[0.4375rem]"></div>
              <div className="items-baseline flex mb-1 gap-2">
                <div className="font-bold text-gray-600 text-xs">15:00</div>
                <div className="font-bold text-gray-500 text-xs">· 부작용</div>
              </div>
              <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[10px] rounded-[0.875rem]">
                <div>
                  <div className="font-bold text-gray-600">
                    30분 전
                  </div>
                  <div className="mt-1">
                    <div className="items-center inline-flex font-semibold whitespace-nowrap bg-purple-100 border border-[rgb(185,166,255)] text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-full">
                      <span className="block">식욕 저하</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="items-center border-dashed flex font-bold mt-1 border-gray-400 border text-gray-600 gap-2 p-[14px] rounded-2xl">
            <div className="overflow-hidden w-[14px] h-[14px]">
              <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F2119c34d184031b1023b5f47910171ad846b1874.svg?generation=1778677415261953&alt=media" className="block size-full" />
            </div>
            <span className="block">지금 일어난 일 빠르게 기록</span>
          </div>
        </div>
        <div className="items-center flex absolute left-4 right-4 bottom-[78px] backdrop-blur-[18px] bg-white/80 border-white/70 border shadow-[rgba(60,40,90,0.12)_0px_10px_26px_0px] gap-1.5 pt-2 pr-2 pb-2 pl-[14px] rounded-3xl">
          <div className="flex grow basis-[0%] gap-1">
            <div className="items-center flex grow justify-center h-9 bg-purple-300 basis-[0%] text-base rounded-[1.125rem]">😊</div>
            <div className="items-center flex grow justify-center h-9 basis-[0%] text-base rounded-[1.125rem]">🥲</div>
            <div className="items-center flex grow justify-center h-9 basis-[0%] text-base rounded-[1.125rem]">😣</div>
            <div className="items-center flex grow justify-center h-9 basis-[0%] text-base rounded-[1.125rem]">💊</div>
          </div>
          <div className="items-center flex font-bold justify-center h-11 bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-sm tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.375rem]">
            <span className="block">기록</span>
          </div>
        </div>
        <TabBar active="일지" />
      </div>
    </div>
  );
}

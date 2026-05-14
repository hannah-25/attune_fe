import React from 'react';
import { TabBar } from '@/components/TabBar';

export default function JournalFullPage() {
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
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F2a388ad72a45fea2c1c099f07fd840545826255d.svg?generation=1778677414809859&alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-bold text-sm">5월 13일 화</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fff088739f488f0ef39daa144b05d6bab96fcf844.svg?generation=1778677414809807&alt=media" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-1 pr-4 pb-[100px] pl-4">
          <div>
            <div className="items-center flex mb-2 gap-1.5">
              <div className="w-[10px] h-[10px] bg-purple-500 rounded-[0.3125rem]"></div>
              <div className="font-bold">
                감정 · 증상
              </div>
              <div className="grow basis-[0%]"></div>
              <div className="overflow-hidden w-3 h-3">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F450f132a3b66e58d29e81cd69f97bf150b7ea302.svg?generation=1778677414864370&alt=media" className="block size-full" />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
                <div className="overflow-hidden w-[10px] h-[10px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fdff531f2ba72287c8710d8c7bda88e2b9ac74b4d.svg?generation=1778677414850449&alt=media" className="block size-full" />
                </div>집중 어려움
              </div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
                <div className="overflow-hidden w-[10px] h-[10px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F8f9a55689cee3854aa4545497a17d0eca987ea1d.svg?generation=1778677414865458&alt=media" className="block size-full" />
                </div>멍해짐
              </div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">짜증</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
                <div className="overflow-hidden w-[10px] h-[10px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fce4c999ff9f1c86a912948cda308c760bdd13247.svg?generation=1778677414870853&alt=media" className="block size-full" />
                </div>불안
              </div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">무기력</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">초조</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">몰입</div>
            </div>
          </div>
          <div>
            <div className="items-center flex mb-2 gap-1.5">
              <div className="w-[10px] h-[10px] bg-[rgb(255,140,80)] rounded-[0.3125rem]"></div>
              <div className="font-bold">
                부작용
              </div>
              <div className="grow basis-[0%]"></div>
              <div className="overflow-hidden w-3 h-3">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F7db9a3a83b10d767323b3ad4d6fa7b7452792873.svg?generation=1778677414872296&alt=media" className="block size-full" />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">두통</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
                <div className="overflow-hidden w-[10px] h-[10px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F122522b2a3035025818884670597604055c74b67.svg?generation=1778677414904832&alt=media" className="block size-full" />
                </div>식욕 저하
              </div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">불면</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">입마름</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">두근거림</div>
            </div>
          </div>
          <div>
            <div className="items-center flex mb-2 gap-1.5">
              <div className="w-[10px] h-[10px] bg-[rgb(80,140,220)] rounded-[0.3125rem]"></div>
              <div className="font-bold">
                업무 실수 · 불편
              </div>
              <div className="grow basis-[0%]"></div>
              <div className="overflow-hidden w-3 h-3">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F93f4ed9952d5d35925418a97c665b2ff4a14bdcc.svg?generation=1778677414941751&alt=media" className="block size-full" />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
                <div className="overflow-hidden w-[10px] h-[10px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fcaae3d171f4160e534d41ece47a0611c2d7a841b.svg?generation=1778677414919538&alt=media" className="block size-full" />
                </div>마감 놓침
              </div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">약속 잊음</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">물건 잃어버림</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
                <div className="overflow-hidden w-[10px] h-[10px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa57ab3faf1d5f5c01acdb949b9a3ab987741dfc6.svg?generation=1778677414984936&alt=media" className="block size-full" />
                </div>일을 잘게 못 쪼갬
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="grow bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] p-3 rounded-[1.125rem]">
              <div className="font-semibold text-gray-600 text-xs">
                수면
              </div>
              <div className="font-bold mt-[2px] text-lg" style={{"fontFamily":"NanumSquare, system-ui"}}>
                6.5시간
              </div>
              <div className="flex mt-[6px] gap-[2px]">
                <div className="grow h-1 bg-purple-300 basis-[0%] rounded-xs"></div>
                <div className="grow h-1 bg-purple-300 basis-[0%] rounded-xs"></div>
                <div className="grow h-1 bg-purple-300 basis-[0%] rounded-xs"></div>
                <div className="grow h-1 bg-white/60 basis-[0%] rounded-xs"></div>
                <div className="grow h-1 bg-white/60 basis-[0%] rounded-xs"></div>
              </div>
            </div>
            <div className="grow bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] p-3 rounded-[1.125rem]">
              <div className="font-semibold text-gray-600 text-xs">
                식사
              </div>
              <div className="flex mt-[6px] gap-1.5">
                <div className="items-center flex font-bold justify-center w-7 h-7 bg-purple-300 rounded-[0.875rem]">아</div>
                <div className="items-center flex font-bold justify-center w-7 h-7 bg-purple-300 rounded-[0.875rem]">점</div>
                <div className="items-center flex font-bold justify-center w-7 h-7 bg-white/60 text-gray-600 rounded-[0.875rem]">저</div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
            <div className="font-semibold mb-[6px] text-gray-600">
              오늘 집중력 목표
            </div>
            <div className="font-bold mb-[10px]">
              한 가지 일에 30분 집중하기
            </div>
            <div className="items-center flex gap-2">
              <div className="grow relative h-2 bg-purple-50 basis-[0%] rounded-sm">
                <div className="absolute w-[70%] left-0 top-0 bottom-0 bg-purple-300 rounded-sm"></div>
                <div className="absolute w-4 h-4 left-[70%] top-[-4px] bg-white border-[rgb(185, 166, 255)] border shadow-[rgba(0,0,0,0.15)_0px_2px_6px_0px] translate-x-[-50%] rounded-lg"></div>
              </div>
              <div className="font-extrabold text-right w-[30px] text-sm">
                <span className="text-right">7</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
            <div className="font-semibold mb-2 text-gray-600">
              메모
            </div>
            <div className="flex flex-col gap-[9px]">
              <div className="w-[88%] h-[6px] bg-purple-50 rounded-md"></div>
              <div className="w-[70%] h-[6px] bg-purple-50 rounded-md"></div>
              <div className="w-[44%] h-[6px] bg-purple-50 rounded-md"></div>
            </div>
          </div>
        </div>
        <TabBar active="일지" />
      </div>
    </div>
  );
}

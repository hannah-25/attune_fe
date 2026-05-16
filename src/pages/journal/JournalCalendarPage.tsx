import React from 'react';
import { TabBar } from '@/components/TabBar';

export default function JournalCalendarPage() {
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
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0f148e246b2f2bb3a69872ea8396c06705d1c413.svg?generation=1778677415336099&alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-bold text-sm">일지</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff69b80758895256011eb548cf58375ba9863075c.svg?generation=1778677415343589&alt=media" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-0 pr-4 pb-1 pl-4">
          <div className="items-center flex mb-2 gap-2">
            <div className="overflow-hidden w-[14px] h-[14px]">
              <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fdc481ce5ba4d58b23a7460e5c99b3dfedea9c82a.svg?generation=1778677415378610&alt=media" className="block size-full" />
            </div>
            <div className="font-bold text-lg" style={{"fontFamily":"NanumSquare, system-ui"}}>
              2026년 5월
            </div>
            <div className="overflow-hidden w-[14px] h-[14px]">
              <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F7a6542fea4feea5b0aefcb93656c6349f537576b.svg?generation=1778677415401373&alt=media" className="block size-full" />
            </div>
            <div className="grow basis-[0%]"></div>
            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block">월</span>
            </div>
            <div className="items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block">주</span>
            </div>
          </div>
        </div>
        <div className="pt-0 pr-3 pb-0 pl-3">
          <div className="grid-cols-7 grid mb-[6px] gap-1">
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 1 / 2 / 2"}}>일</div>
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 2 / 2 / 3"}}>월</div>
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 3 / 2 / 4"}}>화</div>
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 4 / 2 / 5"}}>수</div>
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 5 / 2 / 6"}}>목</div>
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 6 / 2 / 7"}}>금</div>
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 7 / 2 / 8"}}>토</div>
          </div>
          <div className="grid-cols-7 grid gap-1">
            <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"1 / 1 / 2 / 2"}}></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"1 / 2 / 2 / 3"}}></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"1 / 3 / 2 / 4"}}></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"1 / 4 / 2 / 5"}}></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"1 / 5 / 2 / 6"}}></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"1 / 6 / 2 / 7"}}>1</div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"1 / 7 / 2 / 8"}}>2<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 1 / 3 / 2"}}>3<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"2 / 2 / 3 / 3"}}>4</div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 3 / 3 / 4"}}>5<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 4 / 3 / 5"}}>6<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 5 / 3 / 6"}}>7<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 6 / 3 / 7"}}>8<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 7 / 3 / 8"}}>9<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"3 / 1 / 4 / 2"}}>10</div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"3 / 2 / 4 / 3"}}>11<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"3 / 3 / 4 / 4"}}>12<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-extrabold justify-center relative bg-[rgb(31,_27,_46)] text-white rounded-xl" style={{"gridArea":"3 / 4 / 4 / 5"}}>13</div>
            <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"3 / 5 / 4 / 6"}}>14</div>
            <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"3 / 6 / 4 / 7"}}>15</div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"3 / 7 / 4 / 8"}}>16<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 1 / 5 / 2"}}>17<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 2 / 5 / 3"}}>18<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 3 / 5 / 4"}}>19<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 4 / 5 / 5"}}>20<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"4 / 5 / 5 / 6"}}>21</div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 6 / 5 / 7"}}>22<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 7 / 5 / 8"}}>23<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"5 / 1 / 6 / 2"}}>24<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"5 / 2 / 6 / 3"}}>25<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"5 / 3 / 6 / 4"}}>26<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"5 / 4 / 6 / 5"}}>27<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"5 / 5 / 6 / 6"}}>28</div>
            <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"5 / 6 / 6 / 7"}}>29</div>
            <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"5 / 7 / 6 / 8"}}>30</div>
            <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"6 / 1 / 7 / 2"}}>31</div>
            <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"6 / 2 / 7 / 3"}}></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"6 / 3 / 7 / 4"}}></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"6 / 4 / 7 / 5"}}></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"6 / 5 / 7 / 6"}}></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"6 / 6 / 7 / 7"}}></div>
            <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"6 / 7 / 7 / 8"}}></div>
          </div>
        </div>
        <div className="flex text-gray-500 text-xs gap-2.5 pt-4 pr-5 pb-1.5 pl-5">
          <div className="items-center flex gap-1"><div className="w-2 h-2 bg-purple-500 rounded-sm"></div>감정</div>
          <div className="items-center flex gap-1"><div className="w-2 h-2 bg-[rgb(255,140,80)] rounded-sm"></div>부작용</div>
          <div className="items-center flex gap-1"><div className="w-2 h-2 bg-[rgb(80,140,220)] rounded-sm"></div>업무</div>
          <div className="items-center flex gap-1"><div className="w-2 h-2 bg-[rgb(80,190,130)] rounded-sm"></div>좋은 날</div>
        </div>
        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-2 pr-4 pb-[100px] pl-4">
          <div className="font-bold mb-2 text-gray-600">
            최근 기록
          </div>
          <div className="mb-2 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="font-bold text-gray-600">5/12 월</div>
            <div className="mt-[2px]">집중 어려움 · 두통 · 약속 잊음</div>
          </div>
          <div className="mb-2 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="font-bold text-gray-600">5/11 일</div>
            <div className="mt-[2px]">몰입 · 평온</div>
          </div>
          <div className="mb-2 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="font-bold text-gray-600">5/10 토</div>
            <div className="mt-[2px]">식욕 저하 · 무기력</div>
          </div>
        </div>
        <TabBar active="일지" />
      </div>
    </div>
  );
}

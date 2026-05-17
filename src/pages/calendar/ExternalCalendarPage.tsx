import React from 'react';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';

export default function ExternalCalendarPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-100  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="캘린더 연동"
          left={<HeaderIconButton src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F69b9506be14cb1cfd9fad41f5e5b691f2f2a39b4.svg?generation=1778677416782809&alt=media" />}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.375rem]">
            <div className="font-extrabold text-lg leading-[23.4px]" style={{"fontFamily":"NanumSquare, system-ui"}}>병원·회사 일정도<br />한 곳에서 봐요</div>
            <div className="mt-[6px] text-gray-600 leading-normal">
              외부 캘린더는 색상으로 구분해 표시돼요
            </div>
          </div>
          <div className="font-bold text-gray-600 text-xs pt-1 pr-1 pb-0 pl-1">
            연결된 계정
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex gap-2.5 pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="items-center flex font-extrabold justify-center w-8 h-8 bg-purple-100 text-[rgb(185, 166, 255)] text-sm rounded-2xl">
                <span className="block">G</span>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-bold">
                  Google 캘린더
                </div>
                <div className="text-gray-600 text-xs">
                  main@gmail.com · 4분 전 동기 화
                </div>
              </div>
              <div className="relative w-[38px] h-[22px] bg-purple-300 rounded-[0.6875rem]">
                <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
              </div>
            </div>
            <div className="items-center flex gap-2.5 pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="items-center flex font-extrabold justify-center w-8 h-8 bg-purple-50 text-gray-600 text-sm rounded-2xl">
                <span className="block">O</span>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-bold text-gray-500">
                  Outlook · 연결되지 않음
                </div>
                <div className="text-gray-500 text-xs">
                  탭하여 연결
                </div>
              </div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F94612fc4446546e6fe33a94b3be3019ed330f60b.svg?generation=1778677416855363&amp;alt=media" className="block size-full" />
              </div>
            </div>
          </div>
          <div className="font-bold text-gray-600 text-xs pt-1 pr-1 pb-0 pl-1">
            표시 옵션
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex gap-2.5 pt-[11px] pr-[14px] pb-[11px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="w-3 h-3 bg-purple-300 rounded-md"></div>
              <div className="grow basis-[0%]">업무 일정</div>
              <div className="relative w-[38px] h-[22px] bg-purple-300 rounded-[0.6875rem]">
                <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
              </div>
            </div>
            <div className="items-center flex gap-2.5 pt-[11px] pr-[14px] pb-[11px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="w-3 h-3 bg-purple-300 rounded-md"></div>
              <div className="grow basis-[0%]">개인 일정</div>
              <div className="relative w-[38px] h-[22px] bg-purple-300 rounded-[0.6875rem]">
                <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
              </div>
            </div>
            <div className="items-center flex gap-2.5 pt-[11px] pr-[14px] pb-[11px] pl-[14px]">
              <div className="w-3 h-3 bg-purple-300 rounded-md"></div>
              <div className="grow basis-[0%]">가족 캘린더</div>
              <div className="relative w-[38px] h-[22px] bg-purple-50 rounded-[0.6875rem]">
                <div className="absolute w-[18px] h-[18px] left-[2px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
              </div>
            </div>
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

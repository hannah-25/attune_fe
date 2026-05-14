import React from 'react';

export default function NotificationSettingsPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-100  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
          <div className="items-center flex justify-between">
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fecc79c56d83d223eb08c89b79b70e84caf9360dd.svg?generation=1778677419880265&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-bold text-sm">알림 설정</div>
          </div>
        </div>
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
            <div className="font-bold text-gray-600">
              전체 알림
            </div>
            <div className="items-center flex mt-[6px] gap-2.5">
              <div className="grow font-extrabold basis-[0%] text-lg" style={{"fontFamily":"NanumSquare, system-ui"}}>
                받기
              </div>
              <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">
              카테고리별
            </div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
              <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                <div className="grow basis-[0%]">
                  <div className="font-semibold">복약 알림</div>
                  <div className="mt-[2px] text-gray-600 text-xs">하루 평균 2-3건</div>
                </div>
                <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                  <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                </div>
              </div>
              <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                <div className="w-2 h-2 bg-purple-500 rounded-sm"></div>
                <div className="grow basis-[0%]">
                  <div className="font-semibold">주간 리포트</div>
                  <div className="mt-[2px] text-gray-600 text-xs">월요일 아침</div>
                </div>
                <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                  <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                </div>
              </div>
              <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                <div className="grow basis-[0%]">
                  <div className="font-semibold">상담 알림</div>
                  <div className="mt-[2px] text-gray-600 text-xs">하루 전 · 1시간 전</div>
                </div>
                <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                  <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                </div>
              </div>
              <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                <div className="grow basis-[0%]">
                  <div className="font-semibold">커뮤니티</div>
                  <div className="mt-[2px] text-gray-600 text-xs">댓글·공감</div>
                </div>
                <div className="relative w-[38px] h-[22px] bg-purple-50 rounded-[0.6875rem]">
                  <div className="absolute w-[18px] h-[18px] left-[2px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                </div>
              </div>
              <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px]">
                <div className="w-2 h-2 bg-[rgb(138,_131,_152)] rounded-sm"></div>
                <div className="grow basis-[0%]">
                  <div className="font-semibold">마케팅·이벤트</div>
                  <div className="mt-[2px] text-gray-600 text-xs">월 1-2회</div>
                </div>
                <div className="relative w-[38px] h-[22px] bg-purple-50 rounded-[0.6875rem]">
                  <div className="absolute w-[18px] h-[18px] left-[2px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">
              방해 금지
            </div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
              <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                <div className="grow font-semibold basis-[0%]">
                  야간 모드
                </div>
                <div className="mr-[6px] text-gray-600">
                  22:00 — 07:00
                </div>
                <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                  <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                </div>
              </div>
              <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px]">
                <div className="grow font-semibold basis-[0%]">
                  방해 금지 시간 제외
                </div>
                <div className="mr-[6px] text-gray-600">
                  중요 복약
                </div>
                <div className="overflow-hidden w-[11px] h-[11px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc7cea99060a480d5e2826ffe0e1a60dac4080b20.svg?generation=1778677419900928&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

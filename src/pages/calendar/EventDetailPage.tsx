import React from 'react';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';

const EVENT_DETAIL = {
  category: '상담',
  source: 'Google 캘린더 연동',
  title: '정신건강의학과\n정기 진료',
  when: '5월 13일 화 · 14:00 — 14:40',
  where: '청담심리상담센터',
  alarm: '30분 전 · 1시간 전',
  repeat: '월 1회',
};

export default function EventDetailPage() {
  return (
    <div
      className="w-full h-dvh bg-purple-100  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          left={<HeaderIconButton src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb7c467a84d7bdfd6c40db4d7610ae2cacb0312cf.svg?generation=1778677416599644&alt=media" />}
          right={<HeaderIconButton src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F475b6a4f82b963544d4c155b022adc602cc4d023.svg?generation=1778677416696966&alt=media" />}
        />
        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-4 pl-4">
          <div className="items-center flex mb-[14px] gap-2">
            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block">{EVENT_DETAIL.category}</span>
            </div>
            <div className="text-gray-600 text-xs">
              {EVENT_DETAIL.source}
            </div>
          </div>
          <div className="font-extrabold mb-[14px] text-3xl leading-[35px] whitespace-pre-line" style={{"fontFamily":"NanumSquare, system-ui"}}>
            {EVENT_DETAIL.title}
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-start flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="font-semibold w-[60px] text-gray-600">언제</div>
              <div className="grow basis-[0%]">{EVENT_DETAIL.when}</div>
            </div>
            <div className="items-start flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="font-semibold w-[60px] text-gray-600">어디서</div>
              <div className="grow basis-[0%]">{EVENT_DETAIL.where}</div>
            </div>
            <div className="items-start flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="font-semibold w-[60px] text-gray-600">알림</div>
              <div className="grow basis-[0%]">{EVENT_DETAIL.alarm}</div>
            </div>
            <div className="items-start flex pt-3 pr-[14px] pb-3 pl-[14px]">
              <div className="font-semibold w-[60px] text-gray-600">반복</div>
              <div className="grow basis-[0%]">{EVENT_DETAIL.repeat}</div>
            </div>
          </div>
          <div className="font-bold text-gray-600 pt-4 pr-1 pb-1.5 pl-1">
            메모
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
            <div className="text-gray-400 text-sm">메모 없음</div>
          </div>
          <div className="flex mt-4 gap-2">
            <div className="items-center flex grow font-bold justify-center h-[50px] border-gray-900 border basis-[0%] text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
              <span className="block">수정</span>
            </div>
            <div className="items-center flex grow font-bold justify-center h-[50px] bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white basis-[0%] text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
              <span className="block">상담 준비</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

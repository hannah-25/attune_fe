import React from 'react';
import { formatFullDateTime } from '@/lib/date';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';

const now = new Date();
const startDefault = formatFullDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0));
const endDefault = formatFullDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0));

export default function NewEventPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="새 일정"
          left={<HeaderIconButton src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd79c2e541070847ef9bbaaa2ba1496f075cbb058.svg?generation=1778677416688876&alt=media" />}
          right={
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="font-bold text-white bg-purple-500 px-3 py-1 rounded-lg">저장</div>
              </div>
            </div>
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-4 pl-4">
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
            <input
              placeholder="제목"
              className="w-full font-bold text-base bg-transparent outline-none placeholder:text-gray-300 mb-2"
              style={{ fontFamily: "NanumSquare, system-ui" }}
            />
            <input
              placeholder="위치 추가"
              className="w-full text-sm text-gray-600 bg-transparent outline-none placeholder:text-gray-300"
            />
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="grow font-semibold basis-[0%]">종일</div>
              <div className="relative w-[38px] h-[22px] bg-purple-50 rounded-[0.6875rem]">
                <div className="absolute w-[18px] h-[18px] left-[2px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
              </div>
            </div>
            <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="grow font-semibold basis-[0%]">시작</div>
              <div className="text-gray-600">{startDefault}</div>
            </div>
            <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="grow font-semibold basis-[0%]">종료</div>
              <div className="text-gray-600">{endDefault}</div>
            </div>
            <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px]">
              <div className="grow font-semibold basis-[0%]">반복</div>
              <div className="text-gray-600">안 함</div>
            </div>
          </div>
          <div>
            <div className="font-bold mb-[6px] text-gray-600">
              카테고리
            </div>
            <div className="flex flex-wrap gap-1.5">
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">상담</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-700 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">업무</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">복약</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-700 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">개인</div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-white border border-gray-300 text-gray-600 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">+ 새 분류</div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="grow font-semibold basis-[0%]">알림</div>
              <div className="text-gray-600">없음</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fcd9b488c97d95c8b78b422e04f658c2cc6aa1a03.svg?generation=1778677416685231&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="grow font-semibold basis-[0%]">위치</div>
              <div className="text-gray-600">추가</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fdf73d4774c6f7327c8ad736a4ec91a37128919ab.svg?generation=1778677416726157&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px]">
              <div className="grow font-semibold basis-[0%]">메모</div>
              <div className="text-gray-600">추가</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F8a6c4d23a5e4d6c2436e7637e387e4bd7996730f.svg?generation=1778677416713101&amp;alt=media" className="block size-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

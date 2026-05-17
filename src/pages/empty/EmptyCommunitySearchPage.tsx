import React from 'react';
import logoImage from '@src/imports/logo.png';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

export default function EmptyCommunitySearchPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="경험 공유"
          left={<HeaderIconButton src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F58fb2171c8e1e8d4620d12371f2c857d3f9bc06a.svg?generation=1778677419299929&alt=media" />}
        />
        <div className="pt-0 pr-4 pb-2 pl-4">
          <div className="items-center flex bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] gap-2 p-[10px] rounded-[0.875rem]">
            <div className="overflow-hidden w-[14px] h-[14px]">
              <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa531887dd688406d037c6913b8808b9c4141813a.svg?generation=1778677419332244&amp;alt=media" className="block size-full" />
            </div>
            <div className="grow font-bold basis-[0%]">
              &quot;주말 약 쉬기&quot;
            </div>
            <div className="items-center flex justify-center w-7 h-7 bg-gray-100 rounded-[0.875rem]">
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F96f65ceee7d22efcca2adc2e46c0399576b96b96.svg?generation=1778677419358174&amp;alt=media" className="block size-full" />
              </div>
            </div>
          </div>
        </div>
        <ScrollArea className="items-center flex flex-col justify-center text-center gap-[14px] pt-5 px-6">
          <div className="flex items-center justify-center text-center w-24 h-24">
            <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
          </div>
          <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{ fontFamily: "NanumSquare, system-ui" }}>
            <span className="text-center">아직 비슷한 이야기가 없어요</span>
          </div>
          <div className="text-center text-gray-600 leading-[20.15px] max-w-60">
            <span className="text-center">첫 글을 남겨보면 어떨까요? 비슷한 경험을 가진 분들이 답을 줄 수도 있어요.</span>
          </div>
          <div className="flex flex-wrap justify-center text-center mt-1 gap-1.5">
            <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block text-center">관련 · 콘서타</span>
            </div>
            <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block text-center">관련 · 약 휴식</span>
            </div>
          </div>
          <div className="text-center h-1"></div>
          <div className="items-center flex font-bold justify-center text-center h-[50px] bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[200px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
            <div className="overflow-hidden text-center w-[13px] h-[13px]">
              <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9ad6e44aa94a072b9df2689dc321e5f682009317.svg?generation=1778677419429995&amp;alt=media" className="block size-full" />
            </div>
            <span className="block text-center ml-[6px]">
              <span className="text-center">이 주제로 글쓰기</span>
            </span>
          </div>
          <div className="items-center flex font-bold justify-center text-center h-11 text-sm tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.375rem]">
            <span className="block text-center">전체 글 둘러보기</span>
          </div>
        </ScrollArea>
        <TabBar active="커뮤니티" />
      </div>
    </div>
  );
}

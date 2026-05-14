import React from 'react';
import { TabBar } from '@/components/TabBar';

export default function CommunityFeedPage() {
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
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd50bde0e53580b90a7675bb1533c3628f89ac064.svg?generation=1778677418054080&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-bold text-sm">경험 공유</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa1d93193446d76a49e64b9927201d303b3a37082.svg?generation=1778677418066041&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex overflow-auto gap-1.5 pt-0 pr-4 pb-2 pl-4">
          <div className="font-bold whitespace-nowrap bg-[rgb(31,_27,_46)] text-white pt-1.5 pr-3 pb-1.5 pl-3 rounded-[0.875rem]">전체</div>
          <div className="font-bold whitespace-nowrap bg-white shadow-[rgba(0,0,0,0.05)_0px_1px_4px_0px] pt-1.5 pr-3 pb-1.5 pl-3 rounded-[0.875rem]">콘서타</div>
          <div className="font-bold whitespace-nowrap bg-white shadow-[rgba(0,0,0,0.05)_0px_1px_4px_0px] pt-1.5 pr-3 pb-1.5 pl-3 rounded-[0.875rem]">스트라테라</div>
          <div className="font-bold whitespace-nowrap bg-white shadow-[rgba(0,0,0,0.05)_0px_1px_4px_0px] pt-1.5 pr-3 pb-1.5 pl-3 rounded-[0.875rem]">아데랄</div>
          <div className="font-bold whitespace-nowrap bg-white shadow-[rgba(0,0,0,0.05)_0px_1px_4px_0px] pt-1.5 pr-3 pb-1.5 pl-3 rounded-[0.875rem]">일반</div>
        </div>
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-2.5 pt-1 pr-4 pb-[100px] pl-4">
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
            <div className="items-center flex mb-[6px] gap-1.5">
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">콘서타</div>
              <div className="font-bold text-gray-500 text-xs">익명 · 2시간 전</div>
            </div>
            <div className="font-bold leading-[18.2px]">콘서타 1주차 후기 — 아침 식욕이 너무 없어요</div>
            <div className="mt-1 text-gray-600 leading-normal">비슷한 분들 어떻게 견디고 계신가요?</div>
            <div className="flex font-bold mt-2 text-gray-500 text-xs gap-3">
              <span className="items-center flex gap-1">
                <div className="overflow-hidden w-[10px] h-[10px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc066f77fe099dc06ec1d9d71a1dd49ad735337f5.svg?generation=1778677418074333&amp;alt=media" className="block size-full" />
                </div>
                12
              </span>
              <span className="items-center flex gap-1">
                <div className="overflow-hidden w-2 h-2">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ffa27671cf7a58eb1d69be0c24922ebe12068820e.svg?generation=1778677418074395&amp;alt=media" className="block size-full" />
                </div>
                <span className="block">댓글</span>
                8
              </span>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
            <div className="items-center flex mb-[6px] gap-1.5">
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">스트라테라</div>
              <div className="font-bold text-gray-500 text-xs">루나 · 5시간 전</div>
            </div>
            <div className="font-bold leading-[18.2px]">스트라테라로 바꾼 지 한달</div>
            <div className="mt-1 text-gray-600 leading-normal">확실히 점심 이후 컨디션이 안정적이에요</div>
            <div className="flex font-bold mt-2 text-gray-500 text-xs gap-3">
              <span className="items-center flex gap-1">
                <div className="overflow-hidden w-[10px] h-[10px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F026056801d9edc661de42c35aeb65d56b2669708.svg?generation=1778677418047862&amp;alt=media" className="block size-full" />
                </div>
                24
              </span>
              <span className="items-center flex gap-1">
                <div className="overflow-hidden w-2 h-2">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6a1e1feb9c38bab93b9179da531778584800c4c4.svg?generation=1778677418138420&amp;alt=media" className="block size-full" />
                </div>
                <span className="block">댓글</span>
                14
              </span>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
            <div className="items-center flex mb-[6px] gap-1.5">
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">일반</div>
              <div className="font-bold text-gray-500 text-xs">익명 · 어제</div>
            </div>
            <div className="font-bold leading-[18.2px]">약 먹고 졸린 분 계신가요?</div>
            <div className="mt-1 text-gray-600 leading-normal">오후 2시쯤 너무 졸려서 일을 못하겠어요...</div>
            <div className="flex font-bold mt-2 text-gray-500 text-xs gap-3">
              <span className="items-center flex gap-1">
                <div className="overflow-hidden w-[10px] h-[10px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F069bfac8474d97299e3b30492cfd8e4f8ff3d45d.svg?generation=1778677418152204&amp;alt=media" className="block size-full" />
                </div>
                7
              </span>
              <span className="items-center flex gap-1">
                <div className="overflow-hidden w-2 h-2">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Feaf51371d3f19bd29039b829ebcc8a9e0182dbcf.svg?generation=1778677418137879&amp;alt=media" className="block size-full" />
                </div>
                <span className="block">댓글</span>
                3
              </span>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
            <div className="items-center flex mb-[6px] gap-1.5">
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">일반</div>
              <div className="font-bold text-gray-500 text-xs">제이 · 어제</div>
            </div>
            <div className="font-bold leading-[18.2px]">처음 진료 받으러 가는데 너무 떨려요</div>
            <div className="mt-1 text-gray-600 leading-normal">경험담 들려주실 분 있을까요?</div>
            <div className="flex font-bold mt-2 text-gray-500 text-xs gap-3">
              <span className="items-center flex gap-1">
                <div className="overflow-hidden w-[10px] h-[10px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9fd2528ba8379cdb6894826f9c84b0eb9b73b4b1.svg?generation=1778677418179649&amp;alt=media" className="block size-full" />
                </div>
                18
              </span>
              <span className="items-center flex gap-1">
                <div className="overflow-hidden w-2 h-2">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6cdfe483eda449d1514ecf2e225ced5d59dad218.svg?generation=1778677418178106&amp;alt=media" className="block size-full" />
                </div>
                <span className="block">댓글</span>
                22
              </span>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
            <div className="items-center flex mb-[6px] gap-1.5">
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">콘서타</div>
              <div className="font-bold text-gray-500 text-xs">익명 · 2일 전</div>
            </div>
            <div className="font-bold leading-[18.2px]">콘서타 27mg 증량 후기</div>
            <div className="mt-1 text-gray-600 leading-normal">집중력은 늘었지만 잠이 잘 안와요</div>
            <div className="flex font-bold mt-2 text-gray-500 text-xs gap-3">
              <span className="items-center flex gap-1">
                <div className="overflow-hidden w-[10px] h-[10px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fcb1ebfde02849925daf22f8dceb1c58376065678.svg?generation=1778677418215553&amp;alt=media" className="block size-full" />
                </div>
                9
              </span>
              <span className="items-center flex gap-1">
                <div className="overflow-hidden w-2 h-2">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F231a8884b67a8e4ff3b2b52bb56cf1fe3f160cdc.svg?generation=1778677418221542&amp;alt=media" className="block size-full" />
                </div>
                <span className="block">댓글</span>
                5
              </span>
            </div>
          </div>
        </div>
        <div className="items-center flex font-bold absolute h-12 right-4 bottom-[88px] bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.2)_0px_8px_22px_0px] text-white text-sm gap-1.5 pt-0 pr-[18px] pb-0 pl-[18px] z-[25] rounded-3xl">
          <div className="overflow-hidden w-[14px] h-[14px]">
            <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fefb65dd04b728dd2a8742de28409d0e279ffaefe.svg?generation=1778677418296855&amp;alt=media" className="block size-full" />
          </div>
          <span className="block">글쓰기</span>
        </div>
        <TabBar active="커뮤니티" />
      </div>
    </div>
  );
}

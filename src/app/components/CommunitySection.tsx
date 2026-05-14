import React from 'react';
import { TabBar } from './TabBar';

export function CommunitySection() {
  return (
    <section className="pt-1 pr-0 pb-0 pl-0">
      <header className="items-start flex mb-4 gap-4 pt-0 pr-1 pb-5 pl-1 border-b" style={{"borderBottomColor":"var(--gray-400)"}}>
        <div className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-[0]" style={{"fontFamily":"NanumSquare, system-ui"}}>⑨</div>
        <div>
          <h2 className="font-bold mb-1 text-2xl tracking-tight leading-tight" style={{"fontFamily":"NanumSquare, system-ui"}}>커뮤니티 · 공지</h2>
          <p className="text-gray-600 text-xs leading-tight">REQ-BOARD-01~03 · 공지사항 · 경험 공유 게시판</p>
        </div>
        <div className="self-start font-bold ml-auto whitespace-nowrap bg-gray-50 border-gray-400 border text-gray-500 text-xs pt-1.5 pr-3 pb-1.5 pl-3 shrink-[0] rounded-full">4 screens</div>
      </header>
      <div className="grid justify-center gap-6 gap-x-7" style={{"gridTemplateColumns":"repeat(3, 320px)"}}>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 1 / 2 / 2"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F11168dda22f4982590bfe6e38842d8d8da90e0ff.svg?generation=1778677417792456&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F2fb96eb3d293c4d79cef2186468c54618c100c09.svg?generation=1778677417807122&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6d07fc7b7d550d443283422ac15fea3de29aaa18.svg?generation=1778677417828465&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">공지사항</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F54801ab4fa8db759bc53fa6b9af4ca068dee6da9.svg?generation=1778677417852825&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-2 pt-0 pr-4 pb-[100px] pl-4">
                  <div className="items-center flex bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] gap-2.5 p-3 rounded-[1.125rem]">
                    <div className="items-center flex justify-center w-[26px] h-[26px] bg-white rounded-[0.8125rem]">
                      <div className="overflow-hidden w-3 h-3">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb29419fe5049084df816425a309c1fc382ccbb0e.svg?generation=1778677417885099&amp;alt=media" className="block size-full" />
                      </div>
                    </div>
                    <div className="grow basis-[0%]">
                      <div className="font-extrabold">
                        [중요] 개인정보 처리방침 개정 안내
                      </div>
                      <div className="mt-[2px] text-gray-600 text-xs">
                        30일 내 명시적 거부가 없으면 동의로 간주
                      </div>
                    </div>
                    <div className="overflow-hidden w-[11px] h-[11px]">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0d624e7072e06ed07c07f6aafc3c44b136bfc2b6.svg?generation=1778677417884149&amp;alt=media" className="block size-full" />
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
                    <div className="font-semibold">v2.1 업데이트 — 캘린더 연동 추가</div>
                    <div className="mt-1 text-gray-600 text-xs">5월 10일</div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
                    <div className="font-semibold">서버 점검 안내 (5/15 02:00 ~ 04:00)</div>
                    <div className="mt-1 text-gray-600 text-xs">5월 9일</div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
                    <div className="font-semibold">상담 기록 PDF 내보내기 베타 오픈</div>
                    <div className="mt-1 text-gray-600 text-xs">5월 2일</div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
                    <div className="font-semibold">이용약관 일부 개정 안내</div>
                    <div className="mt-1 text-gray-600 text-xs">4월 28일</div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
                    <div className="font-semibold">v2.0 정식 출시 — 주간 리포트 추가</div>
                    <div className="mt-1 text-gray-600 text-xs">4월 15일</div>
                  </div>
                </div>
                <TabBar active="커뮤니티" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">공지사항 · BOARD-01-r1</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 2 / 2 / 3"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Feac1fa0f6cf18838f87ca435f70f5e6525df8a96.svg?generation=1778677418020180&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F4198be971fe471d50496a28dcd0fe78835e68330.svg?generation=1778677418012190&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
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
</div>12                                        </span>
                      <span className="items-center flex gap-1">
<div className="overflow-hidden w-2 h-2">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ffa27671cf7a58eb1d69be0c24922ebe12068820e.svg?generation=1778677418074395&amp;alt=media" className="block size-full" />
</div><span className="block">댓글</span>8                                        </span>
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
</div>24                                        </span>
                      <span className="items-center flex gap-1">
<div className="overflow-hidden w-2 h-2">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6a1e1feb9c38bab93b9179da531778584800c4c4.svg?generation=1778677418138420&amp;alt=media" className="block size-full" />
</div><span className="block">댓글</span>14                                        </span>
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
</div>7                                        </span>
                      <span className="items-center flex gap-1">
<div className="overflow-hidden w-2 h-2">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Feaf51371d3f19bd29039b829ebcc8a9e0182dbcf.svg?generation=1778677418137879&amp;alt=media" className="block size-full" />
</div><span className="block">댓글</span>3                                        </span>
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
</div>18                                        </span>
                      <span className="items-center flex gap-1">
<div className="overflow-hidden w-2 h-2">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6cdfe483eda449d1514ecf2e225ced5d59dad218.svg?generation=1778677418178106&amp;alt=media" className="block size-full" />
</div><span className="block">댓글</span>22                                        </span>
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
</div>9                                        </span>
                      <span className="items-center flex gap-1">
<div className="overflow-hidden w-2 h-2">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F231a8884b67a8e4ff3b2b52bb56cf1fe3f160cdc.svg?generation=1778677418221542&amp;alt=media" className="block size-full" />
</div><span className="block">댓글</span>5                                        </span>
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
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">경험 공유 목록 · BOARD-02-ar1</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 3 / 2 / 4"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F2b54faf9b9d3d802b6227655b72d489bb71f5dcf.svg?generation=1778677418328008&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff694de7083a84ca69edc3e1f0285db359b4af245.svg?generation=1778677418360591&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd77b1743156ca690dcd7dbf0664fde91d06c07f9.svg?generation=1778677418382924&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm"></div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb22a03c0a3fd06b85a7db92a93b2d633dc42599c.svg?generation=1778677418394861&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-20 pl-4">
                  <div className="items-center flex mb-[10px] gap-1.5">
                    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                      <span className="block">콘서타</span>
                    </div>
                    <div className="font-bold text-gray-500 text-xs">
                      익명 · 2시간 전
                    </div>
                  </div>
                  <div className="font-extrabold mb-3 text-lg leading-[23.4px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
                    콘서타 1주차 후기 — 아침 식욕이 너무 없어요
                  </div>
                  <div className="flex flex-col gap-[9px]">
                    <div className="w-[92%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                    <div className="w-[78%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                    <div className="w-[85%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                    <div className="w-[60%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                    <div className="w-[40%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                  </div>
                  <div className="flex mt-4 gap-2">
                    <div className="items-center flex grow justify-center bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-1.5 p-2 rounded-[0.875rem]">
                      <div className="overflow-hidden w-3 h-3">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd56f1bf80e3434cc00cc898c29df9c362f23fc35.svg?generation=1778677418392682&amp;alt=media" className="block size-full" />
                      </div>
                      <div className="font-bold">
                        공감 12
                      </div>
                    </div>
                    <div className="items-center flex grow justify-center bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-1.5 p-2 rounded-[0.875rem]">
                      <div className="overflow-hidden w-[10px] h-[10px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fdf2703919175f9503d8dbe6dc130030c0dfd0974.svg?generation=1778677418398252&amp;alt=media" className="block size-full" />
                      </div>
                      <div className="font-bold">
                        댓글 8
                      </div>
                    </div>
                  </div>
                  <div className="h-px mt-4 mb-4 bg-purple-50"></div>
                  <div className="font-bold mb-2 text-gray-600">
                    댓글 8
                  </div>
                  <div className="flex mb-[10px] gap-2">
                    <div className="w-7 h-7 bg-[rgb(208,_201,_189)] shrink-[0] rounded-[0.875rem]"></div>
                    <div className="grow basis-[0%]">
                      <div className="items-center flex gap-1.5">
                        <div className="font-bold">루나</div>
                        <div className="text-gray-500 text-xs">
                          · 방금
                        </div>
                      </div>
                      <div className="mt-[3px] leading-normal">저도 같은 증상이에요. 견과류 한 줌만 챙겨드세요.</div>
                    </div>
                  </div>
                  <div className="flex mb-[10px] gap-2">
                    <div className="w-7 h-7 bg-purple-300 shrink-[0] rounded-[0.875rem]"></div>
                    <div className="grow basis-[0%]">
                      <div className="items-center flex gap-1.5">
                        <div className="font-bold">글쓴이</div>
                        <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                          <span className="block">글쓴이</span>
                        </div>
                        <div className="text-gray-500 text-xs">
                          · 방금
                        </div>
                      </div>
                      <div className="mt-[3px] leading-normal">감사합니다! 한번 시도해볼게요</div>
                    </div>
                  </div>
                  <div className="flex mb-[10px] gap-2">
                    <div className="w-7 h-7 bg-[rgb(208,_201,_189)] shrink-[0] rounded-[0.875rem]"></div>
                    <div className="grow basis-[0%]">
                      <div className="items-center flex gap-1.5">
                        <div className="font-bold">익명</div>
                        <div className="text-gray-500 text-xs">
                          · 방금
                        </div>
                      </div>
                      <div className="mt-[3px] leading-normal">오전엔 견디다가 점심 좀 일찍 드세요. 약효 끝나갈 때쯤이요</div>
                    </div>
                  </div>
                </div>
                <div className="items-center flex absolute left-3 right-3 bottom-4 backdrop-blur-[20px] backdrop-saturate-[1.8] bg-white/85 border-white/70 border shadow-[rgba(60,40,90,0.12)_0px_10px_26px_0px] gap-1.5 p-[6px] rounded-3xl">
                  <div className="grow basis-[0%] pt-1.5 pr-3 pb-1.5 pl-3">
                    <div className="w-[40%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                  </div>
                  <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                    <span className="block">익명</span>
                  </div>
                  <div className="items-center flex justify-center w-9 h-9 bg-[rgb(31,_27,_46)] text-white rounded-[1.125rem]">
                    <div className="overflow-hidden w-3 h-3">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F3caa747b918bbc5b5d58d1adcb49875f2ddc837b.svg?generation=1778677418442128&amp;alt=media" className="block size-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">글 상세 + 댓글</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"2 / 1 / 3 / 2"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Faad13594332f5e5c54e7adcd6db56e7e59175346.svg?generation=1778677418459267&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9f1bfc930cf5dc279a978e32a6ae8a29c8b8b505.svg?generation=1778677418457615&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F748bff70642e790d3da4f67ab0478b2847c249a0.svg?generation=1778677418486773&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">새 글</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="font-bold text-white bg-[rgb(31,27,46)] px-3 py-1 rounded-lg">
                          발행
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-2 pl-4">
                  <div className="flex mb-3 gap-1.5">
                    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
                      <span className="block">콘서타</span>
                    </div>
                    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-700 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
                      <span className="block">+ 카테고리</span>
                    </div>
                    <div className="grow basis-[0%]"></div>
                    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-[rgb(185, 166, 255)] border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                      <span className="block">익명</span>
                    </div>
                  </div>
                  <div className="font-bold mb-1 text-lg" style={{"fontFamily":"NanumSquare, system-ui"}}>
                    제목
                  </div>
                  <div className="w-[68%] h-[9px] bg-purple-50 rounded-[0.5625rem]"></div>
                  <div className="h-[14px]"></div>
                  <div className="flex flex-col gap-[9px]">
                    <div className="w-[92%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                    <div className="w-[78%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                    <div className="w-[85%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                    <div className="w-[40%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">글쓰기</figcaption>
        </figure>
      </div>
    </section>
  );
}

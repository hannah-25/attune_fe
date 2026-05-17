import React from 'react';
import { TabBar } from './TabBar';

export function JournalSection() {
  return (
    <section className="pt-1 pr-0 pb-0 pl-0">
      <header className="items-start flex mb-4 gap-4 pt-0 pr-1 pb-5 pl-1 border-b" style={{"borderBottomColor":"var(--gray-400)"}}>
        <div className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-[0]" style={{"fontFamily":"NanumSquare, system-ui"}}>④</div>
        <div>
          <h2 className="font-bold mb-1 text-2xl tracking-tight leading-tight" style={{"fontFamily":"NanumSquare, system-ui"}}>일지 — 태그 체크 (변형 3종)</h2>
          <p className="text-gray-600 text-xs leading-tight">REQ-LOG-01~06 · JRN-002~011 — 감정·증상·부작용·업무·수면·식사·목표·메모</p>
        </div>
        <div className="self-start font-bold ml-auto whitespace-nowrap bg-gray-50 border-gray-400 border text-gray-500 text-xs pt-1.5 pr-3 pb-1.5 pl-3 shrink-[0] rounded-full">4 screens</div>
      </header>
      <div className="grid justify-center gap-6 gap-x-7" style={{"gridTemplateColumns":"repeat(2, 320px)"}}>
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
                    <img src="/icons/8a9bc5a2cc0a37ac56f66295d0817bfcd98280f6.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/5ef9cde60da4c595c6321b94fb03d406e013f430.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="/icons/2a388ad72a45fea2c1c099f07fd840545826255d.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">5월 13일 화</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="/icons/ff088739f488f0ef39daa144b05d6bab96fcf844.svg" className="block size-full" />
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
                        <img src="/icons/450f132a3b66e58d29e81cd69f97bf150b7ea302.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
<div className="overflow-hidden w-[10px] h-[10px]">
                          <img src="/icons/dff531f2ba72287c8710d8c7bda88e2b9ac74b4d.svg" className="block size-full" />
</div>집중 어려움                                        </div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
<div className="overflow-hidden w-[10px] h-[10px]">
                          <img src="/icons/8f9a55689cee3854aa4545497a17d0eca987ea1d.svg" className="block size-full" />
</div>멍해짐                                        </div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">짜증</div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
<div className="overflow-hidden w-[10px] h-[10px]">
                          <img src="/icons/ce4c999ff9f1c86a912948cda308c760bdd13247.svg" className="block size-full" />
</div>불안                                        </div>
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
                        <img src="/icons/7db9a3a83b10d767323b3ad4d6fa7b7452792873.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">두통</div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
<div className="overflow-hidden w-[10px] h-[10px]">
                          <img src="/icons/122522b2a3035025818884670597604055c74b67.svg" className="block size-full" />
</div>식욕 저하                                        </div>
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
                        <img src="/icons/93f4ed9952d5d35925418a97c665b2ff4a14bdcc.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
<div className="overflow-hidden w-[10px] h-[10px]">
                          <img src="/icons/caae3d171f4160e534d41ece47a0611c2d7a841b.svg" className="block size-full" />
</div>마감 놓침                                        </div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">약속 잊음</div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-800 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">물건 잃어버림</div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-transparent border text-white gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
<div className="overflow-hidden w-[10px] h-[10px]">
                          <img src="/icons/a57ab3faf1d5f5c01acdb949b9a3ab987741dfc6.svg" className="block size-full" />
</div>일을 잘게 못 쪼갬                                        </div>
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
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">A · 한 화면 전체 그리드</figcaption>
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
                    <img src="/icons/092f1d2b250fa9fdb8389bf204522adb400caa99.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/769138686d4878c587245f895be78918c00e3155.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="/icons/5596f8f2c2f41bd0a4f5995e89c038339d171079.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">오늘 일지</div>
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
                            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                              <span className="block">😰 불안</span>
                            </div>
                            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
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
                            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
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
                            <div className="items-center inline-flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                              <span className="block">식욕 저하</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="items-center border-dashed flex font-bold mt-1 border-gray-400 border text-gray-600 gap-2 p-[14px] rounded-2xl">
                    <div className="overflow-hidden w-[14px] h-[14px]">
                      <img src="/icons/2119c34d184031b1023b5f47910171ad846b1874.svg" className="block size-full" />
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
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">C · 타임라인 스트림</figcaption>
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
                    <img src="/icons/9d8ea4c168e6a17db2a52e5f3b8d44c8c75e0d6e.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/44d2d9559ee157f782cb0de01ef379e67bdebbcf.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="/icons/0f148e246b2f2bb3a69872ea8396c06705d1c413.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">일지</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="/icons/f69b80758895256011eb548cf58375ba9863075c.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-0 pr-4 pb-1 pl-4">
                  <div className="items-center flex mb-2 gap-2">
                    <div className="overflow-hidden w-[14px] h-[14px]">
                      <img src="/icons/dc481ce5ba4d58b23a7460e5c99b3dfedea9c82a.svg" className="block size-full" />
                    </div>
                    <div className="font-bold text-lg" style={{"fontFamily":"NanumSquare, system-ui"}}>
                      2026년 5월
                    </div>
                    <div className="overflow-hidden w-[14px] h-[14px]">
                      <img src="/icons/7a6542fea4feea5b0aefcb93656c6349f537576b.svg" className="block size-full" />
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
                    <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 2 / 2 / 3"}}>화</div>
                    <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 4 / 2 / 5"}}>수</div>
                    <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 5 / 2 / 6"}}>목</div>
                    <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 6 / 2 / 7"}}>금</div>
                    <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 7 / 2 / 8"}}>토</div>
                  </div>
                  <div className="grid-cols-7 grid gap-1">
                    <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"1 / 1 / 2 / 2"}}></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"1 / 2 / 2 / 3"}}></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"1 / 2 / 2 / 3"}}></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"1 / 4 / 2 / 5"}}>1</div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"1 / 5 / 2 / 6"}}>2<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"1 / 6 / 2 / 7"}}>3<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"1 / 7 / 2 / 8"}}>4</div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 1 / 3 / 2"}}>5<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 2 / 3 / 3"}}>6<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 3 / 3 / 4"}}>7<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 4 / 3 / 5"}}>8<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 5 / 3 / 6"}}>9<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"2 / 6 / 3 / 7"}}>10</div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"2 / 7 / 3 / 8"}}>11<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"3 / 1 / 4 / 2"}}>12<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-extrabold justify-center relative bg-[rgb(31,_27,_46)] text-white rounded-xl" style={{"gridArea":"3 / 2 / 4 / 3"}}>13</div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"3 / 3 / 4 / 4"}}>14</div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"3 / 4 / 4 / 5"}}>15</div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"3 / 5 / 4 / 6"}}>16<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"3 / 6 / 4 / 7"}}>17<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"3 / 7 / 4 / 8"}}>18<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 1 / 5 / 2"}}>19<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 2 / 5 / 3"}}>20<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"4 / 3 / 5 / 4"}}>21</div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 4 / 5 / 5"}}>22<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 5 / 5 / 6"}}>23<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 6 / 5 / 7"}}>24<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"4 / 7 / 5 / 8"}}>25<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"5 / 1 / 6 / 2"}}>26<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative bg-purple-100 rounded-xl" style={{"gridArea":"5 / 2 / 6 / 3"}}>27<div className="absolute w-1 h-1 left-[50%] bottom-[3px] bg-[rgb(31,_27,_46)] translate-x-[-50%] rounded-xs"></div></div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"5 / 3 / 6 / 4"}}>28</div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"5 / 4 / 6 / 5"}}>29</div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"5 / 5 / 6 / 6"}}>30</div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative rounded-xl" style={{"gridArea":"5 / 6 / 6 / 7"}}>31</div>
                    <div className="items-center aspect-square flex font-semibold justify-center relative text-gray-500 opacity-[0.5] rounded-xl" style={{"gridArea":"5 / 7 / 6 / 8"}}></div>
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
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">일지 캘린더 · 기간 조회</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"2 / 2 / 3 / 3"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="/icons/7fc5257136e1dc0064cbe82c943b6145b09c5b71.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/6505d3ec50344f9f30ac84ff7604fe9b86052c10.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="/icons/bcac446ba747bd8f1ec89ed926d88e0f54b23c84.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">태그 관리</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="font-bold text-purple-500">
                          완료
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-6 pl-4">
                  <div className="flex gap-1 pt-1 pr-0 pb-3 pl-0">
                    <div className="grow font-bold text-center bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[0.875rem]">감정·증상</div>
                    <div className="grow font-bold text-center text-gray-600 basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[0.875rem]">부작용</div>
                    <div className="grow font-bold text-center text-gray-600 basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[0.875rem]">업무</div>
                    <div className="grow font-bold text-center text-gray-600 basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[0.875rem]">목표</div>
                  </div>
                  <div className="font-bold text-gray-600 text-xs pt-1 pr-1 pb-1.5 pl-1">
                    활성 (8)
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
                    <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="w-[10px] h-[10px] bg-purple-500 rounded-[0.3125rem]"></div>
                      <div className="grow basis-[0%]">집중 어려움</div>
                      <div className="text-gray-600 text-xs">
                        3월부터
                      </div>
                      <div className="font-bold text-gray-400">
                        비활성
                      </div>
                    </div>
                    <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="w-[10px] h-[10px] bg-purple-500 rounded-[0.3125rem]"></div>
                      <div className="grow basis-[0%]">멍해짐</div>
                      <div className="text-gray-600 text-xs">
                        3월부터
                      </div>
                      <div className="font-bold text-gray-400">
                        비활성
                      </div>
                    </div>
                    <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="w-[10px] h-[10px] bg-purple-500 rounded-[0.3125rem]"></div>
                      <div className="grow basis-[0%]">짜증</div>
                      <div className="text-gray-600 text-xs">
                        3월부터
                      </div>
                      <div className="font-bold text-gray-400">
                        비활성
                      </div>
                    </div>
                    <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="w-[10px] h-[10px] bg-purple-500 rounded-[0.3125rem]"></div>
                      <div className="grow basis-[0%]">불안</div>
                      <div className="text-gray-600 text-xs">
                        3월부터
                      </div>
                      <div className="font-bold text-gray-400">
                        비활성
                      </div>
                    </div>
                    <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3">
                      <div className="w-[10px] h-[10px] bg-purple-500 rounded-[0.3125rem]"></div>
                      <div className="grow basis-[0%]">무기력</div>
                      <div className="text-gray-600 text-xs">
                        3월부터
                      </div>
                      <div className="font-bold text-gray-400">
                        비활성
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-600 text-xs pt-4 pr-1 pb-1.5 pl-1">
                    비활성 (2)
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
                    <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 opacity-[0.6] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="w-[10px] h-[10px] bg-[rgb(208,_201,_189)] rounded-[0.3125rem]"></div>
                      <div className="grow basis-[0%]">두근거림</div>
                      <div className="font-bold text-purple-500">
                        활성화
                      </div>
                    </div>
                    <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 opacity-[0.6]">
                      <div className="w-[10px] h-[10px] bg-[rgb(208,_201,_189)] rounded-[0.3125rem]"></div>
                      <div className="grow basis-[0%]">졸림</div>
                      <div className="font-bold text-purple-500">
                        활성화
                      </div>
                    </div>
                  </div>
                </div>
                <div className="items-center flex font-bold absolute h-[50px] right-4 bottom-6 bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.18)_0px_8px_22px_0px] text-white text-sm gap-1.5 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.5625rem]">
                  <div className="overflow-hidden w-[14px] h-[14px]">
                    <img src="/icons/45b5c98660fdbad2a3fd50732df0b7dfbf18c395.svg" className="block size-full" />
                  </div>
                  <span className="block">새 태그</span>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">태그 관리</figcaption>
        </figure>
      </div>
    </section>
  );
}

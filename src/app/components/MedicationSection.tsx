import React from 'react';
import { CalendarDays, ChevronLeft, MoreHorizontal, Plus } from 'lucide-react';
import { TabBar } from './TabBar';

export function MedicationSection() {
  return (
    <section className="pt-1 pr-0 pb-0 pl-0">
      <header className="items-start flex mb-4 gap-4 pt-0 pr-1 pb-5 pl-1 border-b" style={{"borderBottomColor":"var(--gray-400)"}}>
        <div className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-[0]" style={{"fontFamily":"NanumSquare, system-ui"}}>⑤</div>
        <div>
          <h2 className="font-bold mb-1 text-2xl tracking-tight leading-tight" style={{"fontFamily":"NanumSquare, system-ui"}}>복약 관리</h2>
          <p className="text-gray-600 text-xs leading-tight">REQ-MED-01~06 · 등록·알림·이력·표준정보</p>
        </div>
        <div className="self-start font-bold ml-auto whitespace-nowrap bg-gray-50 border-gray-400 border text-gray-500 text-xs pt-1.5 pr-3 pb-1.5 pl-3 shrink-[0] rounded-full">5 screens</div>
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
                    <img src="/icons/1abd88647263f9031f76a0adaefed923aabb0db4.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/c6bd029e5c0861271d13df61fd90d04d74511a13.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <ChevronLeft className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="font-bold text-sm">복용 중인 약</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <Plus className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-[100px] pl-4">
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
                    <div className="font-bold text-gray-600 text-xs">
                      다음 복용까지
                    </div>
                    <div className="items-baseline flex mt-1 gap-1.5">
                      <div className="font-extrabold text-4xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
                        2:14
                      </div>
                      <div className="font-bold text-gray-500">
                        · 콘서타 18mg · 12:30
                      </div>
                    </div>
                    <div className="flex mt-3 gap-1.5">
                      <div className="items-center flex grow font-bold justify-center h-9 bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem]">
                        <span className="block">지금 복용</span>
                      </div>
                      <div className="items-center flex grow font-bold justify-center h-9 border-gray-900 border basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem]">
                        <span className="block">10분 미루기</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-600 pt-1 pr-1 pb-0 pl-1">
                    복용 중 (2)
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex gap-2.5">
                      <div className="items-center flex justify-center w-[38px] h-[38px] bg-purple-300 rounded-xl">
                        <div className="overflow-hidden w-[18px] h-[18px]">
                          <img src="/icons/f487caf883fee29fd8f5d6a6367147ff53ff6eeb.svg" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-bold text-sm">콘서타 18mg</div>
                        <div className="text-gray-600 text-xs">메틸페니데이트 · 2월 3일~</div>
                      </div>
                      <div className="relative w-[38px] h-[22px] bg-purple-300 rounded-[0.6875rem]">
                        <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                      </div>
                    </div>
                    <div className="items-center flex mt-3 bg-gray-100 text-gray-800 gap-1.5 pt-2 pr-[10px] pb-2 pl-[10px] rounded-xl">
<div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="/icons/5334f614b5607f110abfe488851205e977f22b14.svg" className="block size-full" />
</div>하루 2회 · 8:00, 12:30                                      </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex gap-2.5">
                      <div className="items-center flex justify-center w-[38px] h-[38px] bg-purple-500 rounded-xl">
                        <div className="overflow-hidden w-[18px] h-[18px]">
                          <img src="/icons/8fb8f0ff61b3f813a2a9b5e18b6950f525e506f3.svg" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-bold text-sm">스트라테라 40mg</div>
                        <div className="text-gray-600 text-xs">아토목세틴 · 4월 1일~</div>
                      </div>
                      <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                        <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                      </div>
                    </div>
                    <div className="items-center flex mt-3 bg-gray-100 text-gray-800 gap-1.5 pt-2 pr-[10px] pb-2 pl-[10px] rounded-xl">
<div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="/icons/363f99902730ebd698aff94492d5d4dc0e981bb1.svg" className="block size-full" />
</div>하루 1회 · 19:00                                      </div>
                  </div>
                  <div className="font-bold text-gray-600 pt-2 pr-1 pb-0 pl-1">
                    지난 약 (1)
                  </div>
                  <div className="bg-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex gap-2.5 opacity-[0.7]">
                      <div className="items-center flex justify-center w-[38px] h-[38px] bg-[rgb(208,_201,_189)] rounded-xl">
                        <div className="overflow-hidden w-[18px] h-[18px]">
                          <img src="/icons/82f6316729e2405770bf424ad5357aa78565cb47.svg" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-bold text-sm">
                          아데랄 10mg
                        </div>
                        <div className="text-gray-600 text-xs">
                          1월 14일 — 2월 28일
                        </div>
                      </div>
                      <div className="items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                        <span className="block">이력</span>
                      </div>
                    </div>
                  </div>
                </div>
                <TabBar active="약" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">복용 중인 약 · MED-001</figcaption>
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
                    <img src="/icons/fb13774eb304073e07c182f9363575e6b9e328f5.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/3cde30b1aaf5fb5feca5ec1d1ab272f86789d26a.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <ChevronLeft className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="font-bold text-sm">약 추가</div>
                    <div className="items-center flex justify-end min-w-11 h-11">
                      <div className="items-center flex font-bold justify-center h-9 bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_3px_0px_0px] text-white text-xs tracking-tight px-3 rounded-xl">
                        저장하기
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-6 pl-4">
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="font-semibold w-[84px] text-gray-600">약 이름</div>
                      <div className="grow font-semibold basis-[0%]">콘서타 18mg</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="/icons/ca02c8082b11cdd7efc3bd4ec920b1b2a09af1d9.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="font-semibold w-[84px] text-gray-600">용량/단위</div>
                      <div className="grow font-semibold basis-[0%]">18mg · 1정</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="/icons/f3b25369307edac67566499b953f3615e7f516fe.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="font-semibold w-[84px] text-gray-600">복용 시작일</div>
                      <div className="grow font-semibold basis-[0%]">2026.02.03</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="/icons/0604012b966035933a418367f12cddcc0b9c9044.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="font-semibold w-[84px] text-gray-600">복용 상태</div>
                      <div className="grow font-semibold basis-[0%]">복용 중</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="/icons/0a900ef9cde7b2d73c139c2b1ead895e998b927b.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
                      <div className="font-semibold w-[84px] text-gray-600">알림</div>
                      <div className="grow font-semibold basis-[0%]">하루 2회 · 08:00 / 12:30</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="/icons/70864686cfb51667bb85fbc36effb4d3a23d9b27.svg" className="block size-full" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="grow basis-[0%]">
                        <div className="font-semibold text-gray-700">요일 반복</div>
                        <div className="mt-1 text-gray-500 text-xs">선택한 요일마다 알려드려요</div>
                      </div>
                      <div className="relative w-[46px] h-[26px] bg-purple-500 shrink-0 rounded-[0.8125rem]">
                        <div className="absolute w-[22px] h-[22px] left-[22px] top-0.5 bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.6875rem]"></div>
                      </div>
                    </div>
                    <div className="pt-3 pr-[10px] pb-3 pl-[10px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="flex gap-1">
                        <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-300 text-white basis-[0%] rounded-xl">월</div>
                        <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-300 text-white basis-[0%] rounded-xl">화</div>
                        <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-300 text-white basis-[0%] rounded-xl">수</div>
                        <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-300 text-white basis-[0%] rounded-xl">목</div>
                        <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-300 text-white basis-[0%] rounded-xl">금</div>
                        <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-50 text-gray-600 basis-[0%] rounded-xl">토</div>
                        <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-50 text-gray-600 basis-[0%] rounded-xl">일</div>
                      </div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
                      <div className="grow basis-[0%]">
                        <div className="font-semibold text-gray-700">휴일에 복용</div>
                        <div className="mt-1 text-gray-500 text-xs">공휴일에는 알림을 쉬어요</div>
                      </div>
                      <div className="relative w-[46px] h-[26px] bg-gray-200 shrink-0 rounded-[0.8125rem]">
                        <div className="absolute w-[22px] h-[22px] left-0.5 top-0.5 bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.6875rem]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
                    <div className="text-gray-800 leading-normal">
                      <b className="font-bold">
                        표준 정보
                      </b>
                      를 함께 보여드려요 — 효능, 부작용, 혈중 농도 추이까지.
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">약 추가 · MED-001-C</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 3 / 2 / 4"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-950 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-white text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="/icons/11e6df68ca37631547a8a85f70cf0ed594d3ac7e.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/c96c697acd3cb9c92102257dd0b71f8f699a8b14.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="absolute left-0 top-0 right-0 bottom-0 pt-[70px] pr-0 pb-0 pl-0">
                  <div className="ml-[12px] mr-[12px] backdrop-blur-[28px] backdrop-saturate-[1.8] bg-white/12 border-white/20 border p-4 rounded-3xl">
                    <div className="items-center flex mb-[10px] gap-2.5">
                      <div className="items-center flex justify-center w-9 h-9 bg-purple-500 rounded-lg">
                        <div className="overflow-hidden w-[18px] h-[18px]">
                          <img src="/icons/5534b1eec38b1487b6a5ae5278ae9a3334c8cebf.svg" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-bold">
                          attune
                        </div>
                        <div className="text-white/60 text-xs">
                          지금 · 복용 알림
                        </div>
                      </div>
                    </div>
                    <div className="font-bold mb-1 text-sm">
                      콘서타 18mg 복용 시간이에요
                    </div>
                    <div className="mb-3 text-white/70">
                      오후 12:30에 1정 복용
                    </div>
                    <div className="items-center flex gap-2">
                      <div className="items-center flex font-extrabold justify-center h-11 bg-purple-300 shadow-[rgba(0,0,0,0.1)_0px_2px_0px_0px] text-purple-700 basis-[0%] text-sm gap-1.5 grow-[1.6] rounded-[1.375rem]">
                        <div className="overflow-hidden w-[14px] h-[14px]">
                          <img src="/icons/2348d6782ef2c773bb3d7f6f6753005c36ff4e76.svg" className="block size-full" />
                        </div>
                        <span className="block">복용</span>
                      </div>
                      <div className="items-center flex grow font-bold justify-center h-11 bg-white/14 border-white/18 border basis-[0%] rounded-[1.375rem]">
                        <span className="block">10분 후</span>
                      </div>
                      <div className="items-center flex font-semibold justify-center h-11 text-white/65 pt-0 pr-2 pb-0 pl-2">
                        <span className="block">건너뛰기</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-[14px] text-white/40 text-xs">
                    <span className="text-center">알림을 누르지 않아도 응답할 수 있어요</span>
                  </div>
                  <div className="absolute text-center left-0 right-0 bottom-20">
                    <div className="text-center opacity-[0.6]">
                      <span className="text-center">화요일, 5월 13일</span>
                    </div>
                    <div className="text-center text-[56px] leading-[56px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
                      <span className="text-center">12:30</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-white/50 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">복용 알림 (잠금화면) · MED-003</figcaption>
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
                    <img src="/icons/ce5ef0b5c33d319f503fb44b2fb16f260613d66d.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/047d54919e261e5da19751ad9660ab7906a98a74.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <ChevronLeft className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="font-bold text-sm">콘서타 18mg</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <MoreHorizontal className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
                    <div className="items-center flex gap-3">
                      <div className="items-center flex justify-center w-14 h-14 bg-white rounded-[1.125rem]">
                        <div className="overflow-hidden w-[26px] h-[26px]">
                          <img src="/icons/82fbda66cf3604653aa601ba1b04657d51b7af89.svg" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
                          콘서타 18mg
                        </div>
                        <div className="mt-[2px] text-gray-600">
                          메틸페니데이트 · 서방형
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex mb-[10px] gap-1.5">
                      <div className="font-bold">
                        혈중 농도 추이
                      </div>
                      <div className="grow basis-[0%]"></div>
                      <div className="text-gray-600 text-xs">
                        오늘 · 24시간
                      </div>
                    </div>
                    <div className="inline overflow-hidden w-full h-20">
                      <img src="/icons/41543b7a9b5b5e291515e6237df211289780a1d3.svg" className="inline w-full h-20" />
                    </div>
                    <div className="flex justify-between mt-1 text-gray-500 text-xs">
                      <div>06시</div>
                      <div>09시</div>
                      <div>12시</div>
                      <div>15시</div>
                      <div>18시</div>
                      <div>21시</div>
                      <div>24시</div>
                    </div>
                    <div className="flex mt-3 gap-[14px]">
                      <div className="items-center flex text-gray-600 text-xs gap-1">
                        <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                        <span className="block">복용 시점</span>
                      </div>
                      <div className="items-center flex text-gray-600 text-xs gap-1">
                        <div className="w-2 h-[2px] bg-purple-500 rounded-[1px]"></div>
                        <span className="block">예상 농도</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="font-bold mb-2">
                      효능
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-[92%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                      <div className="w-[78%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                      <div className="w-[55%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex mb-2 gap-1.5">
                      <div className="font-bold">
                        흔한 부작용
                      </div>
                      <div className="grow basis-[0%]"></div>
                      <div className="text-gray-500 text-xs">
                        * 식약처 자료
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">식욕 저하</div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">불면</div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">두통</div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">입마름</div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">두근거림</div>
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs leading-[17.6px] pt-1 pr-2 pb-1 pl-2">
                    출처: 식약처 의약품안전나라 · 한국임상연구원 가이드라인
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">표준 정보 + 혈중농도 · MED-005</figcaption>
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
                    <img src="/icons/09481d8f1ee6bfbd5cc2381680a6deadb1c52792.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/b57340d868e556a70373a2d9693df14bf6e50524.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <ChevronLeft className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="font-bold text-sm">복용 이력</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <CalendarDays className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5 pt-0 pr-4 pb-3 pl-4">
                  <div className="items-center flex grow font-bold justify-center h-[30px] bg-white basis-[0%] rounded-[0.9375rem]">1주</div>
                  <div className="items-center flex grow font-bold justify-center h-[30px] bg-[rgb(31,_27,_46)] text-white basis-[0%] rounded-[0.9375rem]">1달</div>
                  <div className="items-center flex grow font-bold justify-center h-[30px] bg-white basis-[0%] rounded-[0.9375rem]">3달</div>
                  <div className="items-center flex grow font-bold justify-center h-[30px] bg-white basis-[0%] rounded-[0.9375rem]">직접</div>
                </div>
                <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-[100px] pl-4">
                  <div className="mb-3 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
                    <div className="flex justify-around">
                      <div className="text-center">
                        <div className="font-extrabold text-center text-lg" style={{"fontFamily":"NanumSquare, system-ui"}}>86%</div>
                        <div className="text-center mt-[2px] text-gray-600 text-xs">복용률</div>
                      </div>
                      <div className="text-center">
                        <div className="font-extrabold text-center text-lg" style={{"fontFamily":"NanumSquare, system-ui"}}>52</div>
                        <div className="text-center mt-[2px] text-gray-600 text-xs">복용</div>
                      </div>
                      <div className="text-center">
                        <div className="font-extrabold text-center text-lg" style={{"fontFamily":"NanumSquare, system-ui"}}>8</div>
                        <div className="text-center mt-[2px] text-gray-600 text-xs">미복용</div>
                      </div>
                      <div className="text-center">
                        <div className="font-extrabold text-center text-lg" style={{"fontFamily":"NanumSquare, system-ui"}}>3</div>
                        <div className="text-center mt-[2px] text-gray-600 text-xs">미루기</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-[14px]">
                    <div className="font-bold mb-[6px] text-gray-600 pt-0 pr-1 pb-0 pl-1">5월 13일 화</div>
                    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
                      <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                          <div className="overflow-hidden w-[10px] h-[10px]">
                            <img src="/icons/553aadff6c732777ebf05fd7879f8ace0c08808a.svg" className="block size-full" />
                          </div>
                        </div>
                        <div className="grow basis-[0%]">08:00 콘서타 18mg</div>
                        <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
                      </div>
                      <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                          <div className="overflow-hidden w-[10px] h-[10px]">
                            <img src="/icons/b8a302e36ea60d69f9992783ad06a14925a796f1.svg" className="block size-full" />
                          </div>
                        </div>
                        <div className="grow basis-[0%]">12:30 콘서타 18mg</div>
                        <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
                      </div>
                      <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3">
                        <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-50 rounded-[0.5625rem]"></div>
                        <div className="grow basis-[0%]">19:00 스트라테라 40mg</div>
                        <div className="font-bold uppercase text-gray-500 text-xs">예정</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-[14px]">
                    <div className="font-bold mb-[6px] text-gray-600 pt-0 pr-1 pb-0 pl-1">5월 12일 월</div>
                    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
                      <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                          <div className="overflow-hidden w-[10px] h-[10px]">
                            <img src="/icons/c31c4c0925d22f49ca58fec0a3e791abffca3580.svg" className="block size-full" />
                          </div>
                        </div>
                        <div className="grow basis-[0%]">08:00 콘서타 18mg</div>
                        <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
                      </div>
                      <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                          <div className="overflow-hidden w-[10px] h-[10px]">
                            <img src="/icons/719f555dcc9b8aaf4c575aa9cbfc52e2ee272988.svg" className="block size-full" />
                          </div>
                        </div>
                        <div className="grow basis-[0%]">12:30 콘서타 18mg</div>
                        <div className="font-bold uppercase text-gray-500 text-xs">건너뜀</div>
                      </div>
                      <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3">
                        <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                          <div className="overflow-hidden w-[10px] h-[10px]">
                            <img src="/icons/1196b0549314af128fc7d97294ec92ba1d96593d.svg" className="block size-full" />
                          </div>
                        </div>
                        <div className="grow basis-[0%]">19:00 스트라테라 40mg</div>
                        <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-[14px]">
                    <div className="font-bold mb-[6px] text-gray-600 pt-0 pr-1 pb-0 pl-1">5월 11일 일</div>
                    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
                      <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                          <div className="overflow-hidden w-[10px] h-[10px]">
                            <img src="/icons/fa6bbf8b97533e585241d6a212c73d52139abc7e.svg" className="block size-full" />
                          </div>
                        </div>
                        <div className="grow basis-[0%]">08:00 콘서타 18mg</div>
                        <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
                      </div>
                      <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                          <div className="overflow-hidden w-[10px] h-[10px]">
                            <img src="/icons/49bc90d075790a4096bd013fa7ecd0d5f355895a.svg" className="block size-full" />
                          </div>
                        </div>
                        <div className="grow basis-[0%]">12:30 콘서타 18mg</div>
                        <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
                      </div>
                      <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3">
                        <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                          <div className="overflow-hidden w-[10px] h-[10px]">
                            <img src="/icons/e64256a64d85adaec88e5c4afbf9732379418611.svg" className="block size-full" />
                          </div>
                        </div>
                        <div className="grow basis-[0%]">19:00 스트라테라 40mg</div>
                        <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
                      </div>
                    </div>
                  </div>
                </div>
                <TabBar active="약" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">복용 이력 · MED-004</figcaption>
        </figure>
      </div>
    </section>
  );
}

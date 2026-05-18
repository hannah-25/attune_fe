import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TabBar } from './TabBar';

export function ReportSection() {
  return (
    <section className="pt-1 pr-0 pb-0 pl-0">
      <header className="items-start flex mb-4 gap-4 pt-0 pr-1 pb-5 pl-1 border-b" style={{"borderBottomColor":"var(--gray-400)"}}>
        <div className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-[0]" style={{"fontFamily":"NanumSquare, system-ui"}}>⑦</div>
        <div>
          <h2 className="font-bold mb-1 text-2xl tracking-tight leading-tight" style={{"fontFamily":"NanumSquare, system-ui"}}>리포트 · 인사이트</h2>
          <p className="text-gray-600 text-xs leading-tight">REQ-RPT-01~04 · 주간/월간 · LLM 상관관계 분석</p>
        </div>
        <div className="self-start font-bold ml-auto whitespace-nowrap bg-gray-50 border-gray-400 border text-gray-500 text-xs pt-1.5 pr-3 pb-1.5 pl-3 shrink-[0] rounded-full">3 screens</div>
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
                    <img src="/icons/ecdb5dd65f019b6d2be2d1637ad39bcacf9a086a.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/26e3e8a99e4380b20902f9cb9aec3772b2b3f6cb.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="items-center flex justify-between pt-2 pr-5 pb-2 pl-5">
                  <div>
                    <div className="font-semibold text-gray-600">
                      이번 주 · 5/12 — 5/18
                    </div>
                    <div className="font-extrabold mt-[2px] text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
                      주간 리포트
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                      <span className="block">주</span>
                    </div>
                    <div className="items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                      <span className="block">월</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-2 pr-4 pb-[100px] pl-4">
                  <div className="grid-cols-2 grid gap-2">
                    <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"1 / 1 / 2 / 2"}}>
                      <div className="font-bold text-gray-600 text-xs">복용률</div>
                      <div className="items-baseline flex mt-1 gap-1.5">
                        <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>86%</div>
                        <div className="font-bold text-purple-500 text-xs">+12%</div>
                      </div>
                      <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                        <img src="/icons/29bab1a2a939a1798ef21544b448b021e92c841b.svg" className="inline w-full h-[22px]" />
                      </div>
                    </div>
                    <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"1 / 2 / 2 / 3"}}>
                      <div className="font-bold text-gray-600 text-xs">감정 점수</div>
                      <div className="items-baseline flex mt-1 gap-1.5">
                        <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>6.4</div>
                        <div className="font-bold text-purple-500 text-xs">+0.8</div>
                      </div>
                      <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                        <img src="/icons/079248c9c05bf2a8ced8a946065bc39baecf7473.svg" className="inline w-full h-[22px]" />
                      </div>
                    </div>
                    <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"2 / 1 / 3 / 2"}}>
                      <div className="font-bold text-gray-600 text-xs">업무 실수</div>
                      <div className="items-baseline flex mt-1 gap-1.5">
                        <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>4번</div>
                        <div className="font-bold text-purple-500 text-xs">-2</div>
                      </div>
                      <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                        <img src="/icons/f4a6d797bb793072d789367828a443e5a3297fa7.svg" className="inline w-full h-[22px]" />
                      </div>
                    </div>
                    <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"2 / 2 / 3 / 3"}}>
                      <div className="font-bold text-gray-600 text-xs">목표 달성</div>
                      <div className="items-baseline flex mt-1 gap-1.5">
                        <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>72%</div>
                        <div className="font-bold text-purple-500 text-xs">+5%</div>
                      </div>
                      <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                        <img src="/icons/87ed74a4448280e959a96d7e4625b1ee725f06bb.svg" className="inline w-full h-[22px]" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex mb-2 gap-1.5">
                      <div className="items-center flex font-extrabold justify-center w-[22px] h-[22px] bg-[rgb(31,_27,_46)] text-white rounded-[0.6875rem]">
                        <span className="block">AI</span>
                      </div>
                      <div className="font-bold">
                        이번 주 인사이트
                      </div>
                      <div className="grow basis-[0%]"></div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="/icons/388852ae9b8893331e137329a4bd0b282dce0126.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="mb-2 text-gray-800 leading-[20.15px]">
                      <b className="font-bold">
                        아침 약 복용 직후 2시간
                      </b>
                       동안 집중력 점수가 평 균 
                      <b className="font-bold">
                        +24%
                      </b>
                       더 높았어요. 점심 약을 놓친 날에는 오후 업무 실수가 늘었습니다.
                    </div>
                    <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-2 rounded-lg">
                      <div className="text-gray-800 text-xs leading-[16.5px]">
                        ⚠︎ AI 분석은 진단이 아닌 패턴 관찰입니다.
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="font-bold mb-[10px]">
                      요일별 감정 점수
                    </div>
                    <div className="items-end flex h-[70px] gap-1.5">
                      <div className="items-center flex flex-col grow basis-[0%] gap-1">
                        <div className="w-full h-[42px] bg-purple-500 rounded-md"></div>
                        <div className="font-bold text-gray-600 text-xs">월</div>
                      </div>
                      <div className="items-center flex flex-col grow basis-[0%] gap-1">
                        <div className="w-full h-[60px] bg-purple-500 rounded-md"></div>
                        <div className="font-bold text-gray-600 text-xs">화</div>
                      </div>
                      <div className="items-center flex flex-col grow basis-[0%] gap-1">
                        <div className="w-full h-[38px] bg-purple-500 rounded-md"></div>
                        <div className="font-bold text-gray-600 text-xs">수</div>
                      </div>
                      <div className="items-center flex flex-col grow basis-[0%] gap-1">
                        <div className="w-full h-[54px] bg-purple-500 rounded-md"></div>
                        <div className="font-bold text-gray-600 text-xs">목</div>
                      </div>
                      <div className="items-center flex flex-col grow basis-[0%] gap-1">
                        <div className="w-full h-[65px] bg-purple-500 rounded-md"></div>
                        <div className="font-bold text-gray-600 text-xs">금</div>
                      </div>
                      <div className="items-center flex flex-col grow basis-[0%] gap-1">
                        <div className="w-full h-12 bg-purple-500 rounded-md"></div>
                        <div className="font-bold text-gray-600 text-xs">토</div>
                      </div>
                      <div className="items-center flex flex-col grow basis-[0%] gap-1">
                        <div className="w-full h-[30px] bg-purple-500 rounded-md"></div>
                        <div className="font-bold text-gray-600 text-xs">일</div>
                      </div>
                    </div>
                  </div>
                </div>
                <TabBar active="리포트" variant="report" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">주간 대시보드 · ANL-001-a</figcaption>
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
                    <img src="/icons/56ae02125879aef40bde963f210282660018cb1a.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/94c7dc6ad021cb6d808527b709eca098b54c413f.svg" className="block size-full" />
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
                    <div className="font-bold text-sm">월별 리포트</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <ChevronRight className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-2.5 pt-0 pr-4 pb-[100px] pl-4">
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex gap-2.5">
                      <div className="items-center flex justify-center w-11 h-11 bg-white rounded-[0.875rem]">
                        <div className="overflow-hidden w-5 h-5">
                          <img src="/icons/ac208f40875f5400bac0798dddf883aef4f81033.svg" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-extrabold text-base" style={{"fontFamily":"NanumSquare, system-ui"}}>2026년 5월</div>
                        <div className="mt-[2px] text-gray-600 text-xs">진행 중 · 5/12 업데이트</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex gap-2.5">
                      <div className="items-center flex justify-center w-11 h-11 bg-white rounded-[0.875rem]">
                        <div className="overflow-hidden w-5 h-5">
                          <img src="/icons/a238e2945fc03c194c8e4f82d833297857660dde.svg" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-extrabold text-base" style={{"fontFamily":"NanumSquare, system-ui"}}>2026년 4월</div>
                        <div className="mt-[2px] text-gray-600 text-xs">완료 · 5/01 생성</div>
                      </div>
                      <div className="items-center flex justify-center w-8 h-8 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-2xl">
                        <div className="overflow-hidden w-3 h-3">
                          <img src="/icons/24cb7e5a8ccc1f4217b30518f9cf3a266a3f29b5.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex gap-2.5">
                      <div className="items-center flex justify-center w-11 h-11 bg-white rounded-[0.875rem]">
                        <div className="overflow-hidden w-5 h-5">
                          <img src="/icons/3feb942ec51132a0611f361e76167bfee580c937.svg" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-extrabold text-base" style={{"fontFamily":"NanumSquare, system-ui"}}>2026년 3월</div>
                        <div className="mt-[2px] text-gray-600 text-xs">완료 · 4/01 생성</div>
                      </div>
                      <div className="items-center flex justify-center w-8 h-8 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-2xl">
                        <div className="overflow-hidden w-3 h-3">
                          <img src="/icons/a6cc01e07a79b47db32d2899bf71e28148c6ba2d.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex gap-2.5">
                      <div className="items-center flex justify-center w-11 h-11 bg-white rounded-[0.875rem]">
                        <div className="overflow-hidden w-5 h-5">
                          <img src="/icons/801b6c1ef679c1953450c11d91afa25ef367f7b8.svg" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-extrabold text-base" style={{"fontFamily":"NanumSquare, system-ui"}}>2026년 2월</div>
                        <div className="mt-[2px] text-gray-600 text-xs">완료 · 3/01 생성</div>
                      </div>
                      <div className="items-center flex justify-center w-8 h-8 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-2xl">
                        <div className="overflow-hidden w-3 h-3">
                          <img src="/icons/82a4c4789d85924077c71bc6bb25e08301e8694c.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <TabBar active="리포트" variant="report" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">월별 리포트 목록 · ANL-003-a</figcaption>
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
                    <img src="/icons/a4f0cbbb6b8768472b56e338fd510fb9afeee141.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/cbe46bdc16d2e2c15fb2c444a9c5cdf14784b47f.svg" className="block size-full" />
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
                    <div className="font-bold text-sm">2026년 4월</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <ChevronRight className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
                    <div className="font-bold text-gray-600">
                      한 줄 요약
                    </div>
                    <div className="font-extrabold mt-1 text-lg leading-[25.2px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
                      아침형 루틴이 자리잡은 한 달이었 어요
                    </div>
                    <div className="flex mt-3 gap-1.5">
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                        <span className="block">복용 92%</span>
                      </div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                        <span className="block">기록 24일</span>
                      </div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                        <span className="block">감정 +0.8</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="font-bold mb-[10px]">
                      월간 캘린더
                    </div>
                    <div className="grid-cols-7 grid gap-1">
                      <div className="aspect-square rounded-md" style={{"gridArea":"1 / 1 / 2 / 2"}}></div>
                      <div className="aspect-square rounded-md" style={{"gridArea":"1 / 2 / 2 / 3"}}></div>
                      <div className="aspect-square rounded-md" style={{"gridArea":"1 / 3 / 2 / 4"}}></div>
                      <div className="aspect-square rounded-md" style={{"gridArea":"1 / 4 / 2 / 5"}}></div>
                      <div className="aspect-square rounded-md" style={{"gridArea":"1 / 5 / 2 / 6"}}></div>
                      <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"1 / 6 / 2 / 7"}}></div>
                      <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"1 / 7 / 2 / 8"}}></div>
                      <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"2 / 1 / 3 / 2"}}></div>
                      <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"2 / 2 / 3 / 3"}}></div>
                      <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"2 / 3 / 3 / 4"}}></div>
                      <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"2 / 4 / 3 / 5"}}></div>
                      <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"2 / 5 / 3 / 6"}}></div>
                      <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"2 / 6 / 3 / 7"}}></div>
                      <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"2 / 7 / 3 / 8"}}></div>
                      <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"3 / 1 / 4 / 2"}}></div>
                      <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"3 / 2 / 4 / 3"}}></div>
                      <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"3 / 3 / 4 / 4"}}></div>
                      <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"3 / 4 / 4 / 5"}}></div>
                      <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"3 / 5 / 4 / 6"}}></div>
                      <div className="aspect-square bg-purple-500 border-gray-900 border rounded-md" style={{"gridArea":"3 / 6 / 4 / 7"}}></div>
                      <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"3 / 7 / 4 / 8"}}></div>
                      <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"4 / 1 / 5 / 2"}}></div>
                      <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"4 / 2 / 5 / 3"}}></div>
                      <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"4 / 3 / 5 / 4"}}></div>
                      <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"4 / 4 / 5 / 5"}}></div>
                      <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"4 / 5 / 5 / 6"}}></div>
                      <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"4 / 6 / 5 / 7"}}></div>
                      <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"4 / 7 / 5 / 8"}}></div>
                      <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"5 / 1 / 6 / 2"}}></div>
                      <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"5 / 2 / 6 / 3"}}></div>
                      <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"5 / 3 / 6 / 4"}}></div>
                      <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"5 / 4 / 6 / 5"}}></div>
                      <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"5 / 5 / 6 / 6"}}></div>
                      <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"5 / 6 / 6 / 7"}}></div>
                      <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"5 / 7 / 6 / 8"}}></div>
                    </div>
                    <div className="items-center flex mt-3 text-gray-600 text-xs gap-1.5">
                      <span className="block">
                        적음
                      </span>
                      <div className="w-3 h-2 bg-purple-100 rounded-xs"></div>
                      <div className="w-3 h-2 bg-purple-200 rounded-xs"></div>
                      <div className="w-3 h-2 bg-purple-300 rounded-xs"></div>
                      <div className="w-3 h-2 bg-purple-500 rounded-xs"></div>
                      <span className="block">
                        많음
                      </span>
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex mb-2 gap-1.5">
                      <div className="overflow-hidden w-[14px] h-[14px]">
                        <img src="/icons/554d6ce2320195f53a159850cecaca3c1ccfdbc1.svg" className="block size-full" />
                      </div>
                      <div className="font-bold">
                        상관관계 인사이트
                      </div>
                    </div>
                    <div className="text-gray-800 leading-[20.15px]">
                      수면 6시간 미만인 날의 다음 날 업무 실수가 평 균 
                      <b className="font-bold">
                        1.7배
                      </b>
                       더 많았어요.
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex mb-2 gap-1.5">
                      <div className="overflow-hidden w-[14px] h-[14px]">
                        <img src="/icons/d3ec29d4f07f263a2a453b9617fffe0fcf9c97ed.svg" className="block size-full" />
                      </div>
                      <div className="font-bold">
                        약물 반응
                      </div>
                    </div>
                    <div className="text-gray-800 leading-[20.15px]">
                      콘서타 복용 시작 후 
                      <b className="font-bold">
                        3주차
                      </b>
                      부터 식욕 저하 빈도 가 줄었습니다.
                    </div>
                  </div>
                  <div className="items-center flex font-bold justify-center w-full h-[50px] border-gray-900 border text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
                    <div className="overflow-hidden w-[11px] h-[11px]">
                      <img src="/icons/d61ce1645cdee1b65efeea1174a44f4db8d8be0e.svg" className="block size-full" />
                    </div>
                    <span className="block ml-[6px]">
                      PDF로 내보내기
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">월별 상세 + AI 인사이트</figcaption>
        </figure>
      </div>
    </section>
  );
}

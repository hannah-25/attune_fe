import React from 'react';
import logoImage from '../../assets/logo.png';
import { TabBar } from './TabBar';

export function HomeSection() {
  return (
    <section className="pt-1 pr-0 pb-0 pl-0">
      <header className="items-start flex mb-4 gap-4 pt-0 pr-1 pb-5 pl-1 border-b" style={{"borderBottomColor":"var(--gray-400)"}}>
        <div className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-[0]" style={{"fontFamily":"NanumSquare, system-ui"}}>③</div>
        <div>
          <h2 className="font-bold mb-1 text-2xl tracking-tight leading-tight" style={{"fontFamily":"NanumSquare, system-ui"}}>홈 · 대시보드 (변형 3종)</h2>
          <p className="text-gray-600 text-xs leading-tight">진입 후 첫 화면 — 하루의 시작점 · A/B/C 비교용</p>
        </div>
        <div className="self-start font-bold ml-auto whitespace-nowrap bg-gray-50 border-gray-400 border text-gray-500 text-xs pt-1.5 pr-3 pb-1.5 pl-3 shrink-[0] rounded-full">2 screens</div>
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
                    <img src="/icons/c0215afb456e1b9fb428a6df38a839ecfb4059ba.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/a769290e3c8b8e1fbb67a725fd8618778f713b0e.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="relative items-center flex pt-2 pr-5 pb-2 pl-5 min-h-[52px]">
                  <div className="w-8 h-8 shrink-0">
                    <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
                  </div>
                  <div className="grow basis-[0%]"></div>
                  <div className="items-center flex gap-2 shrink-0">
                    <div className="items-center flex justify-center w-8 h-8 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-full shrink-0">
                      <div className="overflow-hidden w-[14px] h-[14px]">
                        <img src="/icons/65f847e691f2e01088069fffb3ba8a278705ebdd.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex justify-center w-8 h-8 bg-purple-200 rounded-full shrink-0">
                      <span className="font-bold text-purple-700 text-xs">J</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-2 pt-1 pr-4 pb-[100px] pl-4">
                  <div className="items-center flex justify-between px-1">
                    <div className="font-semibold text-sm text-gray-800">주간 통계</div>
                    <button className="text-xs text-gray-400">전체보기</button>
                  </div>
                  <div className="flex gap-2">
                    <div className="grow bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] basis-[0%] pt-2.5 px-3 pb-2.5 rounded-2xl text-center">
                      <div className="text-[10px] text-gray-500 leading-tight">달성률</div>
                      <div className="font-bold text-lg mt-0.5 text-gray-900" style={{"fontFamily":"NanumSquare, system-ui"}}>71%</div>
                    </div>
                    <div className="grow bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] basis-[0%] pt-2.5 px-3 pb-2.5 rounded-2xl text-center">
                      <div className="text-[10px] text-gray-500 leading-tight">복약률</div>
                      <div className="font-bold text-lg mt-0.5 text-gray-900" style={{"fontFamily":"NanumSquare, system-ui"}}>86%</div>
                    </div>
                    <div className="grow bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] basis-[0%] pt-2.5 px-3 pb-2.5 rounded-2xl text-center">
                      <div className="text-[10px] text-gray-500 leading-tight">일지 작성</div>
                      <div className="font-bold text-lg mt-0.5 text-gray-900" style={{"fontFamily":"NanumSquare, system-ui"}}>3/6</div>
                    </div>
                  </div>
                  <div className="items-center flex justify-between px-1 mt-3">
                    <div className="font-semibold text-sm text-gray-800">오늘 할일</div>
                    <button className="text-xs text-gray-400">전체보기</button>
                  </div>
                  <div className="items-center flex justify-between bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] px-4 py-3 rounded-2xl">
                    <div>
                      <div className="font-semibold text-sm text-gray-800">오늘 일지 작성하기</div>
                      <div className="text-[11px] text-purple-600 mt-0.5">감정 · 증상 · 수면 · 목표</div>
                    </div>
                    <div className="items-center flex justify-center w-8 h-8 bg-purple-200 shrink-0 rounded-full">
                      <svg className="w-[15px] h-[15px] text-purple-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] p-3 rounded-2xl">
                    <div className="flex flex-col gap-2">
                      <div className="items-center flex gap-2">
                        <div className="items-center flex justify-center w-4 h-4 bg-purple-300 shrink-0 rounded-full">
                          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                        </div>
                        <div className="text-xs text-gray-400 line-through">병원 서류 챙기기</div>
                      </div>
                      <div className="items-center flex gap-2">
                        <div className="w-4 h-4 border border-gray-300 shrink-0 rounded-full"></div>
                        <div className="text-xs text-gray-700">리포트 초안 제출</div>
                      </div>
                      <div className="items-center flex gap-2">
                        <div className="w-4 h-4 border border-gray-300 shrink-0 rounded-full"></div>
                        <div className="text-xs text-gray-700">저녁 약 챙기기</div>
                      </div>
                    </div>
                  </div>
                  <div className="items-center flex justify-between px-1 mt-3">
                    <div className="font-semibold text-sm text-gray-800">예정 일정</div>
                    <button className="text-xs text-gray-400">전체보기</button>
                  </div>
                  <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] px-3 py-2 rounded-2xl flex flex-col">
                    <div className="items-center flex gap-3 py-2">
                      <div className="font-medium text-[11px] text-purple-500 w-[34px] shrink-0">오늘</div>
                      <div className="w-2 h-2 bg-purple-500 shrink-0 rounded-full"></div>
                      <div className="font-semibold text-xs text-gray-800 grow">병원 진료</div>
                      <div className="text-[10px] text-gray-400 shrink-0">14:00</div>
                    </div>
                    <div className="items-center flex gap-3 py-2 border-t border-gray-100">
                      <div className="font-medium text-[11px] text-gray-400 w-[34px] shrink-0">내일</div>
                      <div className="w-2 h-2 bg-purple-300 shrink-0 rounded-full"></div>
                      <div className="font-semibold text-xs text-gray-800 grow">팀 미팅</div>
                      <div className="text-[10px] text-gray-400 shrink-0">09:00</div>
                    </div>
                    <div className="items-center flex gap-3 py-2 border-t border-gray-100">
                      <div className="font-medium text-[11px] text-gray-400 w-[34px] shrink-0">목</div>
                      <div className="w-2 h-2 bg-purple-300 shrink-0 rounded-full"></div>
                      <div className="font-semibold text-xs text-gray-800 grow">정신건강의학과 상담</div>
                      <div className="text-[10px] text-gray-400 shrink-0">14:00</div>
                    </div>
                  </div>
                  <div className="items-center flex justify-between px-1 mt-3">
                    <div className="font-semibold text-sm text-gray-800">주간 인사이트</div>
                    <button className="text-xs text-gray-400">전체보기</button>
                  </div>
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] px-4 py-3 rounded-[1.375rem] items-center flex gap-3">
                    <div className="items-center flex justify-center w-9 h-9 bg-purple-200 shrink-0 rounded-xl">
                      <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                        <polyline points="16 7 22 7 22 13"/>
                      </svg>
                    </div>
                    <div className="grow">
                      <div className="font-bold text-xs text-gray-900 leading-tight whitespace-nowrap">복용 2시간 후 집중력 <span className="text-purple-600">+24%</span></div>
                      <div className="text-[10px] text-gray-500 mt-1">복약률 86% · 달성률 71%</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
                <TabBar active="홈" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">A · 리스트 대시보드</figcaption>
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
                    <img src="/icons/2f33dbf5354cfee928df3ee53c57c579efffca04.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/1ddc2dcfd6ea13c62faa6a59a040de832ffd1093.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="items-center flex justify-between pt-[10px] pr-5 pb-1.5 pl-5">
                  <div className="font-bold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
                    5월
                  </div>
                  <div className="flex gap-2">
                    <div className="items-center flex justify-center w-[30px] h-[30px] bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-[0.9375rem]">
                      <div className="overflow-hidden w-[13px] h-[13px]">
                        <img src="/icons/5d8d993a0397c0c32edf0c73ae3fd195ca241b6f.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex justify-center w-[30px] h-[30px] bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-[0.9375rem]">
                      <div className="overflow-hidden w-[13px] h-[13px]">
                        <img src="/icons/441d181493fed6f91159f901fc2b85bc102346e0.svg" className="block size-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 pt-1.5 pr-3 pb-0 pl-3">
                  <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
                    <div className="font-semibold text-center text-xs opacity-[0.7]">월</div>
                    <div className="font-bold text-center mt-[2px] text-base">12</div>
                    <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 bg-purple-300 rounded-xs"></div>
                  </div>
                  <div className="grow text-center bg-[rgb(31,_27,_46)] text-white basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
                    <div className="font-semibold text-center text-xs opacity-[0.7]">화</div>
                    <div className="font-bold text-center mt-[2px] text-base">13</div>
                    <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 bg-purple-300 rounded-xs"></div>
                  </div>
                  <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
                    <div className="font-semibold text-center text-xs opacity-[0.7]">수</div>
                    <div className="font-bold text-center mt-[2px] text-base">14</div>
                    <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 bg-purple-300 rounded-xs"></div>
                  </div>
                  <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
                    <div className="font-semibold text-center text-xs opacity-[0.7]">목</div>
                    <div className="font-bold text-center mt-[2px] text-base">15</div>
                    <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 rounded-xs"></div>
                  </div>
                  <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
                    <div className="font-semibold text-center text-xs opacity-[0.7]">금</div>
                    <div className="font-bold text-center mt-[2px] text-base">16</div>
                    <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 bg-purple-300 rounded-xs"></div>
                  </div>
                  <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
                    <div className="font-semibold text-center text-xs opacity-[0.7]">토</div>
                    <div className="font-bold text-center mt-[2px] text-base">17</div>
                    <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 bg-purple-300 rounded-xs"></div>
                  </div>
                  <div className="grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[1.375rem]">
                    <div className="font-semibold text-center text-xs opacity-[0.7]">일</div>
                    <div className="font-bold text-center mt-[2px] text-base">18</div>
                    <div className="ml-auto mr-auto text-center w-1 h-1 mt-1 rounded-xs"></div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-2.5 pt-3 pr-4 pb-[100px] pl-4">
                  <div className="items-center flex gap-3">
                    <div className="font-semibold w-[38px] text-gray-600 text-xs">08:00</div>
                    <div className="w-2 h-2 bg-purple-300 shrink-[0] rounded-sm"></div>
                    <div className="items-center flex grow bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-2 p-[10px] rounded-[0.875rem]">
                      <div className="grow font-semibold basis-[0%]">콘서타 18mg</div>
                      <div className="font-bold text-gray-600 text-xs">복용</div>
                    </div>
                  </div>
                  <div className="items-center flex gap-3">
                    <div className="font-semibold w-[38px] text-gray-600 text-xs">09:30</div>
                    <div className="w-2 h-2 bg-purple-300 shrink-[0] rounded-sm"></div>
                    <div className="items-center flex grow bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-2 p-[10px] rounded-[0.875rem]">
                      <div className="grow font-semibold basis-[0%]">오전 회의</div>
                      <div className="font-bold text-gray-600 text-xs">회사</div>
                    </div>
                  </div>
                  <div className="items-center flex gap-3">
                    <div className="font-semibold w-[38px] text-gray-600 text-xs">12:30</div>
                    <div className="w-2 h-2 bg-purple-300 shrink-[0] rounded-sm"></div>
                    <div className="items-center flex grow bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-2 p-[10px] rounded-[0.875rem]">
                      <div className="grow font-semibold basis-[0%]">콘서타 18mg</div>
                      <div className="font-bold text-gray-600 text-xs">복용</div>
                    </div>
                  </div>
                  <div className="items-center flex gap-3">
                    <div className="font-semibold w-[38px] text-gray-600 text-xs">14:00</div>
                    <div className="w-2 h-2 bg-purple-500 shrink-[0] rounded-sm"></div>
                    <div className="items-center flex grow bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-2 p-[10px] rounded-[0.875rem]">
                      <div className="grow font-semibold basis-[0%]">병원 진료</div>
                      <div className="font-bold text-gray-600 text-xs">상담</div>
                    </div>
                  </div>
                  <div className="items-center flex gap-3">
                    <div className="font-semibold w-[38px] text-gray-600 text-xs">19:00</div>
                    <div className="w-2 h-2 bg-purple-300 shrink-[0] rounded-sm"></div>
                    <div className="items-center flex grow bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-2 p-[10px] rounded-[0.875rem]">
                      <div className="grow font-semibold basis-[0%]">스트라테라 40mg</div>
                      <div className="font-bold text-gray-600 text-xs">복용</div>
                    </div>
                  </div>
                  <div className="mt-1 bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
                    <div className="font-semibold text-gray-600">
                      오늘 일지
                    </div>
                    <div className="font-bold mt-[2px] text-sm">
                      저녁 식사 전 1번 더 기록해보세요
                    </div>
                  </div>
                </div>
                <TabBar active="캘린더" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">C · 캘린더 타임라인</figcaption>
        </figure>
      </div>
    </section>
  );
}

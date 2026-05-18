import React from 'react';
import { TabBar } from './TabBar';

export function CalendarSection() {
  return (
    <section className="pt-1 pr-0 pb-0 pl-0">
      <header className="items-start flex mb-4 gap-4 pt-0 pr-1 pb-5 pl-1 border-b" style={{"borderBottomColor":"var(--gray-400)"}}>
        <div className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-[0]" style={{"fontFamily":"NanumSquare, system-ui"}}>⑥</div>
        <div>
          <h2 className="font-bold mb-1 text-2xl tracking-tight leading-tight" style={{"fontFamily":"NanumSquare, system-ui"}}>캘린더 · 일정</h2>
          <p className="text-gray-600 text-xs leading-tight">REQ-PLAN-01~03 · 자체 일정 + Google 동기화</p>
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
                    <img src="/icons/1733c7ce02ad90949478f228d4f164bf55806003.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/4de72f9b114e87ba852510458ce94477d7c86eb1.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="items-center flex justify-between pt-2 pr-4 pb-1 pl-4">
                  <div className="items-center flex gap-1.5">
                    <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
                      5월
                    </div>
                    <div className="overflow-hidden w-[14px] h-[14px]">
                      <img src="/icons/ac51fe5f4a79c14bce84086c3976b584478290f5.svg" className="block size-full" />
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                      <span className="block">월</span>
                    </div>
                    <div className="items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                      <span className="block">주</span>
                    </div>
                    <div className="items-center flex justify-center w-[30px] h-[30px] bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-[0.9375rem]">
                      <div className="overflow-hidden w-[14px] h-[14px]">
                        <img src="/icons/c224e786521d13d2d5774b00ba68fd16572a5fb0.svg" className="block size-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-0 pr-3 pb-0 pl-3">
                  <div className="grid-cols-7 grid mb-[6px] gap-1">
                    <div className="font-bold text-center text-[rgb(185, 166, 255)] text-xs" style={{"gridArea":"1 / 1 / 2 / 2"}}>일</div>
                    <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 2 / 2 / 3"}}>월</div>
                    <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 3 / 2 / 4"}}>화</div>
                    <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 4 / 2 / 5"}}>수</div>
                    <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 5 / 2 / 6"}}>목</div>
                    <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 6 / 2 / 7"}}>금</div>
                    <div className="font-bold text-center text-[rgb(185, 166, 255)] text-xs" style={{"gridArea":"1 / 7 / 2 / 8"}}>토</div>
                  </div>
                  <div className="grid-cols-7 grid gap-1">
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 opacity-[0.35] rounded-lg" style={{"gridArea":"1 / 1 / 2 / 2"}}>
                      <div className="font-semibold text-center"></div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 opacity-[0.35] rounded-lg" style={{"gridArea":"1 / 2 / 2 / 3"}}>
                      <div className="font-semibold text-center"></div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 opacity-[0.35] rounded-lg" style={{"gridArea":"1 / 3 / 2 / 4"}}>
                      <div className="font-semibold text-center"></div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 opacity-[0.35] rounded-lg" style={{"gridArea":"1 / 4 / 2 / 5"}}>
                      <div className="font-semibold text-center"></div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"1 / 5 / 2 / 6"}}>
                      <div className="font-semibold text-center">1</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"1 / 6 / 2 / 7"}}>
                      <div className="font-semibold text-center">2</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"1 / 7 / 2 / 8"}}>
                      <div className="font-semibold text-center">3</div>
                      <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                        <div className="text-center w-1 h-1 bg-purple-300 rounded-xs"></div>
                      </div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"2 / 1 / 3 / 2"}}>
                      <div className="font-semibold text-center">4</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"2 / 2 / 3 / 3"}}>
                      <div className="font-semibold text-center">5</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"2 / 3 / 3 / 4"}}>
                      <div className="font-semibold text-center">6</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"2 / 4 / 3 / 5"}}>
                      <div className="font-semibold text-center">7</div>
                      <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                        <div className="text-center w-1 h-1 bg-purple-500 rounded-xs"></div>
                        <div className="text-center w-1 h-1 bg-purple-300 rounded-xs"></div>
                      </div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"2 / 5 / 3 / 6"}}>
                      <div className="font-semibold text-center">8</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"2 / 6 / 3 / 7"}}>
                      <div className="font-semibold text-center">9</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"2 / 7 / 3 / 8"}}>
                      <div className="font-semibold text-center">10</div>
                      <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                        <div className="text-center w-1 h-1 bg-purple-300 rounded-xs"></div>
                      </div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"3 / 1 / 4 / 2"}}>
                      <div className="font-semibold text-center">11</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"3 / 2 / 4 / 3"}}>
                      <div className="font-semibold text-center">12</div>
                      <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                        <div className="text-center w-1 h-1 bg-purple-300 rounded-xs"></div>
                        <div className="text-center w-1 h-1 bg-purple-300 rounded-xs"></div>
                      </div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] bg-[rgb(31,_27,_46)] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"3 / 3 / 4 / 4"}}>
                      <div className="font-extrabold text-center text-white">13</div>
                      <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                        <div className="text-center w-1 h-1 bg-white rounded-xs"></div>
                        <div className="text-center w-1 h-1 bg-white rounded-xs"></div>
                        <div className="text-center w-1 h-1 bg-white rounded-xs"></div>
                      </div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"3 / 4 / 4 / 5"}}>
                      <div className="font-semibold text-center">14</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"3 / 5 / 4 / 6"}}>
                      <div className="font-semibold text-center">15</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"3 / 6 / 4 / 7"}}>
                      <div className="font-semibold text-center">16</div>
                      <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                        <div className="text-center w-1 h-1 bg-purple-300 rounded-xs"></div>
                      </div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"3 / 7 / 4 / 8"}}>
                      <div className="font-semibold text-center">17</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"4 / 1 / 5 / 2"}}>
                      <div className="font-semibold text-center">18</div>
                      <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                        <div className="text-center w-1 h-1 bg-purple-500 rounded-xs"></div>
                      </div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"4 / 2 / 5 / 3"}}>
                      <div className="font-semibold text-center">19</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"4 / 3 / 5 / 4"}}>
                      <div className="font-semibold text-center">20</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"4 / 4 / 5 / 5"}}>
                      <div className="font-semibold text-center">21</div>
                      <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                        <div className="text-center w-1 h-1 bg-purple-300 rounded-xs"></div>
                      </div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"4 / 5 / 5 / 6"}}>
                      <div className="font-semibold text-center">22</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"4 / 6 / 5 / 7"}}>
                      <div className="font-semibold text-center">23</div>
                      <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                        <div className="text-center w-1 h-1 bg-purple-300 rounded-xs"></div>
                        <div className="text-center w-1 h-1 bg-purple-300 rounded-xs"></div>
                      </div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"4 / 7 / 5 / 8"}}>
                      <div className="font-semibold text-center">24</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"5 / 1 / 6 / 2"}}>
                      <div className="font-semibold text-center">25</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"5 / 2 / 6 / 3"}}>
                      <div className="font-semibold text-center">26</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"5 / 3 / 6 / 4"}}>
                      <div className="font-semibold text-center">27</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"5 / 4 / 6 / 5"}}>
                      <div className="font-semibold text-center">28</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"5 / 5 / 6 / 6"}}>
                      <div className="font-semibold text-center">29</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"5 / 6 / 6 / 7"}}>
                      <div className="font-semibold text-center">30</div>
                    </div>
                    <div className="relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg" style={{"gridArea":"5 / 7 / 6 / 8"}}>
                      <div className="font-semibold text-center">31</div>
                    </div>
                  </div>
                </div>
                <div className="h-px mt-3 ml-[16px] mr-[16px] bg-purple-50"></div>
                <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-3 pr-4 pb-[100px] pl-4">
                  <div className="font-bold mb-2">
                    5월 13일 · 3개 일정
                  </div>
                  <div className="items-center flex mb-2 bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] gap-2.5 p-[10px] rounded-[0.875rem]">
                    <div className="self-stretch w-1 bg-purple-300 rounded-xs"></div>
                    <div className="grow basis-[0%]">
                      <div className="font-bold">오전 회의</div>
                      <div className="mt-[2px] text-gray-600 text-xs">09:30 — 10:30</div>
                    </div>
                    <div className="font-bold text-gray-600 text-xs">회사</div>
                  </div>
                  <div className="items-center flex mb-2 bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] gap-2.5 p-[10px] rounded-[0.875rem]">
                    <div className="self-stretch w-1 bg-purple-300 rounded-xs"></div>
                    <div className="grow basis-[0%]">
                      <div className="font-bold">콘서타 18mg</div>
                      <div className="mt-[2px] text-gray-600 text-xs">12:30</div>
                    </div>
                    <div className="font-bold text-gray-600 text-xs">복용</div>
                  </div>
                  <div className="items-center flex mb-2 bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] gap-2.5 p-[10px] rounded-[0.875rem]">
                    <div className="self-stretch w-1 bg-purple-500 rounded-xs"></div>
                    <div className="grow basis-[0%]">
                      <div className="font-bold">병원 진료</div>
                      <div className="mt-[2px] text-gray-600 text-xs">14:00 — 14:40</div>
                    </div>
                    <div className="font-bold text-gray-600 text-xs">상담</div>
                  </div>
                </div>
                <TabBar active="캘린더" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">월간 통합 뷰 · CAL-001/002</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 2 / 2 / 3"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-purple-100 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="/icons/80aea4a43aea9334a517bd212cd16beed9a8c2fb.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/be7a3f3de4a4a658707f1a31180858b6ed094f8f.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="/icons/b7c467a84d7bdfd6c40db4d7610ae2cacb0312cf.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm"></div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="/icons/475b6a4f82b963544d4c155b022adc602cc4d023.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-4 pl-4">
                  <div className="items-center flex mb-[14px] gap-2">
                    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                      <span className="block">상담</span>
                    </div>
                    <div className="text-gray-600 text-xs">
                      Google 캘린더 연동
                    </div>
                  </div>
                  <div className="font-extrabold mb-[14px] text-3xl leading-[35px]" style={{"fontFamily":"NanumSquare, system-ui"}}>정신건강의학과<br />정기 진료</div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
                    <div className="items-start flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="font-semibold w-[60px] text-gray-600">언제</div>
                      <div className="grow basis-[0%]">5월 13일 화 · 14:00 — 14:40</div>
                    </div>
                    <div className="items-start flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="font-semibold w-[60px] text-gray-600">어디서</div>
                      <div className="grow basis-[0%]">청담심리상담센터</div>
                    </div>
                    <div className="items-start flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="font-semibold w-[60px] text-gray-600">알림</div>
                      <div className="grow basis-[0%]">30분 전 · 1시간 전</div>
                    </div>
                    <div className="items-start flex pt-3 pr-[14px] pb-3 pl-[14px]">
                      <div className="font-semibold w-[60px] text-gray-600">반복</div>
                      <div className="grow basis-[0%]">월 1회</div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-600 pt-4 pr-1 pb-1.5 pl-1">
                    메모
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
                    <div className="flex flex-col gap-[9px]">
                      <div className="w-[86%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                      <div className="w-[70%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                      <div className="w-[50%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                    </div>
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
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">일정 상세 · CAL-002</figcaption>
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
                    <img src="/icons/3dbd40547dcb49bf45db6ee57f96d9bdb571ba85.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/e2eda540d8e820ee1f6c34ed125071dd78d3d880.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="/icons/d79c2e541070847ef9bbaaa2ba1496f075cbb058.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">새 일정</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="font-bold text-white bg-purple-500 px-3 py-1 rounded-lg">
                          저장
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-4 pl-4">
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
                    <div className="w-[65%] h-[10px] bg-purple-50 rounded-lg"></div>
                    <div className="h-3"></div>
                    <div className="w-[40%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
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
                      <div className="text-gray-600">5월 13일 화 14:00</div>
                    </div>
                    <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="grow font-semibold basis-[0%]">종료</div>
                      <div className="text-gray-600">5월 13일 화 15:00</div>
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
                        <img src="/icons/cd9b488c97d95c8b78b422e04f658c2cc6aa1a03.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="grow font-semibold basis-[0%]">위치</div>
                      <div className="text-gray-600">추가</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="/icons/df73d4774c6f7327c8ad736a4ec91a37128919ab.svg" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px]">
                      <div className="grow font-semibold basis-[0%]">메모</div>
                      <div className="text-gray-600">추가</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="/icons/8a6c4d23a5e4d6c2436e7637e387e4bd7996730f.svg" className="block size-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">새 일정 + 카테고리 · CAL-003/008</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"2 / 1 / 3 / 2"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-100 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="/icons/8ed127c6fde991c466cb490d383b87e41157ce50.svg" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="/icons/a55680cfb9a83fc1cdcecc0da6274be68fc68fd5.svg" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="/icons/69b9506be14cb1cfd9fad41f5e5b691f2f2a39b4.svg" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">캘린더 연동</div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-0 pr-4 pb-6 pl-4">
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.375rem]">
                    <div className="font-extrabold text-lg leading-[23.4px]" style={{"fontFamily":"NanumSquare, system-ui"}}>병원·회사 일정도<br />한 곳에서 봐요</div>
                    <div className="mt-[6px] text-gray-600 leading-normal">
                      외부 캘린더는 색상으로 구분해 표시돼요
                    </div>
                  </div>
                  <div className="font-bold text-gray-600 text-xs pt-1 pr-1 pb-0 pl-1">
                    연결된 계정
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
                    <div className="items-center flex gap-2.5 pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
                      <div className="items-center flex font-extrabold justify-center w-8 h-8 bg-purple-100 text-[rgb(185, 166, 255)] text-sm rounded-2xl">
                        <span className="block">G</span>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-bold">
                          Google 캘린더
                        </div>
                        <div className="text-gray-600 text-xs">
                          main@gmail.com · 4분 전 동기 화
                        </div>
                      </div>
                      <div className="relative w-[38px] h-[22px] bg-purple-300 rounded-[0.6875rem]">
                        <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-600 text-xs pt-1 pr-1 pb-0 pl-1">
                    표시 옵션
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
                    <div className="items-center flex gap-2.5 pt-[11px] pr-[14px] pb-[11px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="w-3 h-3 bg-purple-300 rounded-md"></div>
                      <div className="grow basis-[0%]">업무 일정</div>
                      <div className="relative w-[38px] h-[22px] bg-purple-300 rounded-[0.6875rem]">
                        <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                      </div>
                    </div>
                    <div className="items-center flex gap-2.5 pt-[11px] pr-[14px] pb-[11px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="w-3 h-3 bg-purple-300 rounded-md"></div>
                      <div className="grow basis-[0%]">개인 일정</div>
                      <div className="relative w-[38px] h-[22px] bg-purple-300 rounded-[0.6875rem]">
                        <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                      </div>
                    </div>
                    <div className="items-center flex gap-2.5 pt-[11px] pr-[14px] pb-[11px] pl-[14px]">
                      <div className="w-3 h-3 bg-purple-300 rounded-md"></div>
                      <div className="grow basis-[0%]">가족 캘린더</div>
                      <div className="relative w-[38px] h-[22px] bg-purple-50 rounded-[0.6875rem]">
                        <div className="absolute w-[18px] h-[18px] left-[2px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
                    <div className="text-gray-800 leading-normal">
                      연결 해제 시 동기화된 외부 일정과 토큰이 모두 삭제돼요.
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">외부 캘린더 연동 · CAL-01/04</figcaption>
        </figure>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TabBar } from '@/components/TabBar';

export default function CalendarMainPage() {
  const [viewMode, setViewMode] = useState<'월' | '주'>('월');

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex h-dvh flex-col min-h-0">
        <div className="items-center flex justify-between pt-2 pr-4 pb-1 pl-4">
          <button
            type="button"
            className="items-center flex gap-1 rounded-xl pr-1 transition-all active:scale-[0.97]"
            aria-label="월 선택"
          >
            <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
              5월
            </div>
            <ChevronDown className="mt-0.5 h-4 w-4 text-gray-500" strokeWidth={2.5} />
          </button>
          <div className="flex gap-1.5">
            {(['월', '주'] as const).map((mode) => {
              const selected = viewMode === mode;

              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem] transition-all active:scale-[0.97] ${
                    selected ? 'bg-purple-100 text-purple-800' : 'text-gray-500'
                  }`}
                >
                  <span className="block">{mode}</span>
                </button>
              );
            })}
            <div className="items-center flex justify-center w-[30px] h-[30px] bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-[0.9375rem]">
              <div className="overflow-hidden w-[14px] h-[14px]">
                <img src="/icons/c224e786521d13d2d5774b00ba68fd16572a5fb0.svg" className="block size-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-3 pr-3 pb-0 pl-3">
          <div className="grid-cols-7 grid mb-[6px] gap-1">
            <div className="font-bold text-center text-[rgb(185, 166, 255)] text-xs" style={{"gridArea":"1 / 1 / 2 / 2"}}>일</div>
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 2 / 2 / 3"}}>월</div>
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 3 / 2 / 4"}}>화</div>
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 4 / 2 / 5"}}>수</div>
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 5 / 2 / 6"}}>목</div>
            <div className="font-bold text-center text-gray-600 text-xs" style={{"gridArea":"1 / 6 / 2 / 7"}}>금</div>
            <div className="font-bold text-center text-[rgb(185, 166, 255)] text-xs" style={{"gridArea":"1 / 7 / 2 / 8"}}>토</div>
          </div>
          {viewMode === '주' ? (
            <div className="grid-cols-7 grid gap-1">
              {[
                { day: 11, isToday: false, dots: [] },
                { day: 12, isToday: false, dots: [{ cls: 'bg-purple-300' }, { cls: 'bg-purple-300' }] },
                { day: 13, isToday: true,  dots: [{ cls: 'bg-white' }, { cls: 'bg-white' }, { cls: 'bg-white' }] },
                { day: 14, isToday: false, dots: [] },
                { day: 15, isToday: false, dots: [] },
                { day: 16, isToday: false, dots: [{ cls: 'bg-purple-300' }] },
                { day: 17, isToday: false, dots: [] },
              ].map(({ day, isToday, dots }, i) => (
                <div
                  key={day}
                  className={`relative text-center aspect-[0.82_/_1] pt-1 pr-0 pb-1 pl-0 rounded-lg ${isToday ? 'bg-[rgb(31,_27,_46)]' : ''}`}
                  style={{ gridArea: `1 / ${i + 1} / 2 / ${i + 2}` }}
                >
                  <div className={`font-${isToday ? 'extrabold' : 'semibold'} text-center ${isToday ? 'text-white' : ''}`}>{day}</div>
                  {dots.length > 0 && (
                    <div className="flex justify-center text-center mt-[3px] gap-[2px]">
                      {dots.map((d, j) => (
                        <div key={j} className={`text-center w-1 h-1 ${d.cls} rounded-xs`} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
        <div className="h-px mt-1 ml-[16px] mr-[16px] bg-purple-50 shrink-0"></div>
        <div className="grow min-h-0 overflow-y-auto overscroll-contain px-4 pt-2 pb-[100px]">
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
    </div>
  );
}

import React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

const MEDICATION = {
  name: '콘서타 18mg',
  ingredient: '메틸페니데이트 · 서방형',
  efficacy: '주의력결핍 과잉행동장애(ADHD) 증상을 개선합니다. 도파민과 노르에피네프린 재흡수를 억제하여 집중력과 충동 조절을 도와줍니다.',
  sideEffects: ['식욕 저하', '불면', '두통', '입마름', '두근거림'],
};

export default function MedicationInfoPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title={MEDICATION.name}
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
          right={<HeaderIconButton icon={<MoreHorizontal className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="items-center flex gap-3">
              <div className="items-center flex justify-center w-14 h-14 bg-white rounded-[1.125rem]">
                <div className="overflow-hidden w-[26px] h-[26px]">
                  <img src="/icons/82fbda66cf3604653aa601ba1b04657d51b7af89.svg" className="block size-full" />
                </div>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-extrabold text-2xl" style={{ fontFamily: "NanumSquare, system-ui" }}>
                  {MEDICATION.name}
                </div>
                <div className="mt-[2px] text-gray-600">
                  {MEDICATION.ingredient}
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
            <div className="text-gray-700 text-sm leading-relaxed">{MEDICATION.efficacy}</div>
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
              {MEDICATION.sideEffects.map((effect) => (
                <div key={effect} className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">{effect}</div>
              ))}
            </div>
          </div>
          <div className="text-gray-500 text-xs leading-[17.6px] pt-1 pr-2 pb-1 pl-2">
            출처: 식약처 의약품안전나라 · 한국임상연구원 가이드라인
          </div>
        </div>
      </div>
    </div>
  );
}

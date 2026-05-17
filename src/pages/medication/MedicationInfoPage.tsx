import React from 'react';

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
        <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
          <div className="items-center flex justify-between relative">
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F71214aeb3e9a91025992e6bbed95b42b12e12682.svg?generation=1778677416089994&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="absolute left-[50%] translate-x-[-50%] font-bold text-base">{MEDICATION.name}</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F4f2752d1870c89f1c02d35a998d91a08dae99f79.svg?generation=1778677416033234&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="items-center flex gap-3">
              <div className="items-center flex justify-center w-14 h-14 bg-white rounded-[1.125rem]">
                <div className="overflow-hidden w-[26px] h-[26px]">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F82fbda66cf3604653aa601ba1b04657d51b7af89.svg?generation=1778677416049480&amp;alt=media" className="block size-full" />
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
              <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F41543b7a9b5b5e291515e6237df211289780a1d3.svg?generation=1778677416090375&amp;alt=media" className="inline w-full h-20" />
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

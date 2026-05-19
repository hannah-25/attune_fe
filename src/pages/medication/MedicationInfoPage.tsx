import React from 'react';
import { ChevronLeft, MoreHorizontal, Pill } from 'lucide-react';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { mockMedicationInfo } from '@/mocks/medication.mock';

const MEDICATION = mockMedicationInfo;

export default function MedicationInfoPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="약품 정보"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
          right={<HeaderIconButton icon={<MoreHorizontal className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="items-center flex gap-3">
              <div className="items-center flex justify-center w-14 h-14 bg-white rounded-[1.125rem]">
                <Pill className="w-7 h-7 text-purple-500" strokeWidth={2.3} />
              </div>
              <div className="grow basis-[0%]">
                <div className="font-extrabold text-2xl" style={{ fontFamily: 'NanumSquare, system-ui' }}>{MEDICATION.name}</div>
                <div className="mt-[2px] text-gray-600">{MEDICATION.ingredient}</div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex mb-[10px] gap-1.5">
              <div className="font-bold">혈중 농도 추이</div>
              <div className="grow basis-[0%]"></div>
              <div className="text-gray-600 text-xs">오늘 · 24시간</div>
            </div>
            <div className="relative h-20 rounded-xl bg-purple-50 overflow-hidden">
              <div className="absolute left-0 right-0 bottom-6 h-[2px] bg-purple-200" />
              <div className="absolute left-[10%] bottom-6 w-[18%] h-7 rounded-t-full border-t-2 border-purple-500" />
              <div className="absolute left-[28%] bottom-6 w-[22%] h-12 rounded-t-full border-t-2 border-purple-500" />
              <div className="absolute left-[50%] bottom-6 w-[24%] h-9 rounded-t-full border-t-2 border-purple-500" />
              <div className="absolute left-[74%] bottom-6 w-[16%] h-4 rounded-t-full border-t-2 border-purple-500" />
              <div className="absolute left-[22%] bottom-5 w-2 h-2 bg-purple-300 rounded-sm" />
              <div className="absolute left-[53%] bottom-5 w-2 h-2 bg-purple-300 rounded-sm" />
            </div>
            <div className="flex justify-between mt-1 text-gray-500 text-xs">
              <div>06시</div><div>09시</div><div>12시</div><div>15시</div><div>18시</div><div>21시</div><div>24시</div>
            </div>
          </div>
          <InfoCard title="효능">{MEDICATION.efficacy}</InfoCard>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex mb-2 gap-1.5">
              <div className="font-bold">흔한 부작용</div>
              <div className="grow basis-[0%]"></div>
              <div className="text-gray-500 text-xs">식약처 자료</div>
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

function InfoCard({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
      <div className="font-bold mb-2">{title}</div>
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

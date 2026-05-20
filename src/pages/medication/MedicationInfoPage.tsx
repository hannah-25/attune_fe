import React, { useEffect, useState } from 'react';
import { MoreHorizontal, Pill } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { getMedicationStandard } from '@/api/medication';

type MedicationInfo = {
  name: string;
  ingredient: string;
  indications: string;
  sideEffects: string;
  bloodConcentrationGraph: string;
};

export default function MedicationInfoPage() {
  const [searchParams] = useSearchParams();
  const medicationId = Number(searchParams.get('id') ?? 1);
  const [medication, setMedication] = useState<MedicationInfo | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    getMedicationStandard(medicationId)
      .then((response) => {
        if (!ignore) setMedication(response);
      })
      .catch(() => {
        if (!ignore) setError('약품 정보를 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, [medicationId]);

  const sideEffects = splitSideEffects(medication?.sideEffects);

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="약품 정보"
          left={<NavBackButton />}
          right={<HeaderIconButton icon={<MoreHorizontal className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="items-center flex gap-3">
              <div className="items-center flex justify-center w-14 h-14 bg-white rounded-[1.125rem]">
                <Pill className="w-7 h-7 text-purple-500" strokeWidth={2.3} />
              </div>
              <div className="grow basis-[0%]">
                <div className="font-extrabold text-2xl" style={{ fontFamily: 'NanumSquare, system-ui' }}>{medication?.name ?? '약품 정보'}</div>
                <div className="mt-[2px] text-gray-600">{medication?.ingredient ?? '-'}</div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex mb-[10px] gap-1.5">
              <div className="font-bold">혈중 농도 추이</div>
              <div className="grow basis-[0%]"></div>
              <div className="text-gray-600 text-xs">오늘 · 24시간</div>
            </div>
            {medication?.bloodConcentrationGraph ? (
              <img src={medication.bloodConcentrationGraph} alt="혈중 농도 추이" className="w-full h-20 object-contain" />
            ) : (
              <BloodConcentrationChart />
            )}
            <div className="flex justify-between mt-1 text-gray-500 text-xs">
              <div>06시</div><div>09시</div><div>12시</div><div>15시</div><div>18시</div><div>21시</div><div>24시</div>
            </div>
            <div className="flex mt-3 gap-[14px]">
              <div className="items-center flex text-gray-600 text-xs gap-1">
                <div className="w-2 h-2 bg-[#ff8e72] rounded-sm"></div>
                <span className="block">복용 시점</span>
              </div>
              <div className="items-center flex text-gray-600 text-xs gap-1">
                <div className="w-2 h-[2px] bg-purple-400 rounded-[1px]"></div>
                <span className="block">예상 농도</span>
              </div>
            </div>
          </div>
          <InfoCard title="효능">{medication?.indications ?? '-'}</InfoCard>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex mb-2 gap-1.5">
              <div className="font-bold">흔한 부작용</div>
              <div className="grow basis-[0%]"></div>
              <div className="text-gray-500 text-xs">식약처 자료</div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sideEffects.map((effect) => (
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

function splitSideEffects(sideEffects?: string) {
  if (!sideEffects) return [];
  return sideEffects.split(/[,，]/).map((effect) => effect.trim()).filter(Boolean);
}

function BloodConcentrationChart() {
  return (
    <div className="inline overflow-hidden w-full h-20">
      <svg
        aria-hidden="true"
        className="inline w-full h-20"
        viewBox="0 0 280 80"
        preserveAspectRatio="none"
      >
        <line x1="0" x2="280" y1="20" y2="20" stroke="rgb(233, 228, 220)" strokeDasharray="2 3" strokeWidth="1" />
        <line x1="0" x2="280" y1="40" y2="40" stroke="rgb(233, 228, 220)" strokeDasharray="2 3" strokeWidth="1" />
        <line x1="0" x2="280" y1="60" y2="60" stroke="rgb(233, 228, 220)" strokeDasharray="2 3" strokeWidth="1" />
        <path
          d="M0 70 C 40 70, 60 18, 90 22 C 110 25, 120 60, 145 56 C 165 53, 180 14, 210 22 C 230 28, 260 58, 280 60 L 280 80 L 0 80 Z"
          fill="rgb(185, 166, 255)"
          opacity="0.25"
        />
        <path
          d="M0 70 C 40 70, 60 18, 90 22 C 110 25, 120 60, 145 56 C 165 53, 180 14, 210 22 C 230 28, 260 58, 280 60"
          fill="none"
          stroke="rgb(185, 166, 255)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="70" r="4" fill="rgb(255, 142, 114)" />
        <circle cx="130" cy="64" r="4" fill="rgb(255, 142, 114)" />
        <circle cx="220" cy="40" r="4" fill="rgb(255, 142, 114)" stroke="rgb(255, 255, 255)" strokeWidth="2" />
      </svg>
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

import React, { useEffect, useState } from 'react';
import { MoreHorizontal, Pill } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import {
  getMedicationStandard,
  getMedications,
  type MedicationStandard,
  type MedicationSummary,
} from '@/api/medication';
import MedicationConcentrationCard from '@/components/pk/MedicationConcentrationCard';
import { resolveProfile } from '@/lib/pk';

type MedicationInfo = MedicationStandard;

export default function MedicationInfoPage() {
  const [searchParams] = useSearchParams();
  const medicationId = Number(searchParams.get('id') ?? 1);
  const [medication, setMedication] = useState<MedicationInfo | null>(null);
  const [userMedication, setUserMedication] = useState<MedicationSummary | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    Promise.all([
      getMedicationStandard(medicationId),
      getMedications().catch(() => [] as MedicationSummary[]),
    ])
      .then(([standard, userMedications]) => {
        if (ignore) return;
        setMedication(standard ?? null);
        setUserMedication(standard ? findUserMedication(userMedications, medicationId, standard) : null);
      })
      .catch((err) => {
        console.error('Failed to load medication info:', err);
        if (!ignore) setError('약품 정보를 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, [medicationId]);

  const sideEffects = splitSideEffects(medication?.sideEffects);

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
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
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] p-4 rounded-[1.625rem]">
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
          <MedicationConcentrationCard medication={medication} startedAt={userMedication?.startedAt} />
          <InfoCard title="효능">{medication?.indications ?? '-'}</InfoCard>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] p-[14px] rounded-[1.375rem]">
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

function findUserMedication(
  userMedications: MedicationSummary[],
  medicationId: number,
  standard: MedicationStandard,
) {
  const byId = userMedications.find((medication) => medication.medicationId === medicationId);
  if (byId) return byId;

  const standardProfileId = resolveProfile({ name: standard.name, ingredient: standard.ingredient })?.id;
  if (standardProfileId) {
    const byProfile = userMedications.find((medication) =>
      resolveProfile({ name: medication.medicationName })?.id === standardProfileId,
    );
    if (byProfile) return byProfile;
  }

  const standardName = normalizeName(standard.name);
  return userMedications.find((medication) => {
    const userName = normalizeName(medication.medicationName);
    return Boolean(standardName && userName && (userName.includes(standardName) || standardName.includes(userName)));
  }) ?? null;
}

function normalizeName(value?: string | null) {
  return (value ?? '').toLowerCase().replace(/\s+/g, '');
}

function splitSideEffects(sideEffects?: string) {
  if (!sideEffects) return [];
  return sideEffects.split(/[,，]/).map((effect) => effect.trim()).filter(Boolean);
}

function InfoCard({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] p-[14px] rounded-[1.375rem]">
      <div className="font-bold mb-2">{title}</div>
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

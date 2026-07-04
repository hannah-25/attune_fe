import React, { useEffect, useMemo, useState } from 'react';
import { Info } from 'lucide-react';
import {
  buildConcentrationSeries,
  buildEffectAccrualSeries,
  createDoseEvent,
  formatHours,
  getTreatmentDay,
  resolveProfile,
  type PkProfile,
} from '@/lib/pk';
import type { MedicationStandard } from '@/api/medication';
import ConcentrationChart from './ConcentrationChart';
import EffectAccrualChart from './EffectAccrualChart';

const SHADOW = 'shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px]';
const CARD = `bg-white ${SHADOW} p-[14px] rounded-[1.375rem]`;

// 표준 곡선 앵커: 대표 복용 시각(오전 8시).
const DOSE_HOUR = 8;
const DAY_GRID = { startHour: 6, endHour: 24, stepMinutes: 5 };
const X_TICKS = [6, 9, 12, 15, 18, 21, 24];

const SAFETY_CAVEAT =
  '평균 환자 기준 교육용 추정치입니다. 의료 조언이 아니며 실제 혈중 농도·효과는 크게 다를 수 있습니다. 복용량·복용 시간 변경은 반드시 처방 의료진과 상의하세요.';

const CONFIDENCE_LABEL: Record<'high' | 'medium' | 'low', string> = {
  high: '높음',
  medium: '중간',
  low: '낮음',
};

export default function MedicationConcentrationCard({
  medication,
  startedAt,
}: {
  medication: MedicationStandard | null;
  startedAt?: string | null;
}) {
  const profile = useMemo<PkProfile | null>(() => {
    if (!medication) return null;
    return medication.pkProfile ?? resolveProfile({ name: medication.name, ingredient: medication.ingredient });
  }, [medication]);

  if (!medication) {
    return (
      <div className={CARD}>
        <div className="font-bold mb-[10px]">혈중 농도 추이</div>
        <div className="h-[168px] animate-pulse bg-gray-100 rounded-xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={CARD}>
        <div className="font-bold mb-2">혈중 농도 추이</div>
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <Info className="w-7 h-7 text-gray-300" strokeWidth={1.6} />
          <div className="text-gray-500 text-sm font-semibold">곡선 준비 중</div>
          <div className="text-gray-400 text-xs leading-relaxed px-4">
            이 약물의 혈중 농도 곡선은 아직 제공되지 않습니다. 근거가 확보된 약물부터 순차적으로 추가됩니다.
          </div>
        </div>
      </div>
    );
  }

  if (profile.modelKind === 'accumulation') {
    return <AccumulationCard profile={profile} startedAt={startedAt} />;
  }

  return <SameDayCard profile={profile} medication={medication} />;
}

function SameDayCard({ profile, medication }: { profile: PkProfile; medication: MedicationStandard }) {
  const doseOptions = useMemo(() => {
    const amounts = (medication.dosageOptions ?? [])
      .map((d) => d.amount)
      .filter((a) => typeof a === 'number' && a > 0);
    const unique = Array.from(new Set([profile.reference.calibrationDoseMg, ...amounts])).sort((a, b) => a - b);
    return unique;
  }, [medication.dosageOptions, profile.reference.calibrationDoseMg]);

  const [doseMg, setDoseMg] = useState<number>(profile.reference.calibrationDoseMg);
  const [showComponents, setShowComponents] = useState(false);
  const hasComponents = profile.releaseProfile === 'oros-dual' || profile.releaseProfile === 'er-capsule';

  useEffect(() => {
    setDoseMg(profile.reference.calibrationDoseMg);
    setShowComponents(false);
  }, [profile.id, profile.reference.calibrationDoseMg]);

  const { series, components, stats } = useMemo(
    () =>
      buildConcentrationSeries({
        profile,
        doseEvents: [createDoseEvent({ medicationId: profile.id, amountMg: doseMg, takenAtHour: DOSE_HOUR })],
        grid: DAY_GRID,
      }),
    [profile, doseMg],
  );

  const evidence = profile.evidence[0];

  return (
    <div className={CARD}>
      <div className="items-center flex mb-[10px] gap-1.5">
        <div className="font-bold">혈중 농도 추이</div>
        <div className="grow basis-[0%]" />
        <div className="text-gray-600 text-xs">오늘 · {DOSE_HOUR}시 복용</div>
      </div>

      {doseOptions.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {doseOptions.map((amount) => {
            const active = amount === doseMg;
            return (
              <button
                key={amount}
                type="button"
                onClick={() => setDoseMg(amount)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  active
                    ? 'bg-purple-100 border-[rgb(185,166,255)] text-purple-800'
                    : 'bg-transparent border-transparent text-gray-500'
                }`}
              >
                {amount}mg
              </button>
            );
          })}
        </div>
      )}

      <ConcentrationChart
        series={series}
        field="raw"
        irSeries={components.ir}
        erSeries={components.er}
        showComponents={hasComponents && showComponents}
        effectWindow={{ start: DOSE_HOUR + profile.effectStartHours, end: DOSE_HOUR + profile.effectEndHours }}
        peak={{ hour: stats.tmaxHour, value: stats.cmaxRaw }}
        doseHours={[DOSE_HOUR]}
        xTicks={X_TICKS}
        xDomain={[DAY_GRID.startHour, DAY_GRID.endHour]}
      />

      <div className="flex flex-wrap gap-1.5 mt-3">
        <Chip label="1차 피크" value={`복용 후 ${formatHours(profile.peakTimeHours)}`} />
        <Chip label="최대 농도" value={`${stats.cmaxRaw.toFixed(1)} ng/mL`} />
        <Chip label="작용 종료" value={`복용 후 ${formatHours(profile.effectEndHours)}`} />
      </div>

      <div className="flex items-center mt-3 gap-[14px]">
        <Legend color={DOSE_DOT} label="복용 시점" />
        <Legend bar label="예상 농도" />
        {hasComponents && (
          <button
            type="button"
            onClick={() => setShowComponents((v) => !v)}
            className="ml-auto text-xs font-semibold text-purple-600"
          >
            IR/ER 구성 {showComponents ? '숨기기' : '보기'}
          </button>
        )}
      </div>

      <EvidenceFooter evidence={evidence} />
    </div>
  );
}
function AccumulationCard({ profile, startedAt }: { profile: PkProfile; startedAt?: string | null }) {
  const accrual = profile.effectAccrual;
  const treatmentDay = useMemo(() => getTreatmentDay(startedAt), [startedAt]);
  const currentWeek = treatmentDay ? (treatmentDay - 1) / 7 : undefined;
  const currentWeekLabel = treatmentDay ? `${Math.ceil(treatmentDay / 7)}주차 · ${treatmentDay}일째` : undefined;
  const series = useMemo(() => {
    if (!accrual) return [];
    return buildEffectAccrualSeries({
      effectAccrual: accrual,
      endWeeks: Math.max(accrual.stabilizeWeeks + 4, currentWeek ?? 0),
    });
  }, [accrual, currentWeek]);
  const daily = useMemo(
    () =>
      buildConcentrationSeries({
        profile,
        doseEvents: [createDoseEvent({ medicationId: profile.id, amountMg: profile.reference.calibrationDoseMg, takenAtHour: DOSE_HOUR })],
        grid: DAY_GRID,
      }),
    [profile],
  );
  const evidence = profile.evidence[0];

  if (!accrual) return null;

  return (
    <div className={CARD}>
      <div className="items-center flex mb-[10px] gap-1.5">
        <div className="font-bold">효과 누적 추이</div>
        <div className="grow basis-[0%]" />
        <div className="text-gray-600 text-xs">주 단위 · 누적형</div>
      </div>

      <div className="text-gray-500 text-xs leading-relaxed mb-2">
        이 약물은 당일 혈중 농도보다 <span className="font-semibold text-gray-700">효과가 몇 주에 걸쳐 쌓이는</span> 비자극제입니다.
      </div>

      <EffectAccrualChart
        series={series}
        onsetWeeks={accrual.onsetWeeks}
        stabilizeWeeks={accrual.stabilizeWeeks}
        currentWeek={currentWeek}
        currentLabel="현재"
      />

      {currentWeekLabel && (
        <div className="text-[11px] text-gray-500 mt-1.5">
          현재 복용 기준: <span className="font-bold text-gray-700">{currentWeekLabel}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mt-3">
        <Chip label="발현 시작" value={`약 ${accrual.onsetWeeks}주`} />
        <Chip label="효과 안정" value={`약 ${accrual.stabilizeWeeks}주`} />
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="items-center flex mb-1.5 gap-1.5">
          <div className="font-bold text-sm">당일 혈중 농도 추이</div>
          <div className="grow" />
          <div className="text-gray-500 text-xs">{DOSE_HOUR}시 복용 가정</div>
        </div>
        <div className="text-[11px] text-gray-400 leading-relaxed mb-2">
          아토목세틴은 효과가 주 단위로 누적되므로, 이 곡선은 당일 혈중 농도 참고용입니다.
        </div>
        <ConcentrationChart
          series={daily.series}
          field="percent"
          peak={{ hour: daily.stats.tmaxHour, value: 100 }}
          doseHours={[DOSE_HOUR]}
          xTicks={X_TICKS}
          xDomain={[DAY_GRID.startHour, DAY_GRID.endHour]}
          height={150}
        />
        <div className="flex flex-wrap gap-1.5 mt-3">
          <Chip label="혈중 피크" value={`복용 후 ${formatHours(profile.peakTimeHours)}`} />
          <Chip label="표시 단위" value="피크 대비 %" />
        </div>
      </div>

      {profile.metabolismNote && (
        <div className="text-gray-400 text-[11px] leading-relaxed mt-2">· {profile.metabolismNote}</div>
      )}

      <EvidenceFooter evidence={evidence} />
    </div>
  );
}
const DOSE_DOT = 'rgb(255, 142, 114)';

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col bg-purple-50 rounded-xl px-2.5 py-1.5 min-w-[84px]">
      <span className="text-[10px] text-gray-500 font-semibold">{label}</span>
      <span className="text-xs font-bold text-purple-800">{value}</span>
    </div>
  );
}

function Legend({ color, bar, label }: { color?: string; bar?: boolean; label: string }) {
  return (
    <div className="items-center flex text-gray-600 text-xs gap-1">
      {bar ? (
        <div className="w-2 h-[2px] bg-purple-400 rounded-[1px]" />
      ) : (
        <div className="w-2 h-2 rounded-sm" style={{ background: color }} />
      )}
      <span className="block">{label}</span>
    </div>
  );
}

function EvidenceFooter({
  evidence,
}: {
  evidence?: { source: string; confidence: 'high' | 'medium' | 'low' };
}) {
  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      {evidence && (
        <div className="flex items-start gap-1.5 mb-1.5">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-700 shrink-0">
            근거 {CONFIDENCE_LABEL[evidence.confidence]}
          </span>
          <span className="text-[11px] text-gray-400 leading-relaxed">{evidence.source}</span>
        </div>
      )}
      <div className="text-[11px] text-gray-400 leading-relaxed">{SAFETY_CAVEAT}</div>
    </div>
  );
}

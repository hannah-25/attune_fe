import React, { useEffect, useMemo, useState } from 'react';
import {
  buildConcentrationSeries,
  buildEffectAccrualSeries,
  createDoseEvent,
  classifyJournalTag,
  resolveProfile,
  profileForAbsorptionScale,
  solveScaleForTmax,
  PD_SIGNAL,
  type DoseEvent,
  type PdSignal,
  type PkProfile,
} from '@/lib/pk';
import { getJournal } from '@/api/journal';
import { getAllMedicationLogs, type MedicationPeriodLog } from '@/api/medication';
import ConcentrationChart, { type ConcentrationMarker } from './ConcentrationChart';
import EffectAccrualChart from './EffectAccrualChart';

const SHADOW = 'shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px]';

// 개인 Tmax→흡수 scale 역산용 정규 그리드(복용 0시, 상대 경과시간 그대로 Tmax).
const SOLVE_GRID = { startHour: 0, endHour: 24, stepMinutes: 5 };
// Tmax 슬라이더 스텝(시간).
const TMAX_STEP = 0.25;

// 신호별 색(타임라인 카테고리 색과 일치). 신호 종류는 색 + 레인 높이로 구분.
const SIGNAL_COLOR: Record<PdSignal, string> = {
  [PD_SIGNAL.THERAPEUTIC_RESPONSE]: 'rgb(168, 85, 247)',
  [PD_SIGNAL.SIDE_EFFECT]: 'rgb(255, 140, 80)',
  [PD_SIGNAL.IMPAIRMENT]: 'rgb(80, 140, 220)',
  [PD_SIGNAL.CONTEXT]: 'rgb(156, 163, 175)',
};
const SIGNAL_LABEL: Record<PdSignal, string> = {
  [PD_SIGNAL.THERAPEUTIC_RESPONSE]: '좋은 반응',
  [PD_SIGNAL.SIDE_EFFECT]: '부작용',
  [PD_SIGNAL.IMPAIRMENT]: '불편·실수',
  [PD_SIGNAL.CONTEXT]: '컨텍스트',
};

// 점은 곡선(농도) 위가 아니라 신호별 3등분 레인 높이에 찍는다(데모와 동일).
// 점 높이는 '카테고리'를 뜻할 뿐 농도·효과 강도가 아니다(pk-model-principles.md).
// y축 최대(Cmax) 대비 비율 — 위에서부터 부작용 > 좋은 반응 > 불편·실수.
const SIGNAL_LANE: Record<PdSignal, number> = {
  [PD_SIGNAL.SIDE_EFFECT]: 5 / 6,
  [PD_SIGNAL.THERAPEUTIC_RESPONSE]: 3 / 6,
  [PD_SIGNAL.IMPAIRMENT]: 1 / 6,
  [PD_SIGNAL.CONTEXT]: 3 / 6,
};

type CheckObservation = {
  clockHour: number;
  signal: PdSignal;
  label: string;
};

type ResolvedMedication = {
  profile: PkProfile;
  doseHours: number[];
};

type EmptyState = 'no-dose-log' | 'unsupported-medication' | null;

/** ISO datetime → 자정 기준 시(hour, 소수). */
function clockHour(iso: string): number {
  const d = new Date(iso);
  return d.getHours() + d.getMinutes() / 60;
}

function resolveFromTakenLogs(takenLogs: MedicationPeriodLog[]): ResolvedMedication | null {
  let sameDay: PkProfile | null = null;
  let accumulation: PkProfile | null = null;

  for (const log of takenLogs) {
    const profile = resolveProfile({ name: log.name });
    if (!profile) continue;
    if (profile.modelKind === 'same-day-curve' && !sameDay) sameDay = profile;
    else if (profile.modelKind === 'accumulation' && !accumulation) accumulation = profile;
  }

  const profile = sameDay ?? accumulation;
  if (!profile) return null;

  const doseHours = takenLogs
    .filter((log) => resolveProfile({ name: log.name })?.id === profile.id)
    .map((log) => clockHour(log.intakeTime))
    .sort((a, b) => a - b);

  return { profile, doseHours: doseHours.length ? doseHours : [8] };
}

/** Date → YYYY-MM-DD(로컬). journalDate와 같은 포맷. */
function toDateKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/**
 * 하루 개인 반응: 집단 PK 곡선 위에 그날 저널 기록을 신호 색별 점으로 오버레이.
 * adhd-med-graph personal-response-demo의 Attune 이식(정밀 hoursAfterDose).
 *
 * 가드레일(pk-model-principles.md): 표시는 PK 곡선 + 저널 점 + 서술 요약뿐.
 * 연속 개인반응 곡선(스무딩)·농도 임계 밴드는 그리지 않는다.
 */
export default function PersonalResponseCard({ date, revision = 0 }: { date: string; revision?: number }) {
  const [profile, setProfile] = useState<PkProfile | null>(null);
  const [doseHours, setDoseHours] = useState<number[]>([]);
  const [checks, setChecks] = useState<CheckObservation[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [emptyState, setEmptyState] = useState<EmptyState>(null);
  // 개인 흡수 속도 보정: 사용자가 느끼는 Tmax(복용→피크 시간). null = 집단 기준.
  const [personalTmax, setPersonalTmax] = useState<number | null>(null);
  // 누적형 약물에서 혈중 농도 곡선 접기/펼치기.
  const [showConcentration, setShowConcentration] = useState(false);
  // "지금" 라인용 현재 시각. 1분마다 갱신.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // 약물이 바뀌면 개인 보정값/접기 상태 초기화.
  useEffect(() => {
    setPersonalTmax(null);
    setShowConcentration(false);
  }, [profile?.id]);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    Promise.all([
      getJournal(date).catch(() => null),
      getAllMedicationLogs({ startDate: date, endDate: date }).catch(() => ({ logs: [] as MedicationPeriodLog[] })),
    ])
      .then(([journal, medLogs]) => {
        if (cancelled) return;

        const takenLogs = (medLogs?.logs ?? []).filter((l) => l.taken);
        if (takenLogs.length === 0) {
          setProfile(null);
          setDoseHours([]);
          setChecks([]);
          setEmptyState('no-dose-log');
          setLoaded(true);
          return;
        }

        // 그날 복용한 로그 중 PK 프로필이 해석되는 약물 1종 선택.
        // same-day(곡선+Tmax)를 우선, 없으면 accumulation(효과 누적)으로 폴백.
        const chosen = resolveFromTakenLogs(takenLogs);
        if (!chosen) {
          setProfile(null);
          setDoseHours([]);
          setChecks([]);
          setEmptyState('unsupported-medication');
          setLoaded(true);
          return;
        }

        const obs: CheckObservation[] = [];
        if (journal?.checked) {
          const { conditions = [], sideEffects = [], troubles = [] } = journal.checked;
          for (const c of conditions) {
            obs.push({
              clockHour: clockHour(c.checkedAt),
              signal: classifyJournalTag({ tagId: c.tagId, category: 'CONDITION', tagType: c.conditionType }).signal,
              label: c.condition,
            });
          }
          for (const s of sideEffects) {
            obs.push({
              clockHour: clockHour(s.checkedAt),
              signal: classifyJournalTag({ tagId: s.tagId, category: 'SIDE_EFFECT', tagType: 'NONE' }).signal,
              label: s.sideEffect,
            });
          }
          for (const t of troubles) {
            obs.push({
              clockHour: clockHour(t.checkedAt),
              signal: classifyJournalTag({ tagId: t.tagId, category: 'TROUBLE', tagType: t.type }).signal,
              label: t.trouble,
            });
          }
        }

        setProfile(chosen.profile);
        setDoseHours(chosen.doseHours);
        setChecks(obs);
        setEmptyState(null);
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) {
          setProfile(null);
          setDoseHours([]);
          setChecks([]);
          setEmptyState(null);
          setLoaded(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [date, revision]);

  // 보고 있는 날짜가 오늘일 때만 "지금" 시각(절대 hour). 아니면 undefined.
  const nowHour = toDateKey(now) === date ? now.getHours() + now.getMinutes() / 60 : undefined;
  // grid 시작 시각용 시(時) 힌트(분 단위로 series가 재계산되지 않도록 정수화).
  const nowStartHint = nowHour != null ? Math.floor(nowHour) : null;

  // 집단 프로필을 개인 Tmax에 맞게 흡수 속도(scale) 보정한 복제본.
  // 소실 반감기는 건드리지 않고 흡수 타이밍만 옮긴다(absorption.ts).
  const effectiveProfile = useMemo<PkProfile | null>(() => {
    if (!profile) return null;
    const target = personalTmax ?? profile.reference.tmaxHours;
    if (Math.abs(target - profile.reference.tmaxHours) < 1e-3) return profile;
    const scale = solveScaleForTmax({
      profile,
      doseEvents: [createDoseEvent({ medicationId: profile.id, amountMg: profile.reference.calibrationDoseMg, takenAtHour: 0 })],
      grid: SOLVE_GRID,
      targetTmaxHour: target,
    });
    return profileForAbsorptionScale(profile, scale);
  }, [profile, personalTmax]);

  const built = useMemo(() => {
    if (!effectiveProfile || doseHours.length === 0) return null;
    const firstDose = doseHours[0];
    // 시작 시각은 6시/첫 복용 1시간 전, 그리고 현재 시각보다 앞서도록(지금 라인이 범위 안).
    const startHour = Math.max(0, Math.min(6, firstDose - 1, nowStartHint ?? 6));
    const grid = { startHour, endHour: 24, stepMinutes: 5 };
    const doseEvents: DoseEvent[] = doseHours.map((h) =>
      createDoseEvent({ medicationId: effectiveProfile.id, amountMg: effectiveProfile.reference.calibrationDoseMg, takenAtHour: h }),
    );
    const { series, stats } = buildConcentrationSeries({ profile: effectiveProfile, doseEvents, grid });
    return { series, grid, firstDose, stats };
  }, [effectiveProfile, doseHours, nowStartHint]);

  // 누적형(아토목세틴) 주 단위 효과 누적 곡선.
  const accrualSeries = useMemo(() => {
    const accrual = profile?.effectAccrual;
    if (!accrual) return [];
    return buildEffectAccrualSeries({ effectAccrual: accrual, endWeeks: accrual.stabilizeWeeks + 4 });
  }, [profile?.effectAccrual]);

  const markers = useMemo<ConcentrationMarker[]>(() => {
    if (!built) return [];
    // 점은 곡선이 아니라 신호별 3등분 레인 높이(Cmax 대비 비율)에 찍는다.
    const yMax = built.stats.cmaxRaw || 1;
    return checks
      .filter((o) => o.clockHour >= built.grid.startHour && o.clockHour <= built.grid.endHour)
      .map((o) => ({
        hour: o.clockHour,
        value: SIGNAL_LANE[o.signal] * yMax,
        color: SIGNAL_COLOR[o.signal],
        label: o.label,
      }));
  }, [built, checks]);

  if (!loaded) return null;
  if (emptyState) return <ResponseEmptyCard state={emptyState} />;
  if (!built) return null;
  // same-day는 저널 점 오버레이가 목적이라 점이 없으면 숨김.
  // accumulation은 효과 누적 추이 자체가 본 내용이라 점이 없어도 표시.
  const isAccumulation = profile!.modelKind === 'accumulation';
  if (!isAccumulation && markers.length === 0) return null;

  const usedSignals = Array.from(new Set(checks.map((o) => o.signal)));

  return (
    <div className="mb-2">
      {profile!.modelKind === 'accumulation' ? (
        <>
          {/* 누적형: 효과 누적 추이를 기본으로, 혈중 농도 곡선은 접기. */}
          <EffectAccrualChart
            series={accrualSeries}
            onsetWeeks={profile!.effectAccrual?.onsetWeeks}
            stabilizeWeeks={profile!.effectAccrual?.stabilizeWeeks}
            height={220}
          />
          <AccumulationNote profile={profile!} />

          <button
            type="button"
            onClick={() => setShowConcentration((v) => !v)}
            className="mt-3 text-xs font-semibold text-purple-600"
          >
            혈중 농도 추이 {showConcentration ? '숨기기' : '보기'}
          </button>
          {showConcentration && (
            <div className="mt-2">
              <div className="text-[11px] text-gray-400 mb-1.5">
                혈중 농도가 높은 시간이 곧 효과가 큰 시간은 아닙니다.
              </div>
              <ConcentrationChart
                series={built.series}
                field="raw"
                effectWindow={{ start: built.firstDose + profile!.effectStartHours, end: built.firstDose + profile!.effectEndHours }}
                peak={{ hour: built.stats.tmaxHour, value: built.stats.cmaxRaw }}
                doseHours={doseHours}
                nowHour={nowHour}
                markers={markers}
                xTicks={[6, 9, 12, 15, 18, 21, 24]}
                xDomain={[built.grid.startHour, built.grid.endHour]}
                height={200}
              />
              <SignalLegend signals={usedSignals} className="mt-2" />
            </div>
          )}
        </>
      ) : (
        <>
          <ConcentrationChart
            series={built.series}
            field="raw"
            effectWindow={{ start: built.firstDose + profile!.effectStartHours, end: built.firstDose + profile!.effectEndHours }}
            peak={{ hour: built.stats.tmaxHour, value: built.stats.cmaxRaw }}
            doseHours={doseHours}
            nowHour={nowHour}
            markers={markers}
            xTicks={[6, 9, 12, 15, 18, 21, 24]}
            xDomain={[built.grid.startHour, built.grid.endHour]}
            height={220}
          />
          <TmaxControl
            referenceTmax={profile!.reference.tmaxHours}
            value={personalTmax ?? profile!.reference.tmaxHours}
            adjusted={personalTmax !== null}
            onChange={setPersonalTmax}
            onReset={() => setPersonalTmax(null)}
            legend={<SignalLegend signals={usedSignals} />}
          />
        </>
      )}
    </div>
  );
}

function ResponseEmptyCard({ state }: { state: Exclude<EmptyState, null> }) {
  const copy = state === 'no-dose-log'
    ? {
      title: '오늘 복용 기록이 없습니다',
      body: '복용을 기록하면 혈중 농도 곡선 위에 오늘의 일지 기록이 점으로 표시됩니다.',
    }
    : {
      title: '그래프 준비 중',
      body: '오늘 복용한 약물은 아직 혈중 농도 그래프를 지원하지 않습니다.',
    };

  return (
    <div className={`mb-2 bg-white ${SHADOW} rounded-[1.375rem] p-4`}>
      <div className="font-bold text-gray-800 mb-1">{copy.title}</div>
      <div className="text-xs text-gray-400 leading-relaxed">{copy.body}</div>
    </div>
  );
}

/**
 * 개인 흡수 속도(Tmax) 보정 슬라이더 — what-if 추정이지 측정값이 아니다.
 * 집단 기준 Tmax를 중심으로 ±, 곡선의 피크 시점만 옮긴다.
 */
function TmaxControl({
  referenceTmax,
  value,
  adjusted,
  onChange,
  onReset,
  legend,
}: {
  referenceTmax: number;
  value: number;
  adjusted: boolean;
  onChange: (next: number) => void;
  onReset: () => void;
  legend?: React.ReactNode;
}) {
  const min = Math.max(0.5, Math.round(referenceTmax * 0.5 * 4) / 4);
  const max = Math.round(referenceTmax * 2 * 4) / 4;
  return (
    <div className="mt-3">
      {legend && <div className="mb-2">{legend}</div>}
      {/* 슬라이더 라벨(유료 전용) — 제목은 단독 줄, 보조 정보는 아랫줄. */}
      <div className="text-xs font-semibold text-gray-600 mb-1">개인 보정 : peak time 조절</div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">PRO</span>
        <div className="grow" />
        <span className="text-[11px] text-gray-400">피크 {value.toFixed(2)}h</span>
        {adjusted && (
          <button type="button" onClick={onReset} className="text-[11px] font-semibold text-purple-600 ml-1.5">
            기본값
          </button>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={TMAX_STEP}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-purple-500"
        aria-label="개인 흡수 속도(Tmax) 조절"
      />
      <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
        <span>빠른 흡수</span>
        <span>느린 흡수</span>
      </div>
    </div>
  );
}

/** 신호 색 범례. 슬라이더 헤더에 인라인하거나 단독으로 쓴다. */
function SignalLegend({ signals, className = '' }: { signals: PdSignal[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      {signals.map((sig) => (
        <div key={sig} className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="w-2 h-2 rounded-full" style={{ background: SIGNAL_COLOR[sig] }} />
          {SIGNAL_LABEL[sig]}
        </div>
      ))}
    </div>
  );
}

/**
 * 누적형(비자극제) 약물용 안내 — 하루 Tmax 조절 대신.
 * 효과가 주 단위로 쌓이는 약이라 당일 흡수 속도 조절이 의미가 없음을 설명한다.
 */
function AccumulationNote({ profile }: { profile: PkProfile }) {
  const accrual = profile.effectAccrual;
  return (
    <div className="mt-3 rounded-xl bg-purple-50 p-3">
      <div className="text-xs font-bold text-purple-800 mb-1">비자극제 · 효과 누적형</div>
      <div className="text-[11px] text-gray-600 leading-relaxed">
        {profile.displayName.replace(/\s*캡슐$/, '')} 같은 비자극제는 당일 혈중 농도보다{' '}
        <span className="font-semibold text-gray-700">효과가 몇 주에 걸쳐 쌓이는</span> 약입니다
        {accrual ? ` (약 ${accrual.onsetWeeks}주 발현 시작 ~ 약 ${accrual.stabilizeWeeks}주 안정).` : '.'}{' '}
        <span className="font-semibold text-gray-700">혈중 농도와 효과가 비례하지 않아</span>, 당일 혈중 농도 곡선은 참고용으로 접어 두었습니다.
      </div>
    </div>
  );
}


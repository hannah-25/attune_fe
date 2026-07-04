import React, { useEffect, useMemo, useState } from 'react';
import {
  buildConcentrationSeries,
  createDoseEvent,
  resolveProfile,
  type ConcentrationSeries,
  type PkProfile,
} from '@/lib/pk';
import { getMedications, type MedicationSummary } from '@/api/medication';
import type { ReportSnapshot } from '@/api/medicationAnalysis';
import ConcentrationChart, { type ConcentrationMarker } from './ConcentrationChart';

const SHADOW = 'shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px]';
const SIDE_EFFECT_COLOR = 'rgb(248, 113, 113)';

/**
 * 시간대(window) 문자열 → 대표 시각(hour). BE가 내려주는 자유 문자열을 유연하게 매핑.
 * TODO(judyjjj106, 2026-07-05, BE peakWindow enum 미확정): 실제 snapshot의 window enum 값을 확인해 매핑을 확정할 것.
 */
function windowToHour(window: string | null | undefined): number | null {
  if (!window) return null;
  const w = window.toLowerCase();
  // 문자열에 숫자(시)가 있으면 우선 사용 (예: "18시", "18:00").
  const digit = w.match(/(\d{1,2})\s*(?:시|:)/);
  if (digit) {
    let h = Number(digit[1]);
    if (h >= 0 && h <= 24) {
      const isPm = w.includes('오후') || w.includes('pm') || w.includes('저녁') || w.includes('밤');
      const isAm = w.includes('오전') || w.includes('am');
      if (isPm && h < 12) {
        h += 12;
      } else if (isAm && h === 12) {
        h = 0;
      }
      return h;
    }
  }
  if (w.includes('아침') || w.includes('오전') || w.includes('morning')) return 8;
  if (w.includes('점심') || w.includes('낮') || w.includes('noon') || w.includes('midday')) return 13;
  if (w.includes('오후') || w.includes('afternoon')) return 15;
  if (w.includes('저녁') || w.includes('밤') || w.includes('evening') || w.includes('night')) return 19;
  return null;
}

function valueAtHour(series: ConcentrationSeries['series'], hour: number): number {
  let nearest = series[0];
  let best = Infinity;
  for (const p of series) {
    const d = Math.abs(p.hour - hour);
    if (d < best) {
      best = d;
      nearest = p;
    }
  }
  return nearest?.raw ?? 0;
}

function parseDoseHour(doseTime?: string): number | null {
  if (!doseTime) return null;
  const m = doseTime.match(/^(\d{1,2})/);
  if (!m) return null;
  const h = Number(m[1]);
  return h >= 0 && h <= 24 ? h : null;
}

type Resolved = { profile: PkProfile; medication: MedicationSummary; doseHour: number };

/**
 * 리포트 기간의 부작용을 표준 PK 곡선 위에 시간대 마커로 오버레이한다.
 * "부작용이 저녁에 발생"을 약효 작용 구간(상승/피크/하강) 맥락으로 설명.
 *
 * 가드레일(pk-model-principles.md): 점/버킷 마커 + 라벨 기반 작용구간 음영만.
 * 연속 개인반응 곡선·농도 임계 밴드는 그리지 않는다. 마커는 시간대 대표값(정밀 점 아님).
 */
export default function ReportConcentrationCard({ snapshot }: { snapshot: ReportSnapshot | null }) {
  const [resolved, setResolved] = useState<Resolved | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getMedications()
      .then((meds) => {
        if (cancelled) return;
        setResolved(pickResolvable(meds));
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const built = useMemo(() => {
    if (!resolved) return null;
    const { profile, doseHour } = resolved;
    const grid = { startHour: Math.min(6, Math.max(0, doseHour - 1)), endHour: 24, stepMinutes: 5 };
    const { series } = buildConcentrationSeries({
      profile,
      doseEvents: [createDoseEvent({ medicationId: profile.id, amountMg: profile.reference.calibrationDoseMg, takenAtHour: doseHour })],
      grid,
    });
    return { series, grid };
  }, [resolved]);

  const markers = useMemo<ConcentrationMarker[]>(() => {
    if (!built || !snapshot) return [];
    return (snapshot.sideEffects ?? [])
      .map((se) => {
        const hour = windowToHour(se.peakWindow);
        if (hour == null) return null;
        return {
          hour,
          value: valueAtHour(built.series, hour),
          color: SIDE_EFFECT_COLOR,
          label: se.tagName,
        };
      })
      .filter((m): m is ConcentrationMarker => m !== null);
  }, [built, snapshot]);

  // 해석 불가(약물 매칭 실패/누적형만/스케줄 없음)면 카드 숨김.
  if (!loaded || !resolved || !built) return null;

  const { profile, medication, doseHour } = resolved;

  return (
    <div className={`bg-white ${SHADOW} p-4 rounded-[1.375rem]`}>
      <div className="flex items-center gap-1.5 mb-1">
        <div className="font-bold">약효 시간대와 부작용</div>
        <div className="grow" />
        <div className="text-gray-500 text-xs">{medication.medicationName}</div>
      </div>
      <div className="text-xs text-gray-400 mb-3">
        표준 곡선({doseHour}시 복용 기준) 위에 이 기간 부작용이 주로 나타난 시간대를 표시합니다.
      </div>

      <ConcentrationChart
        series={built.series}
        field="raw"
        effectWindow={{ start: doseHour + profile.effectStartHours, end: doseHour + profile.effectEndHours }}
        doseHours={[doseHour]}
        markers={markers}
        xTicks={[6, 9, 12, 15, 18, 21, 24]}
        xDomain={[built.grid.startHour, built.grid.endHour]}
      />

      {markers.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {markers.map((m, idx) => (
            <div key={`${m.label}-${m.hour}-${idx}`} className="flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full" style={{ background: m.color }} />
              <span className="text-gray-700 font-semibold">{m.label}</span>
              <span className="text-gray-400">· {windowPhase(profile, doseHour, m.hour)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[11px] text-gray-400 mt-3 leading-relaxed">
          이 기간에는 시간대를 특정할 수 있는 부작용 기록이 없어 곡선만 표시합니다.
        </div>
      )}

      <div className="text-[11px] text-gray-400 leading-relaxed mt-3 pt-3 border-t border-gray-100">
        평균 환자 기준 교육용 추정 곡선입니다. 점의 높이는 그 시각의 추정 농도일 뿐 부작용의 강도가 아닙니다. 복용 변경은 의료진과 상의하세요.
      </div>
    </div>
  );
}

/** 마커 시각이 약효의 어느 국면인지 서술. */
function windowPhase(profile: PkProfile, doseHour: number, markerHour: number): string {
  const rel = markerHour - doseHour;
  if (rel < 0) return '복용 전';
  if (rel <= profile.peakTimeHours) return `복용 후 ${rel.toFixed(0)}h · 상승 구간`;
  if (rel <= profile.effectEndHours) return `복용 후 ${rel.toFixed(0)}h · 하강 구간`;
  return `복용 후 ${rel.toFixed(0)}h · 작용 종료 이후`;
}

/** active + 스케줄 보유 + same-day-curve 프로필이 해석되는 약물 1종 선택. */
function pickResolvable(meds: MedicationSummary[]): Resolved | null {
  for (const med of meds) {
    if (med.isActive === false) continue;
    const profile = resolveProfile({ name: med.medicationName });
    if (!profile || profile.modelKind !== 'same-day-curve') continue;
    const doseHour = parseDoseHour(med.schedules?.[0]?.doseTime) ?? 8;
    return { profile, medication: med, doseHour };
  }
  return null;
}

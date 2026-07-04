// 개인 흡수속도(Tmax) 보정 — 개인별 흡수율/생체이용률 차이로 Tmax가 이동하는 것을
// what-if로 추정한다(측정값 아님). adhd-med-graph personal-response-demo.js의
// profileForScale / solveScaleForTmax 순수 포팅.

import { buildConcentrationSeries } from './concentration-series';
import type { DoseEvent, PkProfile, SamplingGrid } from './types';

/**
 * 흡수 타이밍을 scale로 조정한 프로필 복제본.
 * scale>1 = 빠른 흡수 → IR rate↑, ER tLag/scale·scaleHours/scale → Tmax 앞당김.
 * 소실 반감기는 별개의 생리 파라미터라 그대로 둔다.
 */
export function profileForAbsorptionScale(profile: PkProfile, scale: number): PkProfile {
  if (scale === 1) return profile;
  const r = profile.release;
  return {
    ...profile,
    release: {
      irFraction: r.irFraction,
      ir: { ...r.ir, rate: r.ir.rate * scale },
      er: { ...r.er, tLagHours: r.er.tLagHours / scale, scaleHours: r.er.scaleHours / scale },
    },
  };
}

/**
 * 피크(Tmax)가 targetTmaxHour에 오도록 흡수 scale을 이분 탐색.
 * scale이 커질수록 Tmax는 단조 감소하므로 이분 탐색이 성립한다.
 */
export function solveScaleForTmax({
  profile,
  doseEvents,
  grid,
  targetTmaxHour,
}: {
  profile: PkProfile;
  doseEvents: DoseEvent[];
  grid: SamplingGrid;
  targetTmaxHour: number;
}): number {
  let lo = 0.3;
  let hi = 5.0;
  for (let i = 0; i < 26; i += 1) {
    const mid = (lo + hi) / 2;
    const tmax = buildConcentrationSeries({
      profile: profileForAbsorptionScale(profile, mid),
      doseEvents,
      grid,
    }).stats.tmaxHour;
    if (tmax > targetTmaxHour) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

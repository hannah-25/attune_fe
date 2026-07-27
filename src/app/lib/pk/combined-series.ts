// 여러 약물/복용 기여를 하나의 농도축(ng/mL)에서 합산한다.
// 전제(가드레일): 같은 활성성분(genericName)일 때만 합산이 약리학적으로 성립한다.
//   예) 콘서타 + 페니드 + 메디키넷 = 모두 methylphenidate → 혈중 pool 공유 → raw 합산 OK.
// 서로 다른 성분(예: methylphenidate + atomoxetine)은 절대 합치지 않는다(호출부에서 성분별 그룹핑).

import { buildConcentrationSeries } from './concentration-series';
import type { ConcentrationComponentPoint, ConcentrationPoint, DoseEvent, PkProfile, SamplingGrid } from './types';

/** 합산에 참여하는 개별 기여(하나의 프로필 + 그 프로필의 복용들). */
export type CombinedContribution = {
  /** 구별 키(보통 profile.id). 같은 약을 여러 번 먹으면 하나로 묶여 doseEvents가 여러 개. */
  id: string;
  /** 표시 라벨(약 이름). */
  label: string;
  profile: PkProfile;
  doseEvents: DoseEvent[];
};

export type CombinedSeries = {
  /** 합산 곡선(raw ng/mL + 합산 peak 대비 percent). */
  series: ConcentrationPoint[];
  /** 약별 기여 곡선(겹쳐 그리기용). series와 hour 인덱스 정렬. */
  perMed: Array<{ id: string; label: string; series: ConcentrationComponentPoint[] }>;
  stats: { cmaxRaw: number; tmaxHour: number };
};

/**
 * 각 기여를 공유 grid에서 raw로 계산 후 point-wise 합산.
 * 모든 기여가 같은 grid를 쓰므로 hour 배열이 동일 → 인덱스로 더한다.
 */
export function buildCombinedConcentrationSeries({
  contributions,
  grid,
}: {
  contributions: CombinedContribution[];
  grid: SamplingGrid;
}): CombinedSeries {
  const perMed = contributions.map((c) => {
    const { series } = buildConcentrationSeries({ profile: c.profile, doseEvents: c.doseEvents, grid });
    return { id: c.id, label: c.label, series: series.map((p) => ({ hour: p.hour, raw: p.raw })) };
  });

  const hours = perMed[0]?.series.map((p) => p.hour) ?? [];
  const totalRaw = hours.map((_, i) => perMed.reduce((sum, m) => sum + (m.series[i]?.raw ?? 0), 0));

  let cmaxRaw = 0;
  let tmaxHour = hours[0] ?? 0;
  for (let i = 0; i < hours.length; i += 1) {
    if (totalRaw[i] > cmaxRaw) {
      cmaxRaw = totalRaw[i];
      tmaxHour = hours[i];
    }
  }
  const peak = cmaxRaw > 0 ? cmaxRaw : 1;

  const series = hours.map((hour, i) => ({
    hour,
    raw: round(totalRaw[i], 4),
    percent: round((totalRaw[i] / peak) * 100, 2),
  }));

  return { series, perMed, stats: { cmaxRaw: round(cmaxRaw, 4), tmaxHour } };
}

function round(value: number, digits: number): number {
  const f = 10 ** digits;
  return Math.round(value * f) / f;
}

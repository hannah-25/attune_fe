// 누적형 약물(예: 아토목세틴)의 임상 효과 누적 모델. PK가 아니다 —
// 당일 혈중 곡선과 별개로, 효과가 "주(week)" 단위로 쌓이는 궤적을 서술한다.
// adhd-med-graph prototype/effect-model.js의 1:1 TS 포팅.
//
// 시그모이드(Weibull CDF)를 쓰는 이유: 비자극제는 점진적 수용체/신경 적응으로
// 작용해 초반 느리게→초기 몇 주에 상승→평탄화(표준 수용체 적응 PD 모양).

import type { EffectAccrualPoint } from './types';

/**
 * `weeks` 시점에 도달한 안정 효과의 분율(0..1).
 * Weibull CDF로, onsetWeeks≈25%, stabilizeWeeks≈90%가 되도록 보정.
 * 단조 증가, week 0에서 0, 이후 1로 접근.
 */
export function effectAccrualFraction(
  weeks: number,
  { onsetWeeks, stabilizeWeeks }: { onsetWeeks: number; stabilizeWeeks: number },
): number {
  if (weeks <= 0) return 0;
  if (!(stabilizeWeeks > onsetWeeks) || onsetWeeks <= 0) {
    throw new Error('effectAccrual requires 0 < onsetWeeks < stabilizeWeeks');
  }
  // 앵커: F(onset)=0.25, F(stabilize)=0.90, F(w) = 1 - exp(-(w/A)^b).
  const b = Math.log(Math.log(0.1) / Math.log(0.75)) / Math.log(stabilizeWeeks / onsetWeeks);
  const A = onsetWeeks / Math.pow(-Math.log(0.75), 1 / b);
  return 1 - Math.exp(-Math.pow(weeks / A, b));
}

/**
 * 타임라인 차트용 효과 누적 시리즈. 0~endWeeks의 [{ week, percent }].
 */
export function buildEffectAccrualSeries({
  effectAccrual,
  endWeeks,
  stepWeeks = 0.25,
}: {
  effectAccrual: { onsetWeeks: number; stabilizeWeeks: number };
  endWeeks: number;
  stepWeeks?: number;
}): EffectAccrualPoint[] {
  const out: EffectAccrualPoint[] = [];
  for (let w = 0; w <= endWeeks + 1e-9; w += stepWeeks) {
    const week = Number(w.toFixed(4));
    out.push({ week, percent: Number((effectAccrualFraction(week, effectAccrual) * 100).toFixed(2)) });
  }
  return out;
}

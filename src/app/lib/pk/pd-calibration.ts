// Attune형 타임스탬프 저널 데이터를 위한 순수 PD 보정 헬퍼.
// 측정된 PK 값이 아니라 관찰된 반응 이벤트를 변환한다.
// adhd-med-graph prototype/pd-calibration.js의 TS 포팅.
//
// NOTE: 저널 태그로 연속 "개인 반응 곡선"을 적합하지 않는다. 데이터가 이진·희소·
// 비무작위 자가보고라 곡선은 기록 빈도를 효과 크기로 과잉표현한다. 여기서는
// 서술 통계(요약)만 도출하고, 표시는 점/버킷 마커로만 한다.

export const PD_SIGNAL = {
  THERAPEUTIC_RESPONSE: 'therapeutic-response',
  IMPAIRMENT: 'impairment',
  SIDE_EFFECT: 'side-effect',
  CONTEXT: 'context',
} as const;

export type PdSignal = (typeof PD_SIGNAL)[keyof typeof PD_SIGNAL];

export type JournalTag = { tagId: number; category: string; tagType: string };

export type PdObservation = {
  hoursAfterDose: number;
  signal: PdSignal;
  value: number;
};

export type PdSummary = {
  observationCount: number;
  responseCount: number;
  impairmentCount: number;
  sideEffectCount: number;
  perceivedOnsetHour: number;
  perceivedPeakHour: number;
  perceivedOffsetHour: number;
  sideEffectPeakHour: number;
  sideEffectBurden: 'high' | 'medium' | 'low';
};

const RESPONSE_TYPES = new Set(['UP', 'CALM']);
const IMPAIRMENT_CONDITION_TYPES = new Set(['FOGGY', 'DOWN']);
const SIDE_EFFECT_CONDITION_TYPES = new Set(['TIGHT']);

function round(value: number, digits = 4): number {
  const f = 10 ** digits;
  return Math.round(value * f) / f;
}

function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[middle];
  return (sorted[middle - 1] + sorted[middle]) / 2;
}

function quantile(values: number[], q: number): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = (sorted.length - 1) * q;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

/** 저널 태그를 PD 신호 종류로 분류. */
export function classifyJournalTag(tag: JournalTag): { signal: PdSignal; value: number } {
  if (tag.category === 'SIDE_EFFECT') {
    return { signal: PD_SIGNAL.SIDE_EFFECT, value: 1 };
  }
  if (tag.category === 'TROUBLE') {
    return { signal: PD_SIGNAL.IMPAIRMENT, value: 1 };
  }
  if (tag.category === 'CONDITION' && RESPONSE_TYPES.has(tag.tagType)) {
    return { signal: PD_SIGNAL.THERAPEUTIC_RESPONSE, value: 1 };
  }
  if (tag.category === 'CONDITION' && IMPAIRMENT_CONDITION_TYPES.has(tag.tagType)) {
    return { signal: PD_SIGNAL.IMPAIRMENT, value: 1 };
  }
  if (tag.category === 'CONDITION' && SIDE_EFFECT_CONDITION_TYPES.has(tag.tagType)) {
    return { signal: PD_SIGNAL.SIDE_EFFECT, value: 1 };
  }
  return { signal: PD_SIGNAL.CONTEXT, value: 0 };
}

/** 복용 후 경과시간이 매겨진 관찰들의 서술 요약. */
export function summarizePdObservations(observations: PdObservation[]): PdSummary {
  const responseHours = observations
    .filter((item) => item.signal === PD_SIGNAL.THERAPEUTIC_RESPONSE)
    .map((item) => item.hoursAfterDose);
  const impairmentHours = observations
    .filter((item) => item.signal === PD_SIGNAL.IMPAIRMENT)
    .map((item) => item.hoursAfterDose);
  const sideEffectHours = observations
    .filter((item) => item.signal === PD_SIGNAL.SIDE_EFFECT)
    .map((item) => item.hoursAfterDose);
  const lateImpairmentHours = impairmentHours.filter(
    (hour) => responseHours.length && hour > Math.min(...responseHours),
  );

  return {
    observationCount: observations.length,
    responseCount: responseHours.length,
    impairmentCount: impairmentHours.length,
    sideEffectCount: sideEffectHours.length,
    perceivedOnsetHour: round(quantile(responseHours, 0.1) ?? 0, 2),
    perceivedPeakHour: round(median(responseHours) ?? 0, 2),
    perceivedOffsetHour: round(quantile(lateImpairmentHours, 0.25) ?? quantile(impairmentHours, 0.75) ?? 0, 2),
    sideEffectPeakHour: round(median(sideEffectHours) ?? 0, 2),
    sideEffectBurden:
      sideEffectHours.length / Math.max(1, observations.length) >= 0.28
        ? 'high'
        : sideEffectHours.length > 0
          ? 'medium'
          : 'low',
  };
}

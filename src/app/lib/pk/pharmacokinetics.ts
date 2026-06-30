// 순수 PK 모델 코드. DOM/캔버스/스토리지/네트워크/프레임워크 의존 없음.
// adhd-med-graph prototype/pharmacokinetics.js의 1:1 TS 포팅(로직 동일, 타입만 추가).
//
// 모델: 방출 입력(IR + ER Weibull)을 1-compartment 1차 소실 커널 exp(-ke*t)과 합성곱.
// AUC = (총 방출량) / ke 이므로 노출 스케일과 곡선 모양을 독립 보정한다.

import type { SamplingGrid } from './types';

type ReleaseModel = {
  irFraction: number;
  ir: { rate: number };
  er: { tLagHours: number; scaleHours: number; shape: number };
};

/** 반감기로부터 1차 소실 속도상수 ke (per hour). */
export function eliminationRate(halfLifeHours: number): number {
  return Math.LN2 / halfLifeHours;
}

/**
 * 시각 t에서 Weibull 방출 함수의 누적 방출 분율.
 * Release(t) = 1 - exp(-((t - tLagHours) / scaleHours)^shape), t > tLag, 아니면 0.
 */
export function weibullReleasedFraction(
  hour: number,
  { tLagHours, scaleHours, shape }: { tLagHours: number; scaleHours: number; shape: number },
): number {
  const elapsed = hour - tLagHours;
  if (elapsed <= 0) return 0;
  return 1 - Math.exp(-Math.pow(elapsed / scaleHours, shape));
}

/**
 * 시각 t에서 1차(단일 시간상수) 방출의 누적 방출 분율: 1 - exp(-rate * t).
 * IR 성분에 사용.
 */
export function firstOrderReleasedFraction(hour: number, { rate }: { rate: number }): number {
  if (hour <= 0) return 0;
  return 1 - Math.exp(-rate * hour);
}

/**
 * 단일 복용의 순간 방출률(시간당 방출 분율) 시계열. IR + ER 성분 합성.
 * 누적 방출 분율의 후방 차분으로, 이산 적분이 총질량을 보존한다.
 */
export function releaseRateSeries(hours: number[], releaseModel: ReleaseModel): number[] {
  const { irFraction, ir, er } = releaseModel;
  const erFraction = 1 - irFraction;
  const cumulative = hours.map(
    (h) => irFraction * firstOrderReleasedFraction(h, ir) + erFraction * weibullReleasedFraction(h, er),
  );
  const rates = new Array(hours.length).fill(0);
  for (let i = 1; i < hours.length; i += 1) {
    const dt = hours[i] - hours[i - 1];
    rates[i] = dt > 0 ? (cumulative[i] - cumulative[i - 1]) / dt : 0;
  }
  return rates;
}

/**
 * 단일 복용이 grid 위에서 만드는 농도 기여(스케일 단위). 방출률 × exp(-ke*t) 수치 합성곱.
 * O(n): 중심 구획량이 매 스텝 감쇠하며 그 스텝의 방출을 받는다.
 */
export function singleDoseConcentration(
  hours: number[],
  releaseModel: ReleaseModel,
  ke: number,
  scale: number,
): number[] {
  const rates = releaseRateSeries(hours, releaseModel);
  const out = new Array(hours.length).fill(0);
  let amount = 0;
  for (let i = 1; i < hours.length; i += 1) {
    const dt = hours[i] - hours[i - 1];
    // 기존 중심 구획량을 스텝 동안 감쇠.
    amount *= Math.exp(-ke * dt);
    // 이 스텝에서 방출된 질량 추가.
    amount += rates[i] * dt;
    out[i] = amount * scale;
  }
  return out;
}

/** 샘플링 grid 스펙으로부터 균등 간격 시(hour) grid 생성. */
export function buildHourGrid({ startHour, endHour, stepMinutes }: SamplingGrid): number[] {
  const step = stepMinutes / 60;
  const hours: number[] = [];
  for (let h = startHour; h <= endHour + 1e-9; h += step) {
    hours.push(Number(h.toFixed(6)));
  }
  return hours;
}

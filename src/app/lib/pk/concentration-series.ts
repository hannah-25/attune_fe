// 차트용 농도 시계열. 순수 모델 코드에만 의존.
// adhd-med-graph prototype/concentration-series.js의 1:1 TS 포팅.

import { eliminationRate, buildHourGrid, singleDoseConcentration } from './pharmacokinetics';
import { activeDoseEvents } from './dose-events';
import type {
  ConcentrationSeries,
  DoseEvent,
  PkProfile,
  SamplingGrid,
} from './types';

type ReleaseModel = PkProfile['release'];

/**
 * 용량→농도 스케일(ng/mL per mg). 단일 보정용량이 기준 AUC를 주도록.
 * AUC = scale * dose / ke 이므로 scalePerMg = (aucTarget * ke) / calibrationDoseMg.
 */
function concentrationScalePerMg(profile: PkProfile, ke: number): number {
  const { aucNgHPerMl, calibrationDoseMg } = profile.reference;
  return (aucNgHPerMl * ke) / calibrationDoseMg;
}

/**
 * 차트용 정규화 시리즈 생성.
 *
 *   buildConcentrationSeries({ profile, doseEvents, grid })
 *
 * raw     = 추정 ng/mL (절대)
 * percent = 이 구간 peak raw 대비 %
 */
export function buildConcentrationSeries({
  profile,
  doseEvents,
  grid,
}: {
  profile: PkProfile;
  doseEvents: DoseEvent[];
  grid: SamplingGrid;
}): ConcentrationSeries {
  const hours = buildHourGrid(grid);
  const ke = eliminationRate(profile.halfLifeHours);
  const scalePerMg = concentrationScalePerMg(profile, ke);

  const total = new Array(hours.length).fill(0);
  const irTotal = new Array(hours.length).fill(0);
  const erTotal = new Array(hours.length).fill(0);

  const irModel: ReleaseModel = { irFraction: 1, ir: profile.release.ir, er: profile.release.er };
  const erModel: ReleaseModel = { irFraction: 0, ir: profile.release.ir, er: profile.release.er };
  const fullModel = profile.release;

  for (const event of activeDoseEvents(doseEvents)) {
    const scale = event.amountMg * scalePerMg;
    // 각 복용 기여를 복용 시각으로 시프트.
    const shifted = hours.map((h) => h - event.takenAtHour);
    addContribution(total, singleDoseOnShiftedGrid(shifted, fullModel, ke, scale));
    addContribution(
      irTotal,
      singleDoseOnShiftedGrid(shifted, irModel, ke, scale * profile.release.irFraction),
    );
    addContribution(
      erTotal,
      singleDoseOnShiftedGrid(shifted, erModel, ke, scale * (1 - profile.release.irFraction)),
    );
  }

  let cmaxRaw = 0;
  let tmaxHour = hours[0];
  for (let i = 0; i < hours.length; i += 1) {
    if (total[i] > cmaxRaw) {
      cmaxRaw = total[i];
      tmaxHour = hours[i];
    }
  }
  const peak = cmaxRaw > 0 ? cmaxRaw : 1;

  const series = hours.map((hour, i) => ({
    hour,
    raw: round(total[i], 4),
    percent: round((total[i] / peak) * 100, 2),
  }));

  return {
    series,
    components: {
      ir: hours.map((hour, i) => ({ hour, raw: round(irTotal[i], 4) })),
      er: hours.map((hour, i) => ({ hour, raw: round(erTotal[i], 4) })),
    },
    stats: { cmaxRaw: round(cmaxRaw, 4), tmaxHour, peakHour: tmaxHour },
  };
}

/**
 * 복용을 상대 시각 0으로 시프트한 grid 위 단일 복용 농도.
 * 음수(복용 전) 시각은 0으로 유지.
 */
function singleDoseOnShiftedGrid(
  shiftedHours: number[],
  releaseModel: ReleaseModel,
  ke: number,
  scale: number,
): number[] {
  const positiveHours = shiftedHours.filter((h) => h >= 0);
  if (positiveHours.length === 0) return shiftedHours.map(() => 0);

  const step = inferStepHours(shiftedHours);
  const maxHour = Math.max(...positiveHours);
  const simulationHours = buildSimulationGrid(maxHour, step);
  const conc = singleDoseConcentration(simulationHours, releaseModel, ke, scale);

  return shiftedHours.map((h) => {
    if (h < 0) return 0;
    const index = Math.round(h / step);
    return conc[Math.min(index, conc.length - 1)] ?? 0;
  });
}

function inferStepHours(hours: number[]): number {
  let step = Infinity;
  for (let i = 1; i < hours.length; i += 1) {
    const delta = hours[i] - hours[i - 1];
    if (delta > 1e-9 && delta < step) step = delta;
  }
  const minStep = 1 / 60;
  return Number.isFinite(step) ? Math.max(step, minStep) : minStep;
}

function buildSimulationGrid(maxHour: number, step: number): number[] {
  const hours: number[] = [];
  for (let h = 0; h <= maxHour + 1e-9; h += step) {
    hours.push(Number(h.toFixed(6)));
  }
  return hours;
}

function addContribution(target: number[], contribution: number[]): void {
  for (let i = 0; i < target.length; i += 1) target[i] += contribution[i];
}

function round(value: number, digits: number): number {
  const f = 10 ** digits;
  return Math.round(value * f) / f;
}

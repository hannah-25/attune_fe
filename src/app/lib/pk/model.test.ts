// 순수 PK 모델 회귀 테스트. adhd-med-graph prototype/model.test.mjs에서
// fixture/데모 의존 케이스를 제외한 순수 모델 부분을 포팅.
//
// 실행: pnpm test:pk  (tsc로 CJS 임시 빌드 후 node --test)

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getProfile,
  concertaOros,
  methylphenidateIr,
  medikinetRetard,
  atomoxetine,
} from './fallback-profiles';
import { createDoseEvent, expandSchedule, activeDoseEvents } from './dose-events';
import { buildConcentrationSeries } from './concentration-series';
import { effectAccrualFraction, buildEffectAccrualSeries } from './effect-model';
import { buildHourGrid } from './pharmacokinetics';
import {
  classifyJournalTag,
  summarizePdObservations,
  PD_SIGNAL,
  type PdObservation,
} from './pd-calibration';

const grid = { startHour: 0, endHour: 30, stepMinutes: 1 };

function singleDoseSeries(amountMg: number, takenAtHour = 0) {
  return buildConcentrationSeries({
    profile: concertaOros,
    doseEvents: [createDoseEvent({ medicationId: concertaOros.id, amountMg, takenAtHour })],
    grid,
  });
}

test('model runs without DOM and returns chart-ready points', () => {
  const { series } = singleDoseSeries(18);
  assert.ok(series.length > 0);
  for (const p of series) {
    assert.equal(typeof p.hour, 'number');
    assert.equal(typeof p.raw, 'number');
    assert.equal(typeof p.percent, 'number');
  }
});

test('buildHourGrid rejects non-positive step minutes', () => {
  assert.throws(() => buildHourGrid({ startHour: 0, endHour: 24, stepMinutes: 0 }));
  assert.throws(() => buildHourGrid({ startHour: 0, endHour: 24, stepMinutes: -5 }));
});

test('18 mg single dose reproduces reference Cmax / Tmax / AUC', () => {
  const { series, stats } = singleDoseSeries(18);
  assert.ok(Math.abs(stats.tmaxHour - 6.8) <= 0.6, `tmax=${stats.tmaxHour}`);
  assert.ok(Math.abs(stats.cmaxRaw - 3.7) <= 0.37, `cmax=${stats.cmaxRaw}`);
  let auc = 0;
  for (let i = 1; i < series.length; i += 1) {
    auc += ((series[i].raw + series[i - 1].raw) / 2) * (series[i].hour - series[i - 1].hour);
  }
  assert.ok(Math.abs(auc - 41.8) <= 3, `auc=${auc}`);
});

test('biphasic shape: early IR bump near 1h precedes the main ER peak', () => {
  const { series } = singleDoseSeries(18);
  const at = (h: number) => series.find((p) => Math.abs(p.hour - h) < 1e-6)?.raw ?? 0;
  assert.ok(at(1) > at(0.25), 'should rise to an early IR bump by 1h');
  assert.ok(at(1.5) < at(1), 'small dip after the IR bump');
  assert.ok(at(6.5) > at(1), 'ER peak well above the early bump');
});

test('dose proportionality: Cmax scales linearly with dose', () => {
  const c18 = singleDoseSeries(18).stats.cmaxRaw;
  const c36 = singleDoseSeries(36).stats.cmaxRaw;
  assert.ok(Math.abs(c36 / c18 - 2) < 1e-3, `ratio=${c36 / c18}`);
});

test('IR + ER components sum to the total series', () => {
  const { series, components } = singleDoseSeries(18);
  for (let i = 0; i < series.length; i += 1) {
    const sum = components.ir[i].raw + components.er[i].raw;
    assert.ok(Math.abs(sum - series[i].raw) < 0.02, `mismatch at ${series[i].hour}`);
  }
});

test('single-dose concentration keeps prior release when grid starts after dose', () => {
  const full = buildConcentrationSeries({
    profile: concertaOros,
    doseEvents: [createDoseEvent({ medicationId: concertaOros.id, amountMg: 18, takenAtHour: 0 })],
    grid: { startHour: 0, endHour: 8, stepMinutes: 60 },
  });
  const late = buildConcentrationSeries({
    profile: concertaOros,
    doseEvents: [createDoseEvent({ medicationId: concertaOros.id, amountMg: 18, takenAtHour: 0 })],
    grid: { startHour: 2, endHour: 8, stepMinutes: 60 },
  });

  for (const point of late.series) {
    const baseline = full.series.find((p) => p.hour === point.hour);
    assert.ok(baseline, `missing baseline at ${point.hour}`);
    const baselineRaw = baseline.raw;
    assert.ok(Math.abs(point.raw - baselineRaw) < 1e-6, `mismatch at ${point.hour}: ${point.raw} vs ${baselineRaw}`);
  }
});

test('skipped doses do not contribute; schedule expands to concrete events', () => {
  const events = expandSchedule({
    medicationId: concertaOros.id,
    amountMg: 18,
    firstHour: 7,
    intervalHours: 24,
    count: 3,
  });
  assert.equal(events.length, 3);
  assert.deepEqual(
    events.map((e) => e.takenAtHour),
    [7, 31, 55],
  );

  const withSkip = [
    ...events,
    createDoseEvent({ medicationId: concertaOros.id, amountMg: 18, takenAtHour: 7, source: 'skipped' }),
  ];
  assert.equal(activeDoseEvents(withSkip).length, 3);
});

test('getProfile returns the registered profile and throws on unknown', () => {
  assert.equal(getProfile('concerta-oros').id, 'concerta-oros');
  assert.equal(getProfile('methylphenidate-ir').id, 'methylphenidate-ir');
  assert.equal(getProfile('methylphenidate-medikinet').id, 'methylphenidate-medikinet');
  assert.equal(getProfile('atomoxetine').id, 'atomoxetine');
  assert.throws(() => getProfile('nope'));
});

test('modelKind classifies stimulants vs accumulation drugs', () => {
  assert.equal(concertaOros.modelKind, 'same-day-curve');
  assert.equal(methylphenidateIr.modelKind, 'same-day-curve');
  assert.equal(medikinetRetard.modelKind, 'same-day-curve');
  assert.equal(atomoxetine.modelKind, 'accumulation');
});

test('effectAccrualFraction is monotonic, 0 at week 0, ~25%/90% at onset/stabilize', () => {
  const accrual = { onsetWeeks: 2, stabilizeWeeks: 6 };
  assert.equal(effectAccrualFraction(0, accrual), 0);
  assert.ok(Math.abs(effectAccrualFraction(2, accrual) - 0.25) < 0.02, 'onset ~25%');
  assert.ok(Math.abs(effectAccrualFraction(6, accrual) - 0.9) < 0.02, 'stabilize ~90%');
  let prev = -1;
  for (let w = 0; w <= 12; w += 0.5) {
    const f = effectAccrualFraction(w, accrual);
    assert.ok(f >= prev - 1e-9, `monotonic at week ${w}`);
    assert.ok(f >= 0 && f <= 1, `bounded at week ${w}`);
    prev = f;
  }
  assert.throws(() => effectAccrualFraction(1, { onsetWeeks: 6, stabilizeWeeks: 2 }));
});

test('buildEffectAccrualSeries spans 0..endWeeks rising to near full effect', () => {
  const accrual = atomoxetine.effectAccrual!;
  const endWeeks = accrual.stabilizeWeeks + 4;
  const series = buildEffectAccrualSeries({ effectAccrual: accrual, endWeeks });
  assert.equal(series[0].week, 0);
  assert.equal(series[0].percent, 0);
  assert.equal(series[series.length - 1].week, endWeeks);
  assert.ok(series[series.length - 1].percent > 90, 'near full effect past stabilize');
  const atStabilize = series.find((s) => Math.abs(s.week - accrual.stabilizeWeeks) < 1e-9)!;
  assert.ok(Math.abs(atStabilize.percent - 90) < 2, `~90% at stabilize, got ${atStabilize.percent}`);
});

test('atomoxetine steady-state daily curve is single-peak near Tmax 1.5 h', () => {
  const { stats } = buildConcentrationSeries({
    profile: atomoxetine,
    doseEvents: [createDoseEvent({ medicationId: atomoxetine.id, amountMg: 40, takenAtHour: 0 })],
    grid: { startHour: 0, endHour: 24, stepMinutes: 1 },
  });
  assert.ok(Math.abs(stats.tmaxHour - 1.5) <= 0.4, `tmax=${stats.tmaxHour}`);
});

test('Medikinet retard reproduces SmPC Cmax / Tmax (20 mg) with a plateau', () => {
  const { series, stats, components } = buildConcentrationSeries({
    profile: medikinetRetard,
    doseEvents: [createDoseEvent({ medicationId: medikinetRetard.id, amountMg: 20, takenAtHour: 0 })],
    grid: { startHour: 0, endHour: 24, stepMinutes: 1 },
  });
  assert.ok(Math.abs(stats.cmaxRaw - 6.4) <= 0.5, `cmax=${stats.cmaxRaw}`);
  assert.ok(Math.abs(stats.tmaxHour - 2.75) <= 0.5, `tmax=${stats.tmaxHour}`);
  assert.ok(components.er.some((p) => p.raw > 1), 'Medikinet should have a substantial ER contribution');
  const at = (h: number) => series.find((p) => Math.abs(p.hour - h) < 1e-6)?.raw ?? 0;
  assert.ok(at(3.5) > stats.cmaxRaw * 0.9, 'should hold a plateau after the peak');
});

test('IR methylphenidate is a single-peak curve (no biphasic shape)', () => {
  const { series, stats, components } = buildConcentrationSeries({
    profile: methylphenidateIr,
    doseEvents: [createDoseEvent({ medicationId: methylphenidateIr.id, amountMg: 10, takenAtHour: 0 })],
    grid: { startHour: 0, endHour: 24, stepMinutes: 1 },
  });
  assert.ok(Math.abs(stats.tmaxHour - 1.5) <= 0.4, `tmax=${stats.tmaxHour}`);
  const peakIdx = series.findIndex((p) => p.hour === stats.tmaxHour);
  for (let i = 1; i <= peakIdx; i += 1) {
    assert.ok(series[i].raw >= series[i - 1].raw - 1e-9, `not monotonic up at ${series[i].hour}`);
  }
  for (let i = peakIdx + 1; i < series.length; i += 1) {
    assert.ok(series[i].raw <= series[i - 1].raw + 1e-9, `not monotonic down at ${series[i].hour}`);
  }
  assert.ok(components.er.every((p) => p.raw < 1e-6), 'IR profile should have no ER contribution');
});

test('classifyJournalTag maps Attune tag categories to PD signals', () => {
  assert.equal(classifyJournalTag({ tagId: 1, category: 'CONDITION', tagType: 'UP' }).signal, PD_SIGNAL.THERAPEUTIC_RESPONSE);
  assert.equal(classifyJournalTag({ tagId: 2, category: 'CONDITION', tagType: 'CALM' }).signal, PD_SIGNAL.THERAPEUTIC_RESPONSE);
  assert.equal(classifyJournalTag({ tagId: 3, category: 'CONDITION', tagType: 'FOGGY' }).signal, PD_SIGNAL.IMPAIRMENT);
  assert.equal(classifyJournalTag({ tagId: 4, category: 'TROUBLE', tagType: 'INATTENTION' }).signal, PD_SIGNAL.IMPAIRMENT);
  assert.equal(classifyJournalTag({ tagId: 5, category: 'CONDITION', tagType: 'TIGHT' }).signal, PD_SIGNAL.SIDE_EFFECT);
  assert.equal(classifyJournalTag({ tagId: 6, category: 'SIDE_EFFECT', tagType: 'JITTERY' }).signal, PD_SIGNAL.SIDE_EFFECT);
});

test('summarizePdObservations derives descriptive timing without fitting a curve', () => {
  const obs: PdObservation[] = [
    { hoursAfterDose: 1.3, signal: PD_SIGNAL.THERAPEUTIC_RESPONSE, value: 1 },
    { hoursAfterDose: 2.0, signal: PD_SIGNAL.THERAPEUTIC_RESPONSE, value: 1 },
    { hoursAfterDose: 2.5, signal: PD_SIGNAL.SIDE_EFFECT, value: 1 },
    { hoursAfterDose: 3.5, signal: PD_SIGNAL.SIDE_EFFECT, value: 1 },
    { hoursAfterDose: 8.0, signal: PD_SIGNAL.IMPAIRMENT, value: 1 },
  ];
  const summary = summarizePdObservations(obs);
  assert.equal(summary.observationCount, 5);
  assert.equal(summary.responseCount, 2);
  assert.equal(summary.sideEffectCount, 2);
  assert.ok(summary.perceivedPeakHour >= 1.3 && summary.perceivedPeakHour <= 2.0);
  assert.ok(summary.sideEffectPeakHour >= 2.5 && summary.sideEffectPeakHour <= 3.5);
  assert.equal(summary.sideEffectBurden, 'high');
});

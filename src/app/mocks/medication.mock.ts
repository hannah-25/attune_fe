import type { MedicationSummary, MedicationProfileLog, MedicationStandard } from '../api/medication';

export const mockMedications: MedicationSummary[] = [
  {
    userMedicationId: 1,
    medicationId: 101,
    name: '콘서타 18mg',
    ingredient: '메틸페니데이트',
    startedAt: '2026-02-03',
    isActive: true,
    alarmActive: true,
    schedules: [
      { scheduleId: 1, doseTime: '08:00', label: '아침', dosage: '18mg' },
      { scheduleId: 2, doseTime: '12:30', label: '점심', dosage: '18mg' },
    ],
  },
  {
    userMedicationId: 2,
    medicationId: 102,
    name: '스트라테라 40mg',
    ingredient: '아토목세틴',
    startedAt: '2026-04-01',
    isActive: true,
    alarmActive: true,
    schedules: [
      { scheduleId: 3, doseTime: '19:00', label: '저녁', dosage: '40mg' },
    ],
  },
  {
    userMedicationId: 3,
    medicationId: 103,
    name: '아데랄 10mg',
    ingredient: '암페타민',
    startedAt: '2026-01-14',
    endAt: '2026-02-28',
    isActive: false,
    alarmActive: false,
    schedules: [],
  },
];

export const mockMedicationLogs: MedicationProfileLog[] = [
  { scheduleId: 1, takenAt: '2026-05-31T08:03:00', status: 'TAKEN' },
  { scheduleId: 2, takenAt: '2026-05-31T12:35:00', status: 'TAKEN' },
  { scheduleId: 1, takenAt: '2026-05-30T08:10:00', status: 'TAKEN' },
  { scheduleId: 2, takenAt: '2026-05-30T12:30:00', status: 'SKIPPED' },
  { scheduleId: 3, takenAt: '2026-05-30T19:05:00', status: 'TAKEN' },
  { scheduleId: 1, takenAt: '2026-05-29T08:00:00', status: 'TAKEN' },
  { scheduleId: 2, takenAt: '2026-05-29T12:30:00', status: 'TAKEN' },
  { scheduleId: 3, takenAt: '2026-05-29T19:00:00', status: 'TAKEN' },
];

export const mockMedicationStandard: MedicationStandard = {
  name: '콘서타 18mg',
  ingredient: '메틸페니데이트 · 서방형',
  indications: '주의력결핍 과잉행동장애(ADHD) 증상 개선에 사용됩니다. 집중 유지와 충동 조절을 돕는 약물입니다.',
  sideEffects: '식욕 저하, 불면, 두통, 입마름, 두근거림',
  bloodConcentrationGraph: '',
};

// UI-only (컴포넌트 직접 참조 없음 — resolver fallback용)
export type HistoryPeriod = '1주' | '1개월' | '3개월' | '직접';

export const mockHistoryStats: Record<HistoryPeriod, { rate: string; taken: string; missed: string; delayed: string }> = {
  '1주': { rate: '91%', taken: '19', missed: '2', delayed: '1' },
  '1개월': { rate: '86%', taken: '52', missed: '8', delayed: '3' },
  '3개월': { rate: '88%', taken: '156', missed: '20', delayed: '9' },
  직접: { rate: '86%', taken: '52', missed: '8', delayed: '3' },
};

import type { MedicationSearchResult, MedicationSummary, MedicationLogStatus, MedicationStandard } from '../api/medication';

type MockMedicationLog = {
  userMedicationId: number;
  scheduleId: number;
  takenAt: string;
  status: MedicationLogStatus;
};

export const mockMedicationSearchData: MedicationSearchResult[] = [
  {
    medicationId: 1,
    name: '콘서타',
    ingredient: '메틸페니데이트',
    dosageOptions: [
      { dosageId: 1, amount: 18 },
      { dosageId: 2, amount: 27 },
      { dosageId: 3, amount: 36 },
      { dosageId: 4, amount: 54 },
    ],
  },
  {
    medicationId: 2,
    name: '스트라테라',
    ingredient: '아토목세틴',
    dosageOptions: [
      { dosageId: 5, amount: 10 },
      { dosageId: 6, amount: 18 },
      { dosageId: 7, amount: 25 },
      { dosageId: 8, amount: 40 },
      { dosageId: 9, amount: 60 },
      { dosageId: 10, amount: 80 },
      { dosageId: 11, amount: 100 },
    ],
  },
  {
    medicationId: 3,
    name: '메디키넷',
    ingredient: '메틸페니데이트',
    dosageOptions: [
      { dosageId: 12, amount: 5 },
      { dosageId: 13, amount: 10 },
      { dosageId: 14, amount: 20 },
    ],
  },
  {
    medicationId: 4,
    name: '페로스핀',
    ingredient: '메틸페니데이트',
    dosageOptions: [
      { dosageId: 15, amount: 18 },
      { dosageId: 16, amount: 36 },
      { dosageId: 17, amount: 54 },
    ],
  },
  {
    medicationId: 5,
    name: '인튜니브',
    ingredient: '구안파신',
    dosageOptions: [
      { dosageId: 18, amount: 1 },
      { dosageId: 19, amount: 2 },
      { dosageId: 20, amount: 3 },
      { dosageId: 21, amount: 4 },
    ],
  },
];

export const mockMedications: MedicationSummary[] = [
  {
    userMedicationId: 1,
    medicationId: 101,
    medicationDosageId: 3,
    medicationName: '콘서타 18mg',
    dosageAmount: 18,
    startedAt: '2026-02-03',
    isActive: true,
    alarmActive: true,
    schedules: [
      { scheduleId: 1, doseTime: '08:00', label: '아침' },
    ],
  },
  {
    userMedicationId: 2,
    medicationId: 102,
    medicationDosageId: 5,
    medicationName: '메디키넷 5mg',
    dosageAmount: 5,
    startedAt: '2026-04-01',
    isActive: true,
    alarmActive: true,
    schedules: [
      { scheduleId: 2, doseTime: '13:00', label: '점심' },
    ],
  },
];

export const mockMedicationLogs: MockMedicationLog[] = [
  { userMedicationId: 1, scheduleId: 1, takenAt: '2026-05-31T08:03:00', status: 'TAKEN' },
  { userMedicationId: 2, scheduleId: 2, takenAt: '2026-05-31T13:05:00', status: 'TAKEN' },
  { userMedicationId: 1, scheduleId: 1, takenAt: '2026-05-30T08:10:00', status: 'TAKEN' },
  { userMedicationId: 2, scheduleId: 2, takenAt: '2026-05-30T13:00:00', status: 'SKIPPED' },
  { userMedicationId: 1, scheduleId: 1, takenAt: '2026-05-29T08:00:00', status: 'TAKEN' },
  { userMedicationId: 2, scheduleId: 2, takenAt: '2026-05-29T13:02:00', status: 'TAKEN' },
];

export const mockMedicationStandard: MedicationStandard = {
  name: '콘서타 18mg',
  ingredient: '메틸페니데이트 · 서방형',
  indications: '주의력결핍 과잉행동장애(ADHD) 증상 개선에 사용됩니다. 집중 유지와 충동 조절을 돕는 약물입니다.',
  sideEffects: '식욕 저하, 불면, 두통, 입마름, 두근거림',
  description: 'ADHD 치료를 위한 중추신경계 자극제입니다.',
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

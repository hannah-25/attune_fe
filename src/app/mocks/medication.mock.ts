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
    name: '콘서타OROS서방정',
    ingredient: '메틸페니데이트',
    dosageOptions: [],
  },
  {
    medicationId: 2,
    name: '메디키넷리타드캡슐',
    ingredient: '메틸페니데이트',
    dosageOptions: [],
  },
  {
    medicationId: 3,
    name: '페니드정',
    ingredient: '메틸페니데이트',
    dosageOptions: [],
  },
  {
    medicationId: 4,
    name: '메타데이트CD서방캡슐',
    ingredient: '메틸페니데이트',
    dosageOptions: [],
  },
  {
    medicationId: 5,
    name: '비스펜틴조절방출캡슐',
    ingredient: '메틸페니데이트',
    dosageOptions: [],
  },
  {
    medicationId: 6,
    name: '스트라테라캡슐',
    ingredient: '아토목세틴',
    dosageOptions: [],
  },
  {
    medicationId: 7,
    name: '아토목신캡슐',
    ingredient: '아토목세틴',
    dosageOptions: [],
  },
  {
    medicationId: 33,
    name: 'Intuniv',
    ingredient: '구안파신',
    dosageOptions: [],
  },
];

export const mockDosageOptionsByMedicationId: Record<number, { id: number; amount: number }[]> = {
  1: [{ id: 1, amount: 18 }, { id: 2, amount: 27 }, { id: 3, amount: 36 }, { id: 4, amount: 54 }],
  2: [{ id: 5, amount: 5 }, { id: 6, amount: 10 }, { id: 7, amount: 20 }, { id: 8, amount: 30 }, { id: 9, amount: 40 }],
  3: [{ id: 10, amount: 5 }],
  4: [{ id: 11, amount: 10 }, { id: 12, amount: 20 }, { id: 13, amount: 30 }, { id: 14, amount: 40 }, { id: 15, amount: 50 }, { id: 16, amount: 60 }],
  5: [{ id: 17, amount: 10 }, { id: 18, amount: 30 }, { id: 19, amount: 50 }, { id: 20, amount: 60 }],
  6: [{ id: 21, amount: 10 }, { id: 22, amount: 18 }, { id: 23, amount: 25 }, { id: 24, amount: 40 }, { id: 25, amount: 60 }, { id: 26, amount: 80 }],
  7: [{ id: 27, amount: 10 }, { id: 28, amount: 18 }, { id: 29, amount: 25 }, { id: 30, amount: 40 }, { id: 31, amount: 60 }, { id: 32, amount: 80 }],
  33: [{ id: 33, amount: 1 }, { id: 34, amount: 2 }, { id: 35, amount: 3 }, { id: 36, amount: 4 }],
};

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

// TODO: Replace with API data

export const mockMedications = [
  {
    id: 1,
    name: '콘서타 18mg',
    detail: '메틸페니데이트 · 2월 3일~',
    schedule: '하루 2회 · 8:00, 12:30',
    active: true,
    bg: 'bg-purple-300',
  },
  {
    id: 2,
    name: '스트라테라 40mg',
    detail: '아토목세틴 · 4월 1일~',
    schedule: '하루 1회 · 19:00',
    active: true,
    bg: 'bg-purple-500',
  },
];

export const mockNextDose = { name: '콘서타 18mg', time: '12:30' };

export const mockPastMedications = [
  { id: 'adderall', name: '아데랄 10mg', period: '1월 14일 - 2월 28일' },
];

export const mockMedicationInfo = {
  name: '콘서타 18mg',
  ingredient: '메틸페니데이트 · 서방형',
  efficacy:
    '주의력결핍 과잉행동장애(ADHD) 증상 개선에 사용됩니다. 집중 유지와 충동 조절을 돕는 약물입니다.',
  sideEffects: ['식욕 저하', '불면', '두통', '입마름', '두근거림'],
};

export type HistoryPeriod = '1주' | '1개월' | '3개월' | '직접';

export const mockHistoryStats: Record<HistoryPeriod, { rate: string; taken: string; missed: string; delayed: string }> = {
  '1주': { rate: '91%', taken: '19', missed: '2', delayed: '1' },
  '1개월': { rate: '86%', taken: '52', missed: '8', delayed: '3' },
  '3개월': { rate: '88%', taken: '156', missed: '20', delayed: '9' },
  직접: { rate: '86%', taken: '52', missed: '8', delayed: '3' },
};

export const mockHistoryGroups = [
  {
    date: '5월 13일',
    items: [
      { text: '08:00 콘서타 18mg', status: '복용' },
      { text: '12:30 콘서타 18mg', status: '복용' },
      { text: '19:00 스트라테라 40mg', status: '예정', muted: true },
    ],
  },
  {
    date: '5월 12일',
    items: [
      { text: '08:00 콘서타 18mg', status: '복용' },
      { text: '12:30 콘서타 18mg', status: '건너뜀' },
      { text: '19:00 스트라테라 40mg', status: '복용' },
    ],
  },
  {
    date: '5월 11일',
    items: [
      { text: '08:00 콘서타 18mg', status: '복용' },
      { text: '12:30 콘서타 18mg', status: '복용' },
      { text: '19:00 스트라테라 40mg', status: '복용' },
    ],
  },
];

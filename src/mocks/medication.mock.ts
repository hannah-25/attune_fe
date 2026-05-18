// TODO: Replace with API data

export const mockMedications = [
  { id: 1, name: '콘서타 18mg', detail: '메틸페니데이트 · 2월 3일~', schedule: '하루 2회 · 8:00, 12:30', active: true, iconSrc: '/icons/f487caf883fee29fd8f5d6a6367147ff53ff6eeb.svg', bg: 'bg-purple-300' },
  { id: 2, name: '스트라테라 40mg', detail: '아토목세틴 · 4월 1일~', schedule: '하루 1회 · 19:00', active: true, iconSrc: '/icons/8fb8f0ff61b3f813a2a9b5e18b6950f525e506f3.svg', bg: 'bg-purple-500' },
];

export const mockNextDose = { name: '콘서타 18mg', time: '12:30' };

export const mockPastMedications = [
  { id: 'adderall', name: '아데랄 10mg', period: '1월 14일 — 2월 28일', iconSrc: '/icons/82f6316729e2405770bf424ad5357aa78565cb47.svg' },
];

export const mockMedicationInfo = {
  name: '콘서타 18mg',
  ingredient: '메틸페니데이트 · 서방형',
  efficacy: '주의력결핍 과잉행동장애(ADHD) 증상을 개선합니다. 도파민과 노르에피네프린 재흡수를 억제하여 집중력과 충동 조절을 도와줍니다.',
  sideEffects: ['식욕 저하', '불면', '두통', '입마름', '두근거림'],
};

type Period = '1주' | '1개월' | '3개월' | '직접';

export const mockHistoryStats: Record<Period, { rate: string; taken: string; missed: string; delayed: string }> = {
  '1주':  { rate: '91%', taken: '19', missed: '2',  delayed: '1' },
  '1개월': { rate: '86%', taken: '52', missed: '8',  delayed: '3' },
  '3개월': { rate: '88%', taken: '156', missed: '20', delayed: '9' },
  직접:   { rate: '86%', taken: '52', missed: '8',  delayed: '3' },
};

export const mockHistoryGroups = [
  {
    date: '5월 13일',
    items: [
      { icon: '/icons/553aadff6c732777ebf05fd7879f8ace0c08808a.svg', text: '08:00 콘서타 18mg', status: '복용' },
      { icon: '/icons/b8a302e36ea60d69f9992783ad06a14925a796f1.svg', text: '12:30 콘서타 18mg', status: '복용' },
      { text: '19:00 스트라테라 40mg', status: '예정', muted: true },
    ],
  },
  {
    date: '5월 12일',
    items: [
      { icon: '/icons/c31c4c0925d22f49ca58fec0a3e791abffca3580.svg', text: '08:00 콘서타 18mg', status: '복용' },
      { icon: '/icons/719f555dcc9b8aaf4c575aa9cbfc52e2ee272988.svg', text: '12:30 콘서타 18mg', status: '건너뜀' },
      { icon: '/icons/1196b0549314af128fc7d97294ec92ba1d96593d.svg', text: '19:00 스트라테라 40mg', status: '복용' },
    ],
  },
  {
    date: '5월 11일',
    items: [
      { icon: '/icons/fa6bbf8b97533e585241d6a212c73d52139abc7e.svg', text: '08:00 콘서타 18mg', status: '복용' },
      { icon: '/icons/49bc90d075790a4096bd013fa7ecd0d5f355895a.svg', text: '12:30 콘서타 18mg', status: '복용' },
      { icon: '/icons/e64256a64d85adaec88e5c4afbf9732379418611.svg', text: '19:00 스트라테라 40mg', status: '복용' },
    ],
  },
];

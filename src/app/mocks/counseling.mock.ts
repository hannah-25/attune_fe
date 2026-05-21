// TODO: Replace with API data

export const mockSession = {
  date: '4월 16일 금',
  clinic: '청담심리상담센터',
  doctor: '김지연 원장',
  duration: '40분 진료 · 처방 변경 있음',
  advice:
    '식욕 저하는 아침 식사를 가볍게 먼저 하고 약을 복용해보는 것을 권장합니다. 오후 약효 저하는 증량 후 2주 뒤 재평가 예정입니다.',
  nextDate: '5월 16일',
};

export type PrescriptionStatus = '증량' | '감량' | '유지';

export const mockPrescriptions = [
  { id: 'concerta', name: '콘서타', before: '18mg', after: '27mg', status: '증량' as PrescriptionStatus },
  { id: 'strattera', name: '스트라테라 40mg', before: null, after: null, status: '유지' as PrescriptionStatus },
];

export const mockQnA = [
  { question: '아침 식욕이 너무 없어요', answer: '아침 식사를 가볍게 먼저 하고 약 복용을 권장' },
  { question: '약효가 빨리 떨어져요', answer: '증량 후 2주 뒤 재평가' },
];

export const mockSummaryStats = { adherence: '88%', emotion: '6.2', mistakes: '7회' };
export const mockSummaryText =
  '아침 약 복용 후 집중력이 높아지는 패턴을 보여요. 오후 4시 이후 약효 저하와 피로감을 꾸준히 기록했어요.';

export const mockQuestions = [
  { text: '아침 식욕이 너무 없어요. 다른 약으로 바꿔야 할까요?', checked: true },
  { text: '오후 4시 이후 약효가 빨리 떨어지는 느낌이에요', checked: true },
  { text: '수면제와 함께 복용해도 괜찮을까요?', checked: false },
];

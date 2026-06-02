import type { JournalDetail, ConditionTag, SideEffectTag, TroubleTag } from '../api/journal';

export const mockJournalDates: { dates: string[] } = {
  dates: [
    '2026-05-02', '2026-05-03', '2026-05-05', '2026-05-06', '2026-05-07',
    '2026-05-08', '2026-05-09', '2026-05-11', '2026-05-12', '2026-05-16',
    '2026-05-17', '2026-05-18', '2026-05-19', '2026-05-20', '2026-05-22',
    '2026-05-23', '2026-05-24', '2026-05-25', '2026-05-26', '2026-05-27',
    '2026-05-31',
  ],
};

export const mockConditionTags: ConditionTag[] = [
  { tagId: 1, condition: '집중 어려움', conditionType: 'USER_INPUT', visible: true },
  { tagId: 2, condition: '멍해짐', conditionType: 'FOGGY', visible: true },
  { tagId: 3, condition: '짜증', conditionType: 'USER_INPUT', visible: true },
  { tagId: 4, condition: '불안', conditionType: 'USER_INPUT', visible: true },
  { tagId: 5, condition: '무기력', conditionType: 'DOWN', visible: true },
  { tagId: 6, condition: '두근거림', conditionType: 'USER_INPUT', visible: false },
  { tagId: 7, condition: '졸림', conditionType: 'DOWN', visible: false },
];

export const mockSideEffectTags: SideEffectTag[] = [
  { tagId: 10, sideEffect: '식욕 저하', visible: true },
  { tagId: 11, sideEffect: '두통', visible: true },
  { tagId: 12, sideEffect: '입마름', visible: false },
];

export const mockTroubleTags: TroubleTag[] = [
  { tagId: 20, trouble: '집중 실수', type: 'INATTENTION', visible: true },
  { tagId: 21, trouble: '시간 관리 실패', type: 'TIME_MANAGEMENT', visible: true },
];

export const mockJournalDetail: JournalDetail = {
  activeTags: {
    conditions: mockConditionTags,
    sideEffects: mockSideEffectTags,
    troubles: mockTroubleTags,
    goals: [
      { goalId: 1, content: '30분 집중 블록 3회' },
      { goalId: 2, content: '점심 약 제시간에 복용' },
    ],
  },
  checked: {
    conditions: [
      { tagId: 1, condition: '집중 어려움', conditionType: 'USER_INPUT', visible: true, checkedAt: '2026-05-31T09:10:00' },
      { tagId: 3, condition: '짜증', conditionType: 'USER_INPUT', visible: true, checkedAt: '2026-05-31T14:30:00' },
    ],
    sideEffects: [
      { tagId: 10, sideEffect: '식욕 저하', visible: true, checkedAt: '2026-05-31T08:30:00' },
    ],
    troubles: [],
    sleep: { sleepHour: 7, sleepQuality: 'NORMAL' },
    meal: { ateBreakfast: true, ateLunch: false, ateDinner: false },
    goals: [{ goalId: 1, content: '30분 집중 블록 3회', score: 3 }],
    memo: '오늘은 오전에 집중이 잘 됐다. 점심 이후로 약간 처지는 느낌.',
  },
};

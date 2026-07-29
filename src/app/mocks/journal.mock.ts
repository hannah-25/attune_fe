import type { JournalDetail, ConditionTag, SideEffectTag, TroubleTag, JournalTag } from '../api/journal';

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

export const mockCatalogConditionTags: JournalTag[] = [
  { tagId: 1, category: 'CONDITION', name: '집중 어려움', tagType: 'USER_INPUT', scope: 'USER', enabled: true, visible: true },
  { tagId: 2, category: 'CONDITION', name: '멍해짐', tagType: 'FOGGY', scope: 'SYSTEM', enabled: true, visible: true },
  { tagId: 3, category: 'CONDITION', name: '짜증', tagType: 'USER_INPUT', scope: 'USER', enabled: true, visible: true },
  { tagId: 4, category: 'CONDITION', name: '불안', tagType: 'USER_INPUT', scope: 'USER', enabled: true, visible: true },
  { tagId: 5, category: 'CONDITION', name: '무기력', tagType: 'DOWN', scope: 'SYSTEM', enabled: true, visible: true },
  { tagId: 6, category: 'CONDITION', name: '두근거림', tagType: 'USER_INPUT', scope: 'USER', enabled: false, visible: false },
  { tagId: 7, category: 'CONDITION', name: '졸림', tagType: 'DOWN', scope: 'SYSTEM', enabled: false, visible: false },
];

export const mockCatalogSideEffectTags: JournalTag[] = [
  { tagId: 10, category: 'SIDE_EFFECT', name: '식욕 저하', tagType: 'NONE', scope: 'SYSTEM', enabled: true, visible: true },
  { tagId: 11, category: 'SIDE_EFFECT', name: '두통', tagType: 'NONE', scope: 'SYSTEM', enabled: true, visible: true },
  { tagId: 12, category: 'SIDE_EFFECT', name: '입마름', tagType: 'NONE', scope: 'SYSTEM', enabled: false, visible: false },
];

export const mockCatalogTroubleTags: JournalTag[] = [
  { tagId: 20, category: 'TROUBLE', name: '집중 실수', tagType: 'INATTENTION', scope: 'SYSTEM', enabled: true, visible: true },
  { tagId: 21, category: 'TROUBLE', name: '시간 관리 실패', tagType: 'TIME_MANAGEMENT', scope: 'SYSTEM', enabled: true, visible: true },
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
    checkedCatalogTagIds: [],
    sleep: { sleepHour: 7, sleepQuality: 'NORMAL' },
    meal: { ateBreakfast: true, ateLunch: false, ateDinner: false },
    goals: [{ goalId: 1, content: '30분 집중 블록 3회', score: 3 }],
    memo: '오늘은 오전에 집중이 잘 됐다. 점심 이후로 약간 처지는 느낌.',
  },
};

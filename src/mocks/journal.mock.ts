// TODO: Replace with API data

export type DotColor = 'purple' | 'orange' | 'blue' | 'green';

export const mockDayRecords: Record<number, DotColor[]> = {
  2:  ['purple'],
  3:  ['purple', 'blue'],
  5:  ['orange'],
  6:  ['purple', 'orange'],
  7:  ['purple'],
  8:  ['green'],
  9:  ['purple', 'blue'],
  11: ['orange', 'blue'],
  12: ['purple', 'green'],
  16: ['purple'],
  17: ['orange'],
  18: ['purple', 'blue'],
  19: ['purple'],
  20: ['green'],
  22: ['purple', 'orange'],
  23: ['blue'],
  24: ['purple'],
  25: ['green', 'purple'],
  26: ['purple', 'orange'],
  27: ['purple'],
};

export const mockTags = [
  { id: 'focus',      label: '집중 어려움', count: '3회', active: true  },
  { id: 'blank',      label: '멍해짐',     count: '3회', active: true  },
  { id: 'irritation', label: '짜증',       count: '3회', active: true  },
  { id: 'anxiety',    label: '불안',       count: '3회', active: true  },
  { id: 'lethargy',   label: '무기력',     count: '3회', active: true  },
  { id: 'headache',   label: '두근거림',                 active: false },
  { id: 'sleepy',     label: '졸림',                     active: false },
];

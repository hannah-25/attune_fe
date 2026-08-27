// 달 이동 말일 보정 회귀 테스트.
//
// 캘린더 이전/다음 달 버튼이 selectedDate를 옮길 때, 말일에서 이동하면 달을 통째로
// 건너뛰는 고전적인 버그가 난다(1/31 → 3/3). 이 함수가 그것을 막는다.
//
// Run: pnpm test:date

import assert from 'node:assert/strict';
import test from 'node:test';

import { addMonthsClamped } from './date';

const key = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

test('clamps to the last day of the target month', () => {
  assert.equal(key(addMonthsClamped(new Date(2026, 0, 31), 1)), '2026-2-28');
  assert.equal(key(addMonthsClamped(new Date(2024, 0, 31), 1)), '2024-2-29'); // 윤년
  assert.equal(key(addMonthsClamped(new Date(2026, 2, 31), -1)), '2026-2-28');
});

test('keeps the day when the target month is long enough', () => {
  assert.equal(key(addMonthsClamped(new Date(2026, 7, 15), 1)), '2026-9-15');
  assert.equal(key(addMonthsClamped(new Date(2026, 7, 15), -1)), '2026-7-15');
});

test('crosses year boundaries', () => {
  assert.equal(key(addMonthsClamped(new Date(2026, 11, 31), 1)), '2027-1-31');
  assert.equal(key(addMonthsClamped(new Date(2026, 0, 1), -1)), '2025-12-1');
});

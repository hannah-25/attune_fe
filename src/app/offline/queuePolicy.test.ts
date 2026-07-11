// 오프라인 쓰기 큐의 소유자 판별 회귀 테스트.
//
// 실행: pnpm test:offline

import assert from 'node:assert/strict';
import test from 'node:test';

import { shouldDropQueueItem } from './queuePolicy';

const USER_A = 'a3f1c2d4-0000-4000-8000-000000000001';
const USER_B = 'b7e2d3c5-0000-4000-8000-000000000002';

test('같은 사용자가 적재한 항목은 재전송한다', () => {
  assert.equal(shouldDropQueueItem(USER_A, USER_A), false);
});

test('계정이 바뀌면 이전 사용자의 항목을 폐기한다', () => {
  assert.equal(shouldDropQueueItem(USER_A, USER_B), true);
});

test('소유자를 모르는 레거시 항목(v6 이전)은 폐기한다', () => {
  assert.equal(shouldDropQueueItem(undefined, USER_A), true);
});

test('로그인 상태가 아니면 어떤 항목도 전송하지 않는다', () => {
  assert.equal(shouldDropQueueItem(USER_A, null), true);
});

test('소유자도 없고 로그인도 없으면 폐기한다', () => {
  assert.equal(shouldDropQueueItem(undefined, null), true);
});

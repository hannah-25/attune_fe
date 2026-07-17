// Regression tests for push re-subscription intent policy.
//
// 이 정책이 무너지면 사용자가 끈 알림이 앱을 열 때마다 되살아난다.
//
// Run: pnpm test:push-policy

import assert from 'node:assert/strict';
import test from 'node:test';

import { decidePushSync } from './pushPolicy';

test('never revives push the user turned off', () => {
  assert.deepEqual(decidePushSync('false', true), { action: 'skip', promoteOptIn: false });
  assert.deepEqual(decidePushSync('false', false), { action: 'skip', promoteOptIn: false });
});

test('recreates a dropped subscription when the user opted in', () => {
  assert.deepEqual(decidePushSync('true', false), { action: 'create-and-register', promoteOptIn: false });
});

test('re-registers an existing subscription when the user opted in', () => {
  assert.deepEqual(decidePushSync('true', true), { action: 'register-existing', promoteOptIn: false });
});

// 레거시 기기: 의도가 기록되기 전에 구독한 사용자.
test('migrates a legacy device with a live subscription', () => {
  assert.deepEqual(decidePushSync(null, true), { action: 'register-existing', promoteOptIn: true });
});

// 의도를 모르는데 구독도 없으면 무엇을 원했는지 알 방법이 없다. 추측해서 만들지 않는다.
test('does not create a subscription for a legacy device with no intent recorded', () => {
  assert.deepEqual(decidePushSync(null, false), { action: 'skip', promoteOptIn: false });
});

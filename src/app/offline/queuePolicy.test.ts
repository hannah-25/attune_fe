// Regression tests for offline sync queue ownership policy.
//
// Run: pnpm test:offline

import assert from 'node:assert/strict';
import test from 'node:test';

import { shouldDropQueueItem } from './queuePolicy';

const USER_A = 'a3f1c2d4-0000-4000-8000-000000000001';
const USER_B = 'b7e2d3c5-0000-4000-8000-000000000002';

test('keeps items queued by the current user', () => {
  assert.equal(shouldDropQueueItem(USER_A, USER_A), false);
});

test('drops items queued by a different user', () => {
  assert.equal(shouldDropQueueItem(USER_A, USER_B), true);
});

test('drops legacy items with an unknown owner', () => {
  assert.equal(shouldDropQueueItem(undefined, USER_A), true);
});

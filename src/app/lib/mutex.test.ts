// Regression tests for the shared-resource serialization primitive.
//
// 푸시 구독 등록/해제가 겹치면 해제 뒤에 착지한 등록이 구독을 되살린다. 이 모듈은 그
// 겹침 자체를 막는다.
//
// Run: pnpm test:mutex

import assert from 'node:assert/strict';
import test from 'node:test';

import { createMutex } from './mutex';

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

// 대기 중인 마이크로태스크를 모두 흘려보낸다. 작업 시작은 마이크로태스크 경계 뒤이므로
// 스케줄 직후 동기 시점에 관찰하면 아무것도 시작되지 않은 상태로 보인다.
function flush(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}

test('does not overlap operations', async () => {
  const withLock = createMutex();
  const events: string[] = [];
  const first = deferred<void>();

  const a = withLock(async () => {
    events.push('a:start');
    await first.promise;
    events.push('a:end');
  });
  const b = withLock(async () => {
    events.push('b:start');
    events.push('b:end');
  });

  await flush();
  // 두 번째 작업은 첫 번째가 끝나기 전에는 시작조차 하지 않는다.
  assert.deepEqual(events, ['a:start']);

  first.resolve();
  await Promise.all([a, b]);
  assert.deepEqual(events, ['a:start', 'a:end', 'b:start', 'b:end']);
});

test('runs operations in call order', async () => {
  const withLock = createMutex();
  const order: number[] = [];

  await Promise.all(
    [1, 2, 3, 4].map(n => withLock(async () => {
      order.push(n);
    })),
  );

  assert.deepEqual(order, [1, 2, 3, 4]);
});

// 실패한 작업이 체인을 끊으면 락이 잠긴 채 남아 이후 구독 조작이 전부 멎는다.
test('keeps running after an operation rejects', async () => {
  const withLock = createMutex();
  const events: string[] = [];

  const failing = withLock(async () => {
    events.push('failing');
    throw new Error('boom');
  });

  await assert.rejects(failing, /boom/);

  await withLock(async () => {
    events.push('next');
  });

  assert.deepEqual(events, ['failing', 'next']);
});

test('propagates the operation result to its own caller', async () => {
  const withLock = createMutex();
  assert.equal(await withLock(async () => 42), 42);
});

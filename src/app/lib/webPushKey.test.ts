// Regression tests for Web Push applicationServerKey conversion/comparison.
//
// Run: pnpm test:push

import assert from 'node:assert/strict';
import test from 'node:test';

import { isStaleApplicationServerKey, urlBase64ToArrayBuffer } from './webPushKey';

// 실제 배포에 쓰는 VAPID 공개키 (.env.production — 공개용 값).
const VAPID_PUBLIC_KEY = 'BB3j4s2mMdDjqe3lNsgydSm9CejwqqCBaR9_Y8eeN9yq2GwDf8SdEtTHrQRjXYnG6y9KHiA6gmvOPb7kVuXmLik';

test('decodes a VAPID public key to a 65-byte P-256 point', () => {
  const key = urlBase64ToArrayBuffer(VAPID_PUBLIC_KEY);
  assert.equal(key.byteLength, 65);
  // uncompressed point 표기는 0x04로 시작한다.
  assert.equal(new Uint8Array(key)[0], 0x04);
});

test('decodes URL-safe characters and restores padding', () => {
  // '-'와 '_'는 표준 base64의 '+'와 '/'에 해당한다. 'x' 하나는 패딩 두 개가 필요하다.
  assert.deepEqual([...new Uint8Array(urlBase64ToArrayBuffer('-_8'))], [0xfb, 0xff]);
  assert.deepEqual([...new Uint8Array(urlBase64ToArrayBuffer('QQ'))], [0x41]);
});

test('treats an identical key as current', () => {
  const current = urlBase64ToArrayBuffer(VAPID_PUBLIC_KEY);
  const subscribed = urlBase64ToArrayBuffer(VAPID_PUBLIC_KEY);
  assert.equal(isStaleApplicationServerKey(subscribed, current), false);
});

test('reports a different key of the same length as stale', () => {
  const current = urlBase64ToArrayBuffer(VAPID_PUBLIC_KEY);
  const subscribed = urlBase64ToArrayBuffer(VAPID_PUBLIC_KEY);
  new Uint8Array(subscribed)[64] ^= 0xff;
  assert.equal(isStaleApplicationServerKey(subscribed, current), true);
});

test('reports a length mismatch as stale', () => {
  const current = urlBase64ToArrayBuffer(VAPID_PUBLIC_KEY);
  assert.equal(isStaleApplicationServerKey(new Uint8Array([0x04]).buffer, current), true);
});

// 브라우저가 options.applicationServerKey를 노출하지 않는 경우. 낡았다고 단정하면
// 앱을 열 때마다 재구독하게 되므로 그대로 둔다.
test('treats an unavailable subscription key as current', () => {
  const current = urlBase64ToArrayBuffer(VAPID_PUBLIC_KEY);
  assert.equal(isStaleApplicationServerKey(null, current), false);
  assert.equal(isStaleApplicationServerKey(undefined, current), false);
});

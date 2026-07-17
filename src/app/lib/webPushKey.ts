// Web Push의 applicationServerKey 변환·비교.
//
// DOM과 import.meta에 의존하지 않는다 — 테스트 러너(scripts/test-node.mjs)가 tsc로 CJS
// 변환하는데 import.meta는 --module commonjs에서 쓸 수 없다. VAPID 키 읽기는 호출부에 둔다.

export function urlBase64ToArrayBuffer(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const bytes = new Uint8Array(rawData.length);
  for (let index = 0; index < rawData.length; index += 1) {
    bytes[index] = rawData.charCodeAt(index);
  }
  return bytes.buffer;
}

// 구독이 지금 쓰는 VAPID 키와 다른 키로 만들어졌는지 — 서버가 발송해도 도달하지 않는 구독인지.
//
// 비교가 불가능하면(브라우저가 options.applicationServerKey를 노출하지 않으면) false를 반환한다.
// 낡았다고 단정하면 앱을 열 때마다 재구독하게 된다.
export function isStaleApplicationServerKey(
  subscriptionKey: ArrayBuffer | null | undefined,
  currentKey: ArrayBuffer,
): boolean {
  if (!subscriptionKey) return false;

  const subscribed = new Uint8Array(subscriptionKey);
  const current = new Uint8Array(currentKey);
  if (subscribed.length !== current.length) return true;

  return subscribed.some((byte, index) => byte !== current[index]);
}

/**
 * 오프라인 쓰기 큐의 소유자 판별 정책. Dexie/DOM에 의존하지 않는 순수 함수.
 *
 * 큐는 기기에 남고 access token은 매 요청 새로 읽히므로, 적재한 사용자와
 * 재전송 시점의 사용자가 다를 수 있다. 계정 전환 후 재전송하면 이전 사용자의
 * 쓰기가 새 계정의 토큰으로 서버에 적용된다.
 */
export function shouldDropQueueItem(
  itemUserId: string | undefined,
  currentUserId: string | null,
): boolean {
  // 소유자를 특정할 수 없는 항목(v5 이전 스키마에서 넘어온 레거시)은 전송하지 않는다.
  // 추측해서 보내는 것이 바로 막으려는 동작이다.
  if (!itemUserId) return true;
  if (!currentUserId) return true;
  return itemUserId !== currentUserId;
}

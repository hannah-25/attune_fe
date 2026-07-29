# 계획: 푸시 구독 상태를 서버 기준으로 정확화 (B-2)

브랜치: `fix/push-subscription-server-status` (base: `develop`, A-2/B-1 머지 완료 상태에서 분기)

---

## 1. 문제

`isPushSubscribed()`는 지금까지 브라우저에 구독 객체가 있는지만 확인했다. 서버가 그
endpoint를 실제로 활성 상태(`enabled=true`)로 들고 있는지는 조회할 API가 없어 확인할
방법이 없었다(A-2/B-1 계획 문서에 이미 명시된 한계). 백엔드에 `GET
/v1/alarm/subscriptions`가 추가되어 이 격차를 해소할 수 있게 됐다.

---

## 2. 백엔드 계약 (2026-07-24 확인, `attune-be` 소스 직접 확인)

```
GET /v1/alarm/subscriptions?endpointOrToken={value}
Authorization: Bearer {token}
```

응답: 항상 `200 { "enabled": boolean }`. 인증된 유저 본인의 구독만 조회되며(서버가
`SecurityUtils.getCurrentUserUuid()`로 스코프), 조회 대상이 없거나 비활성 상태여도
404가 아니라 `enabled: false`로 응답한다 — 기존 `DELETE`가 존재 여부와 무관하게 204를
반환하는 것과 같은 패턴으로 프론트 결정.

---

## 3. 변경 사항

### 3.1 `src/app/api/alarm.ts`

`getAlarmSubscriptionStatus(endpointOrToken)` 추가. 기존 `subscribeAlarm`/`unsubscribeAlarm`과
같은 패턴.

### 3.2 `src/app/lib/pushSubscription.ts` — `isPushSubscribed()`

```ts
export async function isPushSubscribed(): Promise<boolean> {
  if (!supportsPush() || Notification.permission !== 'granted') return false;
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = await registration?.pushManager?.getSubscription();
  if (!subscription) return false;

  try {
    const { enabled } = await getAlarmSubscriptionStatus(subscription.endpoint);
    return enabled;
  } catch (err) {
    console.error('[push] status check failed:', err);
    return true; // 조회 실패는 "비활성 확답"과 다르다 — 브라우저 신호로 낙관적 폴백
  }
}
```

**조회 실패 시 낙관적 폴백(`true`)을 선택한 이유:** 네트워크 일시 장애로 조회 자체가
실패하는 것과, 서버가 명시적으로 "비활성"이라고 응답하는 것은 다른 신호다. 조회
실패마다 "연결 안 됨"으로 뒤집히면 매 페이지 로드마다 토글이 깜빡일 수 있다. 진짜
동기화 실패 신호는 B-1의 `syncFailed` 배너가 이미 별도로 담당한다 — `isPushSubscribed()`는
"서버가 확실히 아니라고 했는지"만 반영하면 된다.

### 3.3 문서

- `guidelines/api-guide/alarm.md`에 `GET` 엔드포인트 계약 추가
- `NotificationSettingsPage.tsx`의 `deviceSubscribed` 관련 주석 갱신 (더 이상
  "브라우저 구독만"이 아님)

---

## 4. 알려진 갭 (범위 밖)

게스트 모드에서 `isPushSubscribed()`가 호출되면 `/v1/alarm/subscriptions` GET이 guest
mock resolver에 없는 경로라 `undefined`를 반환 → 구조 분해가 던지는 예외를 catch가
흡수해 `true`로 폴백한다. 이건 새 문제가 아니라 POST/DELETE도 이미 guest mock이 없어
같은 방식으로 조용히 no-op되던 기존 갭과 같은 성격이라 이번 범위에서 별도 처리하지 않는다.

---

## 5. 검증

1. `pnpm typecheck`, `pnpm test`, `pnpm verify` — 전부 통과
2. 수동 (`vite build --mode development && vite preview`, 로컬 백엔드):

   | 단계 | 기대 | 결과 (2026-07-24) |
   |------|------|------|
   | 정상 구독 상태 | "연결됨" 정상 표시 | ✅ 통과 |
   | 서버에서만 구독 비활성화 (브라우저 구독은 그대로) 후 새로고침 | "연결 안 됨"으로 정확히 표시 | ✅ 통과 |
   | 백엔드를 내려 조회 자체를 실패시킨 뒤 새로고침 | 토글은 "연결됨" 유지(낙관적 폴백) | ✅ 통과 |

   3번째 케이스에서 토글은 "연결됨"으로 유지되면서 동시에 B-1의 "연결에 문제가 있어요"
   배너도 함께 떴다 — **의도된 동작.** `isPushSubscribed()`(B-2)는 서버 확답이 없을 때
   낙관적으로 마지막 상태를 유지해 깜빡임을 막고, `syncPushSubscription()`(B-1)은 실제로
   시도한 재등록 POST가 정말 실패했다는 사실을 숨기지 않고 배너로 알린다. "표시는
   낙관적으로 유지하되 문제는 확실히 알린다"는 두 기능의 의도된 조합.

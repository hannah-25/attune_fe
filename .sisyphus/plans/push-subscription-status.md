# 계획: 푸시 동기화 실패를 설정 화면에 노출 (B-1)

브랜치: `fix/push-subscription-status` (base: `develop`, A-2 머지 완료 상태에서 분기)

---

## 1. 문제

A-2(`fix/push-subscription-resync`)에서 `syncPushSubscription()`이 앱 시작마다
백그라운드에서 구독을 자가치유하도록 만들었다. 하지만 이 배경 작업은 **절대 throw하지
않고 실패를 조용히 흡수**하는 계약이라(`pushSubscription.ts` 주석), 서버 등록이
실패해도 사용자는 알 방법이 없다.

`NotificationSettingsPage`의 "연결됨/연결 안 됨" 표시는 `isPushSubscribed()`로
**브라우저 쪽 구독 존재 여부만** 확인한다. 브라우저엔 구독이 남아있는데 백그라운드 sync의
서버 등록 POST만 조용히 실패한 경우, 화면은 "연결됨"이라고 보여주지만 실제로는 알림이
안 온다 — 사용자가 원인을 알 방법이 없다.

A-2 문서 §8에 후속으로 명시돼 있던 항목: **sync 실패를 설정 화면에
"연결에 문제가 있어요 · 다시 연결하기"로 노출**한다. 백엔드 변경 불필요.

---

## 2. 설계

### 2.1 `pushSubscription.ts` — 마지막 동기화 결과를 모듈 상태로 노출

`ensureSubscribedAndRegister()`가 기존엔 `boolean`만 반환해서, 호출부에서
"의도적으로 건너뜀"(opt-in false, 레거시+구독없음)과 "시도했지만 실패함"(SW 타임아웃,
POST 실패)을 구분할 수 없었다. 구분이 없으면 정상적으로 skip된 케이스까지 실패로
오판해 매번 배너가 뜨는 false positive가 생긴다.

- `ensureSubscribedAndRegister()`의 반환 타입을 내부 전용 유니온
  `'registered' | 'skipped' | 'failed'`로 변경. `decidePushSync`가 `skip`을 반환하면
  `'skipped'`, `registerSubscription()`이 성공하면 `'registered'`, 실패하면 `'failed'`.
- 공개 상태:
  ```ts
  export type PushSyncStatus = 'unknown' | 'ok' | 'failed';
  let lastSyncStatus: PushSyncStatus = 'unknown';
  export function getLastSyncStatus(): PushSyncStatus {
    return lastSyncStatus;
  }
  ```
- `ensureSubscribedAndRegister()`가 리턴하기 직전, 모든 경로에서 `lastSyncStatus`를 갱신
  (`'skipped'|'registered'` → `'ok'`, `'failed'` → `'failed'`). VAPID 키 누락은 미지원과
  동급으로 취급해 `'ok'`.
- `subscribeToPush()`/`syncPushSubscription()`의 catch 블록(SW 타임아웃 등 throw로 빠지는
  경로)에서도 `lastSyncStatus = 'failed'`를 기록. 두 함수는 외부에는 여전히 `boolean`만
  반환 — `ensureSubscribedAndRegister()`의 3분류 결과를 `=== 'registered'`로 변환.
- 세 값의 매핑은 한 줄짜리라 별도 순수 모듈로 안 뺐다 — 이 파일의 다른 DOM 의존 로직과
  같은 테스트 커버리지 수준으로 남긴다.

### 2.2 `NotificationSettingsPage.tsx` — 배너 노출 + 재연결

`HomeMedicationSection.tsx`의 기존 에러+재시도 인라인 패턴(빨강 텍스트 + 보라 재시도
버튼)을 그대로 재사용:

```tsx
{syncFailed ? (
  <div className="flex items-center justify-between gap-3 px-1" role="alert">
    <span className="text-xs text-red-700">연결에 문제가 있어요</span>
    <button type="button" onClick={retryConnection} disabled={isUpdating}
      className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-purple-700 disabled:opacity-50">
      다시 연결하기
    </button>
  </div>
) : null}
```

"이 기기에서 알림 받기" 카드 바로 아래, 기존 `error` 배너 위에 배치. `retryConnection`은
`subscribeToPush()`를 호출하는 별도 함수로, 성공하면 배너가 사라지고 토글이 "연결됨"으로
바뀐다.

### 2.3 마운트 시점 경합 (구현 중 발견, 설계 수정)

최초 계획은 마운트 시 `getLastSyncStatus()`를 한 번 읽는 것이었다. **수동 검증에서 실패로
드러났다:** 사용자가 알림 설정 화면에 있는 채로 새로고침하면, 이 페이지의 마운트 effect가
`ProtectedRoute`의 백그라운드 sync보다 먼저(또는 동시에) 실행돼 `lastSyncStatus`가 아직
`'unknown'`인 시점을 읽어버린다 — 배너가 안 뜬다. "로그인 → 홈 → 설정 이동" 동선이면
문제없지만, 설정 화면에서 직접 새로고침하는 것도 자연스러운 동선이라 실제로 자주 걸린다.

**수정:** 값을 그냥 읽지 않고, sync를 기다린 뒤 읽는다.

```ts
syncPushSubscription().finally(() => {
  if (!ignore) setSyncFailed(getLastSyncStatus() === 'failed');
});
```

`syncPushSubscription()`은 진행 중인 sync가 있으면 그 프로미스에 합류하고(in-flight 재사용
가드), 없으면 새로 시도한다 — 이미 완료된 뒤 마운트된 일반적인 경우엔 추가 POST가 한 번
더 나가지만, 백엔드가 upsert라 A-2에서 이미 받아들인 비용과 동일한 성격이다. 원래
"알려진 한계"로 문서화하고 넘어가려 했던 부분인데, 수동 검증에서 실제로 재현되어 이
방식으로 수정했다 — 별도 이벤트 버스(`SyncService`의 `syncEvents` 패턴) 없이 기존
in-flight 가드만으로 해결됨.

---

## 3. 변경 파일

- `src/app/lib/pushSubscription.ts` — `lastSyncStatus` 상태, `getLastSyncStatus()` export,
  `ensureSubscribedAndRegister()` 반환 타입 변경, 호출부 3곳 갱신
- `src/pages/settings/NotificationSettingsPage.tsx` — 배너 UI, `retryConnection`,
  마운트 시 sync 완료를 기다린 뒤 상태 읽기

---

## 4. 검증

1. `pnpm test`, `pnpm typecheck`, `pnpm verify` — 전부 통과
2. 수동 (`vite build --mode development && npx vite preview`, 로컬 백엔드 `localhost:8080`):

   | 단계 | 기대 | 결과 (2026-07-24) |
   |------|------|------|
   | 정상 등록 (토글 ON, POST 201) | 배너 안 뜸 | ✅ 통과 |
   | 토글 OFF → 새로고침 | 배너 안 뜸 (의도적 skip을 실패로 오판하지 않는지) | ✅ 통과 |
   | 로컬 백엔드 내리고 알림 설정 화면에서 새로고침 | sync POST 실패 → 배너 뜸 | ❌ 최초 실패 → §2.3 수정 후 ✅ 통과 |
   | 백엔드 복구 후 "다시 연결하기" 클릭 | 배너 사라지고 토글 "연결됨" 유지 | ✅ 통과 |

# 계획: 푸시 구독 재동기화 (A-2)

브랜치: `fix/push-subscription-resync` (base: `develop`)
범위: **A-2만.** B-1(상태 노출), A-1(SW `pushsubscriptionchange`), B-2(서버 조회)는 후속.

---

## 1. 문제

알림이 한 번 등록된 뒤 조용히 죽고, 복구 경로가 없다.

| # | 결함 | 근거 |
|---|------|------|
| 1 | `syncPushSubscription()`이 죽은 코드 — 아무도 호출하지 않음 | `pushSubscription.ts:20` 정의, 호출부 0곳 |
| 2 | 브라우저가 구독을 로테이션·폐기해도 서버는 죽은 endpoint를 계속 보유 | `sw.ts`에 `pushsubscriptionchange` 핸들러 없음 |
| 3 | 설정 화면이 브라우저 상태만 보고 "연결됨" 표시 | `isPushSubscribed()`가 `getSubscription()`만 확인 |

세션 만료 로그아웃(`client.ts:271` `redirectToLoginOnce`)은 구독을 해제하지 않으므로,
같은 브라우저에서 계정을 바꾸면 endpoint가 이전 사용자에 묶인 채 남는다.

**배제된 원인:** VAPID 키 로테이션. `abede4f`에서 추가된 이후 불변.

---

## 2. 설계를 좌우한 제약

- **SW는 localStorage를 못 읽는다.** 토큰이 `client.ts:69`에서 localStorage로 관리되므로
  SW 안에서 `POST /v1/alarm/subscriptions`를 Bearer로 부를 수 없다. → A-1이 후속으로 밀린 이유.
- **`GET /v1/alarm/subscriptions`가 없다.** (`alarm.md`, `api-index.md` 모두 POST/DELETE만)
  → 서버 상태를 조회할 수 없으므로, **앱 시작마다 재POST**하는 것이 서버측 레코드 유실을
  복구하는 유일한 방법. (결정: 항상 재POST)
- **dev에서는 SW가 안 뜬다.** `vite.config.ts:59` `devOptions.enabled: false` +
  `pushSubscription.ts:58`의 `import.meta.env.PROD` 게이트. → 수동 검증은 프로덕션 빌드로만 가능.

---

## 3. 핵심 설계 결정: 의도 플래그

**문제:** 사용자가 설정에서 토글을 끄면 구독은 해제되지만 `Notification.permission`은
`granted`로 남는다. "권한 granted + 구독 없음"만 보고 자동 재구독하면 **사용자가 끈 알림이
되살아난다.** 브라우저가 버린 것과 사용자가 끈 것을 permission으로는 구별할 수 없다.

**해결:** 이 기기의 의도를 localStorage에 명시적으로 남기고, 그것만 신뢰한다.

키: `push_opt_in` (`'true'` | `'false'` | 없음)

| 상태 | `syncPushSubscription()` 동작 | 이유 |
|------|------------------------------|------|
| `'false'` | 아무것도 안 함 | 사용자가 끔. 되살리지 않는다. |
| `'true'` | 구독 확보(없으면 생성) + 서버 재등록 | 자가치유 대상 |
| 없음 (레거시) | **구독이 이미 있을 때만** 재등록. 없으면 생성하지 않고, 발견 시 플래그를 `'true'`로 승격 | 기존 사용자는 의도를 모른다. 없는 구독을 새로 만들면 의도 추측이 된다. |

레거시 사용자 중 구독이 이미 폐기된 경우는 자가치유되지 않는다 — 의도를 알 방법이 없으므로
의도적으로 그렇게 둔다. 토글을 한 번 조작하면 플래그가 생겨 이후로는 치유된다.

**플래그를 세팅하는 주체는 호출자다.** `unsubscribeFromPush()`가 두 맥락에서 쓰이기 때문:

- `NotificationSettingsPage` 토글 OFF → 의도 변경 → 플래그 `'false'`
- `MyPage:82` 로그아웃 → 기기 정리일 뿐 의도 변경 아님 → **플래그 건드리지 않음**

로그아웃에서 플래그를 지우면 재로그인 후 알림이 안 오고 사용자가 다시 토글해야 한다.
따라서 `unsubscribeFromPush()`는 지금처럼 기기 정리만 하고, 설정 화면용으로
`disablePushOnThisDevice()`를 새로 노출한다.

---

## 4. 변경 사항

### 4.1 (신규) `src/app/lib/webPushKey.ts`

순수 모듈. **DOM·`import.meta` 금지** — 테스트 러너가 tsc로 CJS 변환하는데
`import.meta`는 `--module commonjs`에서 에러(TS1343)다. env 읽기는 `pushSubscription.ts`에 남긴다.

```ts
export function urlBase64ToArrayBuffer(base64String: string): ArrayBuffer
// pushSubscription.ts:35에서 그대로 이동

export function isStaleApplicationServerKey(
  subscriptionKey: ArrayBuffer | null | undefined,
  currentKey: ArrayBuffer,
): boolean
```

`isStaleApplicationServerKey`는 **비교 가능하고 실제로 다를 때만** `true`.
`subscriptionKey`가 없으면(브라우저가 `options.applicationServerKey`를 노출 안 함) `false` —
매 시작마다 재구독하는 무한 루프를 막는다.

### 4.2 `src/app/lib/pushSubscription.ts`

`subscribeToPush`와 `syncPushSubscription`이 공유하는 코어를 추출한다. 지금 두 함수의
구독 로직이 갈라져 있고, `subscribeToPush`는 `getSubscription() ?? subscribe()`라 키가
바뀐 낡은 구독을 그대로 서버에 등록한다(같은 버그).

- `resolveRegistration()` — 기존 `subscribeToPush`의 registration 확보 로직(57~78행)을 추출.
  타임아웃 상수 `SW_READY_TIMEOUT_MS = 15000`으로 명명.
- `ensureSubscribedAndRegister()` — **권한 granted 전제.**
  구독 조회 → 키가 낡았으면 `unsubscribe()` 후 재구독 → 없으면 `subscribe()` → `registerSubscription()`.
- `subscribeToPush()` — `requestPermission()` 후 `ensureSubscribedAndRegister()`.
  성공 시 `push_opt_in = 'true'`. `ServiceWorkerTimeoutError` rethrow는 유지(설정 화면이 문구 분기에 씀).
- `syncPushSubscription()` — 락 획득 → 의도 플래그 확인 → `ensureSubscribedAndRegister()`.
  **절대 throw하지 않는다**(사용자 행동이 아니라 배경 작업). 실패 시 `false`.
  sync끼리의 중복 호출은 `client.ts:261` `reissueSessionSingleFlight`의 in-flight 프로미스
  패턴으로 합류시킨다(락은 큐잉이라 그것만으로는 중복 POST가 난다).
- `disablePushOnThisDevice()` (신규 export) — 락 획득 → `push_opt_in = 'false'` 먼저 기록 →
  `unsubscribeFromPush()`.
- `unsubscribeFromPush()` — 변경 없음. 플래그를 건드리지 않는다(로그아웃 경로).

**직렬화 (9.2).** 위 셋은 모두 "이 기기의 구독"이라는 하나의 상태를 건드리므로 공유 락으로
직렬화한다. 락 없이 의도 플래그만 두면 경합으로 3장의 문제가 되돌아온다:
앱 시작 sync의 POST가 비행 중일 때 사용자가 OFF → DELETE 완료 → 뒤늦게 POST 착지 →
**서버 구독 부활.**

```ts
// 프로미스 체인 mutex. 앞 작업의 성공·실패와 무관하게 다음 작업을 잇는다.
let deviceOpLock: Promise<unknown> = Promise.resolve();

function withDeviceLock<T>(op: () => Promise<T>): Promise<T> {
  const run = deviceOpLock.then(op, op);
  deviceOpLock = run.catch(() => {}); // 거부가 체인을 끊지 않게
  return run;
}
```

`syncPushSubscription()`은 **락을 얻은 뒤 의도 플래그를 다시 읽는다** — 대기 중에 OFF가
끼어들었을 수 있다. 이 재확인이 9.2가 요구하는 "sync 결과 무효화"에 해당한다.

`subscribe()`는 권한이 이미 `granted`일 때만 호출되므로 **권한 프롬프트가 뜨지 않는다.**
앱 시작마다 불러도 안전한 근거.

### 4.3 `src/pages/settings/NotificationSettingsPage.tsx`

`toggleDeviceSubscription`의 OFF 분기(95~97행)를 `unsubscribeFromPush()` →
`disablePushOnThisDevice()`로 교체.

9.4에 따라, 이 화면의 "연결됨"이 A-2 범위에서는 **여전히 브라우저 구독 상태만 뜻하고
서버 등록 성공을 보장하지 않는다**는 한계를 `deviceSubscribed` 선언부에 주석으로 남긴다
(B-1에서 해소). 그 외 변경 없음.

### 4.4 `src/app/App.tsx`

`ProtectedRoute`의 기존 effect(108~114행)에 호출 추가. 이 effect는 이미
`isGuestMode() || !getAccessToken() || !navigator.onLine`으로 게이팅돼 있다.

```ts
void syncPushSubscription();
```

`.catch()`를 붙이지 않는다 (9.5). `syncPushSubscription()`이 내부에서 실패를 흡수하고
`false`를 반환하는 계약이므로 호출부 `.catch()`는 이중 로깅이다. 대신 **구현이 그 계약을
실제로 보장해야 한다** — 초기 가드(`supportsPush()`, 권한, 플래그 확인)까지 전부 try 안에
넣어, 어떤 경로로도 reject되지 않게 한다. 로깅은 `pushSubscription.ts` 한 계층에서만.

**호출 지점이 여기 하나면 충분한 근거:** `/login`(App.tsx:236)이 `ProtectedRoute`(253행)
바깥이므로 `/login` → `/home` 이동 시 `ProtectedRoute`가 새로 마운트되고 effect가 돈다.
즉 **앱 시작과 로그인 직후가 같이 커버된다.** LoginPage의 네 개 로그인 경로
(비밀번호 57행 / 소셜 105행 / 구글 150행 / 계정복구 187·213행)를 각각 건드릴 필요가 없다.

### 4.5 (신규) `src/app/lib/pushPolicy.ts` — 의도 판정 (순수)

9.3이 요구하는 정책 자동 검증의 핵심. `offline/queuePolicy.ts`(순수 정책 모듈 + `queuePolicy.test.ts`)
와 같은 패턴 — 이 저장소에 이미 있는 관례를 그대로 따른다. DOM 없음.

```ts
export type PushSyncAction = 'skip' | 'register-existing' | 'create-and-register';

export function decidePushSync(
  optIn: 'true' | 'false' | null,
  hasSubscription: boolean,
): { action: PushSyncAction; promoteOptIn: boolean }
```

3장의 표를 그대로 코드로 옮긴 것이다. `pushSubscription.ts`는 이 판정을 실행만 한다 —
정책과 DOM 배선을 분리해야 정책이 테스트 가능해진다.

### 4.6 (신규) 테스트 + `package.json`

`queuePolicy.test.ts` 패턴(`node:test` + `node:assert/strict`)을 따른다.

`webPushKey.test.ts`
- `urlBase64ToArrayBuffer`: URL-safe 문자(`-`, `_`) 디코딩, 패딩 보정,
  실제 VAPID 공개키가 65바이트(P-256 uncompressed point)로 디코딩되는지
- `isStaleApplicationServerKey`: 동일 키 → `false` / 다른 키 → `true` /
  길이 다름 → `true` / `null` → `false`

`pushPolicy.test.ts` — 9.3 표의 1~4행
- `'false'` + 구독 유/무 → `skip` (POST·subscribe 없음)
- legacy(`null`) + 구독 있음 → `register-existing`, `promoteOptIn: true`
- legacy(`null`) + 구독 없음 → `skip`, 구독 생성 안 함
- `'true'` + 구독 없음 → `create-and-register`

`package.json`에 스크립트 추가 후 `test`에 체이닝:
```
"test:push": "node scripts/test-node.mjs src/app/lib/webPushKey.test.ts",
"test:push-policy": "node scripts/test-node.mjs src/app/lib/pushPolicy.test.ts",
```

> **미결 (9.3 표 5행 "sync와 OFF 경합").** 위 순수 테스트로는 커버되지 않는다.
> mutex 단위 테스트는 직렬화만 증명할 뿐 "최종적으로 구독이 남지 않는다"는 결합 결과는
> 증명하지 못한다. 이걸 자동화하려면 `pushSubscription.ts`를 포트 주입 구조
> (`getSubscription`/`subscribe`/`register`/`delete`를 주입)로 재구성해야 한다 —
> 이 저장소에 DOM 테스트 인프라가 없기 때문. **범위 결정 필요** (§10 참조).

---

## 5. 검증

1. `pnpm test` — 신규 `test:push`, `test:push-policy` 포함 통과
2. `pnpm verify` — typecheck + build + check-docs
3. **수동 (프로덕션 빌드 필수 — dev는 SW가 안 뜬다):** `pnpm build && npx vite preview`, localhost 접속

   | 단계 | 기대 |
   |------|------|
   | a. 로그인 → 알림 설정 → 토글 ON | Network에 `POST /v1/alarm/subscriptions` 200, Application > Service Workers에 구독 생성 |
   | b. Console에서 구독 강제 해제<br>`(await navigator.serviceWorker.ready).pushManager.getSubscription().then(s => s.unsubscribe())` | 구독 사라짐 |
   | c. **새로고침** | **구독 자동 재생성 + `POST` 재등장** ← A-2 핵심 |
   | d. 토글 OFF → 새로고침 | **`POST` 없음, 구독 재생성 안 됨** ← 의도 플래그 검증 (제일 중요) |
   | e. 권한 denied / 게스트 / 비로그인 상태로 새로고침 | `POST` 없음, 권한 프롬프트 안 뜸 |
   | f. **경합**: Network를 Slow 3G로 조여 앱 시작 sync의 POST가 비행 중일 때 토글 OFF | 최종 상태로 브라우저·서버 모두 구독 없음, `push_opt_in = 'false'` (9.2·9.3 5행) |

d와 f가 통과하지 못하면 이 계획은 실패다 — 사용자가 끈 알림을 되살리는 것이 원래 버그보다 나쁘다.
f는 §4.6 미결 사항이 자동화로 해결되지 않으면 **수동 검증이 유일한 방어선**이 된다.

---

## 6. 리스크

| 리스크 | 완화 |
|--------|------|
| ~~`POST`가 upsert가 아니면 앱 시작마다 중복 행~~ | ✅ 해소 (§7). 백엔드가 `(user, endpoint)` upsert + DB 유니크 제약 이중 방어. 재POST해도 행 안 늘어남 |
| ~~계정 전환 시 이전 사용자에게 푸시 계속 전달~~ | ✅ 해소 (§7). 백엔드가 upsert 직전 같은 endpoint의 타 사용자 활성 구독을 disable. 발송은 활성 구독만 대상 |
| sync와 OFF 경합으로 서버 구독 부활 | 공유 mutex + 락 획득 후 의도 플래그 재확인 (§4.2). 자동 검증은 §4.6 미결 |
| 레거시 사용자(플래그 없음 + 구독 폐기됨)는 치유 안 됨 | 의도적. 토글 1회로 승격됨 |
| 앱 시작마다 POST 1회 추가 | 무시할 수준. 실패해도 조용히 넘어감 |
| `options.applicationServerKey` 미노출 브라우저 | `isStaleApplicationServerKey`가 `false` 반환 → 기존 동작 유지 |

---

## 7. 백엔드 확인 — 모두 해소 (2026-07-18)

배포 차단 2건이 모두 백엔드에서 이미 처리되고 있음을 코드로 확인. **A-2 배포 차단 없음.**

1. **`POST /v1/alarm/subscriptions`는 upsert인가? → 예.**
   `registerWebPush()`가 `findByUserIdAndEndpoint`로 조회해 있으면 키를 in-place 갱신, 없으면
   insert. 엔티티에 `(user_id, endpoint)`·`(user_id, token)` DB 유니크 제약도 있어 이중 방어.
   앱 시작마다 재POST해도 같은 (user, endpoint)면 행이 늘지 않는다.
   - 사소: 갱신이어도 컨트롤러가 항상 201을 반환(200이 맞음). 동작 무관.
2. **endpoint 소유권이 재할당되는가? → 예.** (프라이버시 차단 조건 해소)
   upsert 직전 `findAllByEndpointAndUserIdNotAndEnabledTrue(endpoint, userId).forEach(disable)`가
   같은 endpoint를 쓰는 타 사용자의 활성 구독을 전부 disable. 발송 대상 조회는
   `findAllByUserIdAndEnabledTrue`뿐이라, 계정 B가 그 브라우저를 등록하면 계정 A는 더 이상
   그 endpoint로 알림을 못 받는다. **A-2의 앱 시작 POST가 정확히 이 이전을 촉발한다.**
   - 주의: 이전 사용자 행은 삭제가 아니라 `enabled=false`로 남아 누적. 발송 무관.
3. **발송 시 404/410 정리하는가? → 예.**
   `WebPushSender`가 404/410에 `InvalidSubscriptionException`을 던지고, `NotificationService`가
   해당 구독 ID를 모아 `disableSubscriptions()`로 `enabled=false` 처리.
   - 한계: 발송이 시도돼야만 정리됨(사전 헬스체크 없음). disabled 행 삭제 잡 없음(누적).
   - "현재 몇 개가 죽어 있나"는 운영 질문 —
     `SELECT enabled, COUNT(*) FROM notification_subscriptions GROUP BY enabled;`

**프론트 코드 변경 불필요.** 세 답 모두 A-2 설계 전제를 그대로 확인해줌.

---

## 8. 후속

- **B-1** `fix/push-subscription-status`: sync 실패를 설정 화면에 노출("연결에 문제가 있어요 · 다시 연결하기"). 백엔드 불필요.
- **A-1**: SW `pushsubscriptionchange` 핸들러. 복구 시점을 "다음 앱 실행" → "즉시"로 당기는 **지연 단축용**이며 필수 아님(A-2가 이미 치유). `webPushKey.ts`를 sw.ts와 공유 + postMessage 배선 필요.
- **B-2**: 백엔드가 `GET /v1/alarm/subscriptions`를 추가하면 `isPushSubscribed()`를 "브라우저 구독 有 AND 서버 등록됨"으로 정확화.

---

## 9. 검토 반영 사항 (구현 전 충족)

### 9.1 배포 차단 조건: endpoint 소유권

`POST /v1/alarm/subscriptions`의 upsert 여부와 endpoint 소유권 이전은 단순한 병행 확인 항목이 아니다. **A-2를 배포하기 전에 백엔드 계약과 테스트로 확인해야 하는 차단 조건**이다.

- endpoint는 전 사용자에 대해 전역 유일해야 한다.
- 인증된 사용자가 동일 endpoint를 POST하면, 이전 사용자와의 연결은 원자적으로 해제되고 새 사용자에게만 연결되어야 한다.
- 동일 endpoint POST는 중복 레코드를 만들지 않는 idempotent upsert여야 한다.

위 조건을 충족하지 않으면 세션 만료 후 같은 브라우저에서 다른 계정으로 로그인할 때 이전 계정에 푸시가 계속 전달될 수 있다. 백엔드 확인이 끝날 때까지 A-2는 배포하지 않는다.

### 9.2 기기 구독 작업 직렬화

`syncPushSubscription()`, 수동 ON(`subscribeToPush()`), 수동 OFF(`disablePushOnThisDevice()` / `unsubscribeFromPush()`)는 하나의 기기 구독 상태를 변경한다. 이 작업들은 공유 in-flight mutex(또는 동등한 작업 큐)로 **모두 직렬화**한다.

- OFF가 시작되면 `push_opt_in = 'false'`를 먼저 기록한다.
- OFF 이전에 시작한 sync의 POST가 DELETE 뒤에 완료되어 서버 구독을 되살리지 않도록, sync 결과를 무효화하거나 OFF 작업 뒤에 재검사한다.
- mutex는 성공·실패 어느 경우에도 해제한다. `syncPushSubscription()`의 실패는 배경 작업이므로 `false`로 흡수하되, 수동 ON/OFF의 오류 표시는 현재 화면 계약을 유지한다.

이는 중복 POST 방지뿐 아니라 사용자가 OFF로 바꾼 뒤 구독이 다시 등록되는 개인정보/의도 위반을 막기 위한 필수 조건이다.

### 9.3 자동 검증 보강

`webPushKey.test.ts`의 순수 키 변환 테스트 외에, DOM 의존성을 얇은 어댑터로 분리하거나 의존성을 주입해 다음 정책을 자동 검증한다.

| 조건 | 기대 결과 |
|------|-----------|
| `push_opt_in = 'false'` | `subscribe()`와 POST를 모두 호출하지 않음 |
| legacy(키 없음) + 기존 구독 있음 | POST 후 `push_opt_in = 'true'`로 마이그레이션 |
| legacy(키 없음) + 기존 구독 없음 | 구독을 새로 만들지 않고 POST도 하지 않음 |
| `push_opt_in = 'true'` + 기존 구독 없음 | 권한 요청 없이 구독 생성 후 POST |
| sync와 OFF가 경쟁 | 최종적으로 브라우저와 서버에 구독이 남지 않고 opt-in은 `'false'` |

### 9.4 상태 표기의 한계

이번 A-2 범위에서 설정 화면의 “연결됨”은 계속해서 브라우저 구독 상태만 뜻한다. sync POST 실패 여부는 아직 화면에 표시하지 않는다. B-1에서 서버 등록 실패/재시도 안내를 추가하기 전까지, 이 한계와 배경 실패 로그 정책을 코드 주석 또는 관련 문서에 남긴다.

### 9.5 오류 처리 계약 정리

`syncPushSubscription()`은 내부에서 실패를 흡수하고 `false`를 반환하는 배경 작업으로 확정한다. 따라서 `App.tsx` 호출부의 `.catch(...)`는 제거하거나, 예외를 전파하는 계약으로 바꾸는 경우에만 유지한다. 오류 로깅은 한 계층에서만 수행한다.

---

## 10. 미결: 경합 테스트 자동화 범위 (§4.6)

9.3 표의 5행("sync와 OFF 경합")만 순수 테스트로 커버되지 않는다. 나머지 4행은
`pushPolicy.ts`(§4.5)로 자동 검증된다.

| 선택지 | 내용 | 비용 / 대가 |
|--------|------|------------|
| **A. 포트 주입** | `pushSubscription.ts`를 `getSubscription`/`subscribe`/`register`/`delete` 주입 구조로 재구성. 가짜 포트로 경합을 결정적으로 재현 | 9.3을 문자 그대로 충족. A-2가 버그 수정에서 **구조 리팩터링으로 확대**됨 — 원래 "변경 파일 2개"로 시작한 PR |
| **B. mutex 단위 테스트 + 수동 f** | `mutex.ts`를 분리해 직렬화 자체는 자동 검증, 결합 결과(§5 f)는 수동 | 저렴하고 관례에 맞음. 직렬화는 증명되나 "구독이 남지 않는다"는 **결합 결과는 회귀 방어가 수동에 의존** |
| **C. 수동 f만** | 락은 구현하되 테스트 없음 | 최소. 9.3 미충족 |

**결정: B** (2026-07-17). 근거 — 경합의 위험은 "락이 없다"가 아니라 "락이 있어도 순서가
틀린다"인데, 이는 mutex 단위 테스트로 잡힌다. 남은 결합 위험은 §5 f로 방어한다.
A는 옳지만, DOM 테스트 인프라가 없는 저장소에서 버그 수정 PR 하나에 포트 주입 구조를
끼워 넣는 대가가 크다 — **B-1 또는 A-1에서 별도 리팩터링으로 분리**한다.

따라서 `src/app/lib/mutex.ts`를 별도 모듈로 분리하고 `mutex.test.ts`로 직렬화를 검증한다.
§5 f(수동 경합 검증)는 이 선택에서 **필수**다 — 결합 결과의 유일한 방어선이므로 생략 불가.

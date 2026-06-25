# ARCHITECTURE.md — a.tune 프론트엔드

> 시스템을 한눈에 보는 문서. 규칙의 근거와 검증 방법은 [`docs/architecture/`](docs/architecture/index.md) 참고.

## 시스템 개요

a.tune 프론트엔드는 **단일 React SPA**(PWA)다. 백엔드 REST API를 호출하되,
네트워크가 불안정하거나(오프라인) 로그인하지 않은(게스트) 상황에서도 동작하도록
**요청 해석 계층이 3중 폴백**을 가진다.

```
React 컴포넌트 (src/pages, src/app/components)
        │  (도메인 함수 호출)
        ▼
API 클라이언트 계층 (src/app/api/*.ts)
        │  apiRequest(path, options)
        ▼
공통 클라이언트 (src/app/api/client.ts)
   ├─ 게스트 모드?  → src/app/mocks/resolver.ts     (목 데이터)
   ├─ 오프라인?     → src/app/offline/resolver.ts   (Dexie 캐시/큐)
   └─ 온라인        → fetch → 실제 백엔드
                        ├─ 성공: GET 응답을 오프라인 캐시에 비동기 저장
                        ├─ 401: /v1/auth/reissue 단일-플라이트 재발급 후 재시도
                        └─ 5xx/네트워크 단절: 오프라인 resolver로 폴백
```

## 계층(레이어)

| 계층 | 위치 | 책임 | 금지 |
|------|------|------|------|
| **UI / 페이지** | `src/pages/`, `src/app/components/` | 렌더링, 사용자 입력, 라우팅 | 직접 `fetch`, 인증 토큰 직접 조작 |
| **API 클라이언트** | `src/app/api/*.ts` | 도메인별 엔드포인트 호출, 요청/응답 타입 | UI 상태, 비즈니스 정책 |
| **공통 클라이언트** | `src/app/api/client.ts` | 인증 헤더, 경로 정규화, 재발급, 폴백 분기 | 도메인별 로직 |
| **오프라인** | `src/app/offline/` | Dexie 스키마, 캐시, 쓰기 큐, 동기화 | UI, 도메인 정책 |
| **게스트 목** | `src/app/mocks/` | 로그인 없는 사용자용 목 응답 | 실제 네트워크 호출 |
| **유틸 / 훅** | `src/app/lib/`, `src/app/hooks/` | 순수 함수, 재사용 훅 | 특정 도메인 정책 |
| **타입** | `src/types/` | 전역/외부 타입 선언 | 런타임 로직 |

## 핵심 아키텍처 규칙 (요약)

1. UI 컴포넌트는 `src/app/api/*`의 도메인 함수만 호출한다. `fetch`/`apiRequest`를 페이지에서 직접 쓰지 않는다.
2. 인증 토큰 읽기/쓰기/삭제는 `client.ts`의 `getAccessToken`/`setAccessToken`/`clearAccessToken`만 사용한다.
3. 새 엔드포인트 경로는 `/v1/`로 작성한다(`/api/`는 자동 정규화되지만 신규는 `/v1/` 권장).
4. 인증 불필요 요청은 `auth: false`를 명시한다. auth/account 경로는 게스트·오프라인을 우회한다.
5. 오프라인에서 안전한 쓰기만 큐에 넣는다. 중복 위험이 있는 쓰기는 신중히(상세는 data-rules).
6. 횡단 관심사(인증, 재시도, 오프라인 폴백, 캐싱)는 `client.ts`에서 일관되게 처리한다.

> 위 규칙의 상세·근거·검증 방법(현재 soft/hard 여부 포함):
> [dependency-rules](docs/architecture/dependency-rules.md),
> [api-rules](docs/architecture/api-rules.md),
> [data-rules](docs/architecture/data-rules.md),
> [security-rules](docs/architecture/security-rules.md),
> [error-handling-rules](docs/architecture/error-handling-rules.md).

## 알려진 드리프트 / 주의

- 페이지가 `src/pages/`(도메인 화면)와 `src/app/pages/`(개발용 IndexPage/OverviewPage) 두 곳에 존재. ASSUMPTION: 전자가 정식, 후자는 개발 보조.
- 테스트·린트·의존성 그래프 검사 미도입 → 규칙 다수가 아직 **soft rule**(문서로만 강제). 계획: [tech-debt-tracker](docs/exec-plans/tech-debt-tracker.md).

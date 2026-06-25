# 모듈 규칙

각 디렉터리의 책임 경계. 위반은 대부분 🟡 SOFT(문서 강제)이며, 일부는 타입/빌드로 🟢 HARD 검증된다.

## `src/app/api/` — API 클라이언트

- 🟡 도메인당 한 파일(`journal.ts`, `medication.ts` …). 공통 규약은 `client.ts`.
- 🟡 요청/응답 타입을 함께 정의(외부 응답 모델과 내부 모델 구분 권장).
- 🟡 UI 상태나 화면 전환 로직을 두지 않는다.
- 🟢 `client.ts`의 `apiRequest`/토큰 헬퍼만 네트워크·토큰에 접근(타입상 외부에서 fetch를 강제하지 않으므로 SOFT, 그러나 컨벤션으로 강제).

## `src/app/offline/` — 오프라인

- 🟡 Dexie 스키마(`db.ts`), 캐시(`cache.ts`), 동기화 큐(`SyncService.ts`), resolver(`resolver.ts`)로 책임 분리.
- 🟡 UI나 도메인 정책을 두지 않는다. "요청 경로 → 캐시/큐 응답" 변환만 담당.
- ⚠️ 스키마 변경은 마이그레이션 영향. [data-rules](data-rules.md) 참고.

## `src/app/mocks/` — 게스트 목

- 🟡 비로그인 사용자용 목 응답만. 실제 네트워크 호출 금지.
- 🟡 도메인별 `*.mock.ts` + `resolver.ts`로 경로 매핑.

## `src/app/components/` — 공통 UI

- 🟡 재사용 셸/위젯(TabBar, TopBar, AppViewport 등). 특정 도메인 비즈니스 로직을 두지 않는다.
- 🟢 TabBar/TopBar는 직접 재정의하지 말고 컴포넌트 사용([Patterns](../../guidelines/Patterns.md)).

## `src/pages/<도메인>/` — 화면

- 🟡 렌더링 + 입력 + 라우팅. 데이터는 `api/*` 함수로만 가져온다.
- 🟡 `fetch`/`localStorage` 토큰 직접 접근 금지 → `api/client.ts` 헬퍼 사용.

## `src/app/lib/`, `src/app/hooks/` — 유틸/훅

- 🟡 순수 함수/재사용 훅. 특정 도메인 정책을 담지 않는다.

## `src/types/` — 타입

- 🟢 전역 타입 선언(`.d.ts`). 런타임 코드 없음.

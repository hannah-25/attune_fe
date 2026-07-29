# 유지보수성

## 강점

- 계층이 명확: `pages` / `api` / `client` / `offline` / `mocks` / `lib`.
- 횡단 관심사(인증/폴백/캐시)가 `client.ts`에 모여 있음.
- 경로 별칭(`@`, `@src`)으로 import 일관.

## 약점 / 개선

| 항목 | 상태 | 개선 |
|------|------|------|
| 페이지 위치 이원화 | `src/pages` + `src/app/pages` | 역할 확정/통합(부채 #4) |
| 자동 테스트 | 없음 | Vitest(부채 #1) |
| 의존성 방향 강제 | 문서만 | dependency-cruiser(부채 #3) |
| 린트/포맷 | 없음 | ESLint/Prettier(부채 #2) |
| 큰 페이지 파일 | 일부 존재 가능 | 컴포넌트 분리, 공통 셸 재사용 |

## 성능 메모

- 라우트 `lazy` + `Suspense`로 코드 분할.
- 오프라인 캐시는 GET 응답 비동기 저장(렌더 블로킹 없음).
- 자산 immutable 캐시 + index/SW no-cache로 갱신 보장.
- 성능 이슈 시: 번들 크기(`pnpm build` 출력), 불필요한 리렌더, 큰 목 데이터 import 확인.

## 측정 (To-Be)

- 번들 분석/Lighthouse를 주기 점검. ASSUMPTION: 현재 자동 측정 없음.

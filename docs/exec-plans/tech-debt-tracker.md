# 기술 부채 트래커

하네스 구축 시 발견한 부채와 **SOFT → HARD 승격** 계획. 우선순위 순.

| # | 항목 | 현재 | 목표 | 영향 | 우선 |
|---|------|------|------|------|------|
| 1 | 자동화 테스트 부재 | 🔴 0개 | Vitest 도입, `client.ts`/`offline/*` 순수로직 우선 커버 | 회귀 안전망 | 높음 |
| 2 | 린트/포맷 부재 | 🔴 없음 | ESLint + Prettier 설정 후 `ci.yml`에 단계 추가(처음엔 warn) | 일관성/버그 | 높음 |
| 3 | 의존성 방향 미강제 | 🟡 문서만 | `dependency-cruiser`로 [dependency-rules](../architecture/dependency-rules.md) CI 강제 | 아키텍처 드리프트 | 중 |
| 4 | 개발용 링크 화면 중복 | 🟡 `IndexPage` + `OverviewPage`(둘 다 전체 링크 목록) | 하나로 통합 | 경미(개발 편의) | 낮음 |
| 5 | 데이터 스키마 문서 자동생성 | 🟡 미생성 | `db.ts` 파싱 → `docs/generated/data-schema.md` 스크립트 | 문서 낡음 | 중 |
| 6 | docs-check CI non-blocking | 🟡 경고 | 안정화 후 blocking 승격 | 문서 품질 | 낮음 |
| 7 | 커밋된 `.env.*` | 🟢 공개 식별자(`VITE_*`)만 — 확인됨 2026-06-25 | KAKAO_APP_KEY가 JS키인지 1회 확인, secret은 CI/서버 유지 | 낮음 | 낮음 |
| 8 | 롤백 절차 미문서화 | 🟡 | [reliability](../quality/reliability.md)에 구체 절차 | 운영 | 낮음 |

## 승격 절차

1. 도구 설치(devDependency) + 설정 파일 추가.
2. 처음엔 **non-blocking**(warn)으로 도입 → 기존 위반 정리.
3. 위반 0이 되면 `ci.yml`에서 **blocking**으로 전환, 해당 규칙 문서를 🟡→🟢로 갱신.

## 기록 규칙

- 새 부채 발견 시 행 추가(현재/목표/영향/우선).
- 해소 시 행을 제거하고, 관련 규칙 문서의 상태 표시(🟡/🟢)를 갱신.

# 테스트 전략

## 현재 상태 (As-Is)

- 🔴 자동화 테스트 **없음**(테스트 러너 미설치, 테스트 파일 0개).
- 현재 회귀 방지는 `pnpm typecheck` + `pnpm build` + 수동 확인에 의존.

## 목표 상태 (To-Be)

우선순위 순서로 점진 도입(계획: [tech-debt-tracker](../exec-plans/tech-debt-tracker.md)):

1. **Vitest** 도입 — 단위 테스트 러너.
2. **순수 로직 우선 커버**: `src/app/api/client.ts`(경로 정규화/토큰/폴백 분기), `src/app/offline/*`(캐시·큐·resolver), `src/app/lib/*`.
3. **컴포넌트 테스트**: `@testing-library/react`로 핵심 흐름(로그인, 일지 입력, 오프라인 표시).
4. **계약 테스트**: `api/*` 함수가 `openapi/` 스키마와 어긋나지 않는지(가능 범위).

## 테스트 작성 지침 (도입 후 적용)

- 파일 위치: 대상 옆 `*.test.ts(x)` 또는 `__tests__/`.
- 네트워크는 모킹(`mocks/`의 목 자산 재활용 가능). 실제 백엔드 호출 금지.
- 오프라인 큐/멱등성 같은 위험 로직은 반드시 테스트로 고정.

## 지금 할 수 있는 검증

```bash
pnpm typecheck   # 타입 회귀
pnpm build       # 번들/임포트 회귀
pnpm verify      # 위 + 문서 링크
```

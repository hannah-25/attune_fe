# 문서 정리(Doc Gardening) 워크플로우

문서가 낡는 것을 막기 위한 정기/수시 작업.

## 트리거

- 코드 변경 PR마다(관련 문서 동반 갱신).
- 주기적 점검(예: 스프린트마다).
- `pnpm check-docs` 실패 시.

## 절차

1. **링크 검사**: `pnpm check-docs` — 깨진 상대 링크 0 확인.
2. **자동 생성 갱신**: `pnpm generate:all` → `docs/generated/*` 재생성, diff 커밋.
3. **코드 vs 문서 대조**: 라우트 표(AGENTS.md/CLAUDE.md), api 모듈 목록(domain-overview), 디렉터리 구조가 실제와 맞는지.
4. **불확실/낡음 표기**:
   - 불확실: `ASSUMPTION:` 또는 `TODO(owner, date, reason)`.
   - 낡음: 지우기 전 `> DEPRECATED:` + 대체 링크.
5. **SOFT→HARD 점검**: [tech-debt-tracker](../exec-plans/tech-debt-tracker.md)에서 자동화로 승격 가능한 규칙 확인.

## 규칙

- 코드가 문서보다 우선. 충돌 시 코드 기준으로 문서를 고친다.
- `docs/generated/*`는 손으로 고치지 않는다(스크립트로).
- 사람이 결정한 아키텍처 원칙은 반드시 문서로 남긴다(`architecture/`).

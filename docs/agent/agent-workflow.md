# 에이전트 작업 루프

모든 작업의 표준 절차. 유형별 변형은 같은 디렉터리의 `*-workflow.md` 참고.

## 표준 루프

1. [`AGENTS.md`](../../AGENTS.md)를 읽는다.
2. 작업과 관련된 `docs/`·`guidelines/` 문서를 찾는다.
3. 현재 코드 구조를 확인한다(관련 `pages/`, `api/`, `offline/` 등).
4. 변경 계획을 세운다. 복잡하면 [exec-plans/template](../exec-plans/template.md)로 `active/`에 계획 작성.
5. 작은 단위로 구현한다.
6. 검증: `pnpm typecheck` → `pnpm build` (또는 `pnpm verify`).
7. 실패하면 원인을 분석하고 수정한다(출력의 [NEXT] 안내 활용).
8. 관련 문서를 갱신한다(코드와 문서를 같은 PR에). `docs/generated/*`는 `pnpm generate:all`.
9. 아키텍처 규칙 위반 여부를 확인한다([dependency-rules](../architecture/dependency-rules.md)).
10. 변경 요약 / PR 설명을 작성한다([pr-review-checklist](pr-review-checklist.md)).

## 작업 유형별 워크플로우

| 유형 | 문서 |
|------|------|
| 기능 추가 | [feature-workflow](feature-workflow.md) |
| 버그 수정 | [bugfix-workflow](bugfix-workflow.md) |
| 리팩터링 | [refactor-workflow](refactor-workflow.md) |
| 문서 정리 | [doc-gardening-workflow](doc-gardening-workflow.md) |
| 테스트 추가 | [testing-strategy](../engineering/testing-strategy.md) |
| 보안 수정 | [security-rules](../architecture/security-rules.md) + [quality/security](../quality/security.md) |
| 배포 수정 | [deployment-rules](../engineering/deployment-rules.md) (⚠️ 사람 확인) |
| 성능 개선 | [quality/maintainability](../quality/maintainability.md) |

## 작업 시작 템플릿

새 작업 메모는 [task-template](task-template.md)를 복사해서 쓴다.

## 멈춤 기준 (사람에게 물어볼 때)

[AGENTS.md의 "확실하지 않을 때" 절](../../AGENTS.md) 참고. 데이터 스키마/마이그레이션, 인증·인가,
오프라인 큐, 되돌리기 어려운 흐름, 외부 노출 행위는 진행 전 확인한다.

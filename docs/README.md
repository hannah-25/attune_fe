# docs/ — a.tune 지식 저장소

[`AGENTS.md`](../AGENTS.md)가 가리키는 상세 지식이 여기 있다.
각 문서는 **현재 상태(As-Is)** 와 **목표 상태(To-Be)** 를 구분해 적는다.
코드와 문서가 다르면 **코드가 우선**이며, 발견 즉시 문서를 갱신한다.

## 지도

| 영역 | 위치 | 내용 |
|------|------|------|
| 제품 | [`product/`](product/index.md) | 목적, 사용자, 도메인 개요 |
| 아키텍처 | [`architecture/`](architecture/index.md) | 계층·의존성·데이터·API·보안·에러 규칙 |
| 엔지니어링 | [`engineering/coding-conventions.md`](engineering/coding-conventions.md) | 코딩 컨벤션, 테스트 전략, CI/CD, 배포, 관측 |
| 에이전트 | [`agent/agent-workflow.md`](agent/agent-workflow.md) | 작업 루프 + 유형별 워크플로우 + 리뷰 체크리스트 |
| 실행 계획 | [`exec-plans/`](exec-plans/template.md) | 복잡한 작업 계획(active/completed) + 기술부채 |
| 자동 생성 | [`generated/`](generated/project-map.md) | project-map, api-index 등 (수동 수정 금지) |
| 품질 | [`quality/quality-score.md`](quality/quality-score.md) | 신뢰성·보안·유지보수성 |

## 문서 규칙

- 코드 변경 시 관련 문서를 같은 PR에서 갱신한다.
- 불확실한 내용은 `ASSUMPTION:` 또는 `TODO(owner, date, reason)`로 표기한다.
- 낡은 문서는 지우기 전 `> DEPRECATED:` 표기 + 대체 문서 링크를 남긴다.
- `generated/`는 사람이 수정하지 않는다. `pnpm generate:all`로 재생성.
- 깨진 링크는 `pnpm check-docs`로 검사한다.

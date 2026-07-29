# 아키텍처 규칙

상위 개요는 [`ARCHITECTURE.md`](../../ARCHITECTURE.md). 여기서는 규칙별 상세를 다룬다.

각 규칙에는 **상태 표시**가 붙는다:

- 🟢 **HARD** — 도구로 검증됨(타입체크/빌드/CI) 또는 위반 시 즉시 깨짐
- 🟡 **SOFT** — 문서로만 강제. 위반해도 빌드는 통과(점진 도입 예정)

| 문서 | 내용 |
|------|------|
| [system-overview](system-overview.md) | 런타임 흐름, 폴백 체인 |
| [module-rules](module-rules.md) | 모듈/디렉터리 책임 경계 |
| [dependency-rules](dependency-rules.md) | 계층 간 의존 방향 |
| [data-rules](data-rules.md) | 오프라인 캐시/큐, 게스트 목, 스키마 |
| [api-rules](api-rules.md) | API 클라이언트 호출 규약 |
| [security-rules](security-rules.md) | 인증/인가/secret/입력 |
| [error-handling-rules](error-handling-rules.md) | 예외/에러 표시/폴백 |

> SOFT 규칙을 HARD로 올리는 계획: [tech-debt-tracker](../exec-plans/tech-debt-tracker.md).

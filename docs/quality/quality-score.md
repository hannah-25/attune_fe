# 품질 스코어 (스냅샷)

> 수동 평가. 하네스 구축 시점(2026-06-25) 기준. 점진 개선 대상은 [tech-debt-tracker](../exec-plans/tech-debt-tracker.md).

| 축 | 현재 | 근거 | 목표 |
|----|------|------|------|
| 신뢰성 | ⚠️ 보통 | 자동 테스트 0. 타입체크/빌드만 | 핵심 로직 테스트로 회귀 방지 |
| 보안 | ⚠️ 보통 | 토큰/폴백 구조는 정돈됨, 자동 보안검사 없음 | 의존성 취약점 스캔 + 체크리스트 정착 |
| 유지보수성 | 🙂 양호 | 계층 구조 명확, 문서화 보강됨 | 의존성 방향 자동 강제 |
| 문서 최신성 | 🙂 양호(신규) | 본 하네스로 정비 | check-docs + 생성 스크립트 정착 |
| CI 게이트 | ⚠️ 부분 | typecheck+build PR 게이트 추가 | lint/test 추가 |

세부:
- [reliability](reliability.md)
- [security](security.md)
- [maintainability](maintainability.md)

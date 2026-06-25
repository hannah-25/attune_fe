# 리팩터링 워크플로우

1. **동작 보존이 전제**: 리팩터는 외부 동작을 바꾸지 않는다. 동작 변경이 필요하면 별도 작업으로 분리.
2. **범위 고정**: 무엇을 바꾸고(In) 무엇을 안 바꾸는지(Out) 먼저 적는다. 큰 리팩터는 exec-plan.
3. **계층 정리 방향**: [dependency-rules](../architecture/dependency-rules.md)에 맞춘다(역방향/순환 제거, fetch 직접호출 → api 함수).
4. **작은 커밋**: 의미 단위로 쪼갠다([GitWorkflow](../../guidelines/GitWorkflow.md)).
5. **검증**: 단계마다 `pnpm typecheck`, 마무리에 `pnpm verify`. 테스트가 있으면 적극 활용.
6. **드리프트 해소 기록**: 알려진 드리프트(예: `src/pages` vs `src/app/pages`)를 정리했다면 [ARCHITECTURE.md](../../ARCHITECTURE.md)·[tech-debt-tracker](../exec-plans/tech-debt-tracker.md) 갱신.

## 주의

- 자동 테스트가 없으므로 리팩터 회귀 위험이 크다 → 범위를 작게, 자주 검증.
- `client.ts`/`offline/*` 리팩터는 전 도메인 영향. 사람 리뷰 권장.

# PR 리뷰 체크리스트

작성자와 리뷰어(사람/에이전트) 공용. 해당 없는 항목은 `N/A`.

## 기능 / 정확성
- [ ] 요구사항을 충족하는가
- [ ] 기존 동작을 보존하는가(의도치 않은 변경 없음)
- [ ] 빈 상태/에러 상태/로딩 상태를 처리하는가

## 아키텍처 / 도메인
- [ ] 도메인 규칙 위반 없음([domain-overview](../product/domain-overview.md))
- [ ] 계층 위반 없음(페이지에서 fetch/토큰 직접접근 금지 — [dependency-rules](../architecture/dependency-rules.md))
- [ ] 새 API 호출이 `client.ts` 규약 준수([api-rules](../architecture/api-rules.md))
- [ ] 오프라인/게스트 경로 영향 검토([data-rules](../architecture/data-rules.md))

## 데이터 / 호환성
- [ ] API 응답/요청 호환성(기존 호출처 안 깨짐)
- [ ] Dexie 스키마 변경 시 버전업/마이그레이션
- [ ] 쓰기 큐 멱등성/중복 위험 검토

## 품질 게이트
- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과
- [ ] (있으면) 테스트 추가/통과
- [ ] `pnpm check-docs` 통과

## 보안
- [ ] secret/token/PII 노출 없음([security-rules](../architecture/security-rules.md))
- [ ] 인증/인가 영향 검토, 비인증 요청 `auth:false` 명시
- [ ] XSS/외부링크 rel 등 입력·출력 안전

## 운영 / 문서
- [ ] 배포/캐시/SW 영향 검토([deployment-rules](../engineering/deployment-rules.md))
- [ ] 관련 문서 갱신, `docs/generated/*` 재생성
- [ ] 롤백 가능성 확인

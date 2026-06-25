# 신뢰성 & 장애 대응

## 현재 회귀 방지

- `pnpm typecheck`, `pnpm build`, 수동 확인. (테스트 도입 전)
- 위험 영역: 인증 재발급 루프, 오프라인 폴백, 쓰기 큐 동기화.

## 장애 시나리오 → 대응

| 증상 | 1차 확인 | 대응 |
|------|----------|------|
| 배포 후 화면 안 바뀜 | CloudFront 무효화 여부, `index.html` no-cache | 무효화 재실행 / 직전 빌드 재배포 |
| 로그인 무한 루프 | `/v1/auth/reissue` 응답, `access_token` | 토큰 클리어 후 재로그인, reissue 응답 형식 점검 |
| 오프라인인데 흰 화면 | SW 등록, IndexedDB 캐시 유무 | 자산 프리로드/SW 캐시 글롭 점검(`vite.config.ts`) |
| 쓰기 유실/중복 | `SyncService` 큐, 5xx 폴백 정책 | [data-rules](../architecture/data-rules.md) 큐 규칙 확인, 사람 확인 |
| 빌드 깨짐(CI) | Actions 로그, `pnpm build` 로컬 재현 | import/자산/타입 수정 |

## 롤백

- 정적 배포(S3+CloudFront): 직전 정상 커밋에서 재빌드·재배포가 기본 경로.
- TODO(owner, 2026-07-31, 구체 롤백 명령/버전 보존 정책 확정): 상세 절차 보강 필요.

## 모니터링 (To-Be)

- ASSUMPTION: 현재 클라이언트 에러 수집(예: Sentry) 미도입. 도입 시 본 문서·observability에 추가.

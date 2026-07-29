# CI/CD 규칙

## 현재 워크플로우 (`.github/workflows/`)

| 파일 | 트리거 | 동작 |
|------|--------|------|
| `deploy-dev.yml` | `push: develop` | `pnpm build --mode staging` → S3(dev) 동기화 → CloudFront 무효화 |
| `deploy-prod.yml` | (프로덕션) | 프로덕션 빌드/배포 |
| `ci.yml` | `pull_request` → develop | install + typecheck + build (품질 게이트). docs-check는 non-blocking |

> `ci.yml`은 본 하네스에서 추가했다. **배포 워크플로우는 변경하지 않았다.**

## 게이트 정책

- 🟢 **PR 머지 전**: `ci.yml`의 typecheck + build 통과 필수(권장: 브랜치 보호 규칙으로 required 설정).
- 🟡 docs-check(깨진 링크)는 현재 non-blocking(경고). 안정화 후 blocking 승격.
- 🟡 lint/test는 미도입 → CI 미포함. 도입 시 `ci.yml`에 단계 추가([tech-debt-tracker](../exec-plans/tech-debt-tracker.md)).

## Secrets

- 빌드/배포 secret(AWS 자격증명, VAPID 키 등)은 GitHub Actions Secrets에서만 관리.
- 🔴 워크플로우 파일·로그에 secret 평문 출력 금지.

## 로컬에서 CI 재현

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm check-docs
# = pnpm verify
```

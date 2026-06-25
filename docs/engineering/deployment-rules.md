# 배포 규칙

## 환경

| 환경 | 트리거 | 빌드 모드 | 대상 |
|------|--------|-----------|------|
| dev/staging | `push: develop` | `--mode staging` | S3(dev 버킷) + CloudFront(dev) |
| production | `deploy-prod.yml` | (프로덕션 모드) | S3(prod) + CloudFront(prod) |

환경 변수는 `.env.development` / `.env.staging` / `.env.production`(커밋됨, 공개 식별자만) + CI Secrets로 주입.

## 캐시 정책 (deploy-dev.yml 기준)

- 정적 자산(해시 파일): `cache-control: public,max-age=31536000,immutable`
- `index.html`, `sw.js`, `workbox-*.js`, `manifest-v2.webmanifest`: `no-cache,no-store,must-revalidate`
- 배포 후 CloudFront `/*` 무효화.

## 규칙

- 🔴 배포 워크플로우는 **사람 확인 없이 변경하지 않는다**(운영 영향).
- 🟡 SW/매니페스트 파일명·캐시 헤더 변경은 PWA 업데이트 흐름에 영향 → 신중히.
- 🟡 새 환경 변수 추가 시 `.env.example` + 본 문서 + 필요 시 CI secret을 함께 갱신.

## 롤백

- ASSUMPTION: S3/CloudFront 정적 배포이므로 직전 빌드 산출물 재배포 또는 이전 커밋에서 재빌드로 롤백.
- 상세 절차 미문서화 → [reliability](../quality/reliability.md)에 장애 대응으로 보강 예정.

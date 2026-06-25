# 시스템 개요 (런타임 흐름)

## 요청 폴백 체인

모든 데이터 요청은 `src/app/api/client.ts`의 `apiRequest()`를 통과한다.

```
apiRequest(path, options)
 1. 경로 정규화: /api/* → /v1/*
 2. 게스트 모드이고 auth/account 경로가 아니면 → mocks/resolver
 3. 오프라인(또는 직전 네트워크 실패 가정 창)이고 폴백 허용이면 → offline/resolver
 4. 실제 fetch 시도
    - 네트워크 throw → 오프라인 가정 마킹 + offline/resolver 폴백
    - 응답 헤더 X-Attune-Offline-Fallback=1 → SW가 단절 감지, offline/resolver 폴백
    - GET + 502/503/504 → offline/resolver 폴백 (쓰기는 중복 위험으로 폴백 안 함)
    - 401 + auth → /v1/auth/reissue 단일-플라이트 재발급 → 성공 시 1회 재시도, 실패 시 /login 리다이렉트
 5. 성공한 GET 응답을 (로그인 상태에서) 오프라인 캐시에 비동기 저장
```

## 인증 토큰 수명

- 저장소: `localStorage`의 `access_token`
- 모든 인증 요청에 `Authorization: Bearer <token>` + `X-Client-Type: web` + `credentials: include`
- 401 → reissue 단일-플라이트로 중복 재발급 방지
- 세션 만료 리다이렉트 시 캐시는 비우되 **오프라인 쓰기 큐는 보존**(같은 사용자 재로그인 가정)

## PWA / 서비스 워커

- `vite-plugin-pwa` `injectManifest` 전략, 소스 `src/sw.ts`
- SW가 fetch 실패를 감지해 `X-Attune-Offline-Fallback` 헤더로 앱에 신호
- 자산 프리로드: `src/app/offline/preloadAssets.ts`

## 빌드/배포 흐름

- `develop` push → `deploy-dev.yml` → `pnpm build --mode staging` → S3 + CloudFront 무효화
- 프로덕션: `deploy-prod.yml`
- 상세: [engineering/deployment-rules](../engineering/deployment-rules.md)

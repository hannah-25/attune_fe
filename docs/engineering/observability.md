# 관측 가능성 & 디버깅

프론트엔드 SPA이므로 관측은 주로 **브라우저 + 빌드 로그** 기반이다.

## 로컬 실행 로그

```bash
pnpm dev      # Vite 개발 서버 로그(HMR, 컴파일 에러)
```

- 앱 로그: 브라우저 DevTools Console. 디버그 로그는 `import.meta.env.DEV` 가드(운영 비노출).

## 자주 쓰는 디버깅

| 증상 | 확인 위치 |
|------|-----------|
| 타입 깨짐 | `pnpm typecheck` 출력 |
| 빌드 실패 | `pnpm build` 출력(보통 import 경로/누락 자산) |
| API 실패 | DevTools Network 탭 + `ApiError.status`/`backendMessage` |
| 인증 실패(401 루프) | `localStorage.access_token`, `/v1/auth/reissue` 응답, 콘솔의 reissue 로그 |
| 오프라인 폴백이 안 됨 | `navigator.onLine`, SW 등록 상태, 응답 헤더 `X-Attune-Offline-Fallback` |
| 캐시/큐 이상 | DevTools → Application → IndexedDB(Dexie), `SyncService` 큐 |
| SW 갱신 안 됨 | Application → Service Workers, `sw.js` 캐시 헤더(no-cache) |
| 게스트 모드 이상 | `src/app/guest.ts` `isGuestMode()`, `mocks/resolver.ts` 매핑 |

## health / 연결 확인

- 백엔드 연결: `VITE_API_BASE_URL` 값 확인 → Network 탭에서 실제 요청 URL 확인.
- 외부 서비스: 구글 캘린더/소셜 로그인은 `VITE_GOOGLE_CLIENT_ID` 등 식별자 + 콜백 URL 설정 확인.

## 배포 디버깅

- GitHub Actions 워크플로우 로그(빌드/배포 단계별).
- 배포됐는데 반영 안 됨: CloudFront 무효화 여부 + `index.html` no-cache 헤더 확인.

> 장애 대응 절차: [quality/reliability](../quality/reliability.md).

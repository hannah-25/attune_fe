# 보안 규칙 (아키텍처)

운영/체크리스트 관점은 [quality/security](../quality/security.md) 참고. 여기서는 코드 규칙.

## 인증 / 인가

- 🟢 토큰 접근은 `client.ts`의 `getAccessToken`/`setAccessToken`/`clearAccessToken`만 사용. 페이지에서 `localStorage` 직접 접근 금지.
- 🟢 인증 요청은 `auth: true`(기본), 비인증은 `auth: false` 명시.
- 🟡 인가(권한별 화면)는 라우팅/가드에서 처리. admin 경로는 일반 사용자에게 노출하지 않는다. ASSUMPTION: 서버가 최종 인가의 source of truth.

## Secret / 환경 변수

- 🔴 secret/token/password/AWS 자격증명/VAPID private key를 코드·문서·커밋에 넣지 않는다.
- 🟢 `VITE_*` 변수는 빌드 시 **클라이언트 번들에 노출**된다 → 공개 가능한 식별자만 둔다. 예시: [`.env.example`](../../.env.example).
- 🟡 진짜 secret은 GitHub Actions Secrets / 서버 환경에서만 관리(예: `VAPID_PUBLIC_KEY`는 CI secret로 주입).

## 클라이언트 입력 / 출력

- 🟡 사용자 입력을 `dangerouslySetInnerHTML`에 직접 넣지 않는다(XSS). 불가피하면 sanitize.
- 🟢 요청은 `credentials: include`로 쿠키 동반 → CSRF는 서버 정책에 의존. ASSUMPTION: 서버가 SameSite/CSRF 토큰 처리.
- 🟡 외부 링크 `target="_blank"`에는 `rel="noopener noreferrer"`.

## 로그

- 🟡 콘솔/로그에 토큰·개인정보를 출력하지 않는다. 디버그 로그는 `import.meta.env.DEV` 가드.

## 계정 상태

- 🟡 탈퇴/비활성/차단 계정 처리는 서버 응답(401/403/상태 코드)에 따른다. 클라이언트는 적절한 화면으로 유도.

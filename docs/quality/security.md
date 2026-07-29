# 보안 (품질/운영 관점)

코드 규칙은 [architecture/security-rules](../architecture/security-rules.md). 여기서는 운영 체크리스트와 위험 목록.

## 인증/세션 요약

- JWT access token을 `localStorage`(`access_token`)에 저장, `Authorization: Bearer`로 전송, `credentials: include`.
- 401 → `/v1/auth/reissue` 단일-플라이트 재발급. 실패 시 `/login`.
- ASSUMPTION: refresh는 서버가 쿠키로 관리(클라이언트 코드상 reissue가 토큰만 갱신).

## Secret / 환경 변수

- `VITE_*`는 번들에 노출 → 공개 식별자만. 진짜 secret은 CI Secrets/서버.
- 확인됨(2026-06-25): 커밋된 `.env.development/.staging/.production`은 모두 `VITE_*` 공개 식별자(API URL, OAuth client ID, Kakao JS key, VAPID **public** key, 플래그)만 포함. 서버 secret/AWS 키/private key 없음. `.env.development.local`은 gitignore로 미커밋.
- 신규 `VITE_*` 추가 시 "브라우저 노출 가능 값인가?"를 반드시 점검. private key/secret은 절대 `VITE_`로 두지 않는다.

## 주요 위험 점검

| 위험 | 현재 대응 | 비고 |
|------|-----------|------|
| XSS | `dangerouslySetInnerHTML` 지양 | 사용 시 sanitize 필수 |
| CSRF | 쿠키 + 서버 정책 | ASSUMPTION: 서버 SameSite/토큰 |
| 토큰 탈취 | localStorage 저장(노출면 존재) | XSS 차단이 1차 방어 |
| 의존성 취약점 | 자동 스캔 없음 | To-Be: `pnpm audit`/Dependabot |
| 개인정보 로그 | DEV 가드 | 운영 로그에 PII/토큰 금지 |
| 파일 업로드 | ASSUMPTION: 서버 검증 | 클라 타입/크기 1차 검증 권장 |

## CI 연계 (To-Be)

- `pnpm audit --prod` 또는 GitHub Dependabot/CodeQL 도입을 `ci.yml`에 추가([tech-debt-tracker](../exec-plans/tech-debt-tracker.md)).

## API별 인증 필요 여부

- 기본: 모든 요청 `auth: true`. 비인증 요청만 `auth: false` 명시.
- `/v1/auth/*`, `/v1/account/*`: 게스트/오프라인 우회, 실제 백엔드 직결.
- 도메인별 상세: [api-index](../generated/api-index.md) + [guidelines/api-guide](../../guidelines/api-guide).

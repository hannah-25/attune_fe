# API 클라이언트 규약

근거 코드: `src/app/api/client.ts`. 자동 인덱스: [api-index](../generated/api-index.md).

## 호출 규칙

1. 🟡 페이지/컴포넌트는 `api/<도메인>.ts`의 함수를 호출한다. `apiRequest`/`fetch` 직접 호출 금지.
2. 🟡 새 엔드포인트 경로는 `/v1/`로 작성한다. (`/api/`는 `/v1/`로 자동 정규화되나 신규는 `/v1/` 권장.)
3. 🟢 모든 요청에 `X-Client-Type: web` 헤더가 자동 추가된다(직접 추가 불필요).
4. 🟢 `auth: true`(기본값)면 `Authorization: Bearer <token>` 자동 추가. **인증 불필요 요청은 `auth: false` 명시.**
5. 🟡 401은 `client.ts`가 reissue로 처리한다. 도메인 코드에서 401 재시도 로직을 따로 만들지 않는다.
6. 🟡 body는 객체로 넘기면 JSON 직렬화된다. `FormData`는 그대로 전송(Content-Type 자동 생략).
7. 🟡 오프라인 폴백을 끄려면 `offlineFallback: false` 명시(예: 실시간성이 필수인 호출).

## 응답 / 에러

- 🟢 실패 응답은 `ApiError(status, payload, backendMessage)`로 throw 된다. 도메인/UI는 이를 잡아 처리.
- 🟡 204는 `undefined` 반환. JSON이 아니면 텍스트로 파싱.
- 에러 표시 규칙: [error-handling-rules](error-handling-rules.md).

## 타입

- 🟡 요청/응답 타입을 도메인 파일에 정의한다. 외부 응답 형태와 내부 사용 모델이 다르면 매핑 함수를 둔다.

## 인증 우회 경로

- 🟢 `/v1/auth/*`, `/v1/account/*`는 게스트 목·오프라인 폴백을 우회하고 항상 실제 백엔드로 간다.

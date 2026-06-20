# 관리자 회원 관리 API 계약

프론트 경로: `/admin`

목 API는 `VITE_ADMIN_USE_MOCK=true`일 때만 사용한다. staging과 production에서는
반드시 `false`로 설정한다.

## 공통 규칙

- 경로: `/v1/admin/**`
- 인증: `Authorization: Bearer {accessToken}`
- 서버에서 관리자 권한을 검증한다.
- 날짜는 UTC ISO 8601 문자열로 반환한다.
- 회원 ID는 UUID 문자열이다.
- 상태: `PENDING | ACTIVE | SUSPENDED | WITHDRAWAL`
- 소셜 계정이 아닌 경우 `provider`는 `null`이다.

공통 오류 응답:

```json
{
  "status": 409,
  "error": "Conflict",
  "message": "탈퇴 예정 상태의 회원만 처리할 수 있습니다.",
  "timestamp": "2026-06-19T05:42:00Z"
}
```

프론트는 `message`를 사용자에게 표시한다.

## 회원 목록

`GET /v1/admin/members?query={query}&status={status}&page=0&size=20`

Query:

- `query`: 선택. 서버에서 앞뒤 공백 제거. 빈 문자열은 필터 없음.
- `status`: 선택. `PENDING | ACTIVE | SUSPENDED | WITHDRAWAL`
- `page`: 필수. 0 이상.
- `size`: 필수. 1 이상 100 이하.

검색 규칙:

- 이메일: 부분 일치
- 닉네임: 부분 일치
- UUID 형식 검색어: 전체 UUID 정확히 일치
- 기본 정렬: 최근 가입순

응답:

```json
{
  "members": [
    {
      "id": "7fe0cc21-612c-4d81-977d-7f899ca390d5",
      "email": "user@example.com",
      "nickname": "사용자",
      "status": "WITHDRAWAL",
      "provider": "GOOGLE",
      "createdAt": "2026-03-02T04:21:00Z",
      "lastLoginAt": "2026-06-14T13:05:00Z",
      "withdrawalRequestedAt": "2026-06-17T02:30:00Z",
      "withdrawalScheduledAt": "2026-07-17T02:30:00Z"
    }
  ],
  "summary": {
    "total": 100,
    "pending": 4,
    "active": 89,
    "suspended": 2,
    "withdrawal": 5
  },
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1
}
```

`summary`는 검색과 상태 필터의 영향을 받지 않는다. `total`은 네 상태의 합이다.
`withdrawalScheduledAt`은 서버가 보존 기간 정책을 적용해 계산하며 프론트에서 직접
계산하지 않는다. 페이지 범위가 잘못되면 `400 Bad Request`를 반환한다.

## 회원 상태 변경

`POST /v1/admin/members/{memberUuid}/status`

```json
{
  "status": "SUSPENDED",
  "reason": "운영 정책 위반 확인"
}
```

성공: `200 OK`와 상태가 변경된 회원 객체.

- `status`: `ACTIVE | SUSPENDED`
- 처리 사유는 trim 후 5자 이상이어야 한다.
- 회원 없음: `404`
- 다른 요청으로 상태가 변경됨: `409`
- 관리자 본인 계정에 대한 상태 변경은 서버에서 거부한다.
- 성공한 변경은 `STATUS_CHANGED` 관리자 작업 이력으로 기록한다.

## 탈퇴 요청 취소

`POST /v1/admin/members/{memberUuid}/withdrawal/cancel`

```json
{
  "reason": "회원 본인 복구 요청 확인"
}
```

성공: `200 OK`와 상태가 `ACTIVE`로 변경된 회원 객체.

- `WITHDRAWAL` 상태에서만 허용한다.
- 처리 사유는 trim 후 5자 이상이어야 한다.
- 회원 없음: `404`
- 다른 요청으로 상태가 변경됨: `409`

## 즉시 탈퇴 완료

`POST /v1/admin/members/{memberUuid}/withdrawal/complete`

```json
{
  "reason": "개인정보 즉시 삭제 요청 접수"
}
```

성공: `204 No Content`

- `WITHDRAWAL` 상태에서만 허용한다.
- 관련 회원 데이터를 하나의 트랜잭션으로 영구 삭제한다.
- 처리 사유는 trim 후 5자 이상이어야 한다.
- 다른 요청으로 상태가 변경됨: `409`
- 이미 삭제됐거나 회원 없음: `404`
- 프론트는 즉시 삭제 요청의 `404`를 이미 최종 상태에 도달한 것으로 처리한다.
- 관리자 본인 계정에 대한 위험 작업은 서버에서 거부한다.

## 최근 관리자 작업 이력

`GET /v1/admin/audit-logs?limit=10`

```json
[
  {
    "id": "audit-3",
    "action": "WITHDRAWAL_CANCELLED",
    "targetReference": "member:7fe0cc21-612c-4d81-977d-7f899ca390d5",
    "targetLabel": "사용자",
    "administrator": "admin@atune.app",
    "reason": "회원 본인 복구 요청 확인",
    "createdAt": "2026-06-18T05:42:00Z"
  },
  {
    "id": "audit-2",
    "action": "MEMBER_DELETED",
    "targetReference": "hmac-sha256:8f1c6d53…2da4",
    "targetLabel": null,
    "administrator": "admin@atune.app",
    "reason": "개인정보 즉시 삭제 요청 접수",
    "createdAt": "2026-06-17T08:11:00Z"
  }
]
```

작업 종류:

- `WITHDRAWAL_CANCELLED`
- `MEMBER_DELETED`
- `STATUS_CHANGED`

영구 삭제 로그에는 이메일과 닉네임을 저장하지 않는다. `targetReference`는 서버
비밀키 기반 HMAC-SHA256으로 생성한다.

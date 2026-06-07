# 알림 API 연동 가이드

## 사용자 알림 설정

`GET /v1/users/settings`

`PATCH /v1/users/settings`

```json
{
  "medicationNotification": true,
  "reportNotification": true,
  "marketingNotification": false,
  "communityNotification": true,
  "todoNotification": true,
  "takeMedicationOnHoliday": false,
  "theme": "SYSTEM"
}
```

현재 v1 발송 정책은 복약 시간 정각, Todo 마감 정각, 일정별 `alarmedAt`,
월요일 오전 9시 리포트, 새 댓글, 어드민 수동 마케팅 발송입니다.

## 복약별 알림 설정

`GET /v1/user-medications` 응답과 `PATCH /v1/user-medications/{id}` 요청에서
`alarmActive`를 사용합니다.

```json
{
  "alarmActive": false
}
```

## Web Push 구독

`POST /v1/alarm/subscriptions`

```json
{
  "platform": "WEB",
  "provider": "WEB_PUSH",
  "endpoint": "https://push.example.com/...",
  "p256dh": "browser-public-key",
  "auth": "browser-auth-secret"
}
```

`DELETE /v1/alarm/subscriptions?endpointOrToken={value}`

프론트는 알림 설정 화면의 `이 기기에서 알림 받기` 토글에서 구독을 등록하거나
해제합니다. 로그아웃할 때도 현재 브라우저 구독을 해제합니다.

## 배포 설정

프론트 빌드에는 `VITE_VAPID_PUBLIC_KEY`가 필요합니다.

백엔드 실행에는 다음 값이 필요합니다.

- `PUSH_PROVIDER=web-push` (`prod` 프로필은 기본적으로 Web Push 사용)
- `VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY`
- `VAPID_SUBJECT` (선택, 기본값 `mailto:support@attune-me.com`)

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

`takeMedicationOnHoliday`는 향후 공휴일 캘린더 연동을 위한 설정값이며, 현재 v1 복약 알림 발송에는 적용되지 않습니다.

일정 알림은 일정당 최대 3개까지 설정할 수 있으며, 발송 시점부터 1시간이 지나면 만료 처리됩니다.

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

`GET /v1/alarm/subscriptions?endpointOrToken={value}`

```json
{ "enabled": true }
```

조회 대상이 없거나 비활성화된 경우에도 404가 아니라 `200 { "enabled": false }`로 응답한다
(존재 여부와 무관하게 204를 반환하는 `DELETE`와 같은 패턴).

프론트는 알림 설정 화면의 `이 기기에서 알림 받기` 토글에서 구독을 등록하거나
해제합니다. 로그아웃할 때도 현재 브라우저 구독을 해제합니다. 화면의 "연결됨" 표시는
브라우저 구독 존재 여부와 이 `GET` 조회 결과를 함께 확인해 판단합니다.

## 배포 설정

프론트 빌드에는 `VITE_VAPID_PUBLIC_KEY`가 필요합니다.

백엔드 실행에는 다음 값이 필요합니다.

- `PUSH_PROVIDER=web-push` (`prod` 프로필은 기본적으로 Web Push 사용)
- `VAPID_PUBLIC_KEY`
- `VAPID_PRIVATE_KEY`
- `VAPID_SUBJECT` (선택, 기본값 `mailto:support@attune-me.com`)

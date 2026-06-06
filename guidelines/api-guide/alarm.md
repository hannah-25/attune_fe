  프론트 연동 변경 사항

  1. UserSetting — 알림 설정 필드 추가

  GET /v1/settings 응답에 신규 필드 2개 추가

  {
    "medicationNotification": true,
    "reportNotification": true,
    "marketingNotification": false,
    "communityNotification": true,   // ✨ 신규                                                                                                                          
    "todoNotification": true,         // ✨ 신규                                                                                                                         
    "takeMedicationOnHoliday": false,
    "theme": "SYSTEM"                                                                                                                                                   
  }

  PATCH /v1/settings 요청에도 동일하게 추가됨 (선택 필드)

  {
    "communityNotification": false,
    "todoNotification": false                                                                                                                                           
  }

  ---
  2. UserMedication — 복약별 알람 활성화 필드 추가

  GET /v1/user-medications 응답에 alarmActive 추가

  {
    "userMedicationId": 1,
    "isActive": true,
    "alarmActive": true,   // ✨ 신규 — 개별 복약 알람 on/off                                                                                                            
    ...
  }

  PATCH /v1/user-medications/{id} 요청에 alarmActive 추가 (선택 필드)

  {
    "alarmActive": false                                                                                                                                                
  }

  ---
  3. 푸시 알람 구독 API — 신규

  브라우저/앱에서 푸시 알람을 받으려면 구독 등록이 필요합니다.

  POST /v1/alarm/subscriptions — 구독 등록/갱신

  // Web Push 기준                                                                                                                                                      
  {
    "platform": "WEB",
    "provider": "WEB_PUSH",
    "endpoint": "https://fcm.googleapis.com/fcm/send/...",
    "p256dh": "BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQtUbVlTiNHVHSBd3...",
    "auth": "tBHItJI5svbpez7KI4CCXg"                                                                                                                                    
  }

  // FCM/APNs 토큰 기준 (향후)                                                                                                                                          
  {
    "platform": "ANDROID",
    "provider": "FCM",
    "token": "d8u3k1..."                                                                                                                                                
  }

  Response 201
  {
    "id": 1,
    "platform": "WEB",
    "provider": "WEB_PUSH",
    "enabled": true                                                                                                                                                     
  }

  DELETE /v1/alarm/subscriptions?endpointOrToken={값} — 구독 해제

  로그아웃 또는 알람 설정 해제 시 호출.

  Response 204

  ---
  4. 알람 종류별 동작 정리

  ┌─────────────┬──────────────────────────────────────┬─────────────────────────────────────────────────────────────────┐
  │  알람 종류  │                트리거                │                           사용자 설정                           │
  ├─────────────┼──────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤
  │ 복약 알람   │ UserMedicationSchedule.doseTime 정각 │ UserSetting.medicationNotification + UserMedication.alarmActive │
  ├─────────────┼──────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤
  │ 일정 알람   │ Schedule.alarmedAt 에 설정된 시각    │ Schedule.alarmEnabled (기존과 동일)                             │
  ├─────────────┼──────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤
  │ Todo 알람   │ Todo.dueAt 정각 (종일 Todo 제외)     │ UserSetting.todoNotification                                    │
  ├─────────────┼──────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤
  │ 리포트 알람 │ 매주 월요일 오전 9시                 │ UserSetting.reportNotification                                  │
  ├─────────────┼──────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤
  │ 댓글 알람   │ 내 게시글에 댓글 달릴 때             │ UserSetting.communityNotification                               │
  ├─────────────┼──────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤
  │ 마케팅 알람 │ 어드민이 수동 발송                   │ UserSetting.marketingNotification                               │
  └─────────────┴──────────────────────────────────────┴─────────────────────────────────────────────────────────────────┘

  ▎ 현재 v1 상태: 실제 푸시 발송은 stub (서버 로그에만 출력). 구독 등록 API와 설정은 이미 동작함.

  ---
  5. 프론트 연동 순서 추천

  1. 알림 설정 화면 — communityNotification, todoNotification 토글 UI 추가
  2. 복약 상세/목록 — alarmActive 토글 UI 추가
  3. 서비스 워커 + Web Push 구독 — 브라우저에서 Notification.requestPermission() → PushManager.subscribe() → POST /v1/alarm/subscriptions 호출
  4. 로그아웃 시 — DELETE /v1/alarm/subscriptions 호출
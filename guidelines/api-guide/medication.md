엔티티 구조

  Medication (약물 마스터)
    └─< MedicationDosage (용량 선택지)
          └─< UserMedication (사용자 복약 정보)
                ├── User
                ├── Consultation (optional)
                └─< UserMedicationSchedule (복용 시간대)
                      └─< UserMedicationLog (실제 복약 기록)

  Medication

  ┌────────────────────┬────────┬─────────────────────┐
  │        필드        │  타입  │        설명         │
  ├────────────────────┼────────┼─────────────────────┤
  │ id                 │ Long   │ PK                  │
  ├────────────────────┼────────┼─────────────────────┤
  │ name               │ String │ 약물명 (UK)         │
  ├────────────────────┼────────┼─────────────────────┤
  │ genericName        │ String │ 일반명(성분명)      │
  ├────────────────────┼────────┼─────────────────────┤
  │ effect             │ TEXT   │ 효과                │
  ├────────────────────┼────────┼─────────────────────┤
  │ sideEffect         │ TEXT   │ 부작용              │
  ├────────────────────┼────────┼─────────────────────┤
  │ description        │ TEXT   │ 설명                │
  ├────────────────────┼────────┼─────────────────────┤
  │ graphUrl           │ TEXT   │ 혈중농도 그래프 URL │
  ├────────────────────┼────────┼─────────────────────┤
  │ imageUrl           │ TEXT   │ 이미지 URL          │
  ├────────────────────┼────────┼─────────────────────┤
  │ formulation        │ String │ 제형                │
  ├────────────────────┼────────┼─────────────────────┤
  │ typicalDosageRange │ TEXT   │ 일반적인 용량 범위  │
  ├────────────────────┼────────┼─────────────────────┤
  │ drugClass          │ String │ 약물 분류           │
  ├────────────────────┼────────┼─────────────────────┤
  │ sourceUrl          │ TEXT   │ 출처 URL            │
  └────────────────────┴────────┴─────────────────────┘

  MedicationDosage

  ┌────────────┬────────────┬──────────────┐
  │    필드    │    타입    │     설명     │
  ├────────────┼────────────┼──────────────┤
  │ id         │ Long       │ PK           │
  ├────────────┼────────────┼──────────────┤
  │ medication │ FK         │ Medication   │
  ├────────────┼────────────┼──────────────┤
  │ amount     │ BigDecimal │ 용량 (mg 등) │
  ├────────────┼────────────┼──────────────┤
  │ isActive   │ Boolean    │ 활성 여부    │
  └────────────┴────────────┴──────────────┘

  - UK: (medication_id, amount)                                                                                                                                         

  UserMedication

  ┌──────────────────┬───────────┬─────────────────────────┐
  │       필드       │   타입    │          설명           │
  ├──────────────────┼───────────┼─────────────────────────┤
  │ id               │ Long      │ PK                      │
  ├──────────────────┼───────────┼─────────────────────────┤
  │ user             │ FK        │ User                    │
  ├──────────────────┼───────────┼─────────────────────────┤
  │ consultation     │ FK        │ Consultation (nullable) │
  ├──────────────────┼───────────┼─────────────────────────┤
  │ medicationDosage │ FK        │ MedicationDosage        │
  ├──────────────────┼───────────┼─────────────────────────┤
  │ isActive         │ Boolean   │ 현재 복용 중 여부       │
  ├──────────────────┼───────────┼─────────────────────────┤
  │ startedAt        │ LocalDate │ 복용 시작일             │
  ├──────────────────┼───────────┼─────────────────────────┤
  │ endAt            │ LocalDate │ 복용 종료일 (nullable)  │
  └──────────────────┴───────────┴─────────────────────────┘

  UserMedicationSchedule

  ┌────────────────┬───────────┬─────────────────────────────┐
  │      필드      │   타입    │            설명             │
  ├────────────────┼───────────┼─────────────────────────────┤
  │ id             │ Long      │ PK                          │
  ├────────────────┼───────────┼─────────────────────────────┤
  │ userMedication │ FK        │ UserMedication              │
  ├────────────────┼───────────┼─────────────────────────────┤
  │ doseTime       │ LocalTime │ 복용 시각 (예: 08:00)       │
  ├────────────────┼───────────┼─────────────────────────────┤
  │ label          │ String    │ 라벨 (예: "아침", nullable) │
  └────────────────┴───────────┴─────────────────────────────┘

  - UK: (user_medication_id, dose_time)                                                                                                                                 

  UserMedicationLog

  ┌────────────────────────┬───────────────┬──────────────────────────┐
  │          필드          │     타입      │           설명           │
  ├────────────────────────┼───────────────┼──────────────────────────┤
  │ id                     │ Long          │ PK                       │
  ├────────────────────────┼───────────────┼──────────────────────────┤
  │ userMedicationSchedule │ FK            │ UserMedicationSchedule   │
  ├────────────────────────┼───────────────┼──────────────────────────┤
  │ takenAt                │ LocalDateTime │ 기록 시각                │
  ├────────────────────────┼───────────────┼──────────────────────────┤
  │ status                 │ Enum          │ TAKEN / SKIPPED / MISSED │
  └────────────────────────┴───────────────┴──────────────────────────┘

  - UK: (user_medication_schedule_id, taken_at)                                                                                                                         

  ---
  API 명세

  1. 내 복약 목록 조회

  GET /v1/user-medications
  // Response                                                                                                                                                           
  [
    {
      "userMedicationId": 1,
      "medicationId": 10,
      "medicationName": "콘서타",
      "medicationDosageId": 3,
      "dosageAmount": 18.00,
      "consultationId": null,
      "isActive": true,
      "startedAt": "2026-01-01",
      "endAt": null,
      "schedules": [
        { "scheduleId": 1, "doseTime": "08:00", "label": "아침" }
      ]
    }
  ]

  ---
  2. 약물 마스터 상세 조회

  GET /v1/medications/standards/{medicationId}
  // Response                                                                                                                                                           
  {
    "name": "콘서타",
    "ingredient": "메틸페니데이트",
    "indications": "ADHD 치료",
    "sideEffects": "식욕 감소, 불면",
    "description": "...",
    "bloodConcentrationGraph": "https://...",
    "imageUrl": "https://...",
    "sourceUrl": "https://...",
    "dosageOptions": [
      { "dosageId": 1, "amount": 18.00 },
      { "dosageId": 2, "amount": 27.00 },
      { "dosageId": 3, "amount": 36.00 }
    ]
  }

  ---
  3. 복약 정보 등록

  POST /v1/user-medications
  // Request                                                                                                                                                            
  {
    "consultationId": null,
    "medicationDosageId": 3,
    "startedAt": "2026-01-01",
    "endAt": null,
    "schedules": [
      { "doseTime": "08:00", "label": "아침" },
      { "doseTime": "13:00", "label": "점심" }
    ]
  }

  // Response 201                                                                                                                                                       
  { "userMedicationId": 1, "name": "콘서타", "isActive": true }

  ---
  4. 복약 정보 수정

  PATCH /v1/user-medications/{userMedicationId}
  // Request (변경할 필드만): endAt, isActive, alarmActive, schedules
  { "endAt": "2026-12-31", "isActive": false }

  // 복용 시간(스케줄) 수정 — schedules 는 POST 와 동일한 형태(doseTime, label)
  { "schedules": [ { "doseTime": "09:30", "label": "복용" } ] }

  // Response                                                                                                                                                           
  { "userMedicationId": 1, "isActive": false, "updatedAt": "2026-06-02T10:00:00" }

  // schedules 동작/주의
  // - 보낸 목록으로 전체 교체(full replace). 일부만 보내면 나머지는 사라짐 → 항상 변경된 전체 일정을 통째로 전송.
  // - 생략 시 일정은 그대로, endAt/isActive/alarmActive 만 수정(기존 동일).
  // - 빈 배열 [] 또는 doseTime 중복은 400 (최소 1개, 시간 중복 금지). doseTime 포맷 "HH:mm".
  // - 과거 복용 로그는 시간을 바꿔도 보존(목록·알림에는 현재 일정만 노출).
  // - 응답에는 교체된 schedules 가 포함되지 않음 → 갱신 일정이 필요하면 GET /v1/user-medications 재조회.

  ---
  5. 특정 복약의 로그 조회

  GET /v1/user-medications/{userMedicationId}/logs?startDate=2026-05-01&endDate=2026-05-31
  // Response                                                                                                                                                           
  {
    "userMedicationId": 1,
    "logs": [
      { "takenAt": "2026-05-01T08:05:00", "status": "TAKEN", "scheduleId": 1 },
      { "takenAt": "2026-05-02T08:00:00", "status": "SKIPPED", "scheduleId": 1 }
    ]
  }

  ---
  6. 기간별 전체 복약 로그 조회

  GET /v1/user-medications/logs?startDate=2026-05-01&endDate=2026-05-31
  // Response                                                                                                                                                           
  {
    "logs": [
      { "userMedicationId": 1, "name": "콘서타", "intakeTime": "2026-05-01T08:05:00", "taken": true },
      { "userMedicationId": 2, "name": "스트라테라", "intakeTime": "2026-05-01T09:00:00", "taken": false }
    ]
  }

  ---
  7. 빠른 복약 기록 (리마인더 알림용)

  POST /v1/user-medications/{userMedicationId}/log/quick
  // Request                                                                                                                                                            
  { "action": "TAKEN", "scheduleId": 1 }
  // action: TAKEN | SKIPPED | POSTPONE                                                                                                                                 

  // Response 201                                                                                                                                                       
  { "logId": 42, "action": "TAKEN", "recordedAt": "2026-06-02T08:03:00" }

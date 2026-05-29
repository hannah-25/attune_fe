 Medication API 명세

  Base URL: /v1/medications
  인증: 모든 엔드포인트 Bearer Token 필요

  ---
  1. 의약품 표준 정보 조회

  GET /v1/medications/standards/{medicationId}
  Path: medicationId (Long)

  Response 200
  {
    "name": "string",
    "ingredient": "string",
    "indications": "string",
    "sideEffects": "string",
    "bloodConcentrationGraph": "string (URL)"                                                                                                                           
  }

  ---
  2. 복용 약물 프로필 등록

  POST /v1/medications
  Request Body
  {
    "medicationId": 1,          // required                                                                                                                             
    "hospitalId": 1,            // optional                                                                                                                             
    "startedAt": "2024-01-01",  // required                                                                                                                             
    "endAt": "2024-06-30",      // optional                                                                                                                             
    "schedules": [              // required, 1개 이상                                                                                                                   
      {
        "doseTime": "08:00:00", // required                                                                                                                             
        "label": "아침",        // optional                                                                                                                             
        "dosage": "1정"         // required                                                                                                                             
      }
    ]
  }

  Response 201
  {
    "userMedicationId": 1,
    "name": "string",
    "isActive": true                                                                                                                                                    
  }

  ---
  3. 약물 정보/복용 상태 수정

  PATCH /v1/medications/{userMedicationId}
  Path: userMedicationId (Long)

  Request Body (모두 optional, 변경할 필드만 포함)
  {
    "endAt": "2024-12-31",
    "isActive": false,
    "alarmActive": true                                                                                                                                                 
  }

  Response 200
  {
    "medicationId": 1,
    "isActive": false,
    "updatedAt": "2024-05-28T10:00:00"                                                                                                                                  
  }

  ---
  4. 특정 약물 복용 이력 조회

  GET /v1/medications/{userMedicationId}/logs?startDate=&endDate=
  Path: userMedicationId (Long)
  Query: startDate, endDate (yyyy-MM-dd, optional)

  Response 200
  {
    "userMedicationId": 1,
    "logs": [
      {
        "takenAt": "2024-05-28T08:00:00",
        "status": "TAKEN | SKIPPED | MISSED",
        "scheduleId": 1                                                                                                                                                 
      }
    ]
  }

  ---
  5. 기간별 전체 복용 이력 조회

  GET /v1/medications/logs?startDate=&endDate=
  Query: startDate, endDate (yyyy-MM-dd, required)

  Response 200
  {
    "logs": [
      {
        "medicationId": 1,
        "name": "string",
        "intakeTime": "2024-05-28T08:00:00",
        "taken": true                                                                                                                                                   
      }
    ]
  }

  ---
  6. 간편 복용 기록 (알림 응답)

  POST /v1/medications/{medicationId}/log/quick
  Path: medicationId (Long)

  Request Body
  {
    "action": "TAKEN | POSTPONE | SKIPPED",  // required                                                                                                                
    "scheduleId": 1                           // required                                                                                                               
  }

  Response 201
  {
    "logId": 1,
    "action": "TAKEN",
    "recordedAt": "2024-05-28T08:05:00"                                                                                                                                 
  }

  ---
  Enum 정리

  ┌─────────────────────────┬──────────────────────────┐
  │          이름           │            값            │
  ├─────────────────────────┼──────────────────────────┤
  │ QuickLogAction          │ TAKEN, POSTPONE, SKIPPED │
  ├─────────────────────────┼──────────────────────────┤
  │ UserMedicationLogStatus │ TAKEN, SKIPPED, MISSED   │
  └─────────────────────────┴──────────────────────────┘
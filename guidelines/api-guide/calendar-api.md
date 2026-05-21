# API Guide

프론트엔드 연동용 API 명세. 모든 요청은 `Authorization: Bearer <accessToken>` 헤더 필요.

---

## Schedule (일정)

Base URL: `/api/schedules`

---

### POST `/api/schedules` — 일정 생성

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `title` | string | ✅ | 일정 제목 |
| `description` | string | | 메모 |
| `categoryId` | number | ✅ | 카테고리 ID |
| `place` | string | | 장소 |
| `isAllDay` | boolean | ✅ | 종일 여부 |
| `startTime` | string (ISO 8601) | ✅ | 시작 일시 e.g. `"2026-05-20T09:00:00"` |
| `endTime` | string (ISO 8601) | ✅ | 종료 일시 |
| `alarmEnabled` | boolean | ✅ | 알림 활성화 여부 |
| `alarmedAt` | string[] (ISO 8601) | | 알림 시각 목록 |

**Response** `201 Created`

```json
{
  "scheduleId": 1,
  "title": "병원 예약"
}
```

**Error**

| 코드 | 설명 |
|------|------|
| 400 | 필수 필드 누락 또는 유효성 실패 |
| 404 | 카테고리 없음 |

---

### GET `/api/schedules` — 기간 일정 목록 조회

**Query Parameters**

| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| `startDate` | string (yyyy-MM-dd) | ✅ | 조회 시작일 |
| `endDate` | string (yyyy-MM-dd) | ✅ | 조회 종료일 |
| `source` | string | | `MANUAL` 또는 `IMPORTED`. 생략 시 전체 반환 |

**Response** `200 OK`

```json
{
  "schedules": [
    {
      "scheduleId": 1,
      "title": "병원 예약",
      "startTime": "2026-05-20T09:00:00",
      "endTime": "2026-05-20T10:00:00",
      "color": "#FF5733",
      "source": "MANUAL"
    }
  ]
}
```

> `source` 값: `MANUAL` (직접 등록) / `IMPORTED` (외부 연동)

---

### GET `/api/schedules/{scheduleId}` — 일정 상세 조회

**Path Parameter**

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `scheduleId` | number | 일정 ID |

**Response** `200 OK`

```json
{
  "title": "병원 예약",
  "description": "혈액 검사",
  "categoryId": 2,
  "place": "서울아산병원",
  "isAllDay": false,
  "startTime": "2026-05-20T09:00:00",
  "endTime": "2026-05-20T10:00:00"
}
```

**Error**

| 코드 | 설명 |
|------|------|
| 404 | 일정 없음 |

---

### PATCH `/api/schedules/{scheduleId}` — 일정 수정

변경할 필드만 포함. 모든 필드 선택.

**Request Body**

| 필드 | 타입 | 설명 |
|------|------|------|
| `title` | string | 일정 제목 |
| `description` | string | 메모 |
| `categoryId` | number | 카테고리 ID |
| `place` | string | 장소 |
| `isAllDay` | boolean | 종일 여부 |
| `startTime` | string (ISO 8601) | 시작 일시 |
| `endTime` | string (ISO 8601) | 종료 일시 |
| `alarmEnabled` | boolean | 알림 활성화 여부 |
| `alarmedAt` | string[] (ISO 8601) | 알림 시각 목록 |

**Response** `200 OK`

```json
{
  "scheduleId": 1,
  "title": "병원 예약 (수정됨)"
}
```

**Error**

| 코드 | 설명 |
|------|------|
| 404 | 일정 없음 |

---

### DELETE `/api/schedules/{scheduleId}` — 일정 삭제

**Response** `204 No Content`

**Error**

| 코드 | 설명 |
|------|------|
| 404 | 일정 없음 |

---

### PUT `/api/schedules/{scheduleId}/alarms` — 알림 설정 변경

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `alarmEnabled` | boolean | ✅ | 알림 활성화 여부 |
| `alarmedAt` | string[] (ISO 8601) | | 알림 시각 목록. `alarmEnabled: false`이면 빈 배열 전달 |

**Response** `200 OK`

```json
{
  "scheduleId": 1,
  "alarms": [
    "2026-05-20T08:30:00",
    "2026-05-20T08:45:00"
  ]
}
```

**Error**

| 코드 | 설명 |
|------|------|
| 404 | 일정 없음 |

---

## Schedule Category (일정 카테고리)

Base URL: `/api/schedule-categories`

---

### GET `/api/schedule-categories` — 카테고리 목록 조회

현재 로그인한 사용자의 활성 카테고리만 반환.

**Response** `200 OK`

```json
{
  "categories": [
    {
      "categoryId": 1,
      "categoryName": "병원",
      "color": "#FF5733"
    }
  ]
}
```

---

### POST `/api/schedule-categories` — 카테고리 생성

**Request Body**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `categoryName` | string | ✅ | 카테고리 이름 |
| `color` | string | ✅ | 색상 코드 (e.g. `"#FF5733"`) |

**Response** `201 Created`

```json
{
  "categoryId": 3,
  "categoryName": "운동"
}
```

**Error**

| 코드 | 설명 |
|------|------|
| 400 | 필수 필드 누락 |

---

### PATCH `/api/schedule-categories/{categoryId}` — 카테고리 수정

변경할 필드만 포함.

**Request Body**

| 필드 | 타입 | 설명 |
|------|------|------|
| `categoryName` | string | 카테고리 이름 |
| `color` | string | 색상 코드 |

**Response** `200 OK`

```json
{
  "categoryId": 3,
  "categoryName": "운동 (수정)"
}
```

**Error**

| 코드 | 설명 |
|------|------|
| 404 | 카테고리 없음 |

---

### DELETE `/api/schedule-categories/{categoryId}` — 카테고리 삭제

**Response** `204 No Content`

**Error**

| 코드 | 설명 |
|------|------|
| 404 | 카테고리 없음 |

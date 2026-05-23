# Journal API 가이드

> Base URL: `/api/journals`
> 모든 요청은 인증 토큰(Authorization: Bearer)이 필요합니다.

---

## 목차

1. [일지 조회/삭제](#1-일지-조회삭제)
2. [감정/증상 (Condition)](#2-감정증상-condition) — 태그 CRUD + 체크/체크취소
3. [부작용 (SideEffect)](#3-부작용-sideeffect) — 태그 CRUD + 체크/체크취소
4. [업무 실수/불편 (Trouble)](#4-업무-실수불편-trouble) — 태그 CRUD + 체크/체크취소
5. [목표 성취도 (Goal)](#5-목표-성취도-goal)
6. [수면/식사 (DailyStatus)](#6-수면식사-dailystatus)
7. [메모 (Memo)](#7-메모-memo)
8. [공통 타입 정의](#8-공통-타입-정의)

---

## 1. 일지 조회/삭제

### 단일 일지 상세 조회

```
GET /api/journals/{date}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| date | path | `LocalDate` (yyyy-MM-dd) | ✅ | 조회할 날짜 |

**Response `200`**

```json
{
  "activeTags": {
    "conditions": [
      { "tagId": 1, "condition": "머리 맑음", "conditionType": "UP" }
    ],
    "sideEffects": [
      { "tagId": 2, "sideEffect": "입마름" }
    ],
    "troubles": [
      { "tagId": 3, "trouble": "회의 시간 놓침", "type": "TIME_MANAGEMENT" }
    ],
    "goals": [
      { "goalId": 1, "content": "할 일 미리 정리하기" }
    ]
  },
  "checked": {
    "conditions": [
      { "tagId": 1, "condition": "머리 맑음", "conditionType": "UP", "checkedAt": "2026-05-09T10:30:00" }
    ],
    "sideEffects": [
      { "tagId": 2, "sideEffect": "입마름", "checkedAt": "2026-05-09T11:00:00" }
    ],
    "troubles": [
      { "tagId": 3, "trouble": "회의 시간 놓침", "type": "TIME_MANAGEMENT", "checkedAt": "2026-05-09T14:00:00" }
    ],
    "sleep": { "sleepHour": 7.5, "sleepQuality": "GOOD" },
    "meal": { "ateBreakfast": true, "ateLunch": true, "ateDinner": false },
    "goals": [
      { "goalId": 1, "content": "할 일 미리 정리하기", "score": 8 }
    ],
    "memo": "오늘은 컨디션이 좋았다."
  }
}
```

> - `activeTags`: 현재 사용자의 **모든 활성 태그/목표** 목록 (체크 여부와 무관)
> - `checked`: 해당 날짜에 **실제로 기록된** 항목들
> - `sleep`, `meal`, `memo`는 기록이 없으면 `null`

---

### 기간별 일지 날짜 목록 조회

```
GET /api/journals?startDate={startDate}&endDate={endDate}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| startDate | query | `LocalDate` (yyyy-MM-dd) | ✅ | 시작 날짜 |
| endDate | query | `LocalDate` (yyyy-MM-dd) | ✅ | 종료 날짜 |

**Response `200`**

```json
{
  "dates": ["2026-05-01", "2026-05-03", "2026-05-07"]
}
```

> 기록(체크, 수면/식사, 메모 등)이 하나라도 존재하는 날짜만 반환됩니다.

---

### 단일 일지 삭제

```
DELETE /api/journals/{date}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| date | path | `LocalDate` (yyyy-MM-dd) | ✅ | 삭제할 날짜 |

**Response `200`**

```json
{
  "deletedDate": "2026-05-09",
  "success": true
}
```

---

### 기간별 일지 삭제

```
DELETE /api/journals?startDate={startDate}&endDate={endDate}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| startDate | query | `LocalDate` (yyyy-MM-dd) | ✅ | 시작 날짜 |
| endDate | query | `LocalDate` (yyyy-MM-dd) | ✅ | 종료 날짜 |

**Response `200`**

```json
{
  "deletedRange": {
    "startDate": "2026-05-01",
    "endDate": "2026-05-09"
  },
  "count": 15
}
```

---

## 2. 감정/증상 (Condition)

### 태그 목록 조회

```
GET /api/journals/condition-tags
```

**Response `200`**

```json
[
  { "tagId": 1, "condition": "머리 맑음", "conditionType": "UP" }
]
```

---

### 태그 추가

```
POST /api/journals/condition-tags
```

**Request Body**

```json
{
  "condition": "머리 맑음",
  "conditionType": "UP",
  "journalDate": "2026-05-09"
}
```

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| condition | `String` | ✅ | 감정/증상 내용 |
| conditionType | `ConditionType` | ✅ | 유형 ([참고](#conditiontype)) |
| journalDate | `LocalDate` | ✅ | 일지 날짜 |

**Response `201`**

```json
{ "tagId": 1, "condition": "머리 맑음", "conditionType": "UP" }
```

---

### 태그 삭제

```
DELETE /api/journals/condition-tags/{tagId}?journalDate={journalDate}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| tagId | path | `Long` | ✅ | 태그 ID |
| journalDate | query | `LocalDate` (yyyy-MM-dd) | ✅ | 이 날짜부터 이후의 체크 로그도 함께 삭제 |

**Response `204`** (No Content)

---

### 감정/증상 체크

```
POST /api/journals/conditions
```

**Request Body**

```json
{ "tagId": 1 }
```

**Response `201`**

```json
{
  "tagId": 1,
  "condition": "머리 맑음",
  "conditionType": "UP",
  "checkedAt": "2026-05-09T10:30:00"
}
```

---

### 감정/증상 체크 취소

```
DELETE /api/journals/conditions?tagId={tagId}&date={date}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| tagId | query | `Long` | ✅ | 태그 ID |
| date | query | `LocalDate` (yyyy-MM-dd) | ✅ | 취소할 날짜 |

**Response `204`** (No Content)

---

## 3. 부작용 (SideEffect)

### 태그 목록 조회

```
GET /api/journals/side-effect-tags
```

**Response `200`**

```json
[
  { "tagId": 1, "sideEffect": "입마름" }
]
```

---

### 태그 추가

```
POST /api/journals/side-effect-tags
```

**Request Body**

```json
{
  "sideEffect": "입마름",
  "journalDate": "2026-05-09"
}
```

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sideEffect | `String` | ✅ | 부작용 내용 |
| journalDate | `LocalDate` | ✅ | 일지 날짜 |

**Response `201`**

```json
{ "tagId": 1, "sideEffect": "입마름" }
```

---

### 태그 삭제

```
DELETE /api/journals/side-effect-tags/{tagId}?journalDate={journalDate}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| tagId | path | `Long` | ✅ | 태그 ID |
| journalDate | query | `LocalDate` (yyyy-MM-dd) | ✅ | 이 날짜부터 이후의 체크 로그도 함께 삭제 |

**Response `204`** (No Content)

---

### 부작용 체크

```
POST /api/journals/side-effects
```

**Request Body**

```json
{ "tagId": 1 }
```

**Response `201`**

```json
{
  "tagId": 1,
  "sideEffect": "입마름",
  "checkedAt": "2026-05-09T11:00:00"
}
```

---

### 부작용 체크 취소

```
DELETE /api/journals/side-effects?tagId={tagId}&date={date}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| tagId | query | `Long` | ✅ | 태그 ID |
| date | query | `LocalDate` (yyyy-MM-dd) | ✅ | 취소할 날짜 |

**Response `204`** (No Content)

---

## 4. 업무 실수/불편 (Trouble)

### 태그 목록 조회

```
GET /api/journals/trouble-tags
```

**Response `200`**

```json
[
  { "tagId": 1, "trouble": "회의 시간 놓침", "type": "TIME_MANAGEMENT" }
]
```

---

### 태그 추가

```
POST /api/journals/trouble-tags
```

**Request Body**

```json
{
  "trouble": "회의 시간 놓침",
  "type": "TIME_MANAGEMENT",
  "journalDate": "2026-05-09"
}
```

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| trouble | `String` | ✅ | 내용 |
| type | `TroubleType` | ✅ | 유형 ([참고](#troubletype)) |
| journalDate | `LocalDate` | ✅ | 일지 날짜 |

**Response `201`**

```json
{ "tagId": 1, "trouble": "회의 시간 놓침", "type": "TIME_MANAGEMENT" }
```

---

### 태그 삭제

```
DELETE /api/journals/trouble-tags/{tagId}?journalDate={journalDate}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| tagId | path | `Long` | ✅ | 태그 ID |
| journalDate | query | `LocalDate` (yyyy-MM-dd) | ✅ | 이 날짜부터 이후의 체크 로그도 함께 삭제 |

**Response `204`** (No Content)

---

### 업무 실수/불편 체크

```
POST /api/journals/troubles
```

**Request Body**

```json
{ "tagId": 1 }
```

**Response `201`**

```json
{
  "tagId": 1,
  "trouble": "회의 시간 놓침",
  "type": "TIME_MANAGEMENT",
  "checkedAt": "2026-05-09T14:00:00"
}
```

---

### 업무 실수/불편 체크 취소

```
DELETE /api/journals/troubles?tagId={tagId}&date={date}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| tagId | query | `Long` | ✅ | 태그 ID |
| date | query | `LocalDate` (yyyy-MM-dd) | ✅ | 취소할 날짜 |

**Response `204`** (No Content)

---

## 5. 목표 성취도 (Goal)

### 목표 추가

```
POST /api/journals/goals
```

**Request Body**

```json
{
  "content": "할 일 미리 정리하기",
  "journalDate": "2026-05-09"
}
```

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| content | `String` (최대 50자) | ✅ | 목표 내용 |
| journalDate | `LocalDate` | ✅ | 일지 날짜 |

**Response `201`**

```json
{ "goalId": 1, "content": "할 일 미리 정리하기" }
```

---

### 목표 내용 수정

```
PATCH /api/journals/goals/{goalId}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| goalId | path | `Long` | ✅ | 목표 ID |

**Request Body**

```json
{ "content": "오늘 할 일 목록 작성하기" }
```

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| content | `String` (최대 50자) | ✅ | 수정할 목표 내용 |

**Response `200`**

```json
{ "goalId": 1, "content": "오늘 할 일 목록 작성하기" }
```

> 동일한 내용의 활성 목표가 이미 있으면 `409` 반환.

---

### 목표 삭제

```
DELETE /api/journals/goals/{goalId}?journalDate={journalDate}
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| goalId | path | `Long` | ✅ | 목표 ID |
| journalDate | query | `LocalDate` (yyyy-MM-dd) | ✅ | 이 날짜부터 이후의 점수 로그도 함께 삭제 |

**Response `204`** (No Content)

---

### 목표 점수 기록

```
POST /api/journals/{date}/goals
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| date | path | `LocalDate` (yyyy-MM-dd) | ✅ | 일지 날짜 |

**Request Body**

```json
{
  "goalId": 1,
  "score": 8
}
```

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| goalId | `Long` | ✅ | 목표 ID |
| score | `Integer` (0~10) | ✅ | 달성 점수 |

**Response `200`**

```json
{
  "goalId": 1,
  "score": 8,
  "journalDate": "2026-05-09"
}
```

> 같은 날짜에 같은 목표를 다시 호출하면 점수가 갱신됩니다.

---

## 6. 수면/식사 (DailyStatus)

### 수면/식사 조회

```
GET /api/journals/{date}/sleep-meal
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| date | path | `LocalDate` (yyyy-MM-dd) | ✅ | 일지 날짜 |

**Response `200`**

```json
{
  "journalDate": "2026-05-09",
  "sleepHour": 7.5,
  "sleepQuality": "GOOD",
  "ateBreakfast": true,
  "ateLunch": true,
  "ateDinner": false
}
```

**Response `204`** — 해당 날짜 기록 없음

---

### 수면/식사 등록·수정

```
POST /api/journals/{date}/sleep-meal
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| date | path | `LocalDate` (yyyy-MM-dd) | ✅ | 일지 날짜 |

**Request Body**

```json
{
  "sleepHour": 7.5,
  "sleepQuality": "GOOD",
  "ateBreakfast": true,
  "ateLunch": true,
  "ateDinner": false
}
```

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| sleepHour | `Float` (0~24) | ❌ | 수면 시간 (시간 단위) |
| sleepQuality | `SleepQuality` | ❌ | 수면 질 ([참고](#sleepquality)) |
| ateBreakfast | `Boolean` | ❌ | 아침 식사 여부 |
| ateLunch | `Boolean` | ❌ | 점심 식사 여부 |
| ateDinner | `Boolean` | ❌ | 저녁 식사 여부 |

**Response `201`**

```json
{
  "sleepHour": 7.5,
  "sleepQuality": "GOOD",
  "ateBreakfast": true,
  "ateLunch": true,
  "ateDinner": false
}
```

> 이미 기록이 있으면 전체 덮어씁니다. 보내지 않은 필드는 `null`로 저장됩니다.

---

## 7. 메모 (Memo)

### 메모 조회

```
GET /api/journals/{date}/memo
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| date | path | `LocalDate` (yyyy-MM-dd) | ✅ | 일지 날짜 |

**Response `200`**

```json
{
  "journalDate": "2026-05-09",
  "memo": "오늘은 컨디션이 좋았다."
}
```

**Response `204`** — 해당 날짜 메모 없음

---

### 메모 등록·수정

```
POST /api/journals/{date}/memo
```

| 파라미터 | 위치 | 타입 | 필수 | 설명 |
|---|---|---|---|---|
| date | path | `LocalDate` (yyyy-MM-dd) | ✅ | 일지 날짜 |

**Request Body**

```json
{ "memo": "오늘은 컨디션이 좋았다." }
```

| 필드 | 타입 | 필수 | 설명 |
|---|---|---|---|
| memo | `String` | ❌ | 메모 내용 (빈 문자열 가능) |

**Response `201`**

```json
{ "memo": "오늘은 컨디션이 좋았다." }
```

> 이미 메모가 있으면 덮어씁니다.

---

## 8. 공통 타입 정의

### ConditionType

| 값 | 설명 |
|---|---|
| `UP` | 기분 좋음 |
| `DOWN` | 다운 |
| `TIGHT` | 긴장 |
| `FOGGY` | 멍함 |
| `CALM` | 차분 |

### TroubleType

| 값 | 설명 |
|---|---|
| `INATTENTION` | 부주의 |
| `HYPERACTIVITY` | 과잉행동 |
| `IMPULSIVITY` | 충동성 |
| `TIME_MANAGEMENT` | 시간 관리 |
| `COGNITIVE_ERROR` | 인지적 오류 |

### SleepQuality

| 값 | 설명 |
|---|---|
| `GOOD` | 좋음 |
| `NORMAL` | 보통 |
| `BAD` | 나쁨 |

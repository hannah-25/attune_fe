# 게스트 모드 구현 계획

> 목표: 로그인 없이 목업 데이터로 앱 전체를 체험할 수 있는 둘러보기 모드

---

## 핵심 전략

컴포넌트를 건드리지 않고 **`apiRequest()` 레벨에서 인터셉트**한다.
게스트 모드일 때 실제 fetch 대신 mock resolver가 응답을 반환한다.

```
GET  → localStorage guest store 우선 확인 → 없으면 mock 데이터 반환
POST/PATCH/DELETE → localStorage guest store에 저장 → 성공 응답 반환
```

---

## 파일별 작업 목록

### 1. `src/app/guest.ts` (신규)

게스트 모드 상태 헬퍼.

```ts
const GUEST_KEY = 'guest_mode';

export const isGuestMode = () => localStorage.getItem(GUEST_KEY) === 'true';
export const enterGuestMode = () => localStorage.setItem(GUEST_KEY, 'true');
export const exitGuestMode = () => localStorage.removeItem(GUEST_KEY);
```

---

### 2. `src/app/mocks/guest-store.ts` (신규)

게스트 모드에서 쓰기 작업 결과를 저장/조회하는 localStorage wrapper.

- 키: `guest_store` (JSON 객체)
- URL 패턴을 키로, 데이터를 값으로 저장
- 읽기 시 URL 패턴 매칭으로 조회

```ts
// 예시 구조
{
  "journals/2026-05-31": { conditions: [...], sideEffects: [...], memo: "..." },
  "journals/conditions": [{ tagId: 1, date: "2026-05-31" }],
  "todos": [{ todoId: 101, text: "병원 예약", ... }]
}
```

주요 함수:
- `guestRead(urlKey)` → 저장된 데이터 반환 (없으면 null)
- `guestWrite(urlKey, updater)` → 데이터 저장/갱신
- `clearGuestStore()` → 전체 초기화

---

### 3. `src/app/mocks/resolver.ts` (신규)

URL + method → 응답 데이터 매핑 테이블.

각 엔드포인트에 대해:
- **GET**: `guestRead()` 먼저 확인 → null이면 mock 데이터 반환
- **POST/PATCH/DELETE**: `guestWrite()`로 저장 → 성공 응답 반환

커버 범위 (전체 탭):

| 그룹 | 엔드포인트 | 방식 |
|------|-----------|------|
| 홈 | `/v1/users/me/profile` | mock |
| 일지 | `/v1/journals/{date}` | mock + guest store |
| 일지 | `/v1/journals/condition-tags` 등 | mock + guest store |
| 약 | `/v1/user-medications` | mock + guest store |
| 캘린더 | `/v1/schedules` | mock + guest store |
| 리포트 | `/v1/report/*` | mock only (read-only) |
| 상담 | `/v1/consultations` | mock + guest store |
| 커뮤니티 | `/v1/community/posts` | mock + guest store |

> **현재 mock 데이터 shape 주의**: 기존 mock 파일들은 UI용 shape으로 작성되어 있어  
> API 응답 shape과 다를 수 있음. resolver에서 변환 처리하거나 API shape mock을 별도 작성.

---

### 4. `src/app/api/client.ts` 수정

`apiRequest()` 함수 앞부분에 게스트 인터셉트 추가.

```ts
import { isGuestMode } from '../guest';
import { resolveGuestRequest } from '../mocks/resolver';

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  // 게스트 모드면 mock resolver로 분기
  if (isGuestMode()) {
    return resolveGuestRequest<T>(path, options);
  }

  // 기존 로직 그대로...
}
```

---

### 5. `src/app/App.tsx` 수정

`ProtectedRoute`에서 게스트도 통과 허용.

```ts
// 변경 전
function ProtectedRoute() {
  if (!getAccessToken()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

// 변경 후
function ProtectedRoute() {
  if (!getAccessToken() && !isGuestMode()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
```

`RootRoute`도 게스트 체크 추가 (게스트면 `/home`으로 바로 이동).

---

### 6. `src/pages/auth/SplashPage.tsx` 수정

버튼 하나 추가.

```tsx
<button
  onClick={() => {
    enterGuestMode();
    navigate('/home');
  }}
  className="..."
>
  로그인 없이 둘러보기
</button>
```

---

### 7. 게스트 모드 종료 처리

**배너**: 보호된 모든 화면 상단에 "지금 둘러보기 중이에요 · 회원가입하기 →" 배너 표시.  
→ 별도 `GuestBanner` 컴포넌트를 `ProtectedRoute` 내 `<Outlet />` 위에 삽입하는 방식.

**탈퇴/로그인 이동 시**: `exitGuestMode()` + `clearGuestStore()` 호출 후 `/splash`로 이동.

---

## 작업 순서

1. ✅ `user.mock.ts` — UserProfile API shape으로 신규 생성
2. ✅ `home.mock.ts` — mockTodos, mockSchedules API shape으로 수정
3. ✅ `journal.mock.ts` — JournalDetail, ConditionTag[] 등으로 전면 재작성
4. ✅ `medication.mock.ts` — MedicationSummary[], 로그 shape으로 전면 재작성
5. ✅ `calendar.mock.ts` — ScheduleDetail, ScheduleCategory[]로 전면 재작성
6. ✅ `community.mock.ts` — mockPosts, mockComments API shape으로 수정
7. ✅ `guest.ts` — 상태 헬퍼 생성
8. ✅ `guest-store.ts` — localStorage read/write 생성
9. ✅ `resolver.ts` — URL 매핑 테이블 생성
10. ✅ `client.ts` — 게스트 모드 인터셉트 추가
11. ✅ `App.tsx` — ProtectedRoute 게스트 허용 + RootRoute 게스트 분기
12. ✅ `SplashPage.tsx` — "로그인 없이 둘러보기" 버튼 추가
13. ✅ `GuestBanner` 컴포넌트 생성 + ProtectedRoute에 삽입

---

## 고려사항

- **로컬스토리지 용량**: 5MB 제한. 일지/일정 쓰기가 많아도 실제로는 수십 KB 수준이라 문제 없음.
- **날짜 의존 데이터**: 일지, 캘린더 등 날짜 기반 mock은 오늘 날짜 기준으로 동적 생성 필요.

---

## Mock 데이터 Shape 수정 계획

> 방향: 기존 mock 파일을 API 응답 shape 기준으로 재작성한다.  
> 단, UI 전용 필드(`highlightTone`, `badgeLabel` 등)는 mock에서 제거하지 않고 유지 (컴포넌트가 직접 참조 중).

---

### `home.mock.ts`

| 필드 | 현재 (UI shape) | API shape | 조치 |
|------|----------------|-----------|------|
| `mockTodos[].id` | `number` | `todoId: number` | 키 이름 변경 |
| `mockTodos[].done` | `boolean` | `isCompleted: boolean` | 키 이름 변경 |
| `mockTodos[].text` | `string` | 동일 | 유지 |
| `mockTodos[]` | — | `dueAt: string`, `isAllDay: boolean` 추가 | 필드 추가 |
| `mockScheduleItems` | UI 레이블(`label`, `labelColor`, `dotColor`) | `ScheduleSummary { scheduleId, title, categoryId, isAllDay, startTime, endTime }` | 전면 재작성 |
| `mockWeeklyStats`, `mockInsight` | UI 전용 | 대응 API 없음 (리포트 API 미정) | 유지 (컴포넌트 직접 참조) |

**수정 후:**
```ts
export const mockTodos: TodoItem[] = [
  { todoId: 1, text: '병원 서류 챙기기', dueAt: '2026-05-31', isAllDay: true, isCompleted: true },
  { todoId: 2, text: '리포트 초안 제출', dueAt: '2026-05-31', isAllDay: false, isCompleted: false },
  { todoId: 3, text: '저녁 약 챙기기', dueAt: '2026-05-31', isAllDay: false, isCompleted: false },
];

export const mockSchedules: ScheduleSummary[] = [
  { scheduleId: 1, title: '병원 진료', categoryId: 1, isAllDay: false, startTime: '2026-05-31T14:00:00', endTime: '2026-05-31T14:40:00' },
  { scheduleId: 2, title: '팀 미팅', categoryId: 2, isAllDay: false, startTime: '2026-06-01T09:00:00', endTime: '2026-06-01T10:00:00' },
  { scheduleId: 3, title: '정신건강의학과 상담', categoryId: 1, isAllDay: false, startTime: '2026-06-05T14:00:00', endTime: '2026-06-05T14:40:00' },
];
```

---

### `journal.mock.ts`

| 필드 | 현재 (UI shape) | API shape | 조치 |
|------|----------------|-----------|------|
| `mockDayRecords` | `Record<number, DotColor[]>` | `{ dates: string[] }` | 전면 재작성 |
| `mockTags[].id` | `string` | `tagId: number` | 타입 + 키 변경 |
| `mockTags[].label` | `string` | `condition: string` (감정) / `sideEffect: string` (부작용) | 키 이름 변경 |
| `mockTags[].count` | `string` | 없음 (API 응답에 없음) | 제거 |
| `mockTags[].active` | `boolean` | `visible: boolean` | 키 이름 변경 |
| — | — | `JournalDetail` 전체 구조 | 새로 추가 |

**수정 후:**
```ts
// GET /v1/journals?startDate=...&endDate=...
export const mockJournalDates: { dates: string[] } = {
  dates: ['2026-05-02', '2026-05-03', '2026-05-05', /* ... */],
};

// GET /v1/journals/{date}
export const mockJournalDetail: JournalDetail = {
  activeTags: {
    conditions: [
      { tagId: 1, condition: '집중 어려움', conditionType: 'USER_INPUT', visible: true },
      { tagId: 2, condition: '멍해짐', conditionType: 'FOGGY', visible: true },
      { tagId: 3, condition: '짜증', conditionType: 'USER_INPUT', visible: true },
      { tagId: 4, condition: '불안', conditionType: 'USER_INPUT', visible: true },
      { tagId: 5, condition: '무기력', conditionType: 'DOWN', visible: true },
      { tagId: 6, condition: '두근거림', conditionType: 'USER_INPUT', visible: false },
      { tagId: 7, condition: '졸림', conditionType: 'DOWN', visible: false },
    ],
    sideEffects: [
      { tagId: 10, sideEffect: '식욕 저하', visible: true },
      { tagId: 11, sideEffect: '두통', visible: true },
    ],
    troubles: [
      { tagId: 20, trouble: '집중 실수', type: 'INATTENTION', visible: true },
    ],
    goals: [
      { goalId: 1, content: '30분 집중 블록 3회' },
      { goalId: 2, content: '점심 약 제시간에 복용' },
    ],
  },
  checked: {
    conditions: [
      { tagId: 1, condition: '집중 어려움', conditionType: 'USER_INPUT', checkedAt: '2026-05-31T09:00:00' },
    ],
    sideEffects: [],
    troubles: [],
    sleep: { sleepHour: 7, sleepQuality: 'NORMAL' },
    meal: { ateBreakfast: true, ateLunch: false, ateDinner: false },
    goals: [{ goalId: 1, content: '30분 집중 블록 3회', score: 3 }],
    memo: '오늘은 오전에 집중이 잘 됐다.',
  },
};

// GET /v1/journals/condition-tags
export const mockConditionTags: ConditionTag[] = mockJournalDetail.activeTags.conditions;

// GET /v1/journals/side-effect-tags
export const mockSideEffectTags: SideEffectTag[] = mockJournalDetail.activeTags.sideEffects;

// GET /v1/journals/trouble-tags
export const mockTroubleTags: TroubleTag[] = mockJournalDetail.activeTags.troubles;
```

---

### `medication.mock.ts`

| 필드 | 현재 (UI shape) | API shape | 조치 |
|------|----------------|-----------|------|
| `mockMedications[].id` | `number` | `userMedicationId: number` | 키 이름 변경 |
| `mockMedications[].detail` | `string` (한글 조합) | `ingredient?: string`, `startedAt?: string` | 분리 |
| `mockMedications[].schedule` | `string` (한글 조합) | `schedules: MedicationScheduleSummary[]` | 구조화 |
| `mockMedications[].active` | `boolean` | `isActive: boolean` | 키 이름 변경 |
| `mockMedications[].bg` | `string` (Tailwind) | 없음 | 제거 |
| `mockNextDose` | UI 전용 | 없음 | 유지 (컴포넌트 직접 참조) |
| `mockHistoryGroups` | UI 전용 한글 status | `MedicationProfileLog { scheduleId, takenAt, status: 'TAKEN'|'SKIPPED'|'MISSED' }` | 전면 재작성 |
| `mockMedicationInfo` | UI 전용 | `MedicationStandard { name, ingredient, indications, sideEffects, bloodConcentrationGraph }` | 키 이름 변경 |

**수정 후:**
```ts
export const mockMedications: MedicationSummary[] = [
  {
    userMedicationId: 1,
    medicationId: 101,
    name: '콘서타 18mg',
    ingredient: '메틸페니데이트',
    startedAt: '2026-02-03',
    isActive: true,
    alarmActive: true,
    schedules: [
      { scheduleId: 1, doseTime: '08:00', label: '아침', dosage: '18mg' },
      { scheduleId: 2, doseTime: '12:30', label: '점심', dosage: '18mg' },
    ],
  },
  {
    userMedicationId: 2,
    medicationId: 102,
    name: '스트라테라 40mg',
    ingredient: '아토목세틴',
    startedAt: '2026-04-01',
    isActive: true,
    alarmActive: true,
    schedules: [
      { scheduleId: 3, doseTime: '19:00', label: '저녁', dosage: '40mg' },
    ],
  },
];

export const mockMedicationLogs: MedicationProfileLog[] = [
  { scheduleId: 1, takenAt: '2026-05-31T08:03:00', status: 'TAKEN' },
  { scheduleId: 2, takenAt: '2026-05-31T12:35:00', status: 'TAKEN' },
  { scheduleId: 1, takenAt: '2026-05-30T08:10:00', status: 'TAKEN' },
  { scheduleId: 2, takenAt: '2026-05-30T12:30:00', status: 'SKIPPED' },
];

export const mockMedicationStandard: MedicationStandard = {
  name: '콘서타 18mg',
  ingredient: '메틸페니데이트 · 서방형',
  indications: '주의력결핍 과잉행동장애(ADHD) 증상 개선에 사용됩니다.',
  sideEffects: '식욕 저하, 불면, 두통, 입마름, 두근거림',
  bloodConcentrationGraph: '',
};
```

---

### `calendar.mock.ts`

| 필드 | 현재 (UI shape) | API shape | 조치 |
|------|----------------|-----------|------|
| `mockEventDetail` | `{ category, source, title, when, where, alarm, repeat }` | `ScheduleDetail { title, description?, categoryId, place?, isAllDay, startTime, endTime }` | 전면 재작성 |
| — | — | `ScheduleCategory[]`, `ScheduleSummary[]` | 새로 추가 |

**수정 후:**
```ts
export const mockScheduleCategories: ScheduleCategory[] = [
  { categoryId: 1, categoryName: '상담', color: '#a78bfa' },
  { categoryId: 2, categoryName: '업무', color: '#60a5fa' },
  { categoryId: 3, categoryName: '기타', color: '#86efac' },
];

export const mockScheduleDetail: ScheduleDetail = {
  title: '정신건강의학과 정기 진료',
  categoryId: 1,
  place: '청담심리상담센터',
  isAllDay: false,
  startTime: '2026-05-31T14:00:00',
  endTime: '2026-05-31T14:40:00',
};
```

---

### `counseling.mock.ts`

consultation.ts의 `getConsultation` 반환 타입이 `unknown`이라 API shape 미확정.  
현재 mock 데이터는 UI 렌더링에 직접 쓰이고 있으므로 **현재 shape 유지**, resolver에서 그대로 반환.  
→ 추후 백엔드 응답 shape 확정 시 함께 수정.

---

### `report.mock.ts`

리포트 관련 API가 아직 프론트에 구현되지 않아 API shape 미확정.  
현재 mock 데이터 **현재 shape 유지**, resolver에서 그대로 반환.  
→ 리포트 API 연동 시 함께 수정.

---

### `community.mock.ts`

| 필드 | 현재 (UI shape) | API shape | 조치 |
|------|----------------|-----------|------|
| `mockPosts[].id` | `number` | `postId: number` | 키 이름 변경 |
| `mockPosts[].category` | 한글 레이블 | `postCategory: PostCategory` (영문 enum) | 값 변경 |
| `mockPosts[].author` | `string` | `anonNickname: string` | 키 이름 변경 |
| `mockPosts[].time` | 상대 시간 문자열 | `createdAt: string` (ISO) | 형식 변경 |
| `mockPosts[].body` | `string` | `content: string` | 키 이름 변경 |
| `mockPosts[].liked` | `boolean` | 없음 (API 미지원) | 제거 |
| `mockPosts[].likes` | `number` | 없음 (API 미지원) | 제거 |
| `mockPosts[].comments` | `number` | 없음 (API 미지원) | 제거 |
| `mockComments[].author` | `string` | `anonNickname: string` | 키 이름 변경 |
| `mockComments[].avatarClass` | Tailwind 클래스 | 없음 | 제거 |
| `mockComments[].meta` | 상대 시간 문자열 | `createdAt: string` (ISO) | 형식 변경 |
| `mockComments[].body` | `string` | `content: string` | 키 이름 변경 |
| `mockComments[].isAuthor` | `boolean` | `isOwner: boolean` | 키 이름 변경 |
| `mockNotices` | 대체로 일치 + UI 전용 필드 추가 | `NoticeSummary { noticeId, title, createdAt }` | UI 전용 필드(`highlightTone`, `badgeLabel`) 유지 |

**수정 후:**
```ts
export const mockPosts: PostResponse[] = [
  {
    postId: 1,
    postCategory: 'MEDICATION',
    anonNickname: '익명',
    createdAt: '2026-05-31T09:00:00',
    title: '콘서타 1주차 후기 - 아침 식욕이 너무 없어요',
    content: '비슷한 분들 어떻게 견디고 계신가요?',
    updatedAt: '2026-05-31T09:00:00',
    isOwner: false,
  },
  // ...
];

export const mockComments: CommentResponse[] = [
  {
    commentId: 1,
    anonNickname: '루나',
    content: '저도 비슷했어요. 식사를 못 하면 기록을 같이 적어가면 진료 때 설명하기 좋더라고요.',
    createdAt: '2026-05-31T10:00:00',
    isPostAuthor: false,
    isOwner: false,
  },
  // ...
];
```

---

### `user.mock.ts` (신규 추가 필요)

현재 없음. 프로필 API mock 추가 필요.

```ts
export const mockUserProfile: UserProfile = {
  nickname: '둘러보기 유저',
  profileImageUrl: null,
  email: 'guest@atune.app',
  notifications: { medication: true, report: true, marketing: false },
};
```

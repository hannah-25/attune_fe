# a.tune 디자인 감사 보고서

> 기준 파일: `guidelines/Guidelines.md`, `guidelines/Patterns.md`
> 감사 일자: 2026-06-23
> 감사 범위: 43개 페이지 파일 전수 검토

---

## 감사 기준 요약

| 기준 | 정답 값 |
|------|---------|
| 화면 배경 | `bg-gray-50` |
| 정보성 카드 | `bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px]` |
| Hero CTA 카드 | `bg-purple-100 shadow-[...] rounded-[1.75rem]` |
| Primary CTA 버튼 | `bg-[rgb(31,27,46)] text-white` |
| 폰트 | 루트 div에 `style={{ fontFamily: "NanumSquare, ..." }}` 인라인 스타일 |
| 탑바 | `<TopBar>` 공통 컴포넌트 사용, 타이틀 `text-base font-bold` 절대 중앙 정렬 |
| 탭바 | `<TabBar active="탭명" />` 공통 컴포넌트 사용 |
| Section Header | `mb-3 flex items-center justify-between`, 제목 `text-sm font-bold text-gray-900`, 액션 `text-xs font-semibold text-gray-700` |

---

## 우선순위별 수정 목록

### P1 — 즉시 수정 (규칙 위반)

#### 1. `CalendarMainPage` — 표준 TopBar 미사용
**파일**: `src/pages/calendar/CalendarMainPage.tsx`

커스텀 헤더를 사용하고 있으며 `<TopBar>` 공통 컴포넌트를 전혀 사용하지 않는다.

```tsx
// 현재 (위반)
<div className="items-center flex justify-between pt-2 pr-3 pb-3 pl-4">
  <div className="font-extrabold text-2xl" ...>…월</div>
  …
</div>
```

캘린더는 탭 루트 화면이므로 Dashboard TopBar 패턴(로고 좌측, 아이콘 우측)이나, 최소한 `<TopBar>` 컴포넌트를 통한 Sub-screen TopBar를 사용해야 한다.

---

#### 2. `EventDetailPage` — 화면 배경색 위반
**파일**: `src/pages/calendar/EventDetailPage.tsx`

외부 일정(`isExternal`) 및 내부 일정 모두 페이지 전체 배경을 `bg-purple-100`으로 사용하고 있다. 화면 배경은 반드시 `bg-gray-50`이어야 하며, `bg-purple-100`은 Hero CTA 카드 배경에만 사용한다.

```tsx
// 현재 (위반) — 외부 일정 뷰
<div className="w-full h-full bg-purple-100 text-sm flex flex-col">
// 현재 (위반) — 내부 일정 뷰
<div className="w-full h-full bg-purple-100 text-sm flex flex-col">
```

---

#### 3. `ReportWeeklyPage` — 표준 TopBar 미사용
**파일**: `src/pages/report/ReportWeeklyPage.tsx`  L121–L139

커스텀 헤더를 사용하고 있으며 `<TopBar>` 공통 컴포넌트를 사용하지 않는다.

```tsx
// 현재 (위반)
<div className="items-center flex justify-between pt-2 pr-5 pb-2 pl-5">
  <div>
    <div className="font-semibold text-gray-600">복약 분석</div>
    <div className="font-extrabold mt-[2px] text-2xl">리포트</div>
  </div>
  …
</div>
```

리포트는 탭 루트 화면이므로 Dashboard TopBar 패턴이나 `<TopBar>` 컴포넌트를 사용해야 한다. `CalendarMainPage`와 동일한 문제.

---

#### 4. `EmptyCalendarPage` — 표준 TopBar 미사용
**파일**: `src/pages/empty/EmptyCalendarPage.tsx`  L57–L76

커스텀 헤더를 사용하고 있다. 같은 역할의 `EmptyJournalPage`와 `EmptyMedicationPage`는 `<TopBar>` 컴포넌트를 사용하는데 이 파일만 다르다.

```tsx
// 현재 (위반)
<div className="items-center flex justify-between pt-2 pr-4 pb-1 pl-4">
  <div className="font-extrabold text-2xl">…월 …일</div>
  <div className="flex gap-1.5">…</div>
</div>
```

---

#### 5. `EmptyReportPage` — 표준 TopBar 미사용
**파일**: `src/pages/empty/EmptyReportPage.tsx`  L13–L20

커스텀 헤더를 사용하고 있다.

```tsx
// 현재 (위반)
<div className="items-center flex justify-between pt-2 pr-5 pb-2 pl-5">
  <div>
    <div className="font-semibold text-gray-600 text-xs">이번 주 · 5/12 - 5/18</div>
    <div className="font-extrabold mt-[2px] text-2xl">주간 리포트</div>
  </div>
  …
</div>
```

추가로 날짜(`5/12 - 5/18`)와 D-day(`D-4`), 기록 수(`3 / 7일`)가 하드코딩되어 있어 실제 데이터와 연동이 필요하다.

---

### P2 — 다음 패스에서 수정 (불일치)

#### 6. Primary CTA 버튼 색상 불일치 (`bg-gray-900` 사용)
**표준**: `bg-[rgb(31,27,46)]`

여러 화면에서 `bg-gray-900`을 사용하고 있다. 시각적으로 비슷하지만 표준값과 다르다.

| 파일 | 위치 | 버튼 텍스트 |
|------|------|-------------|
| `src/pages/auth/LoginPage.tsx` | 주 CTA 버튼 | 로그인 |
| `src/pages/auth/SignupPage.tsx` | 주 CTA 버튼 | 회원가입 |
| `src/pages/auth/ResetPassword1Page.tsx` | 주 CTA 버튼 | 다음 |
| `src/pages/auth/ResetPassword3Page.tsx` | 주 CTA 버튼 | 비밀번호 변경 |
| `src/pages/onboarding/Onboarding1Page.tsx` | 주 CTA 버튼 | 시작하기 |
| `src/pages/onboarding/Onboarding5Page.tsx` | 주 CTA 버튼 | 완료 |
| `src/pages/medication/MedicationAddPage.tsx` L81 | TopBar 저장 버튼 | 저장하기 |
| `src/pages/counseling/CounselingAddPage.tsx` L81 | TopBar 저장 버튼 | 저장하기 |
| `src/pages/settings/WithdrawPage.tsx` L199 | "계속 사용하기" 버튼 | 계속 사용하기 |

---

#### 7. `MyPage` 화면 배경 불일치
**파일**: `src/pages/settings/MyPage.tsx`  L92

```tsx
// 현재 (불일치)
<div className="w-full h-full bg-gray-100 text-sm flex flex-col">
// 수정 후
<div className="w-full h-full bg-gray-50 text-sm flex flex-col">
```

---

#### 8. `NotificationSettingsPage` 화면 배경 불일치
**파일**: `src/pages/settings/NotificationSettingsPage.tsx`  L126

```tsx
// 현재 (불일치)
<div className="w-full h-full bg-gray-100 text-sm flex flex-col">
// 수정 후
<div className="w-full h-full bg-gray-50 text-sm flex flex-col">
```

---

#### 9. `MyPage` 프로필 저장 버튼 색상
**파일**: `src/pages/settings/MyPage.tsx`  L124

닉네임 편집 확인 버튼에 `bg-purple-500`을 사용하고 있다. 가이드라인상 `bg-purple-500`은 Primary CTA로 사용하지 않는다. 저장/확정 행동이므로 `bg-[rgb(31,27,46)]`으로 변경하거나, 인라인 아이콘 버튼 수준의 보조 행동으로 재설계해야 한다.

```tsx
// 현재 (위반)
<button ... className="... bg-purple-500 text-white ... rounded-full" aria-label="프로필 저장">
  <Check ... />
</button>
```

---

#### 10. `CommunityFeedPage` NanumSquare 인라인 스타일 누락
**파일**: `src/pages/community/CommunityFeedPage.tsx`  L123–L125

루트 `<div>`에 `style={{ fontFamily: "NanumSquare, ..." }}` 인라인 스타일이 없다. 43개 페이지 중 이 파일만 누락되어 있다.

```tsx
// 현재 (누락)
<div className="w-full h-full bg-gray-50 text-sm flex flex-col">

// 수정 후
<div
  className="w-full h-full bg-gray-50 text-sm flex flex-col"
  style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
>
```

---

#### 11. `ReportWeeklyPage` StatCard 배경색
**파일**: `src/pages/report/ReportWeeklyPage.tsx`  L284

`StatCard` 컴포넌트가 수치 통계(복용률, 기록률)를 표시하는 정보성 카드임에도 `bg-purple-100`을 사용하고 있다. 정보성 카드는 `bg-white` + `border border-gray-100` + `shadow-[...]` 패턴을 따라야 한다.

```tsx
// 현재 (불일치)
<div className={`bg-purple-100 shadow-[...] p-3 rounded-2xl`}>

// 수정 후
<div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] p-3 rounded-2xl">
```

---

#### 12. `MedicationListPage` — 지난 약 카드 border 누락
**파일**: `src/pages/medication/MedicationListPage.tsx`

과거 복용 중단 약 카드가 `bg-gray-100 shadow-[...]`만 사용하고 `border`가 없다. 정보성 카드는 배경색 + 그림자 + 테두리를 함께 사용해야 한다. 단, 이 카드는 "비활성" 상태를 표현하기 위해 `bg-gray-100`을 사용하는 것이므로, `bg-gray-100 border border-gray-200`으로 테두리를 추가하는 것이 적절하다.

---

#### 13. 카드 그림자 혼용
여러 파일에서 표준 그림자 값과 다른 그림자를 사용하고 있다.

| 표준 | `shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px]` |
|------|--------------------------------------------------|
| 혼용 | `shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px]` |

혼용 파일:
- `src/pages/journal/JournalFullPage.tsx`
- `src/pages/journal/JournalTimelinePage.tsx`
- `src/pages/journal/JournalCalendarPage.tsx`
- `src/pages/journal/JournalTagsPage.tsx`
- `src/pages/counseling/CounselingPreparePage.tsx`
- `src/pages/counseling/CounselingResultPage.tsx`
- `src/pages/counseling/CounselingAddPage.tsx`

두 shadow 값 중 하나로 전체 통일이 필요하다. Guidelines.md는 `5px 18px`을 명시하나 `4px 14px` 이중 shadow도 시각적으로 우수하므로, 가이드라인을 갱신하거나 혼용 파일을 수정해야 한다.

---

### P3 — 개선 권장 (품질 향상)

#### 14. Section Header 색상 불일치
가이드라인은 섹션 제목에 `text-sm font-bold text-gray-900`을 지정하지만, 여러 파일에서 `text-gray-600` 또는 `text-gray-800`을 사용하고 있다.

| 파일 | 라인 | 현재 클래스 |
|------|------|-------------|
| `CounselingPreparePage.tsx` | L127 | `font-bold mb-[6px] text-gray-600` |
| `CounselingResultPage.tsx` | L460 | `font-bold text-gray-800 mb-2` |
| `ReportWeeklyPage.tsx` | L237 | `font-bold text-gray-600` |
| `MyPage.tsx` | L169 | `font-bold text-gray-600 text-xs` |
| `NotificationSettingsPage.tsx` | L150 | `font-bold text-gray-600 text-xs` |

---

#### 15. `Onboarding4Page` 선택 칩 색상
**파일**: `src/pages/onboarding/Onboarding4Page.tsx`

ASRS 점수 선택 버튼의 선택 상태에 `bg-purple-500 text-white`를 사용하고 있다. 선택된 칩 패턴은 `bg-purple-100 border border-[rgb(185,166,255)] text-purple-800`이 표준이다.

---

#### 16. `CounselingListPage` TabBar active 미지정
**파일**: `src/pages/counseling/CounselingListPage.tsx`  L83

```tsx
<TabBar />  // active prop 없음
```

다른 탭 루트 페이지는 `<TabBar active="일지" />` 형태로 active 탭을 명시한다.

---

#### 17. Hero 카드 radius 불일치
**파일**: `src/pages/counseling/CounselingPreparePage.tsx`  L116

상담 정보 히어로 카드가 `rounded-[1.375rem]`을 사용하지만, 표준 Hero CTA 카드는 `rounded-[1.75rem]` 또는 상세 화면 기준 `rounded-[1.625rem]`을 사용한다.

---

#### 18. `EmptyCalendarPage` 그라디언트 색상 불일치
**파일**: `src/pages/empty/EmptyCalendarPage.tsx`  L89

```tsx
// 현재 (불일치)
style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(255, 250, 240) 80%)' }}
```

`rgb(255, 250, 240)`는 크림/웜톤으로, 화면 배경인 `gray-50 (rgb(249,250,251))`과 다른 색상이다.

---

## 전체 화면 상태 표

| 화면 | 파일 | bg | TopBar | TabBar | 폰트 | CTA 색상 | 상태 |
|------|------|----|--------|--------|------|----------|------|
| SplashPage | auth/ | bg-purple-100 ✅ | 없음 ✅ | 없음 ✅ | ✅ | bg-gray-900 ⚠️ | ✅ |
| LoginPage | auth/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-gray-900 ⚠️ | ⚠️ P2 |
| SignupPage | auth/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-gray-900 ⚠️ | ⚠️ P2 |
| ResetPassword1Page | auth/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-gray-900 ⚠️ | ⚠️ P2 |
| ResetPassword2Page | auth/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | 없음 | ✅ |
| ResetPassword3Page | auth/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-gray-900 ⚠️ | ⚠️ P2 |
| VerifyEmailPage | auth/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ✅ |
| Onboarding1Page | onboarding/ | bg-purple-100 ✅ | 없음 ✅ | 없음 ✅ | ✅ | bg-gray-900 ⚠️ | ⚠️ P2 |
| Onboarding2Page | onboarding/ | bg-gray-50 ✅ | OnboardingTopBar ✅ | 없음 ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ✅ |
| Onboarding3Page | onboarding/ | bg-gray-50 ✅ | OnboardingTopBar ✅ | 없음 ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ✅ |
| Onboarding4Page | onboarding/ | bg-gray-50 ✅ | OnboardingTopBar ✅ | 없음 ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ⚠️ P3 |
| Onboarding5Page | onboarding/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-gray-900 ⚠️ | ⚠️ P2 |
| JournalFullPage | journal/ | bg-gray-50 ✅ | TopBar ✅ | TabBar ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ⚠️ P2 |
| JournalTimelinePage | journal/ | bg-gray-50 ✅ | TopBar ✅ | TabBar ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ⚠️ P2 |
| JournalCalendarPage | journal/ | bg-gray-50 ✅ | TopBar ✅ | TabBar ✅ | ✅ | — | ⚠️ P2 |
| JournalTagsPage | journal/ | bg-gray-50 ✅ | TopBar ✅ | TabBar ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ✅ |
| MedicationListPage | medication/ | bg-gray-50 ✅ | TopBar ✅ | TabBar ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ⚠️ P2 |
| MedicationAddPage | medication/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-gray-900 ⚠️ | ⚠️ P2 |
| MedicationAlarmPage | medication/ | bg-gray-950 (특수) | 없음 (잠금화면 모형) | 없음 | ✅ | bg-purple-300 (특수) | ✅ |
| MedicationHistoryPage | medication/ | bg-gray-50 ✅ | TopBar ✅ | TabBar ✅ | ✅ | — | ✅ |
| MedicationInfoPage | medication/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | — | ✅ |
| CalendarMainPage | calendar/ | bg-gray-50 ✅ | ❌ 커스텀 헤더 | TabBar ✅ | ✅ | — | ❌ P1 |
| EventDetailPage | calendar/ | ❌ bg-purple-100 | TopBar ✅ | 없음 ✅ | ✅ | — | ❌ P1 |
| NewEventPage | calendar/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ✅ |
| NewTodoPage | calendar/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ✅ |
| ExternalCalendarPage | calendar/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | — | ✅ |
| ReportWeeklyPage | report/ | bg-gray-50 ✅ | ❌ 커스텀 헤더 | TabBar ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ❌ P1 |
| ReportMonthlyListPage | report/ | bg-gray-50 ✅ | TopBar ✅ | TabBar ✅ | ✅ | — | ✅ |
| ReportMonthlyDetailPage | report/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | — | ✅ |
| CounselingListPage | counseling/ | bg-gray-50 ✅ | TopBar ✅ | TabBar(active 미지정) | ✅ | bg-[rgb(31,27,46)] ✅ | ⚠️ P3 |
| CounselingPreparePage | counseling/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ⚠️ P3 |
| CounselingAddPage | counseling/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-gray-900 ⚠️ | ⚠️ P2 |
| CounselingResultPage | counseling/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ✅ |
| CommunityFeedPage | community/ | bg-gray-50 ✅ | TopBar ✅ | TabBar ✅ | ❌ 누락 | bg-[rgb(31,27,46)] ✅ | ⚠️ P2 |
| CommunityPostPage | community/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ✅ |
| CommunityWritePage | community/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ✅ |
| MyPage | settings/ | ❌ bg-gray-100 | TopBar ✅ | TabBar ✅ | ✅ | bg-purple-500 ⚠️ | ⚠️ P2 |
| NotificationSettingsPage | settings/ | ❌ bg-gray-100 | TopBar ✅ | 없음 ✅ | ✅ | — | ⚠️ P2 |
| WithdrawPage | settings/ | bg-gray-50 ✅ | TopBar ✅ | 없음 ✅ | ✅ | bg-gray-900 ⚠️ | ⚠️ P2 |
| EmptyJournalPage | empty/ | bg-gray-50 ✅ | TopBar ✅ | TabBar ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ✅ |
| EmptyMedicationPage | empty/ | bg-gray-50 ✅ | TopBar ✅ | TabBar ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ✅ |
| EmptyCalendarPage | empty/ | bg-gray-50 ✅ | ❌ 커스텀 헤더 | TabBar ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ❌ P1 |
| EmptyReportPage | empty/ | bg-gray-50 ✅ | ❌ 커스텀 헤더 | TabBar ✅ | ✅ | bg-[rgb(31,27,46)] ✅ | ❌ P1 |

---

## 수정 작업 우선순위 요약

### P1 — 5건 (즉시)
1. `CalendarMainPage` — `<TopBar>` 적용
2. `EventDetailPage` — `bg-gray-50`로 변경
3. `ReportWeeklyPage` — `<TopBar>` 적용
4. `EmptyCalendarPage` — `<TopBar>` 적용
5. `EmptyReportPage` — `<TopBar>` 적용 + 하드코딩 데이터 연동

### P2 — 8건 (다음 스프린트)
6. 9개 파일의 Primary CTA `bg-gray-900` → `bg-[rgb(31,27,46)]` 통일
7. `MyPage` + `NotificationSettingsPage` 배경 `bg-gray-100` → `bg-gray-50`
8. `MyPage` 프로필 저장 버튼 `bg-purple-500` → `bg-[rgb(31,27,46)]` 또는 보조 행동으로 재설계
9. `CommunityFeedPage` 루트 div에 NanumSquare 인라인 스타일 추가
10. `ReportWeeklyPage` `StatCard` `bg-purple-100` → `bg-white border border-gray-100`
11. `MedicationListPage` 지난 약 카드에 `border border-gray-200` 추가
12. 카드 그림자 값 전체 통일 (`5px 18px` 또는 `4px 14px` 이중 shadow 중 선택 후 가이드라인 업데이트)

### P3 — 5건 (이후)
13. Section Header 제목 색상 `text-gray-600` → `text-gray-900` 통일
14. `Onboarding4Page` 선택 칩 색상 `bg-purple-500` → `bg-purple-100 border border-[rgb(185,166,255)] text-purple-800`
15. `CounselingListPage` `<TabBar active="상담" />` active 지정
16. `CounselingPreparePage` 히어로 카드 radius `rounded-[1.375rem]` → `rounded-[1.625rem]`
17. `EmptyCalendarPage` 그라디언트 종료 색상 `rgb(255,250,240)` → `rgb(249,250,251)`

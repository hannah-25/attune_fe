# 정적 목업 → 실제 프로젝트 전환 체크리스트

각 항목은 실제 API 연동, 동적 계산, 또는 컴포넌트 리팩토링으로 교체 필요.

---

## 1. 스켈레톤 플레이스홀더

실제 콘텐츠 대신 넣어둔 `bg-purple-50` / `bg-gray-100` 막대 div. 실제 데이터 렌더링으로 교체.

| 파일 | 설명 |
|------|------|
| `pages/community/CommunityPostPage.tsx` | 본문 스켈레톤 5줄 |
| `pages/community/CommunityWritePage.tsx` | 제목 + 본문 4줄 |
| `pages/calendar/EventDetailPage.tsx` | 메모 영역 스켈레톤 |
| `pages/calendar/NewEventPage.tsx` | 제목/시간 스켈레톤 |
| `pages/counseling/CounselingPreparePage.tsx` | 자동 요약 내용, 목표 입력 스켈레톤 |
| `pages/counseling/CounselingResultPage.tsx` | 의사 조언 스켈레톤 |
| `pages/medication/MedicationInfoPage.tsx` | 효능 설명 스켈레톤 |
| `pages/empty/EmptyCalendarPage.tsx` | 빈 화면 더미 막대 |

---

## 2. 하드코딩된 날짜 / 시간

`new Date()` 기반 동적 계산으로 교체.

| 파일 | 하드코딩 값 |
|------|------------|
| `pages/calendar/CalendarMainPage.tsx` | `5월`, 날짜 그리드 1–31 고정 |
| `pages/calendar/EventDetailPage.tsx` | `5월 13일 화 · 14:00 — 14:40` |
| `pages/calendar/NewEventPage.tsx` | `5월 13일 화 14:00`, `15:00` |
| `pages/home/HomeCalendarPage.tsx` | `5월`, 주간 날짜 12–18 고정 |
| `pages/journal/JournalFullPage.tsx` | `5월 13일 화` |
| `pages/journal/JournalCalendarPage.tsx` | `2026년 5월`, `5/12 월` ~ `5/10 토` |
| `pages/journal/JournalTimelinePage.tsx` | `5월 13일 화 · 6번째 기록` |
| `pages/counseling/CounselingPreparePage.tsx` | `5월 16일 금 14:00까지` |
| `pages/counseling/CounselingListPage.tsx` | `5월 16일 금`, `4월 16일 금`, `3월 19일 금`, `2월 20일 금` |
| `pages/medication/MedicationAlarmPage.tsx` | `화요일, 5월 13일`, `12:30` |
| `pages/medication/MedicationHistoryPage.tsx` | `5월 13일 화`, `5월 12일 월`, `5월 11일 일` |
| `pages/medication/MedicationAddPage.tsx` | `2026.02.03` (복용 시작일) |
| `pages/report/ReportMonthlyDetailPage.tsx` | `2026년 4월` |
| `pages/report/ReportMonthlyListPage.tsx` | `2026년 5월/4월/3월/2월` |
| `pages/report/EmptyReportPage.tsx` | `5/12 — 5/18` |
| `pages/community/CommunityNoticePage.tsx` | `5월 10일`, `5월 9일`, `5월 2일`, `4월 28일`, `4월 15일` |
| `pages/community/CommunityFeedPage.tsx` | `2시간 전`, `5시간 전`, `어제`, `2일 전` |
| `pages/community/CommunityPostPage.tsx` | `2시간 전` |

---

## 3. 하드코딩된 수치 / 통계

API에서 받은 동적 값으로 교체.

| 파일 | 하드코딩 값 |
|------|------------|
| `pages/home/HomeListPage.tsx` | 복용률 `71%`, `86%`, 일지 `3/6`, 인사이트 `+24%` |
| `pages/medication/MedicationListPage.tsx` | 카운트다운 `2:14` (실시간 아님) |
| `pages/medication/MedicationHistoryPage.tsx` | 복용률 `86%`, 복용 `52`회, 미복용 `8`, 미루기 `3` |
| `pages/report/ReportWeeklyPage.tsx` | 복용률 `86%` / `+12%`, 감정 `6.4` / `+0.8`, 실수 `4번` / `-2`, 수면 `72%` / `+5%` |
| `pages/report/ReportMonthlyDetailPage.tsx` | 복용 `92%`, 기록 `24일`, 감정 `+0.8` |
| `pages/counseling/CounselingPreparePage.tsx` | 복용 `88%`, 감정 `6.2`, 실수 `7회` |
| `pages/counseling/CounselingListPage.tsx` | `D-3` (상담 대기일) |
| `pages/community/CommunityFeedPage.tsx` | 공감 `12`/`24`/`7`/`18`/`9`, 댓글 `8`/`14`/`3`/`22`/`5` |
| `pages/community/CommunityPostPage.tsx` | 공감 `12`, 댓글 `8` |
| `pages/settings/MyPage.tsx` | `attune 14주차`, `기록 124일` |
| `pages/settings/WithdrawPage.tsx` | `일지 기록 124일`, `리포트 12개` |

---

## 4. 하드코딩된 사용자 / 약물 데이터

사용자 프로필 및 처방 데이터를 API에서 받아 렌더링.

| 파일 | 하드코딩 값 |
|------|------------|
| `pages/settings/MyPage.tsx` | `main@gmail.com` (더미 이메일) |
| `pages/medication/MedicationListPage.tsx` | `콘서타 18mg · 12:30`, `메틸페니데이트 · 2월 3일~`, `아토목세틴 · 4월 1일~`, `아데랄 10mg` |
| `pages/medication/MedicationAddPage.tsx` | `콘서타 18mg`, `18mg · 1정`, 알림 `08:00 / 12:30` |
| `pages/medication/MedicationInfoPage.tsx` | `콘서타 18mg`, `메틸페니데이트 · 서방형`, 부작용 목록 |
| `pages/medication/MedicationAlarmPage.tsx` | `콘서타 18mg 복용 시간이에요`, `오후 12:30에 1정 복용` |
| `pages/medication/MedicationHistoryPage.tsx` | `08:00 콘서타 18mg` |
| `pages/counseling/CounselingListPage.tsx` | `콘서타 18mg`, `처방 유지`, `용량 조정 18 → 27mg 검토`, `청담심리상담센터` |
| `pages/counseling/CounselingResultPage.tsx` | `청담심리상담센터`, 처방 변경 내역 |

---

## 5. 목업 전용 구조 (로직 리팩토링 필요)

| 파일 | 이슈 | 교체 방향 |
|------|------|----------|
| `pages/journal/JournalFullPage.tsx` | `initialSections` 배열 하드코딩 | API 쿼리로 태그/섹션 로드 |
| `pages/journal/JournalTimelinePage.tsx` | `initialEntries` 정적 배열 | 날짜별 일지 API로 교체 |
| `pages/journal/JournalCalendarPage.tsx` | `dayRecords` 객체 하드코딩 | 기록 API 응답으로 동적 렌더링 |
| `pages/calendar/CalendarMainPage.tsx` | 날짜 그리드 `gridArea` 수동 지정 | `date-fns` 등으로 동적 생성 |
| `pages/report/ReportWeeklyPage.tsx` | 차트를 Firebase SVG 이미지로 렌더 | Recharts 등 실제 차트 라이브러리 |
| `pages/community/CommunityFeedPage.tsx` | 카테고리 필터 탭에 실제 필터링 로직 없음 | 필터 상태 관리 + API 파라미터 연동 |
| `pages/medication/MedicationListPage.tsx` | 복용 카운트다운 하드코딩 | 실시간 `setInterval` 타이머로 교체 |

---

## 6. 임시 로딩 UI

| 파일 | 내용 | 교체 방향 |
|------|------|----------|
| `pages/community/CommunityFeedPage.tsx` | CSS `animate-spin` 스피너 | Intersection Observer 기반 무한 스크롤 트리거로 교체 |

---

## 7. Firebase Storage 아이콘 URL

현재 모든 아이콘이 외부 Firebase Storage URL로 로드됨. 실제 배포 전 자체 서버/CDN으로 이관 필요.

- 패턴: `storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F...`
- 영향 파일: 거의 전 페이지 (~50건 이상)
- 교체 방향: `/assets/icons/` 정적 경로 또는 SVG 컴포넌트화

---

## 우선순위

| 순위 | 항목 | 이유 |
|------|------|------|
| 🔴 즉시 | 스켈레톤 플레이스홀더 | 실제 데이터 없으면 화면이 빈 막대로 보임 |
| 🔴 즉시 | 목업 전용 구조 (정적 배열) | 기능 자체가 동작 안 함 |
| 🟠 단기 | 하드코딩 날짜 / 통계 / 사용자 데이터 | API 연동 후 자동 해결 |
| 🟡 중기 | 차트 SVG → 라이브러리 | 데이터 시각화 실제 반영 필요 |
| 🟢 배포 전 | Firebase Storage URL 이관 | 외부 의존성 제거 |

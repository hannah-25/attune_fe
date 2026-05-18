# 인터랙티브 UI 개선 플랜

## 완료된 작업

- [x] `ScrollArea` Safari flex+scroll padding-bottom 버그 수정 및 실제 DOM 스페이서(`h-[200px]`)로 교체
- [x] `SplashPage` 버튼 tap 효과 + navigate 연결
- [x] `Onboarding2Page` textarea text-base, 글자수 reactive, 다음 disabled(<50자)
- [x] `LoginPage` / `SignupPage` 상태 연결, text-base, 네비게이션
- [x] `HomeListPage` 전체보기 4개 + 일지카드 + 인사이트카드 navigate
- [x] `CounselingListPage` + 버튼 제거, 버튼 네비게이션
- [x] `MedicationListPage` 토글, 삭제, + 버튼 navigate
- [x] `CommunityFeedPage` 필터, 좋아요, 글쓰기 FAB
- [x] `ReportWeeklyPage` 주간 뷰 전환
- [x] `JournalFullPage` 화면 및 생각 추가, 태그 input text-base
- [x] `JournalTimelinePage` 태그 input text-base
- [x] `EmptyMedicationPage` + 버튼 + CTA navigate
- [x] `TopBar.HeaderIconButton` onClick prop 추가

---

## 구현 완료 작업

### ~~1. ResetPassword1Page~~ 완료
### ~~2. ResetPassword2Page~~ 완료
### ~~3. ResetPassword3Page~~ 완료
### ~~4. Onboarding1Page~~ 완료

### ~~5. Onboarding3Page - ASRS 자가 체크~~ 완료
**파일:** `src/pages/onboarding/Onboarding3Page.tsx`
- [x] 각 문항 응답 버튼 인터랙티브: `useState<Record<string, number>>({})` 로 문항별 선택값 관리
- [x] 선택된 버튼: `bg-purple-500 text-white`, 미선택: `bg-purple-50 text-purple-600`
- [x] 모든 버튼 `type="button"`, `active:scale-[0.95]`
- [x] "다음" 버튼: `type="button"`, navigate to `/onboarding/4`, 전체 응답 전 disabled

### ~~6. Onboarding4Page - 변화 목표 선택~~ 완료
**파일:** `src/pages/onboarding/Onboarding4Page.tsx`
- [x] 목표 칩들: `useState<Set<string>>`로 다중 선택 관리
- [x] 선택됨 `bg-purple-500 text-white` + X 버튼 표시 / 미선택 `bg-gray-100 text-gray-700`
- [x] 모든 칩 `button` 요소, `type="button"`, `active:scale-[0.97]`
- [x] "직접입력" 칩 클릭 시 input 출현
- [x] "다음" 버튼: `type="button"`, navigate to `/onboarding/5`, 1개 이상 선택 필요

### ~~7. Onboarding5Page - 온보딩 완료~~ 완료
**파일:** `src/pages/onboarding/Onboarding5Page.tsx`
- [x] "앱으로 가기" `div` -> `button`, `type="button"`, `active:scale-[0.97]`, navigate to `/home`

### ~~8. JournalTagsPage - 태그 관리~~ 완료
**파일:** `src/pages/journal/JournalTagsPage.tsx`
- [x] 카테고리 탭(감정·증상, 부작용, 업무, 목표): `useState` active tab, `button` 요소
- [x] 태그 행의 "비활성"/"활성" 텍스트를 `button` 요소로 전환, 클릭 시 상태 토글
- [x] "새 태그" FAB: `button` 요소
- [x] TopBar 우측 "완료" 버튼: `button` 요소로 navigate back
- [x] TopBar 좌측 back 아이콘: navigate back

### ~~9. MedicationHistoryPage - 복용 이력 기간 필터~~ 완료
**파일:** `src/pages/medication/MedicationHistoryPage.tsx`
- [x] 기간 탭(1주, 1개월, 3개월, 직접): `useState<'1주'|'1개월'|'3개월'|'직접'>('1개월')` 관리
- [x] 선택됨 `bg-[rgb(31,27,46)] text-white` / 미선택 `bg-white`
- [x] 각 기간별 통계 데이터 분리 (`STATS_MAP`) 및 active 기간 기준 렌더
- [x] 모든 탭 `button` 요소, `type="button"`

---

## 검증

- [x] `pnpm.cmd run build`

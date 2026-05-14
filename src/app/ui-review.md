# Attune FE — UI 원칙 검토 보고서

검토 기준: **Refactoring UI** (시각적 계층, 색상은 보조 수단, 간격 일관성, 장식 최소화)
+ **Practical UI** (명확성, 피드백, 일관성, 오류 방지, 효율성)

---

## 공통 수정 원칙 (적용 기준)

| 역할 | 클래스 |
|------|--------|
| Primary CTA | `bg-[rgb(31,27,46)] text-white` |
| Secondary CTA | `bg-purple-500 text-white` |
| Tertiary / 비활성 버튼 | `bg-purple-100 border-purple-200 text-purple-800` or outlined |
| 선택된 칩 | `bg-purple-500 text-white border-transparent` |
| 비선택 칩 | `bg-purple-100 text-purple-800 border-transparent` |
| 파괴적 행동 | `bg-red-500 text-white` |

---

## 섹션별 검토 결과

### OnboardingSection

| 심각도 | 위치 | 문제 | 수정 |
|--------|------|------|------|
| 🟠 High | INIT-002/003/004 "다음" 버튼 | `bg-purple-100` — 비활성화된 것처럼 보여 클릭을 유도하지 못함 | → `bg-[rgb(31,27,46)] text-white` |

### HomeSection

| 심각도 | 위치 | 문제 | 수정 |
|--------|------|------|------|
| 🟡 Medium | 캘린더 타임라인 이벤트 카드 | 모두 `bg-purple-100` — 배경과 구분이 어렵고 이벤트 유형 구분 불가 | → `bg-white` (shadow로 부각) |

### JournalSection

| 심각도 | 위치 | 문제 | 수정 |
|--------|------|------|------|
| 🟠 High | 범례 (부작용/업무/좋은 날) | 세 카테고리 모두 `bg-purple-300` — 시각적으로 구분 불가 | 부작용 → `rgb(255,140,80)`, 업무 → `rgb(80,140,220)`, 좋은 날 → `rgb(80,190,130)` |
| 🟠 High | 태그 선택/비선택 상태 | 선택: `bg-purple-100 border-[rgb(185,166,255)]` — 비선택과 거의 동일한 외관 | 선택 → `bg-purple-500 text-white`, 비선택 → `bg-purple-100 text-purple-800` |
| 🟡 Medium | 태그 관리 "비활성" 레이블 | `text-[rgb(185,166,255)]` — 연한 보라색으로 의미 전달 모호 | → `text-gray-400` |

### ReportSection

| 심각도 | 위치 | 문제 | 수정 |
|--------|------|------|------|
| 🟡 Medium | 변화율 지표 (+12%, -2, +5%) | 일부는 `text-[rgb(185,166,255)]`, 일부는 `text-purple-500` — 동일 의미에 다른 색 | → 모두 `text-purple-500` 통일 |
| 🟡 Medium | 월간 히트맵 색상 | 초록 계열(`rgba(125,200,169,...)`) — 앱 전체 퍼플 팔레트 이탈 | → purple scale (`bg-purple-100/200/300/500`) |

### SettingsSection

| 심각도 | 위치 | 문제 | 수정 |
|--------|------|------|------|
| 🔴 Bug | 탈퇴 확인 화면 두 번째 버튼 | `<span className="block"></span>` — 빈 레이블 | → `"계속 사용하기"` |
| 🟠 High | "회원 탈퇴" 목록 항목 | `text-[rgb(185,166,255)]` — 파괴적 행동인데 경고 색 없음 | → `text-red-500` |
| 🟠 High | "탈퇴 신청" 버튼 | `bg-purple-300 text-purple-800` — 비활성처럼 보임, 경고 없음 | → `bg-red-500 text-white` |
| 🟡 Medium | 알림 토글 ON 상태 | `bg-purple-300` — OFF(`bg-purple-50`)와 구분이 약함 | → `bg-purple-500` |

### CalendarSection

| 심각도 | 위치 | 문제 | 수정 |
|--------|------|------|------|
| 🟡 Medium | CAL-003 카테고리 칩 선택 상태 | 선택/비선택 모두 `bg-purple-100` + border만 차이 — 거의 동일 | 선택 → `bg-purple-500 text-white`, 비선택 → `bg-purple-100 text-purple-700` |
| 🟢 Low | 상단 바 "저장" 버튼 | `text-purple-500` 텍스트만 — 시각적 무게 부족 | → `bg-purple-500 text-white px-3 py-1 rounded-lg` |

### CounselingSection

| 심각도 | 위치 | 문제 | 수정 |
|--------|------|------|------|
| 🟡 Medium | CNS-003 "증량" vs "유지" 배지 | 두 상태가 시각적으로 동일 — 의미 구분 불가 | 증량 → `bg-purple-500 text-white`, 유지 → `bg-purple-100 text-purple-800` |
| 🟢 Low | 상단 바 "저장" 버튼 | `text-purple-500` 텍스트만 | → `bg-purple-500 text-white px-3 py-1 rounded-lg` |

### CommunitySection

| 심각도 | 위치 | 문제 | 수정 |
|--------|------|------|------|
| 🟡 Medium | 새 글 화면 카테고리 칩 | 선택/비선택 구분 약함 | 선택 → `bg-purple-500 text-white`, 비선택 → `bg-purple-100 text-purple-700` |
| 🟢 Low | 상단 바 "발행" 버튼 | `text-purple-500` 텍스트만 | → `bg-[rgb(31,27,46)] text-white px-3 py-1 rounded-lg` |

### EmptyStatesSection

| 심각도 | 위치 | 문제 | 수정 |
|--------|------|------|------|
| 🟠 High | "약 추가하기" CTA | `bg-purple-300 text-purple-800` — 대비 부족, 비활성처럼 보임 | → `bg-[rgb(31,27,46)] text-white` |
| 🟠 High | 일지/캘린더 CTA 버튼 | `bg-purple-500 text-purple-800` — 대비 불충분 (WCAG 실패) | → `bg-purple-500 text-white` |
| 🟢 Low | "Google 캘린더 연동하기" | 스타일 없는 bare text — 클릭 가능 요소처럼 보이지 않음 | → `border border-gray-300 text-gray-700 rounded-full px-5 py-2` |

---

## 심각도별 요약

| 심각도 | 건수 | 내용 |
|--------|------|------|
| 🔴 Bug | 1 | 빈 버튼 레이블 |
| 🟠 High | 7 | 주요 CTA 색상 문제, 파괴적 행동 경고 미흡, 상태 구분 불가 |
| 🟡 Medium | 7 | 선택 상태 불명확, 팔레트 이탈, 색상 불일치 |
| 🟢 Low | 4 | 텍스트 전용 버튼, 보조 링크 스타일 미흡 |

모든 항목 수정 완료.

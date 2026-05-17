# a.tune — 프로젝트 컨텍스트

ADHD 약물 복용 추적 및 일지 앱 (모바일 웹, React + Tailwind).

---

## 기술 스택

- React 18 + TypeScript
- Tailwind CSS (유틸리티 클래스 중심)
- React Router (SPA, `<AppViewport>` 래퍼)
- MUI, Radix UI (일부 컴포넌트)
- 폰트: `NanumSquare` (모든 화면 공통, inline style로 적용)

---

## 프로젝트 구조

```
src/
  app/
    App.tsx                  # 라우트 정의 (모든 페이지 등록)
    components/
      AppViewport.tsx        # 모바일 뷰포트 래퍼 (전체 화면 셸)
      TabBar.tsx             # 하단 탭바 공통 컴포넌트 (variant: main/report/counseling)
      TopBar.tsx             # 상단 바 공통 컴포넌트
  pages/
    auth/                    # 스플래시, 로그인, 회원가입, 비밀번호 재설정, 이메일 인증
    onboarding/              # 1~5단계 온보딩
    home/                    # 홈 리스트 / 캘린더 뷰
    journal/
      JournalFullPage.tsx    # 일지 전체 입력 (태그 선택 + 목표 슬라이더 + 메모)
      JournalTimelinePage.tsx # 오늘 일지 타임라인
      JournalCalendarPage.tsx # 일지 캘린더
      JournalTagsPage.tsx    # 태그 관리
    medication/              # 약 목록, 추가, 알람, 정보, 복용 이력
    calendar/                # 캘린더 메인, 이벤트 상세/추가, 외부 캘린더 연동
    report/                  # 주간/월간 리포트
    counseling/              # 상담 목록, 준비, 결과
    community/               # 피드, 글 상세, 작성
    settings/                # 마이페이지, 알림 설정, 탈퇴
    empty/                   # 빈 상태 화면 (일지/약/캘린더/리포트/커뮤니티)
guidelines/
  Guidelines.md              # 디자인 원칙 (핵심 기준)
  Patterns.md                # 레이아웃 유형 + 공통 UI 패턴
  GitWorkflow.md             # 브랜치/커밋/PR 정책
```

---

## 라우트 구조

| 경로 | 화면 |
|------|------|
| `/` | IndexPage (개발용 링크 목록) |
| `/splash` | 스플래시 |
| `/login` | 로그인 |
| `/signup` | 회원가입 |
| `/onboarding/1~5` | 온보딩 단계 |
| `/home` | 홈 리스트 |
| `/journal` | 일지 전체 입력 |
| `/journal/timeline` | 오늘 일지 타임라인 |
| `/journal/calendar` | 일지 캘린더 |
| `/journal/tags` | 태그 관리 |
| `/medication` | 약 목록 |
| `/calendar` | 캘린더 |
| `/report` | 주간 리포트 |
| `/counseling` | 상담 |
| `/community` | 커뮤니티 피드 |
| `/settings` | 마이페이지 |

---

## 디자인 원칙 요약

> 전체 원칙은 `guidelines/Guidelines.md`와 `guidelines/Patterns.md`를 따른다.

### 카드 배경 구분 규칙
- **정보성 카드** (복용 완료, 식사 체크 등): `bg-white border border-gray-100 shadow-[...]`
- **강조 카드** (감정, 부작용, 업무 이벤트 등): `bg-purple-50 shadow-[...]`
- 배경색 하나만으로 구분하지 않는다. 색상 + 그림자 + 테두리를 함께 사용.

### 버튼 색상 체계
| 역할 | 클래스 |
|------|--------|
| Primary CTA | `bg-[rgb(31,27,46)] text-white` |
| Secondary CTA | `bg-purple-500 text-white` |
| 선택된 칩 | `bg-purple-100 border border-[rgb(185,166,255)] text-purple-800` |
| 비선택 칩 | `bg-transparent border-transparent text-gray-700` |
| 파괴적 행동 | `bg-red-500 text-white` |

### 타임라인 카드 패턴 (`/journal/timeline`)
- 타임스탬프 라벨(절대 시간)과 카드 내부에 상대 시간을 함께 표시하지 않는다.
- 카드 내 카테고리명과 중복되는 상태 텍스트는 제거한다 (예: "복용 완료" 제거).
- 태그 칩은 기록된 사실을 나타내므로 선택됨 스타일로 표시.

### 공통 레이아웃
- 화면 배경: `bg-gray-50`
- 탑바: `pt-1 pr-3 pb-[10px] pl-3` + 좌우 `w-11 h-11` 버튼 영역
- 탑바 타이틀: `font-bold text-base` 절대 중앙 정렬 (`absolute left-[50%] translate-x-[-50%]`)
- 탭바: `<TabBar active="탭명" />` 컴포넌트 사용, 직접 재정의 금지
- 스크롤 영역: `grow min-h-0 overflow-y-auto overscroll-contain basis-[0%]`

---

## Git 정책

- 기본 브랜치: `develop`
- `develop`에 직접 커밋 금지. 새 브랜치 → PR → 머지.
- 브랜치명: `feat/`, `refactor/`, `fix/`, `docs/`, `chore/` 접두사
- 커밋 메시지: `feat:`, `fix:`, `refactor:` 등 접두사 + 결과 중심 설명

---

## 개발 주의사항

- 모든 페이지에 `style={{ fontFamily: "NanumSquare, ..." }}` 인라인 스타일 적용.
- `TabBar` 컴포넌트는 `absolute` 포지션으로 하단에 고정됨. 스크롤 영역 `pb-[100px]` 이상 확보.
- 이미지 에셋은 Firebase Storage URL 사용 (외부 URL, 수정 금지).
- `검정 버튼(bg-[rgb(31,27,46)])` 은 최종 확정 행동(저장, 제출, 완료, 기록)에만 사용.

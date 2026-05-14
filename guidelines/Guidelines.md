# a.tune Design Guidelines

회원가입, 인증·로그인, 온보딩 화면에서 확정한 디자인 원칙을 정리한다. 이후 모든 화면에 이 규칙을 우선 적용한다.

---

## Core Principle

- 한 화면의 주 행동은 하나만 강하게 강조한다.
- 검정 버튼은 사용자가 지금 완료해야 하는 핵심 CTA에만 사용한다.
- 보조 행동은 텍스트 링크, 연한 버튼, 아이콘 버튼으로 낮춘다.
- 입력 화면과 상태 화면의 레이아웃을 분리한다.
- 같은 성격의 화면은 같은 y축 시작점, 같은 버튼 높이, 같은 입력창 구조를 사용한다.
- 명백한 설명 문구는 제거하고, 상태와 대상 정보만 남긴다.
- 텍스트 계층은 크기·굵기·색상의 차이를 과감하게 벌린다. 2px 차이는 계층이 아니다.

---

## Typography

- 기본 폰트는 `NanumSquare`를 사용한다.
- 화면 상단 타이틀은 `text-sm font-bold`를 기본으로 한다.
- 입력 화면의 보조 설명은 `text-xs text-gray-600 leading-relaxed`를 사용한다.
- 상태 화면의 핵심 문장은 `text-base font-semibold text-gray-900 leading-tight`를 사용한다.
- 상태 화면의 이메일은 주 대상 정보이므로 `text-xl font-semibold text-gray-900`으로 강하게 표시한다.
- 상태 화면의 설명 문구는 `text-gray-600 leading-relaxed`를 사용한다.
- 완료·시작 화면의 핵심 문장은 `text-xl font-bold text-gray-900`을 사용한다.
- 입력 라벨은 `text-[11px] font-semibold text-gray-500`로 입력창 안에 배치한다.
- letter spacing은 기본값을 유지하고, 과한 장식적 타이포그래피를 피한다.

---

## Screen Types

### Input Screens

대상: 회원가입, 로그인, 비밀번호 재설정 1/3 · 3/3, 온보딩 ASRS · 목표 설정

규칙:
- 상단 바 아래 본문 시작은 `pt-16` 또는 프로그레스바 영역 아래를 기본으로 한다.
- 입력 화면은 좌측 정렬 흐름을 유지한다.
- 설명 문구가 필요하면 입력창 위에 짧게 한 줄로 둔다.
- 입력창과 설명 사이 여백은 `mt-5`를 기본으로 한다.
- 버튼은 입력 묶음 아래 `mt-5` 또는 `mt-6`에 둔다.

### Status Screens

대상: 인증메일 발송 · AUTH-004, 비밀번호 재설정 2/3

규칙:
- 레이아웃은 상단 정렬 (`pt-8`)을 사용한다. 수직 중앙 정렬은 사용하지 않는다.
- 중앙 정렬을 사용한다.
- 구조는 `아이콘 → 이메일 → 설명 → 보조 행동` 순서로 통일한다.
- 아이콘은 배경 박스 없이 `text-purple-600`, `w-16 h-16` 컨테이너에 `w-12 h-12` 아이콘을 사용한다. strokeWidth는 `1.8`로 통일한다.
- 이메일은 `text-xl font-semibold text-gray-900`으로 강하게 표시한다.
- 설명 문구는 `text-gray-600 leading-relaxed mt-5`로 이메일 아래에 둔다.
- `bg-purple-50` 안내 박스는 사용하지 않는다. 일반 텍스트로 처리한다.
- 재발송은 `font-bold text-purple-700 underline`으로, 아웃라인 버튼 사용 금지.
- 보조 액션 계층: `font-bold text-purple-700 underline` > `font-medium text-gray-500 underline` > `font-medium text-gray-400`
- 탈출 링크("로그인으로 돌아가기" 등)는 가장 낮은 계층(`text-gray-400`)에 둔다.

권장 구조:

```tsx
<div className="flex flex-col grow basis-[0%] pt-8 pr-5 pb-4 pl-5">
  <div className="items-center flex flex-col text-center">
    <div className="items-center flex justify-center w-16 h-16 text-purple-600">
      <svg className="w-12 h-12" strokeWidth="1.8">{/* icon */}</svg>
    </div>
    <div className="font-semibold text-gray-900 text-xl leading-tight mt-3">name@example.com</div>
    <p className="text-gray-600 leading-relaxed mt-5">설명 문구</p>
  </div>
  <div className="items-center flex flex-col text-center mt-8 text-xs leading-relaxed">
    <div className="text-gray-600">메일이 오지 않았나요?</div>
    <button className="font-bold text-purple-700 underline mt-1">재발송</button>
  </div>
  <button className="font-medium text-gray-500 text-xs underline mt-3 text-center">변경하기</button>
  <button className="font-medium text-gray-400 text-xs mt-2 text-center">로그인으로 돌아가기</button>
</div>
```

### Splash / Completion Screens

대상: Splash · 시작, 온보딩 진입 · INIT-001, 온보딩 완료 · INIT-005/007

규칙:
- 헤더 타이틀 바를 사용하지 않는다.
- 콘텐츠는 `justify-center`로 수직 중앙 배치하고, `pb-16` 또는 `pb-20`으로 살짝 위로 올린다.
- 구조는 `로고 → 핵심 문장 → 설명 → CTA 버튼` 순서를 기본으로 한다.
- 핵심 문장은 `text-xl font-bold text-gray-900`을 사용한다.
- 설명 문구는 `text-sm text-gray-500 leading-relaxed`를 사용한다.
- CTA 버튼과 설명 사이 여백은 `mt-8`을 기본으로 한다.
- 완료 화면에서 키워드 칩 등 부가 정보를 나열하지 않는다. 깔끔한 전환감을 우선한다.

---

## Onboarding Flow

### 헤더 구조 (INIT-002 ~ 004)

- 상단 풀너비 프로그레스바 (`h-1 bg-purple-50`) + 진행 컬러 (`bg-purple-300` 또는 `bg-purple-500`)
- 프로그레스바 아래 행: `[← 뒤로가기] [제목 + 부제] [n / 4]`
- 뒤로가기 버튼은 `w-11 h-11 rounded-xl text-gray-700 hover:bg-white/60`
- 제목은 `text-sm font-semibold text-gray-900`, 부제는 `text-xs text-gray-600 mt-1`
- 단계 카운터(`n / 4`)는 `text-xs text-gray-600 whitespace-nowrap`으로 우측에 고정
- 화면 내 상세 진행(예: 3 / 18)은 부제에 포함하지 않는다. 카운터와 중복되므로 제거.

### 스플래시 화면 (INIT-001)

- 헤더 타이틀 바 없음. 콘텐츠만 중앙에 배치.
- `justify-center pb-16`으로 수직 중앙 배치.

### 증상 서술 (INIT-002)

- 텍스트에어리어 라벨: `증상 서술`
- 질문 문구: "어떤 어려움을 겪어오셨나요?" (부제로 배치)
- placeholder로 안내 문구 제공 (독립 텍스트 제거)
- 가이드라인은 `bg-purple-50 border-purple-100` 카드 내 아코디언으로 제공
- 가이드라인 카드 내 텍스트/아이콘은 `text-purple-700` 사용
- "집중이 안 됨"보다 구체적인 서술을 유도하는 가이드라인 포함

### ASRS 체크리스트 (INIT-003)

- 경고 문구: "본 검사는 선별 도구로 실제 진단과 다를 수 있습니다. 정확한 진단을 위해 전문의와 상담해 주세요."
- ASRS는 자가 보고식 선별 도구임을 명시한다.

### 목표 설정 (INIT-004)

- 목표는 측정 가능한 구체적 행동으로 제시한다 (예: "집중력 늘리기" ❌ → "한 가지 일을 20분 이상 이어가기" ✅)
- 현재 목표 예시: 한 가지 일을 20분 이상 이어가기 / 해야 할 일을 10분 안에 시작하기 / 약속·일정 10분 전 준비 완료하기 / 하루 5분 주변 정리하기 / 목표 취침·기상 시간 ±1시간 안에 지키기

### 온보딩 완료 (INIT-005/007)

- 키워드 추출 없음. 목표를 그대로 앱에서 사용.
- 완료 화면은 로고 + 핵심 문장 + 앱 기능 요약 + CTA만 표시.
- 앱 기능 요약: "일지 · 복약 · 캘린더 · 리포트로 하루의 작은 변화를 함께 살펴봐요."

---

## Top Bar

- 모바일 화면 내부 상단에는 status bar 아래 앱 바를 둔다.
- 뒤로가기 버튼은 `w-11 h-11`, `rounded-xl`, `text-gray-700`, `hover:bg-white/60`를 사용한다.
- 타이틀은 중앙 정렬한다.
- 오른쪽에는 `w-11 h-11` spacer를 두어 타이틀 중앙을 보정한다.
- 스플래시·완료 화면 등 시작성 화면은 앱 바를 생략한다.

---

## Form Fields

- 입력창 높이는 `h-[54px]`로 통일한다.
- 배경은 `bg-white`, 테두리는 `border-gray-300`을 사용한다.
- radius는 `rounded-xl`을 사용한다.
- 내부 padding은 `px-3`을 기본으로 한다.
- 포커스 상태는 `focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100`를 사용한다.
- 라벨은 입력창 안쪽 상단에 둔다.
- placeholder는 `placeholder:text-gray-400`로 낮춘다.
- 여러 입력창 사이 간격은 `gap-2.5`를 기본으로 한다.

권장 구조:

```tsx
<div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
  <label className="font-semibold text-gray-500 text-[11px] leading-tight">이메일</label>
  <input className="w-full h-6 bg-transparent text-gray-900 text-sm placeholder:text-gray-400 outline-none p-0" />
</div>
```

---

## Buttons

### Primary CTA

- 검정 버튼은 화면의 최종 핵심 행동에만 사용한다.
- 높이는 `h-[46px]`로 통일한다.
- 스타일은 `bg-gray-900 text-white rounded-xl font-bold text-base`를 기본으로 한다.
- 그림자는 약하게만 사용한다: `shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px]`

검정 버튼 대상: 시작하기, 회원가입, 로그인, 재설정 링크 보내기, 비밀번호 변경하기, 홈으로 가기

온보딩 단계 버튼("다음")은 완료되지 않은 중간 단계이므로 `bg-purple-100 border-purple-200 text-purple-800`의 연한 버튼을 사용한다.

### Secondary Actions

- 보조 액션은 `text-gray-600`, `text-purple-700 underline`, 또는 연한 배경 버튼으로 낮춘다.
- 재발송 링크는 `font-bold text-purple-700 underline`을 사용한다.
- 소셜 로그인 버튼은 `w-10 h-10` 원형 버튼으로 유지한다.
- 버튼 문구는 행동 중심으로 쓴다. (예: "변경 완료" ❌ → "변경하기" ✅)

---

## Spacing

- 화면 좌우 padding은 `px-5`를 기본으로 한다.
- 하단 padding은 `pb-4`를 기본으로 한다.
- 입력 화면 본문 시작: `pt-16`
- 상태 화면 본문 시작: `pt-8`
- 스플래시·완료 화면: `justify-center pb-16` 또는 `pb-20`
- 아이콘 → 이메일: `mt-3`
- 이메일 → 설명: `mt-5`
- 설명 → 재발송 안내: `mt-8`
- 입력창 → CTA: `mt-5` 또는 `mt-6`
- 소셜 영역: `mt-auto pt-5`

---

## Color

- 주 CTA: `bg-gray-900`, hover 필요 시 `hover:bg-black`
- 주요 포인트: `purple-600` 또는 `purple-700`
- 포커스 링: `purple-100`
- 본문 배경: `bg-gray-50`
- 시작 화면처럼 브랜드 감성이 필요한 경우에만 `bg-purple-100` 사용
- 구분선은 매우 연하게 사용한다: `bg-purple-50`
- 보조 텍스트는 `text-gray-500` 또는 `text-gray-600`
- 아이콘 컬러: `text-purple-600` (배경 박스 없이 단독 사용)

---

## Content Rules

- 상태 화면에서 "링크를 클릭하면 완료됩니다" 같은 당연한 설명은 제거한다.
- 같은 의미의 문장을 제목과 설명에 반복하지 않는다.
- 한 화면 안에서 진한 텍스트가 연속으로 경쟁하지 않게 한다.
- 버튼 문구는 행동 중심으로 쓴다.
- 링크는 실제로 이동하거나 재요청하는 항목에만 사용한다.
- 목표·가이드라인은 측정 가능하고 구체적인 문장으로 작성한다.
- placeholder와 독립 안내 텍스트를 중복 사용하지 않는다.
- "요즘"처럼 시간 범위를 한정하는 표현을 함부로 쓰지 않는다. ("어릴 때부터"와 충돌 가능)

---

## Sub-screen Top Bar (서브화면 탑바)

탭 루트 화면(일지·복약·캘린더 등)의 탑바 패턴. 홈 대시보드 탑바와 구분된다.

- 좌우 버튼: `w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]`
- 아이콘 크기: `w-4 h-4` (버튼 내부)
- 버튼 터치영역 래퍼: `w-11 h-11` (버튼을 감싸는 투명 영역)
- 중앙 제목: `font-bold text-sm` — 날짜 혹은 화면명
- 좌: 뒤로가기 or 이전 날짜, 우: 앞으로 or 편집/액션 버튼
- 우측에 액션이 없을 경우 `w-11 h-11` 빈 div로 중앙 보정

---

## Tag Chips (태그 칩)

일지 감정·증상·부작용 등 태그 선택 UI 패턴.

| 상태 | 스타일 |
|------|--------|
| 선택됨 | `bg-purple-100 border border-[rgb(185,166,255)] text-purple-800 pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-full` |
| 미선택 | 배경·테두리 없음, 동일 padding, 동일 font |

- 선택된 태그 왼쪽에 체크 아이콘 (`w-[10px] h-[10px]`) 표시
- 태그 그룹 간격: `flex flex-wrap gap-1.5`
- 그룹 헤더: 컬러 dot (`w-[10px] h-[10px] rounded-[0.3125rem]`) + `font-bold` 제목
  - 주요 카테고리(감정·증상): `bg-purple-500`
  - 보조 카테고리(부작용·업무 등): `bg-purple-300`

---

## Home Dashboard (홈 대시보드)

### 탑바

- 로고 (`w-8 h-8`) 왼쪽 고정, 브랜드 워드마크는 탑바에 넣지 않는다.
- 오른쪽: 벨 + 프로필 아바타, 둘 다 `w-8 h-8 rounded-full` 으로 스타일 통일.
- 벨: `bg-white shadow rounded-full`, 프로필: `bg-purple-200 rounded-full`.
- 인사말·날짜는 탑바에 포함하지 않는다.
- 설정·계정 접근은 프로필 아바타 탭으로 일원화. 하단 탭바에 "더보기" 불필요.

### 하단 탭바

- 4개 탭만 사용: 홈 · 일지 · 약 · 캘린더.
- "더보기" 탭 없음 — 설정은 프로필 아바타로 접근.

### 카드 색상 체계

배경과 카드 사이 충분한 명도 차이를 확보한다.

| 역할 | 스타일 |
|------|--------|
| 화면 배경 | `bg-gray-50` |
| 정보성 카드 | `bg-white border border-gray-200` + 강한 그림자 |
| 액션·강조 카드 | `bg-purple-100` + 약한 그림자 |

- 흰색 카드 그림자: `shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px]`
- 보라색 카드 그림자: `shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px]`
- 배경색을 변경하여 카드를 구분하려 하지 않는다. 카드 색상 + 그림자 + 테두리로 해결한다.

### 섹션 헤더

- 스타일: `font-semibold text-sm text-gray-800`
- 오른쪽 링크: `text-xs text-gray-400` — 모든 섹션에서 "전체보기"로 통일.
- "더보기" / "전체보기" 혼용 금지.

### 간격 시스템

- 스크롤 컨테이너: `gap-2` (8px) — 헤더↔카드 기본 간격.
- 섹션 경계: 섹션 헤더에 `mt-3` 추가 → 총 20px으로 섹션 간 분리.
- 컨테이너 좌우 패딩: `pr-4 pl-4`.

### 통계 카드 (주간 통계)

- 라벨: `text-[10px] text-gray-500 leading-tight`
- 값: `font-bold text-lg text-gray-900` (NanumSquare)
- 패딩: `pt-2.5 px-3 pb-2.5`, `text-center`

### 일지 배지 (오늘 할일 섹션)

- `bg-purple-100 px-4 py-3 rounded-2xl`
- 제목: `font-semibold text-sm text-gray-800`
- 카테고리 태그: `text-[11px] text-purple-600`
- 오른쪽: 편집 아이콘 `w-8 h-8 bg-purple-200 rounded-full text-purple-700`

### 체크리스트

- 완료 항목: `w-4 h-4 bg-purple-300 rounded-full` 체크 아이콘 + `text-xs text-gray-400 line-through`
- 미완료 항목: `w-4 h-4 border border-gray-300 rounded-full` + `text-xs text-gray-700`
- 항목 간격: `gap-2`

### 예정 일정 카드

- 날짜 열: `text-[11px] w-[34px]` — 오늘 `text-purple-500`, 그 외 `text-gray-400`
- 색상 점: `w-2 h-2 rounded-full` — 오늘 `bg-purple-500`, 그 외 `bg-purple-300`
- 일정명: `font-semibold text-xs text-gray-800`
- 시간: `text-[10px] text-gray-400`
- 구분선: `border-t border-gray-100`

### 인사이트 카드

- `bg-purple-100 px-4 py-3 rounded-[1.375rem]`, 가로 flex 레이아웃.
- 왼쪽 아이콘: `w-9 h-9 bg-purple-200 rounded-xl` + 트렌드 라인 아이콘 (`text-purple-600`).
- 제목: `font-bold text-xs text-gray-900`, 핵심 수치는 `text-purple-600`으로 강조.
- 부제: `text-[10px] text-gray-500 mt-1`
- 오른쪽: 꺽쇠 아이콘 `text-gray-400`.
- 제목은 한 줄로 유지한다 (`whitespace-nowrap`).

### 화면 콘텐츠 순서

```
탑바 (로고 · 벨 · 프로필)
├── 주간 통계 (달성률 · 복약률 · 일지 작성)
├── 오늘 할일
│   ├── 일지 배지 (오늘 일지 작성하기)
│   └── 체크리스트
├── 예정 일정 (이번 주 주요 일정 3건)
└── 주간 인사이트
하단 탭바 (홈 · 일지 · 약 · 캘린더)
```

---

## Consistency Checklist

- [ ] 화면의 주 행동이 하나만 검정 버튼인가?
- [ ] 보조 행동이 검정 버튼과 경쟁하지 않는가?
- [ ] 입력 화면의 본문 시작 높이가 다른 입력 화면과 맞는가?
- [ ] 상태 화면의 구조가 `아이콘 → 이메일 → 설명 → 보조 행동` 순서인가?
- [ ] 불필요한 설명 문구를 제거했는가?
- [ ] 진한 텍스트가 연속으로 나란히 쌓이지 않는가?
- [ ] 입력창 높이, 버튼 높이, radius가 통일되어 있는가?
- [ ] 텍스트 계층 차이가 충분히 과감한가? (크기, 굵기, 색상 중 2개 이상 다른가?)
- [ ] 온보딩 헤더에 뒤로가기 버튼이 있는가? (INIT-002 ~ 004)
- [ ] 스플래시·완료 화면에 앱 바가 없는가?
- [ ] `NanumSquare` 폰트 기준으로 텍스트가 과하게 크거나 뭉쳐 보이지 않는가?

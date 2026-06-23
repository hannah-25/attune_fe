# a.tune UI Patterns

레이아웃 유형과 공통 UI 패턴을 정리한다. 원칙은 [Guidelines.md](./Guidelines.md)를 먼저 따른다.

---

## Layout Types

### Input

- 본문은 상단 바 또는 프로그레스 영역 아래에서 시작한다.
- 입력 흐름은 좌측 정렬을 유지한다.
- 설명 문구는 입력창 위에 짧게 둔다.
- placeholder와 별도 안내 문구를 중복하지 않는다.

### Status

- 수직 중앙 정렬 대신 상단 정렬을 사용한다.
- 구조는 `아이콘 → 대상 정보 → 설명 → 보조 행동` 순서로 통일한다.
- 아이콘은 배경 박스 없이 단독으로 사용한다.
- 안내 박스보다 일반 텍스트를 우선한다.

### Splash / Completion

- 앱 바를 사용하지 않는다.
- 구조는 `로고 → 핵심 문장 → 설명 → CTA`를 기본으로 한다.
- 콘텐츠는 중앙에 배치하되, CTA가 화면 아래에 묻히지 않게 한다.
- 완료 화면에는 키워드 칩 같은 부가 정보를 과하게 나열하지 않는다.

---

## Shared Patterns

### Top Bar

- 모바일 화면 상단에는 status bar 아래 앱 바를 둔다.
- 뒤로가기 또는 액션 버튼은 `w-11 h-11` 터치 영역 안에 둔다.
- 텍스트가 들어간 버튼(예: 저장하기, 완료)은 고정 `w-11` 대신 `min-w-11`을 사용하고 `justify-end`로 정렬한다. 고정 너비 44px에 패딩이 더해지면 텍스트가 세로로 밀린다.
- 타이틀은 `text-base font-bold`를 기본으로 한다.
- 타이틀은 항상 화면 중앙에 절대 정렬한다.
- 좌우 액션이 없더라도 `w-11 h-11` 빈 영역을 유지해 중앙 정렬과 터치 영역을 보정한다.
- 스플래시와 완료 화면처럼 시작/전환 성격이 강한 화면은 앱 바를 생략한다.

### Dashboard Top Bar

홈처럼 탭 루트이면서 대시보드 성격인 화면의 헤더 패턴이다. Sub-screen Top Bar와 다르다.

- 로고 이미지를 좌측에 둔다 (`h-8 w-8 object-contain`).
- 우측에 아이콘 버튼(알림 등)과 아바타 버튼을 나란히 배치한다.
- 아바타: `h-9 w-9 rounded-full bg-purple-200`; 이미지 없으면 닉네임 첫 글자(`text-xs font-bold text-purple-700`) 또는 `UserRound` 아이콘으로 대체한다.
- 아이콘/아바타 버튼 터치 영역은 `h-11 w-11`을 유지한다.
- 전체 높이 `min-h-[60px]`, padding `px-4 py-2`.
- 타이틀 텍스트 없이 로고-스페이서-아이콘 구조를 사용한다.

### Sub-screen Top Bar

탭 루트 화면에 쓰는 표준 탑바 패턴이다. 대시보드형 탑바와 구분한다.

- 좌우 버튼은 동일한 크기와 스타일을 유지한다.
- 중앙 제목은 날짜 또는 화면명만 짧게 둔다.
- 좌측은 뒤로가기/이전 날짜, 우측은 앞으로/편집/액션 버튼을 둔다.
- 우측 액션이 없으면 빈 영역으로 제목 중앙을 맞춘다.

### Tab Bar

- 하단 탭바는 공통 `TabBar` 컴포넌트의 프리셋을 사용한다.
- 목적이 분리된 플로우는 해당 프리셋을 따른다.
- "더보기" 탭은 만들지 않는다. 설정과 계정 접근은 프로필 아바타로 일원화한다.

### Form Fields

- 입력창 높이, radius, 내부 padding은 화면 간 통일한다.
- 배경은 흰색, 테두리는 중립 회색(`border border-gray-200`)을 기본으로 한다.
- 포커스 상태는 보라색 테두리(`border-purple-300`)로 명확히 드러낸다. 포커스 여부는 별도 state로 추적한다.
- 라벨은 입력창 내부 상단에 두고, placeholder는 낮은 계층으로 둔다.
- placeholder 색은 `placeholder:text-gray-400`을 기본으로 한다. `text-gray-300`은 너무 연해 가독성이 부족하다.
- 모바일에서 입력 포커스 시 화면 확대가 발생하지 않도록 `input`, `textarea`, `select`의 실제 입력 텍스트는 최소 16px(`text-base`)로 둔다.
- auto-resize textarea는 `el.style.height = 'auto'; el.style.height = scrollHeight + 'px'` 패턴을 사용한다. 초기 값이 있는 경우 `useEffect` + `ref`로 마운트 시 초기화한다.

### Buttons

- Primary CTA는 `bg-[rgb(31,27,46)] text-white` 검정 버튼을 사용한다.
- 검정 버튼은 제출, 저장, 완료, 시작처럼 되돌리기 어렵거나 흐름을 확정하는 행동에 한정한다.
- 빈 상태 화면(Empty State)의 CTA도 동일하게 검정 버튼을 사용한다. `bg-purple-500`은 primary CTA로 쓰지 않는다.
- 단계형 플로우의 중간 이동 버튼은 완료 행동이 아니므로 연한 버튼을 사용한다.
- 보조 행동은 링크, 아이콘 버튼, 연한 배경 버튼 중 하나로 낮춘다.
- 버튼 문구는 행동 중심으로 쓴다. 예: "변경 완료"보다 "변경하기".

### Tag Chips

선택형 태그 UI에 적용한다.

- 선택됨: 옅은 보라 배경, 보라 테두리, 보라 텍스트, 왼쪽 체크 아이콘.
- 미선택: 배경과 테두리 없이 동일 padding과 font를 유지한다.
- 태그 그룹은 `flex flex-wrap gap-1.5` 흐름을 유지한다.
- 그룹 헤더는 컬러 dot과 굵은 제목으로 구분한다.

### Compose Layout (작성 화면)

글쓰기, 피드백 입력 등 콘텐츠를 작성하는 화면에 적용한다.

- TopBar에는 취소/뒤로가기만 둔다. 발행/제출 CTA는 TopBar에 올리지 않는다.
- 스크롤 영역 최하단에 부가 옵션(익명 여부 등)과 CTA를 함께 묶어 배치한다.
- 부가 옵션은 CTA 바로 위에 작게 두고, CTA는 전체 너비(`w-full`) 검정 버튼으로 마무리한다.
- CTA는 콘텐츠와 자연스럽게 이어져야 한다. 콘텐츠가 짧을 때 버튼만 화면 최하단에 고정되는 구조는 피한다.

### Hero CTA Card

화면 최상단에서 주요 행동 하나를 강하게 유도하는 배너형 카드 패턴이다. 홈의 일지 작성 버튼이 대표 예시.

- 컨테이너: `rounded-[1.75rem] overflow-hidden bg-purple-100 p-4 shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px]`
- 최소 높이 `min-h-[108px]`.
- 우측 상단 장식 원: `absolute -right-5 -top-5 h-20 w-20 rounded-full bg-purple-200/65`
- 우측 하단 아이콘 뱃지: `absolute bottom-4 right-4 rotate-6 h-8 w-8 rounded-[0.75rem] bg-purple-200 text-purple-700`
- 텍스트 영역: `relative z-[1] pr-12`로 장식 요소 위에 배치한다.
- 상태에 따라 미완성(진행률 뱃지), 완료(체크 아이콘) 텍스트를 교체한다.
- 진행률 뱃지: `rounded-full bg-purple-300/60 px-2 py-0.5 text-[10px] font-bold text-purple-900`
- active 피드백: `transition-transform active:scale-[0.98]`

### Section Header

홈 대시보드에서 섹션 제목과 전체보기 링크를 가로로 나열하는 헤더 패턴이다.

- 레이아웃: `mb-3 flex items-center justify-between`
- 제목: `text-sm font-bold text-gray-900`
- 액션 버튼: `min-h-11 rounded-lg px-2 text-xs font-semibold text-gray-700`
- 액션 버튼은 항상 해당 섹션의 전체 화면으로 이동한다.

### Plan List Row

오늘 계획 섹션의 일정·할 일 행 패턴이다.

- 컨테이너: `border-y border-gray-200` (배경 없음, 테두리만으로 영역 구분)
- 각 행: `min-h-[68px] border-b border-gray-200 px-4 last:border-b-0`
- 시간 라벨: `w-11 shrink-0 text-xs font-extrabold text-gray-700`; 종일이면 `'종일'` 텍스트
- 아이콘 구분: 일정 `Calendar text-purple-400`, 할 일 `Square text-gray-400` (`h-3.5 w-3.5`)
- 완료 상태: 텍스트 `text-gray-400 line-through` + 우측 `h-6 w-6 rounded-full bg-purple-100` 내 보라 체크
- 미완료 상태: 우측에 `ChevronRight text-gray-600`

### Stat Grid

수치 3개를 가로 나열하는 주간 통계 패턴이다.

- 레이아웃: `grid grid-cols-3 gap-3`
- 라벨: `text-[11px] font-semibold text-gray-600`
- 값: `text-xl font-extrabold tracking-[-0.03em] text-gray-900`
- 프로그레스 바: `h-1.5 rounded-full bg-purple-100` + 내부 bar
- 프로그레스 바 강도별 색상: `bg-purple-700`(strong), `bg-purple-500`(medium), `bg-purple-300`(soft)
- 보조 정보: `text-[10px] font-medium text-gray-500`

### Shortcut Circle

하단 단축 바의 원형 아이콘 버튼 패턴이다.

- 원: `h-14 w-14 rounded-full bg-purple-100 text-purple-700`; active 상태에서 `bg-purple-200`
- 뱃지 (선택): `absolute -right-1 -top-1 rounded-full bg-purple-600 px-1.5 py-0.5 text-[9px] font-bold text-white`
- 라벨: `text-[10px] font-semibold text-gray-700`
- 그룹 레이아웃: `flex justify-around`

### Status / Loading / Error Row

리스트 섹션 내 로딩·에러·빈 상태를 인라인으로 표시하는 패턴이다.

- 최소 높이 `min-h-[68px]`로 레이아웃 시프트를 방지한다.
- 로딩·빈 상태: `text-xs font-medium text-gray-600`, `role="status"`
- 에러 텍스트: `text-xs text-red-700`; 재시도 버튼 `min-h-11 text-xs font-semibold text-purple-700`, `role="alert"`

### D-day / 날짜 강조 카드

카운트다운 또는 날짜를 강조하는 정보 카드 패턴이다.

- 구조: `[작은 라벨] / [큰 숫자] | 구분선 | [장소·이름 등 상세 정보]`
- 라벨은 `text-[10px] text-purple-700 font-semibold`, 숫자는 `text-4xl font-extrabold text-gray-700`.
- 구분선은 `w-px self-stretch bg-purple-200`.
- 상세 정보 첫 줄은 `font-bold text-base text-gray-900`, 보조 정보는 `text-sm text-gray-500`, 날짜·시간은 `text-xs text-purple-700 font-semibold`.
- purple-100 배경 카드 위에서 purple-700 계열 색상이 응집감을 만든다.

**인라인 D-day 뱃지 변형** (정보성 카드 우측에 붙이는 경우):

- `rounded-full px-3 py-1 text-xs font-bold`
- D-day: `bg-purple-600 text-white`
- D-1~7: `bg-purple-100 text-purple-700`

---

## Do / Don't

- Do: 공통 컴포넌트 프리셋을 먼저 따른다.
- Don't: 화면별로 탭, 버튼, 입력창의 기본 구조를 임의로 덮어쓰지 않는다.
- Do: "저장하기", "변경하기"처럼 행동을 직접 말한다.
- Don't: "저장 완료", "변경 완료"처럼 상태를 버튼 문구로 쓰지 않는다.
- Do: 카드와 배경은 색상, 그림자, 테두리로 함께 분리한다.
- Don't: 배경색 하나만 바꿔 영역을 구분하려 하지 않는다.
- Do: 설명은 사용자가 판단하거나 행동하는 데 필요한 만큼만 남긴다.
- Don't: 제목과 설명에서 같은 의미를 반복하지 않는다.

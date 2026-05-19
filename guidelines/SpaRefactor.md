# SPA Refactor Notes

## Goal
현재 앱은 React Router 기반 SPA이지만, 라우트 정의가 `src/app/App.tsx`에 직접 나열되어 있고 `/`, `/overview`, `/empty/*` 같은 목업 갤러리성 진입점이 실제 서비스 화면과 섞여 있다.

이번 리팩토링의 목표는 다음과 같다.

- 앱을 하나의 SPA 흐름으로 유지한다.
- 라우트 정의를 데이터화해서 서비스 라우트와 목업/검수 라우트를 분리한다.
- 배포 환경에서 새로고침/직접 진입 시 SPA fallback이 필요한 지점을 명확히 한다.
- 이후 인증, 온보딩, 메인 탭, 상세 화면 흐름을 단계적으로 실제 앱 구조에 맞게 정리할 수 있게 만든다.

## Current State
- Entry: `src/main.tsx`
- Router: `BrowserRouter basename={import.meta.env.BASE_URL}`
- Shell: `src/app/components/AppViewport.tsx`
- Routes: `src/app/App.tsx` 안에 직접 선언
- Page roots:
  - `src/pages/auth`
  - `src/pages/onboarding`
  - `src/pages/home`
  - `src/pages/journal`
  - `src/pages/medication`
  - `src/pages/calendar`
  - `src/pages/report`
  - `src/pages/counseling`
  - `src/pages/community`
  - `src/pages/empty`
  - `src/pages/settings`
- Gallery/debug entry:
  - `/debug`
  - `/debug/overview`

## Problems
- 서비스 라우트와 목업 검수 라우트가 한 `Routes` 블록에 섞여 있다.
- 새 페이지 추가 시 import와 `<Route>`를 같은 파일에서 반복 수정해야 한다.
- 루트(`/`)가 실제 서비스 홈이 아니라 목업 인덱스다.
- 배포 서버가 history fallback을 제공하지 않으면 `/home`, `/calendar` 같은 직접 URL 진입이 404가 될 수 있다.
- 빈 상태(`/empty/*`)는 실제 앱 상태에서 파생되어야 할 화면인데 독립 라우트로 노출되어 있다.

## Mockup Traces Excluding Overview
`/overview`를 제외하고도 남아 있는 목업/검수 흔적은 다음과 같다.

### User-visible traces
- 운영 `/`는 실제 앱 시작 화면인 `/splash`로 이동한다.
- `IndexPage`의 화면 목록 문구는 `개발용 화면 목록`으로 변경했고 개발 환경의 `/debug`에서만 노출된다.
- `IndexPage`의 전체 화면 링크는 개발 환경의 `/debug/overview`로 이동한다.
- 빈 상태 검수 화면은 운영 `/empty/*`에서 제외하고 개발 환경의 `/debug/empty/*`로 이동했다.

### Code-level traces
- `src/app/pages/IndexPage.tsx`는 화면 목록용 갤러리 페이지다.
- `src/app/App.tsx`에서 검수 라우트는 `import.meta.env.DEV` 블록으로 분리되어 있다.
- `src/app/mocks/*.mock.ts`에 mock 데이터가 남아 있고 여러 실제 페이지가 이를 직접 import한다.
- `src/app/mocks/*.mock.ts` 상단에 `TODO: Replace with API data` 주석이 남아 있다.

### Pages still depending on mock data
- `HomeListPage`
- `JournalCalendarPage`
- `JournalTagsPage`
- `MedicationListPage`
- `MedicationInfoPage`
- `MedicationHistoryPage`
- `EventDetailPage`
- `ReportWeeklyPage`
- `CounselingPreparePage`
- `CounselingResultPage`
- `CommunityFeedPage`
- `CommunityPostPage`

### Not counted as mockup traces
- 입력창 `placeholder` 문구는 실제 UI 패턴이라 목업 흔적으로 보지 않는다.
- `guidelines/*` 문서 안의 목업 언급은 운영 화면에 노출되지 않으므로 별도 관리한다.

## Target Shape
1. `src/app/routes.tsx`에 라우트 매니페스트를 만든다.
2. `App.tsx`는 `routes.map(...)`으로 라우트만 렌더링한다.
3. 라우트 그룹을 분리한다.
   - `serviceRoutes`: 실제 앱 사용자 흐름
   - `debugRoutes`: 목업/검수용 인덱스와 오버뷰
   - `emptyStateRoutes`: 당장은 검수용으로 유지하되 실제 서비스 흐름과 분리
4. 기본 진입점 정책을 정한다.
   - 개발/검수 화면: `/debug` → `IndexPage`
   - 서비스 진입: `/` → `/splash`
5. 배포 설정에 SPA fallback이 있는지 확인한다.

## Step Plan
- [x] 현재 라우팅 구조 확인
- [ ] 라우트 매니페스트 파일 추가
- [ ] `App.tsx`를 매니페스트 기반으로 단순화
- [x] 목업/검수 라우트와 서비스 라우트 그룹 분리
- [x] 운영 `/`를 `/splash`로 변경
- [x] 빈 상태 검수 라우트를 `/debug/empty/*`로 이동
- [x] 빌드 검증
- [ ] 배포 fallback 정책 확인 필요 사항 기록

## Decisions
- React Router는 유지한다.
- 지금 당장 URL 구조는 바꾸지 않는다. 먼저 구조만 안전하게 정리한다.
- `/empty/*` 운영 라우트는 제거하고 `/debug/empty/*`로 분리한다.
- `/`는 `/splash`로 이동한다.
- `/overview`는 운영 라우트에서 제거하고 `/debug/overview`로 이동한다.
- `/debug/*` 라우트는 `import.meta.env.DEV`에서만 등록한다.

## Verification
- `pnpm.cmd run build`
- 주요 경로 직접 확인:
  - `/`
  - `/splash`
  - `/home`
  - `/journal`
  - `/medication`
  - `/calendar`
  - `/report`
  - `/community`
  - `/settings`

## Open Questions
- 배포 대상이 Vercel, Netlify, S3/CloudFront, GitHub Pages, 자체 서버 중 어디인지 확인 필요.
- API 연결 전까지 `src/app/mocks/*.mock.ts`를 어느 계층으로 감출지 결정 필요.

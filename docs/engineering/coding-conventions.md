# 코딩 컨벤션

## 언어 / 타입

- TypeScript `strict: true`. `any` 지양, 불가피하면 주석으로 사유.
- 경로 별칭: `@/*` → `src/app/*`, `@src/*` → `src/*` (tsconfig + vite 동일).
- `noFallthroughCasesInSwitch: true` — switch fallthrough 금지.

## React / 컴포넌트

- 함수 컴포넌트 + 훅. 페이지는 `src/pages/<도메인>/<Name>Page.tsx`.
- 라우트는 `src/app/App.tsx`에 등록. 무거운 페이지는 `lazy` + `Suspense`.
- 공통 셸은 직접 만들지 말고 `TabBar`/`TopBar`/`AppViewport` 사용.
- 모든 페이지에 `style={{ fontFamily: "NanumSquare, ..." }}` 적용(프로젝트 규약).

## 스타일

- Tailwind 유틸리티 우선. 색/버튼/카드 규칙은 [`guidelines/Guidelines.md`](../../guidelines/Guidelines.md), [`guidelines/Patterns.md`](../../guidelines/Patterns.md).
- 검정 버튼(`bg-[rgb(31,27,46)]`)은 최종 확정 행동(저장/제출/완료/기록)에만.
- `TabBar`가 `absolute` 하단 고정 → 스크롤 영역 `pb-[100px]` 이상.

## 데이터 접근

- 페이지 → `api/<도메인>.ts` 함수만. `fetch`/토큰 직접 접근 금지([api-rules](../architecture/api-rules.md)).

## 네이밍 / 파일

- 컴포넌트 파일 PascalCase, 유틸 camelCase, API 모듈 도메인명 소문자.
- 한 파일 = 한 책임. 도메인 정책을 `lib/`·`components/`에 섞지 않는다.

## 커밋 / 브랜치

- [`guidelines/GitWorkflow.md`](../../guidelines/GitWorkflow.md) 준수. `develop` 직접 커밋 금지.
- 커밋 메시지: `feat:`/`fix:`/`refactor:`/`docs:`/`chore:` 접두사 + 결과 중심.

## 포매팅 / 린트

- 현재 ESLint/Prettier 미도입(🟡). 주변 코드 스타일을 따른다.
- 도입 계획: [tech-debt-tracker](../exec-plans/tech-debt-tracker.md).

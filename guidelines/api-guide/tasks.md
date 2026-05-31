# API 연동 작업 목록

> 기준 문서: `guidelines/api-guide/ddd.md`  
> 분석일: 2026-05-30  
> 완료일: 2026-05-31

---

## 미연결 API 구현

- [x] `POST /v1/auth/restore` — 탈퇴 계정 복구  
  - `src/app/api/auth.ts`에 `restoreAccount(email, password)` 추가

- [x] `GET /v1/terms/latest` — 최신 약관 조회  
  - `src/app/api/terms.ts` 신규 생성, `getLatestTerms()` 구현

- [x] `GET /v1/todos/{todoId}` — 할 일 상세 조회  
  - `src/app/api/todo.ts`에 `getTodo(todoId)` 추가

---

## 코드 정리

- [x] `/api/` 경로 → `/v1/` 경로 통일  
  - `src/app/api/consultation.ts` — `/api/consultations` → `/v1/consultations`
  - `src/app/api/schedule.ts` — `/api/schedules`, `/api/schedule-categories/` → `/v1/` 통일
  - `src/app/api/todo.ts` — `/api/todos` → `/v1/todos`
  - `src/app/api/notice.ts` — `/api/notices` → `/v1/notices`

---

## 확인 필요

- [x] `POST /v1/account/verify-email/resend` — 이메일 인증 재전송  
  - `src/app/api/auth.ts`에 구현 확인 완료, `ddd.md`에 엔드포인트 문서화

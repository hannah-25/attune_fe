# 도메인 개요

각 도메인은 `src/pages/<도메인>/` 화면 + `src/app/api/<도메인>.ts` 클라이언트로 구성된다.
요청/응답 스키마 상세는 [`guidelines/api-guide/`](../../guidelines/api-guide) 와 [`openapi/`](../../openapi) 참고.

| 도메인 | 페이지 | API 모듈 | 비고 |
|--------|--------|----------|------|
| auth | `pages/auth/` | `api/auth.ts`, `api/social.ts` | 로그인/회원가입/이메일 인증/비밀번호 재설정. 게스트·오프라인 우회 |
| onboarding | `pages/onboarding/` | `api/onboarding.ts` | 1~5단계 + AI 추천(감정·컨디션 태그) |
| home | `pages/home/` | (여러 도메인 조합) | 오늘 요약 |
| journal | `pages/journal/` | `api/journal.ts` | 일지 입력/타임라인/캘린더/태그 |
| medication | `pages/medication/` | `api/medication.ts`, `api/medicationAnalysis.ts`, `api/alarm.ts` | 약/복용/알람/분석 |
| calendar | `pages/calendar/` | `api/calendarEvents.ts`, `api/calendarConnection.ts`, `api/googleCalendarAuth.ts`, `api/schedule.ts` | 외부 캘린더 연동 |
| report | `pages/report/` | (분석 API 조합) | 주간/월간 |
| counseling | `pages/counseling/` | `api/consultation.ts` | 상담 준비/결과 |
| community | `pages/community/` | `api/community.ts` | 피드/글 |
| settings | `pages/settings/` | `api/user.ts`, `api/support.ts`, `api/terms.ts`, `api/notice.ts` | 마이페이지/알림/탈퇴 |
| admin | `pages/admin/` | `api/admin.ts`, `api/adminContent.ts` | 운영자용. `VITE_ADMIN_USE_MOCK` 플래그 영향 |
| (공통) | — | `api/todo.ts` | 할 일 |

> 자동 생성된 API 인덱스: [api-index](../generated/api-index.md).
> 자동 생성된 프로젝트 맵: [project-map](../generated/project-map.md).

## 횡단 도메인 특성

- **게스트 모드**: `src/app/guest.ts`의 `isGuestMode()`가 true면 auth/account 외 요청을 `mocks/resolver.ts`가 처리.
- **오프라인-퍼스트**: 네트워크 단절/서버 5xx 시 `offline/resolver.ts`가 Dexie 캐시·큐로 응답. 상세: [data-rules](../architecture/data-rules.md).

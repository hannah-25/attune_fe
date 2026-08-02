# API Guide

기본 prefix: `/v1`  
인증이 필요한 API는 `Authorization: Bearer {accessToken}` 헤더를 포함해야 한다.

---

## 목차

- [Auth — 인증](#auth--인증)
- [Account — 계정](#account--계정)
- [UserProfile — 프로필](#userprofile--프로필)
- [UserSetting — 설정](#usersetting--설정)
- [Onboarding — 온보딩](#onboarding--온보딩)
- [Journal — 일지](#journal--일지)
- [Journal 감정/증상](#journal-감정증상)
- [Journal 부작용](#journal-부작용)
- [Journal 업무 실수/불편](#journal-업무-실수불편)
- [Journal 메모](#journal-메모)
- [Journal 수면/식사](#journal-수면식사)
- [Journal 목표 성취도](#journal-목표-성취도)
- [Medication — 복약](#medication--복약)
- [Consultation — 상담](#consultation--상담)
- [Schedule — 일정](#schedule--일정)
- [ScheduleCategory — 일정 카테고리](#schedulecategory--일정-카테고리)
- [Todo — 할 일](#todo--할-일)
- [Notice — 공지사항 (일반)](#notice--공지사항-일반)
- [AdminNotice — 공지사항 (관리자)](#adminnotice--공지사항-관리자)
- [Terms — 약관 (일반)](#terms--약관-일반)
- [AdminTerms — 약관 (관리자)](#adminterm--약관-관리자)
- [Community — 게시판](#community--게시판)
- [Community — 댓글](#community--댓글)
- [Support — 문의](#support--문의)

---

## Auth — 인증

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `POST` | `/v1/auth/login` | 이메일/비밀번호 로그인 | 불필요 |
| `POST` | `/v1/auth/reissue` | Access Token 재발급 (Refresh Token 사용) | 불필요 |
| `POST` | `/v1/auth/logout` | 로그아웃 (Refresh Token 삭제) | 필요 |
| `POST` | `/v1/auth/restore` | 탈퇴 계정 복구 | 불필요 |

**클라이언트 타입 헤더**  
`X-Client-Type: web` (기본값) / `ios` / `android`  
- 웹: Refresh Token을 HttpOnly 쿠키로 전달  
- 앱: Refresh Token을 응답 body에 포함

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 성공 |
| `401` | 인증 실패 / 토큰 만료 |
| `400` | 탈퇴 상태가 아닌 계정 (restore) |

---

## Account — 계정

Base path: `/v1/account`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `POST` | `/v1/account/signup` | 회원가입 | 불필요 |
| `GET` | `/v1/account/verify-email?token={token}` | 이메일 인증 | 불필요 |
| `POST` | `/v1/account/verify-email/resend` | 인증 이메일 재전송 | 불필요 |
| `PATCH` | `/v1/account/password` | 비밀번호 변경 (현재 비밀번호 확인 후) | 필요 |
| `POST` | `/v1/account/password/reset` | 비밀번호 재설정 링크 이메일 발송 | 불필요 |
| `GET` | `/v1/account/password/reset/{token}` | 재설정 토큰 유효성 검증 | 불필요 |
| `POST` | `/v1/account/password/reset/confirm` | 비밀번호 재설정 완료 | 불필요 |

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 성공 |
| `204` | 성공 (응답 body 없음) |
| `400` | 현재 비밀번호 불일치 / 만료·유효하지 않은 토큰 |
| `409` | 이미 사용 중인 이메일 |

---

## UserProfile — 프로필

Base path: `/v1/users/me`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/users/me/profile` | 내 프로필 조회 | 필요 |
| `PUT` | `/v1/users/me/nickname` | 닉네임 수정 | 필요 |
| `POST` | `/v1/users/me/image` | 프로필 이미지 URL 수정 | 필요 |

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 성공 |
| `204` | 성공 (응답 body 없음) |
| `409` | 이미 사용 중인 닉네임 |

---

## UserSetting — 설정

Base path: `/v1/users/settings`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/users/settings` | 유저 설정 조회 | 필요 |
| `PATCH` | `/v1/users/settings` | 유저 설정 변경 | 필요 |

---

## Onboarding — 온보딩

Base path: `/v1/onboarding`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/onboarding/status` | 온보딩 완료 여부 조회 | 필요 |
| `POST` | `/v1/onboarding/asrs` | ASRS 체크리스트 제출 | 필요 |
| `POST` | `/v1/onboarding/symptoms` | 초기 증상 서술 저장 | 필요 |
| `POST` | `/v1/onboarding/goals` | 치료 목표 저장 | 필요 |
| `POST` | `/v1/onboarding/complete` | 온보딩 최종 제출 | 필요 |
| `POST` | `/v1/onboarding/skip` | 온보딩 건너뜀 | 필요 |

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 성공 |
| `201` | 저장 성공 |
| `204` | 건너뜀 성공 |
| `400` | 필수 단계 미완료 |

---

## Journal — 일지

Base path: `/v1/journals`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/journals/{date}` | 단일 일지 상세 조회 (활성 태그 + 체크 내역) | 필요 |
| `GET` | `/v1/journals?startDate={date}&endDate={date}` | 기간별 일지 날짜 목록 조회 | 필요 |
| `DELETE` | `/v1/journals/{date}` | 단일 일지 삭제 (해당 날짜 전체) | 필요 |
| `DELETE` | `/v1/journals?startDate={date}&endDate={date}` | 기간별 일지 삭제 | 필요 |

- `date` 형식: `yyyy-MM-dd` (ISO 8601)

---

## Journal 감정/증상

Base path: `/v1/journals`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/journals/condition-tags` | 활성 감정/증상 태그 목록 조회 | 필요 |
| `POST` | `/v1/journals/condition-tags` | 감정/증상 태그 추가 | 필요 |
| `DELETE` | `/v1/journals/condition-tags/{tagId}?journalDate={date}` | 태그 삭제 (해당 날짜 이후 체크 로그 포함) | 필요 |
| `PATCH` | `/v1/journals/condition-tags/{tagId}/visible` | 태그 표시 여부 토글 | 필요 |
| `POST` | `/v1/journals/conditions` | 감정/증상 체크 | 필요 |
| `DELETE` | `/v1/journals/conditions?tagId={id}&date={date}` | 감정/증상 체크 취소 | 필요 |

---

## Journal 부작용

Base path: `/v1/journals`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/journals/side-effect-tags` | 활성 부작용 태그 목록 조회 | 필요 |
| `POST` | `/v1/journals/side-effect-tags` | 부작용 태그 추가 | 필요 |
| `DELETE` | `/v1/journals/side-effect-tags/{tagId}?journalDate={date}` | 태그 삭제 (해당 날짜 이후 체크 로그 포함) | 필요 |
| `PATCH` | `/v1/journals/side-effect-tags/{tagId}/visible` | 태그 표시 여부 토글 | 필요 |
| `POST` | `/v1/journals/side-effects` | 부작용 체크 | 필요 |
| `DELETE` | `/v1/journals/side-effects?tagId={id}&date={date}` | 부작용 체크 취소 | 필요 |

---

## Journal 업무 실수/불편

Base path: `/v1/journals`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/journals/trouble-tags` | 활성 업무 실수/불편 태그 목록 조회 | 필요 |
| `POST` | `/v1/journals/trouble-tags` | 업무 실수/불편 태그 추가 | 필요 |
| `DELETE` | `/v1/journals/trouble-tags/{tagId}?journalDate={date}` | 태그 삭제 (해당 날짜 이후 체크 로그 포함) | 필요 |
| `PATCH` | `/v1/journals/trouble-tags/{tagId}/visible` | 태그 표시 여부 토글 | 필요 |
| `POST` | `/v1/journals/troubles` | 업무 실수/불편 체크 | 필요 |
| `DELETE` | `/v1/journals/troubles?tagId={id}&date={date}` | 업무 실수/불편 체크 취소 | 필요 |

---

## Journal 메모

Base path: `/v1/journals/{date}/memo`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/journals/{date}/memo` | 해당 날짜 메모 조회 (없으면 204) | 필요 |
| `POST` | `/v1/journals/{date}/memo` | 메모 등록/수정 (존재하면 덮어씀) | 필요 |

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 조회 성공 |
| `201` | 등록/수정 성공 |
| `204` | 메모 없음 |

---

## Journal 수면/식사

Base path: `/v1/journals/{date}/sleep-meal`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `POST` | `/v1/journals/{date}/sleep-meal` | 수면/식사 기록 등록/수정 (존재하면 덮어씀) | 필요 |

**응답 코드**: `201` 등록/수정 성공

---

## Journal 목표 성취도

Base path: `/v1/journals`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `POST` | `/v1/journals/goals` | 일일 목표 등록 | 필요 |
| `DELETE` | `/v1/journals/goals/{goalId}?journalDate={date}` | 목표 삭제 (해당 날짜 이후 점수 로그 포함) | 필요 |
| `PATCH` | `/v1/journals/goals/{goalId}` | 목표 내용 수정 | 필요 |
| `POST` | `/v1/journals/{date}/goals` | 특정 날짜 목표 점수 체크 (등록/갱신) | 필요 |

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 수정/점수 기록 성공 |
| `201` | 생성 성공 |
| `204` | 삭제 성공 |
| `404` | 목표 없음 |
| `409` | 동일한 목표 내용 이미 존재 |

---

## Medication — 복약

Base path: `/v1`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/user-medications` | 내 복약 목록 조회 | 필요 |
| `POST` | `/v1/user-medications` | 복약 정보 등록 | 필요 |
| `PATCH` | `/v1/user-medications/{userMedicationId}` | 복약 정보 수정 | 필요 |
| `GET` | `/v1/user-medications/{userMedicationId}/logs?startDate={date}&endDate={date}` | 특정 복약의 로그 조회 | 필요 |
| `GET` | `/v1/user-medications/logs?startDate={date}&endDate={date}` | 기간별 전체 복약 로그 조회 | 필요 |
| `POST` | `/v1/user-medications/{userMedicationId}/log/quick` | 리마인더에서 빠른 복약 기록 | 필요 |
| `GET` | `/v1/medications/standards/{medicationId}` | 약물 마스터 상세 조회 | 필요 |

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 성공 |
| `201` | 생성 성공 |
| `404` | 복약 정보 없음 |

---

## Consultation — 상담

Base path: `/v1/consultations`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `POST` | `/v1/consultations` | 상담 일정 등록 | 필요 |
| `GET` | `/v1/consultations?startDate={date}&endDate={date}` | 기간별 상담 이력 조회 | 필요 |
| `GET` | `/v1/consultations/{consultationId}` | 상담 기록 상세 조회 | 필요 |
| `PATCH` | `/v1/consultations/{consultationId}` | 상담 일정 수정 | 필요 |
| `DELETE` | `/v1/consultations/{consultationId}` | 상담 일정 삭제 | 필요 |
| `PATCH` | `/v1/consultations/{consultationId}/preparation` | 상담 전 준비도구 작성/수정 | 필요 |
| `PATCH` | `/v1/consultations/{consultationId}/result` | 상담 후 결과 작성/수정 | 필요 |
| `DELETE` | `/v1/consultations/{consultationId}/result` | 상담 결과 기록 삭제 | 필요 |

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 성공 |
| `201` | 등록 성공 |
| `204` | 삭제 성공 |
| `400` | 잘못된 조회 기간 |
| `403` | 권한 없음 |
| `404` | 상담 일정 없음 |

---

## Schedule — 일정

Base path: `/v1/schedules`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `POST` | `/v1/schedules` | 일정 생성 | 필요 |
| `GET` | `/v1/schedules?startDate={date}&endDate={date}&source={source}` | 기간별 일정 목록 조회 (source 필터 선택) | 필요 |
| `GET` | `/v1/schedules/{scheduleId}` | 일정 상세 조회 | 필요 |
| `PATCH` | `/v1/schedules/{scheduleId}` | 일정 수정 | 필요 |
| `DELETE` | `/v1/schedules/{scheduleId}` | 일정 삭제 | 필요 |
| `PUT` | `/v1/schedules/{scheduleId}/alarms` | 일정 알림 설정 관리 | 필요 |

- `source`: `MANUAL` (직접 등록) / `EXTERNAL` (외부 연동)

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 성공 |
| `201` | 생성 성공 |
| `204` | 삭제 성공 |
| `404` | 일정 없음 / 카테고리 없음 |

---

## ScheduleCategory — 일정 카테고리

Base path: `/v1/schedule-categories`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/schedule-categories` | 활성 카테고리 목록 조회 | 필요 |
| `POST` | `/v1/schedule-categories` | 카테고리 생성 | 필요 |
| `PATCH` | `/v1/schedule-categories/{categoryId}` | 카테고리 수정 | 필요 |
| `DELETE` | `/v1/schedule-categories/{categoryId}` | 카테고리 삭제 | 필요 |

---

## Todo — 할 일

Base path: `/v1/todos`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `POST` | `/v1/todos` | 할 일 생성 | 필요 |
| `GET` | `/v1/todos?date={date}` | 특정 일자 할 일 목록 조회 | 필요 |
| `GET` | `/v1/todos?startDate={startDate}&endDate={endDate}` | 기간 내 할 일 목록 조회 | 필요 |
| `GET` | `/v1/todos/{todoId}` | 할 일 상세 조회 | 필요 |
| `PATCH` | `/v1/todos/{todoId}` | 할 일 수정 | 필요 |

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 성공 |
| `201` | 생성 성공 |
| `404` | 할 일 없음 |

---

## Notice — 공지사항 (일반)

Base path: `/v1/notices`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/notices?page={n}&size={n}&q={keyword}` | 공지사항 목록 조회 (고정 우선, 최신순, 검색 가능) | 불필요 |
| `GET` | `/v1/notices/{noticeId}` | 공지사항 상세 조회 | 불필요 |

- `page` 기본값 `0`, `size` 기본값 `10`
- `q`: 제목/내용 검색 키워드 (선택)

---

## AdminNotice — 공지사항 (관리자)

Base path: `/v1/admin/notices`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `POST` | `/v1/admin/notices` | 공지사항 등록 | 필요 (관리자) |
| `PATCH` | `/v1/admin/notices/{noticeId}` | 공지사항 수정 | 필요 (관리자) |
| `DELETE` | `/v1/admin/notices/{noticeId}` | 공지사항 삭제 | 필요 (관리자) |

---

## Terms — 약관 (일반)

Base path: `/v1/terms`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/terms/latest` | 최신 약관 조회 (회원가입용) | 불필요 |

---

## AdminTerm — 약관 (관리자)

Base path: `/v1/admin/terms`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `POST` | `/v1/admin/terms` | 약관 등록 및 이메일 발송 | 필요 (관리자) |

---

## Community — 게시판

Base path: `/v1/community`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `POST` | `/v1/community/posts` | 게시글 작성 (익명 여부 선택) | 필요 |
| `GET` | `/v1/community/posts?q={keyword}&category={cat}&page={n}&size={n}` | 게시글 목록 조회/검색 | 필요 |
| `GET` | `/v1/community/posts/{postId}` | 게시글 상세 조회 | 필요 |
| `PUT` | `/v1/community/posts/{postId}` | 게시글 수정 (본인만) | 필요 |
| `DELETE` | `/v1/community/posts/{postId}` | 게시글 삭제 — 소프트 삭제 (본인만) | 필요 |

- `category`: `DEFAULT` / `DISORDER_INFO` / `MEDICATION` / `DAILY_LIFE` (선택)
- `q` 최대 100자, `size` 기본값 `20` / 최대 `100`

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 성공 |
| `201` | 생성 성공 |
| `204` | 삭제 성공 |
| `403` | 권한 없음 |
| `404` | 게시글 없음 |

---

## Community — 댓글

Base path: `/v1/community`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `GET` | `/v1/community/posts/{postId}/comments` | 댓글 목록 조회 (오래된 순) | 필요 |
| `POST` | `/v1/community/posts/{postId}/comments` | 댓글 작성 (익명 여부 선택) | 필요 |
| `PATCH` | `/v1/community/comments/{commentId}` | 댓글 수정 (본인만) | 필요 |
| `DELETE` | `/v1/community/comments/{commentId}` | 댓글 삭제 — 소프트 삭제 (본인만) | 필요 |

**응답 코드**

| 코드 | 설명 |
|------|------|
| `200` | 성공 |
| `201` | 생성 성공 |
| `204` | 삭제 성공 |
| `403` | 권한 없음 |
| `404` | 게시글/댓글 없음 |

---

## Support — 문의

Base path: `/v1/support`

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| `POST` | `/v1/support/inquiries` | 문의 생성 | 필요 |

**응답 코드**: `201` 생성 성공 / `400` 잘못된 요청

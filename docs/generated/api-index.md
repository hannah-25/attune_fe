<!-- AUTO-GENERATED — 수동 수정 금지 (DO NOT EDIT BY HAND). -->
<!-- 재생성: pnpm generate:api-index -->
<!-- 생성 시각: 2026-06-25T10:55:19.822Z -->

# API Index (생성됨)

`src/app/api/*.ts` 에서 추출한 export 함수와 호출 경로 목록 (best-effort).
정확한 요청/응답 스키마는 [`openapi/`](../../openapi) 와 [`guidelines/api-guide/`](../../guidelines/api-guide) 참고.

## `admin.ts`

소스: `src/app/api/admin.ts`

- export 함수 (5): `getAdminMembers`, `getAdminAuditLogs`, `cancelAdminMemberWithdrawal`, `changeAdminMemberStatus`, `deleteAdminMemberImmediately`
- 호출 경로 (5): `/v1/admin/members?${queryString}`, `/v1/admin/audit-logs?limit=${limit}`, `/v1/admin/members/${memberUuid}/withdrawal/cancel`, `/v1/admin/members/${memberUuid}/status`, `/v1/admin/members/${memberUuid}/withdrawal/complete`
- 감지된 메서드 예: `POST`

## `adminContent.ts`

소스: `src/app/api/adminContent.ts`

- export 함수 (7): `createAdminNotice`, `updateAdminNotice`, `deleteAdminNotice`, `sendAdminNoticePush`, `getAdminTermsList`, `sendAdminMarketingPush`, `createAdminTerms`
- 호출 경로 (5): `/v1/admin/notices`, `/v1/admin/notices/${noticeId}`, `/v1/admin/notices/${noticeId}/push`, `/v1/admin/terms`, `/v1/admin/marketing/push`
- 감지된 메서드 예: `POST`

## `alarm.ts`

소스: `src/app/api/alarm.ts`

- export 함수 (2): `subscribeAlarm`, `unsubscribeAlarm`
- 호출 경로 (2): `/v1/alarm/subscriptions`, `/v1/alarm/subscriptions?endpointOrToken=${encodeURIComponent(endpointOrToken)}`
- 감지된 메서드 예: `POST`

## `auth.ts`

소스: `src/app/api/auth.ts`

- export 함수 (13): `login`, `logout`, `signup`, `verifyEmail`, `resendVerificationEmail`, `requestPasswordReset`, `validatePasswordResetToken`, `confirmPasswordReset`, `changePassword`, `restoreAccount`, `requestAccountWithdrawal`, `socialLogin`, `restoreSocialAccount`
- 호출 경로 (13): `/v1/auth/login`, `/v1/auth/logout`, `/v1/account/signup`, `/v1/account/verify-email?token=${encodeURIComponent(token)}`, `/v1/account/verify-email/resend`, `/v1/account/password/reset`, `/v1/account/password/reset/${encodeURIComponent(token)}`, `/v1/account/password/reset/confirm`, `/v1/account/password`, `/v1/auth/restore`, `/v1/account/withdraw`, `/v1/auth/social/login`, `/v1/auth/social/restore`
- 감지된 메서드 예: `POST`

## `calendarConnection.ts`

소스: `src/app/api/calendarConnection.ts`

- export 함수 (4): `getCalendarConnections`, `connectGoogleCalendar`, `syncCalendarConnection`, `disconnectCalendarConnection`
- 호출 경로 (4): `/v1/calendar-connections`, `/v1/calendar-connections/google`, `/v1/calendar-connections/${connectionId}/sync`, `/v1/calendar-connections/${connectionId}`
- 감지된 메서드 예: `POST`

## `calendarEvents.ts`

소스: `src/app/api/calendarEvents.ts`

- export 함수 (1): `getCalendarEvents`
- 호출 경로 (1): `/v1/calendar/events?${new URLSearchParams(params)}`

## `community.ts`

소스: `src/app/api/community.ts`

- export 함수 (9): `getPosts`, `getPost`, `createPost`, `updatePost`, `deletePost`, `getComments`, `createComment`, `updateComment`, `deleteComment`
- 호출 경로 (4): `/v1/community/posts/${postId}`, `/v1/community/posts`, `/v1/community/posts/${postId}/comments`, `/v1/community/comments/${commentId}`
- 감지된 메서드 예: `GET`

## `consultation.ts`

소스: `src/app/api/consultation.ts`

- export 함수 (10): `createConsultation`, `getConsultations`, `getConsultation`, `updateConsultation`, `updateConsultationResult`, `deleteConsultation`, `deleteConsultationResult`, `getConsultationQuestions`, `createConsultationQuestion`, `deleteConsultationQuestion`
- 호출 경로 (6): `/v1/consultations`, `/v1/consultations?${new URLSearchParams(params)}`, `/v1/consultations/${consultationId}`, `/v1/consultations/${consultationId}/result`, `/v1/consultations/${consultationId}/questions`, `/v1/consultations/${consultationId}/questions/${questionId}`
- 감지된 메서드 예: `POST`

## `googleCalendarAuth.ts`

소스: `src/app/api/googleCalendarAuth.ts`

- export 함수 (1): `requestGoogleCalendarAuthorizationCode`
- 호출 경로 (0): _(추출 실패 — 동적 경로일 수 있음)_

## `journal.ts`

소스: `src/app/api/journal.ts`

- export 함수 (36): `getJournal`, `getJournalDates`, `getJournals`, `deleteJournal`, `deleteJournals`, `getConditionTags`, `createConditionTag`, `deleteConditionTag`, `toggleConditionTagVisible`, `checkCondition`, `uncheckCondition`, `getSideEffectTags`, `createSideEffectTag`, `deleteSideEffectTag`, `toggleSideEffectTagVisible`, `checkSideEffect`, `uncheckSideEffect`, `getTroubleTags`, `createTroubleTag`, `deleteTroubleTag`, `toggleTroubleTagVisible`, `checkTrouble`, `uncheckTrouble`, `getMemo`, `createSleepMeal`, `createJournalGoal`, `updateJournalGoal`, `deleteJournalGoal`, `scoreJournalGoal`, `createMemo`, `getJournalTags`, `updateJournalTagPreference`, `createJournalTag`, `checkJournalTag`, `uncheckJournalTag`, `deleteJournalTag`
- 호출 경로 (30): `${JOURNALS_BASE_PATH}/${date}`, `${JOURNALS_BASE_PATH}/dates?${new URLSearchParams(params)}`, `${JOURNALS_BASE_PATH}?${new URLSearchParams(params)}`, `${JOURNALS_BASE_PATH}/condition-tags`, `${JOURNALS_BASE_PATH}/condition-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, `${JOURNALS_BASE_PATH}/condition-tags/${tagId}/visible`, `${JOURNALS_BASE_PATH}/conditions`, `${JOURNALS_BASE_PATH}/conditions?tagId=${tagId}&date=${encodeURIComponent(date)}`, `${JOURNALS_BASE_PATH}/side-effect-tags`, `${JOURNALS_BASE_PATH}/side-effect-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, `${JOURNALS_BASE_PATH}/side-effect-tags/${tagId}/visible`, `${JOURNALS_BASE_PATH}/side-effects`, `${JOURNALS_BASE_PATH}/side-effects?tagId=${tagId}&date=${encodeURIComponent(date)}`, `${JOURNALS_BASE_PATH}/trouble-tags`, `${JOURNALS_BASE_PATH}/trouble-tags/${tagId}?journalDate=${encodeURIComponent(journalDate)}`, `${JOURNALS_BASE_PATH}/trouble-tags/${tagId}/visible`, `${JOURNALS_BASE_PATH}/troubles`, `${JOURNALS_BASE_PATH}/troubles?tagId=${tagId}&date=${encodeURIComponent(date)}`, `${JOURNALS_BASE_PATH}/${date}/memo`, `${JOURNALS_BASE_PATH}/${date}/sleep-meal`, `${JOURNALS_BASE_PATH}/goals`, `${JOURNALS_BASE_PATH}/goals/${goalId}`, `${JOURNALS_BASE_PATH}/goals/${goalId}?journalDate=${encodeURIComponent(journalDate)}`, `${JOURNALS_BASE_PATH}/${date}/goals`, `${JOURNALS_BASE_PATH}/tags?${params}`, `${JOURNALS_BASE_PATH}/tags/${tagId}/preference`, `${JOURNALS_BASE_PATH}/tags`, `${JOURNALS_BASE_PATH}/tags/${tagId}/checks`, `${JOURNALS_BASE_PATH}/tags/${tagId}/checks?date=${encodeURIComponent(date)}`, `${JOURNALS_BASE_PATH}/tags/${tagId}`
- 감지된 메서드 예: `DELETE`

## `medication.ts`

소스: `src/app/api/medication.ts`

- export 함수 (9): `getDosageId`, `searchMedications`, `getMedications`, `getMedicationStandard`, `createMedication`, `updateMedication`, `getMedicationLogs`, `getAllMedicationLogs`, `createQuickMedicationLog`
- 호출 경로 (7): `/v1/medications${query}`, `/v1/user-medications`, `/v1/medications/standards/${medicationId}`, `/v1/user-medications/${userMedicationId}`, `/v1/user-medications/${userMedicationId}/logs${query}`, `/v1/user-medications/logs?${new URLSearchParams(params)}`, `/v1/user-medications/${userMedicationId}/log/quick`
- 감지된 메서드 예: `POST`

## `medicationAnalysis.ts`

소스: `src/app/api/medicationAnalysis.ts`

- export 함수 (7): `getAvailability`, `getSummary`, `createReport`, `getReports`, `getReport`, `giveAiConsent`, `revokeAiConsent`
- 호출 경로 (5): `/v1/medication-analysis/availability?startDate=${startDate}&endDate=${endDate}`, `/v1/medication-analysis/summary?startDate=${startDate}&endDate=${endDate}`, `/v1/medication-analysis/reports`, `/v1/medication-analysis/reports/${reportId}`, `/v1/ai-analysis-consent`
- 감지된 메서드 예: `POST`

## `notice.ts`

소스: `src/app/api/notice.ts`

- export 함수 (3): `getNotices`, `getNotice`, `normalizeNoticeListResponse`
- 호출 경로 (2): `/v1/notices?${new URLSearchParams(toStringParams(params))}`, `/v1/notices/${noticeId}`

## `onboarding.ts`

소스: `src/app/api/onboarding.ts`

- export 함수 (9): `getOnboardingStatus`, `getOnboardingHistory`, `getOnboardingHistoryDetail`, `skipOnboarding`, `submitAsrs`, `submitOnboardingSymptoms`, `getAiRecommendations`, `submitOnboardingGoals`, `completeOnboarding`
- 호출 경로 (9): `/v1/onboarding/status`, `/v1/onboarding/history`, `/v1/onboarding/history/${encodeURIComponent(id)}`, `/v1/onboarding/skip`, `/v1/onboarding/asrs`, `/v1/onboarding/symptoms`, `/v1/onboarding/ai-recommendations`, `/v1/onboarding/goals`, `/v1/onboarding/complete`
- 감지된 메서드 예: `POST`

## `schedule.ts`

소스: `src/app/api/schedule.ts`

- export 함수 (10): `getScheduleCategories`, `createScheduleCategory`, `updateScheduleCategory`, `deleteScheduleCategory`, `createSchedule`, `getSchedules`, `getSchedule`, `updateSchedule`, `deleteSchedule`, `updateScheduleAlarms`
- 호출 경로 (6): `/v1/schedule-categories`, `/v1/schedule-categories/${categoryId}`, `/v1/schedules`, `/v1/schedules?${new URLSearchParams(removeEmpty(params))}`, `/v1/schedules/${scheduleId}`, `/v1/schedules/${scheduleId}/alarms`
- 감지된 메서드 예: `POST`

## `social.ts`

소스: `src/app/api/social.ts`

- export 함수 (5): `extractEmailFromIdentityToken`, `preloadSocialSdks`, `signInWithGoogle`, `signInWithKakao`, `signInWithApple`
- 호출 경로 (0): _(추출 실패 — 동적 경로일 수 있음)_

## `support.ts`

소스: `src/app/api/support.ts`

- export 함수 (1): `createSupportInquiry`
- 호출 경로 (1): `/v1/support/inquiries`
- 감지된 메서드 예: `POST`

## `terms.ts`

소스: `src/app/api/terms.ts`

- export 함수 (1): `getLatestTerms`
- 호출 경로 (1): `/v1/terms/latest`

## `todo.ts`

소스: `src/app/api/todo.ts`

- export 함수 (4): `createTodo`, `getTodosByDate`, `getTodo`, `updateTodo`
- 호출 경로 (3): `/v1/todos`, `/v1/todos?${new URLSearchParams({ date })}`, `/v1/todos/${todoId}`
- 감지된 메서드 예: `POST`

## `user.ts`

소스: `src/app/api/user.ts`

- export 함수 (5): `getMyProfile`, `updateNickname`, `updateProfileImage`, `getUserSettings`, `updateUserSettings`
- 호출 경로 (4): `/v1/users/me/profile`, `/v1/users/me/nickname`, `/v1/users/me/image`, `/v1/users/settings`
- 감지된 메서드 예: `PUT`

---

총 20 개 API 모듈.
공통 요청 규약(인증 헤더, `/api/`→`/v1/` 정규화, 401 재발급, 오프라인 폴백)은 `src/app/api/client.ts` 참고.

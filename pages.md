# Attune 화면 목록

로컬: `http://localhost:5173` / 모바일: `http://<내 IP>:5173`

## 인증
| 경로 | 화면 | 파일 |
|------|------|------|
| `/splash` | Splash | `src/pages/auth/SplashPage.tsx` |
| `/signup` | 회원가입 | `src/pages/auth/SignupPage.tsx` |
| `/verify-email` | 인증메일 발송 | `src/pages/auth/VerifyEmailPage.tsx` |
| `/login` | 로그인 | `src/pages/auth/LoginPage.tsx` |
| `/reset-password/1` | 비밀번호 재설정 1/3 | `src/pages/auth/ResetPassword1Page.tsx` |
| `/reset-password/2` | 비밀번호 재설정 2/3 | `src/pages/auth/ResetPassword2Page.tsx` |
| `/reset-password/3` | 비밀번호 재설정 3/3 | `src/pages/auth/ResetPassword3Page.tsx` |

## 온보딩
| 경로 | 화면 | 파일 |
|------|------|------|
| `/onboarding/1` | 온보딩 진입 (INIT-001) | `src/pages/onboarding/Onboarding1Page.tsx` |
| `/onboarding/2` | 초기 증상 서술 (INIT-002) | `src/pages/onboarding/Onboarding2Page.tsx` |
| `/onboarding/3` | ASRS 체크리스트 (INIT-003) | `src/pages/onboarding/Onboarding3Page.tsx` |
| `/onboarding/4` | 목표 설정 (INIT-004) | `src/pages/onboarding/Onboarding4Page.tsx` |
| `/onboarding/5` | 키워드 추출 · 완료 | `src/pages/onboarding/Onboarding5Page.tsx` |

## 홈
| 경로 | 화면 | 파일 |
|------|------|------|
| `/home` | 리스트 대시보드 | `src/pages/home/HomeListPage.tsx` |
| `/home/calendar` | 캘린더 타임라인 | `src/pages/home/HomeCalendarPage.tsx` |

## 일지
| 경로 | 화면 | 파일 |
|------|------|------|
| `/journal` | 전체 그리드 | `src/pages/journal/JournalFullPage.tsx` |
| `/journal/timeline` | 타임라인 스트림 | `src/pages/journal/JournalTimelinePage.tsx` |
| `/journal/calendar` | 일지 캘린더 | `src/pages/journal/JournalCalendarPage.tsx` |
| `/journal/tags` | 태그 관리 | `src/pages/journal/JournalTagsPage.tsx` |

## 복약
| 경로 | 화면 | 파일 |
|------|------|------|
| `/medication` | 복용 중인 약 (MED-001) | `src/pages/medication/MedicationListPage.tsx` |
| `/medication/add` | 약 추가 (MED-001-C) | `src/pages/medication/MedicationAddPage.tsx` |
| `/medication/alarm` | 복용 알림 잠금화면 (MED-003) | `src/pages/medication/MedicationAlarmPage.tsx` |
| `/medication/info` | 표준 정보 · 혈중농도 (MED-005) | `src/pages/medication/MedicationInfoPage.tsx` |
| `/medication/history` | 복용 이력 (MED-004) | `src/pages/medication/MedicationHistoryPage.tsx` |

## 캘린더
| 경로 | 화면 | 파일 |
|------|------|------|
| `/calendar` | 월간 통합뷰 (CAL-001) | `src/pages/calendar/CalendarMainPage.tsx` |
| `/calendar/event` | 일정 상세 | `src/pages/calendar/EventDetailPage.tsx` |
| `/calendar/new` | 새 일정 · 카테고리 (CAL-003) | `src/pages/calendar/NewEventPage.tsx` |
| `/calendar/external` | 외부 캘린더 연동 | `src/pages/calendar/ExternalCalendarPage.tsx` |

## 리포트
| 경로 | 화면 | 파일 |
|------|------|------|
| `/report` | 주간 대시보드 (ANL-001) | `src/pages/report/ReportWeeklyPage.tsx` |
| `/report/monthly` | 월별 리포트 목록 | `src/pages/report/ReportMonthlyListPage.tsx` |
| `/report/monthly/detail` | 월별 상세 · AI 인사이트 | `src/pages/report/ReportMonthlyDetailPage.tsx` |

## 상담
| 경로 | 화면 | 파일 |
|------|------|------|
| `/counseling` | 상담 일정 (CNS-001) | `src/pages/counseling/CounselingListPage.tsx` |
| `/counseling/prepare` | 상담 전 준비 (CNS-002) | `src/pages/counseling/CounselingPreparePage.tsx` |
| `/counseling/result` | 상담 후 결과 (CNS-003) | `src/pages/counseling/CounselingResultPage.tsx` |

## 커뮤니티
| 경로 | 화면 | 파일 |
|------|------|------|
| `/community/notice` | 공지사항 (BOARD-01) | `src/pages/community/CommunityNoticePage.tsx` |
| `/community` | 경험 공유 피드 (BOARD-02) | `src/pages/community/CommunityFeedPage.tsx` |
| `/community/post` | 글 상세 · 댓글 | `src/pages/community/CommunityPostPage.tsx` |
| `/community/write` | 글쓰기 | `src/pages/community/CommunityWritePage.tsx` |

## 빈 상태 (Empty States)
| 경로 | 화면 | 파일 |
|------|------|------|
| `/empty/journal` | 일지 없음 | `src/pages/empty/EmptyJournalPage.tsx` |
| `/empty/medication` | 약 없음 | `src/pages/empty/EmptyMedicationPage.tsx` |
| `/empty/calendar` | 일정 없음 | `src/pages/empty/EmptyCalendarPage.tsx` |
| `/empty/report` | 리포트 데이터 부족 | `src/pages/empty/EmptyReportPage.tsx` |
| `/empty/community-search` | 커뮤니티 검색 결과 없음 | `src/pages/empty/EmptyCommunitySearchPage.tsx` |

## 설정
| 경로 | 화면 | 파일 |
|------|------|------|
| `/settings` | 마이페이지 | `src/pages/settings/MyPage.tsx` |
| `/settings/notifications` | 알림 설정 | `src/pages/settings/NotificationSettingsPage.tsx` |
| `/settings/withdraw` | 회원 탈퇴 | `src/pages/settings/WithdrawPage.tsx` |

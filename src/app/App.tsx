import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, Routes, Route, useLocation } from 'react-router';
import logoSquare from '@src/assets/logo-square.png';
import { AppViewport } from './components/AppViewport';
import GuestBanner from './components/GuestBanner';
import { getAccessToken } from './api/client';
import { isGuestMode } from './guest';
import { getOnboardingHistory } from './api/onboarding';
import TimezoneSyncPrompt from './components/TimezoneSyncPrompt';
import { SyncService } from './offline/SyncService';
import { preloadOfflineAssets } from './offline/preloadAssets';
import { syncPushSubscription } from './lib/pushSubscription';

// Auth
import SplashPage from '../pages/auth/SplashPage';
import SignupPage from '../pages/auth/SignupPage';
import VerifyEmailPage from '../pages/auth/VerifyEmailPage';
import LoginPage from '../pages/auth/LoginPage';
import ResetPassword1Page from '../pages/auth/ResetPassword1Page';
import ResetPassword2Page from '../pages/auth/ResetPassword2Page';
import ResetPassword3Page from '../pages/auth/ResetPassword3Page';

// Onboarding
import Onboarding1Page from '../pages/onboarding/Onboarding1Page';
import Onboarding2Page from '../pages/onboarding/Onboarding2Page';
import Onboarding3Page from '../pages/onboarding/Onboarding3Page';
import Onboarding4Page from '../pages/onboarding/Onboarding4Page';
import Onboarding5Page from '../pages/onboarding/Onboarding5Page';
import OnboardingHistoryPage from '../pages/onboarding/OnboardingHistoryPage';
import OnboardingHistoryDetailPage from '../pages/onboarding/OnboardingHistoryDetailPage';
import OnboardingQuickPage from '../pages/onboarding/OnboardingQuickPage';
import OnboardingAiLoadingPage from '../pages/onboarding/OnboardingAiLoadingPage';
import OnboardingAiResultPage from '../pages/onboarding/OnboardingAiResultPage';

// Home
import HomeListPage from '../pages/home/HomeListPage';

// Notifications
import NotificationInboxPage from '../pages/notifications/NotificationInboxPage';

// Journal
import JournalFullPage from '../pages/journal/JournalFullPage';
import JournalTimelinePage from '../pages/journal/JournalTimelinePage';
import JournalCalendarPage from '../pages/journal/JournalCalendarPage';
import JournalTagsPage from '../pages/journal/JournalTagsPage';

// Medication
import MedicationListPage from '../pages/medication/MedicationListPage';
import MedicationAddPage from '../pages/medication/MedicationAddPage';
import MedicationAlarmPage from '../pages/medication/MedicationAlarmPage';
import MedicationInfoPage from '../pages/medication/MedicationInfoPage';
import MedicationHistoryPage from '../pages/medication/MedicationHistoryPage';

// Calendar
import CalendarMainPage from '../pages/calendar/CalendarMainPage';
import EventDetailPage from '../pages/calendar/EventDetailPage';
import NewEventPage from '../pages/calendar/NewEventPage';
import NewTodoPage from '../pages/calendar/NewTodoPage';
import ExternalCalendarPage from '../pages/calendar/ExternalCalendarPage';

// Report
import ReportWeeklyPage from '../pages/report/ReportWeeklyPage';
import ReportMonthlyListPage from '../pages/report/ReportMonthlyListPage';
import ReportMonthlyDetailPage from '../pages/report/ReportMonthlyDetailPage';

// Counseling
import CounselingListPage from '../pages/counseling/CounselingListPage';
import CounselingAddPage from '../pages/counseling/CounselingAddPage';
import CounselingPreparePage from '../pages/counseling/CounselingPreparePage';
import CounselingResultPage from '../pages/counseling/CounselingResultPage';

// Community
import CommunityNoticePage from '../pages/community/CommunityNoticePage';
import CommunityFeedPage from '../pages/community/CommunityFeedPage';
import CommunityPostPage from '../pages/community/CommunityPostPage';
import CommunityWritePage from '../pages/community/CommunityWritePage';

// Empty States
import EmptyJournalPage from '../pages/empty/EmptyJournalPage';
import EmptyMedicationPage from '../pages/empty/EmptyMedicationPage';
import EmptyCalendarPage from '../pages/empty/EmptyCalendarPage';
import EmptyReportPage from '../pages/empty/EmptyReportPage';
import EmptyCommunitySearchPage from '../pages/empty/EmptyCommunitySearchPage';

// Settings
import MyPage from '../pages/settings/MyPage';
import NotificationSettingsPage from '../pages/settings/NotificationSettingsPage';
import WithdrawPage from '../pages/settings/WithdrawPage';
import InquiryPage from '../pages/settings/InquiryPage';

import OverviewPage from './pages/OverviewPage';

const AdminMembersPage = lazy(() => import('../pages/admin/AdminMembersPage'));
const AdminNoticesPage = lazy(() => import('../pages/admin/AdminNoticesPage'));
const AdminTermsPage = lazy(() => import('../pages/admin/AdminTermsPage'));
const AdminMarketingPage = lazy(() => import('../pages/admin/AdminMarketingPage'));

function AppLoadingScreen() {
  return (
    <div className="w-full h-full bg-gray-50 flex items-center justify-center" aria-live="polite">
      <img
        src={logoSquare}
        alt="a.tune 불러오는 중"
        className="w-36 h-36 object-contain"
        style={{ animation: 'float 3s ease-in-out infinite' }}
      />
    </div>
  );
}

function ProtectedRoute() {
  const location = useLocation();
  const skippedOnboardingThisSession = useRef(
    (location.state as { onboardingSkipped?: boolean } | null)?.onboardingSkipped === true,
  ).current;
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(() => !skippedOnboardingThisSession);
  const [onboardingRedirect, setOnboardingRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (isGuestMode() || !getAccessToken() || !navigator.onLine) return;

    SyncService.initialize().catch(err => {
      if (import.meta.env.DEV) console.error('[SyncService] initialize failed:', err);
    });

    // 브라우저가 구독을 교체·폐기해도 서버 등록이 낡은 채로 남지 않게 한다.
    // 로그인 직후에도 여기서 돈다 — /login이 이 라우트 바깥이라 새로 마운트되기 때문.
    // 실패는 내부에서 흡수하고 로깅하므로 여기서 다루지 않는다.
    void syncPushSubscription();
  }, []);

  useEffect(() => {
    if (isGuestMode() || !getAccessToken() || skippedOnboardingThisSession) {
      setIsCheckingOnboarding(false);
      return;
    }

    let ignore = false;
    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      if (!ignore) setIsCheckingOnboarding(false);
    }, 5_000);

    getOnboardingHistory()
      .then(({ records }) => (records.length > 0 ? null : '/onboarding/1'))
      .then((destination) => {
        if (!ignore && !timedOut) setOnboardingRedirect(destination);
      })
      .catch((error) => {
        console.error('Failed to get onboarding status while routing:', error);
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
        if (!ignore && !timedOut) setIsCheckingOnboarding(false);
      });

    return () => {
      ignore = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!getAccessToken() && !isGuestMode()) {
    return <Navigate to="/login" replace />;
  }
  if (isCheckingOnboarding) return <AppLoadingScreen />;
  if (onboardingRedirect) return <Navigate to={onboardingRedirect} replace />;
  return (
    <div className="flex flex-col h-full">
      {isGuestMode() && <GuestBanner />}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Outlet />
      </div>
      <TimezoneSyncPrompt />
    </div>
  );
}

function AdminRoute() {
  const usesMockAdminApi =
    import.meta.env.DEV
    && (import.meta.env.VITE_ADMIN_USE_MOCK as string | undefined) === 'true';

  if (!usesMockAdminApi && (!getAccessToken() || isGuestMode())) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function RootRoute() {
  if (isGuestMode()) return <Navigate to="/home" replace />;
  return <Navigate to={getAccessToken() ? '/home' : '/splash'} replace />;
}

export default function App() {
  useEffect(() => {
    SyncService.startListening();
    preloadOfflineAssets();
  }, []);

  return (
    <AppViewport>
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route element={<AdminRoute />}>
          <Route
            path="/admin"
            element={(
              <Suspense fallback={<AppLoadingScreen />}>
                <AdminMembersPage />
              </Suspense>
            )}
          />
          <Route
            path="/admin/notices"
            element={(
              <Suspense fallback={<AppLoadingScreen />}>
                <AdminNoticesPage />
              </Suspense>
            )}
          />
          <Route
            path="/admin/terms"
            element={(
              <Suspense fallback={<AppLoadingScreen />}>
                <AdminTermsPage />
              </Suspense>
            )}
          />
          <Route
            path="/admin/marketing"
            element={(
              <Suspense fallback={<AppLoadingScreen />}>
                <AdminMarketingPage />
              </Suspense>
            )}
          />
        </Route>

        {/* Auth */}
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password/1" element={<ResetPassword1Page />} />
        <Route path="/reset-password/2" element={<ResetPassword2Page />} />
        <Route path="/reset-password/3" element={<ResetPassword3Page />} />
        <Route path="/reset-password/3/:token" element={<ResetPassword3Page />} />

        {/* Onboarding */}
        <Route path="/onboarding/1" element={<Onboarding1Page />} />
        <Route path="/onboarding/2" element={<Onboarding2Page />} />
        <Route path="/onboarding/3" element={<Onboarding3Page />} />
        <Route path="/onboarding/4" element={<Onboarding4Page />} />
        <Route path="/onboarding/5" element={<Onboarding5Page />} />
        <Route path="/onboarding/quick" element={<OnboardingQuickPage />} />
        <Route path="/onboarding/ai-loading" element={<OnboardingAiLoadingPage />} />
        <Route path="/onboarding/ai-result" element={<OnboardingAiResultPage />} />

        {/* Protected routes — 토큰 없으면 /login 리다이렉트 */}
        <Route element={<ProtectedRoute />}>
          {/* Onboarding history */}
          <Route path="/onboarding/history" element={<OnboardingHistoryPage />} />
          <Route path="/onboarding/history/:id" element={<OnboardingHistoryDetailPage />} />

          {/* Home */}
          <Route path="/home" element={<HomeListPage />} />
          <Route path="/home/calendar" element={<Navigate to="/calendar" replace />} />

          {/* Notifications */}
          <Route path="/notifications" element={<NotificationInboxPage />} />

          {/* Journal */}
          <Route path="/journal" element={<JournalFullPage />} />
          <Route path="/journal/write" element={<JournalFullPage />} />
          <Route path="/journal/timeline" element={<JournalTimelinePage />} />
          <Route path="/journal/calendar" element={<JournalCalendarPage />} />
          <Route path="/journal/tags" element={<JournalTagsPage />} />

          {/* Medication */}
          <Route path="/medication" element={<MedicationListPage />} />
          <Route path="/medication/add" element={<MedicationAddPage />} />
          <Route path="/medication/alarm" element={<MedicationAlarmPage />} />
          <Route path="/medication/info" element={<MedicationInfoPage />} />
          <Route path="/medication/history" element={<MedicationHistoryPage />} />

          {/* Calendar */}
          <Route path="/calendar" element={<CalendarMainPage />} />
          <Route path="/calendar/event" element={<EventDetailPage />} />
          <Route path="/calendar/new" element={<NewEventPage />} />
          <Route path="/calendar/new-todo" element={<NewTodoPage />} />
          <Route path="/calendar/external" element={<ExternalCalendarPage />} />

          {/* Report */}
          <Route path="/report" element={<ReportWeeklyPage />} />
          <Route path="/report/monthly" element={<ReportMonthlyListPage />} />
          <Route path="/report/monthly/detail" element={<ReportMonthlyDetailPage />} />

          {/* Counseling */}
          <Route path="/counseling" element={<CounselingListPage />} />
          <Route path="/counseling/add" element={<CounselingAddPage />} />
          <Route path="/counseling/prepare" element={<CounselingPreparePage />} />
          <Route path="/counseling/result" element={<CounselingResultPage />} />

          {/* Community */}
          <Route path="/community/notice" element={<CommunityNoticePage />} />
          <Route path="/community" element={<CommunityFeedPage />} />
          <Route path="/community/post/:postId" element={<CommunityPostPage />} />
          <Route path="/community/write" element={<CommunityWritePage />} />

          {/* Empty States */}
          <Route path="/empty/journal" element={<EmptyJournalPage />} />
          <Route path="/empty/medication" element={<EmptyMedicationPage />} />
          <Route path="/empty/calendar" element={<EmptyCalendarPage />} />
          <Route path="/empty/report" element={<EmptyReportPage />} />
          <Route path="/empty/community-search" element={<EmptyCommunitySearchPage />} />

          {/* Settings */}
          <Route path="/settings" element={<MyPage />} />
          <Route path="/settings/notifications" element={<NotificationSettingsPage />} />
          <Route path="/settings/withdraw" element={<WithdrawPage />} />
          <Route path="/settings/inquiry" element={<InquiryPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
        </Route>
      </Routes>
    </AppViewport>
  );
}

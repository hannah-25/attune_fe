import { useEffect, useState } from 'react';
import { Navigate, Outlet, Routes, Route } from 'react-router';
import { AppViewport } from './components/AppViewport';
import { getAccessToken } from './api/client';
import { getMyProfile } from './api/user';

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

// Home
import HomeListPage from '../pages/home/HomeListPage';
import HomeCalendarPage from '../pages/home/HomeCalendarPage';

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

function ProtectedRoute() {
  if (!getAccessToken()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

function RootRoute() {
  const [destination, setDestination] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getMyProfile()
      .then(() => {
        if (!ignore) setDestination('/home');
      })
      .catch(() => {
        if (!ignore) setDestination('/splash');
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (!destination) return null;

  return <Navigate to={destination} replace />;
}

export default function App() {
  return (
    <AppViewport>
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/overview" element={<OverviewPage />} />

        {/* Auth */}
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password/1" element={<ResetPassword1Page />} />
        <Route path="/reset-password/2" element={<ResetPassword2Page />} />
        <Route path="/reset-password/3" element={<ResetPassword3Page />} />

        {/* Onboarding */}
        <Route path="/onboarding/1" element={<Onboarding1Page />} />
        <Route path="/onboarding/2" element={<Onboarding2Page />} />
        <Route path="/onboarding/3" element={<Onboarding3Page />} />
        <Route path="/onboarding/4" element={<Onboarding4Page />} />
        <Route path="/onboarding/5" element={<Onboarding5Page />} />

        {/* Protected routes — 토큰 없으면 /login 리다이렉트 */}
        <Route element={<ProtectedRoute />}>
          {/* Home */}
          <Route path="/home" element={<HomeListPage />} />
          <Route path="/home/calendar" element={<HomeCalendarPage />} />

          {/* Journal */}
          <Route path="/journal" element={<JournalFullPage />} />
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
          <Route path="/counseling/prepare" element={<CounselingPreparePage />} />
          <Route path="/counseling/result" element={<CounselingResultPage />} />

          {/* Community */}
          <Route path="/community/notice" element={<CommunityNoticePage />} />
          <Route path="/community" element={<CommunityFeedPage />} />
          <Route path="/community/post" element={<CommunityPostPage />} />
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
        </Route>
      </Routes>
    </AppViewport>
  );
}

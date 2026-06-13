import { apiRequest } from './client';

export type AsrsAnswer = {
  questionId: number;
  score: number;
};

export type DailyGoalType = 'WORK_STUDY' | 'TIME_MANAGEMENT' | 'LIFE_MANAGEMENT' | 'EMOTIONAL_SOCIAL';
export type OnboardingSymptomType = 'INATTENTION' | 'HYPERACTIVITY';

export type AiTagItem = {
  id: number;
  trouble: string;
  type: string;
  recommended: boolean;
};

export type AiGoalItem = {
  goal: string;
  type: DailyGoalType;
};

export type AiRecommendationResponse = {
  tags: AiTagItem[];
  goals: AiGoalItem[];
};

export type OnboardingResumeStep = 2 | 3 | 4 | 5;

export type OnboardingStatus = {
  onboarded: boolean;
  onboardedAt: string | null;
  skipped: boolean;
  resumeStep: OnboardingResumeStep | null;
};

export type OnboardingHistoryRecord = {
  id: string;
  doneAt: string;
  inattentionScore: number;
  hyperactivityScore: number;
  goalCount: number;
};

export type OnboardingHistoryResponse = {
  records: OnboardingHistoryRecord[];
};

export type OnboardingHistoryDetail = {
  id: string;
  doneAt: string;
  inattentionScore: number;
  hyperactivityScore: number;
  symptom: {
    description: string | null;
    emotionalEvent: string | null;
    isQuickOnboarding: boolean;
    selectedSymptomTypes: OnboardingSymptomType[] | null;
    selectedFunctionalAreas: DailyGoalType[] | null;
  };
  goals: {
    id: number;
    title: string;
    type: DailyGoalType;
  }[];
};

export function getOnboardingStatus() {
  return apiRequest<OnboardingStatus>('/v1/onboarding/status');
}

export function getOnboardingHistory() {
  return apiRequest<OnboardingHistoryResponse>('/v1/onboarding/history');
}

export function getOnboardingHistoryDetail(id: string) {
  return apiRequest<OnboardingHistoryDetail>(`/v1/onboarding/history/${encodeURIComponent(id)}`);
}

export function skipOnboarding() {
  return apiRequest<void>('/v1/onboarding/skip', {
    method: 'POST',
  });
}

export function submitAsrs(answers: AsrsAnswer[]) {
  return apiRequest<{ totalScore: number; partAScore: number }>('/v1/onboarding/asrs', {
    method: 'POST',
    body: { answers },
  });
}

export function submitOnboardingSymptoms(payload: {
  description?: string;
  emotionalEvent?: string;
  selectedSymptomTypes?: OnboardingSymptomType[];
  selectedFunctionalAreas?: DailyGoalType[];
  isQuickOnboarding?: boolean;
}) {
  return apiRequest<void>('/v1/onboarding/symptoms', {
    method: 'POST',
    body: payload,
  });
}

export function getAiRecommendations() {
  return apiRequest<AiRecommendationResponse>('/v1/onboarding/ai-recommendations', {
    method: 'POST',
  });
}

export function submitOnboardingGoals(payload: {
  goals: { goal: string; type: DailyGoalType }[];
  visibleTagIds: number[];
}) {
  return apiRequest<void>('/v1/onboarding/goals', {
    method: 'POST',
    body: {
      goals: payload.goals.map(({ goal, type }) => ({ title: goal, type })),
      visibleTagIds: payload.visibleTagIds,
    },
  });
}

export function completeOnboarding() {
  return apiRequest<{ onboardedAt: string }>('/v1/onboarding/complete', {
    method: 'POST',
  });
}

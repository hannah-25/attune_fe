import { apiRequest } from './client';

export type AsrsAnswer = {
  questionId: number;
  score: number;
};

export type OnboardingGoal = {
  title: string;
  description?: string;
};

export function submitAsrs(answers: AsrsAnswer[]) {
  return apiRequest<{ totalScore: number; partAScore: number }>('/api/onboarding/asrs', {
    method: 'POST',
    body: { answers },
  });
}

export function submitOnboardingSymptoms(payload: { description: string; emotionalEvent: string }) {
  return apiRequest<void>('/api/onboarding/symptoms', {
    method: 'POST',
    body: payload,
  });
}

export function submitOnboardingGoals(goals: OnboardingGoal[]) {
  return apiRequest<void>('/api/onboarding/goals', {
    method: 'POST',
    body: { goals },
  });
}

export function completeOnboarding() {
  return apiRequest<{ onboardedAt: string }>('/api/onboarding/complete', {
    method: 'POST',
  });
}

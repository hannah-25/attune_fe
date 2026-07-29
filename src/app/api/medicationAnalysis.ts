import { apiRequest } from './client';

export type ReportStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'OUTDATED';

export type AvailabilityResult = {
  available: boolean;
  recordedDays: number;
  unavailableReasons: string[];
};

export type SummaryStats = {
  totalScheduled: number;
  takenCount: number;
  skippedCount: number;
  unrecordedCount: number;
  adherenceRate: number;
  recordingRate: number;
};

export type DailyMedicationGroup = 'TAKEN_DAY' | 'SKIPPED_ONLY_DAY' | 'UNRECORDED_DAY';

export type ReportSnapshot = {
  period: { start: string; end: string; days: number };
  dataQuality: {
    recordedDays: number;
    confidence: 'HIGH' | 'MEDIUM' | 'LOW';
    limitations: string[];
  };
  adherenceSummary: {
    totalScheduled: number;
    takenCount: number;
    skippedCount: number;
    unrecordedCount: number;
    adherenceRate: number;
    recordingRate: number;
    byTimeWindow: Array<{
      window: string;
      takenCount: number;
      skippedCount: number;
      unrecordedCount: number;
    }>;
  };
  dailyMedicationStatuses: Array<{
    date: string;
    group: DailyMedicationGroup;
    takenCount: number;
    skippedCount: number;
    unrecordedCount: number;
  }>;
  dayGroupComparisons: Array<{
    group: string;
    dayCount: number;
    eligible: boolean;
    avgGoalScore: number | null;
    conditionDayCounts: Record<string, number> | null;
    sideEffectDayCounts: Record<string, number> | null;
    troubleDayCounts: Record<string, number> | null;
    avgSleepHour: number | null;
    sleepQualityDist: Record<string, number> | null;
    breakfastRate: number | null;
    lunchRate: number | null;
    dinnerRate: number | null;
  }>;
  timeWindowPatterns: Array<{
    window: string;
    evidenceId: string;
    conditionDayCounts: Record<string, number>;
    sideEffectDayCounts: Record<string, number>;
    troubleDayCounts: Record<string, number>;
    medicationTakenDays: number;
  }>;
  sideEffects: Array<{
    tagId: number;
    tagName: string;
    recordedDays: number;
    peakWindow: string | null;
    recordedDates: string[];
  }>;
  medicationChanges: Array<{
    changeType: string;
    confirmed: boolean;
    changeDate: string;
    consultationId: number | null;
    medicationName: string;
    dosage: string;
    previousMedicationName: string | null;
    previousDosage: string | null;
    beforeAfterComparison: {
      eligible: boolean;
      ineligibleReason: string | null;
    };
  }>;
  memoEvidence: unknown[];
};

export type AiInsight = {
  category: string;
  title: string;
  description: string;
  evidenceIds: string[];
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  limitation: string;
};

export type AiResult = {
  summary: string;
  insights: AiInsight[];
  consultationQuestions: string[];
  disclaimer: string;
};

export type MedicationReport = {
  reportId: number;
  periodStart: string;
  periodEnd: string;
  status: ReportStatus;
  outdated: boolean;
  snapshotJson: string;
  aiResultJson: string | null;
  generatedAt: string;
};

export function getAvailability(startDate: string, endDate: string) {
  return apiRequest<AvailabilityResult>(
    `/v1/medication-analysis/availability?startDate=${startDate}&endDate=${endDate}`,
  );
}

export function getSummary(startDate: string, endDate: string) {
  return apiRequest<SummaryStats>(
    `/v1/medication-analysis/summary?startDate=${startDate}&endDate=${endDate}`,
  );
}

export function createReport(payload: {
  periodStart: string;
  periodEnd: string;
  includeMemoExcerpts: boolean;
}) {
  return apiRequest<MedicationReport>('/v1/medication-analysis/reports', {
    method: 'POST',
    body: payload,
  });
}

export function getReports() {
  return apiRequest<MedicationReport[]>('/v1/medication-analysis/reports');
}

export function getReport(reportId: number) {
  return apiRequest<MedicationReport>(`/v1/medication-analysis/reports/${reportId}`);
}

export function giveAiConsent() {
  return apiRequest<void>('/v1/ai-analysis-consent', { method: 'PUT' });
}

export function revokeAiConsent() {
  return apiRequest<void>('/v1/ai-analysis-consent', { method: 'DELETE' });
}

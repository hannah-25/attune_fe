import { apiRequest } from './client';
import type { PkProfile } from '@/lib/pk';

export type MedicationLogStatus = 'TAKEN' | 'SKIPPED' | 'MISSED';
export type QuickMedicationLogAction = 'TAKEN' | 'POSTPONE' | 'SKIPPED';

export type MedicationDosageOption = {
  medicationDosageId?: number;
  dosageId?: number;
  id?: number;
  amount: number;
};

export function getDosageId(d: MedicationDosageOption): number {
  return (d.medicationDosageId ?? d.dosageId ?? d.id) as number;
}

export type MedicationSearchResult = {
  medicationId: number;
  name: string;
  ingredient: string;
  dosageOptions?: MedicationDosageOption[];
};

export type MedicationStandard = {
  name: string;
  ingredient: string;
  indications: string;
  sideEffects: string;
  description: string;
  /**
   * @deprecated 정적 이미지(또는 빈 값) 혈중 농도 그래프. PK 모델 기반 동적 곡선
   * (`pkProfile` → `MedicationConcentrationCard`)으로 대체됨. BE가 더 이상 내려주지
   * 않게 되면 제거. 신규 코드에서 사용 금지.
   */
  bloodConcentrationGraph?: string;
  /** PK 모델 프로필. BE 미지원 시 약물 이름으로 fallback 해석(@/lib/pk resolveProfile). */
  pkProfile?: PkProfile;
  imageUrl?: string;
  sourceUrl?: string;
  dosageOptions?: MedicationDosageOption[];
};

export type MedicationSchedule = {
  doseTime: string;
  label: string;
};

export type MedicationScheduleSummary = {
  scheduleId: number;
  doseTime: string;
  label?: string;
};

export type MedicationSummary = {
  userMedicationId: number;
  medicationId?: number;
  medicationDosageId?: number;
  medicationName: string;
  dosageAmount?: number;
  consultationId?: number | null;
  isActive: boolean;
  startedAt?: string;
  endAt?: string | null;
  alarmActive?: boolean;
  schedules?: MedicationScheduleSummary[];
};

export type CreateMedicationRequest = {
  medicationDosageId: number;
  consultationId?: number | null;
  startedAt: string;
  endAt?: string;
  schedules: MedicationSchedule[];
};

export type UpdateMedicationRequest = {
  endAt?: string | null;
  isActive?: boolean;
  alarmActive?: boolean;
  schedules?: MedicationSchedule[];
};

export type MedicationLogRequest = {
  action: QuickMedicationLogAction;
  scheduleId: number;
};

export type MedicationProfileLog = {
  scheduleId: number;
  takenAt: string;
  status: MedicationLogStatus;
};

export type MedicationPeriodLog = {
  userMedicationId: number;
  // 로그가 어떤 복용 스케줄에 대한 기록인지. medication.schedules[].scheduleId 와
  // 동일한 값이다. 구버전 응답에는 없을 수 있어 optional.
  scheduleId?: number;
  name: string;
  intakeTime: string;
  taken: boolean;
};

export type MedicationListResponse = MedicationSummary[];
export type MedicationProfileLogsResponse = { userMedicationId: number; logs: MedicationProfileLog[] };
export type MedicationPeriodLogsResponse = { logs: MedicationPeriodLog[] };
export type CreateMedicationResponse = {
  userMedicationId: number;
  name: string;
  isActive: boolean;
};
export type UpdateMedicationResponse = {
  userMedicationId: number;
  isActive: boolean;
  updatedAt: string;
};
export type QuickMedicationLogResponse = {
  logId: number;
  action: QuickMedicationLogAction;
  recordedAt: string;
};

export function searchMedications(q?: string) {
  const query = q ? `?q=${encodeURIComponent(q)}` : '';
  return apiRequest<MedicationSearchResult[]>(`/v1/medications${query}`);
}

export function getMedications() {
  return apiRequest<MedicationListResponse>('/v1/user-medications');
}

export function getMedicationStandard(medicationId: number) {
  return apiRequest<MedicationStandard>(`/v1/medications/standards/${medicationId}`);
}

export function createMedication(payload: CreateMedicationRequest) {
  return apiRequest<CreateMedicationResponse>('/v1/user-medications', {
    method: 'POST',
    body: payload,
  });
}

export function updateMedication(userMedicationId: number, payload: UpdateMedicationRequest) {
  return apiRequest<UpdateMedicationResponse>(`/v1/user-medications/${userMedicationId}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function getMedicationLogs(userMedicationId: number, params?: { startDate?: string; endDate?: string }) {
  const query = params ? `?${new URLSearchParams(removeEmpty(params))}` : '';
  return apiRequest<MedicationProfileLogsResponse>(`/v1/user-medications/${userMedicationId}/logs${query}`);
}

export function getAllMedicationLogs(params: { startDate: string; endDate: string }) {
  return apiRequest<MedicationPeriodLogsResponse>(`/v1/user-medications/logs?${new URLSearchParams(params)}`);
}

export function createQuickMedicationLog(userMedicationId: number, payload: MedicationLogRequest) {
  return apiRequest<QuickMedicationLogResponse>(`/v1/user-medications/${userMedicationId}/log/quick`, {
    method: 'POST',
    body: payload,
  });
}

function removeEmpty(params: Record<string, string | undefined>) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined)) as Record<string, string>;
}

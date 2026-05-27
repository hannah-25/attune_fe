import { apiRequest } from './client';

export type MedicationLogStatus = 'TAKEN' | 'SKIPPED' | 'MISSED';

export type MedicationStandard = {
  name: string;
  ingredient: string;
  indications: string;
  sideEffects: string;
  bloodConcentrationGraph: string;
};

export type MedicationSchedule = {
  doseTime: string;
  label: string;
  dosage: string;
};

export type MedicationScheduleSummary = {
  scheduleId: number;
  doseTime: string;
  label?: string;
  dosage?: string;
};

export type MedicationSummary = {
  userMedicationId: number;
  medicationId?: number;
  name: string;
  ingredient?: string;
  startedAt?: string;
  endAt?: string | null;
  isActive: boolean;
  alarmActive?: boolean;
  schedules?: MedicationScheduleSummary[];
};

export type CreateMedicationRequest = {
  medicationId: number;
  hospitalId?: number;
  startedAt: string;
  endAt?: string;
  schedules: MedicationSchedule[];
};

export type UpdateMedicationRequest = {
  endAt?: string;
  isActive?: boolean;
  alarmActive?: boolean;
};

export type MedicationLogRequest = {
  scheduleId: number;
  takenAt: string;
  status: MedicationLogStatus;
};

export type MedicationLog = {
  userMedicationId?: number;
  medicationId?: number;
  medicationName?: string;
  scheduleId: number;
  takenAt: string;
  status: MedicationLogStatus;
};

export type MedicationListResponse = MedicationSummary[] | { medications: MedicationSummary[] };
export type MedicationLogsResponse = MedicationLog[] | { logs: MedicationLog[] };

export function getMedications() {
  return apiRequest<MedicationListResponse>('/api/medications');
}

export function getMedicationStandard(medicationId: number) {
  return apiRequest<MedicationStandard>(`/api/medications/standards/${medicationId}`);
}

export function createMedication(payload: CreateMedicationRequest) {
  return apiRequest<{ userMedicationId: number }>('/v1/medications', {
    method: 'POST',
    body: payload,
  });
}

export function updateMedication(userMedicationId: number, payload: UpdateMedicationRequest) {
  return apiRequest<void>(`/api/medications/${userMedicationId}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function getMedicationLogs(userMedicationId: number, params?: { startDate?: string; endDate?: string }) {
  const query = params ? `?${new URLSearchParams(removeEmpty(params))}` : '';
  return apiRequest<MedicationLogsResponse>(`/api/medications/${userMedicationId}/logs${query}`);
}

export function getAllMedicationLogs(params: { startDate: string; endDate: string }) {
  return apiRequest<MedicationLogsResponse>(`/api/medications/logs?${new URLSearchParams(params)}`);
}

export function createQuickMedicationLog(userMedicationId: number, payload: MedicationLogRequest) {
  return apiRequest<void>(`/api/medications/${userMedicationId}/log/quick`, {
    method: 'POST',
    body: payload,
  });
}

function removeEmpty(params: Record<string, string | undefined>) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined)) as Record<string, string>;
}

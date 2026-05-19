import { apiRequest } from './client';

export type MedicationLogStatus = 'TAKEN' | 'SKIPPED' | 'MISSED';

export type MedicationSchedule = {
  doseTime: string;
  label: string;
  dosage: string;
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

export function getMedicationStandard(medicationId: number) {
  return apiRequest<{
    name: string;
    ingredient: string;
    indications: string;
    sideEffects: string;
    bloodConcentrationGraph: string;
  }>(`/api/medications/standards/${medicationId}`);
}

export function createMedication(payload: CreateMedicationRequest) {
  return apiRequest<{ userMedicationId: number }>('/api/medications', {
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
  return apiRequest<{ userMedicationId: number; logs: unknown[] }>(`/api/medications/${userMedicationId}/logs${query}`);
}

export function getAllMedicationLogs(params: { startDate: string; endDate: string }) {
  return apiRequest<unknown>(`/api/medications/logs?${new URLSearchParams(params)}`);
}

export function createQuickMedicationLog(medicationId: number, payload: MedicationLogRequest) {
  return apiRequest<void>(`/api/medications/${medicationId}/log/quick`, {
    method: 'POST',
    body: payload,
  });
}

function removeEmpty(params: Record<string, string | undefined>) {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined)) as Record<string, string>;
}

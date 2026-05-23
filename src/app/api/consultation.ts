import { apiRequest } from './client';

export type ConsultationPayload = {
  consultationDate: string;
  place: string;
  doctorName: string;
  isFirstVisit: boolean;
};

export function createConsultation(payload: ConsultationPayload) {
  return apiRequest<void>('/v1/consultations', { method: 'POST', body: payload });
}

export function getConsultations(params: { startDate: string; endDate: string }) {
  return apiRequest<unknown>(`/api/consultations?${new URLSearchParams(params)}`);
}

export function getConsultation(consultationId: number) {
  return apiRequest<unknown>(`/api/consultations/${consultationId}`);
}

export function updateConsultation(consultationId: number, payload: Partial<ConsultationPayload>) {
  return apiRequest<void>(`/api/consultations/${consultationId}`, { method: 'PATCH', body: payload });
}

export function updateConsultationPreparation(consultationId: number, preConsultationNote: string) {
  return apiRequest<void>(`/api/consultations/${consultationId}/preparation`, {
    method: 'PATCH',
    body: { preConsultationNote },
  });
}

export function updateConsultationResult(
  consultationId: number,
  payload: { doctorAdvice: string; prescriptionNote: string; nextTreatmentGoal: string },
) {
  return apiRequest<void>(`/api/consultations/${consultationId}/result`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deleteConsultation(consultationId: number) {
  return apiRequest<void>(`/api/consultations/${consultationId}`, { method: 'DELETE' });
}

export function deleteConsultationResult(consultationId: number) {
  return apiRequest<void>(`/api/consultations/${consultationId}/result`, { method: 'DELETE' });
}

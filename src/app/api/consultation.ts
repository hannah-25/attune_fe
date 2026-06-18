import { apiRequest } from './client';

export type ConsultationDetail = {
  consultationId: number;
  consultationDate: string;
  place: string;
  doctorName: string;
  isFirstVisit: boolean;
  preConsultationNote?: string | null;
  summaryReport?: string | null;
  prescriptionNote?: string | null;
};

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
  return apiRequest<unknown>(`/v1/consultations?${new URLSearchParams(params)}`);
}

export function getConsultation(consultationId: number) {
  return apiRequest<ConsultationDetail>(`/v1/consultations/${consultationId}`);
}

export function updateConsultation(consultationId: number, payload: Partial<ConsultationPayload>) {
  return apiRequest<void>(`/v1/consultations/${consultationId}`, { method: 'PATCH', body: payload });
}

export function updateConsultationResult(
  consultationId: number,
  payload: { doctorAdvice: string; prescriptionNote: string; nextTreatmentGoal: string },
) {
  return apiRequest<void>(`/v1/consultations/${consultationId}/result`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deleteConsultation(consultationId: number) {
  return apiRequest<void>(`/v1/consultations/${consultationId}`, { method: 'DELETE' });
}

export function deleteConsultationResult(consultationId: number) {
  return apiRequest<void>(`/v1/consultations/${consultationId}/result`, { method: 'DELETE' });
}

export type ConsultationQuestion = {
  questionId: number;
  text: string;
};

export function getConsultationQuestions(consultationId: number) {
  return apiRequest<ConsultationQuestion[]>(`/v1/consultations/${consultationId}/questions`);
}

export function createConsultationQuestion(consultationId: number, text: string) {
  return apiRequest<ConsultationQuestion>(`/v1/consultations/${consultationId}/questions`, {
    method: 'POST',
    body: { text },
  });
}

export function deleteConsultationQuestion(consultationId: number, questionId: number) {
  return apiRequest<void>(`/v1/consultations/${consultationId}/questions/${questionId}`, {
    method: 'DELETE',
  });
}

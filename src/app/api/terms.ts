import { apiRequest } from './client';

export type TermsContent = {
  termsId: number;
  termsOfService: string;
  privacyPolicy: string;
  createdAt: string;
};

export function getLatestTerms() {
  return apiRequest<TermsContent>('/v1/terms/latest', { auth: false });
}

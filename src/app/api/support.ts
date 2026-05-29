import { apiRequest } from './client';

export type SupportInquiryType = 'BUG' | 'FEATURE' | 'USAGE' | 'PAYMENT' | 'OTHER';

export type CreateSupportInquiryRequest = {
  type: SupportInquiryType;
  title: string;
  content: string;
  email: string;
};

export function createSupportInquiry(payload: CreateSupportInquiryRequest) {
  return apiRequest<void>('/v1/support/inquiries', {
    method: 'POST',
    body: payload,
  });
}

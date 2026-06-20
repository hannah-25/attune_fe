import { apiRequest } from './client';

export type AdminTermsListItem = {
  id: number;
  type: AdminTermType;
  version: number;
  effectiveAt: string;
  createdAt: string;
};

export type AdminTermsListResponse = AdminTermsListItem[];

export type AdminNoticeCreateRequest = {
  title: string;
  content: string;
  isPinned: boolean;
  sendNotification: boolean;
  sendEmail?: boolean;
};

export type AdminNoticeCreateResponse = {
  noticeId: number;
  title: string;
  createdAt: string;
};

export type AdminNoticeUpdateRequest = {
  title?: string;
  content?: string;
  isPinned?: boolean;
};

export type AdminNoticeUpdateResponse = {
  noticeId: number;
  title: string;
  updatedAt: string;
};

export type AdminNoticeDeleteResponse = void;
export type AdminNoticePushResponse = void;

export type AdminTermType =
  | 'TERMS_OF_SERVICE'
  | 'PRIVACY_POLICY'
  | 'MARKETING_CONSENT'
  | 'AI_ANALYSIS_CONSENT';

export type AdminTermCreateRequest = {
  title: string;
  version: number;
  content: string;
  type: AdminTermType;
  createdAt: string;
  effectiveDate: string;
  sendEmail: boolean;
};

export type AdminTermsCreateRequest = AdminTermCreateRequest;

export type AdminTermCreateResponse = {
  id: number;
  version: number;
  type: AdminTermType;
  effectiveAt: string;
  createdAt: string;
};

export type AdminTermsCreateResponse = AdminTermCreateResponse;

export function createAdminNotice(
  payload: AdminNoticeCreateRequest,
): Promise<AdminNoticeCreateResponse> {
  return apiRequest<AdminNoticeCreateResponse>('/v1/admin/notices', {
    method: 'POST',
    body: payload,
  });
}

export function updateAdminNotice(
  noticeId: number,
  payload: AdminNoticeUpdateRequest,
): Promise<AdminNoticeUpdateResponse> {
  return apiRequest<AdminNoticeUpdateResponse>(`/v1/admin/notices/${noticeId}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deleteAdminNotice(noticeId: number): Promise<AdminNoticeDeleteResponse> {
  return apiRequest<AdminNoticeDeleteResponse>(`/v1/admin/notices/${noticeId}`, {
    method: 'DELETE',
  });
}

export function sendAdminNoticePush(noticeId: number): Promise<AdminNoticePushResponse> {
  return apiRequest<AdminNoticePushResponse>(`/v1/admin/notices/${noticeId}/push`, {
    method: 'POST',
  });
}

export function getAdminTermsList(): Promise<AdminTermsListResponse> {
  return apiRequest<AdminTermsListResponse>('/v1/admin/terms');
}

export type AdminMarketingPushRequest = {
  title: string;
  body: string;
  targetUrl: string | null;
};

export type AdminMarketingPushResponse = {
  sentAt: string;
  targetCount: number;
};

export function sendAdminMarketingPush(
  payload: AdminMarketingPushRequest,
): Promise<AdminMarketingPushResponse> {
  return apiRequest<AdminMarketingPushResponse>('/v1/admin/marketing/push', {
    method: 'POST',
    body: payload,
  });
}

export function createAdminTerms(
  payload: AdminTermCreateRequest,
): Promise<AdminTermCreateResponse> {
  return apiRequest<AdminTermCreateResponse>('/v1/admin/terms', {
    method: 'POST',
    body: payload,
  });
}

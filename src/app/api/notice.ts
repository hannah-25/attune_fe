import { apiRequest } from './client';

export type NoticeSummary = {
  noticeId: number;
  title: string;
  createdAt: string;
};

export type NoticeDetail = NoticeSummary & {
  content: string;
};

export function getNotices(params: { page?: number; size?: number; q?: string } = {}) {
  return apiRequest<{
    notices: NoticeSummary[];
    totalCount: number;
    page: number;
    size: number;
  }>(`/api/notices?${new URLSearchParams(toStringParams(params))}`, { auth: false });
}

export function getNotice(noticeId: number) {
  return apiRequest<NoticeDetail>(`/api/notices/${noticeId}`, { auth: false });
}

function toStringParams(params: { page?: number; size?: number; q?: string }) {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => [key, String(value)]),
  );
}

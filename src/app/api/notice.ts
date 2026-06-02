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
  return apiRequest<unknown>(`/v1/notices?${new URLSearchParams(toStringParams(params))}`, { auth: false })
    .then((payload) => normalizeNoticeListResponse(payload, params));
}

export function getNotice(noticeId: number) {
  return apiRequest<NoticeDetail>(`/v1/notices/${noticeId}`, { auth: false });
}

function toStringParams(params: { page?: number; size?: number; q?: string }) {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => [key, String(value)]),
  );
}

function normalizeNoticeListResponse(payload: unknown, params: { page?: number; size?: number; q?: string }) {
  const notices = extractNotices(payload).map(normalizeNoticeSummary);

  return {
    notices,
    totalCount: extractNumber(payload, 'totalCount', notices.length),
    page: extractNumber(payload, 'page', params.page ?? 0),
    size: extractNumber(payload, 'size', params.size ?? notices.length),
  };
}

function extractNotices(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  const record = payload as Record<string, unknown>;
  if (Array.isArray(record.notices)) return record.notices;
  if (Array.isArray(record.content)) return record.content;

  if (record.data && typeof record.data === 'object') {
    const data = record.data as Record<string, unknown>;
    if (Array.isArray(data.notices)) return data.notices;
    if (Array.isArray(data.content)) return data.content;
  }

  return [];
}

function normalizeNoticeSummary(item: unknown): NoticeSummary {
  if (!item || typeof item !== 'object') {
    return { noticeId: 0, title: '', createdAt: '' };
  }

  const record = item as Record<string, unknown>;
  return {
    noticeId: toNumber(record.noticeId ?? record.id),
    title: toString(record.title),
    createdAt: toString(record.createdAt ?? record.created_at ?? record.date),
  };
}

function extractNumber(payload: unknown, key: string, fallback: number): number {
  if (!payload || typeof payload !== 'object') return fallback;
  return toNumber((payload as Record<string, unknown>)[key], fallback);
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function toString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '';
  return String(value);
}

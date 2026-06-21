import { apiRequest } from './client';

export type NoticeSummary = {
  noticeId: number;
  title: string;
  createdAt: string;
  isPinned?: boolean;
};

export type NoticeListItem = NoticeSummary & {
  isPinned: boolean;
};

export type NoticeDetail = Omit<NoticeSummary, 'isPinned'> & {
  content: string;
  updatedAt: string;
  isPinned: boolean;
};

export type NoticeListParams = {
  page?: number;
  size?: number;
  q?: string;
};

export type NoticeListResponse = {
  content: NoticeListItem[];
  totalPages: number;
  totalElements: number;
  /** @deprecated Use content. */
  notices: NoticeListItem[];
  /** @deprecated Use totalElements. */
  totalCount: number;
  /** @deprecated Request paging state is not part of the server response. */
  page: number;
  /** @deprecated Request paging state is not part of the server response. */
  size: number;
};

type NoticeListPayload = {
  content?: unknown;
  notices?: unknown;
  totalPages?: unknown;
  totalElements?: unknown;
  totalCount?: unknown;
  page?: unknown;
  size?: unknown;
  data?: unknown;
};

export function getNotices(params: NoticeListParams = {}): Promise<NoticeListResponse> {
  return apiRequest<unknown>(`/v1/notices?${new URLSearchParams(toStringParams(params))}`, { auth: false })
    .then((payload) => normalizeNoticeListResponse(payload, params));
}

export async function getNotice(noticeId: number): Promise<NoticeDetail> {
  const payload = await apiRequest<unknown>(`/v1/notices/${noticeId}`, { auth: false });
  const detail = normalizeNoticeDetail(payload, noticeId);

  if (hasPinnedValue(payload)) return detail;

  try {
    const response = await getNotices({ q: detail.title, size: 100 });
    const listItem = response.content.find((notice) => notice.noticeId === detail.noticeId);
    return { ...detail, isPinned: listItem?.isPinned ?? false };
  } catch {
    return detail;
  }
}

function toStringParams(params: NoticeListParams) {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => [key, String(value)]),
  );
}

export function normalizeNoticeListResponse(
  payload: unknown,
  params: NoticeListParams = {},
): NoticeListResponse {
  const response = unwrapNoticeListPayload(payload);
  const content = extractNotices(response).map(normalizeNoticeListItem);
  const totalElements = extractNumber(response, 'totalElements',
    extractNumber(response, 'totalCount', content.length));

  return {
    content,
    totalPages: extractNumber(
      response,
      'totalPages',
      content.length === 0 ? 0 : Math.ceil(totalElements / (params.size || content.length)),
    ),
    totalElements,
    notices: content,
    totalCount: totalElements,
    page: extractNumber(response, 'page', params.page ?? 0),
    size: extractNumber(response, 'size', params.size ?? content.length),
  };
}

function normalizeNoticeDetail(payload: unknown, noticeId: number): NoticeDetail {
  const record = unwrapNoticeDetailPayload(payload);
  const normalizedId = toNumber(record.noticeId ?? record.id, noticeId);

  return {
    noticeId: normalizedId,
    title: toString(record.title),
    content: toString(record.content),
    createdAt: toString(record.createdAt ?? record.created_at),
    updatedAt: toString(record.updatedAt ?? record.updated_at),
    isPinned: toBoolean(record.isPinned ?? record.pinned),
  };
}

function hasPinnedValue(payload: unknown): boolean {
  const record = unwrapNoticeDetailPayload(payload);
  return record.isPinned !== undefined || record.pinned !== undefined;
}

function unwrapNoticeDetailPayload(payload: unknown): Record<string, unknown> {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return {};

  const record = payload as Record<string, unknown>;
  return record.data && typeof record.data === 'object' && !Array.isArray(record.data)
    ? record.data as Record<string, unknown>
    : record;
}

function unwrapNoticeListPayload(payload: unknown): NoticeListPayload {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { content: payload };
  }

  const record = payload as NoticeListPayload;
  return record.data && typeof record.data === 'object' && !Array.isArray(record.data)
    ? record.data as NoticeListPayload
    : record;
}

function extractNotices(payload: NoticeListPayload): unknown[] {
  if (Array.isArray(payload.content)) return payload.content;
  if (Array.isArray(payload.notices)) return payload.notices;
  return [];
}

function normalizeNoticeListItem(item: unknown): NoticeListItem {
  if (!item || typeof item !== 'object') {
    return { noticeId: 0, title: '', createdAt: '', isPinned: false };
  }

  const record = item as Record<string, unknown>;
  return {
    noticeId: toNumber(record.noticeId ?? record.id),
    title: toString(record.title),
    createdAt: toString(record.createdAt ?? record.created_at ?? record.date),
    isPinned: toBoolean(record.isPinned ?? record.pinned),
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

function toBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  if (typeof value === 'number') return value !== 0;
  return false;
}

import { mockAdminAuditLogs, mockAdminMembers } from '../mocks/admin.mock';
import { apiRequest } from './client';

export * from './adminContent';

export type AdminMemberStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'WITHDRAWAL';
export type AdminMemberProvider = 'GOOGLE' | 'KAKAO' | 'APPLE';

export type AdminMember = {
  id: string;
  email: string;
  nickname: string;
  status: AdminMemberStatus;
  provider: AdminMemberProvider | null;
  createdAt: string;
  lastLoginAt: string | null;
  withdrawalRequestedAt: string | null;
  withdrawalScheduledAt: string | null;
};

export type AdminMemberSummary = {
  total: number;
  pending: number;
  active: number;
  suspended: number;
  withdrawal: number;
};

export type AdminMemberListParams = {
  query?: string;
  status?: AdminMemberStatus | 'all';
  page?: number;
  size?: number;
  signal?: AbortSignal;
};

export type AdminMemberListResponse = {
  members: AdminMember[];
  summary: AdminMemberSummary;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type AdminAuditAction = 'MEMBER_DELETED' | 'WITHDRAWAL_CANCELLED' | 'STATUS_CHANGED';

export type AdminAuditLog = {
  id: string;
  action: AdminAuditAction;
  targetReference: string;
  targetLabel: string | null;
  administrator: string;
  reason: string;
  createdAt: string;
};

export type AdminMemberActionRequest = {
  reason: string;
};

export type AdminAuditLogListParams = {
  limit?: number;
  signal?: AbortSignal;
};

export type AdminAuditLogListResponse = AdminAuditLog[];

export const adminUsesMockApi =
  !import.meta.env.PROD
  && (import.meta.env.VITE_ADMIN_USE_MOCK as string | undefined) === 'true';
let members = mockAdminMembers.map((member) => ({ ...member }));
let auditLogs = mockAdminAuditLogs.map((log) => ({ ...log }));

function wait(ms = 220, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted', 'AbortError'));
      return;
    }
    const onAbort = () => {
      window.clearTimeout(timer);
      reject(new DOMException('Request aborted', 'AbortError'));
    };
    const timer = window.setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

function summarize(items: AdminMember[]): AdminMemberSummary {
  return {
    total: items.length,
    pending: items.filter((member) => member.status === 'PENDING').length,
    active: items.filter((member) => member.status === 'ACTIVE').length,
    suspended: items.filter((member) => member.status === 'SUSPENDED').length,
    withdrawal: items.filter((member) => member.status === 'WITHDRAWAL').length,
  };
}

export async function getAdminMembers(params: AdminMemberListParams = {}): Promise<AdminMemberListResponse> {
  const page = params.page ?? 0;
  const size = params.size ?? 20;
  if (page < 0 || size < 1 || size > 100) {
    throw new Error('페이지는 0 이상, 페이지 크기는 1 이상 100 이하여야 합니다.');
  }

  if (!adminUsesMockApi) {
    const search = new URLSearchParams();
    if (params.query) search.set('query', params.query);
    if (params.status && params.status !== 'all') search.set('status', params.status);
    search.set('page', String(page));
    search.set('size', String(size));
    const queryString = search.toString();
    return apiRequest<AdminMemberListResponse>(`/v1/admin/members?${queryString}`, {
      signal: params.signal,
    });
  }

  await wait(220, params.signal);
  const query = params.query?.trim().toLowerCase() ?? '';
  const isUuidQuery = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(query);
  const filtered = members.filter((member) => {
    const matchesStatus = !params.status || params.status === 'all' || member.status === params.status;
    const matchesQuery =
      !query
      || (isUuidQuery
        ? member.id.toLowerCase() === query
        : member.email.toLowerCase().includes(query) || member.nickname.toLowerCase().includes(query));
    return matchesStatus && matchesQuery;
  });

  const totalElements = filtered.length;
  const totalPages = Math.ceil(totalElements / size);
  const safePage = totalPages === 0 ? 0 : Math.min(page, totalPages - 1);
  const start = safePage * size;

  return {
    members: filtered.slice(start, start + size),
    summary: summarize(members),
    page: safePage,
    size,
    totalElements,
    totalPages,
  };
}

export async function getAdminAuditLogs(
  params: AdminAuditLogListParams = {},
): Promise<AdminAuditLogListResponse> {
  const limit = params.limit ?? 10;
  if (limit < 1 || limit > 100) {
    throw new Error('감사 로그 조회 개수는 1 이상 100 이하여야 합니다.');
  }

  if (!adminUsesMockApi) {
    return apiRequest<AdminAuditLogListResponse>(`/v1/admin/audit-logs?limit=${limit}`, {
      signal: params.signal,
    });
  }
  await wait(120, params.signal);
  return auditLogs.slice(0, limit);
}

export async function cancelAdminMemberWithdrawal(memberUuid: string, payload: AdminMemberActionRequest): Promise<AdminMember> {
  if (!adminUsesMockApi) {
    return apiRequest<AdminMember>(`/v1/admin/members/${memberUuid}/withdrawal/cancel`, {
      method: 'POST',
      body: payload,
    });
  }

  await wait(350);
  const member = members.find((item) => item.id === memberUuid);
  if (!member || member.status !== 'WITHDRAWAL') {
    throw new Error('탈퇴 예정 상태의 회원만 복구할 수 있습니다.');
  }

  const restored: AdminMember = {
    ...member,
    status: 'ACTIVE',
    withdrawalRequestedAt: null,
    withdrawalScheduledAt: null,
  };
  members = members.map((item) => (item.id === memberUuid ? restored : item));
  auditLogs = [
    {
      id: `audit-${Date.now()}`,
      action: 'WITHDRAWAL_CANCELLED',
      targetReference: `member_${memberUuid}`,
      targetLabel: member.nickname,
      administrator: 'admin@atune.app',
      reason: payload.reason,
      createdAt: new Date().toISOString(),
    },
    ...auditLogs,
  ];
  return restored;
}

export type AdminMemberStatusChangeRequest = {
  status: 'ACTIVE' | 'SUSPENDED';
  reason: string;
};

export async function changeAdminMemberStatus(
  memberUuid: string,
  payload: AdminMemberStatusChangeRequest,
): Promise<AdminMember> {
  if (!adminUsesMockApi) {
    return apiRequest<AdminMember>(`/v1/admin/members/${memberUuid}/status`, {
      method: 'POST',
      body: payload,
    });
  }

  await wait(300);
  const member = members.find((item) => item.id === memberUuid);
  if (!member) throw new Error('회원을 찾을 수 없습니다.');
  const updated: AdminMember = { ...member, status: payload.status };
  members = members.map((item) => (item.id === memberUuid ? updated : item));
  auditLogs = [
    {
      id: `audit-${Date.now()}`,
      action: 'STATUS_CHANGED',
      targetReference: `member_${memberUuid}`,
      targetLabel: member.nickname,
      administrator: 'admin@atune.app',
      reason: payload.reason,
      createdAt: new Date().toISOString(),
    },
    ...auditLogs,
  ];
  return updated;
}

export async function deleteAdminMemberImmediately(memberUuid: string, payload: AdminMemberActionRequest): Promise<void> {
  if (!adminUsesMockApi) {
    return apiRequest<void>(`/v1/admin/members/${memberUuid}/withdrawal/complete`, {
      method: 'POST',
      body: payload,
    });
  }

  await wait(450);
  const member = members.find((item) => item.id === memberUuid);
  if (!member || member.status !== 'WITHDRAWAL') {
    throw new Error('탈퇴 예정 상태의 회원만 즉시 삭제할 수 있습니다.');
  }

  members = members.filter((item) => item.id !== memberUuid);
  auditLogs = [
    {
      id: `audit-${Date.now()}`,
      action: 'MEMBER_DELETED',
      targetReference: `mock-hmac:${crypto.randomUUID()}`,
      targetLabel: null,
      administrator: 'admin@atune.app',
      reason: payload.reason,
      createdAt: new Date().toISOString(),
    },
    ...auditLogs,
  ];
}

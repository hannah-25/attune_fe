import { useEffect, useMemo, useRef, useState } from 'react';
import { useDialogKeyboard } from '../../app/hooks/useDialogKeyboard';
import {
  Activity,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  RotateCcw,
  Search,
  ShieldCheck,
  Trash2,
  UsersRound,
  X,
} from 'lucide-react';
import { Link } from 'react-router';
import {
  cancelAdminMemberWithdrawal,
  changeAdminMemberStatus,
  deleteAdminMemberImmediately,
  getAdminAuditLogs,
  getAdminMembers,
  type AdminAuditLog,
  type AdminMember,
  type AdminMemberProvider,
  type AdminMemberStatus,
  type AdminMemberSummary,
} from '../../app/api/admin';
import { ApiError } from '../../app/api/client';
import AdminPageHeader from './AdminPageHeader';
import AdminSectionNav from './AdminSectionNav';

type StatusFilter = AdminMemberStatus | 'all';
type ActionMode = 'restore' | 'delete' | 'activate' | 'suspend' | 'unsuspend';

const EMPTY_SUMMARY: AdminMemberSummary = { total: 0, pending: 0, active: 0, suspended: 0, withdrawal: 0 };
const STATUS_LABEL: Record<AdminMemberStatus, string> = {
  PENDING: '가입 대기',
  ACTIVE: '활성',
  SUSPENDED: '정지',
  WITHDRAWAL: '탈퇴 예정',
};
const PAGE_SIZE = 8;

export default function AdminMembersPage() {
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [summary, setSummary] = useState<AdminMemberSummary>(EMPTY_SUMMARY);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>([]);
  const [status, setStatus] = useState<StatusFilter>('all');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMember, setSelectedMember] = useState<AdminMember | null>(null);
  const [actionMode, setActionMode] = useState<ActionMode | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [accessDenied, setAccessDenied] = useState(false);
  const lastFetchedRef = useRef<{ query: string; status: string; page: number; refreshKey: number } | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
      setPage(0);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (
      lastFetchedRef.current
      && lastFetchedRef.current.query === debouncedQuery
      && lastFetchedRef.current.status === status
      && lastFetchedRef.current.page === page
      && lastFetchedRef.current.refreshKey === refreshKey
    ) return;

    const controller = new AbortController();
    setLoading(true);
    setError('');
    setAccessDenied(false);

    getAdminMembers({
      query: debouncedQuery,
      status,
      page,
      size: PAGE_SIZE,
      signal: controller.signal,
    })
      .then((result) => {
        lastFetchedRef.current = { query: debouncedQuery, status, page: result.page, refreshKey };
        setMembers(result.members);
        setSummary(result.summary);
        setTotalElements(result.totalElements);
        setTotalPages(result.totalPages);
        setSelectedMember((current) =>
          current ? result.members.find((member) => member.id === current.id) ?? null : null,
        );
        if (result.page !== page) setPage(result.page);
      })
      .catch((loadError: unknown) => {
        if (loadError instanceof DOMException && loadError.name === 'AbortError') return;
        if (loadError instanceof ApiError && loadError.status === 403) {
          setAccessDenied(true);
          return;
        }
        setError(loadError instanceof Error ? loadError.message : '회원 정보를 불러오지 못했습니다.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
          setRefreshing(false);
        }
      });

    return () => controller.abort();
  }, [debouncedQuery, page, refreshKey, status]);

  useEffect(() => {
    const controller = new AbortController();
    getAdminAuditLogs({ limit: 6, signal: controller.signal })
      .catch((loadError: unknown) => {
        if (loadError instanceof DOMException && loadError.name === 'AbortError') return;
        console.error('Failed to load admin audit logs:', loadError);
      });
    return () => controller.abort();
  }, [refreshKey]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 3200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const handleActionComplete = async (message: string) => {
    setActionMode(null);
    setSelectedMember(null);
    setNotice(message);
    setRefreshing(true);
    setRefreshKey((current) => current + 1);
  };

  const selectedIndex = useMemo(
    () => (selectedMember ? members.findIndex((member) => member.id === selectedMember.id) : -1),
    [members, selectedMember],
  );

  if (accessDenied) {
    return (
      <div
        className="flex min-h-dvh items-center justify-center bg-gray-50 px-5"
        style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
      >
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-[0_12px_36px_rgba(35,38,58,0.06)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-error-100 text-error-700">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-gray-900">관리자 권한이 필요합니다</h1>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            이 화면은 관리자 계정만 접근할 수 있습니다. 권한이 있는 계정으로 다시 로그인해 주세요.
          </p>
          <Link
            to="/login"
            className="mt-5 inline-flex h-11 items-center justify-center rounded-xl border border-gray-200 px-5 text-sm font-extrabold text-gray-700 hover:bg-gray-50"
          >
            로그인으로 이동
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-dvh w-full bg-gray-50 text-gray-900"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <main aria-hidden={selectedMember ? true : undefined}>
        <AdminPageHeader
          title="회원 관리"
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setRefreshKey((current) => current + 1);
          }}
        />
        <AdminSectionNav />

        <div className="mx-auto max-w-[1240px] px-4 py-6 md:px-6 md:py-8">
          <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <SummaryCard label="전체 회원" value={summary.total} icon={<UsersRound />} tone="purple" />
            <SummaryCard label="활성 회원" value={summary.active} icon={<CheckCircle2 />} tone="green" />
            <SummaryCard label="가입 대기" value={summary.pending} icon={<Clock3 />} tone="amber" />
            <SummaryCard label="정지 회원" value={summary.suspended} icon={<AlertTriangle />} tone="gray" />
            <SummaryCard label="탈퇴 예정" value={summary.withdrawal} icon={<CalendarClock />} tone="red" />
          </section>

          {error ? (
            <div role="alert" className="mt-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </div>
          ) : null}

          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            <section className="min-w-0 overflow-hidden rounded-[1.125rem] border border-gray-200 bg-white shadow-[0_4px_14px_rgba(60,40,90,0.05)]">
              <div className="flex flex-col gap-3 border-b border-gray-100 p-4 md:flex-row md:items-center md:justify-between md:p-5">
                <div className="relative min-w-0 flex-1 md:max-w-[380px]">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    aria-label="회원 검색"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="이메일, 닉네임, 회원 UUID 검색"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-base outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100 md:text-sm"
                  />
                </div>
                <div className="flex gap-1 overflow-x-auto">
                  {(['all', 'ACTIVE', 'PENDING', 'SUSPENDED', 'WITHDRAWAL'] as StatusFilter[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setStatus(item);
                        setPage(0);
                      }}
                      className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold transition ${
                        status === item
                          ? 'border-purple-300 bg-purple-100 text-purple-800'
                          : 'border-transparent bg-gray-100 text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {item === 'all' ? '전체' : STATUS_LABEL[item]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-gray-100 md:hidden">
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => <MobileMemberSkeleton key={index} />)
                ) : members.length === 0 ? (
                  <EmptyMemberResult />
                ) : (
                  members.map((member) => (
                    <MobileMemberCard
                      key={member.id}
                      member={member}
                      onSelect={() => setSelectedMember(member)}
                    />
                  ))
                )}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[850px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-100 bg-[#fbfbfd] text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                      <th className="px-5 py-3.5">회원</th>
                      <th className="px-4 py-3.5">상태</th>
                      <th className="px-4 py-3.5">가입 방식</th>
                      <th className="px-4 py-3.5">가입일</th>
                      <th className="px-4 py-3.5">최근 로그인</th>
                      <th className="px-4 py-3.5">탈퇴 예정일</th>
                      <th className="px-5 py-3.5 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      Array.from({ length: 6 }).map((_, index) => <MemberSkeleton key={index} />)
                    ) : members.length === 0 ? (
                      <tr>
                        <td colSpan={7}><EmptyMemberResult /></td>
                      </tr>
                    ) : (
                      members.map((member) => (
                        <MemberRow
                          key={member.id}
                          member={member}
                          onSelect={() => setSelectedMember(member)}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-gray-100 px-5 py-4 text-xs text-gray-500">
                <span>검색 결과 {totalElements}명</span>
                <div className="flex items-center gap-2">
                  <span>{totalPages === 0 ? 0 : page + 1} / {totalPages} 페이지</span>
                  <button
                    type="button"
                    aria-label="이전 페이지"
                    disabled={page === 0 || loading}
                    onClick={() => setPage((current) => Math.max(0, current - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="다음 페이지"
                    disabled={page + 1 >= totalPages || loading}
                    onClick={() => setPage((current) => current + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-[1.125rem] border border-gray-200 bg-white p-5 shadow-[0_4px_14px_rgba(60,40,90,0.05)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-extrabold">최근 관리자 작업</h2>
                  <p className="mt-1 text-xs text-gray-400">개인정보와 분리된 감사 기록</p>
                </div>
                <Activity className="h-4 w-4 text-purple-500" />
              </div>
              <div className="mt-5 space-y-5">
                {auditLogs.slice(0, 6).map((log) => (
                  <AuditLogItem key={log.id} log={log} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {selectedMember && !actionMode ? (
        <MemberDetailPanel
          member={selectedMember}
          position={selectedIndex}
          onClose={() => setSelectedMember(null)}
          onRestore={() => setActionMode('restore')}
          onDelete={() => setActionMode('delete')}
          onActivate={() => setActionMode('activate')}
          onSuspend={() => setActionMode('suspend')}
          onUnsuspend={() => setActionMode('unsuspend')}
        />
      ) : null}

      {selectedMember && actionMode ? (
        <MemberActionDialog
          member={selectedMember}
          mode={actionMode}
          onClose={() => setActionMode(null)}
          onComplete={handleActionComplete}
        />
      ) : null}

      {notice ? (
        <div role="status" className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-success-300" />
          {notice}
        </div>
      ) : null}
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  tone,
  value,
}: {
  icon: React.ReactElement;
  label: string;
  tone: 'purple' | 'green' | 'amber' | 'gray' | 'red';
  value: number;
}) {
  const tones = {
    purple: 'bg-purple-100 text-purple-700',
    green: 'bg-success-100 text-success-700',
    amber: 'bg-warning-100 text-warning-800',
    gray: 'bg-gray-200 text-gray-700',
    red: 'bg-error-100 text-error-800',
  };
  return (
    <div className="rounded-[1.125rem] border border-gray-200 bg-white p-4 shadow-[0_4px_14px_rgba(60,40,90,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-gray-500">{label}</div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900">{value.toLocaleString()}</div>
        </div>
        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${tones[tone]} [&>svg]:h-4 [&>svg]:w-4`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function MemberRow({
  member,
  onSelect,
}: {
  member: AdminMember;
  onSelect: () => void;
}) {
  return (
    <tr className="border-b border-gray-100 transition last:border-0 hover:bg-gray-50/80">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-blue-100 text-xs font-extrabold text-purple-700">
            {member.nickname.slice(0, 1)}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-extrabold">{member.nickname}</div>
            <div className="mt-0.5 max-w-[220px] truncate text-xs text-gray-400">{member.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4"><StatusBadge status={member.status} /></td>
      <td className="px-4 py-4 text-xs font-bold text-gray-600">{formatProvider(member.provider)}</td>
      <td className="px-4 py-4 text-xs text-gray-500">{formatDate(member.createdAt)}</td>
      <td className="px-4 py-4 text-xs text-gray-500">{formatDateTime(member.lastLoginAt)}</td>
      <td className="px-4 py-4 text-xs font-bold text-gray-600">
        {member.withdrawalScheduledAt ? formatDate(member.withdrawalScheduledAt) : '—'}
      </td>
      <td className="px-5 py-4 text-right">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSelect();
          }}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
        >
          상세
        </button>
      </td>
    </tr>
  );
}

function MobileMemberCard({ member, onSelect }: { member: AdminMember; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-start gap-3 px-4 py-4 text-left transition hover:bg-gray-50"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-extrabold text-purple-700">
        {member.nickname.slice(0, 1)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-extrabold text-gray-900">{member.nickname}</span>
          <StatusBadge status={member.status} />
        </div>
        <div className="mt-1 truncate text-xs text-gray-500">{member.email}</div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-400">
          <span>{formatProvider(member.provider)}</span>
          <span>가입 {formatDate(member.createdAt)}</span>
          {member.withdrawalScheduledAt ? (
            <span className="font-bold text-error-700">삭제 예정 {formatDate(member.withdrawalScheduledAt)}</span>
          ) : null}
        </div>
      </div>
      <ChevronRight className="mt-3 h-4 w-4 shrink-0 text-gray-300" />
    </button>
  );
}

function StatusBadge({ status }: { status: AdminMemberStatus }) {
  const classes: Record<AdminMemberStatus, string> = {
    ACTIVE: 'bg-success-100 text-success-700',
    PENDING: 'bg-warning-100 text-warning-800',
    SUSPENDED: 'bg-gray-200 text-gray-700',
    WITHDRAWAL: 'bg-error-100 text-error-800',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${classes[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABEL[status]}
    </span>
  );
}

function MobileMemberSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-4">
      <div className="h-11 w-11 animate-pulse rounded-full bg-gray-100" />
      <div className="flex-1">
        <div className="h-4 w-28 animate-pulse rounded bg-gray-100" />
        <div className="mt-2 h-3 w-48 animate-pulse rounded bg-gray-100" />
        <div className="mt-2 h-3 w-32 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

function EmptyMemberResult() {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <Search className="h-5 w-5" />
      </div>
      <div className="mt-3 text-sm font-extrabold">조건에 맞는 회원이 없습니다</div>
      <div className="mt-1 text-xs text-gray-400">검색어나 상태 필터를 변경해 보세요.</div>
    </div>
  );
}

function MemberSkeleton() {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-5 py-4"><div className="h-9 w-52 animate-pulse rounded-lg bg-gray-100" /></td>
      <td className="px-4 py-4"><div className="h-6 w-16 animate-pulse rounded-full bg-gray-100" /></td>
      <td className="px-4 py-4"><div className="h-4 w-12 animate-pulse rounded bg-gray-100" /></td>
      <td className="px-4 py-4"><div className="h-4 w-20 animate-pulse rounded bg-gray-100" /></td>
      <td className="px-4 py-4"><div className="h-4 w-24 animate-pulse rounded bg-gray-100" /></td>
      <td className="px-4 py-4"><div className="h-4 w-20 animate-pulse rounded bg-gray-100" /></td>
      <td className="px-5 py-4"><div className="ml-auto h-7 w-12 animate-pulse rounded bg-gray-100" /></td>
    </tr>
  );
}

const AUDIT_ACTION_META: Record<AdminAuditLog['action'], { label: string; tone: 'red' | 'green' | 'blue' }> = {
  MEMBER_DELETED: { label: '회원 즉시 삭제', tone: 'red' },
  WITHDRAWAL_CANCELLED: { label: '탈퇴 요청 취소', tone: 'green' },
  STATUS_CHANGED: { label: '상태 변경', tone: 'blue' },
};

function AuditLogItem({ log }: { log: AdminAuditLog }) {
  const meta = AUDIT_ACTION_META[log.action];
  const toneClass = {
    red: { dot: 'bg-error-100', inner: 'bg-error-500' },
    green: { dot: 'bg-success-100', inner: 'bg-success-500' },
    blue: { dot: 'bg-blue-100', inner: 'bg-blue-500' },
  }[meta.tone];
  return (
    <div className="relative pl-7">
      <div className="absolute left-[7px] top-6 h-[calc(100%+4px)] w-px bg-gray-100 last:hidden" />
      <div className={`absolute left-0 top-0 flex h-4 w-4 items-center justify-center rounded-full ${toneClass.dot}`}>
        <div className={`h-1.5 w-1.5 rounded-full ${toneClass.inner}`} />
      </div>
      <div className="text-xs font-extrabold">{meta.label}</div>
      <div className="mt-1 truncate text-[11px] text-gray-400">
        {log.targetLabel ?? log.targetReference} · {formatRelative(log.createdAt)}
      </div>
      <div className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-gray-500">{log.reason}</div>
    </div>
  );
}

function MemberDetailPanel({
  member,
  onClose,
  onDelete,
  onRestore,
  onActivate,
  onSuspend,
  onUnsuspend,
  position,
}: {
  member: AdminMember;
  onClose: () => void;
  onDelete: () => void;
  onRestore: () => void;
  onActivate: () => void;
  onSuspend: () => void;
  onUnsuspend: () => void;
  position: number;
}) {
  const panelRef = useRef<HTMLElement>(null);
  useDialogKeyboard(panelRef, onClose);

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-gray-900/20 backdrop-blur-[2px]" onMouseDown={onClose}>
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-member-detail-title"
        className="h-full w-full max-w-[440px] overflow-y-auto bg-white shadow-[-18px_0_50px_rgba(22,24,38,0.14)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-100 bg-white/95 px-6 backdrop-blur">
          <div>
            <div id="admin-member-detail-title" className="text-sm font-extrabold">회원 상세</div>
            <div className="mt-0.5 text-[11px] text-gray-400">검색 결과 {position + 1}번째 회원</div>
          </div>
          <button data-autofocus type="button" onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="닫기">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 text-lg font-extrabold text-purple-700">
              {member.nickname.slice(0, 1)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-xl font-extrabold">{member.nickname}</h2>
                <StatusBadge status={member.status} />
              </div>
              <div className="mt-1 truncate text-sm text-gray-500">{member.email}</div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <DetailCard label="회원 UUID" value={member.id} />
            <DetailCard label="가입 방식" value={formatProvider(member.provider)} />
          </div>

          <div className="mt-7">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">계정 정보</h3>
            <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-100">
              <DetailRow label="가입일" value={formatDateTime(member.createdAt)} />
              <DetailRow label="최근 로그인" value={formatDateTime(member.lastLoginAt)} />
              <DetailRow label="탈퇴 요청일" value={formatDateTime(member.withdrawalRequestedAt)} />
              <DetailRow label="자동 삭제 예정일" value={formatDateTime(member.withdrawalScheduledAt)} emphasized={member.status === 'WITHDRAWAL'} />
            </div>
          </div>

          {member.status === 'WITHDRAWAL' ? (
            <div className="mt-7 rounded-2xl border border-error-200 bg-error-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-error-700" />
                <div>
                  <div className="text-sm font-extrabold text-error-800">탈퇴 예정 계정</div>
                  <p className="mt-1 text-xs leading-relaxed text-error-800/75">
                    즉시 삭제하면 회원 데이터는 복구할 수 없습니다. 감사 로그에는 비식별 대상값과 처리 사유만 남습니다.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="sticky bottom-0 border-t border-gray-100 bg-white p-5">
          {member.status === 'PENDING' ? (
            <button
              type="button"
              onClick={onActivate}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-extrabold text-white hover:bg-gray-800"
            >
              <CheckCircle2 className="h-4 w-4" />
              활성화
            </button>
          ) : member.status === 'ACTIVE' ? (
            <button
              type="button"
              onClick={onSuspend}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 text-sm font-extrabold text-gray-700 hover:bg-gray-50"
            >
              <AlertTriangle className="h-4 w-4" />
              정지
            </button>
          ) : member.status === 'SUSPENDED' ? (
            <button
              type="button"
              onClick={onUnsuspend}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-extrabold text-white hover:bg-gray-800"
            >
              <RotateCcw className="h-4 w-4" />
              정지 해제
            </button>
          ) : member.status === 'WITHDRAWAL' ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onRestore}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 text-sm font-extrabold text-gray-700 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" />
                탈퇴 취소
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-error-500 text-sm font-extrabold text-white hover:bg-error-600"
              >
                <Trash2 className="h-4 w-4" />
                즉시 삭제
              </button>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3.5">
      <div className="text-[11px] font-bold text-gray-400">{label}</div>
      <div className="mt-1 break-all text-sm font-extrabold">{value}</div>
    </div>
  );
}

function DetailRow({ emphasized, label, value }: { emphasized?: boolean; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
      <span className="text-xs font-bold text-gray-500">{label}</span>
      <span className={`text-right text-xs font-extrabold ${emphasized ? 'text-error-700' : 'text-gray-700'}`}>{value}</span>
    </div>
  );
}

function MemberActionDialog({
  member,
  mode,
  onClose,
  onComplete,
}: {
  member: AdminMember;
  mode: ActionMode;
  onClose: () => void;
  onComplete: (message: string) => Promise<void>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [reason, setReason] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const isDelete = mode === 'delete';
  const canSubmit = reason.trim().length >= 5 && (!isDelete || confirmation === '즉시 탈퇴') && !submitting;

  const ACTION_META: Record<ActionMode, { title: string; description: string; label: string; buttonClass: string }> = {
    restore: {
      title: '탈퇴 요청을 취소할까요?',
      description: `${member.nickname} (${member.email}) 계정을 활성 상태로 되돌립니다.`,
      label: '탈퇴 취소',
      buttonClass: 'bg-gray-900 hover:bg-gray-800',
    },
    delete: {
      title: '회원을 즉시 삭제할까요?',
      description: `${member.nickname} (${member.email})의 모든 데이터가 영구 삭제되며 복구할 수 없습니다.`,
      label: '영구 삭제',
      buttonClass: 'bg-error-500 hover:bg-error-600',
    },
    activate: {
      title: '회원을 활성화할까요?',
      description: `${member.nickname} (${member.email}) 계정을 ACTIVE 상태로 변경합니다.`,
      label: '활성화',
      buttonClass: 'bg-gray-900 hover:bg-gray-800',
    },
    suspend: {
      title: '회원을 정지할까요?',
      description: `${member.nickname} (${member.email}) 계정을 SUSPENDED 상태로 변경합니다.`,
      label: '정지',
      buttonClass: 'bg-error-500 hover:bg-error-600',
    },
    unsuspend: {
      title: '정지를 해제할까요?',
      description: `${member.nickname} (${member.email}) 계정을 ACTIVE 상태로 되돌립니다.`,
      label: '정지 해제',
      buttonClass: 'bg-gray-900 hover:bg-gray-800',
    },
  };
  const meta = ACTION_META[mode];

  useDialogKeyboard(dialogRef, onClose, !submitting);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError('');
    try {
      if (mode === 'delete') {
        await deleteAdminMemberImmediately(member.id, { reason: reason.trim() });
        await onComplete(`${member.nickname} 회원을 즉시 삭제했습니다.`);
      } else if (mode === 'restore') {
        await cancelAdminMemberWithdrawal(member.id, { reason: reason.trim() });
        await onComplete(`${member.nickname} 회원의 탈퇴 요청을 취소했습니다.`);
      } else if (mode === 'activate') {
        await changeAdminMemberStatus(member.id, { status: 'ACTIVE', reason: reason.trim() });
        await onComplete(`${member.nickname} 회원을 활성화했습니다.`);
      } else if (mode === 'suspend') {
        await changeAdminMemberStatus(member.id, { status: 'SUSPENDED', reason: reason.trim() });
        await onComplete(`${member.nickname} 회원을 정지했습니다.`);
      } else if (mode === 'unsuspend') {
        await changeAdminMemberStatus(member.id, { status: 'ACTIVE', reason: reason.trim() });
        await onComplete(`${member.nickname} 회원의 정지를 해제했습니다.`);
      }
    } catch (actionError) {
      if (mode === 'delete' && actionError instanceof ApiError && actionError.status === 404) {
        await onComplete(`${member.nickname} 회원은 이미 삭제된 상태입니다.`);
        return;
      }
      setError(actionError instanceof Error ? actionError.message : '작업을 처리하지 못했습니다.');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/25 p-4 backdrop-blur-sm">
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-member-action-title"
        className="w-full max-w-[480px] rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${isDelete || mode === 'suspend' ? 'bg-error-100 text-error-700' : 'bg-success-100 text-success-700'}`}>
            {isDelete || mode === 'suspend' ? <AlertTriangle className="h-5 w-5" /> : <RotateCcw className="h-5 w-5" />}
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100" aria-label="닫기">
            <X className="h-5 w-5" />
          </button>
        </div>
        <h2 id="admin-member-action-title" className="mt-5 text-xl font-extrabold">
          {meta.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">{meta.description}</p>

        <label className="mt-5 block">
          <span className="text-xs font-extrabold text-gray-700">처리 사유</span>
          <span className="mt-1 block text-xs leading-relaxed text-gray-500">
            입력한 사유는 관리자 작업 이력에 기록됩니다.
          </span>
          <textarea
            data-autofocus
            aria-label="처리 사유"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            maxLength={1000}
            placeholder="감사 로그에 남길 사유를 5자 이상 입력해 주세요."
            rows={3}
            className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-base outline-none focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100 md:text-sm"
          />
        </label>

        {isDelete ? (
          <label className="mt-4 block">
            <span className="text-xs font-extrabold text-gray-700">
              확인을 위해 <strong className="text-error-700">즉시 탈퇴</strong>를 입력해 주세요.
            </span>
            <input
              aria-label="즉시 삭제 확인 문구"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-3 text-base outline-none focus:border-error-400 focus:ring-2 focus:ring-error-100 md:text-sm"
            />
          </label>
        ) : null}

        {error ? <div role="alert" className="mt-3 text-xs font-bold text-error-700">{error}</div> : null}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" onClick={onClose} className="h-11 rounded-xl border border-gray-200 text-sm font-extrabold text-gray-600 hover:bg-gray-50">
            취소
          </button>
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={!canSubmit}
            className={`h-11 rounded-xl text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:bg-gray-200 ${meta.buttonClass}`}
          >
            {submitting ? '처리 중…' : meta.label}
          </button>
        </div>
      </div>
    </div>
  );
}

function formatDate(value: string | null) {
  if (!value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

function formatProvider(provider: AdminMemberProvider | null) {
  return provider ?? '이메일';
}

function formatDateTime(value: string | null) {
  if (!value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d);
}

function formatRelative(value: string) {
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  const diff = Date.now() - d.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return '방금 전';
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}


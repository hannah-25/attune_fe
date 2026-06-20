import { useCallback, useEffect, useState } from 'react';
import { BellRing, ChevronLeft, ChevronRight, Megaphone, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import {
  createAdminNotice,
  deleteAdminNotice,
  sendAdminNoticePush,
  updateAdminNotice,
} from '../../app/api/admin';
import { getNotice, getNotices, type NoticeSummary } from '../../app/api/notice';
import { ApiError } from '../../app/api/client';
import AdminPageHeader from './AdminPageHeader';
import AdminSectionNav from './AdminSectionNav';

type NoticeForm = {
  noticeId?: number;
  title: string;
  content: string;
  isPinned: boolean;
  sendNotification: boolean;
  sendEmail: boolean;
};

const EMPTY_FORM: NoticeForm = { title: '', content: '', isPinned: false, sendNotification: false, sendEmail: false };
const PAGE_SIZE = 10;

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<NoticeSummary[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [form, setForm] = useState<NoticeForm | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(0);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query]);

  const loadNotices = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getNotices({ page, size: PAGE_SIZE, q: debouncedQuery });
      setNotices(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (loadError) {
      setError(toErrorMessage(loadError, '공지 목록을 불러오지 못했습니다.'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [debouncedQuery, page]);

  useEffect(() => {
    void loadNotices();
  }, [loadNotices, refreshKey]);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(''), 3200);
    return () => window.clearTimeout(timer);
  }, [message]);

  const refresh = () => {
    setRefreshing(true);
    setRefreshKey((current) => current + 1);
  };

  const openEdit = async (noticeId: number) => {
    setError('');
    try {
      const notice = await getNotice(noticeId);
      setForm({
        noticeId,
        title: notice.title,
        content: notice.content,
        isPinned: notice.isPinned,
      });
    } catch (loadError) {
      setError(toErrorMessage(loadError, '공지 상세를 불러오지 못했습니다.'));
    }
  };

  const saveNotice = async () => {
    if (!form) return;
    const title = form.title.trim();
    const content = form.content.trim();
    if (!title || !content) {
      setError('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      if (form.noticeId) {
        await updateAdminNotice(form.noticeId, { title, content, isPinned: form.isPinned });
        setMessage('공지를 수정했습니다.');
      } else {
        await createAdminNotice({
          title,
          content,
          isPinned: form.isPinned,
          sendNotification: form.sendNotification,
          sendEmail: form.sendEmail,
        });
        setMessage('공지를 등록했습니다.');
      }
      setForm(null);
      refresh();
    } catch (saveError) {
      setError(toErrorMessage(saveError, '공지를 저장하지 못했습니다.'));
    } finally {
      setSubmitting(false);
    }
  };

  const removeNotice = async (notice: NoticeSummary) => {
    if (!window.confirm(`"${notice.title}" 공지를 삭제할까요?`)) return;
    setError('');
    try {
      await deleteAdminNotice(notice.noticeId);
      setMessage('공지를 삭제했습니다.');
      refresh();
    } catch (deleteError) {
      setError(toErrorMessage(deleteError, '공지를 삭제하지 못했습니다.'));
    }
  };

  const sendPush = async (notice: NoticeSummary) => {
    if (!window.confirm(`"${notice.title}" 공지의 푸시 발송을 접수할까요?`)) return;
    setError('');
    try {
      await sendAdminNoticePush(notice.noticeId);
      setMessage('푸시 발송 작업이 접수되었습니다.');
    } catch (pushError) {
      setError(toErrorMessage(pushError, '푸시 발송을 접수하지 못했습니다.'));
    }
  };

  return (
    <div
      className="min-h-dvh w-full bg-gray-50 text-gray-900"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <AdminPageHeader title="공지 관리" refreshing={refreshing} onRefresh={refresh} />
      <AdminSectionNav />

      <main className="mx-auto max-w-[1240px] px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-extrabold">공지사항</h1>
            <p className="mt-1 text-xs text-gray-500">공지 등록·수정·삭제와 푸시 발송을 관리합니다.</p>
          </div>
          <button
            type="button"
            onClick={() => setForm({ ...EMPTY_FORM })}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 text-sm font-extrabold text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            공지 등록
          </button>
        </div>

        {error ? (
          <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </div>
        ) : null}

        <section className="mt-5 overflow-hidden rounded-[1.125rem] border border-gray-200 bg-white shadow-[0_4px_14px_rgba(60,40,90,0.05)]">
          <div className="border-b border-gray-100 p-4 md:p-5">
            <div className="relative max-w-[420px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="공지 제목 검색"
                aria-label="공지 제목 검색"
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-base outline-none focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100 md:text-sm"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-8 text-center text-sm text-gray-400">불러오는 중...</div>
            ) : notices.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">등록된 공지가 없습니다.</div>
            ) : (
              notices.map((notice) => (
                <article key={notice.noticeId} className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:px-5">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${notice.isPinned ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                    <Megaphone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {notice.isPinned ? <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-extrabold text-purple-700">고정</span> : null}
                      <h2 className="truncate text-sm font-extrabold">{notice.title}</h2>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">{formatDateTime(notice.createdAt)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <ActionButton label="수정" icon={<Pencil />} onClick={() => void openEdit(notice.noticeId)} />
                    <ActionButton label="푸시" icon={<BellRing />} onClick={() => void sendPush(notice)} />
                    <ActionButton label="삭제" icon={<Trash2 />} danger onClick={() => void removeNotice(notice)} />
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 text-xs text-gray-500">
            <span>총 {totalElements}건</span>
            <div className="flex items-center gap-2">
              <span>{totalPages === 0 ? 0 : page + 1} / {totalPages} 페이지</span>
              <button
                type="button"
                aria-label="이전 페이지"
                disabled={page === 0 || loading}
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 disabled:opacity-35"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="다음 페이지"
                disabled={page + 1 >= totalPages || loading}
                onClick={() => setPage((current) => current + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 disabled:opacity-35"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {form ? (
        <NoticeDialog
          form={form}
          submitting={submitting}
          onChange={setForm}
          onClose={() => setForm(null)}
          onSubmit={() => void saveNotice()}
        />
      ) : null}

      {message ? (
        <div role="status" className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white shadow-xl">
          {message}
        </div>
      ) : null}
    </div>
  );
}

function NoticeDialog({
  form,
  submitting,
  onChange,
  onClose,
  onSubmit,
}: {
  form: NoticeForm;
  submitting: boolean;
  onChange: (form: NoticeForm) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/25 p-4 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-labelledby="notice-dialog-title" className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 id="notice-dialog-title" className="text-lg font-extrabold">{form.noticeId ? '공지 수정' : '공지 등록'}</h2>
          <button type="button" onClick={onClose} disabled={submitting} aria-label="닫기" className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <label className="mt-5 block text-xs font-extrabold text-gray-700">
          제목
          <input
            value={form.title}
            onChange={(event) => onChange({ ...form, title: event.target.value })}
            maxLength={200}
            className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-3 text-base font-normal outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 md:text-sm"
          />
        </label>
        <label className="mt-4 block text-xs font-extrabold text-gray-700">
          내용
          <textarea
            value={form.content}
            onChange={(event) => onChange({ ...form, content: event.target.value })}
            rows={10}
            className="mt-2 w-full resize-y rounded-xl border border-gray-200 p-3 text-base font-normal outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 md:text-sm"
          />
        </label>
        <label className="mt-4 flex items-center gap-2 text-sm font-bold text-gray-700">
          <input
            type="checkbox"
            checked={form.isPinned}
            onChange={(event) => onChange({ ...form, isPinned: event.target.checked })}
            className="h-4 w-4 accent-purple-600"
          />
          목록 상단에 고정
        </label>

        {!form.noticeId ? (
          <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-extrabold text-gray-700">등록 시 발송</p>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <input
                type="checkbox"
                checked={form.sendNotification}
                onChange={(event) => onChange({ ...form, sendNotification: event.target.checked })}
                className="h-4 w-4 accent-purple-600"
              />
              앱 알람 발송
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <input
                type="checkbox"
                checked={form.sendEmail}
                onChange={(event) => onChange({ ...form, sendEmail: event.target.checked })}
                className="h-4 w-4 accent-purple-600"
              />
              이메일 발송
            </label>
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" onClick={onClose} disabled={submitting} className="h-11 rounded-xl border border-gray-200 text-sm font-extrabold text-gray-600">
            취소
          </button>
          <button type="button" onClick={onSubmit} disabled={submitting} className="h-11 rounded-xl bg-gray-900 text-sm font-extrabold text-white disabled:bg-gray-300">
            {submitting ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  label,
  icon,
  danger = false,
  onClick,
}: {
  label: string;
  icon: React.ReactElement;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-extrabold ${
        danger
          ? 'border-red-200 text-red-600 hover:bg-red-50'
          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
      }`}
    >
      <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>
      {label}
    </button>
  );
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function toErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError && error.backendMessage) return error.backendMessage;
  return error instanceof Error ? error.message : fallback;
}

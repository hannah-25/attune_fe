import { useRef, useState } from 'react';
import { useDialogKeyboard } from '../../app/hooks/useDialogKeyboard';
import { Megaphone, Send } from 'lucide-react';
import {
  sendAdminMarketingPush,
  type AdminMarketingPushRequest,
} from '../../app/api/admin';
import { ApiError } from '../../app/api/client';
import { parseServerDateTime } from '../../app/lib/date';
import AdminPageHeader from './AdminPageHeader';
import AdminSectionNav from './AdminSectionNav';

const DEEP_LINK_OPTIONS: { value: string; label: string }[] = [
  { value: '/home', label: '홈' },
  { value: '/medication', label: '약 관리' },
  { value: '/journal', label: '일지' },
  { value: '/report', label: '리포트' },
  { value: '/counseling', label: '상담' },
  { value: '/community', label: '커뮤니티' },
];

const EMPTY_FORM: AdminMarketingPushRequest = {
  title: '',
  body: '',
  targetUrl: null,
};

export default function AdminMarketingPage() {
  const [form, setForm] = useState<AdminMarketingPushRequest>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ sentAt: string; targetCount: number } | null>(null);

  const canSubmit = form.title.trim().length > 0 && form.body.trim().length > 0;

  const handleSend = async () => {
    setConfirm(false);
    setSubmitting(true);
    setError('');
    setResult(null);
    try {
      const response = await sendAdminMarketingPush({
        title: form.title.trim(),
        body: form.body.trim(),
        targetUrl: form.targetUrl,
      });
      setResult(response);
      setForm(EMPTY_FORM);
    } catch (sendError) {
      setError(
        sendError instanceof ApiError && sendError.backendMessage
          ? sendError.backendMessage
          : sendError instanceof Error
            ? sendError.message
            : '발송을 처리하지 못했습니다.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-dvh w-full bg-gray-50 text-gray-900"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <AdminPageHeader title="마케팅 발송" />
      <AdminSectionNav />

      <main className="mx-auto max-w-[640px] px-4 py-6 md:px-6 md:py-8">
        <div>
          <h1 className="text-xl font-extrabold">마케팅 푸시 발송</h1>
          <p className="mt-1 text-xs text-gray-500">마케팅 알림에 동의한 활성 회원에게 푸시를 발송합니다.</p>
        </div>

        {error ? (
          <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </div>
        ) : null}

        {result ? (
          <div role="status" className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
            발송 완료 · {result.targetCount.toLocaleString()}명에게 전송됨 · {formatDateTime(result.sentAt)}
          </div>
        ) : null}

        <section className="mt-5 rounded-[1.125rem] border border-gray-200 bg-white p-5 shadow-[0_4px_14px_rgba(60,40,90,0.05)] md:p-7">
          <Field label="제목">
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              maxLength={100}
              placeholder="푸시 알림 제목"
              className={inputClass}
            />
          </Field>

          <Field label="본문" className="mt-4">
            <textarea
              value={form.body}
              onChange={(event) => setForm({ ...form, body: event.target.value })}
              maxLength={200}
              rows={4}
              placeholder="푸시 알림 내용"
              className={`${inputClass} h-auto resize-none py-3`}
            />
          </Field>

          <Field label="이동 경로 (선택)" className="mt-4">
            <select
              value={form.targetUrl ?? ''}
              onChange={(event) =>
                setForm({ ...form, targetUrl: event.target.value || null })
              }
              className={inputClass}
            >
              <option value="">없음 (기본 홈으로 이동)</option>
              {DEEP_LINK_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.value})
                </option>
              ))}
            </select>
          </Field>

          <div className="mt-6 rounded-xl bg-gray-50 px-4 py-3 text-xs text-gray-500">
            <span className="font-extrabold text-gray-700">발송 대상</span>
            &ensp;마케팅 알림 동의 + 활성(ACTIVE) 회원
          </div>

          <button
            type="button"
            onClick={() => setConfirm(true)}
            disabled={!canSubmit || submitting}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-extrabold text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400"
          >
            <Send className="h-4 w-4" />
            {submitting ? '발송 중...' : '푸시 발송'}
          </button>
        </section>
      </main>

      {confirm ? (
        <ConfirmDialog
          title={form.title.trim()}
          targetUrl={form.targetUrl}
          onCancel={() => setConfirm(false)}
          onConfirm={() => void handleSend()}
        />
      ) : null}
    </div>
  );
}

function ConfirmDialog({
  title,
  targetUrl,
  onCancel,
  onConfirm,
}: {
  title: string;
  targetUrl: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialogKeyboard(dialogRef, onCancel);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/25 p-4 backdrop-blur-sm">
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="marketing-confirm-title"
        className="w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
          <Megaphone className="h-5 w-5" />
        </div>
        <h2 id="marketing-confirm-title" className="mt-4 text-lg font-extrabold">푸시를 발송할까요?</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          마케팅 알림에 동의한 활성 회원 전체에게 발송됩니다.
          {targetUrl ? (
            <span className="mt-1 block">
              탭 시 <strong className="text-gray-800">{targetUrl}</strong>으로 이동합니다.
            </span>
          ) : null}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 rounded-xl border border-gray-200 text-sm font-extrabold text-gray-600 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-11 rounded-xl bg-gray-900 text-sm font-extrabold text-white hover:bg-gray-800"
          >
            발송
          </button>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  'mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-base font-normal outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 md:text-sm';

function Field({
  label,
  className = '',
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block text-xs font-extrabold text-gray-700 ${className}`}>
      {label}
      {children}
    </label>
  );
}

function formatDateTime(value: string) {
  const date = parseServerDateTime(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

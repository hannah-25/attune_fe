import { useEffect, useState } from 'react';
import { FileCheck2, RefreshCcw, Send } from 'lucide-react';
import {
  createAdminTerms,
  getAdminTermsList,
  type AdminTermsCreateRequest,
  type AdminTermsListItem,
  type AdminTermType,
} from '../../app/api/admin';
import { ApiError } from '../../app/api/client';
import { parseServerDateTime } from '../../app/lib/date';
import AdminPageHeader from './AdminPageHeader';
import AdminSectionNav from './AdminSectionNav';

const TERM_LABELS: Record<AdminTermType, string> = {
  TERMS_OF_SERVICE: '서비스 이용약관',
  PRIVACY_POLICY: '개인정보 처리방침',
  MARKETING_CONSENT: '마케팅 정보 수신 동의',
  AI_ANALYSIS_CONSENT: 'AI 분석 동의',
};

function defaultDateTime(days = 0) {
  const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

export default function AdminTermsPage() {
  const [termsList, setTermsList] = useState<AdminTermsListItem[]>([]);
  const [termsLoading, setTermsLoading] = useState(true);
  const [termsRefreshKey, setTermsRefreshKey] = useState(0);
  const [termsRefreshing, setTermsRefreshing] = useState(false);
  const [form, setForm] = useState<AdminTermsCreateRequest>({
    title: '',
    version: 1,
    content: '',
    type: 'TERMS_OF_SERVICE',
    createdAt: defaultDateTime(),
    effectiveDate: defaultDateTime(7),
    sendEmail: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTermsLoading(true);
    getAdminTermsList()
      .then(setTermsList)
      .catch((loadError: unknown) => {
        console.error('Failed to load terms list:', loadError);
      })
      .finally(() => {
        setTermsLoading(false);
        setTermsRefreshing(false);
      });
  }, [termsRefreshKey]);

  const submit = async () => {
    const title = form.title.trim();
    const content = form.content.trim();
    if (!content) {
      setError('약관 내용을 입력해 주세요.');
      return;
    }
    if (form.sendEmail && !title) {
      setError('이메일 발송 시 이메일 제목을 입력해 주세요.');
      return;
    }
    if (!Number.isInteger(form.version) || form.version < 1) {
      setError('버전은 1 이상의 정수여야 합니다.');
      return;
    }
    if (!form.createdAt || !form.effectiveDate) {
      setError('작성일과 시행일을 모두 입력해 주세요.');
      return;
    }

    setSubmitting(true);
    setError('');
    setMessage('');
    try {
      const createdAt = normalizeKstDateTime(form.createdAt);
      const effectiveDate = normalizeKstDateTime(form.effectiveDate);
      if (!createdAt || !effectiveDate) {
        setError('작성일과 시행일을 올바르게 입력해 주세요.');
        return;
      }
      const result = await createAdminTerms({
        ...form,
        title,
        content,
        createdAt,
        effectiveDate,
      });
      setMessage(`${TERM_LABELS[result.type]} v${result.version} 등록을 완료했습니다.`);
      setTermsRefreshing(true);
      setTermsRefreshKey((k) => k + 1);
      setForm((current) => ({
        ...current,
        title: '',
        version: current.version + 1,
        content: '',
        createdAt: defaultDateTime(),
        effectiveDate: defaultDateTime(7),
        sendEmail: false,
      }));
    } catch (submitError) {
      setError(toErrorMessage(submitError, '약관을 등록하지 못했습니다.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-dvh w-full bg-gray-50 text-gray-900"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <AdminPageHeader title="약관 등록" />
      <AdminSectionNav />

      <main className="mx-auto max-w-[900px] px-4 py-6 md:px-6 md:py-8">
        <section className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold">등록된 약관</h1>
              <p className="mt-1 text-xs text-gray-500">종류별 최신 버전 기준으로 표시됩니다.</p>
            </div>
            <button
              type="button"
              onClick={() => { setTermsRefreshing(true); setTermsRefreshKey((k) => k + 1); }}
              disabled={termsRefreshing}
              aria-label="약관 목록 새로고침"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCcw className={`h-4 w-4 ${termsRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-[1.125rem] border border-gray-200 bg-white shadow-[0_4px_14px_rgba(60,40,90,0.05)]">
            {termsLoading ? (
              <div className="divide-y divide-gray-100">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-4">
                    <div className="h-5 w-28 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-10 animate-pulse rounded bg-gray-100" />
                    <div className="ml-auto h-4 w-32 animate-pulse rounded bg-gray-100" />
                  </div>
                ))}
              </div>
            ) : termsList.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-gray-400">
                등록된 약관이 없습니다.
              </div>
            ) : (
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#fbfbfd] text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                    <th className="px-5 py-3.5">종류</th>
                    <th className="px-4 py-3.5">버전</th>
                    <th className="px-4 py-3.5">시행일</th>
                    <th className="px-5 py-3.5">등록일</th>
                  </tr>
                </thead>
                <tbody>
                  {termsList.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/80">
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-1 text-xs font-extrabold text-purple-700">
                          {TERM_LABELS[item.type]}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-extrabold text-gray-800">v{item.version}</td>
                      <td className="px-4 py-4 text-xs text-gray-500">{formatDateTime(item.effectiveAt)}</td>
                      <td className="px-5 py-4 text-xs text-gray-500">{formatDateTime(item.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <div>
          <h1 className="text-xl font-extrabold">새 약관 등록</h1>
          <p className="mt-1 text-xs text-gray-500">등록한 날짜와 버전은 서버에서 자동 생성되지 않으므로 정확히 확인해 주세요.</p>
        </div>

        {error ? (
          <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div>
        ) : null}
        {message ? (
          <div role="status" className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">{message}</div>
        ) : null}

        <section className="mt-5 rounded-[1.125rem] border border-gray-200 bg-white p-5 shadow-[0_4px_14px_rgba(60,40,90,0.05)] md:p-7">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="약관 종류">
              <select
                value={form.type}
                onChange={(event) => setForm({ ...form, type: event.target.value as AdminTermType })}
                className={inputClass}
              >
                {Object.entries(TERM_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </Field>
            <Field label="버전">
              <input
                type="number"
                min={1}
                step={1}
                value={form.version}
                onChange={(event) => setForm({ ...form, version: Number(event.target.value) })}
                className={inputClass}
              />
            </Field>
            <Field label="작성일">
              <input
                type="datetime-local"
                value={form.createdAt}
                onChange={(event) => setForm({ ...form, createdAt: event.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="시행일">
              <input
                type="datetime-local"
                value={form.effectiveDate}
                onChange={(event) => setForm({ ...form, effectiveDate: event.target.value })}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="약관 전체 내용" className="mt-4">
            <textarea
              value={form.content}
              onChange={(event) => setForm({ ...form, content: event.target.value })}
              rows={18}
              className={`${inputClass} h-auto resize-y py-3`}
            />
          </Field>

          <label className="mt-5 flex items-start gap-3 rounded-xl bg-gray-50 p-4">
            <input
              type="checkbox"
              checked={form.sendEmail}
              onChange={(event) => setForm({ ...form, sendEmail: event.target.checked })}
              className="mt-0.5 h-4 w-4 accent-purple-600"
            />
            <span>
              <span className="block text-sm font-extrabold text-gray-800">약관 변경 이메일 발송 이벤트 생성</span>
              <span className="mt-1 block text-xs leading-relaxed text-gray-500">활성화하면 등록과 함께 이메일 발송 이벤트가 생성됩니다.</span>
            </span>
          </label>

          {form.sendEmail ? (
            <Field label="변경 안내 이메일 제목" description="DB에 저장되지 않고 이메일 제목으로만 사용됩니다." className="mt-4">
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                maxLength={200}
                className={inputClass}
              />
            </Field>
          ) : null}

          <button
            type="button"
            onClick={() => void submit()}
            disabled={submitting}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-extrabold text-white hover:bg-gray-800 disabled:bg-gray-300"
          >
            {form.sendEmail ? <Send className="h-4 w-4" /> : <FileCheck2 className="h-4 w-4" />}
            {submitting ? '등록 중...' : '약관 등록'}
          </button>
        </section>
      </main>
    </div>
  );
}

const inputClass = 'mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-base font-normal outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 md:text-sm';

function Field({
  label,
  description,
  className = '',
  children,
}: {
  label: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block text-xs font-extrabold text-gray-700 ${className}`}>
      {label}
      {description ? <span className="mt-1 block font-normal leading-relaxed text-gray-400">{description}</span> : null}
      {children}
    </label>
  );
}

function formatDateTime(value: string) {
  const date = parseServerDateTime(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function normalizeKstDateTime(value: string): string | null {
  const match = value.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/,
  );
  if (!match) return null;

  const [, yearText, monthText, dayText, hourText, minuteText, secondText = '00'] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > lastDay ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    second < 0 ||
    second > 59
  ) {
    return null;
  }

  return `${yearText}-${monthText}-${dayText}T${hourText}:${minuteText}:${secondText}`;
}

function toErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError && error.backendMessage) return error.backendMessage;
  return error instanceof Error ? error.message : fallback;
}

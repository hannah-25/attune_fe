const DAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];

export function formatDate(date: Date): string {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const day = DAYS_KO[date.getDay()];
  return `${m}월 ${d}일 ${day}`;
}

export function formatLongDate(date: Date): string {
  if (isNaN(date.getTime())) return '-';
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function formatMonthDay(date: Date): string {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${m}/${d}`;
}

export function formatDateRange(start: Date, end: Date): string {
  return `${formatMonthDay(start)} — ${formatMonthDay(end)}`;
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return '방금';
  if (diffHour < 1) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay === 1) return '어제';
  return `${diffDay}일 전`;
}

export function formatUpcomingDateTime(date: Date): string {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const day = DAYS_KO[date.getDay()];
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${m}월 ${d}일 ${day} ${h}:${min}까지`;
}

export function formatFullDateTime(date: Date): string {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const day = DAYS_KO[date.getDay()];
  const h = date.getHours().toString().padStart(2, '0');
  const min = date.getMinutes().toString().padStart(2, '0');
  return `${m}월 ${d}일 ${day} ${h}:${min}`;
}

export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day + 1); // Monday
  return d;
}

export function getWeekEnd(date: Date): Date {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return end;
}

export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function toTimeInputValue(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * 서버 응답의 date/datetime 문자열을 Date로 파싱한다.
 *
 * 시간 처리 가이드 기준(응답 datetime = Instant / UTC 'Z' 표기):
 * - datetime(Z 또는 offset 포함, 예: '2026-07-01T05:00:00Z'): `new Date`로 그대로
 *   파싱하면 기기 로컬 시간으로 표시된다. 수동 +09:00 부착이나 "KST로 간주"는 불필요.
 * - 'yyyy-MM-dd' (date): 달력 날짜 → 로컬 자정. `new Date('yyyy-MM-dd')`가 UTC 자정으로
 *   파싱해 UTC 이전 지역에서 하루 밀리는 것을 방지하려고 로컬 자정으로 만든다.
 *
 * ⚠️ 벽시계 값(doseTime 'HH:mm:ss')에는 쓰지 말 것 — 매일 그 시각을 의미하므로
 *    Date로 변환하지 않고 시/분 문자열로 다뤄야 한다.
 */
export function parseServerDateTime(value: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [yearText, monthText, dayText] = value.split('-');
    return new Date(Number(yearText), Number(monthText) - 1, Number(dayText));
  }

  return new Date(value);
}

export function parseDateValue(value: string): Date {
  return parseServerDateTime(value);
}

export function isEndAtPassed(endAt?: string | null): boolean {
  if (!endAt) return false;

  const end = parseDateValue(endAt);
  if (Number.isNaN(end.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return end < today;
}

export function toDateInputValueFromDateTime(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return toDateInputValue(new Date());
  return toDateInputValue(date);
}

export function toTimeInputValueFromDateTime(value: string, defaultTime = '00:00'): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return defaultTime;
  return toTimeInputValue(date);
}

export function toLocalIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

export function parseDateParam(value: string | null, hour: number, minute: number): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day, hour, minute, 0, 0);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function addHours(date: Date, hours: number): Date {
  const next = new Date(date);
  next.setHours(date.getHours() + hours);
  return next;
}

export function parseDateTimeInputs(dateValue: string, timeValue: string): Date | null {
  if (!dateValue || !timeValue) return null;
  const date = new Date(`${dateValue}T${timeValue}:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

export function parseLocalDateTime(value: string): Date {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export function toLocalIsoFromInputs(dateValue: string, timeValue: string, allDay: boolean, edge: 'start' | 'end' = 'start'): string {
  const timePart = allDay ? (edge === 'end' ? '23:59' : '00:00') : (timeValue || '00:00');
  return `${dateValue}T${timePart}:00`;
}

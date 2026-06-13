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

export function cleanPath(path: string): string {
  const i = path.indexOf('?');
  return i >= 0 ? path.slice(0, i) : path;
}

export function searchParams(path: string): URLSearchParams {
  const i = path.indexOf('?');
  return i >= 0 ? new URLSearchParams(path.slice(i + 1)) : new URLSearchParams();
}

// ── 날짜 유틸 ───────────────────────────────────────────────────────────────
// 로컬 타임존 기준 날짜 변환. SyncService / cache / resolver 공통 사용.

export function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseLocalDate(value: string): Date | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

export function toLocalDateStringFromTimestamp(value: string): string | null {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return toLocalDateString(date);
}

export function nextLocalDateString(value: string): string {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + 1);
  return toLocalDateString(date);
}

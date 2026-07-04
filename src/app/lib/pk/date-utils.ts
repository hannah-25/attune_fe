export function formatHours(hours: number): string {
  if (Number.isInteger(hours)) return `${hours}시간`;
  return `${hours.toFixed(1)}시간`;
}

export function getTreatmentDay(startedAt?: string | null): number | null {
  if (!startedAt) return null;
  const start = parseLocalDate(startedAt);
  if (!start) return null;
  const today = new Date();
  const localToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffDays = Math.round((localToday.getTime() - start.getTime()) / 86_400_000) + 1;
  return diffDays > 0 ? diffDays : null;
}

function parseLocalDate(value: string): Date | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

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
  const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateOnly) {
    const year = Number(dateOnly[1]);
    const month = Number(dateOnly[2]);
    const day = Number(dateOnly[3]);
    const date = new Date(year, month - 1, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

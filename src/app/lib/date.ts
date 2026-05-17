const DAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];

export function formatDate(date: Date): string {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const day = DAYS_KO[date.getDay()];
  return `${m}월 ${d}일 ${day}`;
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

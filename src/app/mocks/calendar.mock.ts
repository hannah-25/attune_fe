import type { ScheduleCategory, ScheduleSummary, ScheduleDetail } from '../api/schedule';

export const mockScheduleCategories: ScheduleCategory[] = [
  { categoryId: 1, categoryName: '상담', color: '#a78bfa' },
  { categoryId: 2, categoryName: '업무', color: '#60a5fa' },
  { categoryId: 3, categoryName: '기타', color: '#86efac' },
];

export const mockScheduleSummaries: ScheduleSummary[] = [
  { scheduleId: 1, title: '정신건강의학과 정기 진료', categoryId: 1, isAllDay: false, startTime: '2026-05-31T14:00:00', endTime: '2026-05-31T14:40:00' },
  { scheduleId: 2, title: '팀 미팅', categoryId: 2, isAllDay: false, startTime: '2026-06-01T09:00:00', endTime: '2026-06-01T10:00:00' },
  { scheduleId: 3, title: '정신건강의학과 상담', categoryId: 1, isAllDay: false, startTime: '2026-06-05T14:00:00', endTime: '2026-06-05T14:40:00' },
  { scheduleId: 4, title: '리포트 제출', categoryId: 2, isAllDay: true, startTime: '2026-06-10T00:00:00', endTime: '2026-06-10T23:59:00' },
];

export const mockScheduleDetail: ScheduleDetail = {
  title: '정신건강의학과 정기 진료',
  categoryId: 1,
  place: '청담심리상담센터',
  isAllDay: false,
  startTime: '2026-05-31T14:00:00',
  endTime: '2026-05-31T14:40:00',
};

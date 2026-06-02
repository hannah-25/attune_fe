import type { TodoItem } from '../api/todo';
import type { ScheduleSummary } from '../api/schedule';

// API-shaped
export const mockTodos: TodoItem[] = [
  { todoId: 1, text: '병원 서류 챙기기', dueAt: '2026-05-31T00:00:00', isAllDay: true, isCompleted: true },
  { todoId: 2, text: '리포트 초안 제출', dueAt: '2026-05-31T00:00:00', isAllDay: false, isCompleted: false },
  { todoId: 3, text: '저녁 약 챙기기', dueAt: '2026-05-31T19:00:00', isAllDay: false, isCompleted: false },
];

export const mockSchedules: ScheduleSummary[] = [
  { scheduleId: 1, title: '병원 진료', categoryId: 1, isAllDay: false, startTime: '2026-05-31T14:00:00', endTime: '2026-05-31T14:40:00' },
  { scheduleId: 2, title: '팀 미팅', categoryId: 2, isAllDay: false, startTime: '2026-06-01T09:00:00', endTime: '2026-06-01T10:00:00' },
  { scheduleId: 3, title: '정신건강의학과 상담', categoryId: 1, isAllDay: false, startTime: '2026-06-05T14:00:00', endTime: '2026-06-05T14:40:00' },
];

// UI-only (컴포넌트 직접 참조 — 유지)
export const mockWeeklyStats = {
  goalAchievement: '71%',
  adherence: '86%',
};

export const mockInsight = {
  title: '복용 2시간 후 집중력 +24%',
  highlight: '+24%',
  subtitle: '복약률 86% · 달성률 71%',
};

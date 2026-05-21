// TODO: Replace with API data

export const mockTodos = [
  { id: 1, text: '병원 서류 챙기기', done: true },
  { id: 2, text: '리포트 초안 제출', done: false },
  { id: 3, text: '저녁 약 챙기기', done: false },
];

export const mockScheduleItems = [
  { label: '오늘', labelColor: 'text-purple-500', dotColor: 'bg-purple-500', title: '병원 진료', time: '14:00' },
  { label: '내일', labelColor: 'text-gray-400', dotColor: 'bg-purple-300', title: '팀 미팅', time: '09:00' },
  { label: '목', labelColor: 'text-gray-400', dotColor: 'bg-purple-300', title: '정신건강의학과 상담', time: '14:00' },
];

export const mockWeeklyStats = {
  goalAchievement: '71%',
  adherence: '86%',
};

export const mockInsight = {
  title: '복용 2시간 후 집중력 +24%',
  highlight: '+24%',
  subtitle: '복약률 86% · 달성률 71%',
};

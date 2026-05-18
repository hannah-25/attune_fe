// TODO: Replace with API data

export const mockWeeklyStats = {
  adherence:       { value: '86%', delta: '+12%' },
  emotion:         { value: '6.4', delta: '+0.8' },
  mistakes:        { value: '4번',  delta: '-2'   },
  goalAchievement: { value: '72%', delta: '+5%'  },
};

export const mockMonthlyStats = {
  adherence:       { value: '82%', delta: '+8%'  },
  emotion:         { value: '6.1', delta: '+0.5' },
  mistakes:        { value: '16번', delta: '-6'  },
  goalAchievement: { value: '68%', delta: '+3%'  },
};

export const mockWeeklyInsight = '아침 약 복용 직후 2시간 동안 집중력 점수가 평균 +24% 더 높았어요. 점심 약을 놓친 날에는 오후 업무 실수가 늘었습니다.';
export const mockMonthlyInsight = '이번 달 복용률이 꾸준히 유지되고 있어요. 주말 복용률이 평일 대비 낮은 경향이 관찰됩니다.';

export const mockWeeklyChartData = [
  { day: '월', score: 7   },
  { day: '화', score: 10  },
  { day: '수', score: 6.3 },
  { day: '목', score: 9   },
  { day: '금', score: 10.8 },
  { day: '토', score: 8   },
  { day: '일', score: 5   },
];

export const mockMonthlyChartData = [
  { day: '1주', score: 6.5 },
  { day: '2주', score: 7.2 },
  { day: '3주', score: 8.1 },
  { day: '4주', score: 6.8 },
];

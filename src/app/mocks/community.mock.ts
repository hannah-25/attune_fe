// TODO: Replace with API data

export type Category = '전체' | '질병 정보' | '약물 치료' | '일상생활' | '미분류';
export type NoticeHighlightTone = 'lavender' | 'peach';

export type MockNotice = {
  noticeId: number;
  title: string;
  createdAt: string;
  highlightTone?: NoticeHighlightTone;
  badgeLabel?: string;
};

export const mockPosts = [
  {
    id: 1,
    category: '약물 치료' as Category,
    author: '익명',
    time: '2시간 전',
    title: '콘서타 1주차 후기 - 아침 식욕이 너무 없어요',
    body: '비슷한 분들 어떻게 견디고 계신가요?',
    likes: 12,
    liked: false,
    comments: 8,
  },
  {
    id: 2,
    category: '약물 치료' as Category,
    author: '루나',
    time: '5시간 전',
    title: '스트라테라로 바꾼 지 한 달',
    body: '확실히 점심 이후 컨디션이 안정적이에요',
    likes: 24,
    liked: false,
    comments: 14,
  },
  {
    id: 3,
    category: '약물 치료' as Category,
    author: '익명',
    time: '어제',
    title: '약 먹고 졸린 분 계신가요?',
    body: '오후 2시쯤 너무 졸려서 일을 못하겠어요.',
    likes: 7,
    liked: false,
    comments: 3,
  },
  {
    id: 4,
    category: '질병 정보' as Category,
    author: '제이',
    time: '어제',
    title: '처음 진료 받으러 가는데 너무 떨려요',
    body: '경험담 들려주실 분 있을까요?',
    likes: 18,
    liked: false,
    comments: 22,
  },
  {
    id: 5,
    category: '약물 치료' as Category,
    author: '익명',
    time: '2일 전',
    title: '콘서타 27mg 증량 후기',
    body: '집중력은 늘었지만 잠이 잘 안 와요',
    likes: 9,
    liked: false,
    comments: 5,
  },
];

export const mockPostDetail = {
  category: '약물 치료',
  author: '익명',
  time: '2시간 전',
  title: '콘서타 1주차 후기, 오후에 힘이 빠져요',
  likes: 12,
  commentCount: 8,
  paragraphs: [
    '콘서타를 시작한 지 일주일 정도 됐습니다. 오전에는 머릿속이 조용해지고 한 가지 일을 붙잡고 생각할 시간이 조금 생겼어요.',
    '다만 오후 3시쯤부터 속이 비고 힘이 빠지는 느낌이 있습니다. 물을 자주 마시고 점심을 챙기면 조금 나은 것 같아요.',
    '비슷한 시기에 적응하신 분들은 언제쯤 몸이 편해졌나요? 병원에 가기 전까지 기록해두면 좋을 증상이나 생활 팁이 있으면 공유 부탁드려요.',
  ],
};

export const mockComments = [
  {
    author: '루나',
    avatarClass: 'bg-[rgb(208,201,189)]',
    meta: '방금',
    body: '저도 비슷했어요. 식사를 못 하면 기록을 같이 적어가면 진료 때 설명하기 좋더라고요.',
  },
  {
    author: '글쓴이',
    avatarClass: 'bg-purple-300',
    meta: '방금',
    body: '감사합니다. 오늘부터 시간대별로 메모해볼게요.',
    isAuthor: true,
  },
  {
    author: '익명',
    avatarClass: 'bg-[rgb(208,201,189)]',
    meta: '방금',
    body: '오후 카페인을 줄이면 힘 빠지는 느낌이 덜한 경우도 있었어요. 무리하지 말고 천천히 보세요.',
  },
];

export const mockNotices: MockNotice[] = [
  {
    noticeId: 1,
    title: '[중요] 개인정보 처리방침 개정 안내',
    createdAt: '2026-05-20T09:00:00',
    highlightTone: 'lavender',
  },
  {
    noticeId: 2,
    title: '[업데이트] v2.2 - AI 인사이트 기능 출시',
    createdAt: '2026-05-18T10:00:00',
    highlightTone: 'peach',
    badgeLabel: 'NEW',
  },
  {
    noticeId: 3,
    title: 'v2.1 업데이트 - 캘린더 연동 추가',
    createdAt: '2026-05-10T11:00:00',
  },
  {
    noticeId: 4,
    title: '서버 점검 안내 (5/15 02:00 ~ 04:00)',
    createdAt: '2026-05-09T08:30:00',
  },
  {
    noticeId: 5,
    title: '상담 기록 PDF 내보내기 베타 오픈',
    createdAt: '2026-05-02T14:00:00',
  },
  {
    noticeId: 6,
    title: '이용약관 일부 개정 안내',
    createdAt: '2026-04-28T09:00:00',
  },
];

import type { PostResponse, CommentResponse } from '../api/community';
import type { NoticeSummary } from '../api/notice';

// API-shaped
export const mockPosts: PostResponse[] = [
  {
    postId: 1,
    postCategory: 'MEDICATION',
    anonNickname: '익명',
    createdAt: '2026-05-31T09:00:00',
    updatedAt: '2026-05-31T09:00:00',
    title: '콘서타 1주차 후기 - 아침 식욕이 너무 없어요',
    content: '비슷한 분들 어떻게 견디고 계신가요?',
    isOwner: false,
  },
  {
    postId: 2,
    postCategory: 'MEDICATION',
    anonNickname: '루나',
    createdAt: '2026-05-31T06:00:00',
    updatedAt: '2026-05-31T06:00:00',
    title: '스트라테라로 바꾼 지 한 달',
    content: '확실히 점심 이후 컨디션이 안정적이에요',
    isOwner: false,
  },
  {
    postId: 3,
    postCategory: 'MEDICATION',
    anonNickname: '익명',
    createdAt: '2026-05-30T12:00:00',
    updatedAt: '2026-05-30T12:00:00',
    title: '약 먹고 졸린 분 계신가요?',
    content: '오후 2시쯤 너무 졸려서 일을 못하겠어요.',
    isOwner: false,
  },
  {
    postId: 4,
    postCategory: 'DISORDER_INFO',
    anonNickname: '제이',
    createdAt: '2026-05-30T10:00:00',
    updatedAt: '2026-05-30T10:00:00',
    title: '처음 진료 받으러 가는데 너무 떨려요',
    content: '경험담 들려주실 분 있을까요?',
    isOwner: false,
  },
  {
    postId: 5,
    postCategory: 'MEDICATION',
    anonNickname: '익명',
    createdAt: '2026-05-29T09:00:00',
    updatedAt: '2026-05-29T09:00:00',
    title: '콘서타 27mg 증량 후기',
    content: '집중력은 늘었지만 잠이 잘 안 와요',
    isOwner: false,
  },
];

export const mockPostDetail: PostResponse = {
  postId: 1,
  postCategory: 'MEDICATION',
  anonNickname: '익명',
  createdAt: '2026-05-31T09:00:00',
  updatedAt: '2026-05-31T09:00:00',
  title: '콘서타 1주차 후기, 오후에 힘이 빠져요',
  content: [
    '콘서타를 시작한 지 일주일 정도 됐습니다. 오전에는 머릿속이 조용해지고 한 가지 일을 붙잡고 생각할 시간이 조금 생겼어요.',
    '다만 오후 3시쯤부터 속이 비고 힘이 빠지는 느낌이 있습니다. 물을 자주 마시고 점심을 챙기면 조금 나은 것 같아요.',
    '비슷한 시기에 적응하신 분들은 언제쯤 몸이 편해졌나요?',
  ].join('\n\n'),
  isOwner: false,
};

export const mockComments: CommentResponse[] = [
  {
    commentId: 1,
    anonNickname: '루나',
    content: '저도 비슷했어요. 식사를 못 하면 기록을 같이 적어가면 진료 때 설명하기 좋더라고요.',
    createdAt: '2026-05-31T10:00:00',
    isPostAuthor: false,
    isOwner: false,
  },
  {
    commentId: 2,
    anonNickname: '글쓴이',
    content: '감사합니다. 오늘부터 시간대별로 메모해볼게요.',
    createdAt: '2026-05-31T10:05:00',
    isPostAuthor: true,
    isOwner: true,
  },
  {
    commentId: 3,
    anonNickname: '익명',
    content: '오후 카페인을 줄이면 힘 빠지는 느낌이 덜한 경우도 있었어요. 무리하지 말고 천천히 보세요.',
    createdAt: '2026-05-31T10:10:00',
    isPostAuthor: false,
    isOwner: false,
  },
];

// UI-only 필드 포함 (CommunityNoticePage 직접 참조 — 유지)
export type NoticeHighlightTone = 'lavender' | 'peach';

export type MockNotice = NoticeSummary & {
  highlightTone?: NoticeHighlightTone;
  badgeLabel?: string;
};

export const mockNotices: MockNotice[] = [
  { noticeId: 1, title: '[중요] 개인정보 처리방침 개정 안내', createdAt: '2026-05-20T09:00:00', highlightTone: 'lavender' },
  { noticeId: 2, title: '[업데이트] v2.2 - AI 인사이트 기능 출시', createdAt: '2026-05-18T10:00:00', highlightTone: 'peach', badgeLabel: 'NEW' },
  { noticeId: 3, title: 'v2.1 업데이트 - 캘린더 연동 추가', createdAt: '2026-05-10T11:00:00' },
  { noticeId: 4, title: '서버 점검 안내 (5/15 02:00 ~ 04:00)', createdAt: '2026-05-09T08:30:00' },
  { noticeId: 5, title: '상담 기록 PDF 내보내기 베타 오픈', createdAt: '2026-05-02T14:00:00' },
  { noticeId: 6, title: '이용약관 일부 개정 안내', createdAt: '2026-04-28T09:00:00' },
];

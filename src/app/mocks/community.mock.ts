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
    content: '콘서타를 시작한 지 일주일 정도 됐습니다. 오전에는 머릿속이 조용해지고 한 가지 일을 붙잡고 생각할 시간이 조금 생겼어요.\n\n다만 오후 3시쯤부터 속이 비고 힘이 빠지는 느낌이 있습니다. 물을 자주 마시고 점심을 챙기면 조금 나은 것 같아요.\n\n비슷한 시기에 적응하신 분들은 언제쯤 몸이 편해졌나요? 병원에 가기 전까지 기록해두면 좋을 증상이나 생활 팁이 있으면 공유 부탁드려요.',
    isOwner: false,
  },
  {
    postId: 2,
    postCategory: 'MEDICATION',
    anonNickname: '루나',
    createdAt: '2026-05-31T06:00:00',
    updatedAt: '2026-05-31T06:00:00',
    title: '스트라테라로 바꾼 지 한 달',
    content: '콘서타에서 스트라테라로 바꾼 지 한 달이 됐어요. 처음 2주는 적응 기간인지 머리가 무겁고 의욕이 없었는데, 3주차부터 확실히 점심 이후 컨디션이 안정적이에요.\n\n콘서타는 오후 4시 이후로 약효가 확 떨어지는 느낌이 있었는데, 스트라테라는 그 출렁임이 없어서 좋습니다. 대신 효과가 서서히 나타나는 편이라 처음엔 불안했어요.\n\n같은 경험 있으신 분 있나요?',
    isOwner: false,
  },
  {
    postId: 3,
    postCategory: 'MEDICATION',
    anonNickname: '익명',
    createdAt: '2026-05-30T12:00:00',
    updatedAt: '2026-05-30T12:00:00',
    title: '약 먹고 졸린 분 계신가요?',
    content: '복용을 시작한 지 3주 됐는데, 오후 2시쯤만 되면 너무 졸려서 일을 못하겠어요.\n\n처음엔 약 때문인지 몰랐는데 복용 안 한 날은 괜찮더라고요. 의사 선생님께 말씀드려야 할지 아니면 조금 더 기다려야 할지 모르겠어요.',
    isOwner: false,
  },
  {
    postId: 4,
    postCategory: 'DISORDER_INFO',
    anonNickname: '제이',
    createdAt: '2026-05-30T10:00:00',
    updatedAt: '2026-05-30T10:00:00',
    title: '처음 진료 받으러 가는데 너무 떨려요',
    content: '성인 ADHD 진단을 받으러 처음으로 정신건강의학과에 가보려고 하는데 너무 떨려요.\n\n어떤 검사를 하는지, 뭘 준비해 가야 하는지 아무것도 모르겠어요. 어릴 때부터 집중을 못하고 충동적인 게 있었는데 이제서야 알아보게 됐어요.\n\n경험 있으신 분들 조언 부탁드려요.',
    isOwner: false,
  },
  {
    postId: 5,
    postCategory: 'MEDICATION',
    anonNickname: '익명',
    createdAt: '2026-05-29T09:00:00',
    updatedAt: '2026-05-29T09:00:00',
    title: '콘서타 27mg 증량 후기',
    content: '18mg에서 27mg으로 증량한 지 2주 됐어요. 집중력은 확실히 늘었고 멍한 시간이 줄었는데, 잠이 잘 안 와요.\n\n밤 11시에 누워도 새벽 2시까지 뒤척이다 보니 낮에 피로가 쌓이는 것 같아요. 수면제를 같이 처방받아야 할지 고민 중입니다.',
    isOwner: false,
  },
];

export const mockCommentsByPost: Record<number, CommentResponse[]> = {
  1: [
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
      anonNickname: '익명',
      content: '저는 2주차부터 나아졌어요. 아침을 꼭 먹고 복용하는 게 도움됐습니다.',
      createdAt: '2026-05-31T10:05:00',
      isPostAuthor: true,
      isOwner: false,
    },
    {
      commentId: 3,
      anonNickname: '익명',
      content: '오후 카페인을 줄이면 힘 빠지는 느낌이 덜한 경우도 있었어요. 무리하지 말고 천천히 보세요.',
      createdAt: '2026-05-31T10:10:00',
      isPostAuthor: false,
      isOwner: false,
    },
  ],
  2: [
    {
      commentId: 4,
      anonNickname: '제이',
      content: '저도 콘서타에서 스트라테라로 바꿨는데 비슷한 경험이에요. 한 달 지나니까 훨씬 편해졌어요.',
      createdAt: '2026-05-31T07:00:00',
      isPostAuthor: false,
      isOwner: false,
    },
  ],
  4: [
    {
      commentId: 5,
      anonNickname: '익명',
      content: '저도 작년에 처음 갔었어요. ASRS 체크리스트 작성하고 면담 위주로 진행돼요. 긴장 안 하셔도 됩니다.',
      createdAt: '2026-05-30T11:00:00',
      isPostAuthor: false,
      isOwner: false,
    },
    {
      commentId: 6,
      anonNickname: '루나',
      content: '평소 어려웠던 상황들을 미리 메모해 가면 설명하기 편해요. 응원해요!',
      createdAt: '2026-05-30T11:30:00',
      isPostAuthor: false,
      isOwner: false,
    },
  ],
};

export const mockComments: CommentResponse[] = mockCommentsByPost[1];

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

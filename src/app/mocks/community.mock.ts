// TODO: Replace with API data

type Category = '전체' | '질병 정보' | '약물 치료' | '일상생활' | '미분류';

export const mockPosts = [
  { id: 1, category: '약물 치료' as Category, author: '익명', time: '2시간 전', title: '콘서타 1주차 후기 — 아침 식욕이 너무 없어요', body: '비슷한 분들 어떻게 견디고 계신가요?', likes: 12, liked: false, comments: 8, likeIconSrc: '/icons/c066f77fe099dc06ec1d9d71a1dd49ad735337f5.svg', commentIconSrc: '/icons/fa27671cf7a58eb1d69be0c24922ebe12068820e.svg' },
  { id: 2, category: '약물 치료' as Category, author: '루나', time: '5시간 전', title: '스트라테라로 바꾼 지 한달', body: '확실히 점심 이후 컨디션이 안정적이에요', likes: 24, liked: false, comments: 14, likeIconSrc: '/icons/026056801d9edc661de42c35aeb65d56b2669708.svg', commentIconSrc: '/icons/6a1e1feb9c38bab93b9179da531778584800c4c4.svg' },
  { id: 3, category: '약물 치료' as Category, author: '익명', time: '어제', title: '약 먹고 졸린 분 계신가요?', body: '오후 2시쯤 너무 졸려서 일을 못하겠어요...', likes: 7, liked: false, comments: 3, likeIconSrc: '/icons/069bfac8474d97299e3b30492cfd8e4f8ff3d45d.svg', commentIconSrc: '/icons/eaf51371d3f19bd29039b829ebcc8a9e0182dbcf.svg' },
  { id: 4, category: '질병 정보' as Category, author: '제이', time: '어제', title: '처음 진료 받으러 가는데 너무 떨려요', body: '경험담 들려주실 분 있을까요?', likes: 18, liked: false, comments: 22, likeIconSrc: '/icons/9fd2528ba8379cdb6894826f9c84b0eb9b73b4b1.svg', commentIconSrc: '/icons/6cdfe483eda449d1514ecf2e225ced5d59dad218.svg' },
  { id: 5, category: '약물 치료' as Category, author: '익명', time: '2일 전', title: '콘서타 27mg 증량 후기', body: '집중력은 늘었지만 잠이 잘 안와요', likes: 9, liked: false, comments: 5, likeIconSrc: '/icons/cb1ebfde02849925daf22f8dceb1c58376065678.svg', commentIconSrc: '/icons/231a8884b67a8e4ff3b2b52bb56cf1fe3f160cdc.svg' },
];

export const mockPostDetail = {
  category: '약물 치료',
  author: '익명',
  time: '2시간 전',
  title: '콘서타 1주차 후기, 오후에 살짝 예민해져요',
  likes: 12,
  commentCount: 8,
  paragraphs: [
    '콘서타를 시작한 지 일주일 정도 됐는데, 오전에는 확실히 머릿속이 조용해지는 느낌이 있어요. 할 일을 하나씩 붙잡고 끝까지 가져가는 시간이 조금 늘었습니다.',
    '다만 오후 3시쯤부터 속이 비고 예민해지는 느낌이 있고, 잠들기 전까지 긴장이 남아 있는 날도 있네요. 물을 자주 마시고 점심을 챙겨 먹으면 조금 덜한 것 같아요.',
    '비슷한 시기에 적응하신 분들은 언제쯤 몸이 편해졌나요? 병원에 가기 전까지 기록해두면 좋을 증상이나 생활 팁이 있으면 공유 부탁드려요.',
  ],
};

export const mockComments = [
  { author: '루나', avatarClass: 'bg-[rgb(208,201,189)]', meta: '방금', body: '저도 비슷했어요. 식사랑 수면 기록을 같이 적어두면 진료 때 설명하기 좋더라고요.' },
  { author: '글쓴이', avatarClass: 'bg-purple-300', meta: '방금', body: '감사합니다. 오늘부터 시간대별로 메모해볼게요.', isAuthor: true },
  { author: '익명', avatarClass: 'bg-[rgb(208,201,189)]', meta: '방금', body: '오후에 카페인을 줄이면 덜 예민해지는 경우도 있었어요. 무리하지 말고 천천히 보세요.' },
];

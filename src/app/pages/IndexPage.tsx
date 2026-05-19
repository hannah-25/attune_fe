import { Link } from 'react-router';

type PageEntry = { path: string; label: string; desc: string };
type Group = { group: string; pages: PageEntry[] };

const sections: Group[] = [
  {
    group: '인증',
    pages: [
      { path: '/splash',           label: 'Splash',           desc: '앱 시작 화면' },
      { path: '/signup',           label: '회원가입',           desc: '소셜 로그인 · 약관' },
      { path: '/verify-email',     label: '인증메일 발송',      desc: '이메일 인증 안내' },
      { path: '/login',            label: '로그인',             desc: '이메일 · 비밀번호' },
      { path: '/reset-password/1', label: '비밀번호 재설정 1',  desc: '이메일 입력' },
      { path: '/reset-password/2', label: '비밀번호 재설정 2',  desc: '인증코드 입력' },
      { path: '/reset-password/3', label: '비밀번호 재설정 3',  desc: '새 비밀번호 설정' },
    ],
  },
  {
    group: '온보딩',
    pages: [
      { path: '/onboarding/1', label: '온보딩 1', desc: '진입 (INIT-001)' },
      { path: '/onboarding/2', label: '온보딩 2', desc: '초기 증상 서술 (INIT-002)' },
      { path: '/onboarding/3', label: '온보딩 3', desc: 'ASRS 체크리스트 (INIT-003)' },
      { path: '/onboarding/4', label: '온보딩 4', desc: '목표 설정 (INIT-004)' },
      { path: '/onboarding/5', label: '온보딩 5', desc: '키워드 추출 · 완료' },
    ],
  },
  {
    group: '홈',
    pages: [
      { path: '/home',          label: '홈 — 리스트',   desc: '주간 통계 · 오늘 할일' },
    ],
  },
  {
    group: '일지',
    pages: [
      { path: '/journal',          label: '일지 — 전체 그리드', desc: '감정 · 증상 · 수면 등' },
      { path: '/journal/timeline', label: '일지 — 타임라인',    desc: '시간대별 기록 스트림' },
      { path: '/journal/calendar', label: '일지 — 캘린더',      desc: '월간 달력 · 기간 조회' },
      { path: '/journal/tags',     label: '일지 — 태그 관리',   desc: '활성 · 비활성 태그' },
    ],
  },
  {
    group: '복약',
    pages: [
      { path: '/medication',         label: '복약 목록',    desc: '복용 중인 약 (MED-001)' },
      { path: '/medication/add',     label: '약 추가',      desc: '약 검색 · 알림 설정' },
      { path: '/medication/alarm',   label: '복용 알림',    desc: '잠금화면 알림 (MED-003)' },
      { path: '/medication/info',    label: '약 정보',      desc: '표준 정보 · 혈중농도' },
      { path: '/medication/history', label: '복용 이력',    desc: '기간별 복용률 (MED-004)' },
    ],
  },
  {
    group: '캘린더',
    pages: [
      { path: '/home/calendar', label: '홈 — 캘린더',   desc: '달력 + 타임라인' },
      { path: '/calendar',          label: '캘린더 메인',     desc: '월간 통합뷰 (CAL-001)' },
      { path: '/calendar/event',    label: '일정 상세',        desc: '이벤트 상세 보기' },
      { path: '/calendar/new',      label: '새 일정',          desc: '일정 추가 · 카테고리' },
      { path: '/calendar/external', label: '외부 캘린더',      desc: 'Google 캘린더 연동' },
    ],
  },
  {
    group: '리포트',
    pages: [
      { path: '/report',                label: '주간 리포트',    desc: '주간 대시보드 (ANL-001)' },
      { path: '/report/monthly',        label: '월별 목록',      desc: '리포트 목록 (ANL-003)' },
      { path: '/report/monthly/detail', label: '월별 상세',      desc: 'AI 인사이트 · 히트맵' },
    ],
  },
  {
    group: '상담',
    pages: [
      { path: '/counseling',         label: '상담 일정',     desc: '예정 · 지난 상담 목록' },
      { path: '/counseling/prepare', label: '상담 전 준비',  desc: '증상 · 용량 정리' },
      { path: '/counseling/result',  label: '상담 후 결과',  desc: '처방 변경 · 다음 일정' },
    ],
  },
  {
    group: '커뮤니티',
    pages: [
      { path: '/community/notice', label: '공지사항',    desc: 'BOARD-01' },
      { path: '/community',        label: '경험 공유',   desc: '피드 목록 BOARD-02' },
      { path: '/community/post',   label: '글 상세',     desc: '본문 + 댓글' },
      { path: '/community/write',  label: '글쓰기',      desc: '새 글 작성' },
    ],
  },
  {
    group: '빈 상태',
    pages: [
      { path: '/debug/empty/journal',          label: '일지 없음',        desc: '첫 진입 안내' },
      { path: '/debug/empty/medication',       label: '약 없음',          desc: '약 추가 유도' },
      { path: '/debug/empty/calendar',         label: '일정 없음',        desc: '오늘 일정 0개' },
      { path: '/debug/empty/report',           label: '리포트 데이터 부족', desc: '데이터 쌓기 유도' },
      { path: '/debug/empty/community-search', label: '검색 결과 없음',   desc: '커뮤니티 검색' },
    ],
  },
  {
    group: '설정',
    pages: [
      { path: '/settings',               label: '마이페이지',  desc: '프로필 · 앱 설정' },
      { path: '/settings/notifications', label: '알림 설정',   desc: '복약 · 상담 알림' },
      { path: '/settings/withdraw',      label: '회원 탈퇴',   desc: '탈퇴 확인 플로우' },
    ],
  },
];

export default function IndexPage() {
  return (
    <div
      className="min-h-screen bg-gray-50 px-4 pt-12 pb-16"
      style={{ fontFamily: 'NanumSquare, -apple-system, system-ui' }}
    >
      <h1 className="font-extrabold text-2xl text-gray-900 mb-0.5">Attune</h1>
      <p className="text-gray-400 text-xs mb-3">개발용 화면 목록</p>
      <Link
        to="/debug/overview"
        className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-full mb-6"
      >
        전체 화면 보기 →
      </Link>

      <div className="flex flex-col gap-6">
        {sections.map(({ group, pages }) => (
          <div key={group}>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
              {group}
            </div>
            <div className="flex flex-col gap-1">
              {pages.map(({ path, label, desc }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"
                >
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{label}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{desc}</div>
                  </div>
                  <div className="text-purple-400 text-lg font-light">›</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

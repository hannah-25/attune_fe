import { Link } from 'react-router';

type PageEntry = { path: string; label: string };
type Group = { num: string; group: string; pages: PageEntry[] };

const sections: Group[] = [
  {
    num: '⓪',
    group: '회원가입 · 인증',
    pages: [
      { path: '/splash',           label: 'Splash' },
      { path: '/signup',           label: '회원가입' },
      { path: '/verify-email',     label: '인증메일 발송' },
      { path: '/login',            label: '로그인' },
      { path: '/reset-password/1', label: '비밀번호 재설정 1' },
      { path: '/reset-password/2', label: '비밀번호 재설정 2' },
      { path: '/reset-password/3', label: '비밀번호 재설정 3' },
    ],
  },
  {
    num: '①',
    group: '온보딩',
    pages: [
      { path: '/onboarding/1', label: '온보딩 1' },
      { path: '/onboarding/2', label: '온보딩 2' },
      { path: '/onboarding/3', label: '온보딩 3' },
      { path: '/onboarding/4', label: '온보딩 4' },
      { path: '/onboarding/5', label: '온보딩 5' },
    ],
  },
  {
    num: '②',
    group: '홈',
    pages: [
      { path: '/home',          label: '홈 — 리스트' },
      { path: '/home/calendar', label: '홈 — 캘린더' },
    ],
  },
  {
    num: '③',
    group: '일지',
    pages: [
      { path: '/journal',          label: '일지 — 전체 그리드' },
      { path: '/journal/timeline', label: '일지 — 타임라인' },
      { path: '/journal/calendar', label: '일지 — 캘린더' },
      { path: '/journal/tags',     label: '일지 — 태그 관리' },
    ],
  },
  {
    num: '④',
    group: '복약',
    pages: [
      { path: '/medication',         label: '복약 목록' },
      { path: '/medication/add',     label: '약 추가' },
      { path: '/medication/alarm',   label: '복용 알림' },
      { path: '/medication/info',    label: '약 정보' },
      { path: '/medication/history', label: '복용 이력' },
    ],
  },
  {
    num: '⑤',
    group: '캘린더',
    pages: [
      { path: '/calendar',          label: '캘린더 메인' },
      { path: '/calendar/event',    label: '일정 상세' },
      { path: '/calendar/new',      label: '새 일정' },
      { path: '/calendar/external', label: '외부 캘린더' },
    ],
  },
  {
    num: '⑥',
    group: '리포트',
    pages: [
      { path: '/report',                label: '주간 리포트' },
      { path: '/report/monthly',        label: '월별 목록' },
      { path: '/report/monthly/detail', label: '월별 상세' },
    ],
  },
  {
    num: '⑦',
    group: '상담',
    pages: [
      { path: '/counseling',         label: '상담 일정' },
      { path: '/counseling/prepare', label: '상담 전 준비' },
      { path: '/counseling/result',  label: '상담 후 결과' },
    ],
  },
  {
    num: '⑧',
    group: '커뮤니티',
    pages: [
      { path: '/community/notice', label: '공지사항' },
      { path: '/community',        label: '경험 공유' },
      { path: '/community/post',   label: '글 상세' },
      { path: '/community/write',  label: '글쓰기' },
    ],
  },
  {
    num: '⑨',
    group: '빈 상태',
    pages: [
      { path: '/empty/journal',          label: '일지 없음' },
      { path: '/empty/medication',       label: '약 없음' },
      { path: '/empty/calendar',         label: '일정 없음' },
      { path: '/empty/report',           label: '리포트 데이터 부족' },
      { path: '/empty/community-search', label: '검색 결과 없음' },
    ],
  },
  {
    num: '⑩',
    group: '설정',
    pages: [
      { path: '/settings',               label: '마이페이지' },
      { path: '/settings/notifications', label: '알림 설정' },
      { path: '/settings/withdraw',      label: '회원 탈퇴' },
    ],
  },
];

const totalScreens = sections.reduce((sum, s) => sum + s.pages.length, 0);

function PhoneFrame({ path, label }: { path: string; label: string }) {
  return (
    <figure className="flex flex-col items-center shrink-0">
      <div className="relative w-[320px] h-[640px] overflow-hidden bg-gray-50 rounded-[2.75rem] shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px]">
        <iframe
          src={path}
          className="w-full h-full border-0"
          title={label}
        />
      </div>
      <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-[320px]">
        {label}
      </figcaption>
    </figure>
  );
}

export default function OverviewPage() {
  return (
    <div
      className="min-w-max px-12 pt-10 pb-24 bg-white"
      style={{ fontFamily: 'NanumSquare, -apple-system, system-ui' }}
    >
      <div className="flex flex-col justify-center mb-16 py-12 px-10 rounded-3xl bg-purple-50">
        <div className="font-semibold uppercase mb-3 text-purple-600 text-xs tracking-wider">
          attune · ADHD 관리 앱
        </div>
        <h1
          className="font-bold mb-5 text-5xl leading-tight tracking-tight text-gray-900"
          style={{ fontFamily: 'NanumSquare, system-ui' }}
        >
          화면 오버뷰
        </h1>
        <div className="flex gap-10 mb-8">
          <div>
            <div className="font-bold text-4xl mb-1 text-purple-600" style={{ fontFamily: 'NanumSquare, system-ui' }}>
              {sections.length}
            </div>
            <div className="text-gray-600 text-sm font-medium">섹션</div>
          </div>
          <div>
            <div className="font-bold text-4xl mb-1 text-purple-600" style={{ fontFamily: 'NanumSquare, system-ui' }}>
              {totalScreens}
            </div>
            <div className="text-gray-600 text-sm font-medium">화면</div>
          </div>
        </div>
        <Link to="/" className="self-start text-xs text-gray-500 underline">
          ← 링크 목록으로
        </Link>
      </div>

      <div className="flex flex-col gap-20">
        {sections.map(({ num, group, pages }) => (
          <section key={group}>
            <header className="flex items-start gap-4 mb-6 pb-5 border-b border-gray-200">
              <div
                className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-0"
                style={{ fontFamily: 'NanumSquare, system-ui' }}
              >
                {num}
              </div>
              <h2
                className="font-bold text-2xl tracking-tight leading-tight"
                style={{ fontFamily: 'NanumSquare, system-ui' }}
              >
                {group}
              </h2>
              <div className="self-start font-bold ml-auto whitespace-nowrap bg-white border border-gray-300 text-gray-500 text-xs py-1.5 px-3 shrink-0 rounded-full">
                {pages.length} screens
              </div>
            </header>
            <div className="flex gap-7">
              {pages.map(({ path, label }) => (
                <PhoneFrame key={path} path={path} label={label} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

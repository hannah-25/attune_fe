import React from 'react';

export function HeroSection() {
  return (
    <section className="flex flex-col justify-center mb-6 min-h-[720px] py-20 px-12 rounded-3xl bg-purple-100">
      <div className="font-semibold uppercase mb-4 text-purple-700 text-xs tracking-wider">
        attune · ADHD 관리 앱
      </div>
      <h1 className="font-bold mb-5 text-6xl leading-tight tracking-tight text-gray-900" style={{fontFamily:"NanumSquare, system-ui"}}>
        IA 와이어프레임
      </h1>
      <p className="mb-10 text-gray-700 text-xl leading-relaxed">
        전체 정보 구조 · 젤리/푸딩 무드 lo-fi · v2
      </p>
      <div className="flex mb-14 gap-12">
        <div>
          <div className="font-bold text-5xl mb-1 text-purple-600" style={{fontFamily:"NanumSquare, system-ui"}}>
            11
          </div>
          <div className="text-gray-600 text-base font-medium">섹션</div>
        </div>
        <div>
          <div className="font-bold text-5xl mb-1 text-purple-600" style={{fontFamily:"NanumSquare, system-ui"}}>
            41
          </div>
          <div className="text-gray-600 text-base font-medium">화면</div>
        </div>
        <div>
          <div className="font-bold text-5xl mb-1 text-purple-600" style={{fontFamily:"NanumSquare, system-ui"}}>
            2026.05
          </div>
          <div className="text-gray-600 text-base font-medium">작성일</div>
        </div>
      </div>
      <div className="grid grid-cols-2 font-medium bg-white/60 text-gray-800 text-base gap-3 gap-x-8 max-w-[720px] py-7 px-8 rounded-2xl shadow-sm">
        <div className="py-1">① 온보딩 · 회원가입</div>
        <div className="py-1">② 인증 · 로그인</div>
        <div className="py-1">③ 홈 · 대시보드 (변형 3종)</div>
        <div className="py-1">④ 일지 — 태그 체크 (변형 3종)</div>
        <div className="py-1">⑤ 복약 관리</div>
        <div className="py-1">⑥ 캘린더 · 일정</div>
        <div className="py-1">⑦ 리포트 · 인사이트</div>
        <div className="py-1">⑧ 상담 기록</div>
        <div className="py-1">⑨ 커뮤니티 · 공지</div>
        <div className="py-1">⑩ 빈 상태 (Empty States)</div>
        <div className="py-1 col-span-2">⑪ 마이 · 설정</div>
      </div>
    </section>
  );
}

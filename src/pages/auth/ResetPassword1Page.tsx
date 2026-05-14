import React from 'react';

export default function ResetPassword1Page() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
          <div className="items-center flex justify-between relative">
            <button className="items-center flex justify-center w-11 h-11 text-gray-700 rounded-xl hover:bg-white/60 transition-colors" aria-label="이전 화면">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18L9 12L15 6" /></svg>
            </button>
            <div className="absolute left-[50%] translate-x-[-50%] font-bold text-sm">비밀번호 재설정</div>
            <div className="w-11 h-11" />
          </div>
        </div>
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-16 pr-5 pb-4 pl-5">
          <p className="text-gray-600 text-xs leading-relaxed">가입 시 등록한 이메일로 비밀번호 재설정 링크를 보내드립니다.</p>
          <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 mt-5">
            <label className="font-semibold text-gray-500 text-[11px] leading-tight">이메일</label>
            <input type="email" placeholder="email@example.com" className="w-full h-6 bg-transparent text-gray-900 text-sm placeholder:text-gray-400 outline-none p-0" />
          </div>
          <button className="items-center flex font-bold justify-center w-full h-[46px] mt-5 bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl">
            재설정 링크 보내기
          </button>
        </div>
      </div>
    </div>
  );
}

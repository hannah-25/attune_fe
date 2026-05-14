import React from 'react';

export default function ResetPassword2Page() {
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
          <div className="items-center flex flex-col text-center">
            <div className="items-center flex justify-center w-16 h-16 text-purple-600">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16v12H4z" /><path d="M4 7l8 6l8-6" /></svg>
            </div>
            <div className="font-semibold text-gray-900 text-base leading-tight mt-5">재설정 링크가 발송되었습니다.</div>
            <div className="text-gray-500 text-sm leading-tight mt-2">name@example.com</div>
          </div>
          <div className="items-center flex flex-col text-center mt-6 text-xs leading-relaxed">
            <div className="text-gray-600">재설정 메일을 받지 못하셨나요?</div>
            <button className="font-bold text-purple-700 underline mt-1">재설정 메일 재발송</button>
          </div>
        </div>
      </div>
    </div>
  );
}

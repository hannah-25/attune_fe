import React from 'react';
import { TopBar } from '../../app/components/TopBar';

export default function SignupPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="회원가입" centered showBack />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-5 pr-5 pb-4 pl-5">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
              <label className="font-semibold text-gray-500 text-[11px] leading-tight">이메일</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full h-6 bg-transparent text-gray-900 text-sm placeholder:text-gray-400 outline-none p-0"
              />
            </div>
            <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
              <label className="font-semibold text-gray-500 text-[11px] leading-tight">비밀번호</label>
              <div className="items-center flex w-full h-6">
                <input
                  type="password"
                  placeholder="8자 이상"
                  className="grow h-full bg-transparent text-gray-900 text-sm placeholder:text-gray-400 outline-none p-0 basis-[0%]"
                />
                <button className="font-medium text-gray-500 text-xs pl-3 shrink-[0]">
                  보기
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
              <label className="font-semibold text-gray-500 text-[11px] leading-tight">닉네임</label>
              <input
                type="text"
                placeholder="어떻게 불러드릴까요?"
                className="w-full h-6 bg-transparent text-gray-900 text-sm placeholder:text-gray-400 outline-none p-0"
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="items-start flex gap-2 mb-1.5">
              <div className="items-center flex justify-center w-4 h-4 bg-purple-500 rounded shrink-[0] mt-0.5">
                <div className="overflow-hidden w-2.5 h-2.5">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff65a7410da47c5d2b396b5d6f7c374acd3be6f7e.svg?generation=1778677413507571&alt=media" className="block size-full" />
                </div>
              </div>
              <div className="text-xs leading-relaxed"><span className="underline">이용약관</span>, <span className="underline">개인정보처리방침</span>에 모두 동의합니다. (필수)</div>
            </div>
            <div className="items-start flex gap-2">
              <div className="items-center flex justify-center w-4 h-4 border-gray-400 border rounded shrink-[0] mt-0.5"></div>
              <div className="text-gray-600 text-xs leading-relaxed"><span className="underline">마케팅 정보 수신</span>에 동의합니다. (선택)</div>
            </div>
          </div>
          <div className="items-center flex font-bold justify-center w-full h-[46px] bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 mt-5 pt-0 pr-5 pb-0 pl-5 rounded-xl">
            <span className="block">회원가입</span>
          </div>
          <div className="mt-8">
            <div className="items-center flex gap-2">
              <div className="grow h-px bg-purple-50 basis-[0%]"></div>
              <div className="text-gray-500 text-xs">
                소셜 계정으로
              </div>
              <div className="grow h-px bg-purple-50 basis-[0%]"></div>
            </div>
            <div className="flex justify-center gap-4 mt-3">
              <button className="items-center flex justify-center w-10 h-10 bg-white border border-gray-300 rounded-full shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button className="items-center flex justify-center w-10 h-10 bg-black rounded-full">
                <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </button>
              <button className="items-center flex justify-center w-10 h-10 rounded-full" style={{backgroundColor: '#FEE500'}}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="rgba(0,0,0,0.9)">
                  <path d="M12 3C6.5 3 2 6.58 2 11c0 2.5 1.5 4.74 3.87 6.17-.2.77-.77 2.83-.88 3.27-.13.52.18.51.38.37.15-.11 2.42-1.58 3.4-2.23C9.85 18.75 10.9 19 12 19c5.5 0 10-3.58 10-8s-4.5-8-10-8z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

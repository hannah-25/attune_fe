import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopBar } from '../../app/components/TopBar';

export default function ResetPassword3Page() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="새 비밀번호 설정" centered showBack />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-16 pr-5 pb-4 pl-5">
          <p className="text-gray-600 text-xs leading-relaxed">새로 사용할 비밀번호를 입력해주세요.</p>
          <div className="flex flex-col gap-2.5 mt-5">
            <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
              <label className="font-semibold text-gray-500 text-[11px] leading-tight">새 비밀번호</label>
              <div className="items-center flex w-full h-6">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="grow h-full bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0 basis-[0%]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="font-medium text-gray-500 text-xs pl-3 shrink-0"
                >
                  {showPassword ? '숨기기' : '보기'}
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
              <label className="font-semibold text-gray-500 text-[11px] leading-tight">비밀번호 확인</label>
              <div className="items-center flex w-full h-6">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 입력"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="grow h-full bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0 basis-[0%]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="font-medium text-gray-500 text-xs pl-3 shrink-0"
                >
                  {showConfirm ? '숨기기' : '보기'}
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="items-center flex font-bold justify-center w-full h-[46px] mt-6 bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl select-none transition-all active:scale-[0.97] active:bg-black"
          >
            비밀번호 변경하기
          </button>
        </div>
      </div>
    </div>
  );
}

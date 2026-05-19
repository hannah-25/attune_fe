import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { verifyEmail } from '../../app/api/auth';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? 'name@example.com';
  const token = searchParams.get('token');
  const [status, setStatus] = useState(token ? '인증을 확인하고 있습니다.' : '인증 메일이 발송되었습니다.');

  useEffect(() => {
    if (!token) return;

    let ignore = false;

    verifyEmail(token)
      .then(() => {
        if (!ignore) setStatus('메일 인증이 완료되었습니다.');
      })
      .catch(() => {
        if (!ignore) setStatus('메일 인증에 실패했습니다. 링크를 다시 확인해주세요.');
      });

    return () => {
      ignore = true;
    };
  }, [token]);

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="메일 인증" centered showBack />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-16 pr-5 pb-4 pl-5">
          <div className="items-center flex flex-col text-center">
            <div className="items-center flex justify-center w-16 h-16 text-purple-600">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16v12H4z" />
                <path d="M4 7l8 6l8-6" />
              </svg>
            </div>
            <div className="font-semibold text-gray-900 text-base leading-tight mt-5">{status}</div>
            <div className="text-gray-500 text-sm leading-tight mt-2">{email}</div>
          </div>
          <div className="items-center flex flex-col text-center mt-6 text-xs leading-relaxed">
            <div className="text-gray-600">인증메일을 받지 못하셨나요?</div>
            <button className="font-bold text-purple-700 underline mt-1">인증메일 재발송</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { login } from '../../app/api/auth';
import { ApiError, setAccessToken } from '../../app/api/client';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      const { accessToken } = await login({ email: email.trim(), password });
      setAccessToken(accessToken);
      navigate('/home');
    } catch (err) {
      setError(err instanceof ApiError && err.backendMessage ? err.backendMessage : '로그인에 실패했습니다. 입력한 정보를 확인해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="로그인" centered showBack />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-16 pr-5 pb-4 pl-5">
          <div className="flex flex-col gap-2.5">
            <TextField label="이메일" value={email} onChange={setEmail} placeholder="name@example.com" type="email" />
            <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
              <label className="font-semibold text-gray-500 text-[11px] leading-tight">비밀번호</label>
              <div className="items-center flex w-full h-6">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="grow h-full bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0 basis-[0%]"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="font-medium text-gray-500 text-xs pl-3 shrink-[0]">
                  {showPassword ? '숨기기' : '보기'}
                </button>
              </div>
            </div>
          </div>
          <div className="items-center flex gap-2 mt-4 px-1 text-xs">
            <button type="button" onClick={() => setAutoLogin((v) => !v)} className={`items-center flex justify-center w-4 h-4 rounded shrink-[0] transition-colors ${autoLogin ? 'bg-purple-500' : 'border border-gray-300 bg-white'}`}>
              {autoLogin ? <Check className="w-3 h-3 text-white" strokeWidth={3} /> : null}
            </button>
            <button type="button" onClick={() => setAutoLogin((v) => !v)}>자동 로그인</button>
            <div className="grow basis-[0%]"></div>
            <button type="button" onClick={() => navigate('/reset-password/1')} className="font-medium underline text-gray-600 whitespace-nowrap">
              비밀번호 찾기
            </button>
          </div>
          {error ? <div className="text-red-500 text-xs mt-3 px-1">{error}</div> : null}
          <button type="button" onClick={handleLogin} disabled={isSubmitting} className="items-center flex font-bold justify-center w-full h-[46px] mt-6 bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl disabled:opacity-60">
            <span className="block">{isSubmitting ? '로그인 중...' : '로그인'}</span>
          </button>
          <div className="text-center text-gray-600 mt-4">
            <span className="text-center">계정이 없으신가요? </span>
            <button type="button" onClick={() => navigate('/signup')} className="font-bold text-center text-gray-900">가입하기</button>
          </div>
          <div className="items-center flex mt-8 gap-2">
            <div className="grow h-px bg-purple-50 basis-[0%]"></div>
            <div className="text-gray-500 text-xs">소셜 계정으로</div>
            <div className="grow h-px bg-purple-50 basis-[0%]"></div>
          </div>
          <div className="flex justify-center gap-4 mt-3">
            <SocialButton label="G" className="bg-white border border-gray-300 text-blue-600" />
            <SocialButton label="A" className="bg-black text-white" />
            <SocialButton label="K" className="text-gray-900" style={{ backgroundColor: '#FEE500' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TextField({ label, onChange, placeholder, type = 'text', value }: { label: string; onChange: (value: string) => void; placeholder: string; type?: string; value: string }) {
  return (
    <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
      <label className="font-semibold text-gray-500 text-[11px] leading-tight">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-6 bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0" />
    </div>
  );
}

function SocialButton({ className, label, style }: { className?: string; label: string; style?: React.CSSProperties }) {
  return <button type="button" className={`items-center flex justify-center w-10 h-10 rounded-full shadow-sm font-extrabold ${className ?? ''}`} style={style}>{label}</button>;
}

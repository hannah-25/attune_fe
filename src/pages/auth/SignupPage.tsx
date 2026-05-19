import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TopBar } from '../../app/components/TopBar';

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="회원가입" centered showBack />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-5 pr-5 pb-4 pl-5">
          <div className="flex flex-col gap-2.5">
            <TextField label="이메일" value={email} onChange={setEmail} placeholder="name@example.com" type="email" />
            <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
              <label className="font-semibold text-gray-500 text-[11px] leading-tight">비밀번호</label>
              <div className="items-center flex w-full h-6">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8자 이상"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="grow h-full bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0 basis-[0%]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="font-medium text-gray-500 text-xs pl-3 shrink-[0]"
                >
                  {showPassword ? '숨기기' : '보기'}
                </button>
              </div>
            </div>
            <TextField
              label="닉네임"
              value={nickname}
              onChange={setNickname}
              placeholder="어떻게 불러드릴까요?"
            />
          </div>
          <div className="mt-5">
            <Agreement
              checked={agreeTerms}
              onClick={() => setAgreeTerms((v) => !v)}
              text={<><span className="underline">이용약관</span>, <span className="underline">개인정보 처리방침</span>에 모두 동의합니다. (필수)</>}
            />
            <Agreement
              checked={agreeMarketing}
              onClick={() => setAgreeMarketing((v) => !v)}
              muted
              text={<><span className="underline">마케팅 정보 수신</span>에 동의합니다. (선택)</>}
            />
          </div>
          <button
            type="button"
            onClick={() => navigate('/verify-email')}
            className="items-center flex font-bold justify-center w-full h-[46px] bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 mt-5 pt-0 pr-5 pb-0 pl-5 rounded-xl"
          >
            <span className="block">회원가입</span>
          </button>
          <div className="mt-8">
            <div className="items-center flex gap-2">
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
    </div>
  );
}

function TextField({
  label,
  onChange,
  placeholder,
  type = 'text',
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
  return (
    <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
      <label className="font-semibold text-gray-500 text-[11px] leading-tight">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-6 bg-transparent text-gray-900 text-base placeholder:text-gray-400 outline-none p-0"
      />
    </div>
  );
}

function Agreement({
  checked,
  muted = false,
  onClick,
  text,
}: {
  checked: boolean;
  muted?: boolean;
  onClick: () => void;
  text: React.ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} className="items-start flex gap-2 mb-1.5 w-full text-left">
      <span className={`items-center flex justify-center w-4 h-4 rounded shrink-[0] mt-0.5 transition-colors ${checked ? 'bg-purple-500' : 'border border-gray-300 bg-white'}`}>
        {checked ? <Check className="w-3 h-3 text-white" strokeWidth={3} /> : null}
      </span>
      <span className={`${muted ? 'text-gray-600' : ''} text-xs leading-relaxed`}>{text}</span>
    </button>
  );
}

function SocialButton({ className, label, style }: { className?: string; label: string; style?: React.CSSProperties }) {
  return (
    <button
      type="button"
      className={`items-center flex justify-center w-10 h-10 rounded-full shadow-sm font-extrabold ${className ?? ''}`}
      style={style}
      aria-label={`${label} 계정으로 가입`}
    >
      {label}
    </button>
  );
}

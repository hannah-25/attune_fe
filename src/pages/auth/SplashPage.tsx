import React from 'react';
import { useNavigate } from 'react-router';
import logoImage from '../../assets/logo_with_brand.png';

export default function SplashPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-dvh min-h-dvh w-full flex-col overflow-hidden bg-purple-100 text-sm"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="items-center flex flex-col grow min-h-0 overflow-y-auto overscroll-contain justify-center basis-[0%] px-7 py-8">
          <div className="flex items-center justify-center w-36 h-36 mb-5">
            <img src={logoImage} alt="a.tune" className="w-full h-full object-contain" />
          </div>
          <p className="text-center text-gray-700 text-base leading-relaxed">
            하루의 작은 변화를<br />함께 살펴봐요
          </p>
          <div className="flex flex-col w-full mt-10 gap-2.5">
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="flex items-center font-semibold justify-center w-full h-[52px] bg-gray-900 text-white text-base rounded-xl select-none transition-all active:scale-[0.97] active:bg-black"
            >
              시작하기
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="flex items-center font-medium justify-center w-full h-[52px] border border-gray-300 bg-white/50 text-gray-800 text-base rounded-xl select-none transition-all active:scale-[0.97] active:bg-white/80"
            >
              이미 계정이 있어요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

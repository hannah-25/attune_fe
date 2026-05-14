import React from 'react';
import logoImage from '../../imports/logo_with_brand.png';

export default function SplashPage() {
  return (
    <div
      className="w-full h-dvh bg-purple-100  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-1 pt-1 pr-3 pb-2.5 pl-3 shrink-[0]">
          <div className="items-center flex justify-between">
            <div className="font-bold text-sm"></div>
          </div>
        </div>
        <div className="items-center flex flex-col grow min-h-0 overflow-y-auto overscroll-contain justify-center basis-[0%] pt-0 pr-7 pb-20 pl-7">
          <div className="flex items-center justify-center w-36 h-36 mb-5">
            <img src={logoImage} alt="a.tune" className="w-full h-full object-contain" />
          </div>
          <p className="text-center text-gray-700 text-base leading-relaxed">
            하루의 작은 변화를<br />함께 살펴봐요
          </p>
          <div className="flex flex-col w-full mt-10 gap-2.5">
            <button className="flex items-center font-semibold justify-center w-full h-[52px] bg-gray-900 hover:bg-black shadow-sm text-white text-base rounded-xl transition-colors">
              시작하기
            </button>
            <button className="flex items-center font-medium justify-center w-full h-[52px] border border-gray-300 hover:border-gray-500 bg-white/50 text-gray-800 text-base rounded-xl transition-colors">
              이미 계정이 있어요
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

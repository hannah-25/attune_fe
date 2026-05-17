import React from 'react';
import emotionImage from '@src/assets/emotion7.png';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';

const withdrawIcon =
  '/icons/f0071d92959cfc25f75d6812bbca366b70c646d6.svg';

export default function WithdrawPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar left={<HeaderIconButton src={withdrawIcon} />} title="회원 탈퇴" centered />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-5 pt-3 pr-5 pb-8 pl-5">
          <div className="flex items-center justify-center text-center pt-1 pr-0 pb-1 pl-0">
            <div className="w-36 h-36">
              <img src={emotionImage} alt="" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{ fontFamily: "NanumSquare, system-ui" }}>
            <span className="text-center">정말 떠나시겠어요?</span>
          </div>
          <div className="text-center text-gray-500 leading-normal">
            <span className="text-center">탈퇴 신청 후 </span><b className="font-bold text-center text-gray-900">
              <span className="text-center">30일간 유예 기간</span>
            </b><span className="text-center">이 있어요.</span><br /><span className="text-center">그 동안 로그인하시면 취소할 수 있습니다.</span>
          </div>
          <div className="bg-red-50 border border-red-100 shadow-[rgba(120,40,40,0.05)_0px_4px_14px_0px,_rgba(120,40,40,0.03)_0px_1px_2px_0px] py-5 px-4 rounded-[1.125rem]">
            <div className="font-bold mb-4">
              30일 후 영구 삭제되는 데이터
            </div>
            <div className="items-center flex gap-2 pt-0.5 pr-0 pb-0.5 pl-0">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img src="/icons/c460d2c73592531244b61e7d56a7112129bedd62.svg" className="block size-full" />
              </div>
              일지 기록 124일
            </div>
            <div className="items-center flex gap-2 pt-0.5 pr-0 pb-0.5 pl-0">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img src="/icons/b091304ee94d3e52b975b766b759b2207cca40d9.svg" className="block size-full" />
              </div>
              복약 이력
            </div>
            <div className="items-center flex gap-2 pt-0.5 pr-0 pb-0.5 pl-0">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img src="/icons/6f9f8c12f586975632499459c96fac7e341d3bea.svg" className="block size-full" />
              </div>
              상담 기록
            </div>
            <div className="items-center flex gap-2 pt-0.5 pr-0 pb-0.5 pl-0">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img src="/icons/8d9dca6db5d2799d20a5f82e023f2b31e0dc72c9.svg" className="block size-full" />
              </div>
              리포트 12개
            </div>
            <div className="items-center flex gap-2 pt-0.5 pr-0 pb-0.5 pl-0">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img src="/icons/9c26572832e754b60b7ceda5c1f00cfd1aa4d4cd.svg" className="block size-full" />
              </div>
              커뮤니티 글·댓글
            </div>
          </div>
          <div className="grow basis-[0%]"></div>
          <div className="px-1 pt-1 text-gray-900 text-sm font-bold leading-normal">
            안전한 탈퇴 신청을 위해 비밀번호를 다시 확인해 주세요.
          </div>
          <input
            id="withdraw-password"
            type="password"
            autoComplete="current-password"
            placeholder="현재 비밀번호"
            aria-label="현재 비밀번호"
            className="w-full h-[80px] bg-white border border-gray-200 text-gray-900 text-base placeholder:text-gray-300 px-5 py-4 rounded-[1.125rem] outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
          <div className="items-center flex font-bold justify-center w-full h-[50px] bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
            <span className="block">계속 사용하기</span>
          </div>
          <div className="items-center flex font-bold justify-center w-full h-11 bg-transparent text-red-700 tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.375rem]">
            <span className="block">탈퇴 신청</span>
          </div>
        </div>
      </div>
    </div>
  );
}

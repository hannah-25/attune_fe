import React from 'react';
import logoImage from '@src/imports/logo.png';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';

const withdrawIcon =
  'https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff0071d92959cfc25f75d6812bbca366b70c646d6.svg?generation=1778677419926051&alt=media';

export default function WithdrawPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar left={<HeaderIconButton src={withdrawIcon} />} title="회원 탈퇴" />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-2 pr-5 pb-6 pl-5">
          <div className="flex items-center justify-center text-center pt-3 pr-0 pb-3 pl-0">
            <div className="w-20 h-20">
              <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
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
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
            <div className="font-bold mb-2">
              30일 후 영구 삭제되는 데이터
            </div>
            <div className="items-center flex gap-2 pt-1 pr-0 pb-1 pl-0">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc460d2c73592531244b61e7d56a7112129bedd62.svg?generation=1778677419957051&amp;alt=media" className="block size-full" />
              </div>
              일지 기록 124일
            </div>
            <div className="items-center flex gap-2 pt-1 pr-0 pb-1 pl-0">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb091304ee94d3e52b975b766b759b2207cca40d9.svg?generation=1778677419985507&amp;alt=media" className="block size-full" />
              </div>
              복약 이력
            </div>
            <div className="items-center flex gap-2 pt-1 pr-0 pb-1 pl-0">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6f9f8c12f586975632499459c96fac7e341d3bea.svg?generation=1778677419982095&amp;alt=media" className="block size-full" />
              </div>
              상담 기록
            </div>
            <div className="items-center flex gap-2 pt-1 pr-0 pb-1 pl-0">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F8d9dca6db5d2799d20a5f82e023f2b31e0dc72c9.svg?generation=1778677419995674&amp;alt=media" className="block size-full" />
              </div>
              리포트 12개
            </div>
            <div className="items-center flex gap-2 pt-1 pr-0 pb-1 pl-0">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9c26572832e754b60b7ceda5c1f00cfd1aa4d4cd.svg?generation=1778677420041932&amp;alt=media" className="block size-full" />
              </div>
              커뮤니티 글·댓글
            </div>
          </div>
          <div className="grow basis-[0%]"></div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[0.875rem]">
            <div className="mb-1 text-gray-600 text-xs">
              본인 확인 · 비밀번호
            </div>
            <div className="w-[35%] h-2 bg-purple-50 rounded-lg"></div>
          </div>
          <div className="items-center flex font-bold justify-center w-full h-[50px] bg-red-500 shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
            <span className="block">탈퇴 신청</span>
          </div>
          <div className="items-center flex font-bold justify-center w-full h-[50px] border-gray-900 border text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
            <span className="block">계속 사용하기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

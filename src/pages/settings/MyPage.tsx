import React, { useState } from 'react';
import logoImage from '@src/assets/logo.png';
import { Camera, Check, Pencil, Settings, X } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';

export default function MyPage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nickname, setNickname] = useState('봄날의 햇살');
  const [draftNickname, setDraftNickname] = useState(nickname);

  const startProfileEdit = () => {
    setDraftNickname(nickname);
    setIsEditingProfile(true);
  };

  const saveProfile = () => {
    const nextNickname = draftNickname.trim();
    if (nextNickname) {
      setNickname(nextNickname);
    }
    setIsEditingProfile(false);
  };

  const cancelProfileEdit = () => {
    setDraftNickname(nickname);
    setIsEditingProfile(false);
  };

  return (
    <div
      className="w-full h-dvh bg-gray-100  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="" right={<HeaderIconButton icon={<Settings className="h-4 w-4 text-gray-700" strokeWidth={2.35} />} />} />
        <ScrollArea>
          <div className="text-center pt-1 pr-0 pb-5 pl-0">
            <button
              type="button"
              aria-label={isEditingProfile ? "프로필 사진 변경" : "프로필 편집"}
              onClick={() => {
                if (!isEditingProfile) {
                  startProfileEdit();
                }
              }}
              className="inline-block relative text-center cursor-pointer bg-transparent border-0 p-0"
              style={{ textDecoration: "none" }}
            >
              <div className="flex items-center justify-center text-center w-24 h-24">
                <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
              </div>
              <div className="items-center flex justify-center absolute text-center w-7 h-7 right-[-4px] bottom-[-2px] bg-white shadow-[rgba(0,0,0,0.12)_0px_2px_6px_0px] ring-1 ring-gray-200 rounded-[0.875rem]">
                {isEditingProfile ? (
                  <Camera className="w-3.5 h-3.5 text-gray-500" strokeWidth={2.25} aria-hidden="true" />
                ) : (
                  <Pencil className="w-3.5 h-3.5 text-gray-500" strokeWidth={2.25} aria-hidden="true" />
                )}
              </div>
            </button>
            {isEditingProfile ? (
              <div className="flex items-center justify-center mt-3 gap-1.5">
                <input
                  type="text"
                  value={draftNickname}
                  onChange={(event) => setDraftNickname(event.target.value)}
                  className="w-[150px] h-10 bg-white border border-purple-200 shadow-[rgba(60,40,90,0.05)_0px_2px_8px_0px] text-center text-lg font-extrabold px-3 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                  style={{ fontFamily: "NanumSquare, system-ui" }}
                  aria-label="닉네임"
                />
                <button
                  type="button"
                  onClick={cancelProfileEdit}
                  className="items-center flex justify-center w-9 h-9 bg-white border border-gray-200 text-gray-500 shadow-[rgba(60,40,90,0.05)_0px_2px_8px_0px] rounded-full"
                  aria-label="프로필 편집 취소"
                >
                  <X className="w-4 h-4" strokeWidth={2.25} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={saveProfile}
                  className="items-center flex justify-center w-9 h-9 bg-purple-500 text-white shadow-[rgba(60,40,90,0.12)_0px_3px_10px_0px] rounded-full"
                  aria-label="프로필 저장"
                >
                  <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="font-extrabold text-center mt-3 text-2xl" style={{ fontFamily: "NanumSquare, system-ui" }}>
                <span className="text-center">{nickname}</span>
              </div>
            )}
            <div className="text-center mt-[2px] text-gray-600">
              <span className="text-center">main@gmail.com</span>
            </div>
            <div className="flex justify-center text-center mt-3 gap-1.5">
              <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                <span className="block text-center">attune 14주차</span>
              </div>
              <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                <span className="block text-center">기록 124일</span>
              </div>
            </div>
          </div>
          <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">
            계정
          </div>
          <div className="mb-3 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">소셜 연동</div>
              <div className="mr-[6px] text-gray-600">Google · Apple</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/c0a58c33a30355f92e7fdab0f9ccc4392a805826.svg" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="grow font-semibold basis-[0%]">비밀번호 변경</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/0aa4a2e0b7d87abb8b58243397c841250589ff6a.svg" className="block size-full" />
              </div>
            </div>
          </div>
          <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">
            설정
          </div>
          <div className="mb-3 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">알림</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/f95f43ee67a6cbe2ddde07b8c0f9b11d04de3472.svg" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">캘린더 연동</div>
              <div className="mr-[6px] text-gray-600">1개 연결</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/d82b1cd67593c712819bf46f1ea27540e6fcc4fa.svg" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">언어</div>
              <div className="mr-[6px] text-gray-600">한국어</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/7ad41aeccb05f20326923b45b6820530fbc7336f.svg" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="grow font-semibold basis-[0%]">테마</div>
              <div className="mr-[6px] text-gray-600">자동</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/3fe6afd6a71e7f6750adb88bd9610e2093246a1f.svg" className="block size-full" />
              </div>
            </div>
          </div>
          <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">
            지원
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">공지사항</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/7fc69f72966fe4f025aab0ddacf3c27f7e066dc2.svg" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">문의하기</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/5061bb77ab260e10fa693ee1c9a877a05563a33d.svg" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="grow font-semibold basis-[0%]">로그아웃</div>
            </div>
          </div>
          <button
            type="button"
            className="block mt-3 ml-1 bg-transparent border-0 p-0 text-xs font-medium text-gray-400 underline underline-offset-2"
          >
            회원 탈퇴
          </button>
        </ScrollArea>
        <TabBar />
      </div>
    </div>
  );
}

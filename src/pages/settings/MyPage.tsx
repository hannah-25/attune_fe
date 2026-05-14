import React from 'react';
import logoImage from '@src/imports/logo.png';
import { TabBar } from '@/components/TabBar';

export default function MyPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-100  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
          <div className="items-center flex justify-between">
            <div className="font-bold text-sm"></div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F3ee2c90fb8f924ced4748922d30e751a3ae3ffdd.svg?generation=1778677419532828&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-[100px] pl-4">
          <div className="text-center pt-1 pr-0 pb-5 pl-0">
            <div className="inline-block relative text-center" style={{ textDecoration: "none" }}>
              <div className="flex items-center justify-center text-center w-24 h-24">
                <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
              </div>
              <div className="items-center flex justify-center absolute text-center w-7 h-7 right-[-4px] bottom-[-2px] bg-white shadow-[rgba(0,0,0,0.1)_0px_2px_6px_0px] rounded-[0.875rem]">
                <div className="overflow-hidden text-center w-3 h-3">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc07db98ae24847912ff0ceb2a2386acca98f180d.svg?generation=1778677419550599&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-extrabold text-center mt-3 text-2xl" style={{ fontFamily: "NanumSquare, system-ui" }}>
              <span className="text-center">봄날의햇살</span>
            </div>
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
              <div className="grow font-semibold basis-[0%]">프로필 수정</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F56e87330bfd7b831c9357a94f078bc353a973f2d.svg?generation=1778677419591051&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">소셜 연동</div>
              <div className="mr-[6px] text-gray-600">Google · Apple</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc0a58c33a30355f92e7fdab0f9ccc4392a805826.svg?generation=1778677419588208&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="grow font-semibold basis-[0%]">비밀번호 변경</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0aa4a2e0b7d87abb8b58243397c841250589ff6a.svg?generation=1778677419595217&amp;alt=media" className="block size-full" />
              </div>
            </div>
          </div>
          <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">
            설정
          </div>
          <div className="mb-3 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">알림</div>
              <div className="mr-[6px] text-gray-600">복용·리포트</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff95f43ee67a6cbe2ddde07b8c0f9b11d04de3472.svg?generation=1778677419625273&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">캘린더 연동</div>
              <div className="mr-[6px] text-gray-600">1개 연결</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd82b1cd67593c712819bf46f1ea27540e6fcc4fa.svg?generation=1778677419644582&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">언어</div>
              <div className="mr-[6px] text-gray-600">한국어</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F7ad41aeccb05f20326923b45b6820530fbc7336f.svg?generation=1778677419648963&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="grow font-semibold basis-[0%]">테마</div>
              <div className="mr-[6px] text-gray-600">자동</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F3fe6afd6a71e7f6750adb88bd9610e2093246a1f.svg?generation=1778677419722547&amp;alt=media" className="block size-full" />
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
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F7fc69f72966fe4f025aab0ddacf3c27f7e066dc2.svg?generation=1778677419683750&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">문의하기</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F5061bb77ab260e10fa693ee1c9a877a05563a33d.svg?generation=1778677419722542&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">이용약관</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb0a0a8889758f34e4d6f165c0d823bda195d224f.svg?generation=1778677419745312&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow font-semibold basis-[0%]">로그아웃</div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="grow font-semibold text-red-500 basis-[0%]">회원 탈퇴</div>
            </div>
          </div>
        </div>
        <TabBar />
      </div>
    </div>
  );
}

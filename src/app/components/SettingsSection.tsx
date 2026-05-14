import React from 'react';
import logoImage from '../../imports/logo.png';
import { TabBar } from './TabBar';

export function SettingsSection() {
  return (
    <section className="pt-1 pr-0 pb-0 pl-0">
      <header className="items-start flex mb-4 gap-4 pt-0 pr-1 pb-5 pl-1 border-b" style={{"borderBottomColor":"var(--gray-400)"}}>
        <div className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-[0]" style={{"fontFamily":"NanumSquare, system-ui"}}>⑪</div>
        <div>
          <h2 className="font-bold mb-1 text-2xl tracking-tight leading-tight" style={{"fontFamily":"NanumSquare, system-ui"}}>마이 · 설정</h2>
          <p className="text-gray-600 text-xs leading-tight">REQ-ACC-04~06 · 프로필 · 알림 · 탈퇴</p>
        </div>
        <div className="self-start font-bold ml-auto whitespace-nowrap bg-gray-50 border-gray-400 border text-gray-500 text-xs pt-1.5 pr-3 pb-1.5 pl-3 shrink-[0] rounded-full">3 screens</div>
      </header>
      <div className="grid justify-center gap-6 gap-x-7" style={{"gridTemplateColumns":"repeat(3, 320px)"}}>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 1 / 2 / 2"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-100 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0f42be03435f12b61f3e88853b3be14666eed50f.svg?generation=1778677419477241&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6034c1cc49f1d34cbdbf44114c7b83a2d90078e5.svg?generation=1778677419531875&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
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
                    <div className="inline-block relative text-center" style={{"textDecoration":"none"}}>
                      <div className="flex items-center justify-center text-center w-24 h-24">
                        <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
                      </div>
                      <div className="items-center flex justify-center absolute text-center w-7 h-7 right-[-4px] bottom-[-2px] bg-white shadow-[rgba(0,0,0,0.1)_0px_2px_6px_0px] rounded-[0.875rem]">
                        <div className="overflow-hidden text-center w-3 h-3">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc07db98ae24847912ff0ceb2a2386acca98f180d.svg?generation=1778677419550599&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-extrabold text-center mt-3 text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
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
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="grow font-semibold basis-[0%]">프로필 수정</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F56e87330bfd7b831c9357a94f078bc353a973f2d.svg?generation=1778677419591051&amp;alt=media" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
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
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="grow font-semibold basis-[0%]">알림</div>
                      <div className="mr-[6px] text-gray-600">복용·리포트</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff95f43ee67a6cbe2ddde07b8c0f9b11d04de3472.svg?generation=1778677419625273&amp;alt=media" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="grow font-semibold basis-[0%]">캘린더 연동</div>
                      <div className="mr-[6px] text-gray-600">1개 연결</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd82b1cd67593c712819bf46f1ea27540e6fcc4fa.svg?generation=1778677419644582&amp;alt=media" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
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
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="grow font-semibold basis-[0%]">공지사항</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F7fc69f72966fe4f025aab0ddacf3c27f7e066dc2.svg?generation=1778677419683750&amp;alt=media" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="grow font-semibold basis-[0%]">문의하기</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F5061bb77ab260e10fa693ee1c9a877a05563a33d.svg?generation=1778677419722542&amp;alt=media" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="grow font-semibold basis-[0%]">이용약관</div>
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb0a0a8889758f34e4d6f165c0d823bda195d224f.svg?generation=1778677419745312&amp;alt=media" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                      <div className="grow font-semibold basis-[0%]">로그아웃</div>
                    </div>
                    <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
                      <div className="grow font-semibold text-red-500 basis-[0%]">회원 탈퇴</div>
                    </div>
                  </div>
                </div>
                <TabBar />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">마이 페이지</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 2 / 2 / 3"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-100 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F82d4b0527a7aa67f7eff8146bfb7f70691ec03df.svg?generation=1778677419864902&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F8953d7c5b954b2cbdf91c76a7fcd01ab223831be.svg?generation=1778677419842962&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fecc79c56d83d223eb08c89b79b70e84caf9360dd.svg?generation=1778677419880265&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">알림 설정</div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-0 pr-4 pb-6 pl-4">
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
                    <div className="font-bold text-gray-600">
                      전체 알림
                    </div>
                    <div className="items-center flex mt-[6px] gap-2.5">
                      <div className="grow font-extrabold basis-[0%] text-lg" style={{"fontFamily":"NanumSquare, system-ui"}}>
                        받기
                      </div>
                      <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                        <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">
                      카테고리별
                    </div>
                    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
                      <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                        <div className="grow basis-[0%]">
                          <div className="font-semibold">복약 알림</div>
                          <div className="mt-[2px] text-gray-600 text-xs">하루 평균 2-3건</div>
                        </div>
                        <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                          <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                        </div>
                      </div>
                      <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="w-2 h-2 bg-purple-500 rounded-sm"></div>
                        <div className="grow basis-[0%]">
                          <div className="font-semibold">주간 리포트</div>
                          <div className="mt-[2px] text-gray-600 text-xs">월요일 아침</div>
                        </div>
                        <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                          <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                        </div>
                      </div>
                      <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                        <div className="grow basis-[0%]">
                          <div className="font-semibold">상담 알림</div>
                          <div className="mt-[2px] text-gray-600 text-xs">하루 전 · 1시간 전</div>
                        </div>
                        <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                          <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                        </div>
                      </div>
                      <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                        <div className="grow basis-[0%]">
                          <div className="font-semibold">커뮤니티</div>
                          <div className="mt-[2px] text-gray-600 text-xs">댓글·공감</div>
                        </div>
                        <div className="relative w-[38px] h-[22px] bg-purple-50 rounded-[0.6875rem]">
                          <div className="absolute w-[18px] h-[18px] left-[2px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                        </div>
                      </div>
                      <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px]">
                        <div className="w-2 h-2 bg-[rgb(138,_131,_152)] rounded-sm"></div>
                        <div className="grow basis-[0%]">
                          <div className="font-semibold">마케팅·이벤트</div>
                          <div className="mt-[2px] text-gray-600 text-xs">월 1-2회</div>
                        </div>
                        <div className="relative w-[38px] h-[22px] bg-purple-50 rounded-[0.6875rem]">
                          <div className="absolute w-[18px] h-[18px] left-[2px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">
                      방해 금지
                    </div>
                    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
                      <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="grow font-semibold basis-[0%]">
                          야간 모드
                        </div>
                        <div className="mr-[6px] text-gray-600">
                          22:00 — 07:00
                        </div>
                        <div className="relative w-[38px] h-[22px] bg-purple-500 rounded-[0.6875rem]">
                          <div className="absolute w-[18px] h-[18px] left-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem]"></div>
                        </div>
                      </div>
                      <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px]">
                        <div className="grow font-semibold basis-[0%]">
                          방해 금지 시간 제외
                        </div>
                        <div className="mr-[6px] text-gray-600">
                          중요 복약
                        </div>
                        <div className="overflow-hidden w-[11px] h-[11px]">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc7cea99060a480d5e2826ffe0e1a60dac4080b20.svg?generation=1778677419900928&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">알림 설정</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 3 / 2 / 4"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F27d6c000f71ef05c4f7c3a6935855b8d9b7af048.svg?generation=1778677419911670&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9811a0e18133c5bee60ef16cca2c6638dec96972.svg?generation=1778677419906288&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff0071d92959cfc25f75d6812bbca366b70c646d6.svg?generation=1778677419926051&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">회원 탈퇴</div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-2 pr-5 pb-6 pl-5">
                  <div className="flex items-center justify-center text-center pt-3 pr-0 pb-3 pl-0">
                    <div className="w-20 h-20">
                      <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
                    <span className="text-center">정말 떠나시겠어요?</span>
                  </div>
                  <div className="text-center text-gray-500 leading-normal">
<span className="text-center">탈퇴 신청 후 </span><b className="font-bold text-center text-gray-900">
                      <span className="text-center">30일간 유예 기간</span>
</b><span className="text-center">이 있어요.</span><br /><span className="text-center">그 동안 로그인하시면 취소할 수 있습니다.</span>                                    </div>
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
                    <div className="font-bold mb-2">
                      30일 후 영구 삭제되는 데이터
                    </div>
                    <div className="items-center flex gap-2 pt-1 pr-0 pb-1 pl-0">
<div className="overflow-hidden w-[10px] h-[10px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc460d2c73592531244b61e7d56a7112129bedd62.svg?generation=1778677419957051&amp;alt=media" className="block size-full" />
</div>일지 기록 124일                                      </div>
                    <div className="items-center flex gap-2 pt-1 pr-0 pb-1 pl-0">
<div className="overflow-hidden w-[10px] h-[10px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb091304ee94d3e52b975b766b759b2207cca40d9.svg?generation=1778677419985507&amp;alt=media" className="block size-full" />
</div>복약 이력                                      </div>
                    <div className="items-center flex gap-2 pt-1 pr-0 pb-1 pl-0">
<div className="overflow-hidden w-[10px] h-[10px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6f9f8c12f586975632499459c96fac7e341d3bea.svg?generation=1778677419982095&amp;alt=media" className="block size-full" />
</div>상담 기록                                      </div>
                    <div className="items-center flex gap-2 pt-1 pr-0 pb-1 pl-0">
<div className="overflow-hidden w-[10px] h-[10px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F8d9dca6db5d2799d20a5f82e023f2b31e0dc72c9.svg?generation=1778677419995674&amp;alt=media" className="block size-full" />
</div>리포트 12개                                      </div>
                    <div className="items-center flex gap-2 pt-1 pr-0 pb-1 pl-0">
<div className="overflow-hidden w-[10px] h-[10px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9c26572832e754b60b7ceda5c1f00cfd1aa4d4cd.svg?generation=1778677420041932&amp;alt=media" className="block size-full" />
</div>커뮤니티 글·댓글                                      </div>
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
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">회원 탈퇴 · AUTH-006</figcaption>
        </figure>
      </div>
    </section>
  );
}

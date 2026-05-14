import React from 'react';
import logoImage from '../../imports/logo_with_brand.png';

export function SignupSection() {
  return (
    <section className="pt-1 pr-0 pb-0 pl-0">
      <header className="items-start flex mb-4 gap-4 pt-0 pr-1 pb-5 pl-1 border-b" style={{"borderBottomColor":"var(--gray-400)"}}>
        <div className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-[0]" style={{"fontFamily":"NanumSquare, system-ui"}}>⓪</div>
        <div>
          <h2 className="font-bold mb-1 text-2xl tracking-tight leading-tight" style={{"fontFamily":"NanumSquare, system-ui"}}>회원가입</h2>
          <p className="text-gray-600 text-xs leading-tight">첫 접속부터 계정 생성까지</p>
        </div>
        <div className="self-start font-bold ml-auto whitespace-nowrap bg-gray-50 border-gray-400 border text-gray-500 text-xs pt-1.5 pr-3 pb-1.5 pl-3 shrink-[0] rounded-full">3 screens</div>
      </header>
      <div className="grid justify-center gap-6 gap-x-7" style={{"gridTemplateColumns":"repeat(3, 320px)"}}>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 1 / 2 / 2"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-purple-100 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F91c84df0f3791ffb9aa8a93e56f33dcf7f8c7cee.svg?generation=1778677413494809&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F2b4fd0b38333d39898997999f0da73ac7098b27c.svg?generation=1778677413526057&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
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
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">Splash · 시작</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 2 / 2 / 3"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa6abc6e0b118d2cf07d930da7d7bd059a691b347.svg?generation=1778677413987242&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F018bb5ce3d2b0dbe7fc1d7b937d5dede44db8dff.svg?generation=1778677414016567&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between relative">
                    <button className="items-center flex justify-center w-11 h-11 text-gray-700 rounded-xl hover:bg-white/60 transition-colors" aria-label="이전 화면">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18L9 12L15 6" />
                      </svg>
                    </button>
                    <div className="absolute left-[50%] translate-x-[-50%] font-bold text-sm">회원가입</div>
                    <div className="w-11 h-11" />
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-5 pr-5 pb-4 pl-5">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
                      <label className="font-semibold text-gray-500 text-[11px] leading-tight">이메일</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        className="w-full h-6 bg-transparent text-gray-900 text-sm placeholder:text-gray-400 outline-none p-0"
                      />
                    </div>
                    <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
                      <label className="font-semibold text-gray-500 text-[11px] leading-tight">비밀번호</label>
                      <div className="items-center flex w-full h-6">
                        <input
                          type="password"
                          placeholder="8자 이상"
                          className="grow h-full bg-transparent text-gray-900 text-sm placeholder:text-gray-400 outline-none p-0 basis-[0%]"
                        />
                        <button className="font-medium text-gray-500 text-xs pl-3 shrink-[0]">
                          보기
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
                      <label className="font-semibold text-gray-500 text-[11px] leading-tight">닉네임</label>
                      <input
                        type="text"
                        placeholder="어떻게 불러드릴까요?"
                        className="w-full h-6 bg-transparent text-gray-900 text-sm placeholder:text-gray-400 outline-none p-0"
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="items-start flex gap-2 mb-1.5">
                      <div className="items-center flex justify-center w-4 h-4 bg-purple-500 rounded shrink-[0] mt-0.5">
                        <div className="overflow-hidden w-2.5 h-2.5">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff65a7410da47c5d2b396b5d6f7c374acd3be6f7e.svg?generation=1778677413507571&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                      <div className="text-xs leading-relaxed"><span className="underline">이용약관</span>, <span className="underline">개인정보처리방침</span>에 모두 동의합니다. (필수)</div>
                    </div>
                    <div className="items-start flex gap-2">
                      <div className="items-center flex justify-center w-4 h-4 border-gray-400 border rounded shrink-[0] mt-0.5"></div>
                      <div className="text-gray-600 text-xs leading-relaxed"><span className="underline">마케팅 정보 수신</span>에 동의합니다. (선택)</div>
                    </div>
                  </div>
                  <div className="items-center flex font-bold justify-center w-full h-[46px] bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 mt-5 pt-0 pr-5 pb-0 pl-5 rounded-xl">
                    <span className="block">회원가입</span>
                  </div>
                  <div className="mt-8">
                    <div className="items-center flex gap-2">
                      <div className="grow h-px bg-purple-50 basis-[0%]"></div>
                      <div className="text-gray-500 text-xs">
                        소셜 계정으로
                      </div>
                      <div className="grow h-px bg-purple-50 basis-[0%]"></div>
                    </div>
                    <div className="flex justify-center gap-4 mt-3">
                    <button className="items-center flex justify-center w-10 h-10 bg-white border border-gray-300 rounded-full shadow-sm">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </button>
                    <button className="items-center flex justify-center w-10 h-10 bg-black rounded-full">
                      <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                    </button>
                    <button className="items-center flex justify-center w-10 h-10 rounded-full" style={{backgroundColor: '#FEE500'}}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="rgba(0,0,0,0.9)">
                        <path d="M12 3C6.5 3 2 6.58 2 11c0 2.5 1.5 4.74 3.87 6.17-.2.77-.77 2.83-.88 3.27-.13.52.18.51.38.37.15-.11 2.42-1.58 3.4-2.23C9.85 18.75 10.9 19 12 19c5.5 0 10-3.58 10-8s-4.5-8-10-8z"/>
                      </svg>
                    </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">회원가입 + 소셜 + 약관</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 3 / 2 / 4"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>9:41</div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa6abc6e0b118d2cf07d930da7d7bd059a691b347.svg?generation=1778677413987242&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F018bb5ce3d2b0dbe7fc1d7b937d5dede44db8dff.svg?generation=1778677414016567&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between relative">
                    <button className="items-center flex justify-center w-11 h-11 text-gray-700 rounded-xl hover:bg-white/60 transition-colors" aria-label="이전 화면">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18L9 12L15 6" />
                      </svg>
                    </button>
                    <div className="absolute left-[50%] translate-x-[-50%] font-bold text-sm">메일 인증</div>
                    <div className="w-11 h-11" />
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-16 pr-5 pb-4 pl-5">
                  <div className="items-center flex flex-col text-center">
                    <div className="items-center flex justify-center w-16 h-16 text-purple-600">
                      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 6h16v12H4z" />
                        <path d="M4 7l8 6l8-6" />
                      </svg>
                    </div>
                    <div className="font-semibold text-gray-900 text-base leading-tight mt-5">인증 메일이 발송되었습니다.</div>
                    <div className="text-gray-500 text-sm leading-tight mt-2">name@example.com</div>
                  </div>
                  <div className="items-center flex flex-col text-center mt-6 text-xs leading-relaxed">
                    <div className="text-gray-600">인증메일을 받지 못하셨나요?</div>
                    <button className="font-bold text-purple-700 underline mt-1">인증메일 재발송</button>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">인증메일 발송 · AUTH-004</figcaption>
        </figure>
      </div>
    </section>
  );
}

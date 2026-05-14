import React, { useState } from 'react';
import logoImage from '../../imports/logo.png';

export function OnboardingSection() {
  const [guideOpen, setGuideOpen] = useState(false);
  return (
    <section className="pt-1 pr-0 pb-0 pl-0">
      <header className="items-start flex mb-4 gap-4 pt-0 pr-1 pb-5 pl-1 border-b" style={{"borderBottomColor":"var(--gray-400)"}}>
        <div className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-[0]" style={{"fontFamily":"NanumSquare, system-ui"}}>②</div>
        <div>
          <h2 className="font-bold mb-1 text-2xl tracking-tight leading-tight" style={{"fontFamily":"NanumSquare, system-ui"}}>온보딩</h2>
          <p className="text-gray-600 text-xs leading-tight">INIT-001~005 — 초기 설정부터 메인 진입까지</p>
        </div>
        <div className="self-start font-bold ml-auto whitespace-nowrap bg-gray-50 border-gray-400 border text-gray-500 text-xs pt-1.5 pr-3 pb-1.5 pl-3 shrink-[0] rounded-full">5 screens</div>
      </header>
      <div className="grid justify-center gap-6 gap-x-7" style={{"gridTemplateColumns":"repeat(5, 320px)"}}>
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
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fbc6cf68bbc9b1cb51ee9c767f57e51161b770be0.svg?generation=1778677413669933&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F05d3aded7a3c0db98032b6170ad3c08c1adb44ac.svg?generation=1778677413684489&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="items-center flex flex-col grow min-h-0 overflow-y-auto overscroll-contain justify-center text-center basis-[0%] px-5 py-8">
                  <div className="flex items-center justify-center text-center w-32 h-32">
                    <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
                  </div>
                  <div className="font-semibold text-gray-900 text-base leading-tight mt-5">나를 이해하는 기록을 시작해요.</div>
                  <div className="text-gray-600 text-sm leading-relaxed mt-2">
                    약 3분 동안 몇 가지 질문에 답하면<br />맞춤 기록이 준비됩니다.
                  </div>
                  <div className="w-full mt-10">
                    <div className="items-center flex font-bold justify-center text-center w-full h-[46px] bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl">
                      <span className="block text-center">시작하기</span>
                    </div>
                    <button className="font-bold text-purple-700 underline mt-4 text-xs">나중에 할게요</button>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">온보딩 진입 · INIT-001</figcaption>
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
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fbc6cf68bbc9b1cb51ee9c767f57e51161b770be0.svg?generation=1778677413669933&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F05d3aded7a3c0db98032b6170ad3c08c1adb44ac.svg?generation=1778677413684489&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-2.5 pt-0 pr-0 pb-0 pl-0 shrink-[0]">
                  <div className="relative h-1 bg-purple-50 rounded-sm">
                    <div className="absolute w-[25%] left-0 top-0 bottom-0 bg-purple-500 rounded-sm"></div>
                  </div>
                  <div className="items-center flex pt-1 pr-4 pl-1">
                    <button className="items-center flex justify-center w-11 h-11 text-gray-700 rounded-xl shrink-0 hover:bg-white/60 transition-colors" aria-label="이전 화면">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18L9 12L15 6" /></svg>
                    </button>
                    <div className="grow">
                      <div className="font-semibold text-gray-900 text-sm leading-tight">증상 서술</div>
                      <div className="mt-1 text-gray-600 text-xs leading-relaxed">어떤 어려움을 겪어오셨나요?</div>
                    </div>
                    <div className="text-gray-600 text-xs whitespace-nowrap ml-2 shrink-0">1 / 4</div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-5 pr-5 pb-4 pl-5">
                  <div className="flex flex-col bg-white shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] min-h-44 p-3.5 rounded-xl border border-gray-300 mt-5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
                    <label className="font-semibold text-gray-500 text-[11px] leading-tight">증상 서술</label>
                    <textarea
                      placeholder="자유롭게 적어주세요. 나중에 일지 태그로 추천해드려요."
                      className="grow w-full min-h-[116px] bg-transparent text-gray-900 text-sm leading-relaxed placeholder:text-gray-400 outline-none resize-none mt-2 p-0"
                    />
                    <div className="text-right text-gray-400 text-xs leading-tight mt-2">0/500</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-100 p-3 rounded-xl mt-5">
                    <button className="items-center flex gap-2 w-full" onClick={() => setGuideOpen(v => !v)}>
                      <div className="overflow-hidden w-3 h-3 shrink-0">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F51c0b100c6c8da5a7080133c33e0d3164ca5032a.svg?generation=1778677413712073&amp;alt=media" className="block size-full" style={{filter: "invert(26%) sepia(89%) saturate(1583%) hue-rotate(248deg) brightness(97%) contrast(98%)"}} />
                      </div>
                      <div className="font-bold text-purple-700">
                        증상 서술 가이드라인 보기
                      </div>
                      <div className="grow basis-[0%]"></div>
                      <svg className={`w-3 h-3 text-purple-500 shrink-0 transition-transform duration-200 ${guideOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {guideOpen && (
                      <ul className="mt-3 flex flex-col gap-2 overflow-y-auto max-h-36">
                        {[
                          '최근만이 아니라, 어릴 때부터 반복된 경험을 적어주세요.',
                          '학교·집·직장 등 여러 환경에서 나타난 경험이면 좋아요.',
                          '단순한 스트레스나 우울 시기만의 변화와 구분될 수 있게 작성해주세요.',
                          '"집중이 안 됨"보다 구체적인 상황을 적어주세요.',
                        ].map((item, i) => (
                          <li key={i} className="flex gap-1.5 text-purple-800 text-xs leading-relaxed">
                            <span className="shrink-0 mt-0.5">·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                        <li className="flex gap-1.5 text-purple-500 text-xs leading-relaxed">
                          <span className="shrink-0 mt-0.5">예)</span>
                          <span>숙제를 자주 미루고 마감 직전에 함 / 물건을 반복해서 잃어버림</span>
                        </li>
                      </ul>
                    )}
                  </div>
                  <div className="grow basis-[0%]"></div>
                  <div className="text-center text-gray-500 text-xs">최소 50자 이상 입력해 주세요</div>
                  <div className="items-center flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 mt-3 pt-0 pr-5 pb-0 pl-5 rounded-xl">
                    <span className="block">다음</span>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">초기 증상 서술 · INIT-002</figcaption>
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
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F61d91e07a35635e8d90656a1ae5f74552ac31092.svg?generation=1778677413841819&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F163171ecacbdefd526f3785f21b544519876c121.svg?generation=1778677413811718&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-2.5 pt-0 pr-0 pb-0 pl-0 shrink-[0]">
                  <div className="relative h-1 bg-purple-50 rounded-sm">
                    <div className="absolute w-[50%] left-0 top-0 bottom-0 bg-purple-300 rounded-sm"></div>
                  </div>
                  <div className="items-start flex pt-1 pr-4 pl-1">
                    <button className="items-center flex justify-center w-11 h-11 text-gray-700 rounded-xl shrink-0 hover:bg-white/60 transition-colors" aria-label="이전 화면">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18L9 12L15 6" /></svg>
                    </button>
                    <div className="grow">
                      <div className="font-semibold text-gray-900 text-sm leading-tight">ASRS 자가 체크</div>
                      <div className="mt-1 text-gray-600 text-xs leading-relaxed">18문항 · 약 3분</div>
                    </div>
                    <div className="text-gray-600 text-xs whitespace-nowrap ml-2 mt-0.5 shrink-0">2 / 4</div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-5 pr-5 pb-4 pl-5">
                  <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] p-3 rounded-xl">
                    <div className="font-medium mb-3 text-sm leading-snug">
                      <span className="font-semibold text-gray-500 mr-2">Q3</span>일을 마무리하는 데 얼마나 자주 어려움을 겪나요?
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between w-full">
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">1</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">2</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">3</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-500 shadow-sm rounded-lg">
                          <div className="text-base font-bold text-white">4</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">5</div>
                        </button>
                      </div>
                      <div className="flex justify-between w-full text-[10px] text-gray-600">
                        <span>전혀</span>
                        <span>매우 자주</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] p-3 rounded-xl">
                    <div className="font-medium mb-3 text-sm leading-snug">
                      <span className="font-semibold text-gray-500 mr-2">Q4</span>체계적으로 정리해야 할 일을 미루는 경향이 있나요?
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between w-full">
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">1</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">2</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-500 shadow-sm rounded-lg">
                          <div className="text-base font-bold text-white">3</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">4</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">5</div>
                        </button>
                      </div>
                      <div className="flex justify-between w-full text-[10px] text-gray-600">
                        <span>전혀</span>
                        <span>매우 자주</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] p-3 rounded-xl">
                    <div className="font-medium mb-3 text-sm leading-snug">
                      <span className="font-semibold text-gray-500 mr-2">Q5</span>약속이나 의무를 잊어버리는 경우가 있나요?
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between w-full">
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">1</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-500 shadow-sm rounded-lg">
                          <div className="text-base font-bold text-white">2</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">3</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">4</div>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                          <div className="text-base font-bold text-purple-600">5</div>
                        </button>
                      </div>
                      <div className="flex justify-between w-full text-[10px] text-gray-600">
                        <span>전혀</span>
                        <span>매우 자주</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-100 p-2.5 rounded-xl">
                    <div className="text-gray-800 text-xs leading-normal">
                      ⚠︎ 본 검사는 선별 도구로 실제 진단과 다를 수 있습니다. 정확한 진단을 위해 전문의와 상담해 주세요.
                    </div>
                  </div>
                </div>
                <div className="pt-0 pr-5 pb-4 pl-5">
                  <div className="items-center inline-flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl">
                    <span className="block">다음</span>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">ASRS 체크리스트 · INIT-003</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 4 / 2 / 5"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd372e43477cf6a0fd2c961168af0296b22e7c83a.svg?generation=1778677413835669&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F5fa65b84a11244afe1bf2f5b22c5ff71f439963b.svg?generation=1778677413825062&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-2.5 pt-0 pr-0 pb-0 pl-0 shrink-[0]">
                  <div className="relative h-1 bg-purple-50 rounded-sm">
                    <div className="absolute w-[75%] left-0 top-0 bottom-0 bg-purple-300 rounded-sm"></div>
                  </div>
                  <div className="items-start flex pt-1 pr-4 pl-1">
                    <button className="items-center flex justify-center w-11 h-11 text-gray-700 rounded-xl shrink-0 hover:bg-white/60 transition-colors" aria-label="이전 화면">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18L9 12L15 6" /></svg>
                    </button>
                    <div className="grow">
                      <div className="font-semibold text-gray-900 text-sm leading-tight">어떤 변화가 있었으면 좋겠어요?</div>
                      <div className="mt-1 text-gray-600 text-xs leading-relaxed">
                        최소 1개 이상
                      </div>
                    </div>
                    <div className="text-gray-600 text-xs whitespace-nowrap ml-2 mt-0.5 shrink-0">3 / 4</div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-5 pr-5 pb-4 pl-5">
                  <div className="flex flex-wrap gap-1.5">
                    <div className="items-center flex font-semibold bg-purple-500 text-white text-xs gap-1.5 tracking-tight py-1.5 pl-3 pr-2 rounded-full shadow-sm">
                      <span className="block">한 가지 일을 20분 이상 이어가기</span>
                      <button className="flex items-center justify-center w-4 h-4 hover:bg-purple-600 rounded-full transition-colors">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="items-center flex font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs gap-1.5 tracking-tight py-1.5 px-3 rounded-full transition-colors cursor-pointer">
                      <span className="block">해야 할 일을 10분 안에 시작하기</span>
                    </div>
                    <div className="items-center flex font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs gap-1.5 tracking-tight py-1.5 px-3 rounded-full transition-colors cursor-pointer">
                      <span className="block">약속·일정 10분 전 준비 완료하기</span>
                    </div>
                    <div className="items-center flex font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs gap-1.5 tracking-tight py-1.5 px-3 rounded-full transition-colors cursor-pointer">
                      <span className="block">하루 5분 주변 정리하기</span>
                    </div>
                    <div className="items-center flex font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs gap-1.5 tracking-tight py-1.5 px-3 rounded-full transition-colors cursor-pointer">
                      <span className="block">목표 취침·기상 시간 ±1시간 안에 지키기</span>
                    </div>
                    <div className="items-center flex font-semibold whitespace-nowrap bg-white hover:bg-gray-50 border-gray-400 border-dashed border text-gray-600 text-xs gap-1.5 tracking-tight py-1.5 px-3 rounded-full transition-colors cursor-pointer">
                      <span className="block">+ 직접입력</span>
                    </div>
                  </div>
                  <div className="grow basis-[0%]"></div>
                  <div className="items-center flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl">
                    <span className="block">다음</span>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">목표 설정 · INIT-004</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 5 / 2 / 6"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc9c21022de2da6c8462a33de9bd3baaf6a568e21.svg?generation=1778677413863160&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fe80e993a45bcd9b6366659dc76747da07a77bc1e.svg?generation=1778677413892968&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between relative">
                    <div className="w-11 h-11" />
                    <div className="absolute left-[50%] translate-x-[-50%] font-bold text-sm">온보딩 완료</div>
                    <div className="w-11 h-11" />
                  </div>
                </div>
                <div className="items-center flex flex-col grow min-h-0 overflow-y-auto overscroll-contain justify-center text-center basis-[0%] px-5 py-8">
                  <div className="flex items-center justify-center text-center w-24 h-24">
                    <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
                  </div>
                  <div className="font-bold text-gray-900 text-xl leading-tight mt-5">이제 시작할 준비가 됐어요!</div>
                  <p className="text-gray-500 text-sm leading-relaxed mt-3">일지 · 복약 · 캘린더 · 리포트로<br />하루의 작은 변화를 함께 살펴봐요.</p>
                  <div className="items-center flex font-bold justify-center text-center w-full h-[46px] bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base min-h-11 mt-8 pt-0 pr-5 pb-0 pl-5 rounded-xl">
                    <span className="block text-center">홈으로 가기</span>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">키워드 추출 + 완료 · INIT-005/007</figcaption>
        </figure>
      </div>
    </section>
  );
}

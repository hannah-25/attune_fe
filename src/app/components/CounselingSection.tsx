import React from 'react';
import { TabBar } from './TabBar';

export function CounselingSection() {
  return (
    <section className="pt-1 pr-0 pb-0 pl-0">
      <header className="items-start flex mb-4 gap-4 pt-0 pr-1 pb-5 pl-1 border-b" style={{"borderBottomColor":"var(--gray-400)"}}>
        <div className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-[0]" style={{"fontFamily":"NanumSquare, system-ui"}}>⑧</div>
        <div>
          <h2 className="font-bold mb-1 text-2xl tracking-tight leading-tight" style={{"fontFamily":"NanumSquare, system-ui"}}>상담 기록</h2>
          <p className="text-gray-600 text-xs leading-tight">REQ-DOC-01~03 · 진료 전 준비 / 진료 후 기록</p>
        </div>
        <div className="self-start font-bold ml-auto whitespace-nowrap bg-gray-50 border-gray-400 border text-gray-500 text-xs pt-1.5 pr-3 pb-1.5 pl-3 shrink-[0] rounded-full">3 screens</div>
      </header>
      <div className="grid justify-center gap-6 gap-x-7" style={{"gridTemplateColumns":"repeat(3, 320px)"}}>
        <figure className="items-center flex flex-col" style={{"gridArea":"1 / 1 / 2 / 2"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F37d36d2649e0167668e10933bbff173ac0add099.svg?generation=1778677417462841&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F3b862619e74a247eab84539e35a73ea3978624af.svg?generation=1778677417471722&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb6ccaea78ae3d5ae886343fe1599532e8d23a688.svg?generation=1778677417483053&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">상담</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F427d505d9a8d1880ba0c0b74c2fba370c1b3f7a7.svg?generation=1778677417526120&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow overflow-auto basis-[0%] gap-3 pt-0 pr-4 pb-[100px] pl-4">
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
                    <div className="font-bold text-gray-600 text-xs">
                      다음 상담까지
                    </div>
                    <div className="font-extrabold mt-[2px] text-3xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
                      D-3
                    </div>
                    <div className="mt-1 text-gray-800">
                      5월 16일 금 · 14:00 · 청담심리상담센터
                    </div>
                    <div className="flex mt-3 gap-1.5">
                      <div className="items-center flex grow font-bold justify-center h-9 bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem]">
                        <span className="block">상담 준비 시작</span>
                      </div>
                      <div className="items-center flex grow font-bold justify-center h-9 border-gray-900 border basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem]">
                        <span className="block">일정 변경</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-600 pt-1 pr-1 pb-0 pl-1">
                    지난 상담
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
                    <div className="items-center flex mb-[6px] gap-2">
                      <div className="font-bold text-gray-600">4월 16일 금</div>
                      <div className="grow basis-[0%]"></div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                        <span className="block">완료</span>
                      </div>
                    </div>
                    <div className="font-semibold">청담심리상담센터</div>
                    <div className="mt-1 text-gray-600">처방 유지 · 콘서타 18mg</div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
                    <div className="items-center flex mb-[6px] gap-2">
                      <div className="font-bold text-gray-600">3월 19일 금</div>
                      <div className="grow basis-[0%]"></div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                        <span className="block">완료</span>
                      </div>
                    </div>
                    <div className="font-semibold">청담심리상담센터</div>
                    <div className="mt-1 text-gray-600">용량 조정 18 → 27mg 검토</div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
                    <div className="items-center flex mb-[6px] gap-2">
                      <div className="font-bold text-gray-600">2월 20일 금</div>
                      <div className="grow basis-[0%]"></div>
                      <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                        <span className="block">완료</span>
                      </div>
                    </div>
                    <div className="font-semibold">청담심리상담센터</div>
                    <div className="mt-1 text-gray-600">초기 상담</div>
                  </div>
                </div>
                <TabBar active="상담" tabs={['홈', '일지', '약', '캘린더', '상담']} />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">상담 일정 · CNS-001/004</figcaption>
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
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F798f91846f39a0cf39093f778e669f9a05034418.svg?generation=1778677417626356&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6b4a6b18d6b06336e7e9fd595980986147201bde.svg?generation=1778677417637940&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa7a5bb7f1924955f362f7eae70db182206a69aa8.svg?generation=1778677417620184&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">상담 전 준비</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="font-bold text-white bg-purple-500 px-3 py-1 rounded-lg">
                          저장
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow overflow-auto basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="font-bold text-gray-600 text-xs">
                      5월 16일 금 14:00까지
                    </div>
                    <div className="font-extrabold mt-1 text-lg leading-[24.3px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
                      최근 2주, 이렇게 지냈어요
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
                    <div className="items-center flex mb-[10px] gap-1.5">
                      <div className="overflow-hidden w-3 h-3">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd6f01a918e96084e1d681d7d62364e44c857d2d4.svg?generation=1778677417638074&amp;alt=media" className="block size-full" />
                      </div>
                      <div className="font-bold">
                        자동 요약
                      </div>
                      <div className="grow basis-[0%]"></div>
                      <div className="text-gray-600 text-xs">
                        최근 14일
                      </div>
                    </div>
                    <div className="grid-cols-3 grid mb-[10px] gap-1.5">
                      <div className="text-center bg-gray-100 p-[10px] rounded-xl" style={{"gridArea":"1 / 1 / 2 / 2"}}>
                        <div className="font-bold text-center text-gray-600 text-xs">복용</div>
                        <div className="font-extrabold text-center mt-[2px] text-base" style={{"fontFamily":"NanumSquare, system-ui"}}>88%</div>
                      </div>
                      <div className="text-center bg-gray-100 p-[10px] rounded-xl" style={{"gridArea":"1 / 2 / 2 / 3"}}>
                        <div className="font-bold text-center text-gray-600 text-xs">감정</div>
                        <div className="font-extrabold text-center mt-[2px] text-base" style={{"fontFamily":"NanumSquare, system-ui"}}>6.2</div>
                      </div>
                      <div className="text-center bg-gray-100 p-[10px] rounded-xl" style={{"gridArea":"1 / 3 / 2 / 4"}}>
                        <div className="font-bold text-center text-gray-600 text-xs">실수</div>
                        <div className="font-extrabold text-center mt-[2px] text-base" style={{"fontFamily":"NanumSquare, system-ui"}}>7회</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[7px]">
                      <div className="w-[90%] h-[6px] bg-purple-50 rounded-md"></div>
                      <div className="w-[60%] h-[6px] bg-purple-50 rounded-md"></div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold mb-[6px] text-gray-600">
                      의사에게 묻고 싶은 것
                    </div>
                    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
                      <div className="items-start flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="items-center flex justify-center w-[18px] h-[18px] mt-[2px] bg-purple-500 shrink-[0] rounded-[0.5625rem]">
                          <div className="overflow-hidden w-[10px] h-[10px]">
                            <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fefc3d1b8024eaed0f9ca68769c039657e53d1ed2.svg?generation=1778677417694608&amp;alt=media" className="block size-full" />
                          </div>
                        </div>
                        <div className="grow basis-[0%] leading-normal">아침 식욕이 너무 없어요. 다른 약으로 바 꿔야 할까요?</div>
                      </div>
                      <div className="items-start flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="items-center flex justify-center w-[18px] h-[18px] mt-[2px] bg-purple-500 shrink-[0] rounded-[0.5625rem]">
                          <div className="overflow-hidden w-[10px] h-[10px]">
                            <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F37b80fb315a843d30ffa649f97fc8c6c3e826533.svg?generation=1778677417714583&amp;alt=media" className="block size-full" />
                          </div>
                        </div>
                        <div className="grow basis-[0%] leading-normal">오후 4시 이후 약효가 빨리 떨어지는 느 낌이에요</div>
                      </div>
                      <div className="items-start flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px]">
                        <div className="items-center flex justify-center w-[18px] h-[18px] mt-[2px] border-gray-400 border shrink-[0] rounded-[0.5625rem]"></div>
                        <div className="grow basis-[0%] leading-normal">수면제와 함께 복용해도 괜찮을까요?</div>
                      </div>
                      <div className="items-center flex text-gray-600 gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px]">
                        <div className="overflow-hidden w-3 h-3">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc6af67f80f7ec4d48ab0b1984f79c9c47ed17688.svg?generation=1778677417709738&amp;alt=media" className="block size-full" />
                        </div>
                        <span className="block">질문 추가</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold mb-[6px] text-gray-600">
                      다음 달 치료 목표
                    </div>
                    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
                      <div className="flex flex-col gap-2.5">
                        <div className="w-[80%] h-2 bg-purple-50 rounded-lg"></div>
                        <div className="w-[40%] h-2 bg-purple-50 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">상담 전 준비 · CNS-002</figcaption>
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
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F037b7365aa7a2240ccb80b61d2e3a2e01743ddb3.svg?generation=1778677417726050&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9b9c1214bbdf4834e088c0f59bde5fd38061c1bd.svg?generation=1778677417725174&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F1374f2b16faf6016b6e53e7199458616492fb894.svg?generation=1778677417797896&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">상담 후 기록</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="font-bold text-white bg-purple-500 px-3 py-1 rounded-lg">
                          저장
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow overflow-auto basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
                    <div className="font-bold text-gray-600">
                      4월 16일 금 · 청담심리상담센터
                    </div>
                    <div className="mt-1">
                      40분 진료 · 처방 변경 있음
                    </div>
                  </div>
                  <div>
                    <div className="font-bold mb-[6px] text-gray-600">
                      의사 조언
                    </div>
                    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
                      <div className="flex flex-col gap-[9px]">
                        <div className="w-[92%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                        <div className="w-[78%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                        <div className="w-[50%] h-[7px] bg-purple-50 rounded-[0.4375rem]"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold mb-[6px] text-gray-600">
                      처방 변경
                    </div>
                    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
                      <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                        <div className="grow basis-[0%]">
                          콘서타 
                          <s className="line-through text-gray-500" style={{"textDecoration":"line-through"}}>
                            <span style={{"textDecoration":"none"}}>18mg</span>
                          </s>
                           → 
                          <b className="font-bold">
                            27mg
                          </b>
                        </div>
                        <div className="items-center flex font-semibold whitespace-nowrap bg-purple-500 border-black/0 border text-white text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                          <span className="block">증량</span>
                        </div>
                      </div>
                      <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px]">
                        <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                        <div className="grow basis-[0%]">
                          스트라테라 40mg · 유지
                        </div>
                        <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                          <span className="block">유지</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold mb-[6px] text-gray-600">
                      오늘 받은 답변
                    </div>
                    <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
                      <div className="pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
                        <div className="font-bold">Q. 아침 식욕이 너무 없어요</div>
                        <div className="mt-1 text-gray-600 leading-normal">아침 식사를 가볍게 먼저 하고 약 복용을 권장</div>
                      </div>
                      <div className="pt-3 pr-[14px] pb-3 pl-[14px]">
                        <div className="font-bold">Q. 약효가 빨리 떨어져요</div>
                        <div className="mt-1 text-gray-600 leading-normal">증량으로 조정 — 2주 후 재평가</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
                    <div className="items-center flex gap-2">
                      <div className="overflow-hidden w-3 h-3">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6cae536aa2417c12c04efccc757fd2895c7958ab.svg?generation=1778677417793151&amp;alt=media" className="block size-full" />
                      </div>
                      <div className="leading-[18.85px]">
                        <b className="font-bold">
                          다음 진료 5월 16일
                        </b>
                         알림으로 미리 알려드릴 게요
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">상담 후 결과 · CNS-003</figcaption>
        </figure>
      </div>
    </section>
  );
}

import React from 'react';
import logoImage from '../../imports/logo.png';
import { TabBar } from './TabBar';

export function EmptyStatesSection() {
  return (
    <section className="pt-1 pr-0 pb-0 pl-0">
      <header className="items-start flex mb-4 gap-4 pt-0 pr-1 pb-5 pl-1 border-b" style={{"borderBottomColor":"var(--gray-400)"}}>
        <div className="font-bold mt-[-4px] text-purple-500 text-5xl leading-none shrink-[0]" style={{"fontFamily":"NanumSquare, system-ui"}}>⑩</div>
        <div>
          <h2 className="font-bold mb-1 text-2xl tracking-tight leading-tight" style={{"fontFamily":"NanumSquare, system-ui"}}>빈 상태 (Empty States)</h2>
          <p className="text-gray-600 text-xs leading-tight">Refactoring UI Ch.12 — 첫 진입 / 데이터 부족 / 검색 결과 없음</p>
        </div>
        <div className="self-start font-bold ml-auto whitespace-nowrap bg-gray-50 border-gray-400 border text-gray-500 text-xs pt-1.5 pr-3 pb-1.5 pl-3 shrink-[0] rounded-full">5 screens</div>
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
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fca9222e835a7c6998203facb7800d486736fb127.svg?generation=1778677418499477&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F4f22e5a0a505b3d2e326f398224dfcb2aea537b2.svg?generation=1778677418516888&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa661aedb84aa79c6a3b2e710ca7b9f1064b5aea7.svg?generation=1778677418544330&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">오늘 일지</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F55c9c7102106ee9fe76c6f15a70c64598dab46d3.svg?generation=1778677418557065&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="items-center flex flex-col grow justify-center text-center basis-[0%] gap-4 pt-5 pr-6 pb-[100px] pl-6">
                  <div className="flex items-center justify-center text-center w-28 h-28 mb-1">
                    <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
                  </div>
                  <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
                    <span className="text-center">오늘은 어떤 하루였어요?</span>
                  </div>
                  <div className="text-center text-gray-600 leading-[20.15px] max-w-[220px]"><span className="text-center">작은 감정 하나, 컨디션 한 줄도 좋아요.</span><br /><span className="text-center">하루 1번이면 충분해요.</span></div>
                  <div className="flex flex-wrap justify-center text-center mt-1 gap-1.5 max-w-60">
                    <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">😊 평온</div>
                    <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">😣 집중 어려움</div>
                    <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">💊 복용</div>
                    <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">🌙 수면</div>
                  </div>
                  <div className="text-center h-2"></div>
                  <div className="items-center flex font-bold justify-center text-center h-[50px] bg-purple-500 shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[200px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
                    <span className="block text-center">오늘 첫 기록 시작</span>
                  </div>
                </div>
                <TabBar active="일지" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">일지 첫 진입</figcaption>
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
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd4af774746874a1201927737055135a66d5661d3.svg?generation=1778677418726300&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc206a4b5c37278a09707d923240d4ff9842078db.svg?generation=1778677418730013&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff921e8c85af86e51ecbc0dd728facb51bb4127c0.svg?generation=1778677418726204&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">복용 중인 약</div>
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc1b04de901d7982dcd4a65a2b9d530c8ba5d7dbd.svg?generation=1778677418781770&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-3 pr-5 pb-[100px] pl-5">
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] p-4 rounded-3xl">
                    <div className="items-center flex gap-3">
                      <div className="items-center flex justify-center w-11 h-11 bg-white rounded-[1.375rem]">
                        <div className="overflow-hidden w-5 h-5">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa9451c5d24783726972f1f38c1ada1a23c9347ec.svg?generation=1778677418843010&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-extrabold text-lg leading-[22.5px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
                          약을 등록해볼까요?
                        </div>
                        <div className="mt-1 text-purple-800 text-xs leading-[16.5px]">
                          복용 시간을 알려드리고, 효과·부작용 패턴을 분석해요
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-600 text-xs p-1">
                    이렇게 도와드려요
                  </div>
                  <div className="items-center flex gap-3 p-1">
                    <div className="items-center flex justify-center w-6 h-6 bg-purple-100 rounded-xl">
                      <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                    </div>
                    <div className="grow basis-[0%]">
                      <div className="font-bold">시간 맞춰 알림</div>
                      <div className="mt-[2px] text-gray-600 text-xs">잠금화면에서 바로 응답</div>
                    </div>
                  </div>
                  <div className="items-center flex gap-3 p-1">
                    <div className="items-center flex justify-center w-6 h-6 bg-purple-100 rounded-xl">
                      <div className="w-2 h-2 bg-purple-500 rounded-sm"></div>
                    </div>
                    <div className="grow basis-[0%]">
                      <div className="font-bold">복용 이력 자동 기록</div>
                      <div className="mt-[2px] text-gray-600 text-xs">주간 리포트와 연결</div>
                    </div>
                  </div>
                  <div className="items-center flex gap-3 p-1">
                    <div className="items-center flex justify-center w-6 h-6 bg-purple-100 rounded-xl">
                      <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                    </div>
                    <div className="grow basis-[0%]">
                      <div className="font-bold">약물 정보 조회</div>
                      <div className="mt-[2px] text-gray-600 text-xs">식약처·임상 자료 기반</div>
                    </div>
                  </div>
                  <div className="grow basis-[0%]"></div>
                  <div className="items-center flex font-bold justify-center w-full h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
                    <span className="block">+ 약 추가하기</span>
                  </div>
                  <div className="text-center text-gray-600 text-xs">
                    <span className="text-center">약을 안 드시면 </span>
                    <b className="font-bold text-center text-gray-900">
                      <span className="text-center">건너뛰기</span>
                    </b>
                    <span className="text-center">도 가능해요</span>
                  </div>
                </div>
                <TabBar active="약" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">등록된 약 없음</figcaption>
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
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc6c151ccaccbf6d4f27c353b63b2bcd12df76e18.svg?generation=1778677418897488&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F5bb7a16bc2464cd65cd5dc20d5d0ce02db98a426.svg?generation=1778677418876595&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="items-center flex justify-between pt-2 pr-4 pb-1 pl-4">
                  <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
                    5월 13일
                  </div>
                  <div className="flex gap-1.5">
                    <div className="items-center flex justify-center w-9 h-9 bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                      <div className="overflow-hidden w-[14px] h-[14px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc9e88ecb3a87f7274e3e7692f5801de092f97e1f.svg?generation=1778677418898949&amp;alt=media" className="block size-full" />
                      </div>
                    </div>
                    <div className="items-center flex justify-center w-9 h-9 bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                      <div className="overflow-hidden w-[14px] h-[14px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F3c178cf4154d75bbfdb8a67c0f62d2d2b4f48a05.svg?generation=1778677418942841&amp;alt=media" className="block size-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="items-center flex flex-col grow justify-center text-center basis-[0%] gap-[14px] pt-5 pr-6 pb-[100px] pl-6">
                  <div className="relative text-center w-[180px] pt-4 pr-[10px] pb-[14px] pl-[10px]">
                    <div className="items-center flex text-center mb-[10px] gap-2.5 opacity-[0.5]">
                      <div className="text-center w-[30px] h-2 bg-purple-50 rounded-sm"></div>
                      <div className="text-center w-[6px] h-[6px] bg-[rgb(208,_201,_189)] rounded-[0.1875rem]"></div>
                      <div className="border-dashed grow text-center h-7 bg-purple-50 border-gray-400 border basis-[0%] rounded-lg"></div>
                    </div>
                    <div className="items-center flex text-center mb-[10px] gap-2.5 opacity-[0.5]">
                      <div className="text-center w-[30px] h-2 bg-purple-50 rounded-sm"></div>
                      <div className="text-center w-[6px] h-[6px] bg-[rgb(208,_201,_189)] rounded-[0.1875rem]"></div>
                      <div className="border-dashed grow text-center h-7 bg-purple-50 border-gray-400 border basis-[0%] rounded-lg"></div>
                    </div>
                    <div className="items-center flex text-center mb-[10px] gap-2.5 opacity-[0.5]">
                      <div className="text-center w-[30px] h-2 bg-purple-50 rounded-sm"></div>
                      <div className="text-center w-[6px] h-[6px] bg-[rgb(208,_201,_189)] rounded-[0.1875rem]"></div>
                      <div className="border-dashed grow text-center h-7 bg-purple-50 border-gray-400 border basis-[0%] rounded-lg"></div>
                    </div>
                    <div className="absolute text-center left-0 top-0 right-0 bottom-0" style={{"backgroundImage":"linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(255, 250, 240) 80%)"}}></div>
                  </div>
                  <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
                    <span className="text-center">오늘은 여유로운 하루</span>
                  </div>
                  <div className="text-center text-gray-600 leading-[20.15px] max-w-60">
                    <span className="text-center">예정된 일정이 없어요. 새로 추가하거나 외부 캘 린더를 연동해보세요.</span>
                  </div>
                  <div className="text-center h-1"></div>
                  <div className="items-center flex font-bold justify-center text-center h-[50px] bg-purple-500 shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[180px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
                    <span className="block text-center">+ 새 일정</span>
                  </div>
                  <div className="items-center flex font-bold justify-center text-center h-11 border border-gray-300 text-gray-700 text-sm tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.375rem]">
                    <span className="block text-center">Google 캘린더 연동하기</span>
                  </div>
                </div>
                <TabBar active="캘린더" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">오늘 일정 0개</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"2 / 1 / 3 / 2"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F28f734661b12bf31bf069a1fb1bd01859f05b995.svg?generation=1778677419046180&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd443d486cf369cadcfdfadca55a875835fc05871.svg?generation=1778677419047153&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="items-center flex justify-between pt-2 pr-5 pb-2 pl-5">
                  <div>
                    <div className="font-semibold text-gray-600 text-xs">
                      이번 주 · 5/12 — 5/18
                    </div>
                    <div className="font-extrabold mt-[2px] text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
                      주간 리포트
                    </div>
                  </div>
                  <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                    <span className="block">D-4</span>
                  </div>
                </div>
                <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-3 pr-4 pb-[100px] pl-4">
                  <div className="bg-purple-100 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] p-4 rounded-3xl">
                    <div className="items-center flex mb-2 gap-1.5">
                      <div className="overflow-hidden w-[14px] h-[14px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb8e7213d731b537eff064e9a8ad31fe60230f42a.svg?generation=1778677419056750&amp;alt=media" className="block size-full" />
                      </div>
                      <div className="font-bold text-purple-800 text-xs">
                        리포트 준비 중
                      </div>
                    </div>
                    <div className="font-extrabold text-lg leading-[23.4px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
                      3 / 7일 기록했어요
                    </div>
                    <div className="mt-[6px] text-purple-800 leading-normal opacity-[0.85]">
                      4일을 더 기록하면 첫 인사이트를 보여드릴 수 있어요
                    </div>
                    <div className="flex mt-[14px] gap-1.5">
                      <div className="grow text-center basis-[0%]">
                        <div className="items-center flex justify-center text-center h-8 bg-purple-500 rounded-lg">
                          <div className="overflow-hidden text-center w-3 h-3">
                            <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fe64d3fa44079721a57a35f94ca85c71607ad8956.svg?generation=1778677419118493&amp;alt=media" className="block size-full" />
                          </div>
                        </div>
                        <div className="font-semibold text-center mt-1 text-gray-600 text-xs">월</div>
                      </div>
                      <div className="grow text-center basis-[0%]">
                        <div className="items-center flex justify-center text-center h-8 bg-purple-500 rounded-lg">
                          <div className="overflow-hidden text-center w-3 h-3">
                            <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F6816b13950c23418e62e134875aa2b372fdbe0d7.svg?generation=1778677419124011&amp;alt=media" className="block size-full" />
                          </div>
                        </div>
                        <div className="font-semibold text-center mt-1 text-gray-600 text-xs">화</div>
                      </div>
                      <div className="grow text-center basis-[0%]">
                        <div className="items-center flex justify-center text-center h-8 bg-purple-500 rounded-lg">
                          <div className="overflow-hidden text-center w-3 h-3">
                            <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F31a1b88a449546fa3ee9c599889bac848b0b67fc.svg?generation=1778677419127027&amp;alt=media" className="block size-full" />
                          </div>
                        </div>
                        <div className="font-semibold text-center mt-1 text-gray-600 text-xs">수</div>
                      </div>
                      <div className="grow text-center basis-[0%]">
                        <div className="items-center border-dashed flex justify-center text-center h-8 bg-white/60 border-gray-400 border rounded-lg"></div>
                        <div className="font-semibold text-center mt-1 text-gray-600 text-xs">목</div>
                      </div>
                      <div className="grow text-center basis-[0%]">
                        <div className="items-center border-dashed flex justify-center text-center h-8 bg-white/60 border-gray-400 border rounded-lg"></div>
                        <div className="font-semibold text-center mt-1 text-gray-600 text-xs">금</div>
                      </div>
                      <div className="grow text-center basis-[0%]">
                        <div className="items-center border-dashed flex justify-center text-center h-8 bg-white/60 border-gray-400 border rounded-lg"></div>
                        <div className="font-semibold text-center mt-1 text-gray-600 text-xs">토</div>
                      </div>
                      <div className="grow text-center basis-[0%]">
                        <div className="items-center border-dashed flex justify-center text-center h-8 bg-white/60 border-gray-400 border rounded-lg"></div>
                        <div className="font-semibold text-center mt-1 text-gray-600 text-xs">일</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] p-[14px] rounded-2xl">
                    <div className="items-center flex gap-2.5">
                      <div className="items-center flex justify-center w-9 h-9 bg-gray-100 rounded-xl">
                        <div className="overflow-hidden w-3 h-3">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa9bfb190aeec59d19f0011156a73da9e6b89a0b6.svg?generation=1778677419142670&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-bold text-gray-600">감정 패턴</div>
                        <div className="mt-[2px] text-gray-500 text-xs">7일치 기록 필요</div>
                      </div>
                      <div className="w-2 h-2 bg-[rgb(208,_201,_189)] rounded-sm"></div>
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] p-[14px] rounded-2xl">
                    <div className="items-center flex gap-2.5">
                      <div className="items-center flex justify-center w-9 h-9 bg-gray-100 rounded-xl">
                        <div className="overflow-hidden w-3 h-3">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F3b8884a093141f0a6fa191341316aae00a5f96d2.svg?generation=1778677419178522&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-bold text-gray-600">약물 반응 분석</div>
                        <div className="mt-[2px] text-gray-500 text-xs">14일치 기록 필요</div>
                      </div>
                      <div className="w-2 h-2 bg-[rgb(208,_201,_189)] rounded-sm"></div>
                    </div>
                  </div>
                  <div className="bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] p-[14px] rounded-2xl">
                    <div className="items-center flex gap-2.5">
                      <div className="items-center flex justify-center w-9 h-9 bg-gray-100 rounded-xl">
                        <div className="overflow-hidden w-3 h-3">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F2228c80c9fbb3441b7c5a69cde45290326828c2a.svg?generation=1778677419198316&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                      <div className="grow basis-[0%]">
                        <div className="font-bold text-gray-600">수면-집중 상관관계</div>
                        <div className="mt-[2px] text-gray-500 text-xs">7일치 기록 필요</div>
                      </div>
                      <div className="w-2 h-2 bg-[rgb(208,_201,_189)] rounded-sm"></div>
                    </div>
                  </div>
                  <div className="grow basis-[0%]"></div>
                  <div className="items-center flex font-bold justify-center w-full h-[50px] bg-purple-500 shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
                    <span className="block">오늘 일지 마저 쓰기</span>
                  </div>
                </div>
                <TabBar active="홈" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">리포트 데이터 부족</figcaption>
        </figure>
        <figure className="items-center flex flex-col" style={{"gridArea":"2 / 2 / 3 / 3"}}>
          <div className="relative w-xs h-[640px] shrink-[0]">
            <div className="overflow-hidden relative w-xs h-[640px] bg-gray-50 shadow-[rgba(60,40,90,0.1)_0px_24px_50px_0px,_rgba(60,40,90,0.06)_0px_2px_8px_0px,_rgba(40,30,60,0.1)_0px_0px_0px_1.5px] text-sm rounded-[2.75rem]" style={{"fontFamily":"NanumSquare, -apple-system, system-ui"}}>
              <div className="items-center flex font-semibold justify-between absolute h-11 left-0 top-0 right-0 tracking-tight pt-4 pr-6 pb-0 pl-6 z-[30]">
                <div>
                  9:41
                </div>
                <div className="absolute w-[92px] h-[26px] left-[50%] top-2 bg-gray-950 translate-x-[-50%] rounded-2xl"></div>
                <div className="items-center flex gap-1">
                  <div className="overflow-hidden w-[15px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fbba48bbacae99320ce90f02f87f03cc297dced1f.svg?generation=1778677419287484&amp;alt=media" className="block size-full" />
                  </div>
                  <div className="overflow-hidden w-5 h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F4cf9ba0398e7965e88357d6f55ea11957ccb8669.svg?generation=1778677419288207&amp;alt=media" className="block size-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col absolute left-0 top-0 right-0 bottom-0 pt-11 pr-0 pb-0 pl-0">
                <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
                  <div className="items-center flex justify-between">
                    <div className="items-center flex justify-center w-11 h-11">
                      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                        <div className="overflow-hidden w-4 h-4">
                          <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F58fb2171c8e1e8d4620d12371f2c857d3f9bc06a.svg?generation=1778677419299929&amp;alt=media" className="block size-full" />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-sm">경험 공유</div>
                  </div>
                </div>
                <div className="pt-0 pr-4 pb-2 pl-4">
                  <div className="items-center flex bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] gap-2 p-[10px] rounded-[0.875rem]">
                    <div className="overflow-hidden w-[14px] h-[14px]">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fa531887dd688406d037c6913b8808b9c4141813a.svg?generation=1778677419332244&amp;alt=media" className="block size-full" />
                    </div>
                    <div className="grow font-bold basis-[0%]">
                      "주말 약 쉬기"
                    </div>
                    <div className="items-center flex justify-center w-7 h-7 bg-gray-100 rounded-[0.875rem]">
                      <div className="overflow-hidden w-[11px] h-[11px]">
                        <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F96f65ceee7d22efcca2adc2e46c0399576b96b96.svg?generation=1778677419358174&amp;alt=media" className="block size-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="items-center flex flex-col grow justify-center text-center basis-[0%] gap-[14px] pt-5 pr-6 pb-[100px] pl-6">
                  <div className="flex items-center justify-center text-center w-24 h-24">
                    <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
                  </div>
                  <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
                    <span className="text-center">아직 비슷한 이야기가 없어요</span>
                  </div>
                  <div className="text-center text-gray-600 leading-[20.15px] max-w-60">
                    <span className="text-center">첫 글을 남겨보면 어떨까요? 비슷한 경험을 가진 분들이 답을 줄 수도 있어요.</span>
                  </div>
                  <div className="flex flex-wrap justify-center text-center mt-1 gap-1.5">
                    <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                      <span className="block text-center">관련 · 콘서타</span>
                    </div>
                    <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                      <span className="block text-center">관련 · 약 휴식</span>
                    </div>
                  </div>
                  <div className="text-center h-1"></div>
                  <div className="items-center flex font-bold justify-center text-center h-[50px] bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[200px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
                    <div className="overflow-hidden text-center w-[13px] h-[13px]">
                      <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F9ad6e44aa94a072b9df2689dc321e5f682009317.svg?generation=1778677419429995&amp;alt=media" className="block size-full" />
                    </div>
                    <span className="block text-center ml-[6px]">
                      <span className="text-center">이 주제로 글쓰기</span>
                    </span>
                  </div>
                  <div className="items-center flex font-bold justify-center text-center h-11 text-sm tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.375rem]">
                    <span className="block text-center">전체 글 둘러보기</span>
                  </div>
                </div>
                <TabBar active="커뮤니티" />
              </div>
              <div className="absolute w-[104px] h-1 left-[50%] bottom-[7px] bg-black/18 translate-x-[-50%] rounded-full"></div>
            </div>
          </div>
          <figcaption className="font-semibold text-center mt-3 text-gray-700 text-xs tracking-tight leading-tight max-w-xs">커뮤니티 검색 결과 없음</figcaption>
        </figure>
      </div>
    </section>
  );
}

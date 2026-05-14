import React from 'react';

export default function CounselingPreparePage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
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
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="font-bold text-gray-600 text-xs">
              5월 16일 금 14:00까지
            </div>
            <div className="font-extrabold mt-1 text-lg leading-[24.3px]" style={{ fontFamily: "NanumSquare, system-ui" }}>
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
              <div className="text-center bg-gray-100 p-[10px] rounded-xl" style={{ gridArea: "1 / 1 / 2 / 2" }}>
                <div className="font-bold text-center text-gray-600 text-xs">복용</div>
                <div className="font-extrabold text-center mt-[2px] text-base" style={{ fontFamily: "NanumSquare, system-ui" }}>88%</div>
              </div>
              <div className="text-center bg-gray-100 p-[10px] rounded-xl" style={{ gridArea: "1 / 2 / 2 / 3" }}>
                <div className="font-bold text-center text-gray-600 text-xs">감정</div>
                <div className="font-extrabold text-center mt-[2px] text-base" style={{ fontFamily: "NanumSquare, system-ui" }}>6.2</div>
              </div>
              <div className="text-center bg-gray-100 p-[10px] rounded-xl" style={{ gridArea: "1 / 3 / 2 / 4" }}>
                <div className="font-bold text-center text-gray-600 text-xs">실수</div>
                <div className="font-extrabold text-center mt-[2px] text-base" style={{ fontFamily: "NanumSquare, system-ui" }}>7회</div>
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
              <div className="items-start flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
                <div className="items-center flex justify-center w-[18px] h-[18px] mt-[2px] bg-purple-500 shrink-[0] rounded-[0.5625rem]">
                  <div className="overflow-hidden w-[10px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fefc3d1b8024eaed0f9ca68769c039657e53d1ed2.svg?generation=1778677417694608&amp;alt=media" className="block size-full" />
                  </div>
                </div>
                <div className="grow basis-[0%] leading-normal">아침 식욕이 너무 없어요. 다른 약으로 바 꿔야 할까요?</div>
              </div>
              <div className="items-start flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
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
    </div>
  );
}

import React from 'react';

export default function CounselingResultPage() {
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
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
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
              <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
                <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                <div className="grow basis-[0%]">
                  콘서타{' '}
                  <s className="line-through text-gray-500" style={{ textDecoration: "line-through" }}>
                    <span style={{ textDecoration: "none" }}>18mg</span>
                  </s>
                  {' '}→{' '}
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
              <div className="pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
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
                {' '}알림으로 미리 알려드릴 게요
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

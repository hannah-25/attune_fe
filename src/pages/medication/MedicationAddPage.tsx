import React from 'react';

export default function MedicationAddPage() {
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
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fe7d20d8b962bf35f70391b037647deb6e498c04a.svg?generation=1778677415843284&amp;alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-bold text-sm">약 추가</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="font-bold text-purple-500">
                  저장
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-6 pl-4">
          <div className="items-center flex bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] gap-2 p-3 rounded-[1.125rem]">
            <div className="overflow-hidden w-[14px] h-[14px]">
              <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F617c79ed681b011cf58378b7ab214e9fffdccd9a.svg?generation=1778677415843289&amp;alt=media" className="block size-full" />
            </div>
            <div className="text-gray-600">
              약 이름 또는 성분
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="font-semibold w-[84px] text-gray-600">약 이름</div>
              <div className="grow font-semibold basis-[0%]">콘서타 18mg</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fca02c8082b11cdd7efc3bd4ec920b1b2a09af1d9.svg?generation=1778677415871573&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="font-semibold w-[84px] text-gray-600">용량/단위</div>
              <div className="grow font-semibold basis-[0%]">18mg · 1정</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff3b25369307edac67566499b953f3615e7f516fe.svg?generation=1778677415862590&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="font-semibold w-[84px] text-gray-600">복용 시작일</div>
              <div className="grow font-semibold basis-[0%]">2026.02.03</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0604012b966035933a418367f12cddcc0b9c9044.svg?generation=1778677415871763&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="font-semibold w-[84px] text-gray-600">복용 상태</div>
              <div className="grow font-semibold basis-[0%]">복용 중</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F0a900ef9cde7b2d73c139c2b1ead895e998b927b.svg?generation=1778677415871615&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="font-semibold w-[84px] text-gray-600">알림</div>
              <div className="grow font-semibold basis-[0%]">하루 2회 · 08:00 / 12:30</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F70864686cfb51667bb85fbc36effb4d3a23d9b27.svg?generation=1778677415927382&amp;alt=media" className="block size-full" />
              </div>
            </div>
          </div>
          <div>
            <div className="font-bold mb-[6px] text-gray-600">
              요일 반복
            </div>
            <div className="flex gap-1">
              <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-300 text-white basis-[0%] rounded-xl">월</div>
              <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-300 text-white basis-[0%] rounded-xl">화</div>
              <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-300 text-white basis-[0%] rounded-xl">수</div>
              <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-300 text-white basis-[0%] rounded-xl">목</div>
              <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-300 text-white basis-[0%] rounded-xl">금</div>
              <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-50 text-gray-600 basis-[0%] rounded-xl">토</div>
              <div className="items-center flex grow font-bold justify-center h-[38px] bg-purple-50 text-gray-600 basis-[0%] rounded-xl">일</div>
            </div>
          </div>
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="text-gray-800 leading-normal">
              <b className="font-bold">
                표준 정보
              </b>
              를 함께 보여드려요 — 효능, 부작용, 혈중 농도 추이까지.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

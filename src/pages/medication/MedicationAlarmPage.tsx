import React from 'react';

export default function MedicationAlarmPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-950  text-white text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="absolute left-0 top-0 right-0 bottom-0 pt-[70px] pr-0 pb-0 pl-0">
          <div className="ml-[12px] mr-[12px] backdrop-blur-[28px] backdrop-saturate-[1.8] bg-white/12 border-white/20 border p-4 rounded-3xl">
            <div className="items-center flex mb-[10px] gap-2.5">
              <div className="items-center flex justify-center w-9 h-9 bg-purple-500 rounded-lg">
                <div className="overflow-hidden w-[18px] h-[18px]">
                  <img src="/icons/5534b1eec38b1487b6a5ae5278ae9a3334c8cebf.svg" className="block size-full" />
                </div>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-bold">
                  attune
                </div>
                <div className="text-white/60 text-xs">
                  지금 · 복용 알림
                </div>
              </div>
            </div>
            <div className="font-bold mb-1 text-sm">
              콘서타 18mg 복용 시간이에요
            </div>
            <div className="mb-3 text-white/70">
              오후 12:30에 1정 복용
            </div>
            <div className="items-center flex gap-2">
              <div className="items-center flex font-extrabold justify-center h-11 bg-purple-300 shadow-[rgba(0,0,0,0.1)_0px_2px_0px_0px] text-purple-700 basis-[0%] text-sm gap-1.5 grow-[1.6] rounded-[1.375rem]">
                <div className="overflow-hidden w-[14px] h-[14px]">
                  <img src="/icons/2348d6782ef2c773bb3d7f6f6753005c36ff4e76.svg" className="block size-full" />
                </div>
                <span className="block">복용</span>
              </div>
              <div className="items-center flex grow font-bold justify-center h-11 bg-white/14 border-white/18 border basis-[0%] rounded-[1.375rem]">
                <span className="block">10분 후</span>
              </div>
              <div className="items-center flex font-semibold justify-center h-11 text-white/65 pt-0 pr-2 pb-0 pl-2">
                <span className="block">건너뛰기</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-[14px] text-white/40 text-xs">
            <span className="text-center">알림을 누르지 않아도 응답할 수 있어요</span>
          </div>
          <div className="absolute text-center left-0 right-0 bottom-20">
            <div className="text-center opacity-[0.6]">
              <span className="text-center">화요일, 5월 13일</span>
            </div>
            <div className="text-center text-[56px] leading-[56px]" style={{ fontFamily: "NanumSquare, system-ui" }}>
              <span className="text-center">12:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

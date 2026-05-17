import React from 'react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';

export default function EmptyReportPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
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
        <ScrollArea className="flex flex-col gap-3 pt-3">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] p-4 rounded-3xl">
            <div className="items-center flex mb-2 gap-1.5">
              <div className="overflow-hidden w-[14px] h-[14px]">
                <img src="/icons/b8e7213d731b537eff064e9a8ad31fe60230f42a.svg" className="block size-full" />
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
                    <img src="/icons/e64d3fa44079721a57a35f94ca85c71607ad8956.svg" className="block size-full" />
                  </div>
                </div>
                <div className="font-semibold text-center mt-1 text-gray-600 text-xs">월</div>
              </div>
              <div className="grow text-center basis-[0%]">
                <div className="items-center flex justify-center text-center h-8 bg-purple-500 rounded-lg">
                  <div className="overflow-hidden text-center w-3 h-3">
                    <img src="/icons/6816b13950c23418e62e134875aa2b372fdbe0d7.svg" className="block size-full" />
                  </div>
                </div>
                <div className="font-semibold text-center mt-1 text-gray-600 text-xs">화</div>
              </div>
              <div className="grow text-center basis-[0%]">
                <div className="items-center flex justify-center text-center h-8 bg-purple-500 rounded-lg">
                  <div className="overflow-hidden text-center w-3 h-3">
                    <img src="/icons/31a1b88a449546fa3ee9c599889bac848b0b67fc.svg" className="block size-full" />
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
                  <img src="/icons/a9bfb190aeec59d19f0011156a73da9e6b89a0b6.svg" className="block size-full" />
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
                  <img src="/icons/3b8884a093141f0a6fa191341316aae00a5f96d2.svg" className="block size-full" />
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
                  <img src="/icons/2228c80c9fbb3441b7c5a69cde45290326828c2a.svg" className="block size-full" />
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
        </ScrollArea>
        <TabBar active="홈" />
      </div>
    </div>
  );
}

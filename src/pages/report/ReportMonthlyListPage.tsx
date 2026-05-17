import React from 'react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

export default function ReportMonthlyListPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="월별 리포트"
          left={<HeaderIconButton src="/icons/e14e50b7bdfd7428cbb56e142f1b9b4b4604472f.svg" />}
          right={<HeaderIconButton src="/icons/b99cc316ee8c1de6c8ee95421ad392aa380cc367.svg" />}
        />
        <ScrollArea className="flex flex-col gap-2.5">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex gap-2.5">
              <div className="items-center flex justify-center w-11 h-11 bg-white rounded-[0.875rem]">
                <div className="overflow-hidden w-5 h-5">
                  <img src="/icons/ac208f40875f5400bac0798dddf883aef4f81033.svg" className="block size-full" />
                </div>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-extrabold text-base" style={{"fontFamily":"NanumSquare, system-ui"}}>2026년 5월</div>
                <div className="mt-[2px] text-gray-600 text-xs">진행 중 · 5/12 업데이트</div>
              </div>
            </div>
          </div>
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex gap-2.5">
              <div className="items-center flex justify-center w-11 h-11 bg-white rounded-[0.875rem]">
                <div className="overflow-hidden w-5 h-5">
                  <img src="/icons/a238e2945fc03c194c8e4f82d833297857660dde.svg" className="block size-full" />
                </div>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-extrabold text-base" style={{"fontFamily":"NanumSquare, system-ui"}}>2026년 4월</div>
                <div className="mt-[2px] text-gray-600 text-xs">완료 · 5/01 생성</div>
              </div>
              <div className="items-center flex justify-center w-8 h-8 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-2xl">
                <div className="overflow-hidden w-3 h-3">
                  <img src="/icons/24cb7e5a8ccc1f4217b30518f9cf3a266a3f29b5.svg" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex gap-2.5">
              <div className="items-center flex justify-center w-11 h-11 bg-white rounded-[0.875rem]">
                <div className="overflow-hidden w-5 h-5">
                  <img src="/icons/3feb942ec51132a0611f361e76167bfee580c937.svg" className="block size-full" />
                </div>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-extrabold text-base" style={{"fontFamily":"NanumSquare, system-ui"}}>2026년 3월</div>
                <div className="mt-[2px] text-gray-600 text-xs">완료 · 4/01 생성</div>
              </div>
              <div className="items-center flex justify-center w-8 h-8 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-2xl">
                <div className="overflow-hidden w-3 h-3">
                  <img src="/icons/a6cc01e07a79b47db32d2899bf71e28148c6ba2d.svg" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex gap-2.5">
              <div className="items-center flex justify-center w-11 h-11 bg-white rounded-[0.875rem]">
                <div className="overflow-hidden w-5 h-5">
                  <img src="/icons/801b6c1ef679c1953450c11d91afa25ef367f7b8.svg" className="block size-full" />
                </div>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-extrabold text-base" style={{"fontFamily":"NanumSquare, system-ui"}}>2026년 2월</div>
                <div className="mt-[2px] text-gray-600 text-xs">완료 · 3/01 생성</div>
              </div>
              <div className="items-center flex justify-center w-8 h-8 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-2xl">
                <div className="overflow-hidden w-3 h-3">
                  <img src="/icons/82a4c4789d85924077c71bc6bb25e08301e8694c.svg" className="block size-full" />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <TabBar active="리포트" variant="report" />
      </div>
    </div>
  );
}

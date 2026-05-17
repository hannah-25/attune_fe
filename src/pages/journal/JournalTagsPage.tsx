import React from 'react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';

export default function JournalTagsPage() {
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
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fbcac446ba747bd8f1ec89ed926d88e0f54b23c84.svg?generation=1778677415515783&alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-bold text-sm">태그 관리</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="font-bold text-purple-500">
                  완료
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollArea className="pt-0">
          <div className="flex gap-1 pt-1 pr-0 pb-3 pl-0">
            <div className="grow font-bold text-center text-purple-700 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[0.875rem]">감정·증상</div>
            <div className="grow font-medium text-center text-gray-400 basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[0.875rem]">부작용</div>
            <div className="grow font-medium text-center text-gray-400 basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[0.875rem]">업무</div>
            <div className="grow font-medium text-center text-gray-400 basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[0.875rem]">목표</div>
          </div>
          <div className="font-bold text-gray-800 text-xs pt-1 pr-1 pb-1.5 pl-1">
            활성 (8)
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="w-[10px] h-[10px] bg-purple-500 rounded-[0.3125rem]"></div>
              <div className="grow basis-[0%]">집중 어려움</div>
              <div className="text-gray-600 text-xs">
                3월부터
              </div>
              <div className="font-bold text-gray-500">
                비활성
              </div>
            </div>
            <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="w-[10px] h-[10px] bg-purple-500 rounded-[0.3125rem]"></div>
              <div className="grow basis-[0%]">멍해짐</div>
              <div className="text-gray-600 text-xs">
                3월부터
              </div>
              <div className="font-bold text-gray-500">
                비활성
              </div>
            </div>
            <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="w-[10px] h-[10px] bg-purple-500 rounded-[0.3125rem]"></div>
              <div className="grow basis-[0%]">짜증</div>
              <div className="text-gray-600 text-xs">
                3월부터
              </div>
              <div className="font-bold text-gray-500">
                비활성
              </div>
            </div>
            <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="w-[10px] h-[10px] bg-purple-500 rounded-[0.3125rem]"></div>
              <div className="grow basis-[0%]">불안</div>
              <div className="text-gray-600 text-xs">
                3월부터
              </div>
              <div className="font-bold text-gray-500">
                비활성
              </div>
            </div>
            <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3">
              <div className="w-[10px] h-[10px] bg-purple-500 rounded-[0.3125rem]"></div>
              <div className="grow basis-[0%]">무기력</div>
              <div className="text-gray-600 text-xs">
                3월부터
              </div>
              <div className="font-bold text-gray-500">
                비활성
              </div>
            </div>
          </div>
          <div className="font-bold text-gray-800 text-xs pt-4 pr-1 pb-1.5 pl-1">
            비활성 (2)
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 opacity-[0.6] border-b" style={{"borderBottomColor":"rgb(233, 228, 220)"}}>
              <div className="w-[10px] h-[10px] bg-[rgb(208,_201,_189)] rounded-[0.3125rem]"></div>
              <div className="grow basis-[0%]">두근거림</div>
              <div className="font-bold text-purple-500">
                활성화
              </div>
            </div>
            <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 opacity-[0.6]">
              <div className="w-[10px] h-[10px] bg-[rgb(208,_201,_189)] rounded-[0.3125rem]"></div>
              <div className="grow basis-[0%]">졸림</div>
              <div className="font-bold text-purple-500">
                활성화
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="items-center flex font-bold absolute h-[50px] right-4 bottom-[92px] bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.18)_0px_8px_22px_0px] text-white text-sm gap-1.5 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.5625rem]">
          <div className="overflow-hidden w-[14px] h-[14px]">
            <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F45b5c98660fdbad2a3fd50732df0b7dfbf18c395.svg?generation=1778677415542195&alt=media" className="block size-full" />
          </div>
          <span className="block">새 태그</span>
        </div>
        <TabBar active="일지" />
      </div>
    </div>
  );
}

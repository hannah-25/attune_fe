import React from 'react';
import logoImage from '@src/assets/logo.png';
import { Pencil, Search, X } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

export default function EmptyCommunitySearchPage() {
  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="relative flex flex-col flex-1 min-h-0">
        <TopBar
          title="경험 공유"
          left={<HeaderIconButton icon={<Search className="h-4 w-4 text-gray-700" strokeWidth={2.35} />} />}
        />
        <div className="pt-0 pr-4 pb-2 pl-4 shrink-0">
          <div className="items-center flex bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] gap-2 p-[10px] rounded-[0.875rem]">
            <Search className="w-[14px] h-[14px] text-gray-500" strokeWidth={2.4} />
            <div className="grow font-bold basis-[0%]">&quot;주말 약 챙기기&quot;</div>
            <div className="items-center flex justify-center w-7 h-7 bg-gray-100 rounded-[0.875rem]">
              <X className="w-[11px] h-[11px] text-gray-500" strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <ScrollArea className="items-center flex flex-col text-center gap-[14px] pt-8 px-6">
          <div className="flex items-center justify-center text-center w-24 h-24 shrink-0 overflow-visible">
            <img src={logoImage} alt="attune" className="block w-full h-full object-contain" />
          </div>
          <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
            <span className="text-center">아직 비슷한 이야기가 없어요</span>
          </div>
          <div className="text-center text-gray-600 leading-[20.15px] max-w-60">
            <span className="text-center">첫 글을 남기면 같은 경험을 가진 분들에게 도움이 될 수 있어요.</span>
          </div>
          <div className="flex flex-wrap justify-center text-center mt-1 gap-1.5">
            <Chip>관련 콘텐츠 없음</Chip>
            <Chip>관련 검색 없음</Chip>
          </div>
          <button type="button" className="items-center flex font-bold justify-center text-center h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[200px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
            <Pencil className="w-[14px] h-[14px] mr-1.5" strokeWidth={2.5} />
            <span className="block text-center">새 주제로 글쓰기</span>
          </button>
          <button type="button" className="items-center flex font-bold justify-center text-center h-11 text-sm tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.375rem]">
            <span className="block text-center">전체 글 둘러보기</span>
          </button>
        </ScrollArea>
        <TabBar active="커뮤니티" />
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">{children}</div>;
}

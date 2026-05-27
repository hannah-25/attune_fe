import logoImage from '@src/assets/emotion2.png';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { TopBar } from '@/components/TopBar';
import { NavBackButton, NavCloseButton } from '@/components/NavButtons';

export default function EmptyJournalPage() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="relative flex flex-col flex-1 min-h-0">
        <TopBar
          title="오늘 일지"
          left={<NavBackButton />}
          right={<NavCloseButton />}
        />
        <ScrollArea className="items-center flex flex-col text-center gap-4 pt-10 px-6">
          <div className="flex items-center justify-center text-center w-28 h-28 shrink-0 overflow-visible mb-1">
            <img src={logoImage} alt="attune" className="block w-full h-full object-contain" />
          </div>
          <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
            <span className="text-center">오늘은 어떤 하루였나요?</span>
          </div>
          <div className="text-center text-gray-600 leading-[20.15px] max-w-[220px]">
            <span className="text-center">짧은 감정 하나, 컨디션 한 줄도 좋아요.</span><br />
            <span className="text-center">하루 1번이면 충분해요.</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/journal/write')}
            className="items-center flex font-bold justify-center text-center h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[200px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]"
          >
            <span className="block text-center">첫 기록 시작</span>
          </button>
        </ScrollArea>
        <TabBar active="일지" />
      </div>
    </div>
  );
}

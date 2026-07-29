import React from 'react';
import { Check, Clock, LineChart, Pill, Target } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { TopBar } from '@/components/TopBar';

export default function EmptyReportPage() {
  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="주간 리포트" reserveLeft />
        <ScrollArea className="flex flex-col gap-3 pt-3">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] p-4 rounded-3xl">
            <div className="items-center flex mb-2 gap-1.5">
              <LineChart className="w-[14px] h-[14px] text-purple-700" strokeWidth={2.5} />
              <div className="font-bold text-purple-800 text-xs">리포트 준비 중</div>
            </div>
            <div className="font-extrabold text-lg leading-[23.4px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>3 / 7일 기록했어요</div>
            <div className="mt-[6px] text-purple-800 leading-normal opacity-[0.85]">
              4일을 더 기록하면 첫 인사이트를 보여드릴 수 있어요.
            </div>
            <div className="flex mt-[14px] gap-1.5">
              {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
                <div key={day} className="grow text-center basis-[0%]">
                  <div className={`items-center flex justify-center text-center h-8 rounded-lg ${index < 3 ? 'bg-purple-500' : 'bg-white/60 border-dashed border-gray-400 border'}`}>
                    {index < 3 ? <Check className="w-3 h-3 text-white" strokeWidth={3} /> : null}
                  </div>
                  <div className="font-semibold text-center mt-1 text-gray-600 text-xs">{day}</div>
                </div>
              ))}
            </div>
          </div>
          <Requirement icon={<LineChart className="w-4 h-4 text-gray-500" strokeWidth={2.4} />} title="감정 패턴" text="7일치 기록 필요" />
          <Requirement icon={<Pill className="w-4 h-4 text-gray-500" strokeWidth={2.4} />} title="약물 반응 분석" text="14일치 기록 필요" />
          <Requirement icon={<Target className="w-4 h-4 text-gray-500" strokeWidth={2.4} />} title="수면-집중 상관관계" text="7일치 기록 필요" />
          <div className="grow basis-[0%]"></div>
          <button type="button" className="items-center flex font-bold justify-center w-full h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
            <Clock className="w-4 h-4 mr-1.5" strokeWidth={2.5} />
            <span className="block">오늘 일지 마저 쓰기</span>
          </button>
        </ScrollArea>
        <TabBar active="리포트" />
      </div>
    </div>
  );
}

function Requirement({ icon, text, title }: { icon: React.ReactNode; text: string; title: string }) {
  return (
    <div className="bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] p-[14px] rounded-2xl">
      <div className="items-center flex gap-2.5">
        <div className="items-center flex justify-center w-9 h-9 bg-gray-100 rounded-xl">{icon}</div>
        <div className="grow basis-[0%]">
          <div className="font-bold text-gray-600">{title}</div>
          <div className="mt-[2px] text-gray-500 text-xs">{text}</div>
        </div>
        <div className="w-2 h-2 bg-[rgb(208,201,189)] rounded-sm"></div>
      </div>
    </div>
  );
}

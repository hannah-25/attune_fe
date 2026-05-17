import React from 'react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { formatDateRange, getWeekStart, getWeekEnd } from '@/lib/date';

const WEEKLY_STATS = {
  adherence: { value: '86%', delta: '+12%' },
  emotion: { value: '6.4', delta: '+0.8' },
  mistakes: { value: '4번', delta: '-2' },
  goalAchievement: { value: '72%', delta: '+5%' },
};

const INSIGHT = '아침 약 복용 직후 2시간 동안 집중력 점수가 평균 +24% 더 높았어요. 점심 약을 놓친 날에는 오후 업무 실수가 늘었습니다.';

const CHART_DATA = [
  { day: '월', score: 7 },
  { day: '화', score: 10 },
  { day: '수', score: 6.3 },
  { day: '목', score: 9 },
  { day: '금', score: 10.8 },
  { day: '토', score: 8 },
  { day: '일', score: 5 },
];
const MAX_SCORE = Math.max(...CHART_DATA.map((d) => d.score));
const CHART_MAX_PX = 60;

const today = new Date();
const weekRange = formatDateRange(getWeekStart(today), getWeekEnd(today));

export default function ReportWeeklyPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="items-center flex justify-between pt-2 pr-5 pb-2 pl-5">
          <div>
            <div className="font-semibold text-gray-600">
              이번 주 · {weekRange}
            </div>
            <div className="font-extrabold mt-[2px] text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
              주간 리포트
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block">주</span>
            </div>
            <div className="items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block">월</span>
            </div>
          </div>
        </div>
        <ScrollArea className="flex flex-col gap-3 pt-2">
          <div className="grid-cols-2 grid gap-2">
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"1 / 1 / 2 / 2"}}>
              <div className="font-bold text-gray-600 text-xs">복용률</div>
              <div className="items-baseline flex mt-1 gap-1.5">
                <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>{WEEKLY_STATS.adherence.value}</div>
                <div className="font-bold text-purple-500 text-xs">{WEEKLY_STATS.adherence.delta}</div>
              </div>
              <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F29bab1a2a939a1798ef21544b448b021e92c841b.svg?generation=1778677416843595&amp;alt=media" className="inline w-full h-[22px]" />
              </div>
            </div>
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"1 / 2 / 2 / 3"}}>
              <div className="font-bold text-gray-600 text-xs">감정 점수</div>
              <div className="items-baseline flex mt-1 gap-1.5">
                <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>{WEEKLY_STATS.emotion.value}</div>
                <div className="font-bold text-purple-500 text-xs">{WEEKLY_STATS.emotion.delta}</div>
              </div>
              <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F079248c9c05bf2a8ced8a946065bc39baecf7473.svg?generation=1778677416881624&amp;alt=media" className="inline w-full h-[22px]" />
              </div>
            </div>
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"2 / 1 / 3 / 2"}}>
              <div className="font-bold text-gray-600 text-xs">업무 실수</div>
              <div className="items-baseline flex mt-1 gap-1.5">
                <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>{WEEKLY_STATS.mistakes.value}</div>
                <div className="font-bold text-purple-500 text-xs">{WEEKLY_STATS.mistakes.delta}</div>
              </div>
              <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ff4a6d797bb793072d789367828a443e5a3297fa7.svg?generation=1778677416923648&amp;alt=media" className="inline w-full h-[22px]" />
              </div>
            </div>
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"2 / 2 / 3 / 3"}}>
              <div className="font-bold text-gray-600 text-xs">목표 달성</div>
              <div className="items-baseline flex mt-1 gap-1.5">
                <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>{WEEKLY_STATS.goalAchievement.value}</div>
                <div className="font-bold text-purple-500 text-xs">{WEEKLY_STATS.goalAchievement.delta}</div>
              </div>
              <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F87ed74a4448280e959a96d7e4625b1ee725f06bb.svg?generation=1778677416944396&amp;alt=media" className="inline w-full h-[22px]" />
              </div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex mb-2 gap-1.5">
              <div className="items-center flex font-extrabold justify-center w-[22px] h-[22px] bg-[rgb(31,_27,_46)] text-white rounded-[0.6875rem]">
                <span className="block">AI</span>
              </div>
              <div className="font-bold">
                이번 주 인사이트
              </div>
              <div className="grow basis-[0%]"></div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F388852ae9b8893331e137329a4bd0b282dce0126.svg?generation=1778677416950867&amp;alt=media" className="block size-full" />
              </div>
            </div>
            <div className="mb-2 text-gray-800 leading-[20.15px]">
              {INSIGHT}
            </div>
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-2 rounded-lg">
              <div className="text-gray-800 text-xs leading-[16.5px]">
                ⚠︎ AI 분석은 진단이 아닌 패턴 관찰입니다.
              </div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="font-bold mb-[10px]">
              요일별 감정 점수
            </div>
            <div className="items-end flex h-[70px] gap-1.5">
              {CHART_DATA.map((d) => (
                <div key={d.day} className="items-center flex flex-col grow basis-[0%] gap-1">
                  <div
                    className="w-full bg-purple-500 rounded-md"
                    style={{ height: `${Math.round((d.score / MAX_SCORE) * CHART_MAX_PX)}px` }}
                  />
                  <div className="font-bold text-gray-600 text-xs">{d.day}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        <TabBar active="리포트" variant="report" />
      </div>
    </div>
  );
}

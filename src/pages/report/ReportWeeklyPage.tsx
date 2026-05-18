import React, { useState } from 'react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { formatDateRange, getWeekStart, getWeekEnd } from '@/lib/date';
import { mockWeeklyStats, mockMonthlyStats, mockWeeklyInsight, mockMonthlyInsight, mockWeeklyChartData, mockMonthlyChartData } from '@/mocks/report.mock';

const WEEKLY_STATS = mockWeeklyStats;
const MONTHLY_STATS = mockMonthlyStats;
const INSIGHT = mockWeeklyInsight;
const MONTHLY_INSIGHT = mockMonthlyInsight;
const WEEKLY_CHART_DATA = mockWeeklyChartData;
const MONTHLY_CHART_DATA = mockMonthlyChartData;

const CHART_MAX_PX = 60;

const today = new Date();
const weekRange = formatDateRange(getWeekStart(today), getWeekEnd(today));

export default function ReportWeeklyPage() {
  const [view, setView] = useState<'주' | '월'>('주');

  const stats = view === '주' ? WEEKLY_STATS : MONTHLY_STATS;
  const insight = view === '주' ? INSIGHT : MONTHLY_INSIGHT;
  const chartData = view === '주' ? WEEKLY_CHART_DATA : MONTHLY_CHART_DATA;
  const maxScore = Math.max(...chartData.map((d) => d.score));

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="items-center flex justify-between pt-2 pr-5 pb-2 pl-5">
          <div>
            <div className="font-semibold text-gray-600">
              {view === '주' ? `이번 주 · ${weekRange}` : '이번 달'}
            </div>
            <div className="font-extrabold mt-[2px] text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>
              {view === '주' ? '주간 리포트' : '월간 리포트'}
            </div>
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setView('주')}
              className={`items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem] transition-colors ${
                view === '주' ? 'bg-purple-100 text-purple-800' : 'text-gray-500'
              }`}
            >
              <span className="block">주</span>
            </button>
            <button
              type="button"
              onClick={() => setView('월')}
              className={`items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem] transition-colors ${
                view === '월' ? 'bg-purple-100 text-purple-800' : 'text-gray-500'
              }`}
            >
              <span className="block">월</span>
            </button>
          </div>
        </div>
        <ScrollArea className="flex flex-col gap-3 pt-2">
          <div className="grid-cols-2 grid gap-2">
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"1 / 1 / 2 / 2"}}>
              <div className="font-bold text-gray-600 text-xs">복용률</div>
              <div className="items-baseline flex mt-1 gap-1.5">
                <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>{stats.adherence.value}</div>
                <div className="font-bold text-purple-500 text-xs">{stats.adherence.delta}</div>
              </div>
              <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                <img src="/icons/29bab1a2a939a1798ef21544b448b021e92c841b.svg" className="inline w-full h-[22px]" />
              </div>
            </div>
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"1 / 2 / 2 / 3"}}>
              <div className="font-bold text-gray-600 text-xs">감정 점수</div>
              <div className="items-baseline flex mt-1 gap-1.5">
                <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>{stats.emotion.value}</div>
                <div className="font-bold text-purple-500 text-xs">{stats.emotion.delta}</div>
              </div>
              <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                <img src="/icons/079248c9c05bf2a8ced8a946065bc39baecf7473.svg" className="inline w-full h-[22px]" />
              </div>
            </div>
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"2 / 1 / 3 / 2"}}>
              <div className="font-bold text-gray-600 text-xs">업무 실수</div>
              <div className="items-baseline flex mt-1 gap-1.5">
                <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>{stats.mistakes.value}</div>
                <div className="font-bold text-purple-500 text-xs">{stats.mistakes.delta}</div>
              </div>
              <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                <img src="/icons/f4a6d797bb793072d789367828a443e5a3297fa7.svg" className="inline w-full h-[22px]" />
              </div>
            </div>
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl" style={{"gridArea":"2 / 2 / 3 / 3"}}>
              <div className="font-bold text-gray-600 text-xs">목표 달성</div>
              <div className="items-baseline flex mt-1 gap-1.5">
                <div className="font-extrabold text-2xl" style={{"fontFamily":"NanumSquare, system-ui"}}>{stats.goalAchievement.value}</div>
                <div className="font-bold text-purple-500 text-xs">{stats.goalAchievement.delta}</div>
              </div>
              <div className="inline overflow-hidden w-full h-[22px] mt-[6px]">
                <img src="/icons/87ed74a4448280e959a96d7e4625b1ee725f06bb.svg" className="inline w-full h-[22px]" />
              </div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex mb-2 gap-1.5">
              <div className="items-center flex font-extrabold justify-center w-[22px] h-[22px] bg-[rgb(31,_27,_46)] text-white rounded-[0.6875rem]">
                <span className="block">AI</span>
              </div>
              <div className="font-bold">
                {view === '주' ? '이번 주 인사이트' : '이번 달 인사이트'}
              </div>
              <div className="grow basis-[0%]"></div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/388852ae9b8893331e137329a4bd0b282dce0126.svg" className="block size-full" />
              </div>
            </div>
            <div className="mb-2 text-gray-800 leading-[20.15px]">
              {insight}
            </div>
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-2 rounded-lg">
              <div className="text-gray-800 text-xs leading-[16.5px]">
                ⚠︎ AI 분석은 진단이 아닌 패턴 관찰입니다.
              </div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="font-bold mb-[10px]">
              {view === '주' ? '요일별 감정 점수' : '주차별 감정 점수'}
            </div>
            <div className="items-end flex h-[70px] gap-1.5">
              {chartData.map((d) => (
                <div key={d.day} className="items-center flex flex-col grow basis-[0%] gap-1">
                  <div
                    className="w-full bg-purple-500 rounded-md transition-all"
                    style={{ height: `${Math.round((d.score / maxScore) * CHART_MAX_PX)}px` }}
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

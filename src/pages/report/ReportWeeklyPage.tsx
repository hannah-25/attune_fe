import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { formatDateRange, getWeekEnd, getWeekStart } from '@/lib/date';
import { mockMonthlyChartData, mockMonthlyInsight, mockMonthlyStats, mockWeeklyChartData, mockWeeklyInsight, mockWeeklyStats } from '@/mocks/report.mock';

const CHART_MAX_PX = 60;
const today = new Date();
const weekRange = formatDateRange(getWeekStart(today), getWeekEnd(today));

export default function ReportWeeklyPage() {
  const [view, setView] = useState<'주' | '월'>('주');
  const stats = view === '주' ? mockWeeklyStats : mockMonthlyStats;
  const insight = view === '주' ? mockWeeklyInsight : mockMonthlyInsight;
  const chartData = view === '주' ? mockWeeklyChartData : mockMonthlyChartData;
  const maxScore = Math.max(...chartData.map((d) => d.score));

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="items-center flex justify-between pt-2 pr-5 pb-2 pl-5">
          <div>
            <div className="font-semibold text-gray-600">{view === '주' ? `이번 주 · ${weekRange}` : '이번 달'}</div>
            <div className="font-extrabold mt-[2px] text-2xl" style={{ fontFamily: 'NanumSquare, system-ui' }}>{view === '주' ? '주간 리포트' : '월간 리포트'}</div>
          </div>
          <div className="flex gap-1.5">
            {(['주', '월'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                className={`items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem] transition-colors ${view === mode ? 'bg-purple-100 text-purple-800' : 'text-gray-500'}`}
              >
                <span className="block">{mode}</span>
              </button>
            ))}
          </div>
        </div>
        <ScrollArea className="flex flex-col gap-3 pt-2">
          <div className="grid-cols-2 grid gap-2">
            <MetricCard title="복용률" value={stats.adherence.value} delta={stats.adherence.delta} bars={[30, 44, 34, 52, 48]} />
            <MetricCard title="감정 점수" value={stats.emotion.value} delta={stats.emotion.delta} bars={[28, 52, 36, 48, 58]} />
            <MetricCard title="업무 실수" value={stats.mistakes.value} delta={stats.mistakes.delta} bars={[54, 42, 36, 28, 22]} />
            <MetricCard title="목표 달성" value={stats.goalAchievement.value} delta={stats.goalAchievement.delta} bars={[26, 34, 42, 48, 54]} />
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex mb-2 gap-1.5">
              <div className="items-center flex font-extrabold justify-center w-[22px] h-[22px] bg-[rgb(31,27,46)] text-white rounded-[0.6875rem]">AI</div>
              <div className="font-bold">{view === '주' ? '이번 주 인사이트' : '이번 달 인사이트'}</div>
              <div className="grow basis-[0%]"></div>
              <Info className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />
            </div>
            <div className="mb-2 text-gray-800 leading-[20.15px]">{insight}</div>
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-2 rounded-lg">
              <div className="text-gray-800 text-xs leading-[16.5px]">AI 분석은 진단이 아닌 패턴 관찰입니다.</div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="font-bold mb-[10px]">{view === '주' ? '요일별 감정 점수' : '주차별 감정 점수'}</div>
            <div className="items-end flex h-[70px] gap-1.5">
              {chartData.map((d) => (
                <div key={d.day} className="items-center flex flex-col grow basis-[0%] gap-1">
                  <div className="w-full bg-purple-500 rounded-md transition-all" style={{ height: `${Math.round((d.score / maxScore) * CHART_MAX_PX)}px` }} />
                  <div className="font-bold text-gray-600 text-xs">{d.day}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
        <TabBar active="리포트" />
      </div>
    </div>
  );
}

function MetricCard({ bars, delta, title, value }: { bars: number[]; delta: string; title: string; value: string }) {
  return (
    <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
      <div className="font-bold text-gray-600 text-xs">{title}</div>
      <div className="items-baseline flex mt-1 gap-1.5">
        <div className="font-extrabold text-2xl" style={{ fontFamily: 'NanumSquare, system-ui' }}>{value}</div>
        <div className="font-bold text-purple-500 text-xs">{delta}</div>
      </div>
      <div className="items-end flex h-[22px] mt-[6px] gap-1">
        {bars.map((height, index) => <div key={index} className="grow bg-purple-300 rounded-sm" style={{ height: `${height}%` }} />)}
      </div>
    </div>
  );
}

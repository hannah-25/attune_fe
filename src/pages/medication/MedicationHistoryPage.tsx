import React, { useState } from 'react';
import { CalendarDays, ChevronLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { mockHistoryStats, mockHistoryGroups } from '@/mocks/medication.mock';

type Period = '1주' | '1개월' | '3개월' | '직접';

const PERIODS: Period[] = ['1주', '1개월', '3개월', '직접'];

const STATS_MAP = mockHistoryStats;

const HISTORY_GROUPS = mockHistoryGroups;

export default function MedicationHistoryPage() {
  const [activePeriod, setActivePeriod] = useState<Period>('1개월');
  const stats = STATS_MAP[activePeriod];

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="복용 이력"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
          right={<HeaderIconButton icon={<CalendarDays className="h-4 w-4 text-gray-700" strokeWidth={2.35} />} />}
        />
        <div className="flex gap-1.5 pt-0 pr-4 pb-3 pl-4">
          {PERIODS.map((period) => {
            const selected = activePeriod === period;

            return (
              <button
                key={period}
                type="button"
                onClick={() => setActivePeriod(period)}
                className={`items-center flex grow font-bold justify-center h-[30px] basis-[0%] rounded-[0.9375rem] transition-colors ${
                  selected ? 'bg-[rgb(31,27,46)] text-white' : 'bg-white text-gray-700'
                }`}
              >
                {period}
              </button>
            );
          })}
        </div>
        <ScrollArea>
          <div className="mb-3 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
            <div className="flex justify-around">
              <Stat value={stats.rate} label="복용률" />
              <Stat value={stats.taken} label="복용" />
              <Stat value={stats.missed} label="미복용" />
              <Stat value={stats.delayed} label="미루기" />
            </div>
          </div>
          {HISTORY_GROUPS.map((group) => (
            <div key={group.date} className="mb-[14px]">
              <div className="font-bold mb-[6px] text-gray-600 pt-0 pr-1 pb-0 pl-1">{group.date}</div>
              <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
                {group.items.map((item, index) => (
                  <div
                    key={`${group.date}-${item.text}-${index}`}
                    className={`items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 ${
                      index < group.items.length - 1 ? 'border-b' : ''
                    }`}
                    style={{ borderBottomColor: 'rgb(233, 228, 220)' }}
                  >
                    <div className={`items-center flex justify-center w-[18px] h-[18px] rounded-[0.5625rem] ${item.muted ? 'bg-purple-50' : 'bg-purple-300'}`}>
                      {item.icon ? (
                        <div className="overflow-hidden w-[10px] h-[10px]">
                          <img src={item.icon} alt="" className="block size-full" />
                        </div>
                      ) : null}
                    </div>
                    <div className="grow basis-[0%]">{item.text}</div>
                    <div className="font-bold uppercase text-gray-500 text-xs">{item.status}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
        <TabBar active="약" />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="font-extrabold text-center text-lg" style={{ fontFamily: 'NanumSquare, system-ui' }}>
        {value}
      </div>
      <div className="text-center mt-[2px] text-gray-600 text-xs">{label}</div>
    </div>
  );
}

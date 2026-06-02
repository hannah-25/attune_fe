import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { getAllMedicationLogs, type MedicationPeriodLog } from '@/api/medication';

type HistoryPeriod = '1주' | '1개월' | '3개월' | '직접';
const PERIODS: HistoryPeriod[] = ['1주', '1개월', '3개월', '직접'];

export default function MedicationHistoryPage() {
  const [activePeriod, setActivePeriod] = useState<HistoryPeriod>('1개월');
  const [logs, setLogs] = useState<MedicationPeriodLog[]>([]);
  const [error, setError] = useState('');
  const range = useMemo(() => getRange(activePeriod), [activePeriod]);
  const stats = useMemo(() => getStats(logs), [logs]);
  const groups = useMemo(() => groupLogs(logs), [logs]);

  useEffect(() => {
    let ignore = false;

    getAllMedicationLogs(range)
      .then((response) => {
        if (!ignore) setLogs(extractLogs(response));
      })
      .catch(() => {
        if (!ignore) setError('복용 이력을 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, [range]);

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="복용 이력"
          left={<NavBackButton />}
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
                className={`items-center flex grow font-bold justify-center h-[30px] basis-[0%] rounded-[0.9375rem] transition-colors ${selected ? 'bg-[rgb(31,27,46)] text-white' : 'bg-white text-gray-700'}`}
              >
                {period}
              </button>
            );
          })}
        </div>
        <ScrollArea>
          {error ? <div className="text-red-500 text-xs px-1 pb-2">{error}</div> : null}
          <div className="mb-3 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
            <div className="flex justify-around">
              <Stat value={stats.rate} label="복용률" />
              <Stat value={stats.taken} label="복용" />
              <Stat value={stats.missed} label="미복용" />
              <Stat value={stats.delayed} label="미루기" />
            </div>
          </div>
          {groups.map((group) => (
            <div key={group.date} className="mb-[14px]">
              <div className="font-bold mb-[6px] text-gray-600 pt-0 pr-1 pb-0 pl-1">{group.date}</div>
              <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
                {group.items.map((item, index) => (
                  <div
                    key={`${group.date}-${item.text}-${index}`}
                    className={`items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 ${index < group.items.length - 1 ? 'border-b' : ''}`}
                    style={{ borderBottomColor: 'rgb(233, 228, 220)' }}
                  >
                    <div className={`items-center flex justify-center w-[18px] h-[18px] rounded-[0.5625rem] ${item.muted ? 'bg-purple-50' : 'bg-purple-300'}`}>
                      {item.muted ? <Clock className="w-[10px] h-[10px] text-purple-500" strokeWidth={2.5} /> : <Check className="w-[10px] h-[10px] text-white" strokeWidth={3} />}
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
      <div className="font-extrabold text-center text-lg" style={{ fontFamily: 'NanumSquare, system-ui' }}>{value}</div>
      <div className="text-center mt-[2px] text-gray-600 text-xs">{label}</div>
    </div>
  );
}

function getRange(period: HistoryPeriod) {
  const end = new Date();
  const start = new Date();
  const days = period === '1주' ? 7 : period === '3개월' ? 90 : 30;
  start.setDate(end.getDate() - days + 1);
  return { startDate: toDateKey(start), endDate: toDateKey(end) };
}

function extractLogs(response: unknown): MedicationPeriodLog[] {
  if (Array.isArray(response)) {
    return normalizeLogs(response);
  }

  if (response && typeof response === 'object' && 'logs' in response && Array.isArray((response as { logs: unknown }).logs)) {
    return normalizeLogs((response as { logs: unknown[] }).logs);
  }

  return [];
}

function normalizeLogs(source: unknown[]): MedicationPeriodLog[] {
  return source
    .map((item) => normalizeLog(item))
    .filter((item): item is MedicationPeriodLog => item !== null);
}

function normalizeLog(raw: unknown): MedicationPeriodLog | null {
  if (!raw || typeof raw !== 'object') return null;

  const item = raw as {
    userMedicationId?: unknown;
    name?: unknown;
    intakeTime?: unknown;
    taken?: unknown;
    takenAt?: unknown;
    status?: unknown;
    medicationName?: unknown;
  };

  if (typeof item.intakeTime === 'string' && typeof item.taken === 'boolean') {
    return {
      userMedicationId: typeof item.userMedicationId === 'number' ? item.userMedicationId : 0,
      name: typeof item.name === 'string' && item.name.trim() ? item.name : '복용 약',
      intakeTime: item.intakeTime,
      taken: item.taken,
    };
  }

  if (typeof item.takenAt === 'string' && typeof item.status === 'string') {
    return {
      userMedicationId: typeof item.userMedicationId === 'number' ? item.userMedicationId : 0,
      name:
        typeof item.name === 'string' && item.name.trim()
          ? item.name
          : typeof item.medicationName === 'string' && item.medicationName.trim()
            ? item.medicationName
            : '복용 약',
      intakeTime: item.takenAt,
      taken: item.status === 'TAKEN',
    };
  }

  return null;
}

function getStats(logs: MedicationPeriodLog[]) {
  const taken = logs.filter((log) => log.taken).length;
  const missed = logs.filter((log) => !log.taken).length;
  const total = logs.length;
  const rate = total > 0 ? Math.round((taken / total) * 100) : 0;
  return { rate: `${rate}%`, taken: String(taken), missed: String(missed), delayed: '0' };
}

function groupLogs(logs: MedicationPeriodLog[]) {
  const groups = new Map<string, MedicationPeriodLog[]>();
  logs.forEach((log) => {
    const date = formatDate(log.intakeTime);
    groups.set(date, [...(groups.get(date) ?? []), log]);
  });

  return Array.from(groups.entries()).map(([date, items]) => ({
    date,
    items: items.map((item) => ({
      text: `${formatTime(item.intakeTime)} ${item.name}`,
      status: item.taken ? '복용' : '미복용',
      muted: !item.taken,
    })),
  }));
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(11, 16);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

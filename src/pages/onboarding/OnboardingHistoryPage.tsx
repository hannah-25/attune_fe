import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ClipboardList, ChevronRight, CalendarDays } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { getOnboardingStatus } from '@/api/onboarding';
import { formatLongDate } from '@/lib/date';

type CheckRecord = {
  id: string;
  doneAt: string;
  asrsLevel: 'low' | 'medium' | 'high';
  goalCount: number;
};

const ASRS_LABEL: Record<CheckRecord['asrsLevel'], string> = {
  low: '낮음',
  medium: '보통',
  high: '높음',
};

const ASRS_COLOR: Record<CheckRecord['asrsLevel'], string> = {
  low: 'text-green-600 bg-green-50',
  medium: 'text-yellow-600 bg-yellow-50',
  high: 'text-red-600 bg-red-50',
};

// 실제 API가 이력을 지원하기 전까지 최신 1건은 서버에서, 나머지는 mock
const MOCK_OLDER_RECORDS: CheckRecord[] = [
  { id: 'mock-1', doneAt: '2025-09-12T14:23:00', asrsLevel: 'medium', goalCount: 3 },
  { id: 'mock-2', doneAt: '2025-06-04T10:00:00', asrsLevel: 'high', goalCount: 2 },
];

export default function OnboardingHistoryPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<CheckRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    getOnboardingStatus()
      .then((status) => {
        if (ignore) return;
        const next: CheckRecord[] = [];
        if (status.onboarded && status.onboardedAt) {
          next.push({ id: 'latest', doneAt: status.onboardedAt, asrsLevel: 'medium', goalCount: 3 });
        }
        next.push(...MOCK_OLDER_RECORDS);
        setRecords(next);
      })
      .catch((err) => {
        console.error('Failed to load check history:', err);
        if (!ignore) setRecords(MOCK_OLDER_RECORDS);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => { ignore = true; };
  }, []);

  const latestRecord = records[0];
  const nextCheckDate = latestRecord ? addMonths(new Date(latestRecord.doneAt), 3) : null;

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="자가 체크 이력" left={<NavBackButton />} />
        <ScrollArea className="flex flex-col gap-3">
          {nextCheckDate && !isNaN(nextCheckDate.getTime()) && (
            <div className="items-center flex gap-3 bg-purple-50 border border-purple-100 px-4 py-3 rounded-2xl">
              <div className="items-center flex justify-center w-8 h-8 bg-purple-100 rounded-xl shrink-0">
                <CalendarDays className="h-4 w-4 text-purple-600" strokeWidth={2} />
              </div>
              <div className="grow">
                <div className="text-[11px] text-purple-500">다음 자가 체크 권장일</div>
                <div className="font-semibold text-sm text-purple-800 mt-0.5">{formatLongDate(nextCheckDate)}</div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/onboarding/1')}
                className="font-bold text-[11px] text-purple-600 bg-purple-100 px-3 py-1.5 rounded-lg shrink-0 transition-transform active:scale-95"
              >
                지금 체크
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="text-center text-xs text-gray-400 py-8">불러오는 중...</div>
          ) : records.length === 0 ? (
            <EmptyState onStart={() => navigate('/onboarding/1')} />
          ) : (
            <>
              <div className="px-1">
                <div className="font-semibold text-sm text-gray-800">체크 기록</div>
              </div>
              <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] rounded-2xl overflow-hidden">
                {records.map((record, index) => (
                  <div
                    key={record.id}
                    className={`items-center flex gap-3 px-4 py-3 ${index > 0 ? 'border-t border-gray-100' : ''}`}
                  >
                    <div className="items-center flex justify-center w-9 h-9 bg-purple-50 rounded-xl shrink-0">
                      <ClipboardList className="h-4 w-4 text-purple-500" strokeWidth={2} />
                    </div>
                    <div className="grow min-w-0">
                      <div className="font-semibold text-xs text-gray-800">{formatLongDate(new Date(record.doneAt))}</div>
                      <div className="items-center flex gap-1.5 mt-0.5">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${ASRS_COLOR[record.asrsLevel]}`}>
                          ASRS {ASRS_LABEL[record.asrsLevel]}
                        </span>
                        <span className="text-[10px] text-gray-400">목표 {record.goalCount}개 설정</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300 shrink-0" strokeWidth={2.5} />
                  </div>
                ))}
              </div>
            </>
          )}

          {!isLoading && (
            <button
              type="button"
              onClick={() => navigate('/onboarding/1')}
              className="items-center flex justify-center w-full h-[46px] bg-[rgb(31,27,46)] text-white font-bold text-sm rounded-xl shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] transition-all active:scale-[0.97] mt-2"
            >
              자가 체크 시작하기
            </button>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

function EmptyState({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-12 gap-4">
      <div className="items-center flex justify-center w-16 h-16 bg-purple-50 rounded-2xl">
        <ClipboardList className="h-8 w-8 text-purple-300" strokeWidth={1.5} />
      </div>
      <div>
        <div className="font-semibold text-sm text-gray-700">아직 체크 기록이 없어요</div>
        <div className="text-xs text-gray-400 mt-1">첫 자가 체크를 시작해보세요.</div>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="font-bold text-sm text-purple-600 bg-purple-50 px-5 py-2.5 rounded-xl transition-transform active:scale-95"
      >
        시작하기
      </button>
    </div>
  );
}

function addMonths(date: Date, months: number): Date {
  const next = new Date(date);
  const targetMonth = next.getMonth() + months;
  next.setDate(1);
  next.setMonth(targetMonth);
  const maxDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(date.getDate(), maxDay));
  return next;
}

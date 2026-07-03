import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ClipboardList, ChevronRight, CalendarDays } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { getOnboardingHistory, OnboardingHistoryRecord } from '@/api/onboarding';
import { formatLongDate, parseServerDateTime } from '@/lib/date';
import { useDelayedLoading } from '@/lib/useDelayedLoading';

export default function OnboardingHistoryPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<OnboardingHistoryRecord[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const showLoading = useDelayedLoading(isLoading);

  useEffect(() => {
    let ignore = false;

    getOnboardingHistory()
      .then(({ records: historyRecords }) => {
        if (ignore) return;
        setRecords(historyRecords);
      })
      .catch((err) => {
        console.error('Failed to load check history:', err);
        if (!ignore) setError('체크 기록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.');
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => { ignore = true; };
  }, []);

  const latestRecord = records[0];
  const nextCheckDate = latestRecord ? addMonths(parseServerDateTime(latestRecord.doneAt), 3) : null;

  return (
    <div className="w-full h-full bg-gray-50 text-sm flex flex-col" style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="자가 체크 이력" left={<NavBackButton />} />
        <ScrollArea className="flex flex-col gap-3">
          {nextCheckDate && !isNaN(nextCheckDate.getTime()) && (
            <div className="items-center flex gap-3 bg-purple-50 border border-purple-100 shadow-[rgba(120,80,200,0.10)_0px_4px_12px_0px] px-4 py-3 rounded-2xl">
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
            showLoading ? (
              <div className="flex flex-col items-center text-center py-12 gap-3">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl animate-pulse">
                  <ClipboardList className="h-8 w-8 text-purple-400" strokeWidth={1.5} />
                </div>
                <div className="font-semibold text-sm text-gray-700">자가 체크 기록을 불러오고 있어요</div>
                <div className="text-xs text-gray-400">잠시만 기다려 주세요</div>
              </div>
            ) : null
          ) : error ? (
            <ErrorState message={error} />
          ) : records.length === 0 ? (
            <EmptyState onStart={() => navigate('/onboarding/1')} />
          ) : (
            <>
              <div className="px-1">
                <div className="font-semibold text-sm text-gray-800">체크 기록</div>
              </div>
              <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] rounded-2xl overflow-hidden">
                {records.map((record, index) => (
                  <button
                    key={record.id}
                    type="button"
                    onClick={() => navigate(`/onboarding/history/${record.id}`)}
                    className={`items-center flex gap-3 px-4 py-3 w-full text-left transition-colors hover:bg-purple-50 active:bg-purple-100 ${index > 0 ? 'border-t border-gray-100' : ''}`}
                  >
                    <div className="items-center flex justify-center w-9 h-9 bg-purple-100 rounded-xl shrink-0">
                      <ClipboardList className="h-4 w-4 text-purple-500" strokeWidth={2} />
                    </div>
                    <div className="grow min-w-0">
                      <div className="font-semibold text-xs text-gray-800">
                        {(() => {
                          const date = parseServerDateTime(record.doneAt);
                          return !isNaN(date.getTime()) ? formatLongDate(date) : '-';
                        })()}
                      </div>
                      <div className="items-center flex flex-wrap gap-x-1.5 gap-y-0.5 mt-0.5 text-[10px] text-gray-500">
                        <span>부주의 {record.inattentionScore}점</span>
                        <span>과잉행동·충동성 {record.hyperactivityScore}점</span>
                        <span>목표 {record.goalCount}개 설정</span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" strokeWidth={2.5} />
                  </button>
                ))}
              </div>
            </>
          )}

        </ScrollArea>
      </div>
    </div>
  );
}

function EmptyState({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-12 gap-4">
      <div className="items-center flex justify-center w-16 h-16 bg-purple-100 rounded-2xl">
        <ClipboardList className="h-8 w-8 text-purple-400" strokeWidth={1.5} />
      </div>
      <div>
        <div className="font-semibold text-sm text-gray-700">아직 체크 기록이 없어요</div>
        <div className="text-xs text-gray-500 mt-1">첫 자가 체크를 시작해보세요.</div>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="font-bold text-sm text-white bg-[rgb(31,27,46)] px-5 py-2.5 rounded-xl transition-transform active:scale-95"
      >
        시작하기
      </button>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center text-center py-12 gap-3">
      <div className="items-center flex justify-center w-16 h-16 bg-purple-100 rounded-2xl">
        <ClipboardList className="h-8 w-8 text-purple-400" strokeWidth={1.5} />
      </div>
      <div className="font-semibold text-sm text-gray-700">{message}</div>
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

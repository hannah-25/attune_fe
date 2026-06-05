import React, { useCallback, useEffect, useState } from 'react';
import { CalendarPlus, RefreshCw } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { getSchedules } from '@/api/schedule';

export default function EmptyCalendarPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  const selectedDate = React.useMemo(() => parseDateParam(dateParam) ?? new Date(), [dateParam]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const dateKey = toDateKey(selectedDate);

  const refreshSchedules = useCallback(async () => {
    setIsRefreshing(true);
    setError('');

    try {
      const response = await getSchedules({ startDate: dateKey, endDate: dateKey });
      if (response.schedules.length > 0) {
        navigate('/calendar', { replace: true });
      }
    } catch {
      setError('일정을 불러오지 못했습니다.');
    } finally {
      setIsRefreshing(false);
    }
  }, [dateKey, navigate]);

  useEffect(() => {
    void refreshSchedules();
  }, [refreshSchedules]);

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="items-center flex justify-between pt-2 pr-4 pb-1 pl-4">
          <div className="font-extrabold text-2xl" style={{ fontFamily: 'NanumSquare, system-ui' }}>
            {formatDateLabel(selectedDate)}
          </div>
          <div className="flex gap-1.5">
            <IconTile
              ariaLabel="일정 새로고침"
              disabled={isRefreshing}
              onClick={() => void refreshSchedules()}
            >
              <RefreshCw className={`w-[14px] h-[14px] text-gray-700 ${isRefreshing ? 'animate-spin' : ''}`} strokeWidth={2.4} />
            </IconTile>
            <IconTile
              ariaLabel="새 일정 추가"
              onClick={() => navigate(`/calendar/new?date=${dateKey}`)}
            >
              <CalendarPlus className="w-[14px] h-[14px] text-gray-700" strokeWidth={2.4} />
            </IconTile>
          </div>
        </div>
        <ScrollArea className="items-center flex flex-col justify-center text-center gap-[14px] pt-5 px-6">
          <div className="relative text-center w-[180px] pt-4 pr-[10px] pb-[14px] pl-[10px]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="items-center flex text-center mb-[10px] gap-2.5 opacity-[0.5]">
                <div className="text-center w-[30px] h-2 bg-purple-50 rounded-sm" />
                <div className="text-center w-[6px] h-[6px] bg-[rgb(208,201,189)] rounded-[0.1875rem]" />
                <div className="border-dashed grow text-center h-7 bg-purple-50 border-gray-400 border basis-[0%] rounded-lg" />
              </div>
            ))}
            <div
              className="absolute text-center left-0 top-0 right-0 bottom-0"
              style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(255, 250, 240) 80%)' }}
            />
          </div>
          <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
            <span className="text-center">오늘은 자유로운 하루</span>
          </div>
          <div className="text-center text-gray-600 leading-[20.15px] max-w-60">
            <span className="text-center">예정된 일정이 없어요. 새 일정을 추가하거나 외부 캘린더를 연동해보세요.</span>
          </div>
          {error ? <div className="text-red-500 text-xs">{error}</div> : null}
          <button
            type="button"
            onClick={() => navigate(`/calendar/new?date=${dateKey}`)}
            className="items-center flex font-bold justify-center text-center h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[180px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem] transition-all active:scale-[0.97]"
          >
            <CalendarPlus className="w-[14px] h-[14px] mr-1.5" strokeWidth={2.5} />
            <span className="block text-center">새 일정</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/calendar/external')}
            className="items-center flex font-bold justify-center text-center h-11 border border-gray-300 text-gray-700 text-sm tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.375rem] transition-all active:scale-[0.97]"
          >
            <span className="block text-center">Google 캘린더 연동하기</span>
          </button>
        </ScrollArea>
        <TabBar active="캘린더" />
      </div>
    </div>
  );
}

function IconTile({
  ariaLabel,
  children,
  disabled = false,
  onClick,
}: {
  ariaLabel: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className="items-center flex justify-center w-9 h-9 bg-white shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem] transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
    >
      {children}
    </button>
  );
}

function parseDateParam(value: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function formatDateLabel(date: Date) {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

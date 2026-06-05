import React, { useEffect, useRef, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { deleteSchedule, getSchedule, getScheduleCategories, ScheduleCategory, ScheduleDetail } from '@/api/schedule';
import type { CalendarEvent } from '@/api/calendarEvents';

export default function EventDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const externalEvent = (location.state as { externalEvent?: CalendarEvent } | null)?.externalEvent ?? null;
  const [searchParams] = useSearchParams();
  const scheduleId = Number(searchParams.get('id'));
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [eventDetail, setEventDetail] = useState<ScheduleDetail | null>(null);
  const [categories, setCategories] = useState<ScheduleCategory[]>([]);
  const [error, setError] = useState('');
  const [memo, setMemo] = useState(() => externalEvent?.description ?? '');
  const [memoFocused, setMemoFocused] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    if (!scheduleId) {
      setError('일정 정보를 찾을 수 없습니다.');
      return;
    }

    let ignore = false;

    Promise.all([getSchedule(scheduleId), getScheduleCategories()])
      .then(([detail, categoryResponse]) => {
        if (ignore) return;
        setEventDetail(detail);
        setCategories(categoryResponse.categories);
        setMemo(detail.description ?? '');
      })
      .catch(() => {
        if (!ignore) setError('일정을 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, [scheduleId]);

  const handleDelete = async () => {
    if (!scheduleId) return;

    try {
      await deleteSchedule(scheduleId);
      navigate('/calendar');
    } catch {
      setError('일정을 삭제하지 못했습니다.');
    }
  };

  if (externalEvent) {
    return (
      <div
        className="w-full h-full bg-purple-100 text-sm flex flex-col"
        style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <div className="flex flex-col flex-1 min-h-0">
          <TopBar left={<NavBackButton onClick={() => navigate(-1)} />} />
          <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-4 pl-4">
            <div className="items-center flex mb-[14px]">
              <button
                type="button"
                className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem] transition-all active:scale-[0.97]"
              >
                <span className="block">Google Calendar</span>
              </button>
            </div>
            <div className="font-extrabold mb-[14px] text-3xl leading-[35px] whitespace-pre-line" style={{ fontFamily: "NanumSquare, system-ui" }}>
              {externalEvent.title}
            </div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
              <DetailRow label="언제" value={formatExternalWhen(externalEvent)} onClick={() => undefined} />
              <DetailRow label="어디서" value={externalEvent.location || '위치 없음'} last onClick={() => undefined} />
            </div>
            <div className="text-xs text-gray-400 px-1 mt-2">
              Google Calendar 일정의 제목, 시간, 장소는 에이튠에서 수정할 수 없어요.
            </div>
            <div className="font-bold text-gray-600 pt-4 pr-1 pb-1.5 pl-1">메모</div>
            <button
              type="button"
              onClick={() => memoRef.current?.focus()}
              className={`block w-full text-left bg-white border shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem] transition-colors ${
                memoFocused ? 'border-purple-300' : 'border-transparent'
              }`}
            >
              <textarea
                ref={memoRef}
                value={memo}
                readOnly
                onFocus={() => setMemoFocused(true)}
                onBlur={() => setMemoFocused(false)}
                placeholder="메모 없음"
                rows={2}
                className="w-full resize-none bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const category = categories.find((item) => item.categoryId === eventDetail?.categoryId);
  const showCounselingPrepare = isAdhdConsultationCategory(category?.categoryName);

  return (
    <div
      className="w-full h-full bg-purple-100 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          left={<NavBackButton onClick={() => navigate(-1)} />}
          right={<HeaderIconButton icon={<MoreHorizontal className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} onClick={() => setShowActions((value) => !value)} />}
        />
        {showActions ? (
          <div className="absolute right-4 top-[58px] z-30 w-32 overflow-hidden rounded-2xl bg-white shadow-[rgba(60,40,90,0.16)_0px_10px_26px_0px]">
            <button
              type="button"
              onClick={() => navigate(`/calendar/new?id=${scheduleId}`)}
              className="w-full px-4 py-3 text-left font-semibold active:bg-purple-50"
            >
              수정
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full border-t px-4 py-3 text-left font-semibold text-red-500 active:bg-red-50"
              style={{ borderTopColor: 'rgb(233, 228, 220)' }}
            >
              삭제
            </button>
          </div>
        ) : null}
        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-4 pl-4">
          {error ? <div className="text-red-500 text-xs mb-3">{error}</div> : null}
          <div className="items-center flex mb-[14px]">
            <button
              type="button"
              className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem] transition-all active:scale-[0.97]"
            >
              <span className="block">{category?.categoryName ?? '일정'}</span>
            </button>
          </div>
          <div className="font-extrabold mb-[14px] text-3xl leading-[35px] whitespace-pre-line" style={{ fontFamily: "NanumSquare, system-ui" }}>
            {eventDetail?.title ?? '일정'}
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <DetailRow
              label="언제"
              value={eventDetail ? formatWhen(eventDetail) : '-'}
              onClick={() => undefined}
            />
            <DetailRow
              label="어디서"
              value={eventDetail?.place || '위치 없음'}
              onClick={() => undefined}
            />
            <DetailRow
              label="알림"
              value="일정 알림"
              onClick={() => undefined}
            />
            <DetailRow
              label="반복"
              value="안 함"
              last
              onClick={() => undefined}
            />
          </div>
          <div className="font-bold text-gray-600 pt-4 pr-1 pb-1.5 pl-1">
            메모
          </div>
          <button
            type="button"
            onClick={() => memoRef.current?.focus()}
            className={`block w-full text-left bg-white border shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem] transition-colors ${
              memoFocused ? 'border-purple-300' : 'border-transparent'
            }`}
          >
            <textarea
              ref={memoRef}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              onFocus={() => setMemoFocused(true)}
              onBlur={() => setMemoFocused(false)}
              placeholder="메모 없음"
              rows={2}
              className="w-full resize-none bg-transparent text-base text-gray-800 outline-none placeholder:text-gray-400"
            />
          </button>
          <div className="flex mt-4 gap-2">
            <button
              type="button"
              onClick={() => navigate(`/calendar/new?id=${scheduleId}`)}
              className="items-center flex grow font-bold justify-center h-[50px] border-gray-900 border basis-[0%] text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem] transition-all active:scale-[0.97]"
            >
              <span className="block">수정</span>
            </button>
            {showCounselingPrepare ? (
              <button
                type="button"
                onClick={() => navigate('/counseling/prepare')}
                className="items-center flex grow font-bold justify-center h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white basis-[0%] text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem] transition-all active:scale-[0.97]"
              >
                <span className="block">상담 준비</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatExternalWhen(event: CalendarEvent) {
  if (event.isAllDay) return `${formatDate(event.startTime)} 종일`;
  return `${formatDate(event.startTime)} · ${formatTime(event.startTime)} - ${formatTime(event.endTime)}`;
}

function isAdhdConsultationCategory(categoryName?: string) {
  if (!categoryName) return false;
  return /^adhd\s*진료$/i.test(categoryName.trim());
}

function formatWhen(eventDetail: ScheduleDetail) {
  if (eventDetail.isAllDay) return `${formatDate(eventDetail.startTime)} 종일`;
  return `${formatDate(eventDetail.startTime)} · ${formatTime(eventDetail.startTime)} - ${formatTime(eventDetail.endTime)}`;
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

function DetailRow({
  label,
  last = false,
  onClick,
  value,
}: {
  label: string;
  last?: boolean;
  onClick: () => void;
  value: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`items-start flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99] ${last ? '' : 'border-b'}`}
      style={last ? undefined : { borderBottomColor: 'rgb(233, 228, 220)' }}
    >
      <div className="font-semibold w-[60px] text-gray-600">{label}</div>
      <div className="grow basis-[0%]">{value}</div>
    </button>
  );
}

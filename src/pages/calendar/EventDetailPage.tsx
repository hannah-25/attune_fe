import React, { useRef, useState } from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';
import { mockEventDetail } from '@/mocks/calendar.mock';

const EVENT_DETAIL = {
  alarmOptions: [mockEventDetail.alarm],
  category: mockEventDetail.category,
  repeatOptions: [mockEventDetail.repeat],
  source: mockEventDetail.source,
  title: mockEventDetail.title,
  whenOptions: [mockEventDetail.when],
  whereOptions: [mockEventDetail.where],
};

export default function EventDetailPage() {
  const navigate = useNavigate();
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [whenIndex, setWhenIndex] = useState(0);
  const [whereIndex, setWhereIndex] = useState(0);
  const [alarmIndex, setAlarmIndex] = useState(0);
  const [repeatIndex, setRepeatIndex] = useState(0);
  const [memo, setMemo] = useState('');
  const [memoFocused, setMemoFocused] = useState(false);
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className="w-full h-dvh bg-purple-100 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} onClick={() => navigate(-1)} />}
          right={<HeaderIconButton icon={<MoreHorizontal className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} onClick={() => setShowActions((value) => !value)} />}
        />
        {showActions ? (
          <div className="absolute right-4 top-[58px] z-30 w-32 overflow-hidden rounded-2xl bg-white shadow-[rgba(60,40,90,0.16)_0px_10px_26px_0px]">
            <button
              type="button"
              onClick={() => navigate('/calendar/new')}
              className="w-full px-4 py-3 text-left font-semibold active:bg-purple-50"
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => setShowActions(false)}
              className="w-full border-t px-4 py-3 text-left font-semibold text-red-500 active:bg-red-50"
              style={{ borderTopColor: 'rgb(233, 228, 220)' }}
            >
              삭제
            </button>
          </div>
        ) : null}
        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-4 pl-4">
          <div className="items-center flex mb-[14px] gap-2">
            <button
              type="button"
              className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem] transition-all active:scale-[0.97]"
            >
              <span className="block">{EVENT_DETAIL.category}</span>
            </button>
            <div className="text-gray-600 text-xs">
              {EVENT_DETAIL.source}
            </div>
          </div>
          <div className="font-extrabold mb-[14px] text-3xl leading-[35px] whitespace-pre-line" style={{ fontFamily: "NanumSquare, system-ui" }}>
            {EVENT_DETAIL.title}
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <DetailRow
              label="언제"
              value={EVENT_DETAIL.whenOptions[whenIndex]}
              onClick={() => setWhenIndex((index) => (index + 1) % EVENT_DETAIL.whenOptions.length)}
            />
            <DetailRow
              label="어디서"
              value={EVENT_DETAIL.whereOptions[whereIndex]}
              onClick={() => setWhereIndex((index) => (index + 1) % EVENT_DETAIL.whereOptions.length)}
            />
            <DetailRow
              label="알림"
              value={EVENT_DETAIL.alarmOptions[alarmIndex]}
              onClick={() => setAlarmIndex((index) => (index + 1) % EVENT_DETAIL.alarmOptions.length)}
            />
            <DetailRow
              label="반복"
              value={EVENT_DETAIL.repeatOptions[repeatIndex]}
              last
              onClick={() => setRepeatIndex((index) => (index + 1) % EVENT_DETAIL.repeatOptions.length)}
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
              onClick={() => navigate('/calendar/new')}
              className="items-center flex grow font-bold justify-center h-[50px] border-gray-900 border basis-[0%] text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem] transition-all active:scale-[0.97]"
            >
              <span className="block">수정</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/counseling/prepare')}
              className="items-center flex grow font-bold justify-center h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white basis-[0%] text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem] transition-all active:scale-[0.97]"
            >
              <span className="block">상담 준비</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
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

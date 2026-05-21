import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bell, ChevronRight, MapPin } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { formatFullDateTime } from '@/lib/date';
import { TopBar } from '../../app/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import {
  createSchedule,
  createScheduleCategory,
  getSchedule,
  getScheduleCategories,
  ScheduleCategory,
  updateSchedule,
} from '@/api/schedule';

const REPEAT_OPTIONS = ['안 함', '매주', '매월'] as const;
const ALARM_OPTIONS = ['없음', '10분 전', '30분 전', '1시간 전'] as const;
const DEFAULT_CATEGORY_COLOR = '#B9A6FF';

export default function NewEventPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const scheduleId = Number(searchParams.get('id'));

  const { START_OPTIONS, END_OPTIONS } = useMemo(() => {
    const dateParam = searchParams.get('date');
    const base = dateParam ? new Date(`${dateParam}T00:00:00`) : new Date();
    const y = base.getFullYear();
    const m = base.getMonth();
    const d = base.getDate();
    return {
      START_OPTIONS: [
        new Date(y, m, d, 14, 0),
        new Date(y, m, d, 15, 0),
        new Date(y, m, d, 16, 0),
      ],
      END_OPTIONS: [
        new Date(y, m, d, 15, 0),
        new Date(y, m, d, 16, 0),
        new Date(y, m, d, 17, 0),
      ],
    };
  }, []);
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [locationEditing, setLocationEditing] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [repeatIndex, setRepeatIndex] = useState(0);
  const [alarmIndex, setAlarmIndex] = useState(0);
  const [categories, setCategories] = useState<ScheduleCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [memo, setMemo] = useState('');
  const [memoOpen, setMemoOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');

  const markDirty = () => setDirty(true);
  const canSave = title.trim().length > 0 && selectedCategoryId !== null && dirty;

  useEffect(() => {
    let ignore = false;

    Promise.all([
      getScheduleCategories(),
      scheduleId ? getSchedule(scheduleId) : Promise.resolve(null),
    ])
      .then(([categoryResponse, detail]) => {
        if (ignore) return;
        setCategories(categoryResponse.categories);
        setSelectedCategoryId(categoryResponse.categories[0]?.categoryId ?? null);

        if (detail) {
          setTitle(detail.title);
          setLocation(detail.place ?? '');
          setAllDay(detail.isAllDay);
          setMemo(detail.description ?? '');
          setMemoOpen(Boolean(detail.description));
          setSelectedCategoryId(detail.categoryId);
          setDirty(false);
        }
      })
      .catch(() => {
        if (!ignore) setError('일정 정보를 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, [scheduleId]);

  const addCategory = async () => {
    const trimmedCategory = newCategory.trim();
    if (!trimmedCategory) return;

    try {
      await createScheduleCategory({ categoryName: trimmedCategory, color: DEFAULT_CATEGORY_COLOR });
      const response = await getScheduleCategories();
      setCategories(response.categories);
      setSelectedCategoryId(response.categories.find((category) => category.categoryName === trimmedCategory)?.categoryId ?? response.categories[0]?.categoryId ?? null);
      setNewCategory('');
      setAddingCategory(false);
      markDirty();
    } catch {
      setError('카테고리를 추가하지 못했습니다.');
    }
  };

  const saveSchedule = async () => {
    if (!canSave || selectedCategoryId === null) return;

    const alarmedAt = getAlarmedAt(START_OPTIONS[startIndex], ALARM_OPTIONS[alarmIndex]);
    const payload = {
      title: title.trim(),
      description: memo.trim() || undefined,
      categoryId: selectedCategoryId,
      place: location.trim() || undefined,
      isAllDay: allDay,
      startTime: toLocalIso(START_OPTIONS[startIndex]),
      endTime: toLocalIso(END_OPTIONS[endIndex]),
      alarmEnabled: alarmedAt.length > 0,
      alarmedAt,
    };

    try {
      if (scheduleId) {
        await updateSchedule(scheduleId, payload);
        navigate(`/calendar/event?id=${scheduleId}`);
      } else {
        await createSchedule(payload);
        navigate('/calendar');
      }
    } catch {
      setError('일정을 저장하지 못했습니다.');
    }
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title={scheduleId ? '일정 수정' : '새 일정'}
          left={<NavBackButton onClick={() => navigate(-1)} />}
          right={
            <div className="h-11 flex items-center">
              <button
                type="button"
                disabled={!canSave}
                onClick={saveSchedule}
                className="text-sm px-5 py-2 rounded-xl font-bold text-white whitespace-nowrap bg-[rgb(31,27,46)] transition-all active:scale-[0.97] disabled:opacity-30 disabled:active:scale-100"
              >
                저장
              </button>
            </div>
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-4 pl-4">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                markDirty();
              }}
              placeholder="제목"
              className="w-full font-bold text-lg bg-transparent outline-none placeholder:text-gray-400"
              style={{ fontFamily: 'NanumSquare, system-ui' }}
            />
          </div>
          <div
            className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] px-[14px] py-3 rounded-2xl flex items-center gap-3 cursor-text"
            onClick={() => { if (!locationEditing) setLocationEditing(true); }}
          >
            <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" strokeWidth={2.4} />
            {locationEditing ? (
              <input
                autoFocus
                value={location}
                onChange={(e) => { setLocation(e.target.value); markDirty(); }}
                onBlur={() => setLocationEditing(false)}
                placeholder="위치 추가"
                className="grow text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
              />
            ) : (
              <span className={`text-sm ${location ? 'text-gray-800' : 'text-gray-400'}`}>{location || '위치 추가'}</span>
            )}
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setAllDay((value) => !value);
                markDirty();
              }}
              className="items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] border-b transition-all active:scale-[0.99]"
              style={{ borderBottomColor: 'rgb(233, 228, 220)' }}
            >
              <div className="grow font-semibold basis-[0%]">종일</div>
              <ToggleSwitch active={allDay} />
            </button>
            <RowButton label="시작" value={allDay ? '오늘' : formatFullDateTime(START_OPTIONS[startIndex])} onClick={() => { setStartIndex((index) => (index + 1) % START_OPTIONS.length); markDirty(); }} />
            <RowButton label="종료" value={allDay ? '오늘' : formatFullDateTime(END_OPTIONS[endIndex])} onClick={() => { setEndIndex((index) => (index + 1) % END_OPTIONS.length); markDirty(); }} />
            <RowButton label="반복" value={REPEAT_OPTIONS[repeatIndex]} last onClick={() => { setRepeatIndex((index) => (index + 1) % REPEAT_OPTIONS.length); markDirty(); }} />
          </div>
          <div>
            <div className="font-bold mb-[6px] text-gray-600">카테고리</div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((category) => {
                const selected = selectedCategoryId === category.categoryId;
                return (
                  <button key={category.categoryId} type="button" onClick={() => { setSelectedCategoryId(category.categoryId); markDirty(); }} className={`items-center flex font-semibold whitespace-nowrap border-transparent border gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem] transition-all active:scale-[0.97] ${selected ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'}`}>
                    {category.categoryName}
                  </button>
                );
              })}
              {addingCategory ? (
                <div className="items-center flex bg-white border border-gray-300 gap-2 px-3 rounded-[62.4375rem]">
                  <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') addCategory(); }} autoFocus placeholder="새 분류" className="w-20 text-base bg-transparent outline-none placeholder:text-gray-300" />
                  <button type="button" onClick={addCategory} disabled={!newCategory.trim()} className="font-bold text-xs text-purple-700 disabled:opacity-30">추가</button>
                </div>
              ) : (
                <button type="button" onClick={() => setAddingCategory(true)} className="items-center flex font-semibold whitespace-nowrap bg-white border border-gray-300 text-gray-600 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem] transition-all active:scale-[0.97]">
                  + 새 분류
                </button>
              )}
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <RowButton
              label="알림"
              value={ALARM_OPTIONS[alarmIndex]}
              icon={<Bell className="w-[11px] h-[11px] text-gray-500" strokeWidth={2.4} />}
              onClick={() => { setAlarmIndex((index) => (index + 1) % ALARM_OPTIONS.length); markDirty(); }}
            />
            <button type="button" onClick={() => { setMemoOpen(true); requestAnimationFrame(() => memoRef.current?.focus()); }} className="items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99]">
              <div className="grow font-semibold basis-[0%]">메모</div>
              <div className={`${memo ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>{memo ? '작성됨' : '추가'}</div>
              <ChevronRight className="w-[11px] h-[11px] text-gray-500" strokeWidth={2.5} />
            </button>
          </div>
          {memoOpen ? (
            <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
              <div className="font-semibold text-gray-600 mb-2">메모</div>
              <textarea
                ref={memoRef}
                value={memo}
                onChange={(e) => { setMemo(e.target.value); markDirty(); }}
                placeholder="메모를 입력해 주세요"
                rows={3}
                className="w-full text-base text-gray-900 leading-relaxed resize-none outline-none placeholder:text-gray-300"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function toLocalIso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

function getAlarmedAt(startTime: Date, alarmOption: (typeof ALARM_OPTIONS)[number]) {
  const minutesBefore = {
    없음: 0,
    '10분 전': 10,
    '30분 전': 30,
    '1시간 전': 60,
  }[alarmOption];

  if (!minutesBefore) return [];

  const alarmDate = new Date(startTime);
  alarmDate.setMinutes(startTime.getMinutes() - minutesBefore);
  return [toLocalIso(alarmDate)];
}

function RowButton({ icon, label, last = false, onClick, value }: { icon?: React.ReactNode; label: string; last?: boolean; onClick: () => void; value: string }) {
  return (
    <button type="button" onClick={onClick} className={`items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99] ${last ? '' : 'border-b'}`} style={last ? undefined : { borderBottomColor: 'rgb(233, 228, 220)' }}>
      <div className="grow font-semibold basis-[0%]">{label}</div>
      <div className="text-gray-600">{value}</div>
      {icon ?? null}
    </button>
  );
}

function ToggleSwitch({ active }: { active: boolean }) {
  return (
    <span className={`relative block w-[38px] h-[22px] rounded-[0.6875rem] transition-colors ${active ? 'bg-purple-300' : 'bg-purple-50'}`}>
      <span className={`absolute w-[18px] h-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem] transition-all ${active ? 'left-[18px]' : 'left-[2px]'}`} />
    </span>
  );
}

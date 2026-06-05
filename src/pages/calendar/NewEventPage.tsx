import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bell, ChevronDown, ChevronRight, MapPin } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
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
import { ApiError } from '@/api/client';
import {
  addHours,
  parseDateParam,
  parseDateTimeInputs,
  parseLocalDateTime,
  toDateInputValue,
  toDateInputValueFromDateTime,
  toLocalIso,
  toLocalIsoFromInputs,
  toTimeInputValue,
  toTimeInputValueFromDateTime,
} from '@/lib/date';

const REPEAT_OPTIONS = ['없음', '매주', '매월'] as const;
const DEFAULT_CATEGORY_COLOR = '#B9A6FF';

type AlarmOptionKey = 'none' | '5m' | '10m' | '15m' | '30m' | '1h' | 'custom';

const ALARM_PRESETS: Array<{ key: AlarmOptionKey; label: string; minutes: number | null }> = [
  { key: 'none', label: '없음', minutes: null },
  { key: '5m', label: '5분 전', minutes: 5 },
  { key: '10m', label: '10분 전', minutes: 10 },
  { key: '15m', label: '15분 전', minutes: 15 },
  { key: '30m', label: '30분 전', minutes: 30 },
  { key: '1h', label: '1시간 전', minutes: 60 },
  { key: 'custom', label: '맞춤', minutes: null },
];

function errorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError && error.backendMessage ? error.backendMessage : fallback;
}

export default function NewEventPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const scheduleIdParam = searchParams.get('id');
  const dateParam = searchParams.get('date');
  const scheduleId = scheduleIdParam ? Number(scheduleIdParam) : null;
  const isEditMode = scheduleId !== null && Number.isFinite(scheduleId) && scheduleId > 0;

  const initialStartDate = useMemo(() => parseDateParam(dateParam, 14, 0) ?? new Date(), [dateParam]);
  const initialEndDate = useMemo(() => addHours(initialStartDate, 1), [initialStartDate]);

  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [locationEditing, setLocationEditing] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [startDateValue, setStartDateValue] = useState(() => toDateInputValue(initialStartDate));
  const [startTimeValue, setStartTimeValue] = useState(() => toTimeInputValue(initialStartDate));
  const [endDateValue, setEndDateValue] = useState(() => toDateInputValue(initialEndDate));
  const [endTimeValue, setEndTimeValue] = useState(() => toTimeInputValue(initialEndDate));
  const [repeatIndex, setRepeatIndex] = useState(0);

  const [alarmOpen, setAlarmOpen] = useState(false);
  const [alarmOptionKey, setAlarmOptionKey] = useState<AlarmOptionKey>('none');
  const [customAlarmMinutesInput, setCustomAlarmMinutesInput] = useState('20');

  const [categories, setCategories] = useState<ScheduleCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const [memo, setMemo] = useState('');
  const [memoOpen, setMemoOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const markDirty = () => setDirty(true);
  const startTimeForPayload = toLocalIsoFromInputs(startDateValue, startTimeValue, allDay, 'start');
  const endTimeForPayload = toLocalIsoFromInputs(endDateValue, endTimeValue, allDay, 'end');
  const hasDateTimeValues = startDateValue.length > 0 && endDateValue.length > 0 && (allDay || (startTimeValue.length > 0 && endTimeValue.length > 0));
  const hasValidRange = hasDateTimeValues && startTimeForPayload <= endTimeForPayload;
  const canSave = title.trim().length > 0 && selectedCategoryId !== null && dirty && hasValidRange && !isSaving;
  const selectedCategoryName = categories.find((category) => category.categoryId === selectedCategoryId)?.categoryName ?? '';

  const selectedAlarmPreset = ALARM_PRESETS.find((preset) => preset.key === alarmOptionKey) ?? ALARM_PRESETS[0];
  const customAlarmMinutes = Number.parseInt(customAlarmMinutesInput, 10);
  const alarmMinutesBefore = alarmOptionKey === 'custom'
    ? (Number.isFinite(customAlarmMinutes) && customAlarmMinutes > 0 ? customAlarmMinutes : null)
    : selectedAlarmPreset.minutes;
  const selectedAlarmLabel = alarmOptionKey === 'custom'
    ? (alarmMinutesBefore ? `${alarmMinutesBefore}분 전` : '맞춤')
    : selectedAlarmPreset.label;

  const syncEndAfterStart = (nextStartDateValue: string, nextStartTimeValue: string) => {
    if (!nextStartDateValue) return;

    if (allDay) {
      setEndDateValue(nextStartDateValue);
      return;
    }

    const nextStart = parseDateTimeInputs(nextStartDateValue, nextStartTimeValue);
    if (!nextStart) return;

    const nextEnd = addHours(nextStart, 1);
    setEndDateValue(toDateInputValue(nextEnd));
    setEndTimeValue(toTimeInputValue(nextEnd));
  };

  const handleStartDateChange = (value: string) => {
    setStartDateValue(value);
    syncEndAfterStart(value, startTimeValue);
    markDirty();
  };

  const handleStartTimeChange = (value: string) => {
    setStartTimeValue(value);
    syncEndAfterStart(startDateValue, value);
    markDirty();
  };

  useEffect(() => {
    let ignore = false;
    setError('');

    getScheduleCategories()
      .then((categoryResponse) => {
        if (ignore) return;
        setCategories(categoryResponse.categories);
        setSelectedCategoryId(categoryResponse.categories[0]?.categoryId ?? null);
      })
      .catch((err) => {
        if (!ignore) setError(errorMessage(err, '카테고리를 불러오지 못했습니다.'));
      });

    if (isEditMode && scheduleId !== null) {
      getSchedule(scheduleId)
        .then((detail) => {
          if (ignore) return;
          setTitle(detail.title);
          setLocation(detail.place ?? '');
          setAllDay(detail.isAllDay);
          setStartDateValue(toDateInputValueFromDateTime(detail.startTime));
          setStartTimeValue(toTimeInputValueFromDateTime(detail.startTime));
          setEndDateValue(toDateInputValueFromDateTime(detail.endTime));
          setEndTimeValue(toTimeInputValueFromDateTime(detail.endTime));
          setMemo(detail.description ?? '');
          setMemoOpen(Boolean(detail.description));
          setSelectedCategoryId(detail.categoryId);
          setDirty(false);
        })
        .catch((err) => {
          if (!ignore) setError(errorMessage(err, '일정 정보를 불러오지 못했습니다.'));
        });
    }

    return () => {
      ignore = true;
    };
  }, [isEditMode, scheduleId]);

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
    } catch (err) {
      setError(errorMessage(err, '카테고리를 추가하지 못했습니다.'));
    }
  };

  const saveSchedule = async () => {
    if (!canSave || selectedCategoryId === null) return;

    const alarmedAt = getAlarmedAt(parseLocalDateTime(startTimeForPayload), alarmMinutesBefore);
    const payload = {
      title: title.trim(),
      description: memo.trim() || undefined,
      categoryId: selectedCategoryId,
      place: location.trim() || undefined,
      isAllDay: allDay,
      startTime: startTimeForPayload,
      endTime: endTimeForPayload,
      alarmEnabled: alarmedAt.length > 0,
      alarmedAt,
    };

    setIsSaving(true);
    setError('');
    try {
      if (isEditMode && scheduleId !== null) {
        await updateSchedule(scheduleId, payload);
        navigate(`/calendar/event?id=${scheduleId}`);
      } else {
        await createSchedule(payload);
        navigate('/calendar');
      }
    } catch (err) {
      setError(errorMessage(err, '일정을 저장하지 못했습니다.'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title={isEditMode ? '일정 수정' : '새 일정'}
          left={<NavBackButton onClick={() => navigate(-1)} />}
          right={
            <div className="h-11 flex items-center">
              <button
                type="button"
                disabled={!canSave}
                onClick={saveSchedule}
                className="text-sm px-5 py-2 rounded-xl font-bold text-white whitespace-nowrap bg-[rgb(31,27,46)] transition-all active:scale-[0.97] disabled:opacity-30 disabled:active:scale-100"
              >
                {isSaving ? '저장 중...' : '저장'}
              </button>
            </div>
          }
        />

        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-4 pl-4">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}

          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                markDirty();
              }}
              placeholder="제목"
              className="w-full font-bold text-lg bg-transparent outline-none placeholder:text-gray-400"
              style={{ fontFamily: 'NanumSquare, system-ui' }}
            />
          </div>

          <div
            className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] px-[14px] py-3 rounded-2xl flex items-center gap-3 cursor-text"
            onClick={() => {
              if (!locationEditing) setLocationEditing(true);
            }}
          >
            <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" strokeWidth={2.4} />
            {locationEditing ? (
              <input
                autoFocus
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                  markDirty();
                }}
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
            <DateTimeInputRow
              label="시작"
              dateValue={startDateValue}
              timeValue={startTimeValue}
              allDay={allDay}
              onDateChange={handleStartDateChange}
              onTimeChange={handleStartTimeChange}
            />
            <DateTimeInputRow
              label="종료"
              dateValue={endDateValue}
              timeValue={endTimeValue}
              allDay={allDay}
              onDateChange={(value) => {
                setEndDateValue(value);
                markDirty();
              }}
              onTimeChange={(value) => {
                setEndTimeValue(value);
                markDirty();
              }}
            />
            <RowButton
              label="반복"
              value={REPEAT_OPTIONS[repeatIndex]}
              last
              onClick={() => {
                setRepeatIndex((index) => (index + 1) % REPEAT_OPTIONS.length);
                markDirty();
              }}
            />
          </div>

          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setCategoryOpen((open) => !open)}
              className={`items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99] ${categoryOpen ? 'border-b' : ''}`}
              style={categoryOpen ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}
            >
              <div className="grow font-semibold basis-[0%]">카테고리</div>
              <div className={`${selectedCategoryName ? 'text-gray-700' : 'text-gray-400'} text-sm`}>
                {selectedCategoryName || '선택'}
              </div>
              <ChevronDown
                className={`w-[13px] h-[13px] ml-1 text-gray-500 transition-transform ${categoryOpen ? 'rotate-180' : ''}`}
                strokeWidth={2.4}
              />
            </button>
            {categoryOpen ? (
              <div className="px-2 pt-2 pb-1 flex flex-col gap-1.5">
                {categories.map((category) => {
                  const selected = selectedCategoryId === category.categoryId;

                  return (
                    <button
                      key={category.categoryId}
                      type="button"
                      onClick={() => {
                        setSelectedCategoryId(category.categoryId);
                        setCategoryOpen(false);
                        markDirty();
                      }}
                      className={`items-center flex w-full text-left text-sm font-semibold rounded-xl px-3 py-2.5 transition-all active:scale-[0.98] ${
                        selected
                          ? 'bg-purple-500 text-white'
                          : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                      }`}
                    >
                      {category.categoryName}
                    </button>
                  );
                })}
                {addingCategory ? (
                  <div className="items-center flex bg-white border border-gray-300 gap-2 px-3 py-2 rounded-xl">
                    <input
                      value={newCategory}
                      onChange={(event) => setNewCategory(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') addCategory();
                      }}
                      autoFocus
                      placeholder="새 분류"
                      className="grow min-w-0 text-sm bg-transparent outline-none placeholder:text-gray-300"
                    />
                    <button type="button" onClick={addCategory} disabled={!newCategory.trim()} className="font-bold text-xs text-purple-700 disabled:opacity-30">추가</button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAddingCategory(true)}
                    className="items-center flex justify-center w-full font-semibold bg-white border border-gray-300 text-gray-600 text-sm rounded-xl py-2.5 transition-all active:scale-[0.98]"
                  >
                    + 새 분류
                  </button>
                )}
              </div>
            ) : null}
          </div>

          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setAlarmOpen((open) => !open)}
              className={`items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99] ${alarmOpen ? 'border-b' : ''}`}
              style={alarmOpen ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}
            >
              <div className="grow font-semibold basis-[0%]">알림</div>
              <div className="text-gray-600">{selectedAlarmLabel}</div>
              <Bell className="w-[11px] h-[11px] ml-1 text-gray-500" strokeWidth={2.4} />
              <ChevronDown
                className={`w-[12px] h-[12px] ml-1 text-gray-500 transition-transform ${alarmOpen ? 'rotate-180' : ''}`}
                strokeWidth={2.4}
              />
            </button>
            {alarmOpen ? (
              <div className="px-2 pt-2 pb-1 flex flex-col gap-1.5">
                {ALARM_PRESETS.map((preset) => {
                  const selected = alarmOptionKey === preset.key;

                  return (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => {
                        setAlarmOptionKey(preset.key);
                        markDirty();
                        if (preset.key !== 'custom') {
                          setAlarmOpen(false);
                        }
                      }}
                      className={`items-center flex w-full text-left text-sm font-semibold rounded-xl px-3 py-2.5 transition-all active:scale-[0.98] ${
                        selected
                          ? 'bg-purple-500 text-white'
                          : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
                {alarmOptionKey === 'custom' ? (
                  <div className="items-center flex bg-white border border-gray-300 gap-2 px-3 py-2 rounded-xl">
                    <input
                      type="number"
                      min={1}
                      max={1440}
                      value={customAlarmMinutesInput}
                      onChange={(event) => {
                        setCustomAlarmMinutesInput(event.target.value);
                        markDirty();
                      }}
                      className="w-20 text-sm bg-transparent outline-none"
                    />
                    <span className="text-xs text-gray-500">분 전</span>
                    <button
                      type="button"
                      onClick={() => setAlarmOpen(false)}
                      disabled={!alarmMinutesBefore}
                      className="font-bold text-xs text-purple-700 disabled:opacity-30"
                    >
                      적용
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => {
                setMemoOpen(true);
                requestAnimationFrame(() => memoRef.current?.focus());
              }}
              className="items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99]"
            >
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
                onChange={(event) => {
                  setMemo(event.target.value);
                  markDirty();
                }}
                placeholder="메모를 입력해주세요"
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

function getAlarmedAt(startTime: Date, minutesBefore: number | null) {
  if (!minutesBefore || minutesBefore <= 0) return [];

  const alarmDate = new Date(startTime);
  alarmDate.setMinutes(startTime.getMinutes() - minutesBefore);
  return [toLocalIso(alarmDate)];
}

function DateTimeInputRow({
  allDay,
  dateValue,
  label,
  onDateChange,
  onTimeChange,
  timeValue,
}: {
  allDay: boolean;
  dateValue: string;
  label: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  timeValue: string;
}) {
  return (
    <div
      className="items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] border-b gap-3"
      style={{ borderBottomColor: 'rgb(233, 228, 220)' }}
    >
      <div className="grow font-semibold basis-[0%]">{label}</div>
      <div className="flex items-center justify-end gap-2 min-w-0 flex-wrap">
        <input
          type="date"
          value={dateValue}
          onChange={(event) => onDateChange(event.target.value)}
          className="bg-transparent text-sm text-gray-700 outline-none"
        />
        {!allDay ? (
          <input
            type="time"
            value={timeValue}
            onChange={(event) => onTimeChange(event.target.value)}
            className="bg-transparent text-sm text-gray-700 outline-none"
          />
        ) : null}
      </div>
    </div>
  );
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

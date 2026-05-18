import React, { useRef, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { formatFullDateTime } from '@/lib/date';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';

const now = new Date();
const startDefault = formatFullDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0));
const endDefault = formatFullDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0));

const START_OPTIONS = [
  startDefault,
  formatFullDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0)),
  formatFullDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0)),
];

const END_OPTIONS = [
  endDefault,
  formatFullDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0)),
  formatFullDateTime(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0)),
];

const REPEAT_OPTIONS = ['안 함', '매주', '매월'] as const;
const ALARM_OPTIONS = ['없음', '10분 전', '30분 전', '1시간 전'] as const;
const INITIAL_CATEGORIES = ['상담', '업무', '복약', '개인'];

export default function NewEventPage() {
  const navigate = useNavigate();
  const locationInputRef = useRef<HTMLInputElement>(null);
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [locationFocused, setLocationFocused] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [repeatIndex, setRepeatIndex] = useState(0);
  const [alarmIndex, setAlarmIndex] = useState(0);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('상담');
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [memo, setMemo] = useState('');
  const [memoOpen, setMemoOpen] = useState(false);
  const [dirty, setDirty] = useState(false);

  const markDirty = () => setDirty(true);
  const canSave = title.trim().length > 0 && dirty;

  const addCategory = () => {
    const trimmedCategory = newCategory.trim();
    if (!trimmedCategory) return;

    setCategories((current) => [...current, trimmedCategory]);
    setSelectedCategory(trimmedCategory);
    setNewCategory('');
    setAddingCategory(false);
    markDirty();
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="새 일정"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} onClick={() => navigate(-1)} />}
          right={
            <div className="items-center flex justify-center w-11 h-11">
              <button
                type="button"
                disabled={!canSave}
                onClick={() => setDirty(false)}
                className="text-xs px-2.5 py-1 rounded-lg font-bold text-white bg-[rgb(31,27,46)] transition-all active:scale-[0.97] disabled:opacity-30 disabled:active:scale-100"
              >
                저장
              </button>
            </div>
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-4 pl-4">
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                markDirty();
              }}
              placeholder="제목"
              className="w-full font-bold text-base bg-transparent outline-none placeholder:text-gray-300 mb-2"
              style={{ fontFamily: "NanumSquare, system-ui" }}
            />
            <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors ${
              locationFocused ? 'border-purple-300 bg-purple-50/40' : 'border-gray-100 bg-gray-50'
            }`}>
              <div className="overflow-hidden w-3.5 h-3.5 shrink-0">
                <img src="/icons/df73d4774c6f7327c8ad736a4ec91a37128919ab.svg" alt="" className="block size-full" />
              </div>
              <input
                ref={locationInputRef}
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  markDirty();
                }}
                onFocus={() => setLocationFocused(true)}
                onBlur={() => setLocationFocused(false)}
                placeholder="위치 추가"
                className="w-full text-base text-gray-700 bg-transparent outline-none placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setAllDay((value) => !value);
                markDirty();
              }}
              className="items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] border-b transition-all active:scale-[0.99]"
              style={{ borderBottomColor: "rgb(233, 228, 220)" }}
            >
              <div className="grow font-semibold basis-[0%]">종일</div>
              <ToggleSwitch active={allDay} />
            </button>
            <RowButton
              label="시작"
              value={allDay ? '오늘' : START_OPTIONS[startIndex]}
              onClick={() => {
                setStartIndex((index) => (index + 1) % START_OPTIONS.length);
                markDirty();
              }}
            />
            <RowButton
              label="종료"
              value={allDay ? '오늘' : END_OPTIONS[endIndex]}
              onClick={() => {
                setEndIndex((index) => (index + 1) % END_OPTIONS.length);
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

          <div>
            <div className="font-bold mb-[6px] text-gray-600">
              카테고리
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((category) => {
                const selected = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      markDirty();
                    }}
                    className={`items-center flex font-semibold whitespace-nowrap border-transparent border gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem] transition-all active:scale-[0.97] ${
                      selected ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
              {addingCategory ? (
                <div className="items-center flex bg-white border border-gray-300 gap-2 px-3 rounded-[62.4375rem]">
                  <input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addCategory();
                    }}
                    autoFocus
                    placeholder="새 분류"
                    className="w-20 text-base bg-transparent outline-none placeholder:text-gray-300"
                  />
                  <button
                    type="button"
                    onClick={addCategory}
                    disabled={!newCategory.trim()}
                    className="font-bold text-xs text-purple-700 disabled:opacity-30"
                  >
                    추가
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setAddingCategory(true)}
                  className="items-center flex font-semibold whitespace-nowrap bg-white border border-gray-300 text-gray-600 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem] transition-all active:scale-[0.97]"
                >
                  + 새 분류
                </button>
              )}
            </div>
          </div>

          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <RowButton
              label="알림"
              value={ALARM_OPTIONS[alarmIndex]}
              iconSrc="/icons/cd9b488c97d95c8b78b422e04f658c2cc6aa1a03.svg"
              onClick={() => {
                setAlarmIndex((index) => (index + 1) % ALARM_OPTIONS.length);
                markDirty();
              }}
            />
            <RowButton
              label="위치"
              value={location || '추가'}
              iconSrc="/icons/df73d4774c6f7327c8ad736a4ec91a37128919ab.svg"
              onClick={() => locationInputRef.current?.focus()}
            />
            <button
              type="button"
              onClick={() => {
                setMemoOpen(true);
                requestAnimationFrame(() => memoRef.current?.focus());
              }}
              className="items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99]"
            >
              <div className="grow font-semibold basis-[0%]">메모</div>
              <div className={`${memo ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                {memo ? '작성됨' : '추가'}
              </div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/8a6c4d23a5e4d6c2436e7637e387e4bd7996730f.svg" alt="" className="block size-full" />
              </div>
            </button>
          </div>

          {memoOpen ? (
            <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
              <div className="font-semibold text-gray-600 mb-2">메모</div>
              <textarea
                ref={memoRef}
                value={memo}
                onChange={(e) => {
                  setMemo(e.target.value);
                  markDirty();
                }}
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

function RowButton({
  iconSrc,
  label,
  last = false,
  onClick,
  value,
}: {
  iconSrc?: string;
  label: string;
  last?: boolean;
  onClick: () => void;
  value: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99] ${last ? '' : 'border-b'}`}
      style={last ? undefined : { borderBottomColor: "rgb(233, 228, 220)" }}
    >
      <div className="grow font-semibold basis-[0%]">{label}</div>
      <div className="text-gray-600">{value}</div>
      {iconSrc ? (
        <div className="overflow-hidden w-[11px] h-[11px]">
          <img src={iconSrc} alt="" className="block size-full" />
        </div>
      ) : null}
    </button>
  );
}

function ToggleSwitch({ active }: { active: boolean }) {
  return (
    <span className={`relative block w-[38px] h-[22px] rounded-[0.6875rem] transition-colors ${
      active ? 'bg-purple-300' : 'bg-purple-50'
    }`}>
      <span className={`absolute w-[18px] h-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem] transition-all ${
        active ? 'left-[18px]' : 'left-[2px]'
      }`} />
    </span>
  );
}

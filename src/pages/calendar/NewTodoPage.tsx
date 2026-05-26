import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { NavBackButton } from '@/components/NavButtons';
import { TopBar } from '@/components/TopBar';
import { createTodo } from '@/api/todo';

export default function NewTodoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  const baseDate = useMemo(() => {
    if (dateParam) {
      return new Date(`${dateParam}T09:00:00`);
    }
    return new Date();
  }, [dateParam]);

  const [todoText, setTodoText] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const [dateValue, setDateValue] = useState(toDateInputValue(baseDate));
  const [timeValue, setTimeValue] = useState(toTimeInputValue(baseDate));
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const canSave = todoText.trim().length > 0 && dateValue.length > 0 && (isAllDay || timeValue.length > 0) && !isSaving;

  const saveTodo = async () => {
    if (!canSave) return;

    setError('');
    setIsSaving(true);
    try {
      await createTodo({
        text: todoText.trim(),
        dueAt: toLocalIsoFromInputs(dateValue, timeValue, isAllDay),
        isAllDay,
      });
      navigate('/calendar');
    } catch {
      setError('할일을 저장하지 못했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="할일 추가"
          left={<NavBackButton onClick={() => navigate(-1)} />}
          right={(
            <div className="h-11 flex items-center">
              <button
                type="button"
                disabled={!canSave}
                onClick={saveTodo}
                className="text-sm px-5 py-2 rounded-xl font-bold text-white whitespace-nowrap bg-[rgb(31,27,46)] transition-all active:scale-[0.97] disabled:opacity-30 disabled:active:scale-100"
              >
                {isSaving ? '저장 중...' : '저장'}
              </button>
            </div>
          )}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-4 pl-4">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
            <input
              value={todoText}
              onChange={(event) => setTodoText(event.target.value)}
              placeholder="할일 내용을 입력해주세요"
              className="w-full font-bold text-lg bg-transparent outline-none placeholder:text-gray-400"
              style={{ fontFamily: 'NanumSquare, system-ui' }}
            />
          </div>

          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setIsAllDay((value) => !value)}
              className="items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] border-b transition-all active:scale-[0.99]"
              style={{ borderBottomColor: 'rgb(233, 228, 220)' }}
            >
              <div className="grow font-semibold basis-[0%]">종일</div>
              <ToggleSwitch active={isAllDay} />
            </button>

            <div
              className={`items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] ${isAllDay ? '' : 'border-b'}`}
              style={isAllDay ? undefined : { borderBottomColor: 'rgb(233, 228, 220)' }}
            >
              <div className="grow font-semibold basis-[0%]">날짜</div>
              <input
                type="date"
                value={dateValue}
                onChange={(event) => setDateValue(event.target.value)}
                className="bg-transparent text-sm text-gray-700 outline-none"
              />
            </div>

            {!isAllDay ? (
              <div className="items-center flex w-full text-left pt-3 pr-[14px] pb-3 pl-[14px]">
                <div className="grow font-semibold basis-[0%]">시간</div>
                <input
                  type="time"
                  value={timeValue}
                  onChange={(event) => setTimeValue(event.target.value)}
                  className="bg-transparent text-sm text-gray-700 outline-none"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toTimeInputValue(date: Date) {
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${hour}:${minute}`;
}

function toLocalIsoFromInputs(dateValue: string, timeValue: string, isAllDay: boolean) {
  const timePart = isAllDay ? '00:00' : (timeValue || '00:00');
  return `${dateValue}T${timePart}:00`;
}

function ToggleSwitch({ active }: { active: boolean }) {
  return (
    <span className={`relative block w-[38px] h-[22px] rounded-[0.6875rem] transition-colors ${active ? 'bg-purple-300' : 'bg-purple-50'}`}>
      <span className={`absolute w-[18px] h-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem] transition-all ${active ? 'left-[18px]' : 'left-[2px]'}`} />
    </span>
  );
}

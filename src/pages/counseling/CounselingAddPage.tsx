import React, { useState } from 'react';
import { CalendarDays, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { NavCloseButton } from '@/components/NavButtons';
import { createConsultation, updateConsultation } from '@/api/consultation';
import { ApiError } from '@/api/client';

type EditConsultationState = {
  editMode: true;
  consultationId: number;
  consultationDate: string;
  place: string;
  doctorName: string;
};

export default function CounselingAddPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const editState = (location.state as EditConsultationState | null)?.editMode
    ? (location.state as EditConsultationState)
    : null;
  const isEditMode = editState !== null;

  const parsedDatetime = editState ? parseDatetime(editState.consultationDate) : null;

  const today = new Date();
  const [date, setDate] = useState(parsedDatetime?.date ?? toDateKey(today));
  const [time, setTime] = useState(parsedDatetime?.time ?? '10:00');
  const [place, setPlace] = useState(editState?.place ?? '');
  const [doctorName, setDoctorName] = useState(editState?.doctorName ?? '');
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const canSave = date !== '' && time !== '' && place.trim() !== '' && doctorName.trim() !== '' && !isSaving;

  const save = async () => {
    if (!canSave) return;
    setError('');
    setIsSaving(true);
    try {
      const consultationDate = `${date}T${time}:00`;
      if (editState) {
        await updateConsultation(editState.consultationId, {
          consultationDate,
          place: place.trim(),
          doctorName: doctorName.trim(),
        });
      } else {
        await createConsultation({ consultationDate, place: place.trim(), doctorName: doctorName.trim(), isFirstVisit });
      }
      navigate('/counseling');
    } catch (err) {
      setError(
        err instanceof ApiError && err.backendMessage
          ? err.backendMessage
          : isEditMode ? '상담 일정을 수정하지 못했습니다.' : '상담 일정을 추가하지 못했습니다.',
      );
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
          title={isEditMode ? '일정 변경' : '상담 추가'}
          left={<NavCloseButton />}
          right={
            <div className="items-center flex justify-end min-w-11 h-11">
              <button
                type="button"
                onClick={save}
                disabled={!canSave}
                className="items-center flex font-bold justify-center h-9 bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.06)_0px_3px_0px_0px] text-white text-xs tracking-tight px-3 rounded-xl disabled:opacity-60"
              >
                {isSaving ? '저장 중' : '저장하기'}
              </button>
            </div>
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-6 pl-4">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}

          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] p-1 rounded-2xl">
            {/* 날짜 */}
            <div className="relative">
              <div
                className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b"
                style={{ borderBottomColor: 'rgb(233, 228, 220)' }}
              >
                <div className="font-semibold w-[84px] text-gray-600 text-left shrink-0">날짜</div>
                <div className="grow font-semibold basis-[0%] text-left">{formatDateDot(date)}</div>
                <CalendarDays className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                aria-label="상담 날짜"
              />
            </div>
            {/* 시간 */}
            <div className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
              <div className="font-semibold w-[84px] text-gray-600 shrink-0">시간</div>
              <div className="grow basis-[0%] flex items-center gap-2">
                <Clock className="w-[13px] h-[13px] text-gray-500 shrink-0" strokeWidth={2.5} />
                <label className="flex items-center grow">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-gray-700 outline-none"
                    aria-label="상담 시간"
                  />
                </label>
              </div>
            </div>

            {/* 병원명 */}
            <div className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
              <div className="font-semibold w-[84px] text-gray-600 shrink-0">병원명</div>
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="병원 이름을 입력하세요"
                className="grow basis-[0%] font-semibold bg-transparent outline-none placeholder:text-gray-400"
              />
            </div>

            {/* 담당 의사 */}
            <div className={`items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] ${isEditMode ? '' : 'border-b'}`} style={isEditMode ? undefined : { borderBottomColor: 'rgb(233, 228, 220)' }}>
              <div className="font-semibold w-[84px] text-gray-600 shrink-0">담당 의사</div>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="의사 이름을 입력하세요"
                className="grow basis-[0%] font-semibold bg-transparent outline-none placeholder:text-gray-400"
              />
            </div>

            {/* 초진 여부 — 추가 모드에서만 표시 */}
            {!isEditMode && (
              <div className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
                <div className="font-semibold w-[84px] text-gray-600 shrink-0">초진 여부</div>
                <div className="grow basis-[0%] flex items-center justify-between">
                  <span className={`font-semibold ${isFirstVisit ? 'text-purple-700' : 'text-gray-500'}`}>
                    {isFirstVisit ? '초진' : '재진'}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isFirstVisit}
                    onClick={() => setIsFirstVisit((v) => !v)}
                  >
                    <ToggleSwitch active={isFirstVisit} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ active }: { active: boolean }) {
  return (
    <span className={`relative block w-[38px] h-[22px] rounded-[0.6875rem] transition-colors ${active ? 'bg-purple-300' : 'bg-purple-50'}`}>
      <span className={`absolute w-[18px] h-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem] transition-all ${active ? 'left-[18px]' : 'left-[2px]'}`} />
    </span>
  );
}

function parseDatetime(value: string): { date: string; time: string } {
  const match = value.match(/^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2}))?/);
  if (!match) return { date: toDateKey(new Date()), time: '10:00' };
  return { date: match[1], time: match[2] ?? '10:00' };
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function formatDateDot(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [y, m, d] = value.split('-');
  return `${y}.${m}.${d}`;
}

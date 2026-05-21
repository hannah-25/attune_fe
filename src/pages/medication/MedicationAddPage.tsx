import React, { useState } from 'react';
import { Bell, CalendarDays, Check, ChevronRight, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { createMedication } from '@/api/medication';

const MEDICATION_OPTIONS = [
  { id: 1, name: '콘서타 18mg', ingredient: '메틸페니데이트 · 1정' },
  { id: 2, name: '스트라테라 40mg', ingredient: '아토목세틴 · 1캡슐' },
  { id: 3, name: '메디키넷 10mg', ingredient: '메틸페니데이트 · 1정' },
];

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'];

export default function MedicationAddPage() {
  const navigate = useNavigate();
  const [selectedMedication, setSelectedMedication] = useState(MEDICATION_OPTIONS[0]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeDays, setActiveDays] = useState(() => new Set(['월', '화', '수', '목', '금']));
  const [holidayPause, setHolidayPause] = useState(false);
  const [reminderOn, setReminderOn] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const filteredMedications = MEDICATION_OPTIONS.filter((medication) =>
    medication.name.toLowerCase().includes(query.toLowerCase()) || medication.ingredient.toLowerCase().includes(query.toLowerCase())
  );

  const toggleDay = (day: string) => {
    setActiveDays((current) => {
      const next = new Set(current);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  };

  const saveMedication = async () => {
    setError('');
    setIsSaving(true);
    try {
      await createMedication({
        medicationId: selectedMedication.id,
        startedAt: toDateKey(new Date()),
        schedules: [
          { doseTime: '08:00:00', label: '아침', dosage: selectedMedication.ingredient },
          { doseTime: '12:30:00', label: '점심', dosage: selectedMedication.ingredient },
        ],
      });
      navigate('/medication');
    } catch {
      setError('약을 등록하지 못했습니다.');
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
          title="약 추가"
          left={<NavBackButton />}
          right={<div className="items-center flex justify-end min-w-11 h-11"><button type="button" onClick={saveMedication} disabled={isSaving} className="items-center flex font-bold justify-center h-9 bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_3px_0px_0px] text-white text-xs tracking-tight px-3 rounded-xl disabled:opacity-60">{isSaving ? '저장 중' : '저장하기'}</button></div>}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-6 pl-4">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <button type="button" onClick={() => setSearchOpen(true)} className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
              <div className="font-semibold w-[84px] text-gray-600 text-left">약 이름</div>
              <div className="grow font-semibold basis-[0%] text-left">{selectedMedication.name}</div>
              <ChevronRight className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />
            </button>
            <StaticRow label="용량/단위" value={selectedMedication.ingredient} />
            <StaticRow label="복용 시작일" value="2026.02.03" icon={<CalendarDays className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />} />
            <StaticRow label="복용 상태" value="복용 중" icon={<Check className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.7} />} />
            <StaticRow label="알림" value="하루 2회 · 08:00 / 12:30" icon={<Bell className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.4} />} last />
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <button type="button" onClick={() => setReminderOn((v) => !v)} className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
              <div className="grow basis-[0%]">
                <div className="font-semibold text-gray-700">요일 반복</div>
                <div className="mt-1 text-gray-500 text-xs">선택한 요일마다 알려드려요</div>
              </div>
              <ToggleSwitch active={reminderOn} />
            </button>
            <div className="pt-3 pr-[10px] pb-3 pl-[10px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
              <div className="flex gap-1">
                {WEEKDAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`items-center flex grow font-bold justify-center h-[38px] basis-[0%] rounded-xl ${activeDays.has(day) ? 'bg-purple-300 text-white' : 'bg-purple-50 text-gray-600'}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" onClick={() => setHolidayPause((v) => !v)} className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="grow basis-[0%]">
                <div className="font-semibold text-gray-700">휴일에 복용</div>
                <div className="mt-1 text-gray-500 text-xs">공휴일에는 알림을 쉬어요</div>
              </div>
              <ToggleSwitch active={holidayPause} />
            </button>
          </div>
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="text-gray-800 leading-normal">
              <b className="font-bold">표준 정보</b>를 함께 보여드려요. 효능, 부작용, 혈중 농도 추이까지 확인할 수 있어요.
            </div>
          </div>
        </div>
      </div>
      {searchOpen ? (
        <div className="absolute inset-0 bg-black/20 flex items-end">
          <div className="w-full bg-gray-50 rounded-t-3xl p-4 pb-6 shadow-[rgba(0,0,0,0.18)_0px_-8px_24px_0px]">
            <div className="items-center flex gap-2 mb-3">
              <Search className="w-4 h-4 text-gray-500" strokeWidth={2.4} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="약 이름 검색"
                className="grow bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="w-9 h-9 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
              </button>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden">
              {filteredMedications.map((medication, index) => (
                <button
                  key={medication.name}
                  type="button"
                  className={`w-full text-left px-4 py-3 ${index < filteredMedications.length - 1 ? 'border-b border-gray-100' : ''}`}
                  onClick={() => {
                    setSelectedMedication(medication);
                    setSearchOpen(false);
                  }}
                >
                  <div className="font-bold">{medication.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{medication.ingredient}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StaticRow({ icon, label, last, value }: { icon?: React.ReactNode; label: string; last?: boolean; value: string }) {
  return (
    <div className={`items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] ${last ? '' : 'border-b'}`} style={last ? undefined : { borderBottomColor: 'rgb(233, 228, 220)' }}>
      <div className="font-semibold w-[84px] text-gray-600">{label}</div>
      <div className="grow font-semibold basis-[0%]">{value}</div>
      {icon ?? <ChevronRight className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />}
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

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

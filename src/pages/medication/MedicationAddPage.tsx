import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

const MEDICATION_OPTIONS = [
  { name: '콘서타 18mg', ingredient: '메틸페니데이트 · 서방형' },
  { name: '스트라테라 40mg', ingredient: '아토목세틴' },
  { name: '아데랄 10mg', ingredient: '암페타민염' },
];

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'];

function ToggleSwitch({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`relative w-[46px] h-[26px] shrink-0 transition-colors rounded-[0.8125rem] ${
        checked ? 'bg-purple-500' : 'bg-gray-200'
      }`}
      onClick={onChange}
    >
      <span
        className={`absolute w-[22px] h-[22px] top-0.5 bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] transition-transform rounded-[0.6875rem] ${
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

export default function MedicationAddPage() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(MEDICATION_OPTIONS[0]);
  const [query, setQuery] = useState('');
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(true);
  const [isHolidayEnabled, setIsHolidayEnabled] = useState(false);
  const [selectedDays, setSelectedDays] = useState(['월', '화', '수', '목', '금']);

  const filteredMedications = MEDICATION_OPTIONS.filter((medication) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return true;

    return `${medication.name} ${medication.ingredient}`.toLowerCase().includes(normalizedQuery);
  });

  const closePicker = () => {
    setIsPickerOpen(false);
    setQuery('');
  };

  const selectMedication = (medication: (typeof MEDICATION_OPTIONS)[number]) => {
    setSelectedMedication(medication);
    closePicker();
  };

  const toggleDay = (day: string) => {
    setSelectedDays((currentDays) =>
      currentDays.includes(day)
        ? currentDays.filter((selectedDay) => selectedDay !== day)
        : [...currentDays, day]
    );
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="약 추가"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
          right={
            <button
              type="button"
              className="items-center flex font-bold justify-center h-9 bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_3px_0px_0px] text-white text-xs tracking-tight px-3 rounded-xl"
            >
              저장하기
            </button>
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-6 pl-4">
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <button
              type="button"
              className="items-center flex w-full text-left pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b"
              style={{ borderBottomColor: "rgb(233, 228, 220)" }}
              onClick={() => setIsPickerOpen(true)}
            >
              <div className="font-semibold w-[84px] text-gray-600">약 이름</div>
              <div className="grow font-semibold basis-[0%]">{selectedMedication.name}</div>
              <ChevronRight size={15} className="text-gray-400" strokeWidth={2.4} />
            </button>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="font-semibold w-[84px] text-gray-600">용량/단위</div>
              <div className="grow font-semibold basis-[0%]">18mg · 1정</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/f3b25369307edac67566499b953f3615e7f516fe.svg" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="font-semibold w-[84px] text-gray-600">복용 시작일</div>
              <div className="grow font-semibold basis-[0%]">2026.02.03</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/0604012b966035933a418367f12cddcc0b9c9044.svg" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="font-semibold w-[84px] text-gray-600">복용 상태</div>
              <div className="grow font-semibold basis-[0%]">복용 중</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/0a900ef9cde7b2d73c139c2b1ead895e998b927b.svg" className="block size-full" />
              </div>
            </div>
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="font-semibold w-[84px] text-gray-600">알림</div>
              <div className="grow font-semibold basis-[0%]">하루 2회 · 08:00 / 12:30</div>
              <div className="overflow-hidden w-[11px] h-[11px]">
                <img src="/icons/70864686cfb51667bb85fbc36effb4d3a23d9b27.svg" className="block size-full" />
              </div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
              <div className="grow basis-[0%]">
                <div className="font-semibold text-gray-700">요일 반복</div>
                <div className="mt-1 text-gray-500 text-xs">{isRepeatEnabled ? '선택한 요일마다 알려드려요' : '반복 없이 한 번만 복용해요'}</div>
              </div>
              <ToggleSwitch
                checked={isRepeatEnabled}
                onChange={() => setIsRepeatEnabled((current) => !current)}
                label="요일 반복"
              />
            </div>
            {isRepeatEnabled && (
              <div className="pt-3 pr-[10px] pb-3 pl-[10px] border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
                <div className="flex gap-1">
                  {WEEKDAYS.map((day) => {
                    const isSelected = selectedDays.includes(day);

                    return (
                      <button
                        key={day}
                        type="button"
                        aria-pressed={isSelected}
                        className={`items-center flex grow font-bold justify-center h-[38px] basis-[0%] rounded-xl ${
                          isSelected ? 'bg-purple-300 text-white' : 'bg-purple-50 text-gray-600'
                        }`}
                        onClick={() => toggleDay(day)}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="grow basis-[0%]">
                <div className="font-semibold text-gray-700">휴일에 복용</div>
                <div className="mt-1 text-gray-500 text-xs">{isHolidayEnabled ? '공휴일에도 알림을 유지해요' : '공휴일에는 알림을 쉬어요'}</div>
              </div>
              <ToggleSwitch
                checked={isHolidayEnabled}
                onChange={() => setIsHolidayEnabled((current) => !current)}
                label="휴일에 복용"
              />
            </div>
          </div>
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="text-gray-800 leading-normal">
              <b className="font-bold">
                표준 정보
              </b>
              를 함께 보여드려요 — 효능, 부작용, 혈중 농도 추이까지.
            </div>
          </div>
        </div>
      </div>
      {isPickerOpen && (
        <>
          <button
            type="button"
            aria-label="약 선택 닫기"
            className="fixed inset-0 bg-black/30 z-40"
            onClick={closePicker}
          />
          <div className="fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-[rgba(60,40,90,0.2)_0px_-8px_30px_0px] pt-4 px-4 pb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="font-bold text-base">약 이름 선택</div>
              <button
                type="button"
                aria-label="닫기"
                className="items-center flex justify-center w-9 h-9 bg-gray-100 rounded-[1.125rem]"
                onClick={closePicker}
              >
                <X size={18} className="text-gray-700" />
              </button>
            </div>
            <label className="items-center flex bg-gray-100 gap-2 h-11 px-3 rounded-[1.125rem]">
              <Search size={16} className="text-gray-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="grow bg-transparent outline-none font-semibold text-base placeholder:text-gray-500"
                placeholder="약 이름 또는 성분"
              />
            </label>
            <div className="mt-3 bg-white border border-gray-100 overflow-hidden rounded-2xl">
              {filteredMedications.map((medication, index) => (
                <button
                  key={medication.name}
                  type="button"
                  className="w-full items-center flex text-left py-3 px-3 gap-3 border-b last:border-b-0"
                  style={{ borderBottomColor: index === filteredMedications.length - 1 ? 'transparent' : 'rgb(233, 228, 220)' }}
                  onClick={() => selectMedication(medication)}
                >
                  <div className="items-center flex justify-center w-9 h-9 bg-purple-100 text-purple-700 font-extrabold rounded-xl">
                    약
                  </div>
                  <div className="grow min-w-0 basis-[0%]">
                    <div className="font-bold truncate">{medication.name}</div>
                    <div className="text-gray-600 text-xs truncate">{medication.ingredient}</div>
                  </div>
                  <ChevronRight size={15} className="text-gray-400" strokeWidth={2.4} />
                </button>
              ))}
              {filteredMedications.length === 0 && (
                <div className="py-5 text-center text-gray-500 font-semibold">검색 결과가 없어요</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

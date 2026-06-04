import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, Check, ChevronRight, Plus, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { NavCloseButton } from '@/components/NavButtons';
import {
  createMedication,
  getDosageId,
  searchMedications,
  updateMedication,
  type MedicationDosageOption,
  type MedicationSearchResult,
} from '@/api/medication';
import { ApiError } from '@/api/client';




export default function MedicationAddPage() {
  const navigate = useNavigate();
  const [selectedMedication, setSelectedMedication] = useState<MedicationSearchResult | null>(null);
  const [selectedDosageId, setSelectedDosageId] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MedicationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [startedAt, setStartedAt] = useState(toDateKey(new Date()));
  const [doseTimes, setDoseTimes] = useState<string[]>(['08:00']);
  const [isMedicationActive, setIsMedicationActive] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const startedAtInputRef = useRef<HTMLInputElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 검색창 열릴 때 전체 목록 로드
  useEffect(() => {
    if (!searchOpen) return;
    setQuery('');
    setIsSearching(true);
    searchMedications()
      .then(setSearchResults)
      .catch(() => setSearchResults([]))
      .finally(() => setIsSearching(false));
  }, [searchOpen]);

  // 검색어 디바운스
  useEffect(() => {
    if (!searchOpen) return;
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setIsSearching(true);
      searchMedications(query || undefined)
        .then(setSearchResults)
        .catch(() => setSearchResults([]))
        .finally(() => setIsSearching(false));
    }, 300);
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [query, searchOpen]);

  const selectMedication = (medication: MedicationSearchResult) => {
    setSelectedMedication(medication);
    const options = medication.dosageOptions ?? [];
    setSelectedDosageId(options.length === 1 ? getDosageId(options[0]) : null);
    setSearchOpen(false);
  };


  const saveMedication = async () => {
    if (!selectedMedication) {
      setError('약을 선택해 주세요.');
      return;
    }
    if (selectedDosageId === null) {
      setError('용량을 선택해 주세요.');
      return;
    }
    const schedules = doseTimes.map((value, index) => {
      const parsedDoseTime = toDoseTime(value);
      return parsedDoseTime ? { doseTime: parsedDoseTime, label: `복용 ${index + 1}` } : null;
    });
    if (schedules.some((schedule) => schedule === null)) {
      setError('복용 시간을 설정해 주세요.');
      return;
    }
    const normalizedSchedules = schedules.filter((schedule): schedule is { doseTime: string; label: string } => schedule !== null);
    const uniqueDoseTimes = new Set(normalizedSchedules.map((schedule) => schedule.doseTime));
    if (uniqueDoseTimes.size !== normalizedSchedules.length) {
      setError('복용 시간이 중복되었습니다.');
      return;
    }

    setError('');
    setIsSaving(true);
    try {
      const created = await createMedication({
        medicationDosageId: selectedDosageId,
        startedAt,
        schedules: normalizedSchedules,
      });
      if (typeof created?.userMedicationId === 'number') {
        await updateMedication(created.userMedicationId, {
          isActive: isMedicationActive,
          endAt: isMedicationActive ? undefined : toDateKey(new Date()),
        });
      }
      navigate('/medication');
    } catch (err) {
      setError(err instanceof ApiError && err.backendMessage ? err.backendMessage : '약을 등록하지 못했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const openStartedAtPicker = () => {
    const input = startedAtInputRef.current;
    if (!input) return;
    const pickerInput = input as HTMLInputElement & { showPicker?: () => void };
    if (typeof pickerInput.showPicker === 'function') { pickerInput.showPicker(); return; }
    input.focus();
    input.click();
  };

  const addDoseTime = () => {
    setDoseTimes((current) => [...current, getNextDoseTime(current)]);
  };

  const updateDoseTime = (index: number, value: string) => {
    setDoseTimes((current) => current.map((time, currentIndex) => (currentIndex === index ? value : time)));
  };

  const removeDoseTime = (index: number) => {
    setDoseTimes((current) => (current.length <= 1 ? current : current.filter((_, currentIndex) => currentIndex !== index)));
  };

  const canSave = selectedMedication !== null && selectedDosageId !== null;

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="약 추가"
          left={<NavCloseButton />}
          right={
            <div className="items-center flex justify-end min-w-11 h-11">
              <button
                type="button"
                onClick={saveMedication}
                disabled={isSaving || !canSave}
                className="items-center flex font-bold justify-center h-9 bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_3px_0px_0px] text-white text-xs tracking-tight px-3 rounded-xl disabled:opacity-60"
              >
                {isSaving ? '저장 중' : '저장하기'}
              </button>
            </div>
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-1 pr-4 pb-6 pl-4">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">

            {/* 약 이름 */}
            <button type="button" onClick={() => setSearchOpen(true)} className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
              <div className="font-semibold w-[84px] text-gray-600 text-left">약 이름</div>
              <div className={`grow font-semibold basis-[0%] text-left ${selectedMedication ? '' : 'text-gray-400'}`}>
                {selectedMedication ? selectedMedication.name : '약 이름 검색'}
              </div>
              <ChevronRight className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />
            </button>

            {/* 용량 선택 */}
            {selectedMedication && (
              <div className="items-start flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
                <div className="font-semibold w-[84px] text-gray-600 shrink-0">용량</div>
                <div className="grow basis-[0%]">
                  {(selectedMedication.dosageOptions ?? []).length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedMedication.dosageOptions ?? []).map((d) => {
                        const id = getDosageId(d);
                        return (
                          <DosageChip
                            key={id}
                            dosage={d}
                            selected={selectedDosageId === id}
                            onSelect={() => setSelectedDosageId(id)}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm font-semibold">용량 정보 없음</div>
                  )}
                </div>

              </div>
            )}

            {/* 성분 */}
            {selectedMedication && (
              <StaticRow label="성분" value={selectedMedication.ingredient} />
            )}

            {/* 복용 시작일 */}
            <div className="relative">
              <StaticRow
                label="복용 시작일"
                value={formatDateDot(startedAt)}
                icon={<CalendarDays className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />}
                onClick={openStartedAtPicker}
              />
              <input
                ref={startedAtInputRef}
                type="date"
                value={startedAt}
                onChange={(event) => setStartedAt(event.target.value)}
                className="sr-only"
                aria-label="복용 시작일"
              />
            </div>

            {/* 복용 상태 */}
            <div className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
              <div className="font-semibold w-[84px] text-gray-600">복용 상태</div>
              <div className="grow basis-[0%] flex items-center justify-between">
                <span className={`text-sm font-semibold ${isMedicationActive ? 'text-purple-700' : 'text-gray-500'}`}>
                  {isMedicationActive ? '복용 중' : '복용 중단'}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isMedicationActive}
                  onClick={() => setIsMedicationActive((v) => !v)}
                >
                  <ToggleSwitch active={isMedicationActive} />
                </button>
              </div>
            </div>

            {/* 복용 시간 */}
            <div className="items-start flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
              <div className="font-semibold w-[84px] text-gray-600 pt-[7px]">복용 시간</div>
              <div className="grow basis-[0%] flex flex-col gap-2">
                {doseTimes.map((time, index) => (
                  <div key={`${index}-${time}`} className="flex items-center gap-1.5">
                    <label className="flex grow items-center bg-gray-50 border border-gray-200 rounded-xl px-2 py-[7px]">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => updateDoseTime(index, e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-700 outline-none"
                        aria-label={`복용 시간 ${index + 1}`}
                      />
                    </label>
                    {doseTimes.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeDoseTime(index)}
                        aria-label={`복용 시간 ${index + 1} 삭제`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white"
                      >
                        <X className="h-3.5 w-3.5 text-gray-500" strokeWidth={2.5} />
                      </button>
                    ) : null}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDoseTime}
                  className="flex h-9 items-center justify-center gap-1 rounded-xl border border-purple-200 bg-purple-50 text-xs font-bold text-purple-700"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2.6} />
                  시간 추가
                </button>
              </div>
            </div>

          </div>

          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="text-gray-800 leading-normal">
              <b className="font-bold">표준 정보</b>를 함께 보여드려요. 효능, 부작용, 혈중 농도 추이까지 확인할 수 있어요.
            </div>
          </div>
        </div>
      </div>

      {/* 약 검색 시트 */}
      {searchOpen ? (
        <div className="absolute inset-0 bg-black/20 flex items-end">
          <div className="w-full bg-gray-50 rounded-t-3xl p-4 pb-6 shadow-[rgba(0,0,0,0.18)_0px_-8px_24px_0px]">
            <div className="items-center flex gap-2 mb-3">
              <Search className="w-4 h-4 text-gray-500" strokeWidth={2.4} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="약 이름 또는 성분명 검색"
                className="grow bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="w-9 h-9 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
              </button>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden max-h-[50vh] overflow-y-auto">
              {isSearching ? (
                <div className="px-4 py-6 text-center text-gray-400 text-xs">검색 중...</div>
              ) : searchResults.length === 0 ? (
                <div className="px-4 py-6 text-center text-gray-400 text-xs">검색 결과가 없습니다.</div>
              ) : (
                searchResults.map((medication, index) => (
                  <button
                    key={medication.medicationId}
                    type="button"
                    className={`w-full text-left px-4 py-3 ${index < searchResults.length - 1 ? 'border-b border-gray-100' : ''}`}
                    onClick={() => selectMedication(medication)}
                  >
                    <div className="font-bold">{medication.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{medication.ingredient}</div>
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {(medication.dosageOptions ?? []).map((d) => (
                        <span key={getDosageId(d)} className="text-[10px] font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                          {d.amount}mg
                        </span>
                      ))}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DosageChip({ dosage, selected, onSelect }: { dosage: MedicationDosageOption; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`items-center flex font-semibold text-xs gap-1 px-3 py-[7px] rounded-[62.4375rem] border transition-colors ${selected ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-white border-gray-200 text-gray-600'}`}
    >
      {selected ? <Check className="w-3 h-3" strokeWidth={2.8} /> : null}
      {dosage.amount}mg
    </button>
  );
}

function StaticRow({ icon, label, last, onClick, value }: {
  icon?: React.ReactNode;
  label: string;
  last?: boolean;
  onClick?: () => void;
  value: string;
}) {
  const cls = `items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] ${last ? '' : 'border-b'}`;
  const style = last ? undefined : { borderBottomColor: 'rgb(233, 228, 220)' };

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls} style={style}>
        <div className="font-semibold w-[84px] text-gray-600 text-left">{label}</div>
        <div className="grow font-semibold basis-[0%] text-left">{value}</div>
        {icon ?? <ChevronRight className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />}
      </button>
    );
  }

  return (
    <div className={cls} style={style}>
      <div className="font-semibold w-[84px] text-gray-600">{label}</div>
      <div className="grow font-semibold basis-[0%]">{value}</div>
      {icon}
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

function formatDateDot(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return value.replace(/-/g, '.');
}

function getNextDoseTime(times: string[]) {
  const lastTime = times[times.length - 1];
  const parsed = parseDoseClock(lastTime);
  if (!parsed) return '08:00';

  const nextMinutes = (parsed.hours * 60 + parsed.minutes + 4 * 60) % (24 * 60);
  return formatDoseClock(nextMinutes);
}

function toDoseTime(value: string) {
  if (!parseDoseClock(value)) return null;
  return `${value}:00`;
}

function parseDoseClock(value?: string) {
  if (!value) return null;

  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  return { hours, minutes };
}

function formatDoseClock(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

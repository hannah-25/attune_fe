import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, Check, ChevronRight, Search, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
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

type EditMedicationState = {
  editMode: true;
  userMedicationId: number;
  name: string;
  detail: string;
  schedule: string;
  doseTime?: string;
  startedAt?: string;
  endAt?: string | null;
  active: boolean;
};




export default function MedicationAddPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const editState = (location.state as EditMedicationState | null)?.editMode ? (location.state as EditMedicationState) : null;
  const isEditMode = editState !== null;

  const [selectedMedication, setSelectedMedication] = useState<MedicationSearchResult | null>(null);
  const [selectedDosageId, setSelectedDosageId] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MedicationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [startedAt, setStartedAt] = useState(editState?.startedAt ?? toDateKey(new Date()));
  const [endAt, setEndAt] = useState(editState?.endAt ?? '');
  const [doseTime, setDoseTime] = useState(toTimeInputValue(editState?.doseTime) ?? '08:00');
  const [isMedicationActive, setIsMedicationActive] = useState(editState?.active ?? true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const startedAtInputRef = useRef<HTMLInputElement>(null);
  const endAtInputRef = useRef<HTMLInputElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 검색창 열릴 때 전체 목록 로드
  useEffect(() => {
    if (!searchOpen) return;
    setQuery('');
    setIsSearching(true);
    searchMedications()
      .then(setSearchResults)
      .catch((err) => { console.error('Failed to load medications:', err); setSearchResults([]); })
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
        .catch((err) => { console.error('Failed to search medications:', err); setSearchResults([]); })
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
    if (isEditMode) {
      const parsedDoseTime = toDoseTime(doseTime);
      if (!parsedDoseTime) {
        setError('복용 시간을 설정해 주세요.');
        return;
      }
      const schedules = [{ doseTime: parsedDoseTime, label: '복용' }];
      const nextEndAt = resolveMedicationEndAt(isMedicationActive, endAt);
      const nextIsActive = resolveMedicationIsActive(isMedicationActive, nextEndAt);

      setError('');
      setIsSaving(true);
      try {
        await updateMedication(editState.userMedicationId, {
          isActive: nextIsActive,
          endAt: nextEndAt,
          schedules,
        });
        navigate('/medication');
      } catch (err) {
        setError(err instanceof ApiError && err.backendMessage ? err.backendMessage : '약을 수정하지 못했습니다.');
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (!selectedMedication) {
      setError('약을 선택해 주세요.');
      return;
    }
    if (selectedDosageId === null) {
      setError('용량을 선택해 주세요.');
      return;
    }
    const parsedDoseTime = toDoseTime(doseTime);
    if (!parsedDoseTime) {
      setError('복용 시간을 설정해 주세요.');
      return;
    }
    const schedules = [{ doseTime: parsedDoseTime, label: '복용' }];
    const nextEndAt = resolveMedicationEndAt(isMedicationActive, endAt);
    const nextIsActive = resolveMedicationIsActive(isMedicationActive, nextEndAt);

    setError('');
    setIsSaving(true);
    try {
      const created = await createMedication({
        medicationDosageId: selectedDosageId,
        startedAt,
        endAt: nextEndAt ?? undefined,
        schedules,
      });
      if (typeof created?.userMedicationId === 'number') {
        await updateMedication(created.userMedicationId, {
          isActive: nextIsActive,
          endAt: nextEndAt,
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

  const openEndAtPicker = () => {
    const input = endAtInputRef.current;
    if (!input) return;
    const pickerInput = input as HTMLInputElement & { showPicker?: () => void };
    if (typeof pickerInput.showPicker === 'function') { pickerInput.showPicker(); return; }
    input.focus();
    input.click();
  };

  const hasValidRange = !endAt || !startedAt || startedAt <= endAt;
  const canSave = (isEditMode || (selectedMedication !== null && selectedDosageId !== null)) && !isSaving && hasValidRange;

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title={isEditMode ? '약 수정' : '약 추가'}
          left={<NavCloseButton />}
          right={
            <div className="items-center flex justify-end min-w-11 h-11">
              <button
                type="button"
                onClick={saveMedication}
                disabled={isSaving || !canSave}
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

            {isEditMode ? (
              <>
                {/* 수정 모드: 약 이름/용량 읽기 전용 */}
                <StaticRow label="약 이름" value={editState.name} />
                <StaticRow label="복용 정보" value={editState.detail} />

                {/* 복용 시작일 읽기 전용 */}
                <StaticRow
                  label="복용 시작일"
                  value={editState.startedAt ? formatDateDot(editState.startedAt) : '-'}
                />

                {/* 종료일 편집 가능 */}
                <div className="relative">
                  <div className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
                    <div className="font-semibold w-[84px] text-gray-600 shrink-0">종료일</div>
                    <div className="grow basis-[0%] flex items-center justify-between">
                      <button type="button" onClick={openEndAtPicker} className="font-semibold text-left grow">
                        <span className={endAt ? '' : 'text-gray-400'}>{endAt ? formatDateDot(endAt) : '없음'}</span>
                      </button>
                      {endAt ? (
                        <button type="button" onClick={() => setEndAt('')} aria-label="종료일 삭제">
                          <X className="w-[13px] h-[13px] text-gray-400" strokeWidth={2.5} />
                        </button>
                      ) : (
                        <button type="button" onClick={openEndAtPicker}>
                          <CalendarDays className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    ref={endAtInputRef}
                    type="date"
                    value={endAt}
                    onChange={(event) => setEndAt(event.target.value)}
                    className="sr-only"
                    aria-label="종료일"
                  />
                </div>

                <MedicationStatusRow
                  active={isMedicationActive}
                  onToggle={() => setIsMedicationActive((v) => !v)}
                />

                <MedicationTimeRow
                  value={doseTime}
                  onChange={setDoseTime}
                  last
                />
              </>
            ) : (
              <>
                {/* 추가 모드: 기존 폼 */}
                <button type="button" onClick={() => setSearchOpen(true)} className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
                  <div className="font-semibold w-[84px] text-gray-600 text-left">약 이름</div>
                  <div className={`grow font-semibold basis-[0%] text-left ${selectedMedication ? '' : 'text-gray-400'}`}>
                    {selectedMedication ? selectedMedication.name : '약 이름 검색'}
                  </div>
                  <ChevronRight className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />
                </button>

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

                {selectedMedication && (
                  <StaticRow label="성분" value={selectedMedication.ingredient} />
                )}

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

                <div className="relative">
                  <div className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
                    <div className="font-semibold w-[84px] text-gray-600 shrink-0">종료일</div>
                    <div className="grow basis-[0%] flex items-center justify-between">
                      <button type="button" onClick={openEndAtPicker} className="font-semibold text-left grow">
                        <span className={endAt ? '' : 'text-gray-400'}>{endAt ? formatDateDot(endAt) : '없음'}</span>
                      </button>
                      {endAt ? (
                        <button type="button" onClick={() => setEndAt('')} aria-label="종료일 삭제">
                          <X className="w-[13px] h-[13px] text-gray-400" strokeWidth={2.5} />
                        </button>
                      ) : (
                        <button type="button" onClick={openEndAtPicker}>
                          <CalendarDays className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  </div>
                  <input
                    ref={endAtInputRef}
                    type="date"
                    value={endAt}
                    onChange={(event) => setEndAt(event.target.value)}
                    className="sr-only"
                    aria-label="종료일"
                  />
                </div>

                <MedicationStatusRow
                  active={isMedicationActive}
                  onToggle={() => setIsMedicationActive((v) => !v)}
                />

                <MedicationTimeRow
                  value={doseTime}
                  onChange={setDoseTime}
                  last
                />
              </>
            )}

          </div>

          {!isEditMode && (
            <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] p-3 rounded-2xl">
              <div className="text-gray-800 leading-normal">
                <b className="font-bold">표준 정보</b>를 함께 보여드려요. 효능, 부작용, 혈중 농도 추이까지 확인할 수 있어요.
              </div>
            </div>
          )}
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

function MedicationStatusRow({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <div className="items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
      <div className="font-semibold w-[84px] text-gray-600">복용 상태</div>
      <div className="grow basis-[0%] flex items-center justify-between">
        <span className={`text-sm font-semibold ${active ? 'text-purple-700' : 'text-gray-500'}`}>
          {active ? '복용 중' : '복용 중단'}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={active}
          onClick={onToggle}
        >
          <ToggleSwitch active={active} />
        </button>
      </div>
    </div>
  );
}

function MedicationTimeRow({ last, onChange, value }: { last?: boolean; onChange: (value: string) => void; value: string }) {
  const cls = `items-center flex w-full pt-[13px] pr-[14px] pb-[13px] pl-[14px] ${last ? '' : 'border-b'}`;
  const style = last ? undefined : { borderBottomColor: 'rgb(233, 228, 220)' };

  return (
    <div className={cls} style={style}>
      <div className="font-semibold w-[84px] text-gray-600">복용 시간</div>
      <div className="grow basis-[0%]">
        <label className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-2 py-[7px]">
          <input
            type="time"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full bg-transparent text-sm text-gray-700 outline-none"
            aria-label="복용 시간"
          />
        </label>
      </div>
    </div>
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

function resolveMedicationEndAt(active: boolean, endAt: string): string | null {
  const today = toDateKey(new Date());

  if (active) {
    // '복용 중'으로 설정했는데 기존 종료일이 과거면 무효화해 활성 상태를 유지한다.
    // (MedicationListPage 의 '재개' 동작과 동일하게 종료일을 비운다.)
    if (endAt && endAt < today) return null;
    return endAt || null;
  }
  return !endAt || endAt > today ? today : endAt;
}

function resolveMedicationIsActive(active: boolean, endAt: string | null): boolean {
  if (!active) return false;
  if (!endAt) return true;
  // 종료일은 포함(inclusive) — 종료일 당일까지는 복용하므로 활성 유지.
  // MedicationListPage 의 isEndedMedication(parsed < today) 분류와 일치시킨다.
  return endAt >= toDateKey(new Date());
}

function formatDateDot(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return value.replace(/-/g, '.');
}

function toTimeInputValue(value?: string) {
  if (typeof value !== 'string') return null;
  const match = value.match(/^(\d{1,2}):(\d{2})/);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// 서버 계약(api-guide/medication.md)의 doseTime 포맷은 "HH:mm" — 초를 붙이면 안 된다.
function toDoseTime(value: string) {
  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  return value;
}

import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronDown, Plus, Search, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { createConsultation, getConsultation, updateConsultationResult } from '@/api/consultation';
import {
  createMedication,
  getMedications,
  searchMedications,
  updateMedication,
  getDosageId,
  type MedicationDosageOption,
  type MedicationSearchResult,
} from '@/api/medication';

type ConsultationDetail = {
  consultationDate: string;
  place: string;
  doctorName: string;
  doctorAdvice?: string;
  prescriptionNote?: string;
  nextTreatmentGoal?: string;
};

type PrescriptionEntry = {
  key: string;
  userMedicationId?: number;
  medicationId?: number;
  name: string;
  currentAmount: number | null;
  selectedDosageId: number | null;
  originalDosageId: number | null;
  dosageOptions: MedicationDosageOption[];
  stopped: boolean;
  isNew: boolean;
  expanded: boolean;
  scheduleTime: string;
  processed?: boolean;
};

type SavedPrescriptionItem = {
  name: string;
  amount: number | null;
  prevAmount: number | null;
  status: string;
};

const STATUS_COLOR: Record<string, string> = {
  유지: 'bg-gray-100 text-gray-700',
  증량: 'bg-purple-100 text-purple-800',
  감량: 'bg-orange-100 text-orange-800',
  중단: 'bg-red-50 text-red-600',
  추가: 'bg-green-100 text-green-700',
};

function getEntryStatus(entry: PrescriptionEntry): string {
  if (entry.stopped) return '중단';
  if (entry.isNew) return '추가';
  const selectedOption = entry.dosageOptions.find(d => getDosageId(d) === entry.selectedDosageId);
  const selectedAmount = selectedOption?.amount ?? entry.currentAmount;
  if (selectedAmount === null || selectedAmount === entry.currentAmount) return '유지';
  return selectedAmount > (entry.currentAmount ?? 0) ? '증량' : '감량';
}

function serializeEntries(entries: PrescriptionEntry[]): string {
  return JSON.stringify(entries.map(e => {
    const selectedOption = e.dosageOptions.find(d => getDosageId(d) === e.selectedDosageId);
    const selectedAmount = selectedOption?.amount ?? e.currentAmount;
    return {
      name: e.name,
      amount: e.stopped ? null : selectedAmount,
      prevAmount: e.currentAmount,
      status: getEntryStatus(e),
    };
  }));
}

function parsePrescriptionNote(note: string | undefined): SavedPrescriptionItem[] {
  if (!note) return [];
  try {
    return JSON.parse(note) as SavedPrescriptionItem[];
  } catch {
    return [];
  }
}

export default function CounselingResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const consultationId = Number(searchParams.get('id'));

  const editMode = searchParams.get('mode') === 'edit';

  const [consultation, setConsultation] = useState<ConsultationDetail | null>(null);
  const [entries, setEntries] = useState<PrescriptionEntry[]>([]);
  const [addingSearch, setAddingSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MedicationSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [saved, setSaved] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [nextDateRaw, setNextDateRaw] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 21);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  });
  const [advice, setAdvice] = useState('');
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');
  const [entriesLoadFailed, setEntriesLoadFailed] = useState(false);
  const adviceRef = useRef<HTMLTextAreaElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!consultationId) return;
    let ignore = false;

    async function load() {
      try {
        const [detailResult, medsResult] = await Promise.allSettled([
          getConsultation(consultationId),
          getMedications(),
        ]);

        if (ignore) return;

        if (detailResult.status === 'fulfilled') {
          const detail = detailResult.value as unknown as ConsultationDetail;
          setConsultation(detail);
          setAdvice(detail.doctorAdvice ?? '');
          setGoal(detail.nextTreatmentGoal ?? '');
          setIsEditing(editMode);
        } else {
          setError('상담 기록을 불러오지 못했습니다.');
        }

        if (medsResult.status === 'fulfilled') {
          const built: PrescriptionEntry[] = medsResult.value
            .filter(m => m.isActive)
            .map(m => {
              const currentDosageId = m.medicationDosageId ?? null;
              const rawTime = m.schedules?.[0]?.doseTime ?? '08:00:00';
              return {
                key: `med-${m.userMedicationId}`,
                userMedicationId: m.userMedicationId,
                medicationId: m.medicationId,
                name: m.medicationName,
                currentAmount: m.dosageAmount ?? null,
                selectedDosageId: currentDosageId,
                originalDosageId: currentDosageId,
                dosageOptions: [],
                stopped: false,
                isNew: false,
                expanded: false,
                scheduleTime: rawTime.slice(0, 5),
              };
            });
          setEntries(built);
        } else {
          setEntriesLoadFailed(true);
          setError('처방 정보를 불러오지 못했습니다. 저장 시 기존 처방이 유실될 수 있어 저장이 제한됩니다.');
        }
      } catch (err) {
        console.error('Failed to load:', err);
        if (!ignore) setError('데이터를 불러오지 못했습니다.');
      }
    }

    load();
    return () => { ignore = true; };
  }, [consultationId]);

  useEffect(() => {
    if (!addingSearch || !searchQuery) { setSearchResults([]); setIsSearching(false); return; }
    let ignore = false;
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    setIsSearching(true);
    searchTimerRef.current = setTimeout(() => {
      searchMedications(searchQuery)
        .then(results => { if (!ignore) setSearchResults(results); })
        .catch(() => { if (!ignore) setSearchResults([]); })
        .finally(() => { if (!ignore) setIsSearching(false); });
    }, 300);
    return () => {
      ignore = true;
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [searchQuery, addingSearch]);

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const setDosage = (key: string, dosageId: number) => {
    setEntries(prev => prev.map(e => e.key === key ? { ...e, selectedDosageId: dosageId, stopped: false, expanded: false } : e));
    setSaved(false);
  };

  const toggleStop = (key: string) => {
    setEntries(prev => prev.map(e => e.key === key ? { ...e, stopped: !e.stopped } : e));
    setSaved(false);
  };

  const removeEntry = (key: string) => {
    setEntries(prev => prev.filter(e => e.key !== key));
    setSaved(false);
  };

  const toggleExpanded = async (key: string) => {
    const entry = entries.find(e => e.key === key);
    if (!entry) return;

    const opening = !entry.expanded;
    setEntries(prev => prev.map(e => e.key === key ? { ...e, expanded: opening } : e));

    if (opening && entry.dosageOptions.length === 0 && !entry.isNew && entry.medicationId != null) {
      try {
        const results = await searchMedications(entry.name);
        const match = results.find(r => r.medicationId === entry.medicationId);
        if (match?.dosageOptions) {
          setEntries(cur => cur.map(x => x.key === key ? { ...x, dosageOptions: match.dosageOptions! } : x));
        }
      } catch (err) {
        console.error('Failed to fetch dosage options:', err);
      }
    }
  };

  const resetToDefault = (key: string) => {
    setEntries(prev => prev.map(e => {
      if (e.key !== key) return e;
      return { ...e, selectedDosageId: e.originalDosageId, stopped: false, expanded: false };
    }));
    setSaved(false);
  };

  const setScheduleTime = (key: string, time: string) => {
    setEntries(prev => prev.map(e => e.key === key ? { ...e, scheduleTime: time } : e));
    setSaved(false);
  };

  const addNewMedication = (medication: MedicationSearchResult) => {
    const dosageOptions = medication.dosageOptions ?? [];
    const firstId = dosageOptions.length > 0 ? getDosageId(dosageOptions[0]) : null;
    setEntries(prev => [...prev, {
      key: "new-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9),
      medicationId: medication.medicationId,
      name: medication.name,
      currentAmount: null,
      selectedDosageId: firstId,
      originalDosageId: null,
      dosageOptions,
      stopped: false,
      isNew: true,
      expanded: true,
      scheduleTime: '08:00',
    }]);
    setAddingSearch(false);
    setSearchQuery('');
    setSaved(false);
  };

  const saveResult = async () => {
    if (isSaving) return;
    if (!consultationId) {
      setError('상담 ID가 없어 저장할 수 없습니다.');
      return;
    }
    if (entriesLoadFailed) {
      setError('처방 정보를 불러오지 못했습니다. 페이지를 새로고침 후 다시 시도해주세요.');
      return;
    }
    setError('');
    setIsSaving(true);

    const today = toDateKey(new Date());

    try {
      try {
        await updateConsultationResult(consultationId, {
          doctorAdvice: advice,
          prescriptionNote: serializeEntries(entries),
          nextTreatmentGoal: goal,
        });
      } catch {
        setError('상담 결과를 저장하지 못했습니다.');
        setIsSaving(false);
        return;
      }

      const applyEntry = async (entry: PrescriptionEntry): Promise<((prev: PrescriptionEntry[]) => PrescriptionEntry[]) | null> => {
        const status = getEntryStatus(entry);
        const doseTime = `${entry.scheduleTime || '08:00'}:00`;
        const schedules = [{ doseTime, label: '복용' }];

        if (status === '중단' && entry.userMedicationId) {
          if (entry.processed) return null;
          await updateMedication(entry.userMedicationId, { endAt: today, isActive: false });
          return (prev) => prev.filter(e => e.key !== entry.key);
        }
        if (status === '추가' && entry.selectedDosageId) {
          const result = await createMedication({
            medicationDosageId: entry.selectedDosageId,
            consultationId,
            startedAt: today,
            schedules,
          });
          const selectedOption = entry.dosageOptions.find(d => getDosageId(d) === entry.selectedDosageId);
          return (prev) => prev.map(e => e.key === entry.key ? {
            ...e,
            isNew: false,
            userMedicationId: result.userMedicationId,
            currentAmount: selectedOption?.amount ?? e.currentAmount,
          } : e);
        }
        if ((status === '증량' || status === '감량') && entry.userMedicationId && entry.selectedDosageId) {
          const oldMedicationId = entry.userMedicationId;
          await updateMedication(oldMedicationId, { endAt: today, isActive: false });
          let result;
          try {
            result = await createMedication({
              medicationDosageId: entry.selectedDosageId,
              consultationId,
              startedAt: today,
              schedules,
            });
          } catch (createErr) {
            // roll back the deactivation so the entry stays consistent for retry
            try { await updateMedication(oldMedicationId, { endAt: null, isActive: true }); } catch { /* best effort */ }
            throw createErr;
          }
          const selectedOption = entry.dosageOptions.find(d => getDosageId(d) === entry.selectedDosageId);
          return (prev) => prev.map(e => e.key === entry.key ? {
            ...e,
            userMedicationId: result.userMedicationId,
            currentAmount: selectedOption?.amount ?? e.currentAmount,
          } : e);
        }
        return null;
      };

      const results = await Promise.allSettled(entries.map(applyEntry));
      const patches = results
        .map(r => r.status === 'fulfilled' ? r.value : null);
      if (patches.some(p => p !== null)) {
        setEntries(prev => patches.reduce((acc, patch) => patch ? patch(acc) : acc, prev));
      }

      const hasFailure = results.some(r => r.status === 'rejected');
      if (hasFailure) {
        setError('처방 업데이트 중 일부 실패했습니다. 성공한 항목은 반영되었으니 다시 시도해주세요.');
        setIsSaving(false);
        return;
      }

      if (nextDateRaw && consultation) {
        try {
          await createConsultation({
            consultationDate: `${nextDateRaw}T10:00:00`,
            place: consultation.place,
            doctorName: consultation.doctorName,
            isFirstVisit: false,
          });
        } catch {
          // 처방/상담 결과는 이미 저장됐으므로 다음 진료 일정 생성 실패가 이동을 막지 않음
          console.error('다음 진료 일정 생성 실패');
        }
      }

      navigate('/counseling');
    } finally {
      setIsSaving(false);
    }
  };

  const savedPrescription = parsePrescriptionNote(consultation?.prescriptionNote);

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="상담 후 기록"
          left={<NavBackButton onClick={() => navigate(-1)} />}
          right={
            <div className="h-11 flex items-center">
              {isEditing ? (
                !saved && (
                  <button
                    type="button"
                    onClick={saveResult}
                    disabled={isSaving}
                    className="text-sm px-5 py-2 rounded-xl font-bold text-white whitespace-nowrap bg-[rgb(31,27,46)] transition-all active:scale-[0.97] disabled:opacity-50 disabled:active:scale-100"
                  >
                    {isSaving ? '저장 중...' : '저장'}
                  </button>
                )
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-end min-w-11 h-11 text-sm font-bold text-purple-600"
                >
                  수정
                </button>
              )}
            </div>
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-5 pt-1 pr-4 pb-8 pl-4">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}

          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="flex items-center gap-4">
              <div className="shrink-0 text-center">
                <div className="text-xs text-purple-700 font-semibold">
                  {consultation ? new Date(consultation.consultationDate).getMonth() + 1 : '-'}월
                </div>
                <div className="font-extrabold text-3xl leading-none text-gray-700 mt-0.5" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                  {consultation ? new Date(consultation.consultationDate).getDate() : '-'}
                </div>
              </div>
              <div className="w-px self-stretch bg-purple-200" />
              <div className="min-w-0">
                <div className="font-bold text-base text-gray-900">{consultation?.place ?? '상담 기록'}</div>
                <div className="text-sm text-gray-500 mt-0.5">{consultation?.doctorName ?? '-'}</div>
              </div>
            </div>
          </div>

          {isEditing ? (
            <>
              <EditableBlock title="의사 조언">
                <textarea
                  ref={adviceRef}
                  value={advice}
                  onChange={(e) => { setAdvice(e.target.value); setSaved(false); autoResize(e.target); }}
                  rows={3}
                  className="w-full text-base text-gray-700 leading-relaxed resize-none outline-none overflow-hidden bg-transparent placeholder:text-gray-300"
                  placeholder="의사 조언을 입력하세요"
                />
              </EditableBlock>

              <div>
                <div className="font-bold text-gray-800 mb-2">처방 입력</div>
                <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
                  {entries.map((entry, index) => {
                    const status = getEntryStatus(entry);
                    const isLast = index === entries.length - 1;
                    const showBorder = !isLast || addingSearch;
                    const selectedOption = entry.dosageOptions.find(d => getDosageId(d) === entry.selectedDosageId);
                    const hasChange = !entry.isNew && !entry.stopped && selectedOption && selectedOption.amount !== entry.currentAmount;
                    const showChips = entry.dosageOptions.length > 0 && (entry.expanded || entry.isNew);
                    return (
                      <div
                        key={entry.key}
                        className={`px-4 py-3 ${showBorder ? 'border-b' : ''}`}
                        style={showBorder ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}
                      >
                        <div className="flex items-center justify-between gap-2">
                          {!entry.isNew ? (
                            <button
                              type="button"
                              onClick={() => toggleExpanded(entry.key)}
                              className="flex items-center gap-1.5 min-w-0 flex-1 text-left"
                            >
                              <ChevronDown
                                className={`w-3.5 h-3.5 shrink-0 transition-transform ${entry.expanded ? 'rotate-180 text-purple-500' : 'text-gray-300'}`}
                                strokeWidth={2.5}
                              />
                              <span className={`font-semibold truncate ${entry.stopped ? 'text-gray-400 line-through' : ''}`}>
                                {entry.name}{entry.currentAmount ? ` ${entry.currentAmount}mg` : ''}
                              </span>
                              {hasChange && (
                                <span className="shrink-0 text-xs font-semibold text-purple-600">
                                  → {selectedOption!.amount}mg
                                </span>
                              )}
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 min-w-0 flex-1">
                              <div className="w-1.5 h-1.5 bg-purple-300 rounded-full shrink-0" />
                              <span className="font-semibold truncate">{entry.name}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${STATUS_COLOR[status] ?? 'bg-gray-100 text-gray-700'}`}>
                              {status}
                            </span>
                            {entry.isNew && (
                              <>
                                <input
                                  type="time"
                                  value={entry.scheduleTime}
                                  onChange={e => setScheduleTime(entry.key, e.target.value)}
                                  className="text-xs text-gray-400 bg-transparent outline-none w-[68px]"
                                />
                                <button type="button" onClick={() => removeEntry(entry.key)} className="text-gray-300 hover:text-red-400">
                                  <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        {showChips && (
                          <div className="flex flex-wrap gap-1.5 ml-3.5 mt-2">
                            {entry.dosageOptions.map(d => {
                              const id = getDosageId(d);
                              const isSelected = !entry.stopped && entry.selectedDosageId === id;
                              return (
                                <button
                                  key={id}
                                  type="button"
                                  onClick={() => setDosage(entry.key, id)}
                                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                                    isSelected
                                      ? 'bg-purple-100 border-purple-300 text-purple-800'
                                      : 'bg-white border-gray-200 text-gray-600'
                                  }`}
                                >
                                  {d.amount}mg
                                </button>
                              );
                            })}
                            {!entry.isNew && (
                              <button
                                type="button"
                                onClick={() => toggleStop(entry.key)}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                                  entry.stopped
                                    ? 'bg-red-50 border-red-300 text-red-500'
                                    : 'bg-white border-gray-200 text-gray-400'
                                }`}
                              >
                                중단
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {addingSearch ? (
                    <>
                      <div className="flex items-center gap-2 px-4 pt-3 pb-2">
                        <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" strokeWidth={2.4} />
                        <input
                          autoFocus
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          placeholder="약 이름 검색"
                          className="grow bg-transparent outline-none text-sm placeholder:text-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => { setAddingSearch(false); setSearchQuery(''); }}
                          className="text-gray-400 shrink-0"
                        >
                          <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </button>
                      </div>
                      {searchQuery.length > 0 && (
                        <div className="border-t mx-3 mb-1" style={{ borderTopColor: 'rgb(233, 228, 220)' }}>
                          {isSearching ? (
                            <div className="py-4 text-center text-gray-400 text-xs">검색 중...</div>
                          ) : searchResults.length === 0 ? (
                            <div className="py-4 text-center text-gray-400 text-xs">검색 결과가 없습니다.</div>
                          ) : (
                            searchResults.slice(0, 5).map((med, index) => (
                              <button
                                key={med.medicationId}
                                type="button"
                                onClick={() => addNewMedication(med)}
                                className={`w-full text-left px-1 py-2.5 ${index < Math.min(searchResults.length, 5) - 1 ? 'border-b' : ''}`}
                                style={index < Math.min(searchResults.length, 5) - 1 ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}
                              >
                                <div className="font-semibold text-sm">{med.name}</div>
                                <div className="flex gap-1 mt-1 flex-wrap">
                                  {(med.dosageOptions ?? []).map(d => (
                                    <span key={getDosageId(d)} className="text-[10px] font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                                      {d.amount}mg
                                    </span>
                                  ))}
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAddingSearch(true)}
                      className="flex items-center w-full text-left text-gray-500 gap-2 pt-3 pr-4 pb-3 pl-4 transition-all active:scale-[0.99]"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                      <span>약 추가</span>
                    </button>
                  )}
                </div>
              </div>

              <EditableBlock title="다음 달 치료 목표">
                <textarea
                  value={goal}
                  onChange={(e) => { setGoal(e.target.value); setSaved(false); autoResize(e.target); }}
                  rows={2}
                  className="w-full text-base text-gray-700 leading-relaxed resize-none outline-none overflow-hidden bg-transparent placeholder:text-gray-300"
                  placeholder="다음 상담까지의 목표를 입력하세요"
                />
              </EditableBlock>

              <div className="bg-purple-50 border border-purple-100 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] p-3 rounded-2xl">
                <div className="flex items-start gap-2">
                  <CalendarDays className="w-4 h-4 text-purple-500 shrink-0 mt-[3px]" strokeWidth={2.4} />
                  <div>
                    <div className="font-bold text-gray-800 flex items-center gap-1.5">
                      다음 진료
                      <input
                        type="date"
                        value={nextDateRaw}
                        onChange={(e) => { setNextDateRaw(e.target.value); setSaved(false); }}
                        className="font-bold bg-transparent outline-none text-gray-800 border-b border-gray-300 focus:border-purple-500 text-sm"
                      />
                    </div>
                    <div className="mt-1 text-gray-500 text-xs">저장하면 다음 진료 일정이 자동으로 추가돼요</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <ViewBlock title="의사 조언">
                {advice ? (
                  <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{advice}</p>
                ) : (
                  <p className="text-base text-gray-300">기록된 조언이 없어요</p>
                )}
              </ViewBlock>

              <div>
                <div className="font-bold text-gray-800 mb-2">처방</div>
                <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
                  {savedPrescription.length > 0 ? (
                    savedPrescription.map((item, index) => {
                      const isLast = index === savedPrescription.length - 1;
                      return (
                        <div
                          key={`${item.name}-${index}`}
                          className={`flex items-center gap-2 px-4 py-3 ${!isLast ? 'border-b' : ''}`}
                          style={!isLast ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}
                        >
                          <div className="w-1.5 h-1.5 bg-purple-300 rounded-full shrink-0" />
                          <span className={`font-semibold flex-1 ${item.status === '중단' ? 'text-gray-400 line-through' : ''}`}>
                            {item.name}{item.amount != null ? ` ${item.amount}mg` : ''}
                          </span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${STATUS_COLOR[item.status] ?? 'bg-gray-100 text-gray-700'}`}>
                            {item.status}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-4 py-3 text-gray-300">기록된 처방이 없어요</div>
                  )}
                </div>
              </div>

              <ViewBlock title="다음 달 치료 목표">
                {goal ? (
                  <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{goal}</p>
                ) : (
                  <p className="text-base text-gray-300">기록된 목표가 없어요</p>
                )}
              </ViewBlock>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function toDateKey(date: Date) {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

function EditableBlock({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div>
      <div className="font-bold text-gray-800 mb-2">{title}</div>
      <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-2xl">
        {children}
      </div>
    </div>
  );
}

function ViewBlock({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div>
      <div className="font-bold text-gray-800 mb-2">{title}</div>
      <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-2xl">
        {children}
      </div>
    </div>
  );
}

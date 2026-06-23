import React, { useCallback, useEffect, useState } from 'react';
import { Bell, BellOff, ChevronDown, ChevronUp, Clock, History, MoreVertical, Pencil, Pill, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  createQuickMedicationLog,
  getAllMedicationLogs,
  getMedications,
  type MedicationListResponse,
  type MedicationPeriodLog,
  type MedicationScheduleSummary,
  type MedicationSummary,
  updateMedication,
} from '@/api/medication';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { useDelayedLoading } from '@/lib/useDelayedLoading';

const CARD_BACKGROUNDS = ['bg-purple-300', 'bg-purple-500', 'bg-purple-400', 'bg-purple-600'];

type MedicationCard = {
  userMedicationId: number;
  medicationId?: number;
  name: string;
  detail: string;
  schedule: string;
  active: boolean;
  alarmActive: boolean;
  startedAt?: string;
  endAt?: string | null;
  schedules: MedicationScheduleSummary[];
  bg: string;
};

type NextDose = {
  userMedicationId: number;
  scheduleId: number;
  name: string;
  time: string;
  dueAt: Date;
};

type TodayDoseSummary = {
  taken: number;
  total: number;
};

export default function MedicationListPage() {
  const navigate = useNavigate();
  const [pastOpen, setPastOpen] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [activeMedications, setActiveMedications] = useState<MedicationCard[]>([]);
  const [pastMedications, setPastMedications] = useState<MedicationCard[]>([]);
  const [nextDose, setNextDose] = useState<NextDose | null>(null);
  const [todayDoseSummary, setTodayDoseSummary] = useState<TodayDoseSummary>({ taken: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const showLoading = useDelayedLoading(isLoading);
  const [isLogging, setIsLogging] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [togglingAlarmId, setTogglingAlarmId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [actionSheetTarget, setActionSheetTarget] = useState<MedicationCard | null>(null);

  const handleEditMedication = (medication: MedicationCard) => {
    setActionSheetTarget(null);
    navigate('/medication/add', {
      state: {
        editMode: true,
        userMedicationId: medication.userMedicationId,
        name: medication.name,
        detail: medication.detail,
        schedule: medication.schedule,
        startedAt: medication.startedAt,
        endAt: medication.endAt,
        active: medication.active,
      },
    });
  };

  const loadMedications = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const todayKey = toDateKey(new Date());
      const [response, logsResponse] = await Promise.all([
        getMedications(),
        getAllMedicationLogs({ startDate: todayKey, endDate: todayKey }),
      ]);
      const allMedications = normalizeMedicationList(response);
      const { active, past } = splitMedicationGroups(allMedications);
      const loggedScheduleKeys = buildLoggedScheduleKeys(active, logsResponse.logs);
      const takenScheduleKeys = buildTakenScheduleKeys(active, logsResponse.logs);
      const next = findNextDose(active, loggedScheduleKeys);

      setActiveMedications(active);
      setPastMedications(past);
      setNextDose(next);
      setTodayDoseSummary(buildTodayDoseSummary(active, takenScheduleKeys));
      setSecondsLeft(next ? getSecondsUntil(next.dueAt) : null);
    } catch (err) {
      console.error('Failed to load medications:', err);
      setError('복용 목록을 불러오지 못했습니다.');
      setActiveMedications([]);
      setPastMedications([]);
      setNextDose(null);
      setTodayDoseSummary({ taken: 0, total: 0 });
      setSecondsLeft(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMedications();
  }, [loadMedications]);

  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((current) => (current === null ? null : Math.max(0, current - 1)));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const handleTakeNow = async () => {
    if (!nextDose || isLogging) return;
    if (typeof nextDose.userMedicationId !== 'number') {
      setError('복용 기록에 필요한 약물 정보를 찾지 못했습니다.');
      return;
    }

    setError('');
    setIsLogging(true);

    try {
      await createQuickMedicationLog(nextDose.userMedicationId, {
        action: 'TAKEN',
        scheduleId: nextDose.scheduleId,
      });
      await loadMedications();
    } catch (err) {
      console.error('Failed to save medication log:', err);
      setError('복용 기록을 저장하지 못했습니다.');
    } finally {
      setIsLogging(false);
    }
  };

  const handleChangeMedicationStatus = async (medication: MedicationCard, nextIsActive: boolean) => {
    if (togglingId !== null) return;

    setError('');
    setTogglingId(medication.userMedicationId);

    try {
      await updateMedication(medication.userMedicationId, {
        isActive: nextIsActive,
        endAt: nextIsActive ? null : toDateKey(new Date()),
      });
      await loadMedications();
    } catch (err) {
      console.error('Failed to change medication status:', err);
      setError('약 상태를 변경하지 못했습니다.');
    } finally {
      setTogglingId(null);
    }
  };

  const handleSkipDose = async () => {
    if (!nextDose || isLogging) return;
    if (typeof nextDose.userMedicationId !== 'number') {
      setError('복용 기록에 필요한 약물 정보를 찾지 못했습니다.');
      return;
    }

    setError('');
    setIsLogging(true);

    try {
      await createQuickMedicationLog(nextDose.userMedicationId, {
        action: 'SKIPPED',
        scheduleId: nextDose.scheduleId,
      });
      await loadMedications();
    } catch (err) {
      console.error('Failed to save skip log:', err);
      setError('스킵 기록을 저장하지 못했습니다.');
    } finally {
      setIsLogging(false);
    }
  };

  const handleToggleAlarm = async (medication: MedicationCard) => {
    if (togglingAlarmId !== null) return;
    setError('');
    const next = !medication.alarmActive;
    setActiveMedications((prev) =>
      prev.map((m) => m.userMedicationId === medication.userMedicationId ? { ...m, alarmActive: next } : m)
    );
    setTogglingAlarmId(medication.userMedicationId);
    try {
      await updateMedication(medication.userMedicationId, { alarmActive: next });
    } catch (err) {
      console.error('Failed to toggle alarm:', err);
      setError('알람 설정을 변경하지 못했습니다.');
      setActiveMedications((prev) =>
        prev.map((m) => m.userMedicationId === medication.userMedicationId ? { ...m, alarmActive: !next } : m)
      );
    } finally {
      setTogglingAlarmId(null);
    }
  };

  const openMedicationInfo = (medication: MedicationCard) => {
    if (typeof medication.medicationId !== 'number') {
      setError('약품 표준 정보를 확인할 수 없습니다.');
      return;
    }
    navigate(`/medication/info?id=${medication.medicationId}`);
  };

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="relative flex flex-col flex-1 min-h-0">
        <TopBar
          title="복용 중인 약"
          left={<NavBackButton />}
          right={<HeaderIconButton icon={<History className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} onClick={() => navigate('/medication/history')} />}
        />
        <ScrollArea className="flex flex-col gap-3 pt-1">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] p-4 rounded-[1.625rem]">
            {nextDose ? (
              <>
                <div className="font-bold text-gray-500 text-xs mb-1">다음 복용</div>
                <div className="font-extrabold text-xl leading-tight" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                  {nextDose.name}
                </div>
                <div className="items-center flex mt-1.5 gap-2">
                  <span className="text-xs font-semibold text-gray-500">{nextDose.time}</span>
                  {secondsLeft !== null ? (
                    <span className="text-xs font-bold text-purple-700 bg-purple-200 px-2 py-0.5 rounded-full">
                      {formatCountdown(secondsLeft)} 후
                    </span>
                  ) : null}
                  <span className="ml-auto text-xs font-semibold text-gray-500">
                    오늘 {todayDoseSummary.taken}/{todayDoseSummary.total}
                  </span>
                </div>
                <div className="flex mt-3 gap-1.5">
                  <button
                    type="button"
                    onClick={handleTakeNow}
                    disabled={isLogging}
                    className="items-center flex grow font-bold justify-center h-9 bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem] disabled:opacity-50 transition-opacity"
                  >
                    <span className="block">{isLogging ? '기록 중' : '지금 복용'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSkipDose}
                    disabled={isLogging}
                    className="items-center flex grow font-bold justify-center h-9 border-gray-900 border basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem] disabled:opacity-50"
                  >
                    <span className="block">건너뛰기</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="font-bold text-gray-500 text-xs mb-1">오늘 복용</div>
                <div className="font-extrabold text-xl leading-tight" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                  {todayDoseSummary.total > 0
                    ? (todayDoseSummary.taken >= todayDoseSummary.total ? '오늘 복용 완료' : '오늘 복용 미완료')
                    : '복용 일정 없음'}
                </div>
                <div className="items-center flex mt-1.5 gap-2">
                  {todayDoseSummary.total > 0 ? (
                    <span className="text-xs font-semibold text-gray-500">
                      {todayDoseSummary.taken}/{todayDoseSummary.total}회 복용
                    </span>
                  ) : null}
                </div>
              </>
            )}
          </div>
          <div className="font-bold text-gray-600 pt-1 pr-1 pb-0 pl-1">복용 중 ({activeMedications.length})</div>
          {showLoading && activeMedications.length === 0 && pastMedications.length === 0 ? (
            <div className="flex flex-col items-center text-center py-12 gap-3">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl animate-pulse">
                <Pill className="h-8 w-8 text-purple-400" strokeWidth={1.5} />
              </div>
              <div className="font-semibold text-sm text-gray-700">복약 정보를 불러오고 있어요</div>
              <div className="text-xs text-gray-400">잠시만 기다려 주세요</div>
            </div>
          ) : null}
          {activeMedications.map((medication) => (
            <div
              key={medication.userMedicationId}
              className="bg-white shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] p-[14px] rounded-[1.375rem]"
            >
              <div className="items-center flex gap-2.5">
                <div className={`items-center flex justify-center w-[38px] h-[38px] ${medication.bg} rounded-xl shrink-0`}>
                  <Pill className="w-[18px] h-[18px] text-white" strokeWidth={2.4} />
                </div>
                <button type="button" onClick={() => openMedicationInfo(medication)} className="grow basis-[0%] text-left">
                  <div className="font-bold text-sm">{medication.name}</div>
                  <div className="text-gray-600 text-xs">{medication.detail}</div>
                </button>
                <button
                  type="button"
                  aria-label={`${medication.name} 더보기`}
                  onClick={() => setActionSheetTarget(medication)}
                  className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full text-gray-500 bg-gray-100 active:bg-gray-200"
                >
                  <MoreVertical className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
              <div className="items-center flex mt-3 bg-gray-100 text-gray-800 gap-1.5 pt-2 pr-[10px] pb-2 pl-[10px] rounded-xl">
                <Clock className="w-[11px] h-[11px] text-gray-600" strokeWidth={2.5} />
                <span className="grow">{medication.schedule}</span>
                <button
                  type="button"
                  aria-label={medication.alarmActive ? '알람 끄기' : '알람 켜기'}
                  onClick={() => void handleToggleAlarm(medication)}
                  disabled={togglingAlarmId === medication.userMedicationId}
                  className="shrink-0 disabled:opacity-50"
                >
                  {medication.alarmActive
                    ? <Bell className="w-[13px] h-[13px] text-purple-500" strokeWidth={2.4} />
                    : <BellOff className="w-[13px] h-[13px] text-gray-400" strokeWidth={2.4} />
                  }
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => setPastOpen((open) => !open)} className="items-center flex w-full text-left pt-2 pr-1 pb-0 pl-1 gap-1">
            <div className="font-bold text-gray-600 grow">지난 약 ({pastMedications.length})</div>
            {pastOpen ? <ChevronUp className="w-4 h-4 text-gray-400" strokeWidth={2.5} /> : <ChevronDown className="w-4 h-4 text-gray-400" strokeWidth={2.5} />}
          </button>
          {pastOpen && pastMedications.map((medication) => (
            <div key={medication.userMedicationId} className="bg-gray-100 border border-gray-200 shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] p-[14px] rounded-[1.375rem]">
              <div className="items-center flex gap-2.5 opacity-[0.7]">
                <div className="items-center flex justify-center w-[38px] h-[38px] bg-[rgb(208,201,189)] rounded-xl">
                  <Pill className="w-[18px] h-[18px] text-white" strokeWidth={2.4} />
                </div>
                <div className="grow basis-[0%]">
                  <div className="font-bold text-sm">{medication.name}</div>
                  <div className="text-gray-600 text-xs">{formatMedicationPeriod(medication)}</div>
                </div>
                <button
                  type="button"
                  onClick={() => void handleChangeMedicationStatus(medication, true)}
                  disabled={togglingId === medication.userMedicationId}
                  className={`items-center flex font-semibold whitespace-nowrap border border-purple-300 bg-purple-100 text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem] ${togglingId === medication.userMedicationId ? 'opacity-60' : ''}`}
                >
                  <span className="block">재개</span>
                </button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <button
          type="button"
          onClick={() => navigate('/medication/add')}
          className="items-center flex font-bold absolute h-12 right-4 bottom-[88px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.2)_0px_8px_22px_0px] text-white text-sm gap-1.5 pt-0 pr-[18px] pb-0 pl-[18px] z-[25] rounded-3xl transition-all active:scale-[0.97]"
        >
          <Plus className="w-[14px] h-[14px]" strokeWidth={2.5} />
          <span className="block">약 추가</span>
        </button>
        <TabBar active="약" />

        {actionSheetTarget ? (
          <div
            className="fixed inset-0 bg-black/30 flex items-end z-50"
            onClick={() => setActionSheetTarget(null)}
          >
            <div
              className="w-full bg-white rounded-t-3xl pt-5 pb-10 px-4 shadow-[rgba(0,0,0,0.18)_0px_-8px_24px_0px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-bold text-base text-center mb-1">{actionSheetTarget.name}</div>
              <div className="text-xs text-gray-500 text-center mb-5">{actionSheetTarget.detail}</div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleEditMedication(actionSheetTarget)}
                  className="items-center flex justify-center gap-2 w-full font-bold h-12 bg-[rgb(31,27,46)] text-white rounded-2xl"
                >
                  <Pencil className="w-4 h-4" strokeWidth={2.4} />
                  수정하기
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActionSheetTarget(null);
                    void handleChangeMedicationStatus(actionSheetTarget, false);
                  }}
                  disabled={togglingId === actionSheetTarget.userMedicationId}
                  className="items-center flex justify-center w-full font-bold h-12 border border-red-200 bg-red-50 text-red-700 rounded-2xl disabled:opacity-60"
                >
                  복용 중단
                </button>
                <button
                  type="button"
                  onClick={() => setActionSheetTarget(null)}
                  className="items-center flex justify-center w-full font-semibold h-12 text-gray-500"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function formatCountdown(seconds: number) {
  const totalMinutes = seconds > 0 ? Math.ceil(seconds / 60) : 0;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${String(minutes).padStart(2, '0')}`;
}

function normalizeMedicationList(response: MedicationListResponse): MedicationCard[] {
  return response
    .map((medication, index) => normalizeMedication(medication, index))
    .filter((medication): medication is MedicationCard => medication !== null);
}

function normalizeMedication(medication: MedicationSummary, index: number): MedicationCard | null {
  if (typeof medication.userMedicationId !== 'number' || !medication.medicationName) return null;

  const schedules = medication.schedules ?? [];
  const dosageLabel = medication.dosageAmount != null ? `${medication.dosageAmount}mg` : undefined;

  return {
    userMedicationId: medication.userMedicationId,
    medicationId: medication.medicationId,
    name: medication.medicationName,
    detail: buildMedicationDetail(dosageLabel, medication.startedAt),
    schedule: buildScheduleLabel(schedules),
    active: medication.isActive,
    alarmActive: medication.alarmActive ?? true,
    startedAt: medication.startedAt,
    endAt: medication.endAt,
    schedules,
    bg: CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length],
  };
}

function buildMedicationDetail(ingredient?: string, startedAt?: string) {
  const startedLabel = startedAt ? `${formatDateLabel(startedAt)}~` : '';
  if (ingredient && startedLabel) return `${ingredient} · ${startedLabel}`;
  if (ingredient) return ingredient;
  return startedLabel || '-';
}

function buildScheduleLabel(schedules: MedicationScheduleSummary[]) {
  const times = schedules
    .map((schedule) => toTimeLabel(schedule.doseTime))
    .filter((time): time is string => Boolean(time));

  if (times.length === 0) return '복용 일정 없음';
  return `하루 ${times.length}회 · ${times.join(', ')}`;
}

function splitMedicationGroups(medications: MedicationCard[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const active: MedicationCard[] = [];
  const past: MedicationCard[] = [];

  medications.forEach((medication) => {
    if (medication.active && !isEndedMedication(medication.endAt, today)) {
      active.push(medication);
      return;
    }
    past.push(medication);
  });

  return { active, past };
}

function isEndedMedication(endAt: string | null | undefined, today: Date) {
  if (!endAt) return false;
  const parsed = parseDateValue(endAt);
  if (Number.isNaN(parsed.getTime())) return false;
  return parsed < today;
}

function buildLoggedScheduleKeys(medications: MedicationCard[], logs: MedicationPeriodLog[]) {
  return buildScheduleKeysFromLogs(medications, logs);
}

function buildTakenScheduleKeys(medications: MedicationCard[], logs: MedicationPeriodLog[]) {
  return buildScheduleKeysFromLogs(medications, logs.filter((log) => log.taken));
}

function buildScheduleKeysFromLogs(medications: MedicationCard[], logs: MedicationPeriodLog[]) {
  const scheduleKeys = new Set<string>();

  logs.forEach((log) => {
    const medication = medications.find((item) => item.userMedicationId === log.userMedicationId);
    if (!medication) return;

    const matchedSchedule = findClosestSchedule(medication.schedules, log.intakeTime);
    if (matchedSchedule) {
      scheduleKeys.add(buildDoseKey(log.userMedicationId, matchedSchedule.scheduleId));
    }
  });

  return scheduleKeys;
}

function buildTodayDoseSummary(medications: MedicationCard[], takenScheduleKeys: Set<string>): TodayDoseSummary {
  let total = 0;
  let taken = 0;

  medications.forEach((medication) => {
    medication.schedules.forEach((schedule) => {
      if (typeof schedule.scheduleId !== 'number') return;

      total += 1;
      if (takenScheduleKeys.has(buildDoseKey(medication.userMedicationId, schedule.scheduleId))) {
        taken += 1;
      }
    });
  });

  return { taken, total };
}

function findNextDose(medications: MedicationCard[], takenScheduleKeys: Set<string>): NextDose | null {
  const now = new Date();
  let candidate: NextDose | null = null;

  medications.forEach((medication) => {
    medication.schedules.forEach((schedule) => {
      if (typeof schedule.scheduleId !== 'number') return;
      const dueAt = getNextOccurrence(schedule.doseTime, now);
      if (!dueAt) return;
      // 오늘 일정만 표시 — 내일 스케줄은 후보에서 제외
      if (!isSameDate(dueAt, now)) return;
      const isTakenToday = takenScheduleKeys.has(buildDoseKey(medication.userMedicationId, schedule.scheduleId));
      if (isTakenToday) return;

      const nextDose: NextDose = {
        userMedicationId: medication.userMedicationId,
        scheduleId: schedule.scheduleId,
        name: medication.name,
        time: toTimeLabel(schedule.doseTime),
        dueAt,
      };

      if (!candidate || nextDose.dueAt.getTime() < candidate.dueAt.getTime()) {
        candidate = nextDose;
      }
    });
  });

  return candidate;
}

function findClosestSchedule(schedules: MedicationScheduleSummary[], intakeTime: string): MedicationScheduleSummary | null {
  const date = new Date(intakeTime);
  if (Number.isNaN(date.getTime())) return null;
  const intakeMinutes = date.getHours() * 60 + date.getMinutes();

  let closest: MedicationScheduleSummary | null = null;
  let minDiff = Infinity;

  schedules.forEach((schedule) => {
    const scheduleMinutes = toMinutes(schedule.doseTime);
    if (scheduleMinutes === null) return;

    const diff = Math.abs(intakeMinutes - scheduleMinutes);
    if (diff < minDiff) {
      minDiff = diff;
      closest = schedule;
    }
  });

  return minDiff <= 240 ? closest : null;
}

function buildDoseKey(userMedicationId: number, scheduleId: number) {
  return `${userMedicationId}-${scheduleId}`;
}

function getNextOccurrence(doseTime: string, baseDate: Date) {
  const time = parseTime(doseTime);
  if (!time) return null;

  const dueAt = new Date(baseDate);
  dueAt.setHours(time.hours, time.minutes, 0, 0);

  if (dueAt.getTime() <= baseDate.getTime()) {
    dueAt.setDate(dueAt.getDate() + 1);
  }

  return dueAt;
}

function parseTime(value?: string) {
  if (typeof value !== 'string') return null;
  const match = value.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  return { hours, minutes };
}

function toMinutes(value: string) {
  const parsed = parseTime(value);
  return parsed ? parsed.hours * 60 + parsed.minutes : null;
}

function toTimeLabel(value: string) {
  const parsed = parseTime(value);
  if (!parsed) return '';
  return `${String(parsed.hours).padStart(2, '0')}:${String(parsed.minutes).padStart(2, '0')}`;
}

function getSecondsUntil(dueAt: Date) {
  return Math.max(0, Math.floor((dueAt.getTime() - Date.now()) / 1000));
}

function formatMedicationPeriod(medication: MedicationCard) {
  const start = medication.startedAt ? formatDateLabel(medication.startedAt) : '-';
  const end = medication.endAt ? formatDateLabel(medication.endAt) : '현재';
  return `${start} - ${end}`;
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function isSameDate(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDateLabel(value: string) {
  const date = parseDateValue(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function parseDateValue(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [yearText, monthText, dayText] = value.split('-');
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    return new Date(year, month - 1, day);
  }
  return new Date(value);
}

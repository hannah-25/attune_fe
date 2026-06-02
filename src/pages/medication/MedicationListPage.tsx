import React, { useCallback, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Pill, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  createQuickMedicationLog,
  getMedications,
  type MedicationListResponse,
  type MedicationScheduleSummary,
  type MedicationSummary,
  updateMedication,
} from '@/api/medication';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';

const SNOOZE_SECONDS = 10 * 60;
const CARD_BACKGROUNDS = ['bg-purple-300', 'bg-purple-500', 'bg-purple-400', 'bg-purple-600'];

type MedicationCard = {
  userMedicationId: number;
  medicationId?: number;
  name: string;
  detail: string;
  schedule: string;
  active: boolean;
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

export default function MedicationListPage() {
  const navigate = useNavigate();
  const [pastOpen, setPastOpen] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [activeMedications, setActiveMedications] = useState<MedicationCard[]>([]);
  const [pastMedications, setPastMedications] = useState<MedicationCard[]>([]);
  const [nextDose, setNextDose] = useState<NextDose | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogging, setIsLogging] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const loadMedications = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await getMedications();
      const allMedications = normalizeMedicationList(response);
      const { active, past } = splitMedicationGroups(allMedications);
      const next = findNextDose(active);

      setActiveMedications(active);
      setPastMedications(past);
      setNextDose(next);
      setSecondsLeft(next ? getSecondsUntil(next.dueAt) : null);
    } catch {
      setError('복용 목록을 불러오지 못했습니다.');
      setActiveMedications([]);
      setPastMedications([]);
      setNextDose(null);
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
    } catch {
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
        endAt: nextIsActive ? undefined : toDateKey(new Date()),
      });
      await loadMedications();
    } catch {
      setError('약 상태를 변경하지 못했습니다.');
    } finally {
      setTogglingId(null);
    }
  };

  const handlePostpone = async () => {
    if (!nextDose || isLogging) return;
    if (typeof nextDose.userMedicationId !== 'number') {
      setError('복용 기록에 필요한 약물 정보를 찾지 못했습니다.');
      return;
    }

    setError('');
    setIsLogging(true);

    try {
      await createQuickMedicationLog(nextDose.userMedicationId, {
        action: 'POSTPONE',
        scheduleId: nextDose.scheduleId,
      });
      setSecondsLeft((current) => (current === null ? current : current + SNOOZE_SECONDS));
    } catch {
      setError('미루기 기록을 저장하지 못했습니다.');
    } finally {
      setIsLogging(false);
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
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="복용 중인 약"
          left={<NavBackButton />}
          right={<HeaderIconButton icon={<Plus className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} onClick={() => navigate('/medication/add')} />}
        />
        <ScrollArea className="flex flex-col gap-3 pt-1">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="font-bold text-gray-600 text-xs">{nextDose ? '다음 복용까지' : '복용 일정'}</div>
            <div className="items-baseline flex mt-1 gap-1.5">
              <div className="font-extrabold text-4xl transition-all" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                {nextDose && secondsLeft !== null ? formatCountdown(secondsLeft) : '-'}
              </div>
              {nextDose ? <div className="font-bold text-gray-500">· {nextDose.name} · {nextDose.time}</div> : null}
            </div>
            <div className="flex mt-3 gap-1.5">
              <button
                type="button"
                onClick={handleTakeNow}
                disabled={!nextDose || isLogging}
                className="items-center flex grow font-bold justify-center h-9 bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem] disabled:opacity-50 transition-opacity"
              >
                <span className="block">{isLogging ? '기록 중' : '지금 복용'}</span>
              </button>
              {nextDose ? (
                <button
                  type="button"
                  onClick={handlePostpone}
                  disabled={isLogging}
                  className="items-center flex grow font-bold justify-center h-9 border-gray-900 border basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem] disabled:opacity-50"
                >
                  <span className="block">10분 미루기</span>
                </button>
              ) : null}
            </div>
          </div>
          <div className="font-bold text-gray-600 pt-1 pr-1 pb-0 pl-1">복용 중 ({activeMedications.length})</div>
          {isLoading && activeMedications.length === 0 && pastMedications.length === 0 ? (
            <div className="text-gray-400 text-xs px-1">불러오는 중...</div>
          ) : null}
          {activeMedications.map((medication) => (
            <div key={medication.userMedicationId} className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
              <div className="items-center flex gap-2.5">
                <div className={`items-center flex justify-center w-[38px] h-[38px] ${medication.bg} rounded-xl`}>
                  <Pill className="w-[18px] h-[18px] text-white" strokeWidth={2.4} />
                </div>
                <button type="button" onClick={() => openMedicationInfo(medication)} className="grow basis-[0%] text-left">
                  <div className="font-bold text-sm">{medication.name}</div>
                  <div className="text-gray-600 text-xs">{medication.detail}</div>
                </button>
                <button
                  type="button"
                  aria-label={`${medication.name} 복용 중단`}
                  onClick={() => void handleChangeMedicationStatus(medication, false)}
                  disabled={togglingId === medication.userMedicationId}
                  className={`items-center flex font-semibold whitespace-nowrap border border-red-200 bg-red-50 text-red-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem] ${togglingId === medication.userMedicationId ? 'opacity-60' : ''}`}
                >
                  중단
                </button>
              </div>
              <div className="items-center flex mt-3 bg-gray-100 text-gray-800 gap-1.5 pt-2 pr-[10px] pb-2 pl-[10px] rounded-xl">
                <Clock className="w-[11px] h-[11px] text-gray-600" strokeWidth={2.5} />
                {medication.schedule}
              </div>
            </div>
          ))}
          <button type="button" onClick={() => setPastOpen((open) => !open)} className="items-center flex w-full text-left pt-2 pr-1 pb-0 pl-1 gap-1">
            <div className="font-bold text-gray-600 grow">지난 약 ({pastMedications.length})</div>
            {pastOpen ? <ChevronUp className="w-4 h-4 text-gray-400" strokeWidth={2.5} /> : <ChevronDown className="w-4 h-4 text-gray-400" strokeWidth={2.5} />}
          </button>
          {pastOpen && pastMedications.map((medication) => (
            <div key={medication.userMedicationId} className="bg-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
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
        <TabBar active="약" />
      </div>
    </div>
  );
}

function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
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

function findNextDose(medications: MedicationCard[]): NextDose | null {
  const now = new Date();
  let candidate: NextDose | null = null;

  medications.forEach((medication) => {
    medication.schedules.forEach((schedule) => {
      if (typeof schedule.scheduleId !== 'number') return;
      const dueAt = getNextOccurrence(schedule.doseTime, now);
      if (!dueAt) return;

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

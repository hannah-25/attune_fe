import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  createQuickMedicationLog,
  getAllMedicationLogs,
  getMedications,
  type MedicationLogStatus,
  type MedicationListResponse,
  type MedicationProfileLog,
  type MedicationProfileLogsResponse,
  type MedicationScheduleSummary,
  type MedicationSummary,
} from '@/api/medication';

type ActiveMedication = {
  userMedicationId: number;
  name: string;
  isActive: boolean;
  endAt?: string | null;
  schedules: MedicationScheduleSummary[];
};

type HomeDoseItem = {
  key: string;
  userMedicationId: number;
  scheduleId: number;
  medicationName: string;
  time: string;
  taken: boolean;
};

export default function HomeMedicationSection() {
  const navigate = useNavigate();
  const [activeMedicationCount, setActiveMedicationCount] = useState(0);
  const [doseItems, setDoseItems] = useState<HomeDoseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggingKeys, setLoggingKeys] = useState<string[]>([]);

  const loadHomeMedication = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const todayKey = toDateKey(new Date());
      const listResponse = await getMedications();
      const normalized = normalizeMedicationList(listResponse);
      const activeMedications = pickActiveMedications(normalized);

      setActiveMedicationCount(activeMedications.length);

      if (activeMedications.length === 0) {
        setDoseItems([]);
        return;
      }

      const scheduleToMedication = new Map<number, number>();
      activeMedications.forEach((medication) => {
        medication.schedules.forEach((schedule) => {
          scheduleToMedication.set(schedule.scheduleId, medication.userMedicationId);
        });
      });

      const logsResponse = await getAllMedicationLogs({ startDate: todayKey, endDate: todayKey });
      const allLogs = extractMedicationLogs(logsResponse as unknown as MedicationProfileLogsResponse);

      const latestByDoseKey = new Map<string, { status: MedicationLogStatus; takenAt: number }>();
      allLogs.forEach((log) => {
        if (typeof log.scheduleId !== 'number') return;
        const userMedicationId = scheduleToMedication.get(log.scheduleId);
        if (typeof userMedicationId !== 'number') return;
        const key = buildDoseKey(userMedicationId, log.scheduleId);
        const timestamp = parseTimestamp(log.takenAt);
        const previous = latestByDoseKey.get(key);
        if (!previous || timestamp >= previous.takenAt) {
          latestByDoseKey.set(key, { status: log.status, takenAt: timestamp });
        }
      });

      const takenScheduleKeys = new Set<string>();
      latestByDoseKey.forEach((value, key) => {
        if (value.status === 'TAKEN') {
          takenScheduleKeys.add(key);
        }
      });

      setDoseItems(buildDoseItems(activeMedications, takenScheduleKeys));
    } catch {
      setActiveMedicationCount(0);
      setDoseItems([]);
      setError('복약 정보를 불러오지 못했어요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadHomeMedication();
  }, [loadHomeMedication]);

  const summary = useMemo(() => {
    const total = doseItems.length;
    const taken = doseItems.filter((item) => item.taken).length;

    return { total, taken };
  }, [doseItems]);

  const handleToggleDose = async (item: HomeDoseItem) => {
    if (loggingKeys.includes(item.key)) return;
    const nextTaken = !item.taken;

    setError('');
    setLoggingKeys((current) => [...current, item.key]);
    setDoseItems((current) =>
      current.map((dose) => (dose.key === item.key ? { ...dose, taken: nextTaken } : dose))
    );

    try {
      await createQuickMedicationLog(item.userMedicationId, {
        action: nextTaken ? 'TAKEN' : 'SKIPPED',
        scheduleId: item.scheduleId,
      });
    } catch {
      setDoseItems((current) =>
        current.map((dose) => (dose.key === item.key ? { ...dose, taken: !nextTaken } : dose))
      );
      setError('복용 완료를 기록하지 못했어요.');
    } finally {
      setLoggingKeys((current) => current.filter((key) => key !== item.key));
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.22)_0px_8px_28px_0px,_rgba(60,40,90,0.12)_0px_2px_6px_0px] p-3 rounded-2xl flex flex-col gap-2">
      <div className="items-center flex justify-between">
        <div className="text-xs text-gray-600">
          복용 중 {activeMedicationCount}개 · 완료 {summary.taken}/{summary.total}
        </div>
        <button type="button" onClick={() => navigate('/medication')} className="text-xs text-gray-500">
          전체 관리
        </button>
      </div>

      {error ? <div className="text-red-500 text-xs">{error}</div> : null}

      {isLoading ? <div className="text-xs text-gray-400">복약 정보를 불러오는 중...</div> : null}

      {!isLoading && activeMedicationCount === 0 ? (
        <button
          type="button"
          onClick={() => navigate('/medication')}
          className="w-full text-left px-1 py-1 rounded-lg"
        >
          <div className="text-xs text-gray-500">복용 중인 약이 없습니다.</div>
          <div className="items-center flex font-semibold text-xs text-purple-700 gap-0.5 mt-0.5">
            <span>복약 추가하러 가기</span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400 shrink-0" strokeWidth={2.5} />
          </div>
        </button>
      ) : null}

      {!isLoading && activeMedicationCount > 0 && summary.total === 0 ? (
        <div className="text-xs text-gray-500">등록된 스케줄이 없습니다. 복약 페이지에서 스케줄을 추가해 주세요.</div>
      ) : null}

      {!isLoading && summary.total > 0 ? (
        <div className="flex flex-col">
          {doseItems.map((item, index) => {
            const isPending = loggingKeys.includes(item.key);

            return (
              <div key={item.key} className={`py-2 ${index > 0 ? 'border-t border-gray-100' : ''}`}>
                <div className="items-center flex gap-2">
                  <div className="font-semibold text-xs text-gray-700 w-11 shrink-0">{item.time}</div>
                  <div className="grow basis-[0%]">
                    <div className="font-semibold text-xs text-gray-800">{item.medicationName}</div>
                  </div>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => void handleToggleDose(item)}
                    aria-label={`${item.medicationName} ${item.time} ${item.taken ? '복용 완료 취소' : '복용 완료 처리'}`}
                    className={`items-center flex text-xs font-semibold gap-1 px-2.5 py-1 rounded-lg border shrink-0 disabled:opacity-70 ${
                      item.taken
                        ? 'border-gray-300 bg-gray-50 text-gray-700'
                        : 'border-purple-300 bg-purple-50 text-purple-700'
                    }`}
                  >
                    <Check className="w-3 h-3" strokeWidth={2.8} />
                    {isPending ? '기록 중' : item.taken ? '완료 취소' : '복용 완료'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function buildDoseItems(activeMedications: ActiveMedication[], takenScheduleKeys: Set<string>) {
  return activeMedications
    .flatMap((medication) =>
      medication.schedules
        .filter((schedule) => typeof schedule.scheduleId === 'number')
        .map((schedule) => {
          const scheduleId = schedule.scheduleId;
          const key = buildDoseKey(medication.userMedicationId, scheduleId);

          return {
            key,
            userMedicationId: medication.userMedicationId,
            scheduleId,
            medicationName: medication.name,
            time: toTimeLabel(schedule.doseTime),
            taken: takenScheduleKeys.has(key),
          } satisfies HomeDoseItem;
        })
    )
    .sort((a, b) => a.time.localeCompare(b.time) || a.medicationName.localeCompare(b.medicationName));
}

function buildDoseKey(userMedicationId: number, scheduleId: number) {
  return `${userMedicationId}-${scheduleId}`;
}

function pickActiveMedications(medications: ActiveMedication[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return medications.filter((medication) => {
    if (!medication.isActive) return false;
    if (!medication.endAt) return true;
    const parsedEndDate = parseDateValue(medication.endAt);
    if (Number.isNaN(parsedEndDate.getTime())) return true;
    return parsedEndDate >= today;
  });
}

function normalizeMedicationList(response: MedicationListResponse): ActiveMedication[] {
  return response
    .map((item) => normalizeMedication(item))
    .filter((item): item is ActiveMedication => item !== null);
}

function normalizeMedication(medication: MedicationSummary): ActiveMedication | null {
  if (typeof medication.userMedicationId !== 'number' || !medication.medicationName) return null;

  return {
    userMedicationId: medication.userMedicationId,
    name: medication.medicationName,
    isActive: medication.isActive,
    endAt: medication.endAt,
    schedules: medication.schedules ?? [],
  };
}

function extractMedicationLogs(response: MedicationProfileLogsResponse): MedicationProfileLog[] {
  return response.logs;
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
  if (!parsed) return '--:--';

  return `${String(parsed.hours).padStart(2, '0')}:${String(parsed.minutes).padStart(2, '0')}`;
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function parseTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return Number.NEGATIVE_INFINITY;
  return date.getTime();
}

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pill } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  createQuickMedicationLog,
  getAllMedicationLogs,
  getMedications,
  type QuickMedicationLogAction,
  type MedicationListResponse,
  type MedicationScheduleSummary,
  type MedicationSummary,
} from '@/api/medication';
import { useDelayedLoading } from '@/lib/useDelayedLoading';

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
  status: 'PENDING' | 'TAKEN' | 'SKIPPED';
};

export default function HomeMedicationSection({ className }: { className?: string }) {
  const navigate = useNavigate();
  const [activeMedicationCount, setActiveMedicationCount] = useState(0);
  const [doseItems, setDoseItems] = useState<HomeDoseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const showLoading = useDelayedLoading(isLoading);
  const [error, setError] = useState('');
  const [loggingKeys, setLoggingKeys] = useState<string[]>([]);
  const loggingKeysRef = useRef(new Set<string>());
  const mountedRef = useRef(true);

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

      const scheduleStatuses = new Map<string, HomeDoseItem['status']>();
      try {
        const logsResponse = await getAllMedicationLogs({ startDate: todayKey, endDate: todayKey });
        logsResponse.logs.forEach((log) => {
          const medication = activeMedications.find((m) => m.userMedicationId === log.userMedicationId);
          if (!medication) return;
          const matched = findClosestSchedule(medication.schedules, log.intakeTime);
          if (matched) {
            scheduleStatuses.set(
              buildDoseKey(log.userMedicationId, matched.scheduleId),
              log.taken ? 'TAKEN' : 'SKIPPED',
            );
          }
        });
      } catch (logErr) {
        console.error('Failed to load medication logs:', logErr);
      }

      setDoseItems(buildDoseItems(activeMedications, scheduleStatuses));
    } catch (err) {
      console.error('Failed to load home medication:', err);
      setActiveMedicationCount(0);
      setDoseItems([]);
      setError('복약 정보를 불러오지 못했어요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void loadHomeMedication();
    return () => {
      mountedRef.current = false;
    };
  }, [loadHomeMedication]);

  const totalDoses = useMemo(() => doseItems.length, [doseItems]);

  const handleLog = async (item: HomeDoseItem, action: Extract<QuickMedicationLogAction, 'TAKEN' | 'SKIPPED'>) => {
    if (item.status !== 'PENDING' || loggingKeysRef.current.has(item.key)) return;

    setError('');
    loggingKeysRef.current.add(item.key);
    setLoggingKeys((current) => [...current, item.key]);
    const nextStatus = action === 'TAKEN' ? 'TAKEN' : 'SKIPPED';
    setDoseItems((current) =>
      current.map((dose) => (dose.key === item.key ? { ...dose, status: nextStatus } : dose))
    );

    try {
      await createQuickMedicationLog(item.userMedicationId, {
        action,
        scheduleId: item.scheduleId,
      });
    } catch (err) {
      console.error('Failed to record dose:', err);
      if (!mountedRef.current) return;
      setDoseItems((current) =>
        current.map((dose) => (dose.key === item.key ? { ...dose, status: 'PENDING' } : dose))
      );
      setError('복약 상태를 기록하지 못했어요.');
    } finally {
      loggingKeysRef.current.delete(item.key);
      if (mountedRef.current) {
        setLoggingKeys((current) => current.filter((key) => key !== item.key));
      }
    }
  };

  return (
    <section className={className} aria-busy={isLoading || loggingKeys.length > 0}>
      <div className="overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px]">
        <button
          type="button"
          onClick={() => navigate('/medication')}
          className="relative w-full overflow-hidden px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-inset"
        >
          <span
            className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-purple-100/50"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-2 right-4 flex h-7 w-7 rotate-6 items-center justify-center rounded-[0.625rem] bg-purple-100 text-purple-600"
            aria-hidden="true"
          >
            <Pill className="h-4 w-4" strokeWidth={1.8} />
          </span>
          <h2 className="relative z-[1] text-sm font-bold text-gray-900">오늘 복약</h2>
        </button>

        <div>
          {error ? (
            <div className="flex min-h-[52px] items-center justify-between gap-3 px-4" role="alert">
              <span className="text-xs text-red-700">{error}</span>
              <button
                type="button"
                onClick={() => void loadHomeMedication()}
                className="min-h-11 shrink-0 rounded-lg px-2 text-xs font-semibold text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
              >
                다시 시도
              </button>
            </div>
          ) : showLoading ? (
            <div className="flex min-h-[52px] items-center px-4" role="status" aria-live="polite">
              <span className="text-xs font-medium text-gray-400">복약 정보를 불러오고 있어요.</span>
            </div>
          ) : activeMedicationCount === 0 ? (
            <button
              type="button"
              onClick={() => navigate('/medication')}
              className="min-h-[52px] w-full px-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-inset"
            >
              <span className="block text-xs font-medium text-gray-500">복용 중인 약이 없어요.</span>
              <span className="mt-1 block text-xs font-bold text-purple-700">복약 추가하기</span>
            </button>
          ) : totalDoses === 0 ? (
            <div className="flex min-h-[52px] items-center px-4 text-xs font-medium text-gray-500">
              등록된 복약 시간이 없어요.
            </div>
          ) : (
            doseItems.slice(0, 3).map((item) => {
              const isPending = loggingKeys.includes(item.key);
              const isRecorded = item.status !== 'PENDING';

              return (
                <div key={item.key} className="flex min-h-[52px] items-center gap-2 px-4">
                  <div className="w-10 shrink-0 text-xs font-extrabold text-gray-600">{item.time}</div>
                  <div
                    className={`min-w-0 grow truncate text-[13px] font-bold ${
                      isRecorded ? 'text-gray-400 line-through' : 'text-gray-900'
                    }`}
                  >
                    {item.medicationName}
                  </div>
                  {isRecorded ? (
                    <span className="shrink-0 text-xs font-medium text-gray-400">
                      {item.status === 'TAKEN' ? '복용 완료' : '건너뜀'}
                    </span>
                  ) : (
                    <div className="flex shrink-0 items-center">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => void handleLog(item, 'SKIPPED')}
                        className="min-h-11 px-2 text-[10px] font-normal text-gray-300 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
                      >
                        건너뛰기
                      </button>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => void handleLog(item, 'TAKEN')}
                        className="flex min-h-11 items-center pl-1 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-1"
                      >
                        <span className="rounded-full bg-purple-500 px-3 py-1.5 text-[11px] font-bold text-white">
                          {isPending ? '기록 중' : '복용하기'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}

          {!isLoading && !error && doseItems.length > 3 ? (
            <p className="px-4 py-2 text-xs font-medium text-gray-500">
              외 {doseItems.length - 3}회는 전체 관리에서 확인할 수 있어요.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function buildDoseItems(
  activeMedications: ActiveMedication[],
  scheduleStatuses: Map<string, HomeDoseItem['status']>,
) {
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
            status: scheduleStatuses.get(key) ?? 'PENDING',
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

function findClosestSchedule(schedules: MedicationScheduleSummary[], intakeTime: string) {
  const intakeMinutes = toKstMinutes(intakeTime);
  if (intakeMinutes === null) return null;
  let closest: MedicationScheduleSummary | null = null;
  let minDiff = Infinity;
  for (const schedule of schedules) {
    const m = toMinutes(schedule.doseTime);
    if (m === null) continue;
    const diff = Math.abs(intakeMinutes - m);
    if (diff < minDiff) { minDiff = diff; closest = schedule; }
  }
  return minDiff <= 240 ? closest : null;
}

function toKstMinutes(value: string): number | null {
  const dateTimeMatch = value.match(
    /^\d{4}-\d{2}-\d{2}[T ](\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2})?$/,
  );
  if (!dateTimeMatch) return toMinutes(value);

  const timezone = dateTimeMatch[3];
  if (!timezone) {
    return toMinutes(`${dateTimeMatch[1]}:${dateTimeMatch[2]}`);
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const hours = Number(parts.find((part) => part.type === 'hour')?.value);
  const minutes = Number(parts.find((part) => part.type === 'minute')?.value);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return null;
  return hours * 60 + minutes;
}

function toMinutes(hhmm: string): number | null {
  const parsed = parseTime(hhmm);
  return parsed ? parsed.hours * 60 + parsed.minutes : null;
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

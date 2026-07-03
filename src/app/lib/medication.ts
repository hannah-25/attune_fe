import type { MedicationPeriodLog, MedicationScheduleSummary } from '../api/medication';
import { parseServerDateTime } from './date';

type MedicationTime = {
  hours: number;
  minutes: number;
};

export function parseMedicationTime(value?: string): MedicationTime | null {
  if (typeof value !== 'string') return null;

  const match = value.match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  return { hours, minutes };
}

export function resolveMedicationLogScheduleId(
  log: MedicationPeriodLog,
  schedules: MedicationScheduleSummary[],
): number | null {
  if (typeof log.scheduleId === 'number' && schedules.some((schedule) => schedule.scheduleId === log.scheduleId)) {
    return log.scheduleId;
  }

  const matchedSchedule = findClosestMedicationSchedule(schedules, log.intakeTime);
  return matchedSchedule ? matchedSchedule.scheduleId : null;
}

function findClosestMedicationSchedule(
  schedules: MedicationScheduleSummary[],
  intakeTime: string,
): MedicationScheduleSummary | null {
  const date = parseServerDateTime(intakeTime);
  if (Number.isNaN(date.getTime())) return null;
  const intakeMinutes = date.getHours() * 60 + date.getMinutes();

  let closest: MedicationScheduleSummary | null = null;
  let minDiff = Infinity;

  schedules.forEach((schedule) => {
    const scheduleTime = parseMedicationTime(schedule.doseTime);
    if (!scheduleTime) return;

    const scheduleMinutes = scheduleTime.hours * 60 + scheduleTime.minutes;
    const diff = Math.abs(intakeMinutes - scheduleMinutes);
    const circularDiff = Math.min(diff, 1440 - diff);
    if (circularDiff < minDiff) {
      minDiff = circularDiff;
      closest = schedule;
    }
  });

  return minDiff <= 240 ? closest : null;
}

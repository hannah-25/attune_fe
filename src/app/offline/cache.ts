import { db } from './db';
import { cleanPath, searchParams } from './pathUtils';
import type { JournalDetail, JournalListResponse, JournalTag } from '../api/journal';
import type { MedicationSummary, MedicationPeriodLogsResponse } from '../api/medication';
import type { ScheduleSummary, ScheduleCategory, ScheduleDetail } from '../api/schedule';
import type { MedicationReport } from '../api/medicationAnalysis';
import type { ConsultationDetail } from '../api/consultation';

export async function cacheResponse(path: string, data: unknown): Promise<void> {
  if (data == null) return;

  const base = cleanPath(path);
  const now = new Date().toISOString();

  try {
    // /v1/journals/tags?category=...
    if (base === '/v1/journals/tags') {
      const category = searchParams(path).get('category') as
        | 'CONDITION'
        | 'SIDE_EFFECT'
        | 'TROUBLE'
        | null;
      if (category) {
        await db.journalTagsByCategory.put({ category, data: data as JournalTag[], cachedAt: now });
      }
      return;
    }

    // /v1/journals/:date  (single)
    const journalDateMatch = base.match(/^\/v1\/journals\/([0-9]{4}-[0-9]{2}-[0-9]{2})$/);
    if (journalDateMatch) {
      const detail = data as JournalDetail;
      if (detail?.checked) {
        await db.journals.put({ date: journalDateMatch[1], checked: detail.checked, cachedAt: now });
      }
      if (detail?.activeTags) {
        await db.activeTags.put({ id: 'tags', data: detail.activeTags, cachedAt: now });
      }
      return;
    }

    // /v1/journals  (bulk)
    if (base === '/v1/journals') {
      const response = data as JournalListResponse;
      if (response?.activeTags) {
        await db.activeTags.put({ id: 'tags', data: response.activeTags, cachedAt: now });
      }
      if (Array.isArray(response?.journals)) {
        await db.journals.bulkPut(
          response.journals.map(j => ({ date: j.date, checked: j.checked, cachedAt: now })),
        );
      }
      return;
    }

    // /v1/user-medications
    if (base === '/v1/user-medications') {
      await db.medications.put({ id: 'list', data: data as MedicationSummary[], cachedAt: now });
      return;
    }

    // /v1/user-medications/logs
    if (base === '/v1/user-medications/logs') {
      const response = data as MedicationPeriodLogsResponse;
      if (!Array.isArray(response?.logs)) return;
      const byDate = new Map<string, typeof response.logs>();
      for (const log of response.logs) {
        const date = log.intakeTime.slice(0, 10);
        if (!byDate.has(date)) byDate.set(date, []);
        byDate.get(date)!.push(log);
      }
      await db.medicationLogs.bulkPut(
        [...byDate.entries()].map(([date, d]) => ({ date, data: d, cachedAt: now })),
      );
      return;
    }

    // /v1/schedule-categories
    if (base === '/v1/schedule-categories') {
      const response = data as { categories: ScheduleCategory[] };
      if (Array.isArray(response?.categories)) {
        await db.scheduleCategories.put({ id: 'categories', data: response.categories, cachedAt: now });
      }
      return;
    }

    // /v1/schedules  (list)
    if (base === '/v1/schedules') {
      const response = data as { schedules: ScheduleSummary[] };
      if (Array.isArray(response?.schedules)) {
        await db.schedules.bulkPut(
          response.schedules.map(s => ({ scheduleId: s.scheduleId, data: s, cachedAt: now })),
        );
      }
      return;
    }

    // /v1/schedules/:id  (detail)
    const scheduleDetailMatch = base.match(/^\/v1\/schedules\/(\d+)$/);
    if (scheduleDetailMatch) {
      await db.scheduleDetails.put({
        scheduleId: parseInt(scheduleDetailMatch[1], 10),
        data: data as ScheduleDetail,
        cachedAt: now,
      });
      return;
    }

    // /v1/medication-analysis/reports
    if (base === '/v1/medication-analysis/reports') {
      if (Array.isArray(data)) {
        await db.reports.put({ id: 'list', data: data as MedicationReport[], cachedAt: now });
      }
      return;
    }

    // /v1/consultations  (list)
    if (base === '/v1/consultations') {
      if (Array.isArray(data)) {
        await db.consultations.put({ id: 'list', data: data as ConsultationDetail[], cachedAt: now });
      }
      return;
    }

    // /v1/consultations/:id  (detail)
    const consultDetailMatch = base.match(/^\/v1\/consultations\/(\d+)$/);
    if (consultDetailMatch) {
      await db.consultationDetails.put({
        consultationId: parseInt(consultDetailMatch[1], 10),
        data: data as ConsultationDetail,
        cachedAt: now,
      });
      return;
    }
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[offline/cache] cacheResponse failed:', path, err);
  }
}

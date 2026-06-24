import { db } from './db';
import { cleanPath, searchParams, toLocalDateString, parseLocalDate, toLocalDateStringFromTimestamp } from './pathUtils';
import type { JournalDetail, JournalListResponse, JournalTag } from '../api/journal';
import type { MedicationSummary, MedicationPeriodLog, MedicationPeriodLogsResponse } from '../api/medication';
import type { ScheduleSummary, ScheduleCategory, ScheduleDetail } from '../api/schedule';
import type { MedicationReport } from '../api/medicationAnalysis';
import type { ConsultationDetail } from '../api/consultation';
import type { UserProfile, UserSettings } from '../api/user';
import type { CalendarConnection } from '../api/calendarConnection';
import type { CalendarEvent } from '../api/calendarEvents';
import type { TodoItem } from '../api/todo';

function rangeKey(startDate: string | null, endDate: string | null): string {
  return `${startDate ?? ''}:${endDate ?? ''}`;
}

function createEmptyLogsByDate(startDate: string | null, endDate: string | null): Map<string, MedicationPeriodLog[]> {
  const byDate = new Map<string, MedicationPeriodLog[]>();
  if (!startDate || !endDate) return byDate;

  const cursor = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);
  if (!cursor || !end) return byDate;

  while (cursor <= end) {
    byDate.set(toLocalDateString(cursor), []);
    cursor.setDate(cursor.getDate() + 1);
  }

  return byDate;
}

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
      if (detail && detail.checked !== undefined) {
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
      const params = searchParams(path);
      const byDate = createEmptyLogsByDate(params.get('startDate'), params.get('endDate'));
      for (const log of response.logs) {
        if (typeof log?.intakeTime !== 'string') continue;
        const date = toLocalDateStringFromTimestamp(log.intakeTime);
        if (!date) continue;
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
          response.schedules.map(s => ({
            scheduleId: s.scheduleId,
            startTime: s.startTime,
            endTime: s.endTime ?? s.startTime,
            data: s,
            cachedAt: now,
          })),
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

    // /v1/calendar/events
    if (base === '/v1/calendar/events') {
      const response = data as { events: CalendarEvent[] };
      const params = searchParams(path);
      const startDate = params.get('startDate') ?? '';
      const endDate = params.get('endDate') ?? '';
      if (Array.isArray(response?.events)) {
        await db.calendarEvents.put({
          rangeKey: rangeKey(startDate, endDate),
          startDate,
          endDate,
          data: response.events,
          cachedAt: now,
        });
      }
      return;
    }

    // /v1/calendar-connections
    if (base === '/v1/calendar-connections') {
      const response = data as { connections: CalendarConnection[] };
      if (Array.isArray(response?.connections)) {
        await db.calendarConnections.put({ id: 'list', data: response.connections, cachedAt: now });
      }
      return;
    }

    // /v1/todos
    if (base === '/v1/todos') {
      const response = data as { todos: TodoItem[] };
      const date = searchParams(path).get('date');
      if (date && Array.isArray(response?.todos)) {
        await db.todosByDate.put({ date, data: response.todos, cachedAt: now });
      }
      return;
    }

    // /v1/users/me/profile
    if (base === '/v1/users/me/profile') {
      await db.userProfile.put({ id: 'profile', data: data as UserProfile, cachedAt: now });
      return;
    }

    // /v1/users/settings
    if (base === '/v1/users/settings') {
      await db.userSettings.put({ id: 'settings', data: data as UserSettings, cachedAt: now });
      return;
    }

    // /v1/community/posts and related payloads.
    if (base === '/v1/community/posts') {
      await db.communityPayloads.put({ key: path, data, cachedAt: now });
      if (!path.includes('?')) {
        await db.communityPayloads.put({ key: '/v1/community/posts', data, cachedAt: now });
      }
      return;
    }

    const communityPostMatch = base.match(/^\/v1\/community\/posts\/(-?\d+)$/);
    if (communityPostMatch) {
      await db.communityPayloads.put({ key: base, data, cachedAt: now });
      return;
    }

    const communityCommentsMatch = base.match(/^\/v1\/community\/posts\/(-?\d+)\/comments$/);
    if (communityCommentsMatch) {
      await db.communityPayloads.put({ key: base, data, cachedAt: now });
    }
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[offline/cache] cacheResponse failed:', path, err);
  }
}

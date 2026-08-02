import { db } from './db';
import { cleanPath, searchParams, toLocalDateString, parseLocalDate, toLocalDateStringFromTimestamp, nextLocalDateString } from './pathUtils';
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

export async function cacheResponse(
  path: string,
  data: unknown,
  isSessionValid?: () => boolean,
): Promise<void> {
  if (data == null) return;
  const shouldWrite = () => !isSessionValid || isSessionValid();
  // 비동기 캐시 실행 직전 로그아웃됐다면 비운 DB에 개인정보를 다시 쓰지 않는다.
  if (isSessionValid && !isSessionValid()) return;

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
        if (!shouldWrite()) return;
        await db.journalTagsByCategory.put({
          category,
          data: data as JournalTag[],
          cachedAt: now,
        });
      }
      return;
    }

    // /v1/journals/:date  (single)
    const journalDateMatch = base.match(/^\/v1\/journals\/([0-9]{4}-[0-9]{2}-[0-9]{2})$/);
    if (journalDateMatch) {
      const detail = data as JournalDetail;
      await db.transaction('rw', [db.journals, db.activeTags], async () => {
        if (!shouldWrite()) return;
        if (detail && detail.checked !== undefined) {
          await db.journals.put({ date: journalDateMatch[1], checked: detail.checked, cachedAt: now });
        }
        if (detail?.activeTags) {
          await db.activeTags.put({ id: 'tags', data: detail.activeTags, cachedAt: now });
        }
      });
      return;
    }

    // /v1/journals  (bulk)
    if (base === '/v1/journals') {
      const response = data as JournalListResponse;
      await db.transaction('rw', [db.activeTags, db.journals], async () => {
        if (!shouldWrite()) return;
        if (response?.activeTags) {
          await db.activeTags.put({ id: 'tags', data: response.activeTags, cachedAt: now });
        }
        if (Array.isArray(response?.journals)) {
          await db.journals.bulkPut(
            response.journals.map(j => ({ date: j.date, checked: j.checked, cachedAt: now })),
          );
        }
      });
      return;
    }

    // /v1/user-medications
    if (base === '/v1/user-medications') {
      if (!shouldWrite()) return;
      await db.medications.put({
        id: 'list',
        data: data as MedicationSummary[],
        cachedAt: now,
      });
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
      if (!shouldWrite()) return;
      await db.medicationLogs.bulkPut(
        [...byDate.entries()].map(([date, d]) => ({ date, data: d, cachedAt: now })),
      );
      return;
    }

    // /v1/schedule-categories
    if (base === '/v1/schedule-categories') {
      const response = data as { categories: ScheduleCategory[] };
      if (Array.isArray(response?.categories)) {
        if (!shouldWrite()) return;
        await db.scheduleCategories.put({ id: 'categories', data: response.categories, cachedAt: now });
      }
      return;
    }

    // /v1/schedules  (list)
    if (base === '/v1/schedules') {
      const response = data as { schedules: ScheduleSummary[] };
      if (Array.isArray(response?.schedules)) {
        const params = searchParams(path);
        const startDate = params.get('startDate') ?? '';
        const endDate = params.get('endDate') ?? '';
        await db.transaction('rw', db.schedules, async () => {
          if (!shouldWrite()) return;
          if (startDate && endDate) {
            await db.schedules
              .where('startTime')
              .below(`${nextLocalDateString(endDate)}T00:00:00`)
              .and(item => item.endTime >= startDate)
              .delete();
          } else {
            await db.schedules.clear();
          }
          await db.schedules.bulkPut(
            response.schedules.map(s => ({
              scheduleId: s.scheduleId,
              startTime: s.startTime,
              endTime: s.endTime ?? s.startTime,
              data: s,
              cachedAt: now,
            })),
          );
        });
      }
      return;
    }

    // /v1/schedules/:id  (detail)
    const scheduleDetailMatch = base.match(/^\/v1\/schedules\/(\d+)$/);
    if (scheduleDetailMatch) {
      if (!shouldWrite()) return;
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
        if (!shouldWrite()) return;
        await db.reports.put({ id: 'list', data: data as MedicationReport[], cachedAt: now });
      }
      return;
    }

    // /v1/consultations  (list)
    if (base === '/v1/consultations') {
      if (Array.isArray(data)) {
        if (!shouldWrite()) return;
        await db.consultations.put({
          id: 'list',
          data: data as ConsultationDetail[],
          cachedAt: now,
        });
      }
      return;
    }

    // /v1/consultations/:id  (detail)
    const consultDetailMatch = base.match(/^\/v1\/consultations\/(\d+)$/);
    if (consultDetailMatch) {
      if (!shouldWrite()) return;
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
        if (!shouldWrite()) return;
        const externalEvents = response.events.filter(event => event.source !== 'ATTUNE');
        await db.calendarEvents.put({
          rangeKey: rangeKey(startDate, endDate),
          startDate,
          endDate,
          data: externalEvents,
          cachedAt: now,
        });
      }
      return;
    }

    // /v1/calendar-connections
    if (base === '/v1/calendar-connections') {
      const response = data as { connections: CalendarConnection[] };
      if (Array.isArray(response?.connections)) {
        if (!shouldWrite()) return;
        await db.calendarConnections.put({ id: 'list', data: response.connections, cachedAt: now });
      }
      return;
    }

    // /v1/todos
    if (base === '/v1/todos') {
      const response = data as { todos: TodoItem[] };
      const date = searchParams(path).get('date');
      if (date && Array.isArray(response?.todos)) {
        if (!shouldWrite()) return;
        await db.todosByDate.put({ date, data: response.todos, cachedAt: now });
      }
      if (!date && Array.isArray(response?.todos)) {
        if (!shouldWrite()) return;
        const todosByDate = new Map<string, TodoItem[]>();
        response.todos.forEach((todo) => {
          const todoDate = todo.dueAt.slice(0, 10);
          todosByDate.set(todoDate, [...(todosByDate.get(todoDate) ?? []), todo]);
        });
        await Promise.all(Array.from(todosByDate, ([date, data]) => db.todosByDate.put({ date, data, cachedAt: now })));
      }
      return;
    }

    // /v1/users/me/profile
    if (base === '/v1/users/me/profile') {
      if (!shouldWrite()) return;
      await db.userProfile.put({ id: 'profile', data: data as UserProfile, cachedAt: now });
      return;
    }

    // /v1/users/settings
    if (base === '/v1/users/settings') {
      if (!shouldWrite()) return;
      await db.userSettings.put({ id: 'settings', data: data as UserSettings, cachedAt: now });
      return;
    }

    // /v1/community/posts and related payloads.
    if (base === '/v1/community/posts') {
      await db.transaction('rw', db.communityPayloads, async () => {
        if (!shouldWrite()) return;
        await db.communityPayloads.put({ key: path, data, cachedAt: now });
        if (!path.includes('?')) {
          await db.communityPayloads.put({ key: '/v1/community/posts', data, cachedAt: now });
        }
      });
      return;
    }

    const communityPostMatch = base.match(/^\/v1\/community\/posts\/(-?\d+)$/);
    if (communityPostMatch) {
      if (!shouldWrite()) return;
      await db.communityPayloads.put({ key: base, data, cachedAt: now });
      return;
    }

    const communityCommentsMatch = base.match(/^\/v1\/community\/posts\/(-?\d+)\/comments$/);
    if (communityCommentsMatch) {
      if (!shouldWrite()) return;
      await db.communityPayloads.put({ key: base, data, cachedAt: now });
    }
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[offline/cache] cacheResponse failed:', path, err);
  }
}

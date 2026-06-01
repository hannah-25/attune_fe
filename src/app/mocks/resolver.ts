import type { ApiRequestOptions } from '../api/client';
import { guestRead, guestWrite, guestDelete } from './guest-store';
import { mockUserProfile } from './user.mock';
import { mockTodos, mockSchedules } from './home.mock';
import {
  mockJournalDates,
  mockJournalDetail,
  mockConditionTags,
  mockSideEffectTags,
  mockTroubleTags,
} from './journal.mock';
import {
  mockMedications,
  mockMedicationLogs,
  mockMedicationStandard,
} from './medication.mock';
import { mockScheduleCategories, mockScheduleSummaries, mockScheduleDetail } from './calendar.mock';
import { mockPosts, mockCommentsByPost, mockNotices } from './community.mock';
import { mockSession, mockPrescriptions, mockQnA, mockSummaryStats, mockSummaryText, mockQuestions } from './counseling.mock';
import { mockWeeklyStats, mockWeeklyInsight, mockWeeklyChartData, mockMonthlyStats, mockMonthlyInsight, mockMonthlyChartData } from './report.mock';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function method(options: ApiRequestOptions): Method {
  return ((options.method as string | undefined) ?? 'GET').toUpperCase() as Method;
}

function ok<T>(data: T, status = 200): T {
  return data;
}

function created<T>(data: T): T {
  return data;
}

function noContent(): undefined {
  return undefined;
}

let nextId = 1000;
function genId(): number {
  return ++nextId;
}

const MEDICATION_LOGS_KEY = 'medication-logs';

export function resolveGuestRequest<T>(path: string, options: ApiRequestOptions): Promise<T> {
  const normalizedPath = path.replace(/^\/api\//, '/v1/');
  const m = method(options);
  const result = dispatch(normalizedPath, m, options.body);
  return Promise.resolve(result as T);
}

function dispatch(path: string, m: Method, body: unknown): unknown {
  const p = path.split('?')[0];

  // ── Auth ──────────────────────────────────────────────────────────────────
  if (p === '/v1/auth/logout' && m === 'POST') return noContent();

  // ── User ──────────────────────────────────────────────────────────────────
  if (p === '/v1/users/me/profile' && m === 'GET') return ok(mockUserProfile);
  if (p === '/v1/users/me/nickname' && m === 'PUT') return noContent();
  if (p === '/v1/users/me/image' && m === 'POST') return noContent();
  if (p === '/v1/users/settings' && m === 'GET') {
    return ok({ medicationNotification: true, reportNotification: true, marketingNotification: false, takeMedicationOnHoliday: false, theme: 'SYSTEM' });
  }
  if (p === '/v1/users/settings' && m === 'PATCH') return ok({ ...body });

  // ── Journal dates ─────────────────────────────────────────────────────────
  if (p === '/v1/journals' && m === 'GET') {
    return ok(guestRead('journals/dates') ?? mockJournalDates);
  }

  // ── Journal detail ────────────────────────────────────────────────────────
  const journalDetailMatch = p.match(/^\/v1\/journals\/(\d{4}-\d{2}-\d{2})$/);
  if (journalDetailMatch) {
    const date = journalDetailMatch[1];
    if (m === 'GET') return ok(guestRead(`journals/${date}`) ?? mockJournalDetail);
    if (m === 'DELETE') {
      guestDelete(`journals/${date}`);
      return ok({ deletedDate: date, success: true });
    }
  }

  // ── Journal memo ──────────────────────────────────────────────────────────
  const memoMatch = p.match(/^\/v1\/journals\/(\d{4}-\d{2}-\d{2})\/memo$/);
  if (memoMatch) {
    const date = memoMatch[1];
    if (m === 'GET') return guestRead(`journals/${date}/memo`) ?? undefined;
    if (m === 'POST') {
      const memo = (body as { memo: string }).memo;
      guestWrite(`journals/${date}/memo`, () => ({ journalDate: date, memo }));
      return created({ journalDate: date, memo });
    }
  }

  // ── Journal sleep/meal ────────────────────────────────────────────────────
  const sleepMealMatch = p.match(/^\/v1\/journals\/(\d{4}-\d{2}-\d{2})\/sleep-meal$/);
  if (sleepMealMatch && m === 'POST') {
    const date = sleepMealMatch[1];
    guestWrite(`journals/${date}/sleep-meal`, () => ({ journalDate: date, ...body }));
    return created({ journalDate: date, ...body });
  }

  // ── Journal goal score ────────────────────────────────────────────────────
  const goalScoreMatch = p.match(/^\/v1\/journals\/(\d{4}-\d{2}-\d{2})\/goals$/);
  if (goalScoreMatch && m === 'POST') {
    const date = goalScoreMatch[1];
    const { goalId, score } = body as { goalId: number; score: number };
    return created({ goalId, score, journalDate: date });
  }

  // ── Condition tags ────────────────────────────────────────────────────────
  if (p === '/v1/journals/condition-tags' && m === 'GET') {
    return ok(guestRead<typeof mockConditionTags>('condition-tags') ?? mockConditionTags);
  }
  if (p === '/v1/journals/condition-tags' && m === 'POST') {
    const tag = { tagId: genId(), ...(body as object), visible: true };
    guestWrite<typeof mockConditionTags>('condition-tags', (prev) => [...(prev ?? mockConditionTags), tag]);
    return created(tag);
  }
  const conditionTagMatch = p.match(/^\/v1\/journals\/condition-tags\/(\d+)$/);
  if (conditionTagMatch) {
    const tagId = Number(conditionTagMatch[1]);
    if (m === 'DELETE') {
      guestWrite<typeof mockConditionTags>('condition-tags', (prev) =>
        (prev ?? mockConditionTags).filter((t) => t.tagId !== tagId),
      );
      return noContent();
    }
  }
  const conditionTagVisibleMatch = p.match(/^\/v1\/journals\/condition-tags\/(\d+)\/visible$/);
  if (conditionTagVisibleMatch && m === 'PATCH') {
    const tagId = Number(conditionTagVisibleMatch[1]);
    guestWrite<typeof mockConditionTags>('condition-tags', (prev) =>
      (prev ?? mockConditionTags).map((t) => (t.tagId === tagId ? { ...t, visible: !t.visible } : t)),
    );
    return ok({});
  }

  // ── Condition checks ──────────────────────────────────────────────────────
  if (p === '/v1/journals/conditions' && m === 'POST') {
    const { tagId } = body as { tagId: number };
    const tags = guestRead<typeof mockConditionTags>('condition-tags') ?? mockConditionTags;
    const tag = tags.find((t) => t.tagId === tagId);
    return created({ ...tag, checkedAt: new Date().toISOString() });
  }
  if (p === '/v1/journals/conditions' && m === 'DELETE') return noContent();

  // ── Side effect tags ──────────────────────────────────────────────────────
  if (p === '/v1/journals/side-effect-tags' && m === 'GET') {
    return ok(guestRead<typeof mockSideEffectTags>('side-effect-tags') ?? mockSideEffectTags);
  }
  if (p === '/v1/journals/side-effect-tags' && m === 'POST') {
    const tag = { tagId: genId(), ...(body as object), visible: true };
    guestWrite<typeof mockSideEffectTags>('side-effect-tags', (prev) => [...(prev ?? mockSideEffectTags), tag]);
    return created(tag);
  }
  const sideEffectTagMatch = p.match(/^\/v1\/journals\/side-effect-tags\/(\d+)$/);
  if (sideEffectTagMatch) {
    const tagId = Number(sideEffectTagMatch[1]);
    if (m === 'DELETE') {
      guestWrite<typeof mockSideEffectTags>('side-effect-tags', (prev) =>
        (prev ?? mockSideEffectTags).filter((t) => t.tagId !== tagId),
      );
      return noContent();
    }
  }
  const sideEffectTagVisibleMatch = p.match(/^\/v1\/journals\/side-effect-tags\/(\d+)\/visible$/);
  if (sideEffectTagVisibleMatch && m === 'PATCH') {
    const tagId = Number(sideEffectTagVisibleMatch[1]);
    guestWrite<typeof mockSideEffectTags>('side-effect-tags', (prev) =>
      (prev ?? mockSideEffectTags).map((t) => (t.tagId === tagId ? { ...t, visible: !t.visible } : t)),
    );
    return ok({});
  }

  if (p === '/v1/journals/side-effects' && m === 'POST') {
    const { tagId } = body as { tagId: number };
    const tags = guestRead<typeof mockSideEffectTags>('side-effect-tags') ?? mockSideEffectTags;
    const tag = tags.find((t) => t.tagId === tagId);
    return created({ ...tag, checkedAt: new Date().toISOString() });
  }
  if (p === '/v1/journals/side-effects' && m === 'DELETE') return noContent();

  // ── Trouble tags ──────────────────────────────────────────────────────────
  if (p === '/v1/journals/trouble-tags' && m === 'GET') {
    return ok(guestRead<typeof mockTroubleTags>('trouble-tags') ?? mockTroubleTags);
  }
  if (p === '/v1/journals/trouble-tags' && m === 'POST') {
    const tag = { tagId: genId(), ...(body as object), visible: true };
    guestWrite<typeof mockTroubleTags>('trouble-tags', (prev) => [...(prev ?? mockTroubleTags), tag]);
    return created(tag);
  }
  const troubleTagMatch = p.match(/^\/v1\/journals\/trouble-tags\/(\d+)$/);
  if (troubleTagMatch) {
    const tagId = Number(troubleTagMatch[1]);
    if (m === 'DELETE') {
      guestWrite<typeof mockTroubleTags>('trouble-tags', (prev) =>
        (prev ?? mockTroubleTags).filter((t) => t.tagId !== tagId),
      );
      return noContent();
    }
  }
  const troubleTagVisibleMatch = p.match(/^\/v1\/journals\/trouble-tags\/(\d+)\/visible$/);
  if (troubleTagVisibleMatch && m === 'PATCH') {
    const tagId = Number(troubleTagVisibleMatch[1]);
    guestWrite<typeof mockTroubleTags>('trouble-tags', (prev) =>
      (prev ?? mockTroubleTags).map((t) => (t.tagId === tagId ? { ...t, visible: !t.visible } : t)),
    );
    return ok({});
  }

  if (p === '/v1/journals/troubles' && m === 'POST') {
    const { tagId } = body as { tagId: number };
    const tags = guestRead<typeof mockTroubleTags>('trouble-tags') ?? mockTroubleTags;
    const tag = tags.find((t) => t.tagId === tagId);
    return created({ ...tag, checkedAt: new Date().toISOString() });
  }
  if (p === '/v1/journals/troubles' && m === 'DELETE') return noContent();

  // ── Journal goals ─────────────────────────────────────────────────────────
  if (p === '/v1/journals/goals' && m === 'POST') {
    const goal = { goalId: genId(), ...(body as object) };
    return created(goal);
  }
  const journalGoalMatch = p.match(/^\/v1\/journals\/goals\/(\d+)$/);
  if (journalGoalMatch) {
    const goalId = Number(journalGoalMatch[1]);
    if (m === 'PATCH') return ok({ goalId, ...(body as object) });
    if (m === 'DELETE') return noContent();
  }

  // ── Medications ───────────────────────────────────────────────────────────
  if (p === '/v1/user-medications' && m === 'GET') {
    return ok(guestRead('medications') ?? mockMedications);
  }
  if (p === '/v1/user-medications' && m === 'POST') {
    const med = { userMedicationId: genId(), isActive: true, ...(body as object) };
    guestWrite<typeof mockMedications>('medications', (prev) => [...(prev ?? mockMedications), med]);
    return created(med);
  }
  const medicationMatch = p.match(/^\/v1\/user-medications\/(\d+)$/);
  if (medicationMatch && m === 'PATCH') {
    const id = Number(medicationMatch[1]);
    guestWrite<typeof mockMedications>('medications', (prev) =>
      (prev ?? mockMedications).map((m) => (m.userMedicationId === id ? { ...m, ...(body as object) } : m)),
    );
    return ok({ medicationId: id, isActive: true, updatedAt: new Date().toISOString() });
  }
  const medicationLogsMatch = p.match(/^\/v1\/user-medications\/(\d+)\/logs$/);
  if (medicationLogsMatch && m === 'GET') {
    const userMedicationId = Number(medicationLogsMatch[1]);
    const query = new URLSearchParams(path.split('?')[1] ?? '');
    const startDate = query.get('startDate') ?? undefined;
    const endDate = query.get('endDate') ?? undefined;

    const logs = readMedicationLogs()
      .filter((log) => resolveUserMedicationIdFromLog(log) === userMedicationId)
      .filter((log) => isLogWithinRange(log.takenAt, startDate, endDate));

    return ok({ userMedicationId, logs });
  }
  if (p === '/v1/user-medications/logs' && m === 'GET') {
    const query = new URLSearchParams(path.split('?')[1] ?? '');
    const startDate = query.get('startDate') ?? undefined;
    const endDate = query.get('endDate') ?? undefined;

    const logs = readMedicationLogs().filter((log) =>
      isLogWithinRange(log.takenAt, startDate, endDate),
    );

    return ok({ logs });
  }
  const quickLogMatch = p.match(/^\/v1\/user-medications\/(\d+)\/log\/quick$/);
  if (quickLogMatch && m === 'POST') {
    const userMedicationId = Number(quickLogMatch[1]);
    const payload = body as { action?: string; scheduleId?: number };
    const scheduleId = typeof payload.scheduleId === 'number' ? payload.scheduleId : null;
    const status =
      payload.action === 'SKIPPED'
        ? 'SKIPPED'
        : payload.action === 'TAKEN'
          ? 'TAKEN'
          : 'MISSED';
    const recordedAt = new Date().toISOString();

    if (scheduleId !== null) {
      const nextLog = {
        userMedicationId,
        scheduleId,
        takenAt: recordedAt,
        status,
      } as (typeof mockMedicationLogs)[number];

      guestWrite<typeof mockMedicationLogs>(MEDICATION_LOGS_KEY, (prev) => [
        ...(prev ?? mockMedicationLogs),
        nextLog,
      ]);
    }

    return created({ logId: genId(), ...(body as object), recordedAt });
  }
  const medicationStandardMatch = p.match(/^\/v1\/medications\/standards\/(\d+)$/);
  if (medicationStandardMatch && m === 'GET') {
    return ok(mockMedicationStandard);
  }

  // ── Schedule categories ───────────────────────────────────────────────────
  if (p === '/v1/schedule-categories' && m === 'GET') {
    return ok({ categories: guestRead('schedule-categories') ?? mockScheduleCategories });
  }
  if (p === '/v1/schedule-categories' && m === 'POST') {
    const cat = { categoryId: genId(), ...(body as object) };
    guestWrite<typeof mockScheduleCategories>('schedule-categories', (prev) => [...(prev ?? mockScheduleCategories), cat]);
    return created(cat);
  }
  const categoryMatch = p.match(/^\/v1\/schedule-categories\/(\d+)$/);
  if (categoryMatch) {
    const catId = Number(categoryMatch[1]);
    if (m === 'PATCH') {
      guestWrite<typeof mockScheduleCategories>('schedule-categories', (prev) =>
        (prev ?? mockScheduleCategories).map((c) => (c.categoryId === catId ? { ...c, ...(body as object) } : c)),
      );
      return noContent();
    }
    if (m === 'DELETE') {
      guestWrite<typeof mockScheduleCategories>('schedule-categories', (prev) =>
        (prev ?? mockScheduleCategories).filter((c) => c.categoryId !== catId),
      );
      return noContent();
    }
  }

  // ── Schedules ─────────────────────────────────────────────────────────────
  if (p === '/v1/schedules' && m === 'GET') {
    return ok({ schedules: guestRead('schedules') ?? mockScheduleSummaries });
  }
  if (p === '/v1/schedules' && m === 'POST') {
    const schedule = { scheduleId: genId(), ...(body as object) };
    guestWrite<typeof mockScheduleSummaries>('schedules', (prev) => [...(prev ?? mockScheduleSummaries), schedule]);
    return created(schedule);
  }
  const scheduleMatch = p.match(/^\/v1\/schedules\/(\d+)$/);
  if (scheduleMatch) {
    const sid = Number(scheduleMatch[1]);
    if (m === 'GET') {
      const schedules = guestRead<typeof mockScheduleSummaries>('schedules') ?? mockScheduleSummaries;
      return ok(schedules.find((s) => s.scheduleId === sid) ?? mockScheduleDetail);
    }
    if (m === 'PATCH') {
      guestWrite<typeof mockScheduleSummaries>('schedules', (prev) =>
        (prev ?? mockScheduleSummaries).map((s) => (s.scheduleId === sid ? { ...s, ...(body as object) } : s)),
      );
      return noContent();
    }
    if (m === 'DELETE') {
      guestWrite<typeof mockScheduleSummaries>('schedules', (prev) =>
        (prev ?? mockScheduleSummaries).filter((s) => s.scheduleId !== sid),
      );
      return noContent();
    }
  }
  const scheduleAlarmMatch = p.match(/^\/v1\/schedules\/(\d+)\/alarms$/);
  if (scheduleAlarmMatch && m === 'PUT') return noContent();

  // ── Todos ─────────────────────────────────────────────────────────────────
  if (p === '/v1/todos' && m === 'GET') {
    return ok({ todos: guestRead('todos') ?? mockTodos });
  }
  if (p === '/v1/todos' && m === 'POST') {
    const todo = { todoId: genId(), isCompleted: false, ...(body as object) };
    guestWrite<typeof mockTodos>('todos', (prev) => [...(prev ?? mockTodos), todo]);
    return created(todo);
  }
  const todoMatch = p.match(/^\/v1\/todos\/(\d+)$/);
  if (todoMatch) {
    const tid = Number(todoMatch[1]);
    if (m === 'GET') {
      const todos = guestRead<typeof mockTodos>('todos') ?? mockTodos;
      return ok(todos.find((t) => t.todoId === tid));
    }
    if (m === 'PATCH') {
      guestWrite<typeof mockTodos>('todos', (prev) =>
        (prev ?? mockTodos).map((t) => (t.todoId === tid ? { ...t, ...(body as object) } : t)),
      );
      return ok({ todoId: tid, ...(body as object) });
    }
  }

  // ── Consultations ─────────────────────────────────────────────────────────
  if (p === '/v1/consultations' && m === 'GET') {
    return ok({ consultations: guestRead('consultations') ?? [mockSession] });
  }
  if (p === '/v1/consultations' && m === 'POST') {
    const consultation = { consultationId: genId(), ...(body as object) };
    guestWrite<unknown[]>('consultations', (prev) => [...(prev ?? [mockSession]), consultation]);
    return created(consultation);
  }
  const consultationMatch = p.match(/^\/v1\/consultations\/(\d+)$/);
  if (consultationMatch) {
    const cid = Number(consultationMatch[1]);
    if (m === 'GET') return ok(mockSession);
    if (m === 'PATCH') return ok({ consultationId: cid, ...(body as object) });
    if (m === 'DELETE') return noContent();
  }
  const consultationPrepMatch = p.match(/^\/v1\/consultations\/(\d+)\/preparation$/);
  if (consultationPrepMatch && m === 'PATCH') return noContent();
  const consultationResultMatch = p.match(/^\/v1\/consultations\/(\d+)\/result$/);
  if (consultationResultMatch) {
    if (m === 'PATCH') return noContent();
    if (m === 'DELETE') return noContent();
  }

  // ── Community posts ───────────────────────────────────────────────────────
  if (p === '/v1/community/posts' && m === 'GET') {
    return ok(guestRead('posts') ?? mockPosts);
  }
  if (p === '/v1/community/posts' && m === 'POST') {
    const post = { postId: genId(), anonNickname: '나', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), isOwner: true, ...(body as object) };
    guestWrite<typeof mockPosts>('posts', (prev) => [post, ...(prev ?? mockPosts)]);
    return created(post);
  }
  const postMatch = p.match(/^\/v1\/community\/posts\/(\d+)$/);
  if (postMatch) {
    const pid = Number(postMatch[1]);
    if (m === 'GET') {
      const posts = guestRead<typeof mockPosts>('posts') ?? mockPosts;
      return ok(posts.find((post) => post.postId === pid) ?? mockPosts[0]);
    }
    if (m === 'PUT') {
      guestWrite<typeof mockPosts>('posts', (prev) =>
        (prev ?? mockPosts).map((p) => (p.postId === pid ? { ...p, ...(body as object), updatedAt: new Date().toISOString() } : p)),
      );
      return ok({ postId: pid, ...(body as object) });
    }
    if (m === 'DELETE') {
      guestWrite<typeof mockPosts>('posts', (prev) =>
        (prev ?? mockPosts).filter((p) => p.postId !== pid),
      );
      return noContent();
    }
  }

  // ── Community comments ────────────────────────────────────────────────────
  const postCommentsMatch = p.match(/^\/v1\/community\/posts\/(\d+)\/comments$/);
  if (postCommentsMatch) {
    const pid = Number(postCommentsMatch[1]);
    if (m === 'GET') return ok(guestRead(`comments/${pid}`) ?? mockCommentsByPost[pid] ?? []);
    if (m === 'POST') {
      const comment = { commentId: genId(), anonNickname: '나', createdAt: new Date().toISOString(), isPostAuthor: false, isOwner: true, ...(body as object) };
      guestWrite<typeof mockComments>(`comments/${pid}`, (prev) => [...(prev ?? mockComments), comment]);
      return created(comment);
    }
  }
  const commentMatch = p.match(/^\/v1\/community\/comments\/(\d+)$/);
  if (commentMatch) {
    if (m === 'PATCH') return ok({});
    if (m === 'DELETE') return noContent();
  }

  // ── Notices ───────────────────────────────────────────────────────────────
  if (p === '/v1/notices' && m === 'GET') {
    return ok({ notices: mockNotices, totalCount: mockNotices.length, page: 0, size: mockNotices.length });
  }
  const noticeMatch = p.match(/^\/v1\/notices\/(\d+)$/);
  if (noticeMatch && m === 'GET') {
    const nid = Number(noticeMatch[1]);
    return ok(mockNotices.find((n) => n.noticeId === nid) ?? mockNotices[0]);
  }

  // ── Report (read-only mock) ───────────────────────────────────────────────
  if (p.startsWith('/v1/report') && m === 'GET') {
    return ok({ weekly: { stats: mockWeeklyStats, insight: mockWeeklyInsight, chart: mockWeeklyChartData }, monthly: { stats: mockMonthlyStats, insight: mockMonthlyInsight, chart: mockMonthlyChartData } });
  }

  // ── Counseling prep mock data ─────────────────────────────────────────────
  if (p === '/v1/consultations/summary' && m === 'GET') {
    return ok({ session: mockSession, prescriptions: mockPrescriptions, qna: mockQnA, stats: mockSummaryStats, text: mockSummaryText, questions: mockQuestions });
  }

  // fallback
  console.warn(`[guest resolver] unhandled: ${m} ${p}`);
  return noContent();
}

function readMedicationLogs() {
  return guestRead<typeof mockMedicationLogs>(MEDICATION_LOGS_KEY) ?? mockMedicationLogs;
}

function resolveUserMedicationIdFromLog(log: (typeof mockMedicationLogs)[number]) {
  if (typeof (log as { userMedicationId?: number }).userMedicationId === 'number') {
    return (log as { userMedicationId: number }).userMedicationId;
  }

  const medications = guestRead<typeof mockMedications>('medications') ?? mockMedications;
  const owner = medications.find((medication) =>
    (medication.schedules ?? []).some((schedule) => schedule.scheduleId === log.scheduleId),
  );

  return owner?.userMedicationId;
}

function isLogWithinRange(takenAt: string, startDate?: string, endDate?: string) {
  const dateKey = toDateKeyFromDateTime(takenAt);
  if (!dateKey) return false;
  if (startDate && dateKey < startDate) return false;
  if (endDate && dateKey > endDate) return false;
  return true;
}

function toDateKeyFromDateTime(value: string) {
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

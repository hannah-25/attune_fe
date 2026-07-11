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
  mockCatalogConditionTags,
  mockCatalogSideEffectTags,
  mockCatalogTroubleTags,
} from './journal.mock';
import type { JournalTag, JournalTagCategory } from '../api/journal';
import {
  mockMedications,
  mockMedicationLogs,
  mockMedicationSearchData,
  mockMedicationStandard,
} from './medication.mock';
import { mockScheduleCategories, mockScheduleSummaries, mockScheduleDetail } from './calendar.mock';
import { mockPosts, mockCommentsByPost, mockNotices } from './community.mock';
import { mockSession, mockPrescriptions, mockQnA, mockSummaryStats, mockSummaryText, mockQuestions } from './counseling.mock';

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

type GuestJournalDetail = typeof mockJournalDetail;

const SEED_MEDICATION_REPORT = {
  reportId: 901,
  periodStart: '2026-05-01',
  periodEnd: '2026-05-31',
  status: 'COMPLETED' as const,
  outdated: false,
  snapshotJson: JSON.stringify({
    totalScheduled: 60, takenCount: 45, skippedCount: 5, unrecordedCount: 10,
    adherenceRate: 75.0, recordingRate: 83.3,
  }),
  aiResultJson: JSON.stringify({
    summary: '아침 약 복용 직후 2시간 동안 집중력 패턴이 안정적이었어요. 전반적으로 아침 복용 시간대가 가장 규칙적이었고, 오후 복용은 변동이 있었습니다.',
    insights: [
      {
        category: '복약 패턴',
        title: '아침 복용이 가장 안정적',
        description: '분석 기간 동안 아침 복용률이 90% 이상으로 가장 높았습니다. 복용 시간도 일정하게 유지되었어요.',
        evidenceIds: [],
        confidence: 'HIGH',
        limitation: '기록되지 않은 날은 분석에서 제외됩니다.',
      },
      {
        category: '부작용',
        title: '식욕 저하가 오전에 집중',
        description: '식욕 저하 기록이 복용 후 1~2시간 내 집중되는 경향이 있습니다.',
        evidenceIds: [],
        confidence: 'MEDIUM',
        limitation: '일지 기록 빈도에 따라 정확도가 달라질 수 있습니다.',
      },
    ],
    consultationQuestions: [
      '복용량 조정이 필요한 시점이 언제인가요?',
      '식욕 저하 증상이 지속되면 어떻게 해야 하나요?',
    ],
    disclaimer: 'AI 분석은 패턴 관찰이며 의료 진단을 대체하지 않습니다. 복약 변경은 반드시 전문가와 상의하세요.',
  }),
  generatedAt: '2026-06-01T10:00:00.000Z',
};

function getDefaultJournalTags(category: JournalTagCategory): JournalTag[] {
  if (category === 'CONDITION') return mockCatalogConditionTags;
  if (category === 'SIDE_EFFECT') return mockCatalogSideEffectTags;
  return mockCatalogTroubleTags;
}

function getJournalTagsForCategory(category: JournalTagCategory): JournalTag[] {
  return guestRead<JournalTag[]>(`journal-tags/${category}`) ?? getDefaultJournalTags(category);
}

function findJournalTagById(tagId: number): JournalTag | undefined {
  const categories: JournalTagCategory[] = ['CONDITION', 'SIDE_EFFECT', 'TROUBLE'];
  for (const cat of categories) {
    const found = getJournalTagsForCategory(cat).find((tag) => tag.tagId === tagId);
    if (found) return found;
  }
  return undefined;
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function resolveJournalDate(path: string, body?: unknown) {
  const query = new URLSearchParams(path.split('?')[1] ?? '');
  const queryDate = query.get('date') ?? query.get('journalDate');
  if (queryDate && /^\d{4}-\d{2}-\d{2}$/.test(queryDate)) return queryDate;

  if (
    body &&
    typeof body === 'object' &&
    'journalDate' in body &&
    typeof (body as { journalDate?: unknown }).journalDate === 'string'
  ) {
    const payloadDate = (body as { journalDate: string }).journalDate;
    if (/^\d{4}-\d{2}-\d{2}$/.test(payloadDate)) return payloadDate;
  }

  return toDateKey(new Date());
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function buildActiveJournalTags(): GuestJournalDetail['activeTags'] {
  const activeTags = clone(mockJournalDetail.activeTags);
  activeTags.conditions = clone(guestRead<typeof mockConditionTags>('condition-tags') ?? mockConditionTags);
  activeTags.sideEffects = clone(guestRead<typeof mockSideEffectTags>('side-effect-tags') ?? mockSideEffectTags);
  activeTags.troubles = clone(guestRead<typeof mockTroubleTags>('trouble-tags') ?? mockTroubleTags);
  return activeTags;
}

function buildDefaultJournalDetail(date: string): GuestJournalDetail {
  const detail = clone(mockJournalDetail);
  detail.activeTags = buildActiveJournalTags();

  const memoRecord = guestRead<{ journalDate: string; memo: string }>(`journals/${date}/memo`);
  if (memoRecord) detail.checked.memo = memoRecord.memo;

  const sleepMealRecord = guestRead<{
    sleepHour?: number | null;
    sleepQuality?: 'GOOD' | 'NORMAL' | 'BAD' | null;
    ateBreakfast?: boolean | null;
    ateLunch?: boolean | null;
    ateDinner?: boolean | null;
  }>(`journals/${date}/sleep-meal`);
  if (sleepMealRecord) {
    const { sleepHour, sleepQuality, ateBreakfast, ateLunch, ateDinner } = sleepMealRecord;
    detail.checked.sleep =
      sleepHour != null && sleepQuality != null
        ? { sleepHour, sleepQuality }
        : null;
    detail.checked.meal =
      ateBreakfast != null && ateLunch != null && ateDinner != null
        ? { ateBreakfast, ateLunch, ateDinner }
        : null;
  }

  return detail;
}

function readJournalDetail(date: string): GuestJournalDetail {
  return guestRead<GuestJournalDetail>(`journals/${date}`) ?? buildDefaultJournalDetail(date);
}

function updateJournalDetail(date: string, updater: (detail: GuestJournalDetail) => GuestJournalDetail): GuestJournalDetail {
  let updated = readJournalDetail(date);

  guestWrite<GuestJournalDetail>(`journals/${date}`, (prev) => {
    const current = prev ?? buildDefaultJournalDetail(date);
    updated = updater(current);
    return updated;
  });

  return updated;
}

function upsertByTagId<T extends { tagId: number }>(items: T[], next: T): T[] {
  return [...items.filter((item) => item.tagId !== next.tagId), next];
}

function upsertByGoalId<T extends { goalId: number }>(items: T[], next: T): T[] {
  return [...items.filter((item) => item.goalId !== next.goalId), next];
}

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
    return ok({
      medicationNotification: true,
      reportNotification: true,
      marketingNotification: false,
      communityNotification: true,
      todoNotification: true,
      takeMedicationOnHoliday: false,
      theme: 'SYSTEM',
      timezone: 'Asia/Seoul',
    });
  }
  if (p === '/v1/users/settings' && m === 'PATCH') return ok({ ...(body as object) });

  // ── Journal dates ─────────────────────────────────────────────────────────
  if (p === '/v1/journals/dates' && m === 'GET') {
    return ok(guestRead('journals/dates') ?? mockJournalDates);
  }

  if (p === '/v1/journals' && m === 'GET') {
    const query = new URLSearchParams(path.split('?')[1] ?? '');
    const startDate = query.get('startDate') ?? '';
    const endDate = query.get('endDate') ?? '';
    const datesResponse = guestRead<{ dates: string[] }>('journals/dates') ?? mockJournalDates;
    const dates = (datesResponse?.dates ?? []).filter(
      (date) => (!startDate || date >= startDate) && (!endDate || date <= endDate),
    );

    return ok({
      activeTags: buildActiveJournalTags(),
      journals: dates.map((date) => ({
        date,
        checked: readJournalDetail(date).checked,
      })),
    });
  }

  // ── Journal detail ────────────────────────────────────────────────────────
  const journalDetailMatch = p.match(/^\/v1\/journals\/(\d{4}-\d{2}-\d{2})$/);
  if (journalDetailMatch) {
    const date = journalDetailMatch[1];
    if (m === 'GET') return ok(readJournalDetail(date));
    if (m === 'DELETE') {
      guestDelete(`journals/${date}`);
      return ok({ deletedDate: date, success: true });
    }
  }

  // ── Journal memo ──────────────────────────────────────────────────────────
  const memoMatch = p.match(/^\/v1\/journals\/(\d{4}-\d{2}-\d{2})\/memo$/);
  if (memoMatch) {
    const date = memoMatch[1];
    if (m === 'GET') {
      const memoRecord = guestRead<{ journalDate: string; memo: string }>(`journals/${date}/memo`);
      if (memoRecord) return memoRecord;
      const detail = readJournalDetail(date);
      return detail.checked.memo != null ? { journalDate: date, memo: detail.checked.memo } : undefined;
    }
    if (m === 'POST') {
      const memo = (body as { memo: string }).memo;
      guestWrite(`journals/${date}/memo`, () => ({ journalDate: date, memo }));
      updateJournalDetail(date, (detail) => ({
        ...detail,
        checked: {
          ...detail.checked,
          memo,
        },
      }));
      return created({ journalDate: date, memo });
    }
  }

  // ── Journal sleep/meal ────────────────────────────────────────────────────
  const sleepMealMatch = p.match(/^\/v1\/journals\/(\d{4}-\d{2}-\d{2})\/sleep-meal$/);
  if (sleepMealMatch && m === 'POST') {
    const date = sleepMealMatch[1];
    const payload = body as {
      sleepHour?: number | null;
      sleepQuality?: 'GOOD' | 'NORMAL' | 'BAD' | null;
      ateBreakfast?: boolean | null;
      ateLunch?: boolean | null;
      ateDinner?: boolean | null;
    };

    guestWrite(`journals/${date}/sleep-meal`, () => ({ journalDate: date, ...payload }));

    updateJournalDetail(date, (detail) => ({
      ...detail,
      checked: {
        ...detail.checked,
        sleep:
          payload.sleepHour != null && payload.sleepQuality != null
            ? { sleepHour: payload.sleepHour, sleepQuality: payload.sleepQuality }
            : null,
        meal:
          payload.ateBreakfast != null && payload.ateLunch != null && payload.ateDinner != null
            ? { ateBreakfast: payload.ateBreakfast, ateLunch: payload.ateLunch, ateDinner: payload.ateDinner }
            : null,
      },
    }));

    return created({ journalDate: date, ...payload });
  }

  // ── Journal goal score ────────────────────────────────────────────────────
  const goalScoreMatch = p.match(/^\/v1\/journals\/(\d{4}-\d{2}-\d{2})\/goals$/);
  if (goalScoreMatch && m === 'POST') {
    const goalScoreDate = goalScoreMatch[1];
    const { goalId, score } = (body ?? {}) as { goalId: number; score: number };

    updateJournalDetail(goalScoreDate, (detail) => {
      const matchedGoal = detail.activeTags.goals.find((goal) => goal.goalId === goalId);
      if (!matchedGoal) return detail;

      return {
        ...detail,
        checked: {
          ...detail.checked,
          goals: upsertByGoalId(detail.checked.goals, { ...matchedGoal, score }),
        },
      };
    });

    return created({ goalId, score, journalDate: goalScoreDate });
  }

  // ── Condition tags ────────────────────────────────────────────────────────
  if (p === '/v1/journals/condition-tags' && m === 'GET') {
    return ok(guestRead<typeof mockConditionTags>('condition-tags') ?? mockConditionTags);
  }
  if (p === '/v1/journals/condition-tags' && m === 'POST') {
    const tag = { tagId: genId(), ...(body as object), visible: true } as (typeof mockConditionTags)[number];
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
    const checkedAt = new Date().toISOString();

    if (tag) {
      const date = resolveJournalDate(path, body);
      updateJournalDetail(date, (detail) => ({
        ...detail,
        checked: {
          ...detail.checked,
          conditions: upsertByTagId(detail.checked.conditions, { ...tag, checkedAt }),
        },
      }));
    }

    return created({ ...tag, checkedAt });
  }
  if (p === '/v1/journals/conditions' && m === 'DELETE') {
    const query = new URLSearchParams(path.split('?')[1] ?? '');
    const tagId = Number(query.get('tagId'));
    const date = resolveJournalDate(path);

    if (Number.isFinite(tagId)) {
      updateJournalDetail(date, (detail) => ({
        ...detail,
        checked: {
          ...detail.checked,
          conditions: detail.checked.conditions.filter((item) => item.tagId !== tagId),
        },
      }));
    }

    return noContent();
  }

  // ── Side effect tags ──────────────────────────────────────────────────────
  if (p === '/v1/journals/side-effect-tags' && m === 'GET') {
    return ok(guestRead<typeof mockSideEffectTags>('side-effect-tags') ?? mockSideEffectTags);
  }
  if (p === '/v1/journals/side-effect-tags' && m === 'POST') {
    const tag = { tagId: genId(), ...(body as object), visible: true } as (typeof mockSideEffectTags)[number];
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
    const checkedAt = new Date().toISOString();

    if (tag) {
      const date = resolveJournalDate(path, body);
      updateJournalDetail(date, (detail) => ({
        ...detail,
        checked: {
          ...detail.checked,
          sideEffects: upsertByTagId(detail.checked.sideEffects, { ...tag, checkedAt }),
        },
      }));
    }

    return created({ ...tag, checkedAt });
  }
  if (p === '/v1/journals/side-effects' && m === 'DELETE') {
    const query = new URLSearchParams(path.split('?')[1] ?? '');
    const tagId = Number(query.get('tagId'));
    const date = resolveJournalDate(path);

    if (Number.isFinite(tagId)) {
      updateJournalDetail(date, (detail) => ({
        ...detail,
        checked: {
          ...detail.checked,
          sideEffects: detail.checked.sideEffects.filter((item) => item.tagId !== tagId),
        },
      }));
    }

    return noContent();
  }

  // ── Trouble tags ──────────────────────────────────────────────────────────
  if (p === '/v1/journals/trouble-tags' && m === 'GET') {
    return ok(guestRead<typeof mockTroubleTags>('trouble-tags') ?? mockTroubleTags);
  }
  if (p === '/v1/journals/trouble-tags' && m === 'POST') {
    const tag = { tagId: genId(), ...(body as object), visible: true } as (typeof mockTroubleTags)[number];
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
    const checkedAt = new Date().toISOString();

    if (tag) {
      const date = resolveJournalDate(path, body);
      updateJournalDetail(date, (detail) => ({
        ...detail,
        checked: {
          ...detail.checked,
          troubles: upsertByTagId(detail.checked.troubles, { ...tag, checkedAt }),
        },
      }));
    }

    return created({ ...tag, checkedAt });
  }
  if (p === '/v1/journals/troubles' && m === 'DELETE') {
    const query = new URLSearchParams(path.split('?')[1] ?? '');
    const tagId = Number(query.get('tagId'));
    const date = resolveJournalDate(path);

    if (Number.isFinite(tagId)) {
      updateJournalDetail(date, (detail) => ({
        ...detail,
        checked: {
          ...detail.checked,
          troubles: detail.checked.troubles.filter((item) => item.tagId !== tagId),
        },
      }));
    }

    return noContent();
  }

  // ── Journal tags ──────────────────────────────────────────────────────────
  if (p === '/v1/journals/tags' && m === 'GET') {
    const query = new URLSearchParams(path.split('?')[1] ?? '');
    const category = query.get('category') as JournalTagCategory | null;
    if (!category) return ok([]);
    const tags = getJournalTagsForCategory(category);
    return ok(query.get('manage') === 'true' ? tags : tags.filter((tag) => tag.enabled && tag.visible));
  }

  if (p === '/v1/journals/tags' && m === 'POST') {
    const { category, name, tagType, visible } = (body ?? {}) as {
      category: JournalTagCategory;
      name: string;
      tagType: string;
      visible: boolean;
    };
    const currentTags = getJournalTagsForCategory(category);
    const inactiveTag = currentTags.find((tag) => tag.name === name && !tag.enabled);
    if (inactiveTag) {
      const reactivatedTag = { ...inactiveTag, tagType, enabled: true, visible };
      guestWrite<JournalTag[]>(`journal-tags/${category}`, () =>
        currentTags.map((tag) => (tag.tagId === inactiveTag.tagId ? reactivatedTag : tag)),
      );
      return ok(reactivatedTag);
    }

    const newTag: JournalTag = {
      tagId: genId(),
      category,
      name,
      tagType,
      scope: 'USER',
      enabled: true,
      visible,
    };
    guestWrite<JournalTag[]>(`journal-tags/${category}`, (prev) => [
      ...(prev ?? getDefaultJournalTags(category)),
      newTag,
    ]);
    return created(newTag);
  }

  const journalTagChecksMatch = p.match(/^\/v1\/journals\/tags\/(\d+)\/checks$/);
  if (journalTagChecksMatch) {
    const tagId = Number(journalTagChecksMatch[1]);
    const journalTag = findJournalTagById(tagId);

    if (m === 'POST') {
      const checkedAt = new Date().toISOString();
      const date = resolveJournalDate(path, body);
      const conditionTag = mockConditionTags.find((tag) => tag.tagId === tagId);
      const sideEffectTag = mockSideEffectTags.find((tag) => tag.tagId === tagId);
      const troubleTag = mockTroubleTags.find((tag) => tag.tagId === tagId);

      if (journalTag?.category === 'CONDITION' && conditionTag) {
        updateJournalDetail(date, (detail) => ({
          ...detail,
          checked: { ...detail.checked, conditions: upsertByTagId(detail.checked.conditions, { ...conditionTag, checkedAt }) },
        }));
      } else if (journalTag?.category === 'SIDE_EFFECT' && sideEffectTag) {
        updateJournalDetail(date, (detail) => ({
          ...detail,
          checked: { ...detail.checked, sideEffects: upsertByTagId(detail.checked.sideEffects, { ...sideEffectTag, checkedAt }) },
        }));
      } else if (journalTag?.category === 'TROUBLE' && troubleTag) {
        updateJournalDetail(date, (detail) => ({
          ...detail,
          checked: { ...detail.checked, troubles: upsertByTagId(detail.checked.troubles, { ...troubleTag, checkedAt }) },
        }));
      } else {
        updateJournalDetail(date, (detail) => ({
          ...detail,
          checked: {
            ...detail.checked,
            checkedCatalogTagIds: [...new Set([...(detail.checked.checkedCatalogTagIds ?? []), tagId])],
          },
        }));
      }

      return ok({
        tagId,
        category: journalTag?.category,
        name: journalTag?.name,
        tagType: journalTag?.tagType,
        journalDate: date,
        checkedAt,
      });
    }

    if (m === 'DELETE') {
      const query = new URLSearchParams(path.split('?')[1] ?? '');
      const date = query.get('date') ?? toDateKey(new Date());

      updateJournalDetail(date, (detail) => ({
        ...detail,
        checked: {
          ...detail.checked,
          conditions: detail.checked.conditions.filter((tag) => tag.tagId !== tagId),
          sideEffects: detail.checked.sideEffects.filter((tag) => tag.tagId !== tagId),
          troubles: detail.checked.troubles.filter((tag) => tag.tagId !== tagId),
          checkedCatalogTagIds: (detail.checked.checkedCatalogTagIds ?? []).filter((id) => id !== tagId),
        },
      }));

      return noContent();
    }
  }

  const journalTagPreferenceMatch = p.match(/^\/v1\/journals\/tags\/(\d+)\/preference$/);
  if (journalTagPreferenceMatch && m === 'PATCH') {
    const tagId = Number(journalTagPreferenceMatch[1]);
    const { enabled, visible } = (body ?? {}) as { enabled: boolean; visible: boolean };
    const categories: JournalTagCategory[] = ['CONDITION', 'SIDE_EFFECT', 'TROUBLE'];
    for (const cat of categories) {
      const key = `journal-tags/${cat}`;
      const tags = getJournalTagsForCategory(cat);
      if (tags.some((tag) => tag.tagId === tagId)) {
        guestWrite<JournalTag[]>(key, (prev) =>
          (prev ?? getDefaultJournalTags(cat)).map((tag) =>
            tag.tagId === tagId ? { ...tag, enabled, visible: enabled ? visible : false } : tag,
          ),
        );
        break;
      }
    }
    return noContent();
  }

  const journalTagDeleteMatch = p.match(/^\/v1\/journals\/tags\/(\d+)$/);
  if (journalTagDeleteMatch && m === 'DELETE') {
    const tagId = Number(journalTagDeleteMatch[1]);
    const categories: JournalTagCategory[] = ['CONDITION', 'SIDE_EFFECT', 'TROUBLE'];
    for (const cat of categories) {
      const key = `journal-tags/${cat}`;
      const tags = getJournalTagsForCategory(cat);
      const tag = tags.find((item) => item.tagId === tagId);
      if (tag?.scope === 'USER') {
        guestWrite<JournalTag[]>(key, (prev) =>
          (prev ?? getDefaultJournalTags(cat)).filter((item) => item.tagId !== tagId),
        );
        break;
      }
    }
    return noContent();
  }

  // ── Journal goals ─────────────────────────────────────────────────────────
  if (p === '/v1/journals/goals' && m === 'POST') {
    const date = resolveJournalDate(path, body);
    const payload = body as { content: string; journalDate?: string };
    const goal = { goalId: genId(), content: payload.content };

    updateJournalDetail(date, (detail) => ({
      ...detail,
      activeTags: {
        ...detail.activeTags,
        goals: upsertByGoalId(detail.activeTags.goals, goal),
      },
    }));

    return created(goal);
  }
  const journalGoalMatch = p.match(/^\/v1\/journals\/goals\/(\d+)$/);
  if (journalGoalMatch) {
    const goalId = Number(journalGoalMatch[1]);
    if (m === 'PATCH') {
      const date = resolveJournalDate(path, body);

      updateJournalDetail(date, (detail) => ({
        ...detail,
        activeTags: {
          ...detail.activeTags,
          goals: detail.activeTags.goals.map((goal) =>
            goal.goalId === goalId ? { ...goal, ...(body as object) } : goal,
          ),
        },
        checked: {
          ...detail.checked,
          goals: detail.checked.goals.map((goal) =>
            goal.goalId === goalId ? { ...goal, ...(body as object) } : goal,
          ),
        },
      }));

      return ok({ goalId, ...(body as object) });
    }
    if (m === 'DELETE') {
      const date = resolveJournalDate(path);

      updateJournalDetail(date, (detail) => ({
        ...detail,
        activeTags: {
          ...detail.activeTags,
          goals: detail.activeTags.goals.filter((goal) => goal.goalId !== goalId),
        },
        checked: {
          ...detail.checked,
          goals: detail.checked.goals.filter((goal) => goal.goalId !== goalId),
        },
      }));

      return noContent();
    }
  }

  // ── Medications ───────────────────────────────────────────────────────────
  if (p.startsWith('/v1/medications') && !p.includes('standards') && m === 'GET') {
    const q = new URLSearchParams(path.split('?')[1] ?? '').get('q')?.toLowerCase() ?? '';
    const results = mockMedicationSearchData.filter(
      (med) => !q || med.name.toLowerCase().includes(q) || med.ingredient.toLowerCase().includes(q),
    );
    return ok(results);
  }
  if (p === '/v1/user-medications' && m === 'GET') {
    return ok(guestRead('medications') ?? mockMedications);
  }
  if (p === '/v1/user-medications' && m === 'POST') {
    const med = { userMedicationId: genId(), medicationName: '등록된 약', isActive: true, ...(body as object) } as (typeof mockMedications)[number];
    guestWrite<typeof mockMedications>('medications', (prev) => [...(prev ?? mockMedications), med]);
    return created(med);
  }
  const medicationMatch = p.match(/^\/v1\/user-medications\/(\d+)$/);
  if (medicationMatch && m === 'PATCH') {
    const id = Number(medicationMatch[1]);
    const medications = guestRead<typeof mockMedications>('medications') ?? mockMedications;
    const currentMedication = medications.find((medication) => medication.userMedicationId === id);
    const updatedMedication = currentMedication
      ? { ...currentMedication, ...(body as object) }
      : null;

    guestWrite<typeof mockMedications>('medications', (prev) =>
      (prev ?? mockMedications).map((m) => {
        if (m.userMedicationId !== id || !updatedMedication) return m;
        return updatedMedication;
      }),
    );
    return ok({
      userMedicationId: id,
      isActive: updatedMedication?.isActive ?? Boolean((body as { isActive?: boolean }).isActive),
      updatedAt: new Date().toISOString(),
    });
  }
  const medicationLogsMatch = p.match(/^\/v1\/user-medications\/(\d+)\/logs$/);
  if (medicationLogsMatch && m === 'GET') {
    const userMedicationId = Number(medicationLogsMatch[1]);
    const query = new URLSearchParams(path.split('?')[1] ?? '');
    const startDate = query.get('startDate') ?? undefined;
    const endDate = query.get('endDate') ?? undefined;

    const logs = readMedicationLogs()
      .filter((log) => log.userMedicationId === userMedicationId)
      .filter((log) => isLogWithinRange(log.takenAt, startDate, endDate))
      .map(({ scheduleId, takenAt, status }) => ({ scheduleId, takenAt, status }));

    return ok({ userMedicationId, logs });
  }
  if (p === '/v1/user-medications/logs' && m === 'GET') {
    const query = new URLSearchParams(path.split('?')[1] ?? '');
    const startDate = query.get('startDate') ?? undefined;
    const endDate = query.get('endDate') ?? undefined;
    const medications = guestRead<typeof mockMedications>('medications') ?? mockMedications;

    const logs = readMedicationLogs()
      .filter((log) => isLogWithinRange(log.takenAt, startDate, endDate))
      .flatMap((log) => {
        const medication = medications.find((med) => med.userMedicationId === log.userMedicationId);
        if (!medication) return [];
        return [{
          userMedicationId: log.userMedicationId,
          scheduleId: log.scheduleId,
          name: medication.medicationName,
          intakeTime: log.takenAt,
          taken: log.status === 'TAKEN',
        }];
      });

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
    const doseDate = recordedAt.slice(0, 10);

    // 서버와 같은 절대 upsert 의미. 스케줄당 하루 1건이며, 같은 액션의 재전송은 no-op이다.
    if (scheduleId !== null) {
      guestWrite<typeof mockMedicationLogs>(MEDICATION_LOGS_KEY, (prev) => {
        const logs = prev ?? mockMedicationLogs;
        const others = logs.filter(
          (log) => !(log.scheduleId === scheduleId && log.takenAt.slice(0, 10) === doseDate),
        );
        if (payload.action === 'CANCEL') return others;
        return [...others, { userMedicationId, scheduleId, takenAt: recordedAt, status }];
      });
    }

    if (payload.action === 'CANCEL') {
      return created({ logId: null, action: 'CANCEL', recordedAt });
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
    const cat = { categoryId: genId(), ...(body as object) } as (typeof mockScheduleCategories)[number];
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
    const schedule = { scheduleId: genId(), ...(body as object) } as (typeof mockScheduleSummaries)[number];
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
    const todo = { todoId: genId(), isCompleted: false, ...(body as object) } as (typeof mockTodos)[number];
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

  // ── Consultation questions ────────────────────────────────────────────────
  const consultationQuestionsMatch = p.match(/^\/v1\/consultations\/(\d+)\/questions$/);
  if (consultationQuestionsMatch) {
    const cid = consultationQuestionsMatch[1];
    const key = `consultation-questions-${cid}`;
    const defaultQuestions = mockQuestions.map((q, i) => ({ questionId: i + 1, text: q.text }));
    if (m === 'GET') {
      return ok(guestRead<{ questionId: number; text: string }[]>(key) ?? defaultQuestions);
    }
    if (m === 'POST') {
      const question = { questionId: genId(), text: (body as { text: string }).text };
      guestWrite<{ questionId: number; text: string }[]>(key, (prev) => [...(prev ?? defaultQuestions), question]);
      return created(question);
    }
  }
  const consultationQuestionMatch = p.match(/^\/v1\/consultations\/(\d+)\/questions\/(\d+)$/);
  if (consultationQuestionMatch && m === 'DELETE') {
    const cid = consultationQuestionMatch[1];
    const qid = Number(consultationQuestionMatch[2]);
    const key = `consultation-questions-${cid}`;
    const defaultQuestions = mockQuestions.map((q, i) => ({ questionId: i + 1, text: q.text }));
    guestWrite<{ questionId: number; text: string }[]>(key, (prev) =>
      (prev ?? defaultQuestions).filter((q) => q.questionId !== qid),
    );
    return noContent();
  }

  // ── Medication analysis ───────────────────────────────────────────────────
  if (p === '/v1/medication-analysis/availability' && m === 'GET') {
    return ok({ available: true, recordedDays: 24, unavailableReasons: [] });
  }
  if (p === '/v1/medication-analysis/summary' && m === 'GET') {
    return ok({ totalScheduled: 60, takenCount: 45, skippedCount: 5, unrecordedCount: 10, adherenceRate: 75.0, recordingRate: 83.3 });
  }
  if (p === '/v1/medication-analysis/reports' && m === 'GET') {
    return ok(guestRead('medication-reports') ?? [SEED_MEDICATION_REPORT]);
  }
  if (p === '/v1/medication-analysis/reports' && m === 'POST') {
    const payload = body as { periodStart: string; periodEnd: string; includeMemoExcerpts: boolean };
    const snapshot = JSON.stringify({ totalScheduled: 60, takenCount: 45, skippedCount: 5, unrecordedCount: 10, adherenceRate: 75.0, recordingRate: 83.3 });
    const aiResult = JSON.stringify({
      summary: '아침 약 복용 직후 2시간 동안 집중력 패턴이 안정적이었어요.',
      insights: [
        {
          category: '복약 패턴',
          title: '아침 복용이 가장 안정적',
          description: '분석 기간 동안 아침 복용률이 90% 이상으로 가장 높았습니다.',
          evidenceIds: [],
          confidence: 'HIGH' as const,
          limitation: '기록되지 않은 날은 분석에서 제외됩니다.',
        },
      ],
      consultationQuestions: ['복용량 조정이 필요한 시점이 언제인가요?', '식욕 저하 증상이 지속되면 어떻게 해야 하나요?'],
      disclaimer: 'AI 분석은 패턴 관찰이며 의료 진단을 대체하지 않습니다.',
    });
    const report = {
      reportId: genId(),
      periodStart: payload.periodStart,
      periodEnd: payload.periodEnd,
      status: 'COMPLETED' as const,
      outdated: false,
      snapshotJson: snapshot,
      aiResultJson: aiResult,
      generatedAt: new Date().toISOString(),
    };
    guestWrite<typeof report[]>('medication-reports', (prev) => [report, ...(prev ?? [])]);
    return created(report);
  }
  const medicationReportMatch = p.match(/^\/v1\/medication-analysis\/reports\/(\d+)$/);
  if (medicationReportMatch && m === 'GET') {
    const rid = Number(medicationReportMatch[1]);
    const reports = guestRead<{ reportId: number }[]>('medication-reports') ?? [SEED_MEDICATION_REPORT];
    return ok(reports.find((r) => r.reportId === rid) ?? (rid === SEED_MEDICATION_REPORT.reportId ? SEED_MEDICATION_REPORT : undefined));
  }

  // ── AI analysis consent ───────────────────────────────────────────────────
  if (p === '/v1/ai-analysis-consent' && (m === 'PUT' || m === 'DELETE')) {
    return noContent();
  }

  // ── Community posts ───────────────────────────────────────────────────────
  if (p === '/v1/community/posts' && m === 'GET') {
    return ok(guestRead('posts') ?? mockPosts);
  }
  if (p === '/v1/community/posts' && m === 'POST') {
    const post = { postId: genId(), anonNickname: '나', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), isOwner: true, ...(body as object) } as (typeof mockPosts)[number];
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
      const comment = { commentId: genId(), anonNickname: '나', createdAt: new Date().toISOString(), isPostAuthor: false, isOwner: true, ...(body as object) } as (typeof mockCommentsByPost)[number][number];
      guestWrite<(typeof mockCommentsByPost)[number]>(`comments/${pid}`, (prev) => [...(prev ?? mockCommentsByPost[pid] ?? []), comment]);
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

  // ── Report (legacy stub — kept for safety) ───────────────────────────────
  if (p.startsWith('/v1/report') && m === 'GET') {
    return ok({});
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

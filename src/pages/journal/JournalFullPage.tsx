import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronRight, Moon, Plus, Settings2, Utensils, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { formatDate } from '@/lib/date';
import { TopBar } from '@/components/TopBar';
import { NavBackButton, NavCloseButton } from '@/components/NavButtons';
import {
  getCatalogTags,
  createCatalogTag,
  checkCatalogTag,
  uncheckCatalogTag,
  createJournalGoal,
  updateJournalGoal,
  createMemo,
  createSleepMeal,
  deleteJournalGoal,
  getJournal,
  scoreJournalGoal,
  type JournalTagCategory,
  type JournalDetail,
  type SleepQuality,
} from '@/api/journal';

type Tone = 'purple' | 'orange' | 'blue';
type Tag = {
  label: string;
  selected?: boolean;
  catalogTagId?: number;
  category?: JournalTagCategory;
};
type Section = {
  title: string;
  tone: Tone;
  tags: Tag[];
};
type GoalState = {
  goalId?: number;
  label: string;
  value: number;
};

const toneStyles: Record<Tone, { dot: string; selected: string; unselected: string }> = {
  purple: {
    dot: 'bg-purple-500',
    selected: 'bg-purple-100 border-[rgb(185,166,255)] text-purple-800',
    unselected: 'bg-transparent border-transparent text-gray-700',
  },
  orange: {
    dot: 'bg-[rgb(255,140,80)]',
    selected: 'bg-orange-50 border-orange-200 text-orange-800',
    unselected: 'bg-transparent border-transparent text-gray-700',
  },
  blue: {
    dot: 'bg-[rgb(80,140,220)]',
    selected: 'bg-blue-50 border-blue-200 text-blue-800',
    unselected: 'bg-transparent border-transparent text-gray-700',
  },
};

const emptySections: Section[] = [
  { title: '감정 · 증상', tone: 'purple', tags: [] },
  { title: '부작용', tone: 'orange', tags: [] },
  { title: '업무 실수 · 불편', tone: 'blue', tags: [] },
];

const SLEEP_OPTIONS = ['4h-', '5h', '6h', '7h', '8h', '9h+'] as const;
type SleepOption = typeof SLEEP_OPTIONS[number];

const MEAL_OPTIONS = ['아', '점', '저'] as const;
const MEAL_LABELS: Record<string, string> = { '아': '아침', '점': '점심', '저': '저녁' };
type MealKey = typeof MEAL_OPTIONS[number];

function EditableTagChip({
  label,
  selected,
  tone,
  onToggle,
}: Tag & {
  tone: Tone;
  onToggle: () => void;
}) {
  const styles = toneStyles[tone];

  return (
    <button
      type="button"
      aria-pressed={Boolean(selected)}
      onClick={onToggle}
      className={`items-center flex font-semibold whitespace-nowrap border gap-1.5 pt-[10px] pb-[10px] px-[14px] rounded-full ${
        selected ? styles.selected : styles.unselected
      }`}
    >
      {selected ? <Check className="w-[10px] h-[10px] shrink-0" strokeWidth={3} /> : null}
      <span className="block">{label}</span>
    </button>
  );
}

function TagSection({
  title,
  tone,
  tags,
  onToggleTag,
  onAddTag,
  onManageTags,
}: Section & {
  onToggleTag: (label: string) => void;
  onAddTag: (label: string) => void;
  onManageTags: () => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState('');
  const styles = toneStyles[tone];

  const handleAdd = () => {
    if (!draft.trim()) return;
    onAddTag(draft.trim());
    setDraft('');
    setIsAdding(false);
  };

  return (
    <section>
      <div className="items-center flex mb-2.5 gap-1.5">
        <div className={`w-[10px] h-[10px] rounded-[0.3125rem] ${styles.dot}`}></div>
        <div className="font-bold">{title}</div>
        <button type="button" onClick={onManageTags} aria-label="태그 관리" className="ml-auto p-1 text-purple-400">
          <Settings2 className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <EditableTagChip
            key={tag.label}
            tone={tone}
            onToggle={() => onToggleTag(tag.label)}
            {...tag}
          />
        ))}
        {isAdding ? (
          <form
            className="flex max-w-full flex-wrap items-center gap-1"
            onSubmit={(e) => { e.preventDefault(); handleAdd(); }}
          >
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => { if (!draft.trim()) setIsAdding(false); }}
              onKeyDown={(e) => { if (e.key === 'Escape') { setDraft(''); setIsAdding(false); } }}
              placeholder="태그 이름"
              className="h-9 min-w-28 max-w-full bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 px-3 rounded-full outline-none text-base focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
              style={{ width: `${Math.max(7, draft.length + 2)}ch` }}
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="flex items-center justify-center w-9 h-9 bg-[rgb(31,27,46)] disabled:bg-gray-200 rounded-full"
            >
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.8} />
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 text-xs font-medium whitespace-nowrap border border-dashed border-gray-300 text-gray-400 pt-[10px] pb-[10px] pl-[12px] pr-[14px] rounded-full"
          >
            <Plus className="w-3 h-3" strokeWidth={2.5} />
            <span>추가</span>
          </button>
        )}
      </div>
    </section>
  );
}

function GoalSlider({
  label,
  value,
  onChange,
  onChangeEnd,
  editing,
  onDelete,
  onLabelChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  editing?: boolean;
  onDelete?: () => void;
  onLabelChange?: (newContent: string) => void;
}) {
  const percent = `${value * 10}%`;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (newValue: number) => {
    onChange(newValue);
    if (onChangeEnd) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => { onChangeEnd(newValue); }, 500);
    }
  };

  return (
    <div>
      <div className="items-center flex mb-[10px] gap-2">
        {editing ? (
          <input
            type="text"
            defaultValue={label}
            maxLength={50}
            onBlur={(e) => {
              const next = e.target.value.trim();
              if (next && next !== label) onLabelChange?.(next);
              else e.target.value = label;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
              if (e.key === 'Escape') { e.currentTarget.value = label; e.currentTarget.blur(); }
            }}
            className="font-semibold text-gray-800 grow basis-[0%] bg-transparent border-b border-purple-300 outline-none text-sm pb-px"
          />
        ) : (
          <div className="font-semibold text-gray-800 grow basis-[0%]">{label}</div>
        )}
        {editing ? (
          <button
            type="button"
            aria-label={`${label} 삭제`}
            onClick={onDelete}
            className="flex items-center justify-center w-5 h-5 rounded-full text-gray-400"
          >
            <X className="w-3.5 h-3.5 shrink-0" strokeWidth={2.4} />
          </button>
        ) : null}
        <div className="text-purple-500 text-sm font-bold leading-none">{value}</div>
      </div>
      <div className="items-center flex">
        <div className="grow basis-[0%]">
          <div className="relative h-12">
            <div className="absolute left-0 right-0 top-[11px] h-2 bg-gray-100 rounded-full"></div>
            <div className="absolute left-0 top-[11px] h-2 bg-purple-300 rounded-full" style={{ width: percent }}></div>
            <div className="absolute left-0 right-0 top-[21px] flex justify-between">
              {Array.from({ length: 11 }, (_, i) => (
                <div
                  key={i}
                  className={`w-px rounded-full ${i % 5 === 0 ? "h-2 bg-gray-400" : "h-1.5 bg-gray-300"}`}
                />
              ))}
            </div>
            <div className="absolute left-0 right-0 top-[34px]">
              <span className="absolute left-0 text-[10px] text-gray-400 leading-none">0</span>
              <span className="absolute left-1/2 -translate-x-1/2 text-[10px] text-gray-400 leading-none">5</span>
              <span className="absolute right-0 text-[10px] text-gray-400 leading-none">10</span>
            </div>
            <div
              className="absolute w-6 h-6 top-[3px] bg-white border-2 border-[rgb(185,166,255)] shadow-[rgba(60,40,90,0.16)_0px_2px_6px_0px] translate-x-[-50%] rounded-full"
              style={{ left: percent }}
            ></div>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={value}
              aria-label={label}
              onChange={(event) => handleChange(Number(event.target.value))}
              className="absolute inset-0 z-10 w-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JournalFullPage() {
  const navigate = useNavigate();
  const journalDate = useMemo(() => toDateKey(new Date()), []);
  const [sections, setSections] = useState(emptySections);
  const [goals, setGoals] = useState<GoalState[]>([]);
  const [editingGoals, setEditingGoals] = useState(false);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [draftGoal, setDraftGoal] = useState('');
  const [memo, setMemo] = useState('');
  const [memoSaved, setMemoSaved] = useState(true);
  const [memoFocused, setMemoFocused] = useState(false);
  const [error, setError] = useState('');

  const [sleep, setSleep] = useState<SleepOption | null>('7h');
  const [sleepQuality, setSleepQuality] = useState<SleepQuality | null>(null);
  const [meals, setMeals] = useState<Set<MealKey>>(new Set(MEAL_OPTIONS));

  useEffect(() => {
    let ignore = false;

    const loadJournal = async () => {
      let journal: JournalDetail | null | undefined;

      try {
        journal = await getJournal(journalDate);
      } catch (err) {
        console.error('Failed to load journal:', err);
      }

      if (ignore) return;

      let catalogTags: Awaited<ReturnType<typeof getCatalogTags>>[] = [[], [], []];
      try {
        catalogTags = await Promise.all([
          getCatalogTags('CONDITION'),
          getCatalogTags('SIDE_EFFECT'),
          getCatalogTags('TROUBLE'),
        ]);
      } catch (err) {
        console.error('Failed to load catalog tags:', err);
        if (!ignore) setError('일지 태그를 불러오지 못했습니다.');
        return;
      }

      if (ignore) return;
      const checked = journal?.checked;
      const [conditionCatalogTags, sideEffectCatalogTags, troubleCatalogTags] = catalogTags;

        const checkedConditionLegacyIds = new Set(checked?.conditions?.map((item) => item.tagId) ?? []);
        const checkedSideEffectLegacyIds = new Set(checked?.sideEffects?.map((item) => item.tagId) ?? []);
        const checkedTroubleLegacyIds = new Set(checked?.troubles?.map((item) => item.tagId) ?? []);
        const checkedCatalogTagIdSet = new Set(checked?.checkedCatalogTagIds ?? []);

        const isSelected = (t: { catalogTagId: number; legacyTagId: number | null }, legacySet: Set<number>) =>
          t.legacyTagId != null ? legacySet.has(t.legacyTagId) : checkedCatalogTagIdSet.has(t.catalogTagId);

        setSections([
          {
            title: '감정 · 증상',
            tone: 'purple',
            tags: conditionCatalogTags.filter((t) => t.enabled).map((t) => ({
              label: t.name,
              selected: isSelected(t, checkedConditionLegacyIds),
              catalogTagId: t.catalogTagId,
              category: 'CONDITION' as const,
            })),
          },
          {
            title: '부작용',
            tone: 'orange',
            tags: sideEffectCatalogTags.filter((t) => t.enabled).map((t) => ({
              label: t.name,
              selected: isSelected(t, checkedSideEffectLegacyIds),
              catalogTagId: t.catalogTagId,
              category: 'SIDE_EFFECT' as const,
            })),
          },
          {
            title: '업무 실수 · 불편',
            tone: 'blue',
            tags: troubleCatalogTags.filter((t) => t.enabled).map((t) => ({
              label: t.name,
              selected: isSelected(t, checkedTroubleLegacyIds),
              catalogTagId: t.catalogTagId,
              category: 'TROUBLE' as const,
            })),
          },
        ]);

        if (checked?.memo) {
          setMemo(checked.memo);
          setMemoSaved(true);
        }

        if (checked?.sleep) {
          if (typeof checked.sleep.sleepHour === 'number') setSleep(hourToSleepOption(checked.sleep.sleepHour));
          if (checked.sleep.sleepQuality) setSleepQuality(checked.sleep.sleepQuality);
        }

        if (checked?.meal) {
          const nextMeals = new Set<MealKey>();
          if (checked.meal.ateBreakfast) nextMeals.add('아');
          if (checked.meal.ateLunch) nextMeals.add('점');
          if (checked.meal.ateDinner) nextMeals.add('저');
          setMeals(nextMeals);
        }

        const journalGoals = journal?.activeTags?.goals;
        if (journalGoals?.length) {
          const checkedGoals = new Map(checked?.goals?.map((goal) => [goal.goalId, goal.score]) ?? []);
          setGoals(journalGoals.map((goal) => ({
            goalId: goal.goalId,
            label: goal.content,
            value: checkedGoals.get(goal.goalId) ?? 0,
          })));
        }
    };

    void loadJournal();

    return () => {
      ignore = true;
    };
  }, [journalDate]);

  const toggleMeal = async (meal: MealKey) => {
    const nextMeals = new Set(meals);
    if (nextMeals.has(meal)) nextMeals.delete(meal);
    else nextMeals.add(meal);
    setMeals(nextMeals);
    await saveSleepMeal(sleep, sleepQuality, nextMeals);
  };

  const toggleTag = async (sectionTitle: string, label: string) => {
    const tag = sections.find((section) => section.title === sectionTitle)?.tags.find((item) => item.label === label);
    const nextSelected = !Boolean(tag?.selected);
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.title === sectionTitle
          ? {
              ...section,
              tags: section.tags.map((tag) => (tag.label === label ? { ...tag, selected: !tag.selected } : tag)),
            }
          : section,
      ),
    );

    if (!tag?.catalogTagId) return;

    try {
      if (nextSelected) {
        await checkCatalogTag(tag.catalogTagId);
      } else {
        await uncheckCatalogTag(tag.catalogTagId, journalDate);
      }
    } catch (err) {
      console.error('Failed to toggle tag:', err);
      setSections((currentSections) =>
        currentSections.map((section) =>
          section.title === sectionTitle
            ? {
                ...section,
                tags: section.tags.map((currentTag) =>
                  currentTag.label === label ? { ...currentTag, selected: !nextSelected } : currentTag,
                ),
              }
            : section,
        ),
      );
      setError('태그 기록에 실패했습니다.');
    }
  };


  const addTag = async (sectionTitle: string, label: string) => {
    const category: JournalTagCategory =
      sectionTitle === '감정 · 증상' ? 'CONDITION' :
      sectionTitle === '부작용' ? 'SIDE_EFFECT' :
      'TROUBLE';
    const tagType = category === 'SIDE_EFFECT' ? 'NONE' : 'USER_INPUT';

    let createdTag: Tag | null = null;
    try {
      const response = await createCatalogTag({ category, name: label, tagType, visible: true });
      await checkCatalogTag(response.catalogTagId);
      createdTag = {
        label: response.name,
        selected: true,
        catalogTagId: response.catalogTagId,
        category,
      };
    } catch (err) {
      console.error('Failed to add tag:', err);
      setError('태그 추가에 실패했습니다.');
      return;
    }

    if (!createdTag) return;
    const nextTag = createdTag;

    setSections((currentSections) =>
      currentSections.map((section) => {
        if (section.title !== sectionTitle) return section;

        const existingIndex = section.tags.findIndex(
          (tag) => tag.catalogTagId === nextTag.catalogTagId || tag.label === nextTag.label,
        );
        if (existingIndex >= 0) {
          return {
            ...section,
            tags: section.tags.map((tag, index) =>
              index === existingIndex ? { ...tag, ...nextTag, selected: true } : tag,
            ),
          };
        }

        return { ...section, tags: [...section.tags, nextTag] };
      }),
    );
  };

  const saveSleepMeal = async (nextSleep: SleepOption | null, nextQuality: SleepQuality | null, nextMeals: Set<MealKey>) => {
    const payload = {
      sleepHour: sleepOptionToHour(nextSleep),
      sleepQuality: nextQuality,
      ateBreakfast: nextMeals.has('아'),
      ateLunch: nextMeals.has('점'),
      ateDinner: nextMeals.has('저'),
    };

    try {
      await createSleepMeal(journalDate, payload);
    } catch (err) {
      console.error('Failed to save sleep/meal:', err);
      setError('수면/식사 저장에 실패했습니다.');
    }
  };

  const saveMemo = async () => {
    if (memoSaved) return;
    try {
      await createMemo(journalDate, memo);
      setMemoSaved(true);
    } catch (err) {
      console.error('Failed to save memo:', err);
      setError('메모 저장에 실패했습니다.');
    }
  };

  const addGoal = async (content: string) => {
    const trimmed = content.trim().slice(0, 50);
    if (!trimmed) return;
    setIsAddingGoal(false);
    setDraftGoal('');
    try {
      const newGoal = await createJournalGoal({ content: trimmed, journalDate });
      setGoals((prev) => [...prev, { goalId: newGoal.goalId, label: newGoal.content, value: 0 }]);
    } catch (err) {
      console.error('Failed to add goal:', err);
      setError('목표 추가에 실패했습니다.');
    }
  };

  const deleteGoal = async (goal: GoalState) => {
    setGoals((prev) => prev.filter((g) => g.label !== goal.label));
    if (goal.goalId == null) return;
    try {
      await deleteJournalGoal(goal.goalId, journalDate);
    } catch (err) {
      console.error('Failed to delete goal:', err);
      setError('목표 삭제에 실패했습니다.');
    }
  };

  const closeJournal = async () => {
    await saveMemo();
    navigate(-1);
  };




  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title={formatDate(new Date())}
          left={<NavBackButton onClick={() => navigate(-1)} />}
          right={<NavCloseButton onClick={closeJournal} />}
        />

        <div className="flex justify-end px-4 pb-2">
          <button
            type="button"
            onClick={() => navigate('/journal/timeline')}
            className="flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-50 border border-[rgb(185,166,255)] px-3 py-1.5 rounded-full"
          >
            <span>타임라인 보기</span>
            <ChevronRight className="w-3 h-3" strokeWidth={2.5} />
          </button>
        </div>

        <ScrollArea className="flex flex-col gap-10 pt-2">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          <section>
            <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3.5 rounded-[1.125rem]">
              {/* 수면 */}
              <div className="flex items-center gap-1 mb-2">
                <Moon className="w-3.5 h-3.5 text-purple-500" strokeWidth={2.4} />
                <div className="font-semibold text-xs text-gray-600">수면</div>
              </div>
              <div className="flex gap-[2px]">
                {SLEEP_OPTIONS.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      const nextSleep = sleep === opt ? null : opt;
                      const nextQuality = nextSleep === null ? null : sleepQuality;
                      setSleep(nextSleep);
                      if (nextSleep === null) setSleepQuality(null);
                      void saveSleepMeal(nextSleep, nextQuality, meals);
                    }}
                    className={`grow h-2 rounded-sm transition-colors ${sleep && SLEEP_OPTIONS.indexOf(sleep) >= i ? 'bg-purple-400' : 'bg-gray-100'}`}
                    aria-label={opt}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {SLEEP_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      const nextSleep = sleep === opt ? null : opt;
                      const nextQuality = nextSleep === null ? null : sleepQuality;
                      setSleep(nextSleep);
                      if (nextSleep === null) setSleepQuality(null);
                      void saveSleepMeal(nextSleep, nextQuality, meals);
                    }}
                    className={`text-[11px] font-medium transition-colors ${sleep === opt ? 'text-purple-600 font-bold' : 'text-gray-400'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5 mt-2">
                {(['GOOD', 'NORMAL', 'BAD'] as const).map((q) => {
                  const label = q === 'GOOD' ? '좋음' : q === 'NORMAL' ? '보통' : '나쁨';
                  return (
                    <button
                      key={q}
                      type="button"
                      disabled={!sleep}
                      onClick={() => {
                        setSleepQuality(q);
                        void saveSleepMeal(sleep, q, meals);
                      }}
                      className={`flex-1 text-xs font-semibold py-2 rounded-full border transition-colors ${sleepQuality === q ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-gray-50 border-gray-200 text-gray-400'} ${!sleep ? 'opacity-40 cursor-default' : ''}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <div className="border-t border-gray-100 mt-3 mb-3" />
              {/* 식사 */}
              <div className="flex items-center gap-1 mb-2">
                <Utensils className="w-3.5 h-3.5 text-purple-500" strokeWidth={2.4} />
                <div className="font-semibold text-xs text-gray-600">식사</div>
              </div>
              <div className="flex gap-1.5">
                {MEAL_OPTIONS.map((meal) => (
                  <button
                    key={meal}
                    type="button"
                    onClick={() => toggleMeal(meal)}
                    aria-pressed={meals.has(meal)}
                    className={`flex-1 text-xs font-semibold py-2 rounded-full border transition-colors ${
                      meals.has(meal) ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-gray-50 border-gray-200 text-gray-400'
                    }`}
                  >
                    {MEAL_LABELS[meal]}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-5">
            {sections.map((section) => (
              <TagSection
                key={section.title}
                onToggleTag={(label) => toggleTag(section.title, label)}
                onAddTag={(label) => addTag(section.title, label)}
                onManageTags={() => navigate('/journal/tags')}
                {...section}
              />
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <section>
              <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="font-bold text-sm grow">오늘의 목표</div>
                  <button
                    type="button"
                    onClick={() => { setEditingGoals((prev) => !prev); setIsAddingGoal(false); }}
                    className="font-bold text-purple-600 text-xs pt-1 pr-2.5 pb-1 pl-2.5 rounded-full"
                  >
                    {editingGoals ? '완료' : '편집'}
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {goals.map((goal) => (
                    <GoalSlider
                      key={goal.goalId ?? goal.label}
                      {...goal}
                      editing={editingGoals}
                      onDelete={() => deleteGoal(goal)}
                      onLabelChange={async (newContent) => {
                        if (goal.goalId == null) return;
                        try {
                          const updated = await updateJournalGoal(goal.goalId, newContent);
                          setGoals((prev) => prev.map((g) => g.goalId === goal.goalId ? { ...g, label: updated.content } : g));
                        } catch (err) {
                          console.error('Failed to update goal:', err);
                          setError('목표 수정에 실패했습니다.');
                        }
                      }}
                      onChange={(value) =>
                        setGoals((currentGoals) =>
                          currentGoals.map((currentGoal) =>
                            currentGoal.label === goal.label ? { ...currentGoal, value } : currentGoal,
                          ),
                        )
                      }
                      onChangeEnd={(value) => {
                        if (goal.goalId == null) return;
                        void scoreJournalGoal(journalDate, { goalId: goal.goalId, score: value });
                      }}
                    />
                  ))}
                  {editingGoals && (isAddingGoal ? (
                    <form
                      className="flex items-center gap-1"
                      onSubmit={(e) => { e.preventDefault(); void addGoal(draftGoal); }}
                    >
                      <input
                        autoFocus
                        value={draftGoal}
                        onChange={(e) => setDraftGoal(e.target.value)}
                        onBlur={() => { if (!draftGoal.trim()) setIsAddingGoal(false); }}
                        onKeyDown={(e) => { if (e.key === 'Escape') { setDraftGoal(''); setIsAddingGoal(false); } }}
                        maxLength={50}
                        placeholder="목표 내용"
                        className="grow h-9 bg-gray-50 border border-gray-200 text-gray-800 placeholder:text-gray-400 px-3 rounded-full outline-none text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                      />
                      <button
                        type="submit"
                        disabled={!draftGoal.trim()}
                        className="flex items-center justify-center w-9 h-9 bg-[rgb(31,27,46)] disabled:bg-gray-200 rounded-full shrink-0"
                      >
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.8} />
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddingGoal(true)}
                      className="flex items-center gap-1 text-xs font-medium whitespace-nowrap border border-dashed border-gray-300 text-gray-400 self-start pt-[10px] pb-[10px] pl-[12px] pr-[14px] rounded-full"
                    >
                      <Plus className="w-3 h-3" strokeWidth={2.5} />
                      <span>추가</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <div className={`bg-white border shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-2xl transition-colors ${memoFocused ? 'border-purple-400' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-gray-800">메모</div>
                {!memoSaved && (
                  <button
                    onClick={saveMemo}
                    className="text-sm px-3 py-1 rounded-lg font-medium text-white bg-[rgb(31,27,46)] hover:bg-[rgb(50,44,70)] transition-colors"
                  >
                    저장
                  </button>
                )}
              </div>
              <textarea
                value={memo}
                onChange={(e) => { setMemo(e.target.value); setMemoSaved(false); }}
                onFocus={() => setMemoFocused(true)}
                onBlur={() => setMemoFocused(false)}
                placeholder="메모를 입력하세요"
                rows={4}
                className="w-full text-base text-gray-900 leading-relaxed resize-none outline-none placeholder:text-gray-300"
              />
            </div>
          </div>
        </ScrollArea>

        <TabBar active="일지" />
      </div>
    </div>
  );
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function sleepOptionToHour(sleep: SleepOption | null) {
  if (!sleep) return null;
  if (sleep === '4h-') return 4;
  if (sleep === '9h+') return 9;
  return Number(sleep.replace('h', ''));
}

function hourToSleepOption(hour: number): SleepOption {
  if (hour <= 4) return '4h-';
  if (hour >= 9) return '9h+';
  const roundedHour = Math.round(hour);
  if (roundedHour <= 5) return '5h';
  if (roundedHour === 6) return '6h';
  if (roundedHour === 7) return '7h';
  return '8h';
}

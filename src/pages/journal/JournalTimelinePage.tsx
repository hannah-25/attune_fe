import React, { useEffect, useMemo, useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { formatDate } from '@/lib/date';
import { TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import {
  getCatalogTags,
  checkCatalogTag,
  uncheckCatalogTag,
  createMemo,
  getJournal,
} from '@/api/journal';

type Category = '감정·증상' | '부작용' | '업무 실수';

const CATEGORIES: Category[] = ['감정·증상', '부작용', '업무 실수'];

const categoryConfig: Record<Category, {
  dotClass: string;
  cardBg: string;
  chipClass: string;
  sheetChipSelected: string;
  timelineLabel: string;
}> = {
  '감정·증상': {
    dotClass: 'bg-purple-500',
    cardBg: 'bg-purple-50',
    chipClass: 'bg-purple-100 border border-[rgb(185,166,255)] text-purple-800',
    sheetChipSelected: 'bg-purple-100 border-[rgb(185,166,255)] text-purple-800',
    timelineLabel: '감정',
  },
  '부작용': {
    dotClass: 'bg-[rgb(255,140,80)]',
    cardBg: 'bg-orange-50',
    chipClass: 'bg-orange-100 border border-orange-200 text-orange-800',
    sheetChipSelected: 'bg-orange-50 border-orange-200 text-orange-800',
    timelineLabel: '부작용',
  },
  '업무 실수': {
    dotClass: 'bg-[rgb(80,140,220)]',
    cardBg: 'bg-blue-50',
    chipClass: 'bg-blue-100 border border-blue-200 text-blue-800',
    sheetChipSelected: 'bg-blue-50 border-blue-200 text-blue-800',
    timelineLabel: '업무',
  },
};

type TagItem = { catalogTagId: number; label: string };

type TagEntry = {
  id: string;
  time: string;
  kind: 'tags';
  category: Category;
  tags: TagItem[];
};

type SimpleEntry = {
  id: string;
  time: string;
  kind: 'medication' | 'meal';
  label: string;
  content: string;
};

type TimelineEntry = TagEntry | SimpleEntry;
type ApiTag = { label: string; catalogTagId: number };

function buildTagEntries(
  conditions: Array<{ tagId: number; condition: string; checkedAt: string }>,
  sideEffects: Array<{ tagId: number; sideEffect: string; checkedAt: string }>,
  troubles: Array<{ tagId: number; trouble: string; checkedAt: string }>,
  conditionMap: Map<number, number>,
  sideEffectMap: Map<number, number>,
  troubleMap: Map<number, number>,
): TagEntry[] {
  const map = new Map<string, TagEntry>();

  const add = (
    category: Category,
    legacyTagId: number,
    label: string,
    checkedAt: string,
    catalogMap: Map<number, number>,
  ) => {
    const time = checkedAt.slice(11, 16);
    const key = `${category}|${time}`;
    if (!map.has(key)) map.set(key, { id: key, time, kind: 'tags', category, tags: [] });
    const catalogTagId = catalogMap.get(legacyTagId);
    if (catalogTagId != null) {
      map.get(key)!.tags.push({ catalogTagId, label });
    }
  };

  conditions.forEach((c) => add('감정·증상', c.tagId, c.condition, c.checkedAt, conditionMap));
  sideEffects.forEach((s) => add('부작용', s.tagId, s.sideEffect, s.checkedAt, sideEffectMap));
  troubles.forEach((t) => add('업무 실수', t.tagId, t.trouble, t.checkedAt, troubleMap));

  return Array.from(map.values())
    .filter((entry) => entry.tags.length > 0)
    .sort((a, b) => a.time.localeCompare(b.time));
}

function getNow(): string {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export default function JournalTimelinePage() {
  const navigate = useNavigate();
  const journalDate = useMemo(() => toDateKey(new Date()), []);
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [categoryTags, setCategoryTags] = useState<Record<Category, ApiTag[]>>({
    '감정·증상': [],
    '부작용': [],
    '업무 실수': [],
  });
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [memo, setMemo] = useState('');
  const [memoSaved, setMemoSaved] = useState(true);
  const [memoFocused, setMemoFocused] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    Promise.all([
      getCatalogTags('CONDITION'),
      getCatalogTags('SIDE_EFFECT'),
      getCatalogTags('TROUBLE'),
      getJournal(journalDate).catch((err) => { console.error('Failed to load journal:', err); return null; }),
    ])
      .then(([conditionCatalogTags, sideEffectCatalogTags, troubleCatalogTags, journal]) => {
        if (ignore) return;
        setCategoryTags({
          '감정·증상': conditionCatalogTags.filter((t) => t.enabled).map((t) => ({ label: t.name, catalogTagId: t.catalogTagId })),
          '부작용': sideEffectCatalogTags.filter((t) => t.enabled).map((t) => ({ label: t.name, catalogTagId: t.catalogTagId })),
          '업무 실수': troubleCatalogTags.filter((t) => t.enabled).map((t) => ({ label: t.name, catalogTagId: t.catalogTagId })),
        });
        if (journal) {
          if (journal.checked.memo) {
            setMemo(journal.checked.memo);
            setMemoSaved(true);
          }
          const conditionMap = new Map(
            conditionCatalogTags.filter((t) => t.legacyTagId != null).map((t) => [t.legacyTagId!, t.catalogTagId]),
          );
          const sideEffectMap = new Map(
            sideEffectCatalogTags.filter((t) => t.legacyTagId != null).map((t) => [t.legacyTagId!, t.catalogTagId]),
          );
          const troubleMap = new Map(
            troubleCatalogTags.filter((t) => t.legacyTagId != null).map((t) => [t.legacyTagId!, t.catalogTagId]),
          );
          setEntries(buildTagEntries(
            journal.checked.conditions,
            journal.checked.sideEffects,
            journal.checked.troubles,
            conditionMap,
            sideEffectMap,
            troubleMap,
          ));
        }
      })
      .catch((err) => {
        console.error('Failed to load journal tags:', err);
        if (!ignore) setError('일지 태그를 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, []);

  const toggleEditing = (entryId: string) => {
    setEditingEntryId(prev => prev === entryId ? null : entryId);
  };

  const removeTag = (entryId: string, tag: TagItem) => {
    setEntries(prev => {
      const next = prev
        .map(entry => {
          if (entry.id !== entryId || entry.kind !== 'tags') return entry;
          return { ...entry, tags: (entry as TagEntry).tags.filter(t => t.catalogTagId !== tag.catalogTagId) };
        })
        .filter(entry => entry.kind !== 'tags' || (entry as TagEntry).tags.length > 0);
      return next;
    });

    uncheckCatalogTag(tag.catalogTagId, journalDate).catch((err) => {
      console.error('Failed to remove tag:', err);
      setError('태그 삭제에 실패했습니다.');
      setEntries(prev => {
        if (prev.some(e => e.id === entryId && e.kind === 'tags' && (e as TagEntry).tags.some(t => t.catalogTagId === tag.catalogTagId))) return prev;
        return prev.map(entry => {
          if (entry.id !== entryId || entry.kind !== 'tags') return entry;
          return { ...entry, tags: [...(entry as TagEntry).tags, tag] };
        });
      });
    });
  };

  const openSheet = (category: Category) => {
    setActiveCategory(category);
    setSelectedTags(new Set());
  };

  const closeSheet = () => {
    setActiveCategory(null);
    setSelectedTags(new Set());
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const handleRecord = async () => {
    if (!activeCategory || selectedTags.size === 0) return;
    const selectedApiTags = categoryTags[activeCategory].filter((tag) => selectedTags.has(tag.label));

    try {
      await Promise.all(selectedApiTags.map((tag) => checkCatalogTag(tag.catalogTagId)));
    } catch (err) {
      console.error('Failed to record tags:', err);
      setError('태그 기록에 실패했습니다.');
    }

    setEntries(prev => [
      ...prev,
      {
        id: String(Date.now()),
        time: getNow(),
        kind: 'tags',
        category: activeCategory,
        tags: selectedApiTags.map(t => ({ catalogTagId: t.catalogTagId, label: t.label })),
      },
    ]);
    closeSheet();
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

  const config = activeCategory ? categoryConfig[activeCategory] : null;
  const sheetTags = activeCategory ? categoryTags[activeCategory] : [];

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="오늘 일지"
          left={<NavBackButton onClick={() => navigate(-1)} />}
          subtitle={formatDate(new Date())}
        />

        <ScrollArea className="pt-0 pb-[230px]">
          {error ? <div className="text-red-500 text-xs px-1 pb-2">{error}</div> : null}
          <div className="relative pt-0 pr-0 pb-0 pl-[18px]">
            <div className="absolute w-[2px] left-[6px] top-[6px] bottom-[30px] bg-purple-100"></div>

            {entries.map(entry => {
              if (entry.kind !== 'tags') {
                return (
                  <div key={entry.id} className="relative pt-0 pr-0 pb-3 pl-0">
                    <div className="absolute w-[14px] h-[14px] left-[-18px] top-2 bg-purple-300 border-[rgb(255,_250,_240)] border-[2.22222px] rounded-[0.4375rem]"></div>
                    <div className="items-baseline flex mb-1 gap-2">
                      <div className="font-bold text-gray-600 text-xs">{entry.time}</div>
                      <div className="font-bold text-gray-500 text-xs">· {entry.label}</div>
                    </div>
                    <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[10px] rounded-[0.875rem]">
                      <div className={entry.kind === 'medication' ? 'font-bold' : 'font-semibold'}>{entry.content}</div>
                    </div>
                  </div>
                );
              }

              const cfg = categoryConfig[entry.category];
              const isEditing = editingEntryId === entry.id;

              return (
                <div key={entry.id} className="relative pt-0 pr-0 pb-3 pl-0">
                  <div className={`absolute w-[14px] h-[14px] left-[-18px] top-2 ${cfg.dotClass} border-[rgb(255,_250,_240)] border-[2.22222px] rounded-[0.4375rem]`}></div>
                  <div className="flex items-baseline mb-1 gap-2">
                    <div className="font-bold text-gray-600 text-xs">{entry.time}</div>
                    <div className="font-bold text-gray-500 text-xs">· {cfg.timelineLabel}</div>
                    <div className="grow basis-[0%]"></div>
                    <button
                      type="button"
                      onClick={() => toggleEditing(entry.id)}
                      className="font-bold text-purple-600 text-xs pt-0.5 pr-2 pb-0.5 pl-2 rounded-full"
                    >
                      {isEditing ? '완료' : '편집'}
                    </button>
                  </div>
                  <div className={`${cfg.cardBg} shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[10px] rounded-[0.875rem]`}>
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map(tag => (
                        <div
                          key={tag.catalogTagId}
                          className={`items-center flex font-semibold whitespace-nowrap ${cfg.chipClass} text-xs gap-1 tracking-tight pt-[7px] ${isEditing ? 'pr-2' : 'pr-[11px]'} pb-[7px] pl-[11px] rounded-full`}
                        >
                          <span className="block">{tag.label}</span>
                          {isEditing && (
                            <button
                              type="button"
                              aria-label={`${tag.label} 삭제`}
                              onClick={() => removeTag(entry.id, tag)}
                              className="flex items-center justify-center w-4 h-4 rounded-full opacity-50"
                            >
                              <X className="w-3 h-3" strokeWidth={2.5} />
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => { toggleEditing(entry.id); openSheet(entry.category); }}
                          className="flex items-center gap-1 text-xs font-medium whitespace-nowrap border border-dashed border-gray-300 text-gray-400 pt-[7px] pb-[7px] pl-[10px] pr-[12px] rounded-full"
                        >
                          <Plus className="w-3 h-3" strokeWidth={2.5} />
                          <span>추가</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </ScrollArea>

        <div className={`absolute left-4 right-4 bottom-[142px] bg-white border shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl transition-colors ${memoFocused ? 'border-purple-300' : 'border-transparent'}`}>
          {!memoSaved && (
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={saveMemo}
                className="text-xs px-2.5 py-1 rounded-lg font-bold text-white bg-[rgb(31,27,46)]"
              >
                저장
              </button>
            </div>
          )}
          <textarea
            value={memo}
            onChange={e => { setMemo(e.target.value); setMemoSaved(false); }}
            onFocus={() => setMemoFocused(true)}
            onBlur={() => setMemoFocused(false)}
            placeholder="메모 남기기"
            rows={1}
            className="w-full text-base text-gray-900 leading-relaxed resize-none outline-none placeholder:text-gray-400 bg-transparent"
          />
        </div>

        <div className="items-center flex absolute left-4 right-4 bottom-[78px] backdrop-blur-[18px] bg-white/80 border-white/70 border shadow-[rgba(60,40,90,0.12)_0px_10px_26px_0px] gap-1 pt-2 pr-2 pb-2 pl-2 rounded-3xl">
          {CATEGORIES.map(cat => {
            const cfg = categoryConfig[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => openSheet(cat)}
                className="flex items-center justify-center gap-1.5 grow basis-[0%] h-10 bg-gray-50 active:bg-gray-100 rounded-2xl text-xs font-semibold text-gray-700"
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${cfg.dotClass}`}></div>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        <TabBar active="일지" />
      </div>

      {activeCategory && config && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={closeSheet} />
          <div className="fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-[rgba(60,40,90,0.2)_0px_-8px_30px_0px] pt-4 px-4 pb-8">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${config.dotClass}`}></div>
                <div className="font-bold text-base">{activeCategory}</div>
              </div>
              <button
                type="button"
                onClick={closeSheet}
                className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-500" strokeWidth={2.5} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {sheetTags.map(tag => {
                const isSelected = selectedTags.has(tag.label);
                return (
                  <button
                    key={tag.catalogTagId}
                    type="button"
                    onClick={() => toggleTag(tag.label)}
                    className={`flex items-center gap-1.5 font-semibold text-sm whitespace-nowrap border pt-[10px] pb-[10px] pl-[14px] pr-[14px] rounded-full transition-colors ${
                      isSelected
                        ? config.sheetChipSelected
                        : 'bg-gray-100 border-transparent text-gray-600'
                    }`}
                  >
                    {isSelected && <Check className="w-[10px] h-[10px] shrink-0" strokeWidth={3} />}
                    <span>{tag.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={handleRecord}
              disabled={selectedTags.size === 0}
              className="w-full flex items-center justify-center h-12 bg-[rgb(31,27,46)] disabled:bg-gray-200 text-white disabled:text-gray-400 font-bold text-sm rounded-2xl transition-colors"
            >
              기록
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

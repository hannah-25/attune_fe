import React, { useState } from 'react';
import { X, Check, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';

type Category = '감정·증상' | '부작용' | '업무 실수';

const CATEGORIES: Category[] = ['감정·증상', '부작용', '업무 실수'];

const categoryConfig: Record<Category, {
  dotClass: string;
  tags: string[];
  cardBg: string;
  chipClass: string;
  sheetChipSelected: string;
  timelineLabel: string;
}> = {
  '감정·증상': {
    dotClass: 'bg-purple-500',
    tags: ['집중 어려움', '멍해짐', '짜증', '불안', '무기력', '초조', '몰입'],
    cardBg: 'bg-purple-50',
    chipClass: 'bg-purple-100 border border-[rgb(185,166,255)] text-purple-800',
    sheetChipSelected: 'bg-purple-100 border-[rgb(185,166,255)] text-purple-800',
    timelineLabel: '감정',
  },
  '부작용': {
    dotClass: 'bg-[rgb(255,140,80)]',
    tags: ['두통', '식욕 저하', '불면', '입마름', '두근거림'],
    cardBg: 'bg-orange-50',
    chipClass: 'bg-orange-100 border border-orange-200 text-orange-800',
    sheetChipSelected: 'bg-orange-50 border-orange-200 text-orange-800',
    timelineLabel: '부작용',
  },
  '업무 실수': {
    dotClass: 'bg-[rgb(80,140,220)]',
    tags: ['마감 놓침', '약속 잊음', '물건 잃어버림', '일을 잘게 못 쪼갬'],
    cardBg: 'bg-blue-50',
    chipClass: 'bg-blue-100 border border-blue-200 text-blue-800',
    sheetChipSelected: 'bg-blue-50 border-blue-200 text-blue-800',
    timelineLabel: '업무',
  },
};

type TagEntry = {
  id: string;
  time: string;
  kind: 'tags';
  category: Category;
  tags: string[];
};

type SimpleEntry = {
  id: string;
  time: string;
  kind: 'medication' | 'meal';
  label: string;
  content: string;
};

type TimelineEntry = TagEntry | SimpleEntry;

const initialEntries: TimelineEntry[] = [
  { id: 'e1', time: '08:00', kind: 'medication', label: '복용', content: '콘서타 18mg' },
  { id: 'e2', time: '09:30', kind: 'tags', category: '감정·증상', tags: ['😰 불안', '멍해짐'] },
  { id: 'e3', time: '12:00', kind: 'meal', label: '식사', content: '점심 ✓' },
  { id: 'e4', time: '14:20', kind: 'tags', category: '업무 실수', tags: ['마감 놓침'] },
  { id: 'e5', time: '15:00', kind: 'tags', category: '부작용', tags: ['식욕 저하'] },
];

function getNow(): string {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

export default function JournalTimelinePage() {
  const [entries, setEntries] = useState<TimelineEntry[]>(initialEntries);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [draftTag, setDraftTag] = useState('');
  const [memo, setMemo] = useState('');
  const [memoSaved, setMemoSaved] = useState(true);
  const [memoFocused, setMemoFocused] = useState(false);

  const toggleEditing = (entryId: string) => {
    setEditingEntryId(prev => {
      setIsAddingTag(false);
      setDraftTag('');
      return prev === entryId ? null : entryId;
    });
  };

  const removeTag = (entryId: string, tag: string) => {
    setEntries(prev =>
      prev
        .map(entry => {
          if (entry.id !== entryId || entry.kind !== 'tags') return entry;
          return { ...entry, tags: entry.tags.filter(t => t !== tag) };
        })
        .filter(entry => entry.kind !== 'tags' || (entry as TagEntry).tags.length > 0)
    );
  };

  const handleAddTag = (entryId: string) => {
    const trimmed = draftTag.trim();
    if (!trimmed) return;
    setEntries(prev =>
      prev.map(entry => {
        if (entry.id !== entryId || entry.kind !== 'tags') return entry;
        if ((entry as TagEntry).tags.includes(trimmed)) return entry;
        return { ...entry, tags: [...(entry as TagEntry).tags, trimmed] };
      })
    );
    setDraftTag('');
    setIsAddingTag(false);
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

  const handleRecord = () => {
    if (!activeCategory || selectedTags.size === 0) return;
    setEntries(prev => [
      ...prev,
      {
        id: String(Date.now()),
        time: getNow(),
        kind: 'tags',
        category: activeCategory,
        tags: Array.from(selectedTags),
      },
    ]);
    closeSheet();
  };

  const config = activeCategory ? categoryConfig[activeCategory] : null;

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
          <div className="items-center flex justify-between">
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F5596f8f2c2f41bd0a4f5995e89c038339d171079.svg?generation=1778677415207876&alt=media" className="block size-full" />
                </div>
              </div>
            </div>
            <div className="font-bold text-sm">오늘 일지</div>
            <div className="w-11 h-11"></div>
          </div>
          <div className="text-center text-gray-600 text-xs">5월 13일 화 · 6번째 기록</div>
        </div>

        <ScrollArea className="pt-0">
          <div className="relative pt-0 pr-0 pb-0 pl-[18px]">
            <div className="absolute w-[2px] left-[6px] top-[6px] bottom-[30px] bg-purple-100"></div>

            {entries.map(entry => {
              if (entry.kind === 'medication' || entry.kind === 'meal') {
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
                          key={tag}
                          className={`items-center flex font-semibold whitespace-nowrap ${cfg.chipClass} text-xs gap-1 tracking-tight pt-[7px] ${isEditing ? 'pr-2' : 'pr-[11px]'} pb-[7px] pl-[11px] rounded-full`}
                        >
                          <span className="block">{tag}</span>
                          {isEditing && (
                            <button
                              type="button"
                              aria-label={`${tag} 삭제`}
                              onClick={() => removeTag(entry.id, tag)}
                              className="flex items-center justify-center w-4 h-4 rounded-full opacity-50"
                            >
                              <X className="w-3 h-3" strokeWidth={2.5} />
                            </button>
                          )}
                        </div>
                      ))}
                      {isEditing && (
                        isAddingTag ? (
                          <form
                            className="flex items-center gap-1"
                            onSubmit={e => { e.preventDefault(); handleAddTag(entry.id); }}
                          >
                            <input
                              autoFocus
                              value={draftTag}
                              onChange={e => setDraftTag(e.target.value)}
                              onBlur={() => { if (!draftTag.trim()) setIsAddingTag(false); }}
                              onKeyDown={e => { if (e.key === 'Escape') { setDraftTag(''); setIsAddingTag(false); } }}
                              placeholder="태그 이름"
                              className="h-8 w-24 bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 px-3 rounded-full outline-none text-xs"
                            />
                            <button
                              type="submit"
                              disabled={!draftTag.trim()}
                              className="flex items-center justify-center w-8 h-8 bg-[rgb(31,27,46)] disabled:bg-gray-200 rounded-full"
                            >
                              <Check className="w-3 h-3 text-white" strokeWidth={2.8} />
                            </button>
                          </form>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setIsAddingTag(true)}
                            className="flex items-center gap-1 text-xs font-medium whitespace-nowrap border border-dashed border-gray-300 text-gray-400 pt-[7px] pb-[7px] pl-[10px] pr-[12px] rounded-full"
                          >
                            <Plus className="w-3 h-3" strokeWidth={2.5} />
                            <span>추가</span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`mt-1 bg-white border shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl transition-colors ${memoFocused ? 'border-purple-300' : 'border-transparent'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-500 text-xs">메모</span>
              {!memoSaved && (
                <button
                  type="button"
                  onClick={() => setMemoSaved(true)}
                  className="text-xs px-2.5 py-1 rounded-lg font-bold text-white bg-[rgb(31,27,46)]"
                >
                  저장
                </button>
              )}
            </div>
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
        </ScrollArea>

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
              {config.tags.map(tag => {
                const isSelected = selectedTags.has(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`flex items-center gap-1.5 font-semibold text-sm whitespace-nowrap border pt-[10px] pb-[10px] pl-[14px] pr-[14px] rounded-full transition-colors ${
                      isSelected
                        ? config.sheetChipSelected
                        : 'bg-gray-100 border-transparent text-gray-600'
                    }`}
                  >
                    {isSelected && <Check className="w-[10px] h-[10px] shrink-0" strokeWidth={3} />}
                    <span>{tag}</span>
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

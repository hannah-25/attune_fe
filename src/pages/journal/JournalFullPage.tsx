import React, { useState } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { TabBar } from '@/components/TabBar';

type Tone = 'purple' | 'orange' | 'blue';
type Tag = { label: string; selected?: boolean };
type Section = {
  title: string;
  tone: Tone;
  tags: Tag[];
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

const initialSections: Section[] = [
  {
    title: '감정 · 증상',
    tone: 'purple',
    tags: [
      { label: '집중 어려움', selected: true },
      { label: '멍해짐', selected: true },
      { label: '짜증' },
      { label: '불안', selected: true },
      { label: '무기력' },
      { label: '초조' },
      { label: '몰입' },
    ],
  },
  {
    title: '부작용',
    tone: 'orange',
    tags: [
      { label: '두통' },
      { label: '식욕 저하', selected: true },
      { label: '불면' },
      { label: '입마름' },
      { label: '두근거림' },
    ],
  },
  {
    title: '업무 실수 · 불편',
    tone: 'blue',
    tags: [
      { label: '마감 놓침', selected: true },
      { label: '약속 잊음' },
      { label: '물건 잃어버림' },
      { label: '일을 잘게 못 쪼갬', selected: true },
    ],
  },
];

const initialGoals = [
  { label: '한 가지 일에 30분 집중하기', value: 7 },
  { label: '해야 할 일을 10분 안에 시작하기', value: 6 },
  { label: '약속/일정 10분 전에 준비 완료하기', value: 8 },
];

function EditableTagChip({
  label,
  selected,
  tone,
  editing,
  onToggle,
  onDelete,
}: Tag & {
  tone: Tone;
  editing: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const styles = toneStyles[tone];

  return (
    <div
      role="group"
      aria-label={label}
      className={`items-center flex font-semibold whitespace-nowrap border gap-1.5 pt-[10px] pb-[10px] pl-[14px] rounded-full ${
        selected ? styles.selected : styles.unselected
      } ${editing ? 'pr-2.5' : 'pr-[14px]'}`}
    >
      <button type="button" aria-pressed={Boolean(selected)} onClick={onToggle} className="items-center flex gap-1.5">
        {selected ? <Check className="w-[10px] h-[10px] shrink-0" strokeWidth={3} /> : null}
        <span className="block">{label}</span>
      </button>
      {editing ? (
        <button
          type="button"
          aria-label={`${label} 삭제`}
          onClick={onDelete}
          className="items-center flex justify-center -mr-1 w-5 h-5 rounded-full"
        >
          <X className="w-3.5 h-3.5 shrink-0 opacity-70" strokeWidth={2.4} />
        </button>
      ) : null}
    </div>
  );
}

function TagSection({
  title,
  tone,
  tags,
  editing,
  onToggleTag,
  onDeleteTag,
  onAddTag,
  onToggleEditing,
}: Section & {
  editing: boolean;
  onToggleTag: (label: string) => void;
  onDeleteTag: (label: string) => void;
  onAddTag: (label: string) => void;
  onToggleEditing: () => void;
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
        <div className="grow basis-[0%]"></div>
        <button
          type="button"
          onClick={onToggleEditing}
          className="font-bold text-purple-600 text-xs pt-1 pr-2.5 pb-1 pl-2.5 rounded-full"
        >
          {editing ? '완료' : '편집'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <EditableTagChip
            key={tag.label}
            tone={tone}
            editing={editing}
            onToggle={() => onToggleTag(tag.label)}
            onDelete={() => onDeleteTag(tag.label)}
            {...tag}
          />
        ))}
        {isAdding ? (
          <form
            className="flex items-center gap-1"
            onSubmit={(e) => { e.preventDefault(); handleAdd(); }}
          >
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => { if (!draft.trim()) setIsAdding(false); }}
              onKeyDown={(e) => { if (e.key === 'Escape') { setDraft(''); setIsAdding(false); } }}
              placeholder="태그 이름"
              className="h-9 w-28 bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 px-3 rounded-full outline-none text-sm"
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
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const percent = `${value * 10}%`;

  return (
    <div>
      <div className="items-center flex mb-[10px] gap-2">
        <div className="font-semibold text-gray-800 grow basis-[0%]">{label}</div>
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
              onChange={(event) => onChange(Number(event.target.value))}
              className="absolute inset-0 z-10 w-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JournalFullPage() {
  const [sections, setSections] = useState(initialSections);
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({});
  const [goals, setGoals] = useState(initialGoals);
  const [memo, setMemo] = useState("점심 이후 집중이 흐려졌고, 일을 잘게 나누면 다시 시작하기 쉬웠다.");
  const [memoSaved, setMemoSaved] = useState(true);
  const [memoFocused, setMemoFocused] = useState(false);

  const toggleTag = (sectionTitle: string, label: string) => {
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
  };

  const deleteTag = (sectionTitle: string, label: string) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.title === sectionTitle
          ? {
              ...section,
              tags: section.tags.filter((tag) => tag.label !== label),
            }
          : section,
      ),
    );
  };

  const addTag = (sectionTitle: string, label: string) => {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.title === sectionTitle && !section.tags.some((tag) => tag.label === label)
          ? { ...section, tags: [...section.tags, { label, selected: true }] }
          : section,
      ),
    );
  };

  const toggleSectionEditing = (sectionTitle: string) => {
    setEditingSections((current) => ({ ...current, [sectionTitle]: !current[sectionTitle] }));
  };

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
                <img
                  src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F2a388ad72a45fea2c1c099f07fd840545826255d.svg?generation=1778677414809859&alt=media"
                  className="block w-4 h-4"
                />
              </div>
            </div>
            <div className="font-bold text-sm">5월 13일 화</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <img
                  src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fff088739f488f0ef39daa144b05d6bab96fcf844.svg?generation=1778677414809807&alt=media"
                  className="block w-4 h-4"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-10 pt-2 pr-4 pb-[104px] pl-4">
          <section>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3.5 rounded-[1.125rem]">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm">🌙</span>
                  <div className="font-semibold text-xs text-gray-600">수면</div>
                </div>
                <div className="font-bold text-lg" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                  6.5시간
                </div>
                <div className="flex mt-[6px] gap-[2px]">
                  <div className="grow h-1 bg-purple-200 basis-[0%] rounded-xs"></div>
                  <div className="grow h-1 bg-purple-200 basis-[0%] rounded-xs"></div>
                  <div className="grow h-1 bg-purple-200 basis-[0%] rounded-xs"></div>
                  <div className="grow h-1 bg-gray-100 basis-[0%] rounded-xs"></div>
                  <div className="grow h-1 bg-gray-100 basis-[0%] rounded-xs"></div>
                </div>
              </div>
              <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3.5 rounded-[1.125rem]">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm">🍽️</span>
                  <div className="font-semibold text-xs text-gray-600">식사</div>
                </div>
                <div className="flex mt-[6px] gap-1.5">
                  <div className="items-center flex font-bold justify-center w-7 h-7 bg-purple-100 text-purple-800 rounded-[0.875rem]">아</div>
                  <div className="items-center flex font-bold justify-center w-7 h-7 bg-purple-100 text-purple-800 rounded-[0.875rem]">점</div>
                  <div className="items-center flex font-bold justify-center w-7 h-7 bg-gray-100 text-gray-600 rounded-[0.875rem]">저</div>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-5">
            {sections.map((section) => (
              <TagSection
                key={section.title}
                editing={Boolean(editingSections[section.title])}
                onToggleTag={(label) => toggleTag(section.title, label)}
                onDeleteTag={(label) => deleteTag(section.title, label)}
                onAddTag={(label) => addTag(section.title, label)}
                onToggleEditing={() => toggleSectionEditing(section.title)}
                {...section}
              />
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <section>
            <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-2xl">
              <div className="font-bold text-sm mb-4">오늘의 목표</div>
              <div className="flex flex-col gap-4">
                {goals.map((goal) => (
                  <GoalSlider
                    key={goal.label}
                    {...goal}
                    onChange={(value) =>
                      setGoals((currentGoals) =>
                        currentGoals.map((currentGoal) =>
                          currentGoal.label === goal.label ? { ...currentGoal, value } : currentGoal,
                        ),
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </section>

            <div className={`bg-white border shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-2xl transition-colors ${memoFocused ? 'border-purple-500' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-gray-800">메모</div>
                {!memoSaved && (
                  <button
                    onClick={() => setMemoSaved(true)}
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
                className="w-full text-sm text-gray-700 leading-relaxed resize-none outline-none placeholder:text-gray-300"
              />
            </div>
          </div>
        </div>

        <TabBar active="일지" />
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

const CATEGORIES = ['감정·증상', '부작용', '업무', '목표'];

const INITIAL_TAGS = [
  { id: 'focus', label: '집중 어려움', count: '3회', active: true },
  { id: 'blank', label: '멍해짐', count: '3회', active: true },
  { id: 'irritation', label: '짜증', count: '3회', active: true },
  { id: 'anxiety', label: '불안', count: '3회', active: true },
  { id: 'lethargy', label: '무기력', count: '3회', active: true },
  { id: 'headache', label: '두근거림', active: false },
  { id: 'sleepy', label: '졸림', active: false },
];

export default function JournalTagsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [activeTags, setActiveTags] = useState<Set<string>>(
    () => new Set(INITIAL_TAGS.filter((tag) => tag.active).map((tag) => tag.id)),
  );

  const toggleTag = (tagId: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);

      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }

      return next;
    });
  };

  const activeItems = INITIAL_TAGS.filter((tag) => activeTags.has(tag.id));
  const inactiveItems = INITIAL_TAGS.filter((tag) => !activeTags.has(tag.id));

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="relative flex flex-col flex-1 min-h-0">
        <TopBar
          title="태그 관리"
          left={
            <HeaderIconButton
              icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />}
              onClick={() => navigate(-1)}
            />
          }
          right={
            <div className="items-center flex justify-center w-11 h-11">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]"
              >
                <span className="font-bold text-purple-500">완료</span>
              </button>
            </div>
          }
        />
        <ScrollArea className="pt-0">
          <div className="flex gap-1 pt-1 pr-0 pb-3 pl-0">
            {CATEGORIES.map((category) => {
              const selected = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`grow text-center basis-[0%] pt-2 pr-0 pb-2 pl-0 rounded-[0.875rem] transition-colors ${
                    selected
                      ? 'font-bold text-purple-700 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px]'
                      : 'font-medium text-gray-400'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <TagSection title={`활성 (${activeItems.length})`} tags={activeItems} active onToggle={toggleTag} />
          <TagSection title={`비활성 (${inactiveItems.length})`} tags={inactiveItems} active={false} onToggle={toggleTag} />
        </ScrollArea>
        <button
          type="button"
          className="items-center flex font-bold absolute h-[50px] right-4 bottom-[92px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.18)_0px_8px_22px_0px] text-white text-sm gap-1.5 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.5625rem] transition-all active:scale-[0.97]"
        >
          <Plus className="h-[14px] w-[14px]" strokeWidth={2.5} />
          <span className="block">새 태그</span>
        </button>
        <TabBar active="일지" />
      </div>
    </div>
  );
}

type Tag = {
  count?: string;
  id: string;
  label: string;
};

function TagSection({
  active,
  onToggle,
  tags,
  title,
}: {
  active: boolean;
  onToggle: (tagId: string) => void;
  tags: Tag[];
  title: string;
}) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <>
      <div className="font-bold text-gray-800 text-xs pt-4 first:pt-1 pr-1 pb-1.5 pl-1">
        {title}
      </div>
      <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
        {tags.map((tag, index) => (
          <div
            key={tag.id}
            className={`items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 ${
              !active ? 'opacity-[0.6]' : ''
            } ${index < tags.length - 1 ? 'border-b' : ''}`}
            style={{ borderBottomColor: 'rgb(233, 228, 220)' }}
          >
            <div className={`w-[10px] h-[10px] rounded-[0.3125rem] ${active ? 'bg-purple-500' : 'bg-[rgb(208,201,189)]'}`} />
            <div className="grow basis-[0%]">{tag.label}</div>
            {tag.count ? <div className="text-gray-600 text-xs">{tag.count}</div> : null}
            <button
              type="button"
              onClick={() => onToggle(tag.id)}
              className={`font-bold ${active ? 'text-gray-500' : 'text-purple-500'}`}
            >
              {active ? '비활성' : '활성'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

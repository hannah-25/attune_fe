import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import {
  createConditionTag,
  createSideEffectTag,
  createTroubleTag,
  deleteConditionTag,
  deleteSideEffectTag,
  deleteTroubleTag,
  getConditionTags,
  getSideEffectTags,
  getTroubleTags,
  ConditionType,
  TroubleType,
} from '@/api/journal';

type Category = '감정·증상' | '부작용' | '업무';
const CATEGORIES: Category[] = ['감정·증상', '부작용', '업무'];
const CONDITION_TYPES: ConditionType[] = ['UP', 'DOWN', 'TIGHT', 'FOGGY', 'CALM'];
const TROUBLE_TYPES: TroubleType[] = ['INATTENTION', 'HYPERACTIVITY', 'IMPULSIVITY', 'TIME_MANAGEMENT', 'COGNITIVE_ERROR'];
const CONDITION_TYPE_HELP = [
  'UP: 활력 (고각성)',
  'DOWN: 무기력 (저각성)',
  'TIGHT: 과긴장 (불안)',
  'FOGGY: 멍함',
  'CALM: 평온',
].join('\n');

export default function JournalTagsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState('');
  const journalDate = useMemo(() => toDateKey(new Date()), []);

  useEffect(() => {
    void loadTags(activeCategory);
  }, [activeCategory]);

  const loadTags = async (category: Category) => {
    setError('');
    try {
      if (category === '감정·증상') {
        const response = await getConditionTags();
        setTags(response.map((tag) => ({ id: String(tag.tagId), label: tag.condition, source: 'condition' })));
      } else if (category === '부작용') {
        const response = await getSideEffectTags();
        setTags(response.map((tag) => ({ id: String(tag.tagId), label: tag.sideEffect, source: 'sideEffect' })));
      } else {
        const response = await getTroubleTags();
        setTags(response.map((tag) => ({ id: String(tag.tagId), label: tag.trouble, source: 'trouble' })));
      }
    } catch {
      setError('태그를 불러오지 못했습니다.');
    }
  };

  const addTag = async () => {
    const label = window.prompt('새 태그 이름을 입력해주세요.');
    const trimmedLabel = label?.trim();
    if (!trimmedLabel) return;

    setError('');
    try {
      if (activeCategory === '감정·증상') {
        const selectedType = window.prompt(
          `감정/증상 유형을 입력해주세요.\n${CONDITION_TYPE_HELP}`,
          'CALM',
        ) as ConditionType | null;
        await createConditionTag({
          condition: trimmedLabel,
          conditionType: selectedType && CONDITION_TYPES.includes(selectedType) ? selectedType : 'CALM',
          journalDate,
        });
      } else if (activeCategory === '부작용') {
        await createSideEffectTag({ sideEffect: trimmedLabel, journalDate });
      } else {
        const selectedType = window.prompt(
          `업무 실수 유형을 입력해주세요.\n${TROUBLE_TYPES.join(', ')}`,
          'COGNITIVE_ERROR',
        ) as TroubleType | null;
        await createTroubleTag({
          trouble: trimmedLabel,
          type: selectedType && TROUBLE_TYPES.includes(selectedType) ? selectedType : 'COGNITIVE_ERROR',
          journalDate,
        });
      }
      await loadTags(activeCategory);
    } catch {
      setError('태그를 추가하지 못했습니다.');
    }
  };

  const deleteTag = async (tag: Tag) => {
    setError('');
    try {
      const tagId = Number(tag.id);
      if (tag.source === 'condition') {
        await deleteConditionTag(tagId, journalDate);
      } else if (tag.source === 'sideEffect') {
        await deleteSideEffectTag(tagId, journalDate);
      } else {
        await deleteTroubleTag(tagId, journalDate);
      }
      setTags((currentTags) => currentTags.filter((item) => item.id !== tag.id));
    } catch {
      setError('태그를 삭제하지 못했습니다.');
    }
  };

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
          {error ? <div className="text-red-500 text-xs px-1 pb-2">{error}</div> : null}
          <TagSection title={`활성 (${tags.length})`} tags={tags} active onToggle={deleteTag} />
        </ScrollArea>
        <button
          type="button"
          onClick={addTag}
          className="items-center flex font-bold absolute h-[44px] right-4 bottom-[92px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.18)_0px_8px_22px_0px] text-white text-sm gap-1.5 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.5625rem] transition-all active:scale-[0.97]"
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
  source: 'condition' | 'sideEffect' | 'trouble';
};

function TagSection({
  active,
  onToggle,
  tags,
  title,
}: {
  active: boolean;
  onToggle: (tag: Tag) => void;
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
              onClick={() => onToggle(tag)}
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

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

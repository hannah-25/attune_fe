import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import {
  createConditionTag,
  createSideEffectTag,
  createTroubleTag,
  getConditionTags,
  getSideEffectTags,
  getTroubleTags,
  ConditionType,
  TroubleType,
  toggleConditionTagVisible,
  toggleSideEffectTagVisible,
  toggleTroubleTagVisible,
} from '@/api/journal';

type Category = '감정·증상' | '부작용' | '업무';
const CATEGORIES: Category[] = ['감정·증상', '부작용', '업무'];
const CONDITION_TYPES: ConditionType[] = ['UP', 'DOWN', 'TIGHT', 'FOGGY', 'CALM'];
const TROUBLE_TYPES: TroubleType[] = ['INATTENTION', 'HYPERACTIVITY', 'IMPULSIVITY', 'TIME_MANAGEMENT', 'COGNITIVE_ERROR'];
const CONDITION_TYPE_LABELS: Record<ConditionType, string> = {
  UP: '활력', DOWN: '무기력', TIGHT: '과긴장', FOGGY: '멍함', CALM: '평온', USER_INPUT: '직접 입력',
};
const TROUBLE_TYPE_LABELS: Record<TroubleType, string> = {
  INATTENTION: '부주의', HYPERACTIVITY: '과잉행동', IMPULSIVITY: '충동성',
  TIME_MANAGEMENT: '시간 관리', COGNITIVE_ERROR: '인지 오류', USER_INPUT: '직접 입력',
};

export default function JournalTagsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState('');
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newConditionType, setNewConditionType] = useState<ConditionType>('CALM');
  const [newTroubleType, setNewTroubleType] = useState<TroubleType>('COGNITIVE_ERROR');
  const [isSaving, setIsSaving] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const journalDate = useMemo(() => toDateKey(new Date()), []);
  const activeTags = tags.filter((tag) => tag.visible);
  const inactiveTags = tags.filter((tag) => !tag.visible);

  useEffect(() => {
    void loadTags(activeCategory);
  }, [activeCategory]);

  const loadTags = async (category: Category) => {
    setError('');
    try {
      if (category === '감정·증상') {
        const response = await getConditionTags();
        setTags(response.map((tag) => ({ id: String(tag.tagId), label: tag.condition, source: 'condition', visible: tag.visible })));
      } else if (category === '부작용') {
        const response = await getSideEffectTags();
        setTags(response.map((tag) => ({ id: String(tag.tagId), label: tag.sideEffect, source: 'sideEffect', visible: tag.visible })));
      } else {
        const response = await getTroubleTags();
        setTags(response.map((tag) => ({ id: String(tag.tagId), label: tag.trouble, source: 'trouble', visible: tag.visible })));
      }
    } catch (err) {
      console.error('Failed to load tags:', err);
      setError('태그를 불러오지 못했습니다.');
    }
  };

  const openAddSheet = () => {
    setNewTagName('');
    setNewConditionType('CALM');
    setNewTroubleType('COGNITIVE_ERROR');
    setAddSheetOpen(true);
    setTimeout(() => nameInputRef.current?.focus(), 50);
  };

  const submitAddTag = async () => {
    const trimmedLabel = newTagName.trim();
    if (!trimmedLabel || isSaving) return;
    setIsSaving(true);
    setError('');
    try {
      if (activeCategory === '감정·증상') {
        await createConditionTag({ condition: trimmedLabel, conditionType: newConditionType, journalDate });
      } else if (activeCategory === '부작용') {
        await createSideEffectTag({ sideEffect: trimmedLabel, journalDate });
      } else {
        await createTroubleTag({ trouble: trimmedLabel, type: newTroubleType, journalDate });
      }
      await loadTags(activeCategory);
      setAddSheetOpen(false);
    } catch (err) {
      console.error('Failed to add tag:', err);
      setError('태그를 추가하지 못했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTagVisibility = async (tag: Tag) => {
    setError('');
    setTags((currentTags) =>
      currentTags.map((item) => (item.id === tag.id ? { ...item, visible: !item.visible } : item)),
    );
    try {
      const tagId = Number(tag.id);
      if (tag.source === 'condition') {
        await toggleConditionTagVisible(tagId);
      } else if (tag.source === 'sideEffect') {
        await toggleSideEffectTagVisible(tagId);
      } else {
        await toggleTroubleTagVisible(tagId);
      }
    } catch (err) {
      console.error('Failed to toggle tag visibility:', err);
      setTags((currentTags) =>
        currentTags.map((item) => (item.id === tag.id ? { ...item, visible: tag.visible } : item)),
      );
      setError('태그 활성 상태를 바꾸지 못했습니다.');
    }
  };

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="relative flex flex-col flex-1 min-h-0">
        <TopBar
          title="태그 관리"
          left={<NavBackButton onClick={() => navigate(-1)} />}
          right={
            <div className="items-center flex justify-end min-w-11 h-11">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="items-center flex font-bold justify-center h-9 bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.06)_0px_3px_0px_0px] text-white text-xs tracking-tight px-3 rounded-xl whitespace-nowrap"
              >
                완료
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
          <TagSection title={`활성 (${activeTags.length})`} tags={activeTags} active onToggle={toggleTagVisibility} />
          <TagSection title={`비활성 (${inactiveTags.length})`} tags={inactiveTags} active={false} onToggle={toggleTagVisibility} />
        </ScrollArea>
        <button
          type="button"
          onClick={openAddSheet}
          className="items-center flex font-bold absolute h-[44px] right-4 bottom-[92px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.18)_0px_8px_22px_0px] text-white text-sm gap-1.5 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.5625rem] transition-all active:scale-[0.97]"
        >
          <Plus className="h-[14px] w-[14px]" strokeWidth={2.5} />
          <span className="block">새 태그</span>
        </button>
        <TabBar active="일지" />

        {/* 태그 추가 바텀시트 */}
        {addSheetOpen && (
          <div className="absolute inset-0 bg-black/30 flex items-end z-50" onClick={() => setAddSheetOpen(false)}>
            <div className="w-full bg-white rounded-t-3xl shadow-[rgba(0,0,0,0.18)_0px_-8px_24px_0px]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 pt-5 pb-4">
                <div className="font-bold text-base text-gray-800">새 태그</div>
                <button type="button" onClick={() => setAddSheetOpen(false)} className="w-8 h-8 flex items-center justify-center">
                  <X className="w-4 h-4 text-gray-500" strokeWidth={2.5} />
                </button>
              </div>
              <div className="px-5 pb-8 flex flex-col gap-4">
                <input
                  ref={nameInputRef}
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') void submitAddTag(); }}
                  placeholder="태그 이름"
                  className="w-full h-11 bg-gray-50 border border-gray-200 rounded-xl px-4 text-base outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                />
                {activeCategory === '감정·증상' && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 mb-2">유형</div>
                    <div className="flex flex-wrap gap-2">
                      {CONDITION_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setNewConditionType(type)}
                          className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${newConditionType === type ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                        >
                          {CONDITION_TYPE_LABELS[type]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {activeCategory === '업무' && (
                  <div>
                    <div className="text-xs font-semibold text-gray-500 mb-2">유형</div>
                    <div className="flex flex-wrap gap-2">
                      {TROUBLE_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setNewTroubleType(type)}
                          className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${newTroubleType === type ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                        >
                          {TROUBLE_TYPE_LABELS[type]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={submitAddTag}
                  disabled={!newTagName.trim() || isSaving}
                  className="w-full h-12 bg-[rgb(31,27,46)] text-white font-bold rounded-2xl disabled:opacity-40"
                >
                  {isSaving ? '추가 중...' : '추가하기'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type Tag = {
  count?: string;
  id: string;
  label: string;
  source: 'condition' | 'sideEffect' | 'trouble';
  visible: boolean;
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

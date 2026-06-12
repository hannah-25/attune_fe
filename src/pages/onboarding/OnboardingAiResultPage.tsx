import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { X, Plus, Pencil, Check } from 'lucide-react';
import { OnboardingTopBar } from '../../app/components/OnboardingTopBar';
import { submitOnboardingGoals, AiRecommendationResponse, AiTagItem, AiGoalItem, DailyGoalType } from '@/api/onboarding';

const GOAL_TYPE_LABELS: Record<DailyGoalType, string> = {
  WORK_STUDY: '업무/학업',
  TIME_MANAGEMENT: '시간관리',
  LIFE_MANAGEMENT: '생활관리',
  EMOTIONAL_SOCIAL: '정서/관계',
};

const GOAL_TYPE_COLORS: Record<DailyGoalType, string> = {
  WORK_STUDY: 'bg-blue-50 text-blue-700 border-blue-200',
  TIME_MANAGEMENT: 'bg-orange-50 text-orange-700 border-orange-200',
  LIFE_MANAGEMENT: 'bg-green-50 text-green-700 border-green-200',
  EMOTIONAL_SOCIAL: 'bg-rose-50 text-rose-700 border-rose-200',
};

const TAG_TYPE_LABELS: Record<string, string> = {
  FOCUS_COGNITION: '집중·인지',
  TIME_PLANNING: '시간·계획',
  EMOTION_IMPULSE: '감정·충동',
  SOCIAL_RELATION: '사회·관계',
  DAILY_SELF: '일상·자기관리',
};

const FALLBACK_GOALS: AiGoalItem[] = [
  { goal: '한 가지 일을 20분 이상 이어가기', type: 'WORK_STUDY' },
  { goal: '해야 할 일을 10분 안에 시작하기', type: 'TIME_MANAGEMENT' },
  { goal: '하루 5분 주변 정리하기', type: 'LIFE_MANAGEMENT' },
];

export default function OnboardingAiResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { aiResult: AiRecommendationResponse | null; error?: boolean } | null;

  const aiResult = state?.aiResult ?? null;
  const hasError = state?.error ?? false;

  const [tagVisibility, setTagVisibility] = useState<Record<number, boolean>>(() => {
    if (!aiResult) return {};
    return Object.fromEntries(aiResult.tags.map((t: AiTagItem) => [t.id, t.recommended]));
  });

  const [goals, setGoals] = useState<AiGoalItem[]>(() => aiResult?.goals ?? FALLBACK_GOALS);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalType, setNewGoalType] = useState<DailyGoalType | null>(null);
  const [showNewGoalInput, setShowNewGoalInput] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const groupedTags = React.useMemo(() => {
    if (!aiResult) return {} as Record<string, AiTagItem[]>;
    const groups: Record<string, AiTagItem[]> = {};
    for (const tag of aiResult.tags) {
      if (!groups[tag.type]) groups[tag.type] = [];
      groups[tag.type].push(tag);
    }
    return groups;
  }, [aiResult]);

  const toggleTag = (id: number) => {
    setTagVisibility((prev: Record<number, boolean>) => ({ ...prev, [id]: !prev[id] }));
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditText(goals[index].goal);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const trimmed = editText.trim();
    if (!trimmed) return;
    setGoals((prev: AiGoalItem[]) =>
      prev.map((g: AiGoalItem, i: number) => (i === editingIndex ? { ...g, goal: trimmed } : g))
    );
    setEditingIndex(null);
  };

  const removeGoal = (index: number) => {
    setGoals((prev: AiGoalItem[]) => prev.filter((_: AiGoalItem, i: number) => i !== index));
  };

  const addNewGoal = () => {
    const trimmed = newGoalText.trim();
    if (!trimmed || !newGoalType) return;
    setGoals((prev: AiGoalItem[]) => [...prev, { goal: trimmed, type: newGoalType }]);
    setNewGoalText('');
    setNewGoalType(null);
    setShowNewGoalInput(false);
  };

  const goNext = async () => {
    if (goals.length === 0) {
      setError('목표를 최소 1개 이상 선택해주세요.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      const visibleTagIds = Object.entries(tagVisibility)
        .filter(([, visible]) => visible)
        .map(([id]) => Number(id));
      await submitOnboardingGoals({ goals, visibleTagIds });
      navigate('/onboarding/5');
    } catch (err) {
      console.error('Failed to save goals:', err);
      setError('저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <OnboardingTopBar
          title="AI 추천 결과"
          description="태그와 목표를 확인해요"
          progressClassName="w-[90%] bg-purple-500"
          step={4}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] px-5 pt-4 pb-4 gap-5">
          {hasError && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-700 text-xs leading-relaxed">
              AI 분석에 실패했어요. 기본 목표를 준비했어요. 직접 수정하거나 추가할 수 있어요.
            </div>
          )}

          {aiResult && aiResult.tags.length > 0 && (
            <div>
              <div className="font-bold text-gray-800 text-sm mb-1">나의 트러블 태그</div>
              <div className="text-gray-400 text-xs mb-3">AI가 관련 있다고 판단한 태그예요. 켜두면 일지 작성 시 표시돼요.</div>
              <div className="flex flex-col gap-3">
                {(Object.entries(groupedTags) as [string, AiTagItem[]][]).map(([type, tags]) => (
                  <div key={type}>
                    <div className="text-gray-500 text-[11px] font-semibold mb-1.5">
                      {TAG_TYPE_LABELS[type] ?? type}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag: AiTagItem) => {
                        const visible = tagVisibility[tag.id] ?? false;
                        return (
                          <button
                            key={tag.id}
                            type="button"
                            onClick={() => toggleTag(tag.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all active:scale-[0.96] ${
                              visible
                                ? 'bg-purple-500 text-white border-purple-500 shadow-sm'
                                : 'bg-white text-gray-500 border-gray-300'
                            }`}
                          >
                            {tag.trouble}
                            {visible
                              ? <Check className="w-3 h-3" strokeWidth={3} />
                              : <Plus className="w-3 h-3 text-gray-400" strokeWidth={2.5} />
                            }
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="font-bold text-gray-800 text-sm mb-1">치료 목표</div>
            <div className="text-gray-400 text-xs mb-3">AI가 추천한 목표예요. 수정하거나 직접 추가할 수 있어요.</div>
            <div className="flex flex-col gap-2">
              {goals.map((goal: AiGoalItem, index: number) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-2 shadow-sm"
                >
                  <div className="flex-1 min-w-0">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === 'Enter') saveEdit();
                          else if (e.key === 'Escape') setEditingIndex(null);
                        }}
                        autoFocus
                        className="w-full text-sm text-gray-800 bg-transparent outline-none border-b border-purple-300"
                      />
                    ) : (
                      <div className="text-sm text-gray-800 leading-snug">{goal.goal}</div>
                    )}
                    <span className={`inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${GOAL_TYPE_COLORS[goal.type]}`}>
                      {GOAL_TYPE_LABELS[goal.type]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 mt-0.5">
                    {editingIndex === index ? (
                      <button
                        type="button"
                        onClick={saveEdit}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600 active:scale-95"
                      >
                        <Check className="w-4 h-4" strokeWidth={2.5} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startEdit(index)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 active:scale-95"
                      >
                        <Pencil className="w-3.5 h-3.5" strokeWidth={2} />
                      </button>
                    )}
                    {goals.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGoal(index)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 active:scale-95"
                      >
                        <X className="w-4 h-4" strokeWidth={2.5} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {showNewGoalInput ? (
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGoalText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGoalText(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') addNewGoal(); }}
                    autoFocus
                    placeholder="목표를 입력해 주세요"
                    className="flex-1 h-10 rounded-xl border border-purple-300 bg-white px-3 text-sm outline-none"
                  />
                  <button type="button" onClick={addNewGoal} disabled={!newGoalText.trim() || !newGoalType} className="h-10 px-3 rounded-xl bg-purple-500 text-white text-xs font-bold disabled:opacity-40">
                    추가
                  </button>
                  <button type="button" onClick={() => setShowNewGoalInput(false)} className="h-10 px-3 rounded-xl bg-gray-100 text-gray-500 text-xs font-bold">
                    취소
                  </button>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {(Object.entries(GOAL_TYPE_LABELS) as [DailyGoalType, string][]).map(([type, label]) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewGoalType(type)}
                      className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold transition-all active:scale-95 ${
                        newGoalType === type ? GOAL_TYPE_COLORS[type] : 'bg-white text-gray-400 border-gray-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowNewGoalInput(true)}
                className="mt-2 w-full flex items-center justify-center gap-1.5 h-10 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 text-xs font-semibold hover:border-gray-400 active:scale-[0.98] transition-all"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                목표 직접 추가
              </button>
            )}
          </div>

          <div className="grow basis-[0%]" />
          {error ? <div className="text-red-500 text-xs text-center">{error}</div> : null}
          <button
            type="button"
            onClick={goNext}
            disabled={goals.length === 0 || isSubmitting}
            className="items-center flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 rounded-xl select-none transition-all active:scale-[0.97] disabled:opacity-40"
          >
            <span className="block">{isSubmitting ? '저장 중...' : '저장하고 시작하기'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

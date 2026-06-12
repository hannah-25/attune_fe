import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { OnboardingTopBar } from '../../app/components/OnboardingTopBar';
import { submitOnboardingSymptoms, DailyGoalType } from '@/api/onboarding';

const SYMPTOM_TYPES = [
  { id: 'INATTENTION', label: '부주의', desc: '집중 유지, 실수, 잊어버림' },
  { id: 'HYPERACTIVITY', label: '과잉행동·충동성', desc: '안절부절, 충동적 행동, 말 끊기' },
];

const FUNCTIONAL_AREAS: { id: DailyGoalType; label: string; icon: string; desc: string }[] = [
  { id: 'WORK_STUDY', label: '업무 / 학업', icon: '💼', desc: '과제 완수, 집중, 마감 관리' },
  { id: 'TIME_MANAGEMENT', label: '시간 관리', icon: '⏰', desc: '약속, 지각, 계획 수립' },
  { id: 'LIFE_MANAGEMENT', label: '일상 생활', icon: '🏠', desc: '정리정돈, 루틴, 자기관리' },
  { id: 'EMOTIONAL_SOCIAL', label: '정서 / 관계', icon: '💬', desc: '감정 조절, 대인관계, 소통' },
];

export default function OnboardingQuickPage() {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [selectedAreas, setSelectedAreas] = useState<Set<DailyGoalType>>(new Set());
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggle = <T extends string>(set: Set<T>, id: T): Set<T> => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };

  const canProceed = selectedSymptoms.size > 0 && selectedAreas.size > 0;

  const goNext = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await submitOnboardingSymptoms({
        isQuickOnboarding: true,
        selectedSymptomTypes: Array.from(selectedSymptoms),
        selectedFunctionalAreas: Array.from(selectedAreas),
      });
      navigate('/onboarding/ai-loading');
    } catch (err) {
      console.error('Failed to submit quick onboarding:', err);
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
          title="빠른 온보딩"
          description="취약한 영역을 선택해 주세요"
          progressClassName="w-[50%] bg-blue-400"
          step={2}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] px-5 pt-5 pb-4 gap-5">
          {/* 증상 유형 */}
          <div>
            <div className="font-bold text-gray-700 text-sm mb-2">주요 증상 유형 <span className="text-gray-400 font-normal">(복수 선택)</span></div>
            <div className="flex flex-col gap-2">
              {SYMPTOM_TYPES.map((s) => {
                const selected = selectedSymptoms.has(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSymptoms(toggle(selectedSymptoms, s.id))}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all active:scale-[0.98] ${
                      selected
                        ? 'border-purple-400 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      selected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                    }`}>
                      {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div className="text-left">
                      <div className={`font-bold text-sm ${selected ? 'text-purple-700' : 'text-gray-800'}`}>{s.label}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{s.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 기능 영역 */}
          <div>
            <div className="font-bold text-gray-700 text-sm mb-2">취약한 기능 영역 <span className="text-gray-400 font-normal">(복수 선택)</span></div>
            <div className="grid grid-cols-2 gap-2">
              {FUNCTIONAL_AREAS.map((a) => {
                const selected = selectedAreas.has(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedAreas(toggle(selectedAreas, a.id))}
                    className={`flex flex-col items-start p-3.5 rounded-xl border-2 transition-all active:scale-[0.97] ${
                      selected
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-lg">{a.icon}</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <div className={`font-bold text-xs leading-tight ${selected ? 'text-blue-700' : 'text-gray-800'}`}>{a.label}</div>
                    <div className="text-gray-400 text-[10px] mt-0.5 leading-tight">{a.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grow basis-[0%]" />
          {error ? <div className="text-red-500 text-xs text-center">{error}</div> : null}
          <button
            type="button"
            onClick={goNext}
            disabled={!canProceed || isSubmitting}
            className="items-center flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 rounded-xl select-none transition-all active:scale-[0.97] disabled:opacity-40"
          >
            <span className="block">{isSubmitting ? '저장 중...' : 'AI 분석 시작'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

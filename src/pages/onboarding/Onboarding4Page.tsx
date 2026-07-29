import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { OnboardingTopBar } from '../../app/components/OnboardingTopBar';
import { submitAsrs } from '@/api/onboarding';

const INATTENTION_QUESTIONS = [
  { id: 1, text: '일을 마무리하는 데 어려움이 있나요? (특히 지루하거나 어려운 마지막 단계에서)' },
  { id: 2, text: '체계적인 정리가 필요한 일을 할 때 어려움을 겪나요?' },
  { id: 3, text: '약속이나 해야 할 일을 잊어버리는 경우가 얼마나 자주 있나요?' },
  { id: 4, text: '오래 생각해야 하는 일을 시작하는 것을 미루거나 피하나요?' },
  { id: 5, text: '오래 앉아 있어야 할 때 손발을 꼼지락거리거나 자꾸 움직이게 되나요?' },
  { id: 6, text: '무언가에 쫓기듯 과도하게 활동적인 느낌이 드나요?' },
  { id: 7, text: '지루하거나 어려운 업무에서 부주의한 실수를 하나요?' },
  { id: 8, text: '지루하거나 어려운 일을 할 때 집중하기가 어렵나요?' },
  { id: 9, text: '직접 말을 걸어도 집중하지 못하는 경우가 있나요?' },
];

const HYPERACTIVITY_QUESTIONS = [
  { id: 10, text: '집이나 직장에서 물건을 엉뚱한 곳에 두거나 잃어버리는 경우가 있나요?' },
  { id: 11, text: '외부 자극에 주의가 쉽게 분산되나요?' },
  { id: 12, text: '회의나 자리에서 이유 없이 자리를 뜨는 경우가 있나요?' },
  { id: 13, text: '가만히 있어야 할 때 몸을 움직이거나 안절부절못하나요?' },
  { id: 14, text: '여가시간에 조용히 쉬거나 취미활동을 즐기기 어렵나요?' },
  { id: 15, text: '사회적 상황에서 지나치게 말을 많이 하나요?' },
  { id: 16, text: '다른 사람이 말하는 도중에 끼어드는 경우가 있나요?' },
  { id: 17, text: '자신의 차례를 기다리기 어렵나요?' },
  { id: 18, text: '다른 사람이 바쁠 때 방해하거나 끼어드는 경우가 있나요?' },
];

const ALL_QUESTIONS = [...INATTENTION_QUESTIONS, ...HYPERACTIVITY_QUESTIONS];


function ScoreSelector({
  questionId,
  answers,
  setAnswers,
}: {
  questionId: number;
  answers: Record<number, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}) {
  const selected = answers[questionId];

  return (
    <div className="mt-3 space-y-1">
      <div className="flex gap-2 w-full">
        {[0, 1, 2, 3, 4].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setAnswers((prev: Record<number, number>) => ({ ...prev, [questionId]: val }))}
            className={`flex-1 h-11 flex items-center justify-center rounded-xl transition-all select-none active:scale-[0.95] ${
              selected === val
                ? 'bg-purple-100 border border-[rgb(185,166,255)] text-purple-800'
                : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
            }`}
          >
            <span className="text-base font-bold">{val}</span>
          </button>
        ))}
      </div>
      <div className="flex justify-between w-full text-[10px] text-gray-500 px-1.5">
        <span>전혀</span>
        <span>매우 자주</span>
      </div>
    </div>
  );
}

export default function Onboarding4Page() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === ALL_QUESTIONS.length;

  const goNext = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await submitAsrs(
        ALL_QUESTIONS.map((q) => ({
          questionId: q.id,
          score: answers[q.id] ?? 0,
        }))
      );
      navigate('/onboarding/ai-loading');
    } catch (err) {
      console.error('Failed to submit ASRS:', err);
      setError('자가 체크 결과를 저장하지 못했습니다.');
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
          title="ASRS 자가 체크"
          description={`${answeredCount} / ${ALL_QUESTIONS.length}문항 완료`}
          progressClassName="w-[70%] bg-purple-400"
          step={3}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-4 px-5 pb-4">
          <div className="bg-purple-50 border border-purple-100 rounded-xl px-3 py-2">
            <div className="font-bold text-purple-700 text-xs">부주의 (Q1-9)</div>
          </div>
          {INATTENTION_QUESTIONS.map((q) => (
            <div key={q.id} className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] p-3 rounded-xl">
              <div className="font-medium text-sm leading-snug">
                <span className="font-bold text-purple-400 mr-1.5">Q{q.id}</span>
                {q.text}
              </div>
              <ScoreSelector questionId={q.id} answers={answers} setAnswers={setAnswers} />
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 mt-2">
            <div className="font-bold text-blue-700 text-xs">과잉행동·충동성 (Q10-18)</div>
          </div>
          {HYPERACTIVITY_QUESTIONS.map((q) => (
            <div key={q.id} className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] p-3 rounded-xl">
              <div className="font-medium text-sm leading-snug">
                <span className="font-bold text-blue-400 mr-1.5">Q{q.id}</span>
                {q.text}
              </div>
              <ScoreSelector questionId={q.id} answers={answers} setAnswers={setAnswers} />
            </div>
          ))}

          <div className="bg-gray-100 border border-gray-200 p-2.5 rounded-xl">
            <div className="text-gray-500 text-xs leading-normal">
              본 검사는 선별 도구이며 실제 진단과 다를 수 있습니다. 정확한 진단은 전문가와 상담해 주세요.
            </div>
          </div>
        </div>
        <div className="px-5 pb-4 pt-2">
          {!allAnswered && (
            <div className="text-center text-gray-400 text-xs mb-2">
              모든 문항에 답해주세요 ({ALL_QUESTIONS.length - answeredCount}개 남음)
            </div>
          )}
          {error ? <div className="text-red-500 text-xs text-center mb-2">{error}</div> : null}
          <button
            type="button"
            onClick={goNext}
            disabled={!allAnswered || isSubmitting}
            className="items-center flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 rounded-xl select-none transition-all active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100"
          >
            <span className="block">{isSubmitting ? '저장 중...' : 'AI 분석 시작'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

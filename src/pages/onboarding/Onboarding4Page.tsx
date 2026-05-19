import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { OnboardingTopBar } from '../../app/components/OnboardingTopBar';

const GOALS = [
  '한 가지 일을 20분 이상 이어가기',
  '해야 할 일을 10분 안에 시작하기',
  '약속과 일정 10분 전 준비 완료하기',
  '하루 5분 주변 정리하기',
  '목표 취침·기상 시간 ±1시간 안에 지키기',
];

export default function Onboarding4Page() {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState<Set<string>>(() => new Set([GOALS[0]]));
  const [showCustomInput, setShowCustomInput] = useState(false);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) => {
      const next = new Set(prev);

      if (next.has(goal)) {
        next.delete(goal);
      } else {
        next.add(goal);
      }

      return next;
    });
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <OnboardingTopBar
          title="어떤 변화가 있으면 좋겠어요?"
          description="최소 1개 이상"
          progressClassName="w-[75%] bg-purple-300"
          step={3}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-5 pr-5 pb-4 pl-5">
          <div className="flex flex-wrap gap-1.5">
            {GOALS.map((goal) => {
              const selected = selectedGoals.has(goal);

              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`items-center flex font-semibold text-sm gap-1.5 tracking-tight py-3 rounded-2xl transition-all active:scale-[0.97] ${
                    selected
                      ? 'bg-purple-500 text-white pl-5 pr-4 shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 px-5'
                  }`}
                >
                  <span className="block">{goal}</span>
                  {selected ? (
                    <span className="flex items-center justify-center w-4 h-4 rounded-full" aria-hidden="true">
                      ×
                    </span>
                  ) : null}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setShowCustomInput((prev) => !prev)}
              className="items-center flex font-semibold whitespace-nowrap bg-white hover:bg-gray-50 border-gray-400 border-dashed border text-gray-600 text-sm gap-1.5 tracking-tight py-3 px-5 rounded-2xl transition-all active:scale-[0.97]"
            >
              <span className="block">+ 직접입력</span>
            </button>
          </div>
          {showCustomInput ? (
            <input
              type="text"
              className="mt-3 w-full h-11 rounded-xl border border-gray-200 bg-white px-3 text-base outline-none focus:border-purple-300"
              placeholder="원하는 목표를 입력해 주세요"
            />
          ) : null}
          <div className="grow basis-[0%]" />
          <button
            type="button"
            onClick={() => navigate('/onboarding/5')}
            disabled={selectedGoals.size === 0}
            className="items-center flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl transition-all active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100"
          >
            <span className="block">다음</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { OnboardingTopBar } from '../../app/components/OnboardingTopBar';

const QUESTIONS = [
  { id: 'q3', text: '일을 마무리하는 데 얼마나 자주 어려움이 있나요?' },
  { id: 'q4', text: '체계적으로 정리해야 하는 일을 미루는 경향이 있나요?' },
  { id: 'q5', text: '약속이나 업무를 잊어버리는 경우가 있나요?' },
];

export default function Onboarding3Page() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <OnboardingTopBar
          title="ASRS 자가 체크"
          description="18문항 중 3문항"
          progressClassName="w-[50%] bg-purple-300"
          step={2}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-5 pr-5 pb-4 pl-5">
          {QUESTIONS.map((q, qi) => (
            <div key={q.id} className="bg-white border border-gray-200 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] p-3 rounded-xl">
              <div className="font-medium mb-3 text-sm leading-snug">
                <span className="font-semibold text-gray-500 mr-2">Q{qi + 3}</span>
                {q.text}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between w-full">
                  {[1, 2, 3, 4, 5].map((val) => {
                    const selected = answers[q.id] === val;

                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all select-none active:scale-[0.95] ${
                          selected
                            ? 'bg-purple-500 text-white shadow-sm'
                            : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                        }`}
                      >
                        <span className="text-base font-bold">{val}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between w-full text-[10px] text-gray-600">
                  <span>전혀</span>
                  <span>매우 자주</span>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-purple-50 border border-purple-100 p-2.5 rounded-xl">
            <div className="text-gray-800 text-xs leading-normal">
              본 검사는 선별 도구이며 실제 진단과 다를 수 있습니다. 정확한 진단은 전문가와 상담해 주세요.
            </div>
          </div>
        </div>
        <div className="pt-0 pr-5 pb-4 pl-5">
          <button
            type="button"
            onClick={() => navigate('/onboarding/4')}
            disabled={!allAnswered}
            className="items-center flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-xl select-none transition-all active:scale-[0.97] active:bg-black disabled:opacity-40 disabled:active:scale-100"
          >
            <span className="block">다음</span>
          </button>
        </div>
      </div>
    </div>
  );
}

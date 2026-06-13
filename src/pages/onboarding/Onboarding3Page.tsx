import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { OnboardingTopBar } from '../../app/components/OnboardingTopBar';
import { submitOnboardingSymptoms } from '@/api/onboarding';

export default function Onboarding3Page() {
  const navigate = useNavigate();
  const [guideOpen, setGuideOpen] = useState(false);
  const [symptomText, setSymptomText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goNext = async () => {
    setError('');
    setIsSubmitting(true);
    try {
      await submitOnboardingSymptoms({ description: symptomText, emotionalEvent: '', isQuickOnboarding: false });
      navigate('/onboarding/4');
    } catch (err) {
      console.error('Failed to submit onboarding symptoms:', err);
      setError('증상 서술을 저장하지 못했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSymptomTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSymptomText(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <OnboardingTopBar
          title="증상 서술"
          description="어떤 어려움을 겪고 계신가요?"
          progressClassName="w-[40%] bg-purple-500"
          step={2}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-5 pr-5 pb-4 pl-5">
          <div className="flex flex-col bg-white shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] min-h-44 p-3.5 rounded-xl border border-gray-300 mt-5 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
            <label className="font-semibold text-gray-500 text-[11px] leading-tight">증상 서술</label>
            <textarea
              placeholder="자유롭게 적어주세요. 나중에 태그로 추천해드려요."
              value={symptomText}
              onChange={handleSymptomTextChange}
              className="grow w-full min-h-[116px] overflow-hidden bg-transparent text-gray-900 text-base leading-relaxed placeholder:text-gray-400 outline-none resize-none mt-2 p-0"
            />
          <div className="text-right mt-2">
            <span className={`text-[11px] font-medium ${symptomText.trim().length >= 50 ? 'text-purple-500' : 'text-gray-400'}`}>
              {symptomText.trim().length}
            </span>
            <span className="text-[11px] text-gray-300"> / 50</span>
          </div>
          </div>
          <div className="bg-purple-50 border border-purple-100 p-3 rounded-xl mt-5">
            <button className="items-center flex gap-2 w-full" onClick={() => setGuideOpen((v: boolean) => !v)}>
              <Info className="w-3.5 h-3.5 text-purple-600 shrink-0" strokeWidth={2.5} />
              <div className="font-bold text-purple-700">증상 서술 가이드라인 보기</div>
              <div className="grow basis-[0%]"></div>
              <ChevronDown className={`w-3 h-3 text-purple-500 shrink-0 transition-transform duration-200 ${guideOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
            </button>
            {guideOpen && (
              <ul className="mt-3 flex flex-col gap-2 overflow-y-auto max-h-36">
                {[
                  '최근만이 아니라 반복해서 겪는 경험을 적어주세요.',
                  '학교, 직장, 집처럼 여러 환경에서의 어려움을 나눠 적어도 좋아요.',
                  '단순한 스트레스와 오래 지속된 변화를 구분하면 도움이 됩니다.',
                  '집중 안 됨보다 구체적인 상황을 적어주세요.',
                ].map((item) => (
                  <li key={item} className="flex gap-1.5 text-purple-800 text-xs leading-relaxed">
                    <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grow basis-[0%]"></div>
          <div className="text-center text-gray-500 text-xs">최소 50자 이상 입력해 주세요</div>
          {error ? <div className="text-red-500 text-xs text-center mt-2">{error}</div> : null}
          <button
            type="button"
            onClick={goNext}
            disabled={symptomText.trim().length < 50 || isSubmitting}
            className="items-center flex font-bold justify-center w-full h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base min-h-11 mt-3 pt-0 pr-5 pb-0 pl-5 rounded-xl disabled:opacity-40"
          >
            <span className="block">{isSubmitting ? '저장 중...' : '다음'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

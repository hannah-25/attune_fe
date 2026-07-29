import React from 'react';
import { useNavigate } from 'react-router';
import { OnboardingTopBar } from '../../app/components/OnboardingTopBar';

export default function Onboarding2Page() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <OnboardingTopBar
          title="온보딩 방식 선택"
          description="어떤 방식으로 시작할까요?"
          progressClassName="w-[20%] bg-purple-500"
          step={1}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] px-5 pt-6 pb-6 gap-4">
          <button
            type="button"
            onClick={() => navigate('/onboarding/3')}
            className="w-full bg-white border-2 border-purple-200 rounded-2xl p-5 text-left shadow-sm active:scale-[0.98] transition-all hover:border-purple-400 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xl">📋</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">전체 온보딩</div>
                <div className="text-gray-500 text-xs leading-relaxed mt-1">
                  증상을 직접 서술하고 자가 체크(ASRS)를 진행해요.
                  <br />
                  AI가 나에게 맞는 태그와 목표를 추천해드려요.
                </div>
                <div className="mt-2 inline-flex items-center bg-purple-50 text-purple-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  약 5분 소요
                </div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/onboarding/quick')}
            className="w-full bg-white border-2 border-gray-200 rounded-2xl p-5 text-left shadow-sm active:scale-[0.98] transition-all hover:border-gray-300 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-base">빠른 온보딩</div>
                <div className="text-gray-500 text-xs leading-relaxed mt-1">
                  이미 ADHD 진단을 받으셨나요?
                  <br />
                  취약한 영역만 선택하면 바로 시작할 수 있어요.
                </div>
                <div className="mt-2 inline-flex items-center bg-blue-50 text-blue-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  약 1분 소요
                </div>
              </div>
            </div>
          </button>

          <div className="grow basis-[0%]" />
          <p className="text-center text-gray-400 text-[11px] leading-relaxed">
            어떤 방식을 선택해도 나중에 설정에서 변경할 수 있어요.
          </p>
        </div>
      </div>
    </div>
  );
}

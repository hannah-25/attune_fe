import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { getAiRecommendations } from '@/api/onboarding';

const LOADING_MESSAGES = [
  '증상 데이터를 분석하고 있어요...',
  '나에게 맞는 태그를 찾고 있어요...',
  '맞춤 목표를 생성하고 있어요...',
  '거의 다 됐어요!',
];

export default function OnboardingAiLoadingPage() {
  const navigate = useNavigate();
  const calledRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    getAiRecommendations()
      .then((result) => {
        if (!mountedRef.current) return;
        navigate('/onboarding/ai-result', { state: { aiResult: result }, replace: true });
      })
      .catch((err) => {
        console.error('AI recommendation failed:', err);
        if (!mountedRef.current) return;
        navigate('/onboarding/ai-result', { state: { aiResult: null, error: true }, replace: true });
      });
  }, [navigate]);

  return (
    <div
      className="w-full h-dvh bg-gray-50 flex flex-col items-center justify-center gap-6 px-5"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* 스피너 */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-purple-100" />
        <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">✨</span>
        </div>
      </div>

      <div className="text-center">
        <div className="font-bold text-gray-900 text-lg">AI가 분석 중이에요</div>
        <div className="text-gray-500 text-sm mt-1.5 leading-relaxed">
          나에게 꼭 맞는 태그와 목표를
          <br />
          준비하고 있어요
        </div>
      </div>

      {/* 순환 메시지 */}
      <AnimatedMessages messages={LOADING_MESSAGES} />
    </div>
  );
}

function AnimatedMessages({ messages }: { messages: string[] }) {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setVisible(false);
      timeout = setTimeout(() => {
        setIndex((prev: number) => (prev + 1) % messages.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [messages.length]);

  return (
    <div
      className="text-purple-600 text-sm font-semibold transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {messages[index]}
    </div>
  );
}

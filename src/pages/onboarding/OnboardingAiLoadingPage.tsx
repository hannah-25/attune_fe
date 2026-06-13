import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { getAiRecommendations } from '@/api/onboarding';
import emotion3 from '@src/assets/emotion3.png';
import emotion6 from '@src/assets/emotion6.png';
import emotion5 from '@src/assets/emotion5.png';
import logo from '@src/assets/logo.png';

const STEPS: { message: string; image: string }[] = [
  { message: '증상 데이터를 분석하고 있어요...', image: emotion3 },
  { message: '나에게 맞는 태그를 찾고 있어요...', image: emotion6 },
  { message: '맞춤 목표를 생성하고 있어요...', image: emotion5 },
  { message: '거의 다 됐어요!', image: logo },
];

export default function OnboardingAiLoadingPage() {
  const navigate = useNavigate();
  const calledRef = useRef(false);
  const mountedRef = useRef(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
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

  // 메시지·이미지 순환 (마지막 스텝에서 멈춤)
  useEffect(() => {
    if (stepIndex >= STEPS.length - 1) return;
    let transitionTimeout: ReturnType<typeof setTimeout> | undefined;
    const stepTimeout = setTimeout(() => {
      setVisible(false);
      transitionTimeout = setTimeout(() => {
        setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
        setVisible(true);
      }, 350);
    }, 2200);

    return () => {
      clearTimeout(stepTimeout);
      if (transitionTimeout) clearTimeout(transitionTimeout);
    };
  }, [stepIndex]);

  const { message, image } = STEPS[stepIndex];

  return (
    <div
      className="w-full h-dvh bg-gray-50 flex flex-col items-center justify-center gap-8 px-5"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* 캐릭터 이미지 */}
      <div
        className="w-52 h-52 flex items-center justify-center"
        style={{ animation: 'float 3s ease-in-out infinite' }}
      >
        <img
          src={image}
          alt=""
          className="w-full h-full object-contain transition-opacity duration-350"
          style={{ opacity: visible ? 1 : 0 }}
        />
      </div>

      {/* 텍스트 */}
      <div className="text-center flex flex-col gap-2">
        <div className="font-bold text-gray-900 text-lg">AI가 분석 중이에요</div>
        <div
          className="text-purple-600 text-sm font-semibold transition-opacity duration-350"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { mockSession, mockPrescriptions, type PrescriptionStatus } from '@/mocks/counseling.mock';

const SESSION = mockSession;

const STATUS_OPTIONS: PrescriptionStatus[] = ['증량', '감량', '유지'];

const STATUS_COLOR: Record<PrescriptionStatus, string> = {
  증량: 'bg-purple-100 text-purple-800',
  감량: 'bg-orange-100 text-orange-800',
  유지: 'bg-gray-100 text-gray-700',
};

const INITIAL_PRESCRIPTIONS = mockPrescriptions;

export default function CounselingResultPage() {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState(INITIAL_PRESCRIPTIONS);
  const [saved, setSaved] = useState(true);
  const [nextDateRaw, setNextDateRaw] = useState('2026-05-16');
  const [advice, setAdvice] = useState(SESSION.advice);
  const [adviceFocused, setAdviceFocused] = useState(false);
  const [goal, setGoal] = useState('');
  const [goalFocused, setGoalFocused] = useState(false);
  const adviceRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (adviceRef.current) {
      adviceRef.current.style.height = 'auto';
      adviceRef.current.style.height = `${adviceRef.current.scrollHeight}px`;
    }
  }, []);

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const cycleStatus = (id: string, current: PrescriptionStatus) => {
    const next = STATUS_OPTIONS[(STATUS_OPTIONS.indexOf(current) + 1) % STATUS_OPTIONS.length];
    setPrescriptions((prev) => prev.map((p) => (p.id === id ? { ...p, status: next } : p)));
    setSaved(false);
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="상담 후 기록"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} onClick={() => navigate(-1)} />}
          right={
            <div className="h-11 flex items-center">
              {!saved ? (
                <button
                  type="button"
                  onClick={() => setSaved(true)}
                  className="text-sm px-5 py-2 rounded-xl font-bold text-white whitespace-nowrap bg-[rgb(31,27,46)] transition-all active:scale-[0.97]"
                >
                  저장
                </button>
              ) : null}
            </div>
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-5 pt-1 pr-4 pb-8 pl-4">

          {/* 세션 요약 */}
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="flex items-center gap-4">
              <div className="shrink-0 text-center">
                <div className="text-xs text-purple-700 font-semibold">{SESSION.date.split(' ')[0]}</div>
                <div className="font-extrabold text-3xl leading-none text-gray-700 mt-0.5" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                  {SESSION.date.split(' ')[1].replace('일', '')}
                </div>
              </div>
              <div className="w-px self-stretch bg-purple-200" />
              <div className="min-w-0">
                <div className="font-bold text-base text-gray-900">{SESSION.clinic}</div>
                <div className="text-sm text-gray-500 mt-0.5">{SESSION.doctor}</div>
              </div>
            </div>
          </div>

          {/* 의사 조언 */}
          <div>
            <div className="font-bold text-gray-800 mb-2">의사 조언</div>
            <div className={`bg-white border shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-2xl transition-colors ${adviceFocused ? 'border-purple-300' : 'border-gray-200'}`}>
              <textarea
                ref={adviceRef}
                value={advice}
                onChange={(e) => { setAdvice(e.target.value); setSaved(false); autoResize(e.target); }}
                onFocus={() => setAdviceFocused(true)}
                onBlur={() => setAdviceFocused(false)}
                rows={2}
                className="w-full text-base text-gray-700 leading-relaxed resize-none outline-none overflow-hidden bg-transparent placeholder:text-gray-300"
                placeholder="의사 조언을 입력하세요"
              />
            </div>
          </div>

          {/* 처방 변경 */}
          <div>
            <div className="font-bold text-gray-800 mb-2">처방 변경</div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
              {prescriptions.map((prescription, index) => (
                <div
                  key={prescription.id}
                  className={`flex items-center gap-3 pt-3 pr-4 pb-3 pl-4 ${index < prescriptions.length - 1 ? 'border-b' : ''}`}
                  style={index < prescriptions.length - 1 ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}
                >
                  <div className="w-1.5 h-1.5 bg-purple-300 rounded-full shrink-0" />
                  <div className="grow basis-[0%] font-semibold">
                    {prescription.before && prescription.after ? (
                      <>
                        {prescription.name}{' '}
                        <span className="line-through text-gray-400">{prescription.before}</span>
                        {' → '}
                        <span className="font-bold">{prescription.after}</span>
                      </>
                    ) : (
                      prescription.name
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => cycleStatus(prescription.id, prescription.status)}
                    className={`flex items-center gap-1 font-semibold text-xs px-3 py-1.5 rounded-full transition-all active:scale-[0.97] shrink-0 ${STATUS_COLOR[prescription.status]}`}
                  >
                    <span>{prescription.status}</span>
                    <ChevronRight className="w-3 h-3 opacity-50" strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 다음달 치료 목표 */}
          <div>
            <div className="font-bold text-gray-800 mb-2">다음달 치료 목표</div>
            <div className={`bg-white border shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-2xl transition-colors ${goalFocused ? 'border-purple-300' : 'border-gray-200'}`}>
              <textarea
                value={goal}
                onChange={(e) => { setGoal(e.target.value); setSaved(false); autoResize(e.target); }}
                onFocus={() => setGoalFocused(true)}
                onBlur={() => setGoalFocused(false)}
                rows={2}
                className="w-full text-base text-gray-700 leading-relaxed resize-none outline-none overflow-hidden bg-transparent placeholder:text-gray-300"
                placeholder="다음 상담까지의 목표를 입력하세요"
              />
            </div>
          </div>

          {/* 다음 진료 */}
          <div className="bg-purple-50 border border-purple-100 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] p-3 rounded-2xl">
            <div className="flex items-start gap-2">
              <div className="overflow-hidden w-3 h-3 shrink-0 mt-[3px]">
                <img src="/icons/6cae536aa2417c12c04efccc757fd2895c7958ab.svg" className="block size-full" />
              </div>
              <div>
                <div className="font-bold text-gray-800 flex items-center gap-1.5">
                  다음 진료
                  <input
                    type="date"
                    value={nextDateRaw}
                    onChange={(e) => { setNextDateRaw(e.target.value); setSaved(false); }}
                    className="font-bold bg-transparent outline-none text-gray-800 border-b border-gray-300 focus:border-purple-500 text-sm"
                  />
                </div>
                <div className="mt-1 text-gray-500 text-xs">알림으로 미리 알려드릴게요</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

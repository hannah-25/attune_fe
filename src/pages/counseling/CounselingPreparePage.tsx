import React, { useState } from 'react';
import { Check, ChevronLeft, Plus, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import { formatUpcomingDateTime } from '@/lib/date';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { mockQuestions, mockSummaryStats, mockSummaryText } from '@/mocks/counseling.mock';

const nextAppointment = new Date();
nextAppointment.setDate(nextAppointment.getDate() + 7);
nextAppointment.setHours(14, 0, 0, 0);

export default function CounselingPreparePage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(mockQuestions);
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');

  const addQuestion = () => {
    const trimmedQuestion = newQuestion.trim();
    if (!trimmedQuestion) return;
    setQuestions((current) => [...current, { text: trimmedQuestion, checked: false }]);
    setNewQuestion('');
    setAddingQuestion(false);
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="상담 전 준비"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} onClick={() => navigate(-1)} />}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="font-bold text-gray-600 text-xs">{formatUpcomingDateTime(nextAppointment)}</div>
            <div className="font-extrabold mt-1 text-lg leading-[24.3px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
              최근 2주, 이렇게 지냈어요
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex mb-[10px] gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" strokeWidth={2.4} />
              <div className="font-bold">자동 요약</div>
              <div className="grow basis-[0%]"></div>
              <div className="text-gray-600 text-xs">최근 14일</div>
            </div>
            <div className="grid-cols-3 grid mb-[10px] gap-1.5">
              <SummaryStat label="복용" value={mockSummaryStats.adherence} />
              <SummaryStat label="감정" value={mockSummaryStats.emotion} />
              <SummaryStat label="실수" value={mockSummaryStats.mistakes} />
            </div>
            <div className="text-gray-700 text-sm leading-relaxed">{mockSummaryText}</div>
          </div>
          <div>
            <div className="font-bold mb-[6px] text-gray-600">의사에게 묻고 싶은 것</div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
              {questions.map((q, idx) => (
                <button
                  type="button"
                  onClick={() => setQuestions((current) => current.map((question, questionIdx) => questionIdx === idx ? { ...question, checked: !question.checked } : question))}
                  key={q.text}
                  className={`items-start flex w-full text-left gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99] ${idx < questions.length - 1 || addingQuestion ? 'border-b' : ''}`}
                  style={idx < questions.length - 1 || addingQuestion ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}
                >
                  <span className={`items-center flex justify-center w-[18px] h-[18px] mt-[2px] shrink-[0] rounded-[0.5625rem] ${q.checked ? 'bg-purple-500' : 'border border-gray-400'}`}>
                    {q.checked ? <Check className="w-[11px] h-[11px] text-white" strokeWidth={3} /> : null}
                  </span>
                  <span className="grow basis-[0%] leading-normal">{q.text}</span>
                </button>
              ))}
              {addingQuestion ? (
                <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px]">
                  <input
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') addQuestion(); }}
                    autoFocus
                    placeholder="질문을 입력해 주세요"
                    className="grow basis-[0%] text-base bg-transparent outline-none placeholder:text-gray-300"
                  />
                  <button type="button" onClick={addQuestion} disabled={!newQuestion.trim()} className="font-bold text-xs px-2.5 py-1 rounded-lg bg-[rgb(31,27,46)] text-white disabled:opacity-30 transition-all active:scale-[0.97]">추가</button>
                </div>
              ) : (
                <button type="button" onClick={() => setAddingQuestion(true)} className="items-center flex w-full text-left text-gray-600 gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99]">
                  <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span className="block">질문 추가</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center bg-gray-100 p-[10px] rounded-xl">
      <div className="font-bold text-center text-gray-600 text-xs">{label}</div>
      <div className="font-extrabold text-center mt-[2px] text-base" style={{ fontFamily: 'NanumSquare, system-ui' }}>{value}</div>
    </div>
  );
}

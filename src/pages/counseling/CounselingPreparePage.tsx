import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { formatUpcomingDateTime } from '@/lib/date';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

const SUMMARY_STATS = { adherence: '88%', emotion: '6.2', mistakes: '7회' };
const SUMMARY_TEXT = '아침 약 복용 후 집중력이 높아지는 패턴이 보여요. 오후 4시 이후 약효 저하와 수면 어려움도 꾸준히 기록되었어요.';
const INITIAL_QUESTIONS = [
  { text: '아침 식욕이 너무 없어요. 다른 약으로 바꿔야 할까요?', checked: true },
  { text: '오후 4시 이후 약효가 빨리 떨어지는 느낌이에요', checked: true },
  { text: '수면제와 함께 복용해도 괜찮을까요?', checked: false },
];

const nextAppointment = new Date();
nextAppointment.setDate(nextAppointment.getDate() + 7);
nextAppointment.setHours(14, 0, 0, 0);

export default function CounselingPreparePage() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');
  const [goalSaved, setGoalSaved] = useState(true);
  const [goalFocused, setGoalFocused] = useState(false);
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');

  const showSaveButton = goal.trim().length > 0 && !goalSaved;

  const toggleQuestion = (idx: number) => {
    setQuestions((current) =>
      current.map((question, questionIdx) =>
        questionIdx === idx ? { ...question, checked: !question.checked } : question,
      ),
    );
  };

  const addQuestion = () => {
    const trimmedQuestion = newQuestion.trim();
    if (!trimmedQuestion) return;

    setQuestions((current) => [...current, { text: trimmedQuestion, checked: false }]);
    setNewQuestion('');
    setAddingQuestion(false);
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="상담 전 준비"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} onClick={() => navigate(-1)} />}
          right={
            <div className="items-center flex justify-center w-11 h-11">
              {showSaveButton ? (
                <button
                  type="button"
                  onClick={() => setGoalSaved(true)}
                  className="text-xs px-2.5 py-1 rounded-lg font-bold text-white bg-[rgb(31,27,46)] transition-all active:scale-[0.97]"
                >
                  저장
                </button>
              ) : null}
            </div>
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="font-bold text-gray-600 text-xs">
              {formatUpcomingDateTime(nextAppointment)}
            </div>
            <div className="font-extrabold mt-1 text-lg leading-[24.3px]" style={{ fontFamily: "NanumSquare, system-ui" }}>
              최근 2주, 이렇게 지냈어요
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex mb-[10px] gap-1.5">
              <div className="overflow-hidden w-3 h-3">
                <img src="/icons/d6f01a918e96084e1d681d7d62364e44c857d2d4.svg" className="block size-full" />
              </div>
              <div className="font-bold">
                자동 요약
              </div>
              <div className="grow basis-[0%]"></div>
              <div className="text-gray-600 text-xs">
                최근 14일
              </div>
            </div>
            <div className="grid-cols-3 grid mb-[10px] gap-1.5">
              <div className="text-center bg-gray-100 p-[10px] rounded-xl" style={{ gridArea: "1 / 1 / 2 / 2" }}>
                <div className="font-bold text-center text-gray-600 text-xs">복용</div>
                <div className="font-extrabold text-center mt-[2px] text-base" style={{ fontFamily: "NanumSquare, system-ui" }}>{SUMMARY_STATS.adherence}</div>
              </div>
              <div className="text-center bg-gray-100 p-[10px] rounded-xl" style={{ gridArea: "1 / 2 / 2 / 3" }}>
                <div className="font-bold text-center text-gray-600 text-xs">감정</div>
                <div className="font-extrabold text-center mt-[2px] text-base" style={{ fontFamily: "NanumSquare, system-ui" }}>{SUMMARY_STATS.emotion}</div>
              </div>
              <div className="text-center bg-gray-100 p-[10px] rounded-xl" style={{ gridArea: "1 / 3 / 2 / 4" }}>
                <div className="font-bold text-center text-gray-600 text-xs">실수</div>
                <div className="font-extrabold text-center mt-[2px] text-base" style={{ fontFamily: "NanumSquare, system-ui" }}>{SUMMARY_STATS.mistakes}</div>
              </div>
            </div>
            <div className="text-gray-700 text-sm leading-relaxed">{SUMMARY_TEXT}</div>
          </div>
          <div>
            <div className="font-bold mb-[6px] text-gray-600">
              의사에게 묻고 싶은 것
            </div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
              {questions.map((q, idx) => (
                <button
                  type="button"
                  onClick={() => toggleQuestion(idx)}
                  key={idx}
                  className={`items-start flex w-full text-left gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99] ${idx < questions.length - 1 || addingQuestion ? 'border-b' : ''}`}
                  style={idx < questions.length - 1 || addingQuestion ? { borderBottomColor: "rgb(233, 228, 220)" } : undefined}
                >
                  <div className={`items-center flex justify-center w-[18px] h-[18px] mt-[2px] shrink-[0] rounded-[0.5625rem] ${q.checked ? 'bg-purple-500' : 'border border-gray-400'}`}>
                    {q.checked && (
                      <div className="w-[6px] h-[6px] bg-white rounded-full" />
                    )}
                  </div>
                  <div className="grow basis-[0%] leading-normal">{q.text}</div>
                </button>
              ))}
              {addingQuestion ? (
                <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px]">
                  <input
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addQuestion();
                    }}
                    autoFocus
                    placeholder="질문을 입력해 주세요"
                    className="grow basis-[0%] text-base bg-transparent outline-none placeholder:text-gray-300"
                  />
                  <button
                    type="button"
                    onClick={addQuestion}
                    disabled={!newQuestion.trim()}
                    className="font-bold text-xs px-2.5 py-1 rounded-lg bg-[rgb(31,27,46)] text-white disabled:opacity-30 transition-all active:scale-[0.97]"
                  >
                    추가
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setAddingQuestion(true)}
                  className="items-center flex w-full text-left text-gray-600 gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99]"
                >
                  <div className="overflow-hidden w-3 h-3">
                    <img src="/icons/c6af67f80f7ec4d48ab0b1984f79c9c47ed17688.svg" className="block size-full" />
                  </div>
                  <span className="block">질문 추가</span>
                </button>
              )}
            </div>
          </div>
          <div>
            <div className="font-bold mb-[6px] text-gray-600">
              다음 달 치료 목표
            </div>
            <div className={`bg-white border shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem] transition-colors ${goalFocused ? 'border-purple-300' : 'border-transparent'}`}>
              <textarea
                value={goal}
                onChange={(e) => {
                  setGoal(e.target.value);
                  setGoalSaved(false);
                }}
                onFocus={() => setGoalFocused(true)}
                onBlur={() => setGoalFocused(false)}
                placeholder="다음 달 치료 목표를 입력해 주세요"
                rows={3}
                className="w-full text-base text-gray-900 leading-relaxed bg-transparent outline-none resize-none placeholder:text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

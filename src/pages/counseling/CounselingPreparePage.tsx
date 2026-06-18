import React, { useEffect, useState } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { formatUpcomingDateTime } from '@/lib/date';
import { TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import {
  getConsultationQuestions,
  createConsultationQuestion,
  deleteConsultationQuestion,
  type ConsultationQuestion,
} from '@/api/consultation';

type PrepareRouteState = {
  consultationId: number;
  consultationDate: string;
  place: string;
  doctorName: string;
};

type LocalQuestion = ConsultationQuestion & { checked: boolean };

export default function CounselingPreparePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PrepareRouteState | null;

  const [questions, setQuestions] = useState<LocalQuestion[]>([]);
  const [addingQuestion, setAddingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [loading, setLoading] = useState(true);

  const consultationId = state?.consultationId;
  const consultationDate = state?.consultationDate;
  const place = state?.place;

  useEffect(() => {
    if (!consultationId) {
      navigate('/counseling', { replace: true });
      return;
    }

    let ignore = false;
    getConsultationQuestions(consultationId)
      .then((list) => {
        if (!ignore) {
          setQuestions(list.map((q) => ({ ...q, checked: false })));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [consultationId]);

  const addQuestion = async () => {
    const trimmed = newQuestion.trim();
    if (!trimmed || !consultationId) return;

    setNewQuestion('');
    setAddingQuestion(false);

    try {
      const created = await createConsultationQuestion(consultationId, trimmed);
      setQuestions((cur) => [...cur, { ...created, checked: false }]);
    } catch {
      // 실패 시 입력 복원
      setNewQuestion(trimmed);
      setAddingQuestion(true);
    }
  };

  const removeQuestion = async (questionId: number) => {
    if (!consultationId) return;

    const prev = questions;
    setQuestions((cur) => cur.filter((q) => q.questionId !== questionId));

    try {
      await deleteConsultationQuestion(consultationId, questionId);
    } catch {
      setQuestions(prev);
    }
  };

  const toggleQuestion = (questionId: number) => {
    setQuestions((cur) =>
      cur.map((q) => (q.questionId === questionId ? { ...q, checked: !q.checked } : q)),
    );
  };

  const appointmentDate = consultationDate ? new Date(consultationDate) : null;

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="상담 전 준비"
          left={<NavBackButton onClick={() => navigate(-1)} />}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="text-[10px] text-purple-700 font-semibold">다음 상담</div>
            <div className="font-extrabold mt-1 text-lg leading-[24.3px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
              {place ?? '-'}
            </div>
            {appointmentDate && (
              <div className="text-xs text-gray-500 mt-0.5">{formatUpcomingDateTime(appointmentDate)}</div>
            )}
          </div>

          <div>
            <div className="font-bold mb-[6px] text-gray-600">의사에게 묻고 싶은 것</div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
              {loading ? (
                <div className="py-6 text-center text-gray-400 text-xs">불러오는 중...</div>
              ) : (
                <>
                  {questions.map((q, idx) => {
                    const isLast = idx === questions.length - 1;
                    return (
                      <div
                        key={q.questionId}
                        className={`flex items-start gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] ${!isLast || addingQuestion ? 'border-b' : ''}`}
                        style={!isLast || addingQuestion ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}
                      >
                        <button
                          type="button"
                          onClick={() => toggleQuestion(q.questionId)}
                          className="flex items-center justify-center w-[18px] h-[18px] mt-[2px] shrink-0 rounded-[0.5625rem] transition-colors"
                          style={q.checked ? { backgroundColor: 'rgb(168,85,247)' } : undefined}
                        >
                          {q.checked
                            ? <Check className="w-[11px] h-[11px] text-white" strokeWidth={3} />
                            : <span className="w-[18px] h-[18px] rounded-[0.5625rem] border border-gray-400 block" />}
                        </button>
                        <span className="grow basis-[0%] leading-normal text-left">{q.text}</span>
                        <button
                          type="button"
                          onClick={() => removeQuestion(q.questionId)}
                          className="shrink-0 mt-[2px] text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                        </button>
                      </div>
                    );
                  })}
                  {addingQuestion ? (
                    <div className="flex items-center gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px]">
                      <input
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') addQuestion(); }}
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
                      className="flex items-center w-full text-left text-gray-600 gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99]"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                      <span className="block">질문 추가</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 pb-6 pt-2 shrink-0">
          <button
            type="button"
            onClick={() => consultationId && navigate(`/counseling/result?id=${consultationId}&mode=edit`)}
            className="flex w-full items-center justify-center h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white font-bold text-base rounded-[1.5625rem]"
          >
            상담 결과 기록하기
          </button>
        </div>
      </div>
    </div>
  );
}

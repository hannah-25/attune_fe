import React, { useEffect, useState } from 'react';
import { Brain, ClipboardList, Flag, Heart, Target } from 'lucide-react';
import { useParams } from 'react-router';
import { ApiError } from '@/api/client';
import { getOnboardingHistoryDetail, OnboardingHistoryDetail } from '@/api/onboarding';
import { NavBackButton } from '@/components/NavButtons';
import { ScrollArea } from '@/components/ScrollArea';
import { TopBar } from '@/components/TopBar';
import { formatLongDate } from '@/lib/date';

const TYPE_LABELS: Record<string, string> = {
  INATTENTION: '부주의',
  HYPERACTIVITY: '과잉행동·충동성',
  WORK_STUDY: '업무·학업',
  TIME_MANAGEMENT: '시간 관리',
  LIFE_MANAGEMENT: '일상 생활',
  EMOTIONAL_SOCIAL: '정서·관계',
};

export default function OnboardingHistoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<OnboardingHistoryDetail | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const title = detail ? formatLongDate(new Date(detail.doneAt)) : '자가 체크 상세';

  useEffect(() => {
    if (!id) {
      setError('자가 체크 기록을 찾을 수 없어요.');
      setIsLoading(false);
      return;
    }

    let ignore = false;

    getOnboardingHistoryDetail(id)
      .then((response) => {
        if (!ignore) setDetail(response);
      })
      .catch((err) => {
        console.error('Failed to load onboarding history detail:', err);
        if (!ignore) {
          setError(err instanceof ApiError && err.status === 404
            ? '자가 체크 기록을 찾을 수 없어요.'
            : '자가 체크 기록을 불러오지 못했어요.');
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => { ignore = true; };
  }, [id]);

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title={title} left={<NavBackButton />} />
        <ScrollArea className="flex flex-col gap-4">
          {isLoading ? (
            <div className="text-center text-xs text-gray-500 py-8">불러오는 중...</div>
          ) : error || !detail ? (
            <ErrorState message={error || '자가 체크 기록을 찾을 수 없어요.'} />
          ) : (
            <HistoryDetail detail={detail} />
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

function HistoryDetail({ detail }: { detail: OnboardingHistoryDetail }) {
  const { symptom } = detail;

  return (
    <>
      <section className="bg-white border border-gray-200 rounded-2xl p-4 shadow-[rgba(60,40,90,0.08)_0px_4px_16px_0px]">
        <div className="text-xs text-gray-500">완료일</div>
        <div className="font-bold text-base text-gray-900 mt-1">{formatLongDate(new Date(detail.doneAt))}</div>
        <div className="font-bold text-sm text-gray-800 mt-4">ASRS 검사 점수</div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <ScoreCard label="부주의" score={detail.inattentionScore} icon={<Brain className="w-4 h-4" />} />
          <ScoreCard label="과잉행동·충동성" score={detail.hyperactivityScore} icon={<Heart className="w-4 h-4" />} />
        </div>
      </section>

      <DetailSection icon={<ClipboardList className="w-4 h-4" />} title="증상 기록">
        <div className="text-[11px] font-semibold text-purple-600 mb-3">
          {symptom.isQuickOnboarding ? '빠른 온보딩으로 기록' : '상세 온보딩으로 기록'}
        </div>
        {symptom.isQuickOnboarding ? (
          <div className="flex flex-col gap-4">
            <TagGroup title="취약 증상 영역" values={symptom.selectedSymptomTypes} />
            <TagGroup title="취약 기능 영역" values={symptom.selectedFunctionalAreas} />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <TextRecord title="증상 서술" value={symptom.description} />
            <TextRecord title="감정적 사건" value={symptom.emotionalEvent} />
          </div>
        )}
      </DetailSection>

      <DetailSection icon={<Target className="w-4 h-4" />} title={`치료 목표 ${detail.goals.length}개`}>
        {detail.goals.length === 0 ? (
          <div className="text-xs text-gray-500 py-2">활성화된 치료 목표가 없어요.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {detail.goals.map((goal) => (
              <div key={goal.id} className="flex items-start gap-3 bg-gray-50 rounded-xl px-3 py-3">
                <Flag className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-xs text-gray-800">{goal.title}</div>
                  <div className="text-[10px] text-gray-500 mt-1">{getTypeLabel(goal.type)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DetailSection>
    </>
  );
}

function ScoreCard({ icon, label, score }: { icon: React.ReactNode; label: string; score: number }) {
  return (
    <div className="bg-purple-50 border border-purple-100 shadow-[rgba(120,80,200,0.10)_0px_4px_12px_0px] rounded-xl px-3 py-3">
      <div className="flex items-center gap-1.5 text-purple-500">
        {icon}
        <span className="text-[10px] font-semibold">{label}</span>
      </div>
      <div className="font-bold text-xl text-purple-800 mt-1">{score}<span className="text-xs ml-0.5">점</span></div>
    </div>
  );
}

function DetailSection({ children, icon, title }: { children: React.ReactNode; icon: React.ReactNode; title: string }) {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-4 shadow-[rgba(60,40,90,0.08)_0px_4px_16px_0px]">
      <div className="flex items-center gap-2 font-bold text-sm text-gray-800 mb-4">
        <span className="text-purple-500">{icon}</span>
        {title}
      </div>
      {children}
    </section>
  );
}

function TextRecord({ title, value }: { title: string; value: string | null }) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-gray-500 mb-1">{title}</div>
      <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{value?.trim() || '기록 없음'}</div>
    </div>
  );
}

function TagGroup({ title, values }: { title: string; values: string[] | null }) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-gray-500 mb-2">{title}</div>
      {values && values.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {values.map((value) => (
            <span key={value} className="text-[11px] font-semibold text-purple-800 bg-purple-100 border border-[rgb(185,166,255)] px-2.5 py-1.5 rounded-lg">
              {getTypeLabel(value)}
            </span>
          ))}
        </div>
      ) : (
        <div className="text-xs text-gray-500">선택된 영역 없음</div>
      )}
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center text-center py-12 gap-3">
      <div className="items-center flex justify-center w-16 h-16 bg-purple-100 rounded-2xl">
        <ClipboardList className="h-8 w-8 text-purple-400" strokeWidth={1.5} />
      </div>
      <div className="font-semibold text-sm text-gray-700">{message}</div>
    </div>
  );
}

function getTypeLabel(type: string) {
  return TYPE_LABELS[type] ?? type;
}

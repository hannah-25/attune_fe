import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AlertCircle, ChevronRight, Pill } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { ScrollArea } from '@/components/ScrollArea';
import {
  getReport,
  type MedicationReport,
  type ReportSnapshot,
  type AiResult,
  type AiInsight,
} from '@/api/medicationAnalysis';

type RouteState = { reportId?: number } | null;

const SHADOW = 'shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px]';

const CONFIDENCE_LABEL: Record<AiInsight['confidence'], string> = {
  HIGH: '높음', MEDIUM: '중간', LOW: '낮음',
};
const CONFIDENCE_COLOR: Record<AiInsight['confidence'], string> = {
  HIGH: 'bg-purple-100 text-purple-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  LOW: 'bg-gray-100 text-gray-500',
};
const DATA_CONFIDENCE_STYLE: Record<ReportSnapshot['dataQuality']['confidence'], { bg: string; text: string; label: string }> = {
  HIGH: { bg: 'bg-purple-50 border-purple-100', text: 'text-purple-700', label: '높음' },
  MEDIUM: { bg: 'bg-yellow-50 border-yellow-100', text: 'text-yellow-700', label: '보통' },
  LOW: { bg: 'bg-orange-50 border-orange-100', text: 'text-orange-700', label: '낮음' },
};

const CHANGE_TYPE_LABEL: Record<string, string> = {
  ADD: '추가',
  REMOVE: '중단',
  DOSAGE_CHANGE: '용량 변경',
};

const DAY_GROUP_STYLE: Record<string, string> = {
  TAKEN_DAY: 'bg-purple-400',
  SKIPPED_ONLY_DAY: 'bg-red-300',
  UNRECORDED_DAY: 'bg-gray-200',
};

export default function ReportMonthlyDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as RouteState;
  const reportId = state?.reportId;

  const [report, setReport] = useState<MedicationReport | null>(null);
  const [snapshot, setSnapshot] = useState<ReportSnapshot | null>(null);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!reportId) {
      navigate('/report', { replace: true });
      return;
    }

    let cancelled = false;
    let timerId: ReturnType<typeof setTimeout> | null = null;
    const load = async () => {
      try {
        const r = await getReport(reportId);
        if (cancelled) return;
        setReport(r);
        try { setSnapshot(JSON.parse(r.snapshotJson) as ReportSnapshot); } catch {}
        if (r.aiResultJson) {
          try { setAiResult(JSON.parse(r.aiResultJson) as AiResult); } catch {}
        }
        setLoading(false);
        if (r.status === 'PENDING') {
          timerId = setTimeout(() => { if (!cancelled) load(); }, 3000);
        }
      } catch {
        if (!cancelled) {
          setError('리포트를 불러오지 못했습니다.');
          setLoading(false);
        }
      }
    };
    load();
    return () => { cancelled = true; if (timerId) clearTimeout(timerId); };
  }, [reportId]);

  const title = report
    ? `${report.periodStart.slice(5).replace('-', '/')} ~ ${report.periodEnd.slice(5).replace('-', '/')}`
    : '리포트';

  if (loading) {
    return (
      <div className="w-full h-full bg-gray-50 flex flex-col" style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
        <TopBar title={title} left={<NavBackButton onClick={() => navigate(-1)} />} />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-gray-400 text-sm">불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="w-full h-full bg-gray-50 flex flex-col" style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
        <TopBar title="리포트" left={<NavBackButton onClick={() => navigate(-1)} />} />
        <div className="flex flex-1 items-center justify-center flex-col gap-2 px-8 text-center">
          <AlertCircle className="w-8 h-8 text-gray-300" strokeWidth={1.5} />
          <div className="text-gray-500 text-sm">{error || '리포트를 찾을 수 없습니다.'}</div>
        </div>
      </div>
    );
  }

  const adherence = snapshot?.adherenceSummary;
  const dataQuality = snapshot?.dataQuality;
  const dailyStatuses = snapshot?.dailyMedicationStatuses ?? [];
  const sideEffects = snapshot?.sideEffects ?? [];
  const medicationChanges = snapshot?.medicationChanges ?? [];
  const confidenceStyle = dataQuality ? DATA_CONFIDENCE_STYLE[dataQuality.confidence] : null;

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title={title} left={<NavBackButton onClick={() => navigate(-1)} />} />
        <ScrollArea className="flex flex-col gap-3 pt-2">

          {report.outdated && (
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2.5">
              <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" strokeWidth={2} />
              <span className="text-xs text-yellow-700">리포트 생성 후 원본 기록이 변경되었습니다.</span>
            </div>
          )}

          {report.status === 'PENDING' && (
            <div className={`bg-purple-50 ${SHADOW} p-4 rounded-[1.375rem] text-center`}>
              <div className="font-bold mb-1">리포트 생성 중</div>
              <div className="text-xs text-gray-500">잠시 후 자동으로 업데이트됩니다.</div>
            </div>
          )}

          {/* 데이터 품질 */}
          {dataQuality && confidenceStyle && (
            <div className={`border ${confidenceStyle.bg} ${SHADOW} p-4 rounded-[1.375rem]`}>
              <div className="flex items-center justify-between mb-1">
                <div className="font-bold text-gray-700 text-xs">분석 신뢰도</div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${confidenceStyle.bg} ${confidenceStyle.text} border`}>
                  {confidenceStyle.label}
                </span>
              </div>
              <div className="text-xs text-gray-500">기록일 {dataQuality.recordedDays}일</div>
              {dataQuality.confidence !== 'HIGH' && dataQuality.limitations.length > 0 && (
                <div className="mt-2 flex flex-col gap-1">
                  {dataQuality.limitations.slice(0, 3).map((lim, i) => (
                    <div key={i} className="text-[11px] text-gray-400 leading-relaxed">· {lim}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 복약 요약 */}
          {adherence && (
            <div className={`bg-purple-100 ${SHADOW} p-4 rounded-[1.625rem]`}>
              <div className="font-bold text-gray-600 mb-1">복약 요약</div>
              <div className="font-extrabold mt-1 text-2xl leading-tight" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                {adherence.adherenceRate.toFixed(0)}%
                <span className="text-sm font-semibold text-gray-500 ml-2">복용률</span>
              </div>
              <div className="flex mt-3 gap-1.5 flex-wrap">
                <Chip>기록률 {adherence.recordingRate.toFixed(0)}%</Chip>
                <Chip>복용 {adherence.takenCount}회</Chip>
                <Chip>건너뜀 {adherence.skippedCount}회</Chip>
                <Chip>미기록 {adherence.unrecordedCount}회</Chip>
              </div>
            </div>
          )}

          {/* 일별 복약 현황 */}
          {dailyStatuses.length > 0 && (
            <div className={`bg-white ${SHADOW} p-4 rounded-[1.375rem]`}>
              <div className="font-bold mb-3">일별 복약 현황</div>
              <div className="flex flex-wrap gap-1.5">
                {dailyStatuses.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date.slice(5).replace('-', '/')} · ${day.group === 'TAKEN_DAY' ? '복용' : day.group === 'SKIPPED_ONLY_DAY' ? '건너뜀' : '미기록'}`}
                    className={`w-7 h-7 rounded-lg flex items-end justify-center pb-[3px] ${DAY_GROUP_STYLE[day.group] ?? 'bg-gray-200'}`}
                  >
                    <span className="text-[9px] font-bold text-white/80 leading-none">{day.date.slice(8)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <LegendDot color="bg-purple-400" label="복용" />
                <LegendDot color="bg-red-300" label="건너뜀" />
                <LegendDot color="bg-gray-200" label="미기록" textClass="text-gray-500" />
              </div>
            </div>
          )}

          {/* 부작용 */}
          {sideEffects.length > 0 && (
            <div className={`bg-white ${SHADOW} p-4 rounded-[1.375rem]`}>
              <div className="font-bold mb-3">부작용 패턴</div>
              <div className="flex flex-col gap-2.5">
                {sideEffects.map((se) => (
                  <div key={se.tagId} className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">{se.tagName}</div>
                      {se.peakWindow && (
                        <div className="text-xs text-gray-400 mt-0.5">{se.peakWindow} 주로 발생</div>
                      )}
                    </div>
                    <div className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                      {se.recordedDays}일
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 복약 변경 이력 */}
          {medicationChanges.length > 0 && (
            <div className={`bg-white ${SHADOW} p-4 rounded-[1.375rem]`}>
              <div className="font-bold mb-3">복약 변경 이력</div>
              <div className="flex flex-col gap-2.5">
                {medicationChanges.map((change, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-50 rounded-xl shrink-0 mt-0.5">
                      <Pill className="w-4 h-4 text-purple-500" strokeWidth={2} />
                    </div>
                    <div className="grow min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-gray-800">{change.medicationName}</span>
                        <span className="text-xs text-gray-400">{change.dosage}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                          {CHANGE_TYPE_LABEL[change.changeType] ?? change.changeType}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {change.changeDate.slice(5).replace('-', '/')}
                        {!change.confirmed && ' · 미확정'}
                      </div>
                      {!change.beforeAfterComparison.eligible && change.beforeAfterComparison.ineligibleReason && (
                        <div className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                          {change.beforeAfterComparison.ineligibleReason}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI 분석 */}
          {aiResult && (
            <>
              <div className={`bg-white ${SHADOW} p-[14px] rounded-[1.375rem]`}>
                <div className="items-center flex mb-2 gap-1.5">
                  <div className="items-center flex font-extrabold justify-center w-[22px] h-[22px] bg-[rgb(31,27,46)] text-white rounded-[0.6875rem] text-[10px]">AI</div>
                  <div className="font-bold">AI 분석 요약</div>
                </div>
                <div className="text-gray-800 leading-[20.15px]">{aiResult.summary}</div>
              </div>

              {aiResult.insights.length > 0 && (
                <div className={`bg-white ${SHADOW} p-[14px] rounded-[1.375rem]`}>
                  <div className="font-bold mb-3">인사이트</div>
                  <div className="flex flex-col gap-3">
                    {aiResult.insights.map((insight, i) => (
                      <div key={i} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-semibold text-gray-400">{insight.category}</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${CONFIDENCE_COLOR[insight.confidence]}`}>
                            {CONFIDENCE_LABEL[insight.confidence]}
                          </span>
                        </div>
                        <div className="font-bold text-sm mb-1">{insight.title}</div>
                        <div className="text-gray-700 leading-relaxed text-xs">{insight.description}</div>
                        {insight.limitation && (
                          <div className="text-gray-400 text-[10px] mt-1">{insight.limitation}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {aiResult.consultationQuestions.length > 0 && (
                <div className={`bg-white ${SHADOW} p-[14px] rounded-[1.375rem]`}>
                  <div className="font-bold mb-2">다음 상담에서 물어볼 것</div>
                  <div className="flex flex-col gap-2">
                    {aiResult.consultationQuestions.map((q, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 text-purple-400 mt-[2px] shrink-0" strokeWidth={2.5} />
                        <span className="text-gray-700 leading-relaxed text-xs">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-purple-50 px-3 py-2.5 rounded-xl">
                <p className="text-[11px] text-gray-500 leading-relaxed">{aiResult.disclaimer}</p>
              </div>
            </>
          )}

          {report.status === 'FAILED' && (
            <div className={`bg-white ${SHADOW} p-4 rounded-[1.375rem] text-center`}>
              <div className="font-bold text-gray-600 mb-1">AI 분석 실패</div>
              <div className="text-xs text-gray-400">AI 분석을 완료하지 못했습니다.</div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-50 text-purple-700 text-xs tracking-tight py-1 px-2.5 rounded-full">
      {children}
    </div>
  );
}

function LegendDot({ color, label, textClass = 'text-gray-400' }: { color: string; label: string; textClass?: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
      <span className={`text-[11px] ${textClass}`}>{label}</span>
    </div>
  );
}

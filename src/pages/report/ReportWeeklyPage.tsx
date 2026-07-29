import React, { useEffect, useMemo, useState } from 'react';
import { BarChart3, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { parseServerDateTime } from '@/lib/date';
import {
  getAvailability,
  getSummary,
  getReports,
  createReport,
  giveAiConsent,
  revokeAiConsent,
  type AvailabilityResult,
  type SummaryStats,
  type MedicationReport,
} from '@/api/medicationAnalysis';
import { ApiError } from '@/api/client';

type Preset = 7 | 30 | 90;

function toDateKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

function getPeriodDates(days: Preset): { startDate: string; endDate: string } {
  const end = new Date();
  end.setDate(end.getDate() - 1);
  const start = new Date(end);
  start.setDate(start.getDate() - days + 1);
  return { startDate: toDateKey(start), endDate: toDateKey(end) };
}

function formatPeriodLabel(start: string, end: string) {
  const fmt = (s: string) => {
    const [, m, d] = s.split('-');
    return `${Number(m)}/${Number(d)}`;
  };
  return `${fmt(start)} ~ ${fmt(end)}`;
}

function formatReportDate(dateStr: string) {
  const d = parseServerDateTime(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

const SHADOW = 'shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px]';

export default function ReportWeeklyPage() {
  const navigate = useNavigate();
  const [preset, setPreset] = useState<Preset>(30);
  const [summary, setSummary] = useState<SummaryStats | null>(null);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [reports, setReports] = useState<MedicationReport[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [includeAi, setIncludeAi] = useState(true);
  const [generateError, setGenerateError] = useState('');

  const { startDate, endDate } = useMemo(() => getPeriodDates(preset), [preset]);

  useEffect(() => {
    let ignore = false;
    setStatsLoading(true);
    setSummary(null);
    setAvailability(null);
    Promise.all([
      getAvailability(startDate, endDate).catch(() => null),
      getSummary(startDate, endDate).catch(() => null),
    ]).then(([avail, sum]) => {
      if (ignore) return;
      setAvailability(avail);
      setSummary(sum);
      setStatsLoading(false);
    });
    return () => { ignore = true; };
  }, [startDate, endDate]);

  useEffect(() => {
    getReports()
      .then((reps) => setReports(Array.isArray(reps) ? reps : []))
      .catch(() => {});
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setGenerateError('');
    try {
      if (includeAi) {
        await giveAiConsent();
      } else {
        await revokeAiConsent();
      }
      const report = await createReport({
        periodStart: startDate,
        periodEnd: endDate,
        includeMemoExcerpts: true,
      });
      setReports((prev) => [report, ...prev]);
      navigate('/report/monthly/detail', { state: { reportId: report.reportId } });
    } catch (e) {
      const msg =
        e instanceof ApiError
          ? (e.backendMessage ?? '리포트 생성에 실패했습니다.')
          : '리포트 생성에 실패했습니다.';
      setGenerateError(msg);
      setGenerating(false);
    }
  };

  const recentReports = reports.slice(0, 3);

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <header className="flex min-h-[60px] items-center px-4 py-2 shrink-0">
          <div className="flex flex-col">
            <div className="text-xs font-semibold text-gray-500">복약 분석</div>
            <div className="font-extrabold text-2xl leading-none" style={{ fontFamily: 'NanumSquare, system-ui' }}>
              리포트
            </div>
          </div>
          <div className="grow" />
          <div className="flex gap-1.5">
            {([7, 30, 90] as Preset[]).map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setPreset(days)}
                className={`flex items-center font-semibold whitespace-nowrap border border-black/0 text-xs gap-1.5 tracking-tight py-[7px] px-[11px] rounded-full transition-colors ${preset === days ? 'bg-purple-100 text-purple-800' : 'text-gray-500'}`}
              >
                {days}일
              </button>
            ))}
          </div>
        </header>

        <ScrollArea className="flex flex-col gap-3 pt-2">
          {/* 기간 표시 */}
          <div className="text-xs text-gray-400 font-semibold">{formatPeriodLabel(startDate, endDate)}</div>

          {/* Stats */}
          {statsLoading ? (
            <div className="grid-cols-2 grid gap-2">
              {[0, 1].map((i) => (
                <div key={i} className={`bg-white ${SHADOW} p-3 rounded-2xl h-[80px] animate-pulse`} />
              ))}
            </div>
          ) : summary ? (
            <>
              <div className="grid-cols-2 grid gap-2">
                <StatCard title="복용률" value={`${summary.adherenceRate.toFixed(0)}%`} color="rgb(255, 142, 114)" />
                <StatCard title="기록률" value={`${summary.recordingRate.toFixed(0)}%`} color="rgb(185, 166, 255)" />
              </div>
              <div className={`bg-white ${SHADOW} p-[14px] rounded-[1.375rem]`}>
                <div className="font-bold mb-[10px]">복약 현황</div>
                <div className="flex gap-4 text-xs">
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-gray-400">복용</span>
                    <span className="font-extrabold text-base" style={{ fontFamily: 'NanumSquare, system-ui' }}>{summary.takenCount}<span className="text-xs font-semibold ml-0.5">회</span></span>
                  </div>
                  <div className="w-px self-stretch bg-gray-100" />
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-gray-400">건너뜀</span>
                    <span className="font-extrabold text-base" style={{ fontFamily: 'NanumSquare, system-ui' }}>{summary.skippedCount}<span className="text-xs font-semibold ml-0.5">회</span></span>
                  </div>
                  <div className="w-px self-stretch bg-gray-100" />
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-gray-400">미기록</span>
                    <span className="font-extrabold text-base" style={{ fontFamily: 'NanumSquare, system-ui' }}>{summary.unrecordedCount}<span className="text-xs font-semibold ml-0.5">회</span></span>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {/* 리포트 생성 */}
          {!statsLoading && (
            availability?.available ? (
              <div className={`bg-purple-50 ${SHADOW} p-4 rounded-[1.375rem]`}>
                <div className="font-bold mb-[10px]">리포트 생성</div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={includeAi}
                  className="flex items-center justify-between mb-3 w-full"
                  onClick={() => setIncludeAi((v) => !v)}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-[22px] h-[22px] bg-[rgb(31,27,46)] text-white rounded-[0.6875rem] text-[10px] font-extrabold">AI</div>
                    <span className="font-semibold text-gray-800">AI 분석 포함</span>
                  </div>
                  <div className={`w-[38px] h-[22px] rounded-full transition-colors flex items-center px-[3px] ${includeAi ? 'bg-purple-500 justify-end' : 'bg-gray-300 justify-start'}`}>
                    <div className="w-[16px] h-[16px] bg-white rounded-full shadow-sm" />
                  </div>
                </button>
                {includeAi && (
                  <div className="bg-white/60 rounded-xl p-2.5 mb-3 flex gap-1.5">
                    <Info className="w-3 h-3 text-purple-400 shrink-0 mt-[1px]" strokeWidth={2.5} />
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      AI 분석은 패턴 관찰이며 의료 진단이 아닙니다. 개인정보 처리에 동의 후 생성됩니다.
                    </p>
                  </div>
                )}
                {generateError ? (
                  <div className="text-xs text-red-500 mb-2">{generateError}</div>
                ) : null}
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex w-full items-center justify-center h-[46px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white font-bold text-base rounded-[1.5625rem] disabled:opacity-50 transition-opacity"
                >
                  {generating ? '생성 중...' : '리포트 생성'}
                </button>
              </div>
            ) : availability && !availability.available ? (
              <div className={`bg-white ${SHADOW} p-4 rounded-[1.375rem]`}>
                <div className="font-bold mb-1">리포트 생성 불가</div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {availability.unavailableReasons.length > 0
                    ? availability.unavailableReasons.join(' · ')
                    : `기간 내 기록일이 부족합니다. (현재 ${availability.recordedDays}일 기록)`}
                </p>
              </div>
            ) : null
          )}

          {/* 지난 리포트 */}
          {recentReports.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-[6px]">
                <div className="font-bold text-gray-900">지난 리포트</div>
                {reports.length > 3 && (
                  <button
                    type="button"
                    onClick={() => navigate('/report/monthly')}
                    className="flex items-center text-xs text-purple-600 font-semibold gap-0.5"
                  >
                    모두 보기 <ChevronRight className="w-3 h-3" strokeWidth={2.5} />
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {recentReports.map((r) => (
                  <button
                    key={r.reportId}
                    type="button"
                    onClick={() => navigate('/report/monthly/detail', { state: { reportId: r.reportId } })}
                    className={`bg-white ${SHADOW} p-3 rounded-[1.125rem] text-left w-full`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-2xl shrink-0">
                        <BarChart3 className="w-5 h-5 text-purple-500" strokeWidth={2.4} />
                      </div>
                      <div className="grow basis-[0%] min-w-0">
                        <div className="font-bold text-sm">{r.periodStart} ~ {r.periodEnd}</div>
                        <div className="text-xs text-gray-400 mt-[1px]">
                          {r.status === 'COMPLETED' ? '완료' : r.status === 'PENDING' ? '생성 중' : r.status === 'FAILED' ? '실패' : '완료'}
                          {r.outdated ? ' · 원본 변경됨' : ''}
                          {' · '}{formatReportDate(r.generatedAt)}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" strokeWidth={2.5} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
        <TabBar active="리포트" />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] p-3 rounded-2xl">
      <div className="font-bold text-gray-600 text-xs">{title}</div>
      <div className="items-baseline flex mt-1 gap-1.5">
        <div className="font-extrabold text-2xl" style={{ fontFamily: 'NanumSquare, system-ui', color }}>
          {value}
        </div>
      </div>
    </div>
  );
}

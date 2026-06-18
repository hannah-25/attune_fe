import React, { useEffect, useState } from 'react';
import { BarChart3, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { getReports, type MedicationReport } from '@/api/medicationAnalysis';

const SHADOW = 'shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px]';

const STATUS_LABEL: Record<string, string> = {
  COMPLETED: '완료',
  PENDING: '생성 중',
  FAILED: '실패',
  OUTDATED: '변경됨',
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function ReportMonthlyListPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<MedicationReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports()
      .then((reps) => {
        setReports(Array.isArray(reps) ? reps : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="전체 리포트" left={<NavBackButton onClick={() => navigate(-1)} />} />
        <ScrollArea className="flex flex-col gap-2.5">
          {loading ? (
            [0, 1, 2].map((i) => (
              <div key={i} className={`bg-white ${SHADOW} p-[14px] rounded-[1.375rem] h-[70px] animate-pulse`} />
            ))
          ) : reports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <BarChart3 className="w-10 h-10 text-gray-200 mb-3" strokeWidth={1.5} />
              <div className="text-gray-400 text-sm">생성된 리포트가 없습니다</div>
            </div>
          ) : (
            reports.map((r) => (
              <button
                key={r.reportId}
                type="button"
                onClick={() => navigate('/report/monthly/detail', { state: { reportId: r.reportId } })}
                className={`bg-white ${SHADOW} p-[14px] rounded-[1.375rem] text-left w-full`}
              >
                <div className="items-center flex gap-2.5">
                  <div className="items-center flex justify-center w-11 h-11 bg-purple-100 rounded-[0.875rem] shrink-0">
                    <BarChart3 className="w-5 h-5 text-purple-500" strokeWidth={2.4} />
                  </div>
                  <div className="grow basis-[0%] min-w-0">
                    <div className="font-extrabold text-base" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                      {r.periodStart} ~ {r.periodEnd}
                    </div>
                    <div className="mt-[2px] text-gray-500 text-xs">
                      {STATUS_LABEL[r.status] ?? r.status}
                      {r.outdated ? ' · 원본 변경됨' : ''}
                      {' · '}{formatDate(r.generatedAt)}
                    </div>
                  </div>
                  <div className="items-center flex justify-center w-8 h-8 bg-white shadow-[rgba(0,0,0,0.06)_0px_1px_4px_0px] rounded-2xl shrink-0">
                    <ChevronRight className="w-3 h-3 text-gray-600" strokeWidth={2.5} />
                  </div>
                </div>
              </button>
            ))
          )}
        </ScrollArea>
        <TabBar active="리포트" />
      </div>
    </div>
  );
}

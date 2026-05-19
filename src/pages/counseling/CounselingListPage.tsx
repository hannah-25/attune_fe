import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { TopBar } from '@/components/TopBar';
import { getConsultations } from '@/api/consultation';

type ConsultationListItem = {
  consultationId?: number;
  consultationDate: string;
  place: string;
  doctorName: string;
  summaryReport?: string;
  prescriptionNote?: string;
};

export default function CounselingListPage() {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState<ConsultationListItem[]>([]);
  const [error, setError] = useState('');
  const now = new Date();

  useEffect(() => {
    let ignore = false;
    const start = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());

    getConsultations({ startDate: toDateKey(start), endDate: toDateKey(end) })
      .then((response) => {
        if (!ignore) setConsultations(extractConsultations(response));
      })
      .catch(() => {
        if (!ignore) setError('상담 일정을 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, []);

  const nextConsultation = useMemo(
    () => consultations.filter((item) => new Date(item.consultationDate) >= now).sort((a, b) => a.consultationDate.localeCompare(b.consultationDate))[0],
    [consultations],
  );
  const pastConsultations = useMemo(
    () => consultations.filter((item) => new Date(item.consultationDate) < now).sort((a, b) => b.consultationDate.localeCompare(a.consultationDate)),
    [consultations],
  );

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="상담 일정" reserveLeft reserveRight />
        <ScrollArea className="flex flex-col gap-3">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="flex items-center gap-4">
              <div className="shrink-0 text-center">
                <div className="text-[10px] text-purple-700 font-semibold">다음 상담까지</div>
                <div className="font-extrabold text-4xl leading-none text-gray-700 mt-1" style={{ fontFamily: "NanumSquare, system-ui" }}>{nextConsultation ? `D-${getDDay(nextConsultation.consultationDate)}` : '-'}</div>
              </div>
              <div className="w-px self-stretch bg-purple-200" />
              <div className="min-w-0">
                <div className="font-bold text-base text-gray-900">{nextConsultation?.place ?? '예정된 상담이 없어요'}</div>
                <div className="text-sm text-gray-500 mt-0.5">{nextConsultation?.doctorName ?? '-'}</div>
                <div className="text-xs text-purple-700 font-semibold mt-1">{nextConsultation ? formatConsultationDate(nextConsultation.consultationDate) : '-'}</div>
              </div>
            </div>
            <div className="flex mt-4 gap-2">
              <button
                type="button"
                onClick={() => navigate('/counseling/prepare')}
                className="flex flex-1 items-center justify-center h-11 bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white font-bold rounded-[1.125rem]"
              >
                상담 준비 시작
              </button>
              <button
                type="button"
                className="flex items-center justify-center h-11 border border-gray-300 text-gray-500 font-semibold px-5 rounded-[1.125rem]"
              >
                일정 변경
              </button>
            </div>
          </div>
          <div className="font-bold text-gray-600 pt-1 pr-1 pb-0 pl-1">
            지난 상담
          </div>
          {pastConsultations.map((consultation) => (
            <div key={`${consultation.consultationDate}-${consultation.place}`} className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
              <div className="mb-[6px]">
                <div className="font-bold text-gray-600">{formatConsultationDate(consultation.consultationDate)}</div>
              </div>
              <div className="font-semibold">{consultation.place}</div>
              <div className="mt-1 text-gray-600">{consultation.prescriptionNote || consultation.summaryReport || consultation.doctorName}</div>
            </div>
          ))}
        </ScrollArea>
        <TabBar />
      </div>
    </div>
  );
}

function extractConsultations(response: unknown): ConsultationListItem[] {
  if (Array.isArray(response)) return response as ConsultationListItem[];
  if (response && typeof response === 'object' && 'consultations' in response && Array.isArray((response as { consultations: unknown }).consultations)) {
    return (response as { consultations: ConsultationListItem[] }).consultations;
  }
  return [];
}

function getDDay(value: string) {
  const target = new Date(value);
  const today = new Date();
  const diff = target.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / 86400000));
}

function formatConsultationDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${weekdays[date.getDay()]} · ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronDown, Plus } from 'lucide-react';
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

const AddButton = ({ onClick }: { onClick: () => void }) => (
  <button type="button" onClick={onClick} className="flex items-center justify-center w-11 h-11">
    <div className="flex items-center justify-center w-9 h-9 bg-purple-100 rounded-[1.125rem]">
      <Plus className="h-4 w-4 text-purple-600" strokeWidth={3} />
    </div>
  </button>
);

export default function CounselingListPage() {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState<ConsultationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pastExpanded, setPastExpanded] = useState(true);
  const [retryKey, setRetryKey] = useState(0);
  const now = new Date();

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError('');
    const start = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());

    getConsultations({ startDate: toDateKey(start), endDate: toDateKey(end) })
      .then((response) => {
        if (!ignore) {
          setConsultations(extractConsultations(response));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load consultations:', err);
        if (!ignore) {
          setError('상담 일정을 불러오지 못했습니다.');
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [retryKey]);

  const nextConsultation = useMemo(
    () => consultations.filter((item) => new Date(item.consultationDate) >= now).sort((a, b) => a.consultationDate.localeCompare(b.consultationDate))[0],
    [consultations],
  );
  const pastConsultations = useMemo(
    () => consultations.filter((item) => new Date(item.consultationDate) < now).sort((a, b) => b.consultationDate.localeCompare(a.consultationDate)),
    [consultations],
  );

  const pageShell = (content: React.ReactNode) => (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="상담 일정"
          reserveLeft
          right={<AddButton onClick={() => navigate('/counseling/add')} />}
        />
        {content}
        <TabBar />
      </div>
    </div>
  );

  if (loading) return pageShell(<div />);

  if (error) return pageShell(
    <ScrollArea className="flex flex-col items-center text-center pt-12 px-6">
      <div className="flex items-center justify-center w-28 h-28 bg-red-50 rounded-[2rem] shrink-0 mb-6">
        <CalendarDays className="w-12 h-12 text-red-300" strokeWidth={1.6} />
      </div>
      <div className="font-extrabold text-2xl text-gray-800 leading-snug mb-3" style={{ fontFamily: 'NanumSquare, system-ui' }}>
        불러오지 못했어요
      </div>
      <p className="text-gray-500 leading-relaxed max-w-[240px] mb-8">
        {error}
      </p>
      <button
        type="button"
        onClick={() => setRetryKey(k => k + 1)}
        className="flex items-center justify-center h-[50px] min-w-[200px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white font-bold text-base px-5 rounded-[1.5625rem]"
      >
        다시 시도
      </button>
    </ScrollArea>
  );

  // 상담 이력 자체가 없는 첫 진입
  if (consultations.length === 0) return pageShell(
    <ScrollArea className="flex flex-col items-center text-center pt-12 px-6">
      <div className="flex items-center justify-center w-28 h-28 bg-purple-100 rounded-[2rem] shrink-0 mb-6">
        <CalendarDays className="w-12 h-12 text-purple-500" strokeWidth={1.6} />
      </div>
      <div className="font-extrabold text-2xl text-gray-800 leading-snug mb-3" style={{ fontFamily: 'NanumSquare, system-ui' }}>
        아직 상담 일정이 없어요
      </div>
      <p className="text-gray-500 leading-relaxed max-w-[240px] mb-8">
        첫 상담 일정을 추가하면<br />다음 상담을 준비하는 데 도움을 드려요
      </p>
      <button
        type="button"
        onClick={() => navigate('/counseling/add')}
        className="flex items-center justify-center h-[50px] min-w-[200px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white font-bold text-base px-5 rounded-[1.5625rem]"
      >
        상담 추가하기
      </button>
    </ScrollArea>
  );

  return pageShell(
    <ScrollArea className="flex flex-col gap-3">
      <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
        {nextConsultation ? (
          <>
            <div className="flex items-center gap-4">
              <div className="shrink-0 text-center">
                <div className="text-[10px] text-purple-700 font-semibold">다음 상담까지</div>
                <div className="font-extrabold text-4xl leading-none text-gray-700 mt-1" style={{ fontFamily: "NanumSquare, system-ui" }}>{`D-${getDDay(nextConsultation.consultationDate)}`}</div>
              </div>
              <div className="w-px self-stretch bg-purple-200" />
              <div className="min-w-0">
                <div className="font-bold text-base text-gray-900">{nextConsultation.place}</div>
                <div className="text-sm text-gray-500 mt-0.5">{nextConsultation.doctorName}</div>
                <div className="text-xs text-purple-700 font-semibold mt-1">{formatConsultationDate(nextConsultation.consultationDate)}</div>
              </div>
            </div>
            <div className="flex mt-4 gap-2">
              <button
                type="button"
                onClick={() => navigate('/counseling/prepare', {
                  state: {
                    consultationId: nextConsultation.consultationId,
                    consultationDate: nextConsultation.consultationDate,
                    place: nextConsultation.place,
                    doctorName: nextConsultation.doctorName,
                  },
                })}
                className="flex flex-1 items-center justify-center h-11 bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white font-bold rounded-[1.125rem]"
              >
                상담 준비 시작
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate('/counseling/add', {
                    state: {
                      editMode: true,
                      consultationId: nextConsultation.consultationId,
                      consultationDate: nextConsultation.consultationDate,
                      place: nextConsultation.place,
                      doctorName: nextConsultation.doctorName,
                    },
                  })
                }
                className="flex items-center justify-center h-11 border border-gray-300 text-gray-500 font-semibold px-5 rounded-[1.125rem]"
              >
                일정 변경
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="text-center">
              <div className="font-bold text-gray-700">예정된 상담이 없어요</div>
              <div className="text-xs text-purple-700 mt-1">다음 상담 일정을 추가해보세요</div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/counseling/add')}
              className="flex w-full items-center justify-center h-11 bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white font-bold rounded-[1.125rem]"
            >
              상담 추가하기
            </button>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => setPastExpanded(v => !v)}
        className="flex items-center justify-between pt-1 pr-1 pb-0 pl-1"
      >
        <span className="font-bold text-gray-600">지난 상담</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${pastExpanded ? '' : '-rotate-90'}`}
          strokeWidth={2.5}
        />
      </button>
      {pastExpanded && pastConsultations.map((consultation) => (
        <button
          key={consultation.consultationId ?? `${consultation.consultationDate}-${consultation.place}`}
          type="button"
          onClick={() => consultation.consultationId && navigate(`/counseling/result?id=${consultation.consultationId}`)}
          className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem] text-left w-full"
        >
          <div className="mb-[6px]">
            <div className="font-bold text-gray-600">{formatConsultationDate(consultation.consultationDate)}</div>
          </div>
          <div className="font-semibold">{consultation.place}</div>
          <div className="mt-1 text-gray-600">{formatPrescriptionNote(consultation.prescriptionNote) || consultation.summaryReport || consultation.doctorName}</div>
        </button>
      ))}
    </ScrollArea>
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

type PrescriptionEntry = { name: string; amount: number | null; prevAmount: number | null; status: string };

function formatPrescriptionNote(note?: string): string {
  if (!note) return '';
  try {
    const entries = JSON.parse(note) as PrescriptionEntry[];
    if (!Array.isArray(entries) || entries.length === 0) return note;
    return entries
      .map(e => `${e.name}${e.amount != null ? ` ${e.amount}mg` : ''} (${e.status})`)
      .join(' · ');
  } catch {
    return note;
  }
}

function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

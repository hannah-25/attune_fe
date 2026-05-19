import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronUp, Clock, Pill, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { mockMedications, mockNextDose, mockPastMedications } from '@/mocks/medication.mock';

const INITIAL_SECONDS = 2 * 60 + 14;
const SNOOZE_SECONDS = 10 * 60;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function MedicationListPage() {
  const navigate = useNavigate();
  const [pastOpen, setPastOpen] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [taken, setTaken] = useState(false);
  const [medications, setMedications] = useState(mockMedications);

  useEffect(() => {
    if (taken || secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [taken, secondsLeft]);

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="복용 중인 약"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
          right={<HeaderIconButton icon={<Plus className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} onClick={() => navigate('/medication/add')} />}
        />
        <ScrollArea className="flex flex-col gap-3 pt-1">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="font-bold text-gray-600 text-xs">{taken ? '복용 완료' : '다음 복용까지'}</div>
            <div className="items-baseline flex mt-1 gap-1.5">
              <div className="font-extrabold text-4xl transition-all" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                {taken ? '완료' : formatTime(secondsLeft)}
              </div>
              {!taken && <div className="font-bold text-gray-500">· {mockNextDose.name} · {mockNextDose.time}</div>}
            </div>
            <div className="flex mt-3 gap-1.5">
              <button
                type="button"
                onClick={() => setTaken(true)}
                disabled={taken}
                className="items-center flex grow font-bold justify-center h-9 bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem] disabled:opacity-50 transition-opacity"
              >
                <span className="block">{taken ? '복용 완료됨' : '지금 복용'}</span>
              </button>
              {!taken && (
                <button
                  type="button"
                  onClick={() => setSecondsLeft((s) => s + SNOOZE_SECONDS)}
                  className="items-center flex grow font-bold justify-center h-9 border-gray-900 border basis-[0%] tracking-tight min-h-11 pt-0 pr-[18px] pb-0 pl-[18px] rounded-[1.125rem]"
                >
                  <span className="block">10분 미루기</span>
                </button>
              )}
            </div>
          </div>
          <div className="font-bold text-gray-600 pt-1 pr-1 pb-0 pl-1">복용 중 ({medications.length})</div>
          {medications.map((med) => (
            <div key={med.id} className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
              <div className="items-center flex gap-2.5">
                <div className={`items-center flex justify-center w-[38px] h-[38px] ${med.bg} rounded-xl`}>
                  <Pill className="w-[18px] h-[18px] text-white" strokeWidth={2.4} />
                </div>
                <div className="grow basis-[0%]">
                  <div className="font-bold text-sm">{med.name}</div>
                  <div className="text-gray-600 text-xs">{med.detail}</div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={med.active}
                  aria-label={`${med.name} 복용 활성화`}
                  onClick={() => setMedications((current) => current.map((item) => item.id === med.id ? { ...item, active: !item.active } : item))}
                  className={`relative w-[38px] h-[22px] shrink-0 transition-colors rounded-[0.6875rem] ${med.active ? (med.id === 1 ? 'bg-purple-300' : 'bg-purple-500') : 'bg-gray-200'}`}
                >
                  <span className={`absolute left-[2px] w-[18px] h-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] transition-transform rounded-[0.5625rem] ${med.active ? 'translate-x-[16px]' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className="items-center flex mt-3 bg-gray-100 text-gray-800 gap-1.5 pt-2 pr-[10px] pb-2 pl-[10px] rounded-xl">
                <Clock className="w-[11px] h-[11px] text-gray-600" strokeWidth={2.5} />
                {med.schedule}
              </div>
            </div>
          ))}
          <button type="button" onClick={() => setPastOpen((o) => !o)} className="items-center flex w-full text-left pt-2 pr-1 pb-0 pl-1 gap-1">
            <div className="font-bold text-gray-600 grow">지난 약 ({mockPastMedications.length})</div>
            {pastOpen ? <ChevronUp className="w-4 h-4 text-gray-400" strokeWidth={2.5} /> : <ChevronDown className="w-4 h-4 text-gray-400" strokeWidth={2.5} />}
          </button>
          {pastOpen && mockPastMedications.map((med) => (
            <div key={med.id} className="bg-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
              <div className="items-center flex gap-2.5 opacity-[0.7]">
                <div className="items-center flex justify-center w-[38px] h-[38px] bg-[rgb(208,201,189)] rounded-xl">
                  <Pill className="w-[18px] h-[18px] text-white" strokeWidth={2.4} />
                </div>
                <div className="grow basis-[0%]">
                  <div className="font-bold text-sm">{med.name}</div>
                  <div className="text-gray-600 text-xs">{med.period}</div>
                </div>
                <button type="button" className="items-center flex font-semibold whitespace-nowrap border border-gray-300 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                  <span className="block">이력</span>
                </button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <TabBar active="약" />
      </div>
    </div>
  );
}

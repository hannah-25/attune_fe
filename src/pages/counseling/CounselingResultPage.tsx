import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { mockSession, mockPrescriptions, mockQnA, type PrescriptionStatus } from '@/mocks/counseling.mock';

const SESSION = mockSession;

const STATUS_OPTIONS: PrescriptionStatus[] = ['증량', '감량', '유지'];

const INITIAL_PRESCRIPTIONS = mockPrescriptions;

export default function CounselingResultPage() {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState(INITIAL_PRESCRIPTIONS);
  const [saved, setSaved] = useState(true);

  const updatePrescriptionStatus = (id: string, status: PrescriptionStatus) => {
    setPrescriptions((current) =>
      current.map((prescription) =>
        prescription.id === id ? { ...prescription, status } : prescription,
      ),
    );
    setSaved(false);
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="상담 후 기록"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} onClick={() => navigate(-1)} />}
          right={
            <div className="items-center flex justify-center w-11 h-11">
              {!saved ? (
                <button
                  type="button"
                  onClick={() => setSaved(true)}
                  className="text-xs px-2.5 py-1 rounded-lg font-bold text-white bg-[rgb(31,27,46)] transition-all active:scale-[0.97]"
                >
                  저장
                </button>
              ) : null}
            </div>
          }
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
            <div className="font-bold text-gray-600">
              {SESSION.date} · {SESSION.clinic}
            </div>
            <div className="mt-1">
              {SESSION.duration}
            </div>
          </div>
          <div>
            <div className="font-bold mb-[6px] text-gray-600">
              의사 조언
            </div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
              <div className="text-gray-700 text-sm leading-relaxed">{SESSION.advice}</div>
            </div>
          </div>
          <div>
            <div className="font-bold mb-[6px] text-gray-600">
              처방 변경
            </div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
              {prescriptions.map((prescription, index) => (
                <div
                  key={prescription.id}
                  className={`items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] ${index < prescriptions.length - 1 ? 'border-b' : ''}`}
                  style={index < prescriptions.length - 1 ? { borderBottomColor: "rgb(233, 228, 220)" } : undefined}
                >
                  <div className="w-2 h-2 bg-purple-300 rounded-sm" />
                  <div className="grow basis-[0%]">
                    {prescription.before && prescription.after ? (
                      <>
                        {prescription.name}{' '}
                        <s className="line-through text-gray-500" style={{ textDecoration: "line-through" }}>
                          <span style={{ textDecoration: "none" }}>{prescription.before}</span>
                        </s>
                        {' '}→{' '}
                        <b className="font-bold">{prescription.after}</b>
                      </>
                    ) : (
                      <>
                        {prescription.name} · {prescription.status}
                      </>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {STATUS_OPTIONS.map((status) => {
                      const selected = prescription.status === status;

                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => updatePrescriptionStatus(prescription.id, status)}
                          className={`items-center flex font-semibold whitespace-nowrap border-black/0 border text-xs tracking-tight pt-[7px] pr-[10px] pb-[7px] pl-[10px] rounded-[62.4375rem] transition-all active:scale-[0.97] ${
                            selected
                              ? 'bg-purple-500 text-white'
                              : 'bg-purple-50 text-purple-700'
                          }`}
                        >
                          <span className="block">{status}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold mb-[6px] text-gray-600">
              오늘 받은 답변
            </div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
              {mockQnA.map((item, index) => (
                <div
                  key={item.question}
                  className={`pt-3 pr-[14px] pb-3 pl-[14px] ${index < mockQnA.length - 1 ? 'border-b' : ''}`}
                  style={index < mockQnA.length - 1 ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}
                >
                  <div className="font-bold">Q. {item.question}</div>
                  <div className="mt-1 text-gray-600 leading-normal">{item.answer}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-2xl">
            <div className="items-center flex gap-2">
              <div className="overflow-hidden w-3 h-3">
                <img src="/icons/6cae536aa2417c12c04efccc757fd2895c7958ab.svg" className="block size-full" />
              </div>
              <div className="leading-[18.85px]">
                <b className="font-bold">
                  다음 진료 {SESSION.nextDate}
                </b>
                {' '}알림으로 미리 알려드릴게요
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

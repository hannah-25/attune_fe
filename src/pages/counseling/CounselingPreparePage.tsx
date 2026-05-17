import React, { useState } from 'react';
import { formatUpcomingDateTime } from '@/lib/date';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

const SUMMARY_STATS = { adherence: '88%', emotion: '6.2', mistakes: '7회' };
const SUMMARY_TEXT = '아침 약 복용 후 집중력이 높아지는 패턴이 보여요. 오후 4시 이후 약효 저하와 수면 어려움도 꾸준히 기록되었어요.';
const QUESTIONS = [
  { text: '아침 식욕이 너무 없어요. 다른 약으로 바꿔야 할까요?', checked: true },
  { text: '오후 4시 이후 약효가 빨리 떨어지는 느낌이에요', checked: true },
  { text: '수면제와 함께 복용해도 괜찮을까요?', checked: false },
];

const nextAppointment = new Date();
nextAppointment.setDate(nextAppointment.getDate() + 7);
nextAppointment.setHours(14, 0, 0, 0);

export default function CounselingPreparePage() {
  const [goal, setGoal] = useState('');
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="상담 전 준비"
          left={<HeaderIconButton src="/icons/a7a5bb7f1924955f362f7eae70db182206a69aa8.svg" />}
          right={
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="font-bold text-white bg-purple-500 px-3 py-1 rounded-lg">저장</div>
              </div>
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
              {QUESTIONS.map((q, idx) => (
                <div
                  key={idx}
                  className={`items-start flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] ${idx < QUESTIONS.length - 1 ? 'border-b' : ''}`}
                  style={idx < QUESTIONS.length - 1 ? { borderBottomColor: "rgb(233, 228, 220)" } : undefined}
                >
                  <div className={`items-center flex justify-center w-[18px] h-[18px] mt-[2px] shrink-[0] rounded-[0.5625rem] ${q.checked ? 'bg-purple-500' : 'border border-gray-400'}`}>
                    {q.checked && (
                      <div className="w-[6px] h-[6px] bg-white rounded-full" />
                    )}
                  </div>
                  <div className="grow basis-[0%] leading-normal">{q.text}</div>
                </div>
              ))}
              <div className="items-center flex text-gray-600 gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px]">
                <div className="overflow-hidden w-3 h-3">
                  <img src="/icons/c6af67f80f7ec4d48ab0b1984f79c9c47ed17688.svg" className="block size-full" />
                </div>
                <span className="block">질문 추가</span>
              </div>
            </div>
          </div>
          <div>
            <div className="font-bold mb-[6px] text-gray-600">
              다음 달 치료 목표
            </div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
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

import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';

const CATEGORIES = [
  { color: 'bg-purple-300', title: '복약 알림', desc: '하루 평균 2-3건', active: true },
  { color: 'bg-purple-500', title: '주간 리포트', desc: '월요일 아침', active: true },
  { color: 'bg-purple-300', title: '상담 알림', desc: '하루 전 · 1시간 전', active: true },
  { color: 'bg-purple-300', title: '커뮤니티', desc: '댓글·공감', active: false },
  { color: 'bg-[rgb(138,131,152)]', title: '마케팅 이벤트', desc: '월 1-2회', active: false },
];

export default function NotificationSettingsPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-100 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar left={<HeaderIconButton icon={<Bell className="h-4 w-4 text-gray-700" strokeWidth={2.35} />} />} title="알림 설정" centered />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
            <div className="font-bold text-gray-600">전체 알림</div>
            <div className="items-center flex mt-[6px] gap-2.5">
              <div className="grow font-extrabold basis-[0%] text-lg" style={{ fontFamily: 'NanumSquare, system-ui' }}>받기</div>
              <Toggle active />
            </div>
          </div>
          <div>
            <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">카테고리별</div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
              {CATEGORIES.map((item, index) => (
                <div key={item.title} className={`items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] ${index < CATEGORIES.length - 1 ? 'border-b' : ''}`} style={index < CATEGORIES.length - 1 ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}>
                  <div className={`w-2 h-2 ${item.color} rounded-sm`}></div>
                  <div className="grow basis-[0%]">
                    <div className="font-semibold">{item.title}</div>
                    <div className="mt-[2px] text-gray-600 text-xs">{item.desc}</div>
                  </div>
                  <Toggle active={item.active} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">방해 금지</div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
              <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
                <div className="grow font-semibold basis-[0%]">야간 모드</div>
                <div className="mr-[6px] text-gray-600">22:00 - 07:00</div>
                <Toggle active />
              </div>
              <div className="items-center flex pt-3 pr-[14px] pb-3 pl-[14px]">
                <div className="grow font-semibold basis-[0%]">방해 금지 시간 제외</div>
                <div className="mr-[6px] text-gray-600">중요 복약</div>
                <ChevronRight className="w-[11px] h-[11px] text-gray-500" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ active }: { active: boolean }) {
  return (
    <div className={`relative w-[38px] h-[22px] rounded-[0.6875rem] ${active ? 'bg-purple-500' : 'bg-purple-50'}`}>
      <div className={`absolute w-[18px] h-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem] ${active ? 'left-[18px]' : 'left-[2px]'}`}></div>
    </div>
  );
}

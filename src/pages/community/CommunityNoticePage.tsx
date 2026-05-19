import React from 'react';
import { ChevronLeft, ChevronRight, Megaphone, Search } from 'lucide-react';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

const NOTICES = [
  { title: '[중요] 개인정보 처리방침 개정 안내', meta: '30일 내 명시적 거부가 없으면 동의로 간주', important: true },
  { title: 'v2.1 업데이트 - 캘린더 연동 추가', meta: '5월 10일' },
  { title: '서버 점검 안내 (5/15 02:00 ~ 04:00)', meta: '5월 9일' },
  { title: '상담 기록 PDF 내보내기 베타 오픈', meta: '5월 2일' },
  { title: 'v2.0 정식 출시 - 주간 리포트 추가', meta: '4월 15일' },
];

export default function CommunityNoticePage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="공지사항"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
          right={<HeaderIconButton icon={<Search className="h-4 w-4 text-gray-700" strokeWidth={2.35} />} />}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-2 pt-0 pr-4 pb-6 pl-4">
          {NOTICES.map((notice) => (
            <div key={notice.title} className={`${notice.important ? 'items-center flex bg-purple-100 gap-2.5' : 'bg-white'} shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]`}>
              {notice.important ? (
                <div className="items-center flex justify-center w-[26px] h-[26px] bg-white rounded-[0.8125rem]">
                  <Megaphone className="w-3.5 h-3.5 text-purple-500" strokeWidth={2.5} />
                </div>
              ) : null}
              <div className="grow basis-[0%]">
                <div className={notice.important ? 'font-extrabold' : 'font-semibold'}>{notice.title}</div>
                <div className="mt-[2px] text-gray-600 text-xs">{notice.meta}</div>
              </div>
              {notice.important ? <ChevronRight className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

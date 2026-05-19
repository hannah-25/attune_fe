import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Megaphone, Search } from 'lucide-react';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { getNotices, NoticeSummary } from '@/api/notice';

export default function CommunityNoticePage() {
  const [notices, setNotices] = useState<NoticeSummary[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    getNotices({ page: 0, size: 20 })
      .then((response) => {
        if (!ignore) setNotices(response.notices);
      })
      .catch(() => {
        if (!ignore) setError('공지사항을 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, []);

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
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          {notices.map((notice, index) => {
            const important = index === 0;
            return (
            <div key={notice.noticeId} className={`${important ? 'items-center flex bg-purple-100 gap-2.5' : 'bg-white'} shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]`}>
              {important ? (
                <div className="items-center flex justify-center w-[26px] h-[26px] bg-white rounded-[0.8125rem]">
                  <Megaphone className="w-3.5 h-3.5 text-purple-500" strokeWidth={2.5} />
                </div>
              ) : null}
              <div className="grow basis-[0%]">
                <div className={important ? 'font-extrabold' : 'font-semibold'}>{notice.title}</div>
                <div className="mt-[2px] text-gray-600 text-xs">{formatNoticeDate(notice.createdAt)}</div>
              </div>
              {important ? <ChevronRight className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} /> : null}
            </div>
          );
          })}
        </div>
      </div>
    </div>
  );
}

function formatNoticeDate(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return createdAt;
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

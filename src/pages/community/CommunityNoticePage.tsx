import React, { useEffect, useState } from 'react';
import { ChevronRight, Megaphone } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { TabBar } from '@/components/TabBar';
import { getNotices } from '@/api/notice';
import { MockNotice, mockNotices } from '@/mocks/community.mock';

export default function CommunityNoticePage() {
  const forceMockNotice = import.meta.env.VITE_USE_NOTICE_MOCK === 'true';
  const [notices, setNotices] = useState<MockNotice[]>([]);
  const [error, setError] = useState('');
  const [fallbackNotice, setFallbackNotice] = useState('');
  const displayNotices = notices.map((notice, index) => ({
    ...notice,
    highlightTone: notice.highlightTone ?? (index === 0 ? 'lavender' : undefined),
  }));
  const highlightedNotices = displayNotices.filter((notice) => Boolean(notice.highlightTone));
  const normalNotices = displayNotices.filter((notice) => !notice.highlightTone);

  useEffect(() => {
    let ignore = false;

    if (forceMockNotice) {
      setNotices(mockNotices);
      setError('');
      setFallbackNotice('샘플 공지 데이터를 표시하고 있습니다.');
      return () => {
        ignore = true;
      };
    }

    getNotices({ page: 0, size: 20 })
      .then((response) => {
        if (ignore) return;
        setNotices(response.notices);
        setError('');
        setFallbackNotice('');
      })
      .catch(() => {
        if (ignore) return;
        setNotices(mockNotices);
        setError('');
        setFallbackNotice('실시간 공지를 불러오지 못해 샘플 공지를 표시하고 있습니다.');
      });

    return () => {
      ignore = true;
    };
  }, [forceMockNotice]);

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="공지사항"
          left={<NavBackButton />}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-2 pt-0 pr-4 pb-[100px] pl-4">
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          {fallbackNotice ? <div className="text-amber-600 text-xs px-1">{fallbackNotice}</div> : null}
          {!error && notices.length === 0 ? (
            <div className="text-gray-500 text-sm px-1 py-3">등록된 공지사항이 없습니다.</div>
          ) : null}
          {highlightedNotices.map((notice) => {
            const cardBgClass = notice.highlightTone === 'peach' ? 'bg-[rgb(255,236,223)]' : 'bg-purple-100';
            return (
              <div key={notice.noticeId} className={`items-center flex gap-2.5 ${cardBgClass} shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]`}>
                <div className="items-center flex justify-center w-[26px] h-[26px] bg-white rounded-[0.8125rem]">
                  {notice.badgeLabel ? (
                    <span className="font-bold text-purple-600 text-[10px]">{notice.badgeLabel}</span>
                  ) : (
                    <Megaphone className="w-3.5 h-3.5 text-purple-500" strokeWidth={2.5} />
                  )}
                </div>
                <div className="grow basis-[0%]">
                  <div className="font-extrabold">{notice.title}</div>
                  <div className="mt-[2px] text-gray-600 text-xs">{formatNoticeDate(notice.createdAt)}</div>
                </div>
                <ChevronRight className="w-[13px] h-[13px] text-gray-500" strokeWidth={2.5} />
              </div>
            );
          })}
          {highlightedNotices.length > 0 && normalNotices.length > 0 ? (
            <div className="pt-2 pb-2">
              <div className="h-px bg-gray-200" />
            </div>
          ) : null}
          {normalNotices.map((notice) => (
            <div key={notice.noticeId} className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
              <div className="font-semibold">{notice.title}</div>
              <div className="mt-[2px] text-gray-600 text-xs">{formatNoticeDate(notice.createdAt)}</div>
            </div>
          ))}
        </div>
        <TabBar active="커뮤니티" />
      </div>
    </div>
  );
}

function formatNoticeDate(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return createdAt;
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

import { useCallback, useEffect, useRef, useState, type UIEvent } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { ScrollArea } from '@/components/ScrollArea';
import { useDelayedLoading } from '@/lib/useDelayedLoading';
import { formatRelativeTime, parseServerDateTime } from '@/lib/date';
import { ApiError } from '@/api/client';
import {
  getNotifications,
  markNotificationRead,
  type NotificationItem,
  type NotificationReadFilter,
} from '@/api/notifications';
import { isPushSubscribed, getLastSyncStatus, syncPushSubscription, supportsPush } from '@/lib/pushSubscription';

const PAGE_SIZE = 20;
// ScrollArea 하단에는 iOS Safari 대응용 220px 여백(spacer)이 항상 붙어 있으므로,
// 실제 콘텐츠 끝에 도달하기 전에 미리 로드되도록 그보다 넉넉히 큰 값을 쓴다.
const SCROLL_LOAD_MORE_THRESHOLD_PX = 400;

type Filter = 'ALL' | NotificationReadFilter;

const FILTERS: Filter[] = ['ALL', 'UNREAD'];

export default function NotificationInboxPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('ALL');
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const showLoading = useDelayedLoading(isLoading);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const requestIdRef = useRef(0);
  // 연속된 scroll 이벤트가 같은 렌더의 stale isLoadingMore/isLoading을 참조해 loadMore()를
  // 중복 호출할 수 있으므로, state와 별개로 동기적으로 확인·설정되는 ref로 재진입을 막는다.
  const loadMoreInFlightRef = useRef(false);

  // 배경 재동기화가 끝나기 전 배너가 잘못 깜빡이지 않도록 "정상"을 기본값으로 둔다.
  const [deviceSubscribed, setDeviceSubscribed] = useState(true);
  const [syncFailed, setSyncFailed] = useState(false);

  useEffect(() => {
    let ignore = false;
    isPushSubscribed()
      .then((subscribed) => { if (!ignore) setDeviceSubscribed(subscribed); })
      .catch((err) => console.error('[NotificationInboxPage] 구독 상태 확인 실패:', err));
    syncPushSubscription().finally(() => {
      if (!ignore) setSyncFailed(getLastSyncStatus() === 'failed');
    });
    return () => { ignore = true; };
  }, []);

  const load = useCallback((nextFilter: Filter) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoading(true);
    setError('');

    getNotifications({ status: nextFilter === 'ALL' ? undefined : nextFilter, size: PAGE_SIZE })
      .then((response) => {
        if (requestId !== requestIdRef.current) return;
        setItems(response.notifications);
        setNextCursor(response.nextCursor);
      })
      .catch((err) => {
        if (requestId !== requestIdRef.current) return;
        console.error('[NotificationInboxPage] getNotifications 실패:', err);
        setError(err instanceof ApiError && err.backendMessage ? err.backendMessage : '알림을 불러오지 못했습니다.');
      })
      .finally(() => {
        if (requestId === requestIdRef.current) setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    load(filter);
  }, [filter, load]);

  const loadMore = useCallback(() => {
    if (loadMoreInFlightRef.current || isLoading || !nextCursor) return;
    loadMoreInFlightRef.current = true;
    const requestId = requestIdRef.current;
    setIsLoadingMore(true);

    getNotifications({ status: filter === 'ALL' ? undefined : filter, cursor: nextCursor, size: PAGE_SIZE })
      .then((response) => {
        if (requestId !== requestIdRef.current) return;
        setItems((prev) => [...prev, ...response.notifications]);
        setNextCursor(response.nextCursor);
      })
      .catch((err) => console.error('[NotificationInboxPage] 다음 페이지 로드 실패:', err))
      .finally(() => {
        loadMoreInFlightRef.current = false;
        setIsLoadingMore(false);
      });
  }, [filter, isLoading, nextCursor]);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_LOAD_MORE_THRESHOLD_PX) {
      loadMore();
    }
  };

  const handleSelect = (item: NotificationItem) => {
    if (!item.readAt) {
      const readAt = new Date().toISOString();
      setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, readAt } : n)));
      markNotificationRead(item.id).catch((err) => {
        console.error('[NotificationInboxPage] markNotificationRead 실패:', err);
      });
    }
    navigate(item.url || '/home');
  };

  const showSubscriptionBanner = supportsPush() && (syncFailed || !deviceSubscribed);

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar left={<NavBackButton />} title="알림함" centered />

        <div className="flex flex-wrap gap-1.5 px-4 pb-3">
          {FILTERS.map((value) => {
            const isSelected = filter === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`font-bold whitespace-nowrap text-[13px] px-3 py-1.5 rounded-full border transition-colors ${
                  isSelected
                    ? 'bg-purple-100 border-[rgb(185,166,255)] text-purple-800'
                    : 'bg-transparent border-transparent text-gray-700'
                }`}
              >
                {value === 'ALL' ? '전체' : '안읽음'}
              </button>
            );
          })}
        </div>

        {showSubscriptionBanner && (
          <div
            className="mx-4 mb-3 flex items-center justify-between gap-3 rounded-2xl bg-purple-50 px-[14px] py-3 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px]"
            role="alert"
          >
            <span className="text-xs text-gray-700">
              {syncFailed ? '알림 연결에 문제가 있어요' : '이 기기에서 알림을 받고 있지 않아요'}
            </span>
            <button
              type="button"
              onClick={() => navigate('/settings/notifications')}
              className="shrink-0 min-h-11 rounded-lg px-2 text-xs font-semibold text-purple-700"
            >
              설정으로 이동
            </button>
          </div>
        )}

        {isLoading ? (
          showLoading ? (
            <div className="flex flex-1 items-center justify-center text-gray-600 text-xs" role="status">
              불러오는 중...
            </div>
          ) : null
        ) : error ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center" role="alert">
            <div className="text-xs text-red-700">{error}</div>
            <button
              type="button"
              onClick={() => load(filter)}
              className="min-h-11 text-xs font-semibold text-purple-700"
            >
              다시 시도하기
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <Bell className="h-8 w-8 text-gray-300" strokeWidth={1.5} />
            <div className="text-sm font-semibold text-gray-700">
              {filter === 'UNREAD' ? '읽지 않은 알림이 없어요' : '받은 알림이 없어요'}
            </div>
          </div>
        ) : (
          <ScrollArea className="flex flex-col gap-2.5 pt-1" onScroll={handleScroll}>
            {items.map((item) => {
              const isUnread = !item.readAt;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`text-left p-[14px] rounded-[1.125rem] shadow-[rgba(60,40,90,0.07)_0px_5px_18px_0px] ${
                    isUnread ? 'bg-purple-50' : 'bg-white border border-gray-100'
                  }`}
                >
                  <div className="items-center flex mb-[6px] gap-1.5">
                    {isUnread && <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />}
                    <div className="font-bold text-gray-500 text-xs">
                      {formatRelativeTime(parseServerDateTime(item.sentAt))}
                    </div>
                  </div>
                  <div className={`font-bold leading-[18.2px] ${isUnread ? 'text-gray-900' : 'text-gray-600'}`}>
                    {item.title}
                  </div>
                  <div className="mt-1 text-gray-600 leading-normal line-clamp-2">{item.body}</div>
                </button>
              );
            })}
            {isLoadingMore && (
              <div className="py-3 text-center text-xs text-gray-500" role="status">
                불러오는 중...
              </div>
            )}
          </ScrollArea>
        )}
      </div>
    </div>
  );
}

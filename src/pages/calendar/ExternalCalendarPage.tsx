import React, { useEffect, useMemo, useState } from 'react';
import { Check, Link2, RefreshCw, Unplug } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import {
  CalendarConnection,
  connectGoogleCalendar,
  disconnectCalendarConnection,
  getCalendarConnections,
  syncCalendarConnection,
} from '@/api/calendarConnection';
import { requestGoogleCalendarAuthorizationCode } from '@/api/googleCalendarAuth';

export default function ExternalCalendarPage() {
  const navigate = useNavigate();
  const [connections, setConnections] = useState<CalendarConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const googleConnection = useMemo(
    () => connections.find((connection) => connection.provider === 'GOOGLE' && connection.active) ?? null,
    [connections],
  );

  const refreshConnections = async () => {
    const response = await getCalendarConnections();
    setConnections(response.connections);
  };

  useEffect(() => {
    let ignore = false;

    getCalendarConnections()
      .then((response) => {
        if (ignore) return;
        setConnections(response.connections);
        setError('');
      })
      .catch(() => {
        if (!ignore) setError('캘린더 연결 상태를 불러오지 못했어요.');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleConnectGoogle = async () => {
    if (connecting || syncing) return;

    setConnecting(true);
    setError('');
    setMessage('');

    try {
      const authorizationCode = await requestGoogleCalendarAuthorizationCode();
      const connection = await connectGoogleCalendar({
        authorizationCode,
        redirectUri: 'postmessage',
      });
      await syncCalendarConnection(connection.connectionId);
      await refreshConnections();
      setMessage('Google Calendar를 연결하고 일정을 가져왔어요.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google Calendar 연결에 실패했어요.');
    } finally {
      setConnecting(false);
    }
  };

  const handleSync = async () => {
    if (!googleConnection || syncing) return;

    setSyncing(true);
    setError('');
    setMessage('');

    try {
      const result = await syncCalendarConnection(googleConnection.connectionId);
      await refreshConnections();
      setMessage(`${result.syncedCount}개의 Google Calendar 일정을 확인했어요.`);
    } catch {
      setError('Google Calendar 일정을 동기화하지 못했어요.');
    } finally {
      setSyncing(false);
    }
  };

  const handleDisconnect = async () => {
    if (!googleConnection || disconnecting) return;

    setDisconnecting(true);
    setError('');
    setMessage('');

    try {
      await disconnectCalendarConnection(googleConnection.connectionId);
      await refreshConnections();
      setMessage('Google Calendar 연결을 해제했어요.');
    } catch {
      setError('Google Calendar 연결을 해제하지 못했어요.');
    } finally {
      setDisconnecting(false);
    }
  };

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="캘린더 연동"
          left={<NavBackButton onClick={() => navigate(-1)} />}
          right={
            googleConnection ? (
              <button
                type="button"
                onClick={handleSync}
                disabled={syncing || loading}
                className="items-center flex justify-center w-11 h-11 disabled:opacity-45"
                aria-label="동기화"
              >
                <span className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                  <RefreshCw className={`h-4 w-4 text-gray-700 ${syncing ? 'animate-spin' : ''}`} strokeWidth={2.25} />
                </span>
              </button>
            ) : null
          }
        />

        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 border border-purple-50 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.375rem]">
            <div className="font-extrabold text-lg leading-[23.4px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
              Google Calendar 일정을
              <br />
              함께 볼 수 있어요
            </div>
            <div className="mt-[6px] text-gray-600 leading-normal">
              외부 일정은 읽기 전용으로 표시돼요.
            </div>
          </div>

          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          {message ? <div className="text-purple-700 text-xs font-bold px-1">{message}</div> : null}

          <div className="font-bold text-gray-600 text-xs pt-1 pr-1 pb-0 pl-1">
            연결된 계정
          </div>

          <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
            {googleConnection ? (
              <div className="pt-[13px] pr-[14px] pb-[13px] pl-[14px]">
                <div className="items-center flex gap-2.5">
                  <div className="items-center flex font-extrabold justify-center w-8 h-8 bg-purple-100 text-[rgb(185,166,255)] text-sm rounded-2xl">
                    G
                  </div>
                  <div className="grow basis-[0%]">
                    <div className="font-bold text-gray-900">Google Calendar</div>
                    <div className="text-xs text-gray-600">
                      {googleConnection.accountEmail ?? 'Google 계정'} · {formatLastSynced(googleConnection.lastSyncedAt)}
                    </div>
                  </div>
                  <span className="items-center inline-flex gap-1 font-bold text-purple-700 text-xs">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                    연결됨
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={handleSync}
                    disabled={syncing}
                    className="items-center flex grow justify-center gap-1.5 h-10 bg-purple-100 text-purple-800 font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-45"
                  >
                    <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} strokeWidth={2.4} />
                    동기화
                  </button>
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    disabled={disconnecting}
                    className="items-center flex grow justify-center gap-1.5 h-10 bg-gray-100 text-gray-700 font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-45"
                  >
                    <Unplug className="h-4 w-4" strokeWidth={2.4} />
                    해제
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleConnectGoogle}
                disabled={loading || connecting}
                className="items-center flex w-full text-left gap-2.5 pt-[13px] pr-[14px] pb-[13px] pl-[14px] rounded-[0.875rem] transition-all active:scale-[0.99] disabled:opacity-45"
              >
                <div className="items-center flex font-extrabold justify-center w-8 h-8 bg-purple-100 text-[rgb(185,166,255)] text-sm rounded-2xl">
                  G
                </div>
                <div className="grow basis-[0%]">
                  <div className="font-bold text-gray-900">Google Calendar</div>
                  <div className="text-xs text-gray-600">
                    {connecting ? 'Google 권한을 확인하는 중이에요' : '일정을 읽기 전용으로 가져와요'}
                  </div>
                </div>
                {connecting ? (
                  <RefreshCw className="h-4 w-4 text-gray-500 animate-spin" strokeWidth={2.4} />
                ) : (
                  <Link2 className="h-4 w-4 text-gray-500" strokeWidth={2.4} />
                )}
              </button>
            )}
          </div>

          <div className="bg-white border border-gray-100 p-3 rounded-2xl text-gray-600 leading-normal">
            Google Calendar 일정은 에이튠에서 보기만 할 수 있어요. 수정이나 삭제는 Google Calendar에서 해주세요.
          </div>
        </div>
      </div>
    </div>
  );
}

function formatLastSynced(value: string | null) {
  if (!value) return '아직 동기화 전';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

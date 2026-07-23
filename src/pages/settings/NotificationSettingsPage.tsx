import { useEffect, useState } from 'react';
import { TopBar } from '../../app/components/TopBar';
import { NavBackButton } from '../../app/components/NavButtons';
import { getUserSettings, updateUserSettings, UserSettings } from '../../app/api/user';
import {
  subscribeToPush,
  supportsPush,
  isPushSubscribed,
  disablePushOnThisDevice,
  getLastSyncStatus,
  syncPushSubscription,
} from '../../app/lib/pushSubscription';

type NotificationSettings = Pick<
  UserSettings,
  | 'medicationNotification'
  | 'reportNotification'
  | 'marketingNotification'
  | 'communityNotification'
  | 'todoNotification'
>;

const DEFAULT_SETTINGS: UserSettings = {
  medicationNotification: true,
  reportNotification: true,
  marketingNotification: false,
  communityNotification: true,
  todoNotification: true,
  takeMedicationOnHoliday: false,
  theme: 'SYSTEM',
};

const CATEGORIES: Array<{
  key: keyof NotificationSettings;
  title: string;
  desc: string;
  color: string;
}> = [
  { key: 'medicationNotification', title: '복약 알림', desc: '복약 시간 정각', color: 'bg-purple-300' },
  { key: 'todoNotification', title: 'Todo 알림', desc: '마감 시각 정각', color: 'bg-purple-400' },
  { key: 'reportNotification', title: '주간 리포트', desc: '월요일 오전 9시', color: 'bg-purple-500' },
  { key: 'communityNotification', title: '커뮤니티', desc: '내 게시글의 새 댓글', color: 'bg-purple-300' },
  { key: 'marketingNotification', title: '마케팅 이벤트', desc: '공지 및 이벤트', color: 'bg-[rgb(138,131,152)]' },
];

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  // 브라우저에 구독이 있는지만 뜻한다 — 서버 등록 성공까지 보장하지 않는다.
  // 배경 재동기화(syncPushSubscription)의 실패는 조용히 로깅될 뿐 여기 반영되지 않는다.
  const [deviceSubscribed, setDeviceSubscribed] = useState(false);
  // 배경 재동기화(syncPushSubscription)가 시도했지만 서버 등록에 실패한 경우 — 브라우저엔
  // 구독이 남아있어도(deviceSubscribed=true) 실제로는 알림이 안 갈 수 있다는 신호.
  const [syncFailed, setSyncFailed] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    getUserSettings()
      .then((nextSettings) => {
        if (!ignore) setSettings(nextSettings);
      })
      .catch(() => {
        if (!ignore) setError('알림 설정을 불러오지 못했습니다.');
      });

    isPushSubscribed()
      .then((subscribed) => {
        if (!ignore) setDeviceSubscribed(subscribed);
      })
      .catch((err) => {
        console.error('[push] initial subscription check failed:', err);
      });

    // getLastSyncStatus()를 바로 읽으면 ProtectedRoute의 앱 시작 sync가 아직 안 끝났을 때
    // 'unknown'을 읽고 끝나버린다(이 페이지가 새로고침 시 최초 마운트되는 페이지인 경우 흔함).
    // syncPushSubscription()은 진행 중인 sync가 있으면 그 프로미스에 합류하고, 없으면 새로
    // 시도한다 — 어느 쪽이든 완료를 기다린 뒤 읽으면 그 시점의 정확한 결과를 얻는다.
    syncPushSubscription().finally(() => {
      if (!ignore) setSyncFailed(getLastSyncStatus() === 'failed');
    });

    return () => { ignore = true; };
  }, []);

  const patchSettings = async (payload: Partial<UserSettings>) => {
    if (isUpdating) return;
    const previous = settings;
    setSettings({ ...settings, ...payload });
    setIsUpdating(true);
    setError('');
    try {
      const nextSettings = await updateUserSettings(payload);
      setSettings(nextSettings);
    } catch (err) {
      console.error('Failed to update notification settings:', err);
      setSettings(previous);
      setError('설정을 저장하지 못했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  const retryConnection = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const success = await subscribeToPush();
      setDeviceSubscribed(success);
      setSyncFailed(!success);
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleDeviceSubscription = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    setError('');
    try {
      if (deviceSubscribed) {
        await disablePushOnThisDevice();
        setDeviceSubscribed(false);
        setSyncFailed(false);
        return;
      }

      const success = await subscribeToPush();
      if (!success) {
        let msg = '푸시 알림을 설정할 수 없습니다. 다시 시도해주세요.';
        if ('Notification' in window) {
          if (Notification.permission === 'denied') {
            msg = '브라우저 설정에서 알림 권한을 허용해주세요.';
          } else if (Notification.permission === 'default') {
            msg = '알림 권한 허용이 필요합니다.';
          }
        }
        setError(msg);
        return;
      }
      setDeviceSubscribed(true);
      setSyncFailed(false);
    } catch (err) {
      console.error('[push] toggleDeviceSubscription failed:', err);
      const msg = err instanceof Error && err.name === 'ServiceWorkerTimeoutError'
        ? '페이지를 새로고침한 후 다시 시도해주세요.'
        : '알림 설정 중 오류가 발생했습니다. 다시 시도해주세요.';
      setError(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 text-sm flex flex-col" style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar left={<NavBackButton />} title="알림 설정" centered />
        <div className="flex flex-col grow min-h-0 overflow-y-auto gap-[14px] px-4 pb-6">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px] p-[14px] rounded-2xl">
            <div className="font-bold text-gray-900">이 기기에서 알림 받기</div>
            <div className="items-center flex mt-[6px] gap-2.5">
              <div className="grow">
                <div className="font-extrabold text-lg">{deviceSubscribed ? '연결됨' : '연결 안 됨'}</div>
                <div className="text-xs text-gray-600 mt-0.5">
                  {supportsPush() ? '브라우저 푸시 구독 상태' : 'VAPID 설정 또는 브라우저 지원이 필요해요'}
                </div>
              </div>
              <Toggle
                active={deviceSubscribed}
                onClick={toggleDeviceSubscription}
                disabled={isUpdating || !supportsPush()}
              />
            </div>
          </div>

          {syncFailed ? (
            <div className="flex items-center justify-between gap-3 px-1" role="alert">
              <span className="text-xs text-red-700">연결에 문제가 있어요</span>
              <button
                type="button"
                onClick={retryConnection}
                disabled={isUpdating}
                className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-purple-700 disabled:opacity-50"
              >
                다시 연결하기
              </button>
            </div>
          ) : null}

          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}

          <div>
            <div className="font-bold text-gray-900 text-xs px-1 pb-1.5">카테고리별</div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px] p-1 rounded-2xl">
              {CATEGORIES.map((category, index) => (
                <div
                  key={category.key}
                  className={`items-center flex gap-2.5 px-[14px] py-3 ${index < CATEGORIES.length - 1 ? 'border-b' : ''}`}
                  style={index < CATEGORIES.length - 1 ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}
                >
                  <div className={`w-2 h-2 ${category.color} rounded-sm`} />
                  <div className="grow">
                    <div className="font-semibold">{category.title}</div>
                    <div className="mt-[2px] text-gray-600 text-xs">{category.desc}</div>
                  </div>
                  <Toggle
                    active={settings[category.key]}
                    disabled={isUpdating}
                    onClick={() => patchSettings({ [category.key]: !settings[category.key] })}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500 px-1">
            복약별 알림은 복약 목록에서 별도로 켜거나 끌 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ active, disabled, onClick }: { active: boolean; disabled?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`relative w-[38px] h-[22px] rounded-[11px] ${active ? 'bg-purple-500' : 'bg-purple-50'} disabled:opacity-50`}
    >
      <div className={`absolute w-[18px] h-[18px] top-[2px] bg-white shadow rounded-[9px] ${active ? 'left-[18px]' : 'left-[2px]'}`} />
    </button>
  );
}

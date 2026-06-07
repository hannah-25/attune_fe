import { useEffect, useState } from 'react';
import { TopBar } from '../../app/components/TopBar';
import { NavBackButton } from '../../app/components/NavButtons';
import { getUserSettings, updateUserSettings, UserSettings } from '../../app/api/user';
import {
  subscribeToPush,
  supportsPush,
  syncPushSubscription,
  unsubscribeFromPush,
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
  const [deviceSubscribed, setDeviceSubscribed] = useState(false);
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

    syncPushSubscription()
      .then((subscribed) => {
        if (!ignore) setDeviceSubscribed(subscribed);
      })
      .catch((err) => {
        console.error('[push] initial subscription sync failed:', err);
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

  const toggleDeviceSubscription = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    setError('');
    try {
      if (deviceSubscribed) {
        await unsubscribeFromPush();
        setDeviceSubscribed(false);
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
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full h-full bg-gray-100 text-sm flex flex-col">
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar left={<NavBackButton />} title="알림 설정" centered />
        <div className="flex flex-col grow min-h-0 overflow-y-auto gap-[14px] px-4 pb-6">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px] p-[14px] rounded-2xl">
            <div className="font-bold text-gray-600">이 기기에서 알림 받기</div>
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

          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}

          <div>
            <div className="font-bold text-gray-600 text-xs px-1 pb-1.5">카테고리별</div>
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

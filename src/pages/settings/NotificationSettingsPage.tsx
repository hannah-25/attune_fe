import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { TopBar } from '../../app/components/TopBar';
import { NavBackButton } from '../../app/components/NavButtons';
import { getUserSettings, updateUserSettings, UserSettings } from '../../app/api/user';

type NotificationSettings = Pick<UserSettings, 'medicationNotification' | 'reportNotification' | 'marketingNotification'>;

const DEFAULT_SETTINGS: UserSettings = {
  medicationNotification: true,
  reportNotification: true,
  marketingNotification: false,
  takeMedicationOnHoliday: false,
  theme: 'SYSTEM',
};

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  medicationNotification: DEFAULT_SETTINGS.medicationNotification,
  reportNotification: DEFAULT_SETTINGS.reportNotification,
  marketingNotification: DEFAULT_SETTINGS.marketingNotification,
};

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [allNotificationsEnabled, setAllNotificationsEnabled] = useState(true);
  const [lastEnabledSettings, setLastEnabledSettings] = useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    getUserSettings()
      .then((nextSettings) => {
        if (ignore) return;
        setSettings(nextSettings);
        const nextNotificationSettings = pickNotificationSettings(nextSettings);
        setAllNotificationsEnabled(isAnyNotificationEnabled(nextNotificationSettings));
        setLastEnabledSettings(nextNotificationSettings);
      })
      .catch(() => {
        if (!ignore) setError('알림 설정을 불러오지 못했습니다.');
      });

    return () => {
      ignore = true;
    };
  }, []);

  const patchSettings = async (payload: Partial<UserSettings>) => {
    const previous = settings;
    const optimistic = { ...settings, ...payload };
    setSettings(optimistic);
    setError('');

    try {
      const nextSettings = await updateUserSettings(payload);
      setSettings(nextSettings);
      return nextSettings;
    } catch {
      setSettings(previous);
      setError('설정을 저장하지 못했습니다.');
      return null;
    }
  };

  const toggleAllNotifications = async () => {
    if (allNotificationsEnabled) {
      setAllNotificationsEnabled(false);
      setLastEnabledSettings(pickNotificationSettings(settings));
      const nextSettings = await patchSettings({
        medicationNotification: false,
        reportNotification: false,
        marketingNotification: false,
      });

      if (!nextSettings) {
        setAllNotificationsEnabled(true);
      }
      return;
    }

    setAllNotificationsEnabled(true);
    const restoreSettings = isAnyNotificationEnabled(lastEnabledSettings)
      ? lastEnabledSettings
      : DEFAULT_NOTIFICATION_SETTINGS;
    const nextSettings = await patchSettings(restoreSettings);

    if (!nextSettings) {
      setAllNotificationsEnabled(false);
      return;
    }

    setLastEnabledSettings(pickNotificationSettings(nextSettings));
  };

  const toggleCategory = async (key: keyof NotificationSettings) => {
    if (!allNotificationsEnabled) return;

    const previousSnapshot = pickNotificationSettings(settings);
    const nextSnapshot = {
      ...previousSnapshot,
      [key]: !previousSnapshot[key],
    };

    setLastEnabledSettings(nextSnapshot);
    const nextSettings = await patchSettings({
      [key]: nextSnapshot[key],
    } as Partial<UserSettings>);

    if (!nextSettings) {
      setLastEnabledSettings(previousSnapshot);
      return;
    }

    setLastEnabledSettings(pickNotificationSettings(nextSettings));
  };

  const categories = [
    {
      color: 'bg-purple-300',
      desc: '하루 평균 2-3건',
      onToggle: () => toggleCategory('medicationNotification'),
      active: allNotificationsEnabled ? settings.medicationNotification : false,
      title: '복약 알림',
    },
    {
      color: 'bg-purple-500',
      desc: '월요일 아침',
      onToggle: () => toggleCategory('reportNotification'),
      active: allNotificationsEnabled ? settings.reportNotification : false,
      title: '주간 리포트',
    },
    {
      color: 'bg-purple-300',
      title: '상담 알림',
      desc: '하루 전 · 1시간 전',
      active: allNotificationsEnabled,
    },
    { color: 'bg-purple-300', title: '커뮤니티', desc: '댓글·공감', active: false },
    {
      color: 'bg-[rgb(138,131,152)]',
      desc: '월 1-2회',
      onToggle: () => toggleCategory('marketingNotification'),
      active: allNotificationsEnabled ? settings.marketingNotification : false,
      title: '마케팅 이벤트',
    },
  ];

  return (
    <div
      className="w-full h-dvh bg-gray-100 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar left={<NavBackButton />} title="알림 설정" centered />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-[14px] pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-2xl">
            <div className="font-bold text-gray-600">전체 알림</div>
            <div className="items-center flex mt-[6px] gap-2.5">
              <div className="grow font-extrabold basis-[0%] text-lg" style={{ fontFamily: 'NanumSquare, system-ui' }}>받기</div>
              <Toggle active={allNotificationsEnabled} onClick={toggleAllNotifications} />
            </div>
          </div>
          {error ? <div className="text-red-500 text-xs px-1">{error}</div> : null}
          <div>
            <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">카테고리별</div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">
              {categories.map((item, index) => (
                <div key={item.title} className={`items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] ${index < categories.length - 1 ? 'border-b' : ''}`} style={index < categories.length - 1 ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}>
                  <div className={`w-2 h-2 ${item.color} rounded-sm`}></div>
                  <div className="grow basis-[0%]">
                    <div className="font-semibold">{item.title}</div>
                    <div className="mt-[2px] text-gray-600 text-xs">{item.desc}</div>
                  </div>
                  <Toggle active={item.active} onClick={item.onToggle} disabled={!item.onToggle || !allNotificationsEnabled} />
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

function Toggle({ active, disabled, onClick }: { active: boolean; disabled?: boolean; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`relative w-[38px] h-[22px] rounded-[0.6875rem] ${active ? 'bg-purple-500' : 'bg-purple-50'} disabled:opacity-70`}>
      <div className={`absolute w-[18px] h-[18px] top-[2px] bg-white shadow-[rgba(0,0,0,0.15)_0px_1px_4px_0px] rounded-[0.5625rem] ${active ? 'left-[18px]' : 'left-[2px]'}`}></div>
    </button>
  );
}

function pickNotificationSettings(settings: UserSettings): NotificationSettings {
  return {
    medicationNotification: settings.medicationNotification,
    reportNotification: settings.reportNotification,
    marketingNotification: settings.marketingNotification,
  };
}

function isAnyNotificationEnabled(settings: NotificationSettings): boolean {
  return settings.medicationNotification || settings.reportNotification || settings.marketingNotification;
}

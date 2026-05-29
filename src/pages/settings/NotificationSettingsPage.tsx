import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { TopBar } from '../../app/components/TopBar';
import { NavBackButton } from '../../app/components/NavButtons';
import { getUserSettings, updateUserSettings, UserSettings } from '../../app/api/user';

type NotificationSettings = Pick<UserSettings, 'medicationNotification' | 'reportNotification' | 'marketingNotification'>;
const QUIET_HOUR_EXCLUSION_OPTIONS = ['복약 알림', '일정 알림', '커뮤니티 알림'] as const;
type QuietHourExclusionOption = typeof QUIET_HOUR_EXCLUSION_OPTIONS[number];

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
  const [counselingNotification, setCounselingNotification] = useState(true);
  const [lastEnabledCounselingNotification, setLastEnabledCounselingNotification] = useState(true);
  const [communityNotification, setCommunityNotification] = useState(false);
  const [lastEnabledCommunityNotification, setLastEnabledCommunityNotification] = useState(false);
  const [nightModeEnabled, setNightModeEnabled] = useState(true);
  const [quietHourStart, setQuietHourStart] = useState('22:00');
  const [quietHourEnd, setQuietHourEnd] = useState('07:00');
  const [quietHourTimeOpen, setQuietHourTimeOpen] = useState(false);
  const [quietHourExclusions, setQuietHourExclusions] = useState<QuietHourExclusionOption[]>(['복약 알림']);
  const [quietHourExclusionOpen, setQuietHourExclusionOpen] = useState(false);
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

  useEffect(() => {
    if (!nightModeEnabled) {
      setQuietHourTimeOpen(false);
      setQuietHourExclusionOpen(false);
    }
  }, [nightModeEnabled]);

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
      const previousCommunityNotification = communityNotification;
      const previousCounselingNotification = counselingNotification;
      setAllNotificationsEnabled(false);
      setLastEnabledSettings(pickNotificationSettings(settings));
      setLastEnabledCommunityNotification(previousCommunityNotification);
      setLastEnabledCounselingNotification(previousCounselingNotification);
      setCommunityNotification(false);
      setCounselingNotification(false);
      const nextSettings = await patchSettings({
        medicationNotification: false,
        reportNotification: false,
        marketingNotification: false,
      });

      if (!nextSettings) {
        setAllNotificationsEnabled(true);
        setCommunityNotification(previousCommunityNotification);
        setCounselingNotification(previousCounselingNotification);
      }
      return;
    }

    setAllNotificationsEnabled(true);
    setCommunityNotification(lastEnabledCommunityNotification);
    setCounselingNotification(lastEnabledCounselingNotification);
    const restoreSettings = isAnyNotificationEnabled(lastEnabledSettings)
      ? lastEnabledSettings
      : DEFAULT_NOTIFICATION_SETTINGS;
    const nextSettings = await patchSettings(restoreSettings);

    if (!nextSettings) {
      setAllNotificationsEnabled(false);
      setCommunityNotification(false);
      setCounselingNotification(false);
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

  const toggleCounselingNotification = () => {
    if (!allNotificationsEnabled) return;
    setCounselingNotification((current) => {
      const next = !current;
      setLastEnabledCounselingNotification(next);
      return next;
    });
  };

  const toggleCommunityNotification = () => {
    if (!allNotificationsEnabled) return;
    setCommunityNotification((current) => {
      const next = !current;
      setLastEnabledCommunityNotification(next);
      return next;
    });
  };

  const toggleQuietHourExclusion = (option: QuietHourExclusionOption) => {
    setQuietHourExclusions((current) => (
      current.includes(option)
        ? current.filter((value) => value !== option)
        : [...current, option]
    ));
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
      active: allNotificationsEnabled ? counselingNotification : false,
      onToggle: toggleCounselingNotification,
    },
    {
      color: 'bg-purple-300',
      title: '커뮤니티',
      desc: '댓글·공감',
      active: allNotificationsEnabled ? communityNotification : false,
      onToggle: toggleCommunityNotification,
    },
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
              <div
                className={`items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] ${quietHourTimeOpen ? '' : 'border-b'}`}
                style={quietHourTimeOpen ? undefined : { borderBottomColor: 'rgb(233, 228, 220)' }}
              >
                <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                <button
                  type="button"
                  onClick={() => setQuietHourTimeOpen((open) => !open)}
                  disabled={!nightModeEnabled}
                  className="grow basis-[0%] text-left transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="font-semibold">방해 금지 시간</div>
                  <div className="mt-[2px] text-gray-600 text-xs inline-flex items-center gap-1">
                    <span>{`${quietHourStart}~${quietHourEnd}`}</span>
                    <ChevronRight
                      className={`w-[11px] h-[11px] text-gray-500 flex-shrink-0 transition-transform ${quietHourTimeOpen ? 'rotate-90' : ''}`}
                      strokeWidth={2.5}
                    />
                  </div>
                </button>
                <Toggle active={nightModeEnabled} onClick={() => setNightModeEnabled((value) => !value)} />
              </div>
              {quietHourTimeOpen && nightModeEnabled ? (
                <div className="border-b px-[14px] pb-3 pt-2" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="time"
                      value={quietHourStart}
                      disabled={!nightModeEnabled}
                      onChange={(event) => setQuietHourStart(event.target.value)}
                      className="w-[98px] rounded-xl border border-gray-200 bg-white px-2.5 py-2 text-xs font-semibold text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className="text-xs text-gray-500">~</span>
                    <input
                      type="time"
                      value={quietHourEnd}
                      disabled={!nightModeEnabled}
                      onChange={(event) => setQuietHourEnd(event.target.value)}
                      className="w-[98px] rounded-xl border border-gray-200 bg-white px-2.5 py-2 text-xs font-semibold text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => setQuietHourExclusionOpen((open) => !open)}
                disabled={!nightModeEnabled}
                className={`items-center flex gap-2.5 w-full text-left pt-3 pr-[14px] pb-3 pl-[14px] transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed ${quietHourExclusionOpen ? 'border-b' : ''}`}
                style={quietHourExclusionOpen ? { borderBottomColor: 'rgb(233, 228, 220)' } : undefined}
              >
                <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                <div className="grow font-semibold basis-[0%]">예외 알림</div>
                <div
                  className="mr-[6px] text-gray-600 text-right text-xs leading-4 max-w-[130px]"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {formatQuietHourExclusionSummary(quietHourExclusions)}
                </div>
                <ChevronRight className={`w-[11px] h-[11px] text-gray-500 transition-transform ${quietHourExclusionOpen ? 'rotate-90' : ''}`} strokeWidth={2.5} />
              </button>
              {quietHourExclusionOpen ? (
                <div className="px-[14px] pb-3 pt-2">
                  <div className="text-[11px] text-gray-500 mb-2">여러 항목을 선택할 수 있어요.</div>
                  <div className="flex flex-col gap-1.5">
                    {QUIET_HOUR_EXCLUSION_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        disabled={!nightModeEnabled}
                        onClick={() => toggleQuietHourExclusion(option)}
                        className={`w-full text-left text-xs font-semibold rounded-xl px-3 py-2.5 transition-all active:scale-[0.98] ${
                          quietHourExclusions.includes(option)
                            ? 'bg-purple-500 text-white'
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
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

function formatQuietHourExclusionSummary(selected: QuietHourExclusionOption[]): string {
  if (selected.length === 0) return '없음';
  return selected.join(', ');
}

import React, { useEffect, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { TopBar } from '../../app/components/TopBar';
import { NavBackButton } from '../../app/components/NavButtons';
import { getUserSettings, updateUserSettings, UserSettings } from '../../app/api/user';

type NotificationSettings = Pick<UserSettings, 'medicationNotification' | 'reportNotification' | 'marketingNotification'>;
const QUIET_HOUR_EXCLUSION_OPTIONS = ['복약 알림', '일정 알림', '커뮤니티 알림'] as const;
const ALARM_OFFSETS = [5, 10, 15, 30] as const;
const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;

function loadMedAlarmPrefs() {
  try {
    const raw = localStorage.getItem('medicationAlarmPrefs');
    if (!raw) return null;
    return JSON.parse(raw) as { offsets: number[]; repeatEnabled: boolean; activeDays: string[] };
  } catch { return null; }
}
function saveMedAlarmPrefs(prefs: { offsets: number[]; repeatEnabled: boolean; activeDays: string[] }) {
  localStorage.setItem('medicationAlarmPrefs', JSON.stringify(prefs));
}

const COUNSELING_ALARM_OPTIONS = [
  { label: '1일 전', minutes: 1440 },
  { label: '3시간 전', minutes: 180 },
  { label: '1시간 전', minutes: 60 },
  { label: '30분 전', minutes: 30 },
] as const;
type CounselingAlarmMinutes = typeof COUNSELING_ALARM_OPTIONS[number]['minutes'];

function loadCounselingAlarmPrefs() {
  try {
    const raw = localStorage.getItem('counselingAlarmPrefs');
    if (!raw) return null;
    return JSON.parse(raw) as { offsets: number[] };
  } catch { return null; }
}
function saveCounselingAlarmPrefs(prefs: { offsets: number[] }) {
  localStorage.setItem('counselingAlarmPrefs', JSON.stringify(prefs));
}
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
  const [medAlarmOffsets, setMedAlarmOffsets] = useState<number[]>(() => loadMedAlarmPrefs()?.offsets ?? [10]);
  const [medRepeatEnabled, setMedRepeatEnabled] = useState(() => loadMedAlarmPrefs()?.repeatEnabled ?? true);
  const [medActiveDays, setMedActiveDays] = useState<string[]>(() => loadMedAlarmPrefs()?.activeDays ?? ['월', '화', '수', '목', '금']);
  const [medAlarmSheetOpen, setMedAlarmSheetOpen] = useState(false);
  const [counselingAlarmOffsets, setCounselingAlarmOffsets] = useState<number[]>(
    () => loadCounselingAlarmPrefs()?.offsets ?? [1440, 60]
  );
  const [counselingAlarmSheetOpen, setCounselingAlarmSheetOpen] = useState(false);
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

  const toggleMedAlarmOffset = (offset: number) => {
    const next = medAlarmOffsets.includes(offset)
      ? medAlarmOffsets.filter((o) => o !== offset)
      : [...medAlarmOffsets, offset].sort((a, b) => a - b);
    setMedAlarmOffsets(next);
    saveMedAlarmPrefs({ offsets: next, repeatEnabled: medRepeatEnabled, activeDays: medActiveDays });
  };

  const toggleMedRepeat = () => {
    const next = !medRepeatEnabled;
    setMedRepeatEnabled(next);
    saveMedAlarmPrefs({ offsets: medAlarmOffsets, repeatEnabled: next, activeDays: medActiveDays });
  };

  const toggleMedDay = (day: string) => {
    const next = medActiveDays.includes(day)
      ? medActiveDays.filter((d) => d !== day)
      : [...medActiveDays, day];
    setMedActiveDays(next);
    saveMedAlarmPrefs({ offsets: medAlarmOffsets, repeatEnabled: medRepeatEnabled, activeDays: next });
  };

  const toggleCounselingAlarmOffset = (minutes: number) => {
    const next = counselingAlarmOffsets.includes(minutes)
      ? counselingAlarmOffsets.filter((o) => o !== minutes)
      : [...counselingAlarmOffsets, minutes].sort((a, b) => b - a);
    setCounselingAlarmOffsets(next);
    saveCounselingAlarmPrefs({ offsets: next });
  };

  const counselingAlarmActive = allNotificationsEnabled ? counselingNotification : false;
  const counselingAlarmSummary = counselingAlarmActive
    ? (counselingAlarmOffsets.length === 0
        ? '알림 없음'
        : counselingAlarmOffsets
            .map((m) => COUNSELING_ALARM_OPTIONS.find((o) => o.minutes === m)?.label ?? '')
            .filter(Boolean)
            .join(' · '))
    : '하루 전 · 1시간 전';

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

  const medAlarmActive = allNotificationsEnabled ? settings.medicationNotification : false;
  const medAlarmSummary = medAlarmActive ? formatMedAlarmSummary(medAlarmOffsets, medActiveDays) : '하루 평균 2-3건';

  const categories = [
    {
      color: 'bg-purple-500',
      desc: '월요일 아침',

      onToggle: () => toggleCategory('reportNotification'),
      active: allNotificationsEnabled ? settings.reportNotification : false,
      title: '주간 리포트',
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
      className="w-full h-full bg-gray-100 text-sm flex flex-col"
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
              {/* 복약 알림 — 설정 바텀시트 */}
              <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
                <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                <button
                  type="button"
                  disabled={!medAlarmActive}
                  onClick={() => medAlarmActive && setMedAlarmSheetOpen(true)}
                  className="grow basis-[0%] text-left disabled:cursor-default"
                >
                  <div className="font-semibold">복약 알림</div>
                  <div className="mt-[2px] text-gray-600 text-xs flex items-center gap-0.5">
                    <span>{medAlarmSummary}</span>
                    {medAlarmActive && <ChevronRight className="w-[10px] h-[10px] text-gray-400" strokeWidth={2.5} />}
                  </div>
                </button>
                <Toggle active={medAlarmActive} onClick={() => toggleCategory('medicationNotification')} disabled={!allNotificationsEnabled} />
              </div>
              {/* 상담 알림 — 설정 바텀시트 */}
              <div className="items-center flex gap-2.5 pt-3 pr-[14px] pb-3 pl-[14px] border-b" style={{ borderBottomColor: 'rgb(233, 228, 220)' }}>
                <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
                <button
                  type="button"
                  disabled={!counselingAlarmActive}
                  onClick={() => counselingAlarmActive && setCounselingAlarmSheetOpen(true)}
                  className="grow basis-[0%] text-left disabled:cursor-default"
                >
                  <div className="font-semibold">상담 알림</div>
                  <div className="mt-[2px] text-gray-600 text-xs flex items-center gap-0.5">
                    <span>{counselingAlarmSummary}</span>
                    {counselingAlarmActive && <ChevronRight className="w-[10px] h-[10px] text-gray-400" strokeWidth={2.5} />}
                  </div>
                </button>
                <Toggle active={counselingAlarmActive} onClick={toggleCounselingNotification} disabled={!allNotificationsEnabled} />
              </div>
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
                  <div className="flex gap-2">
                    {QUIET_HOUR_EXCLUSION_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        disabled={!nightModeEnabled}
                        onClick={() => toggleQuietHourExclusion(option)}
                        className={`flex-1 text-xs font-semibold py-2 rounded-full border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          quietHourExclusions.includes(option)
                            ? 'bg-purple-100 border-purple-300 text-purple-800'
                            : 'bg-gray-50 border-gray-200 text-gray-400'
                        }`}
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

      {/* 복약 알림 설정 바텀시트 */}
      {medAlarmSheetOpen && (
        <div className="absolute inset-0 bg-black/30 flex items-end z-50" onClick={() => setMedAlarmSheetOpen(false)}>
          <div className="w-full bg-white rounded-t-3xl shadow-[rgba(0,0,0,0.18)_0px_-8px_24px_0px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="font-bold text-base text-gray-800">복약 알림 설정</div>
              <button type="button" onClick={() => setMedAlarmSheetOpen(false)} className="w-8 h-8 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-500" strokeWidth={2.5} />
              </button>
            </div>

            <div className="px-5 pb-8 flex flex-col gap-5">
              {/* 몇 분 전 */}
              <div>
                <div className="font-semibold text-sm text-gray-700 mb-2">복용 몇 분 전에 알릴까요?</div>
                <div className="flex gap-2">
                  {ALARM_OFFSETS.map((offset) => (
                    <button
                      key={offset}
                      type="button"
                      onClick={() => toggleMedAlarmOffset(offset)}
                      className={`flex-1 text-sm font-semibold py-2 rounded-full border transition-colors ${medAlarmOffsets.includes(offset) ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-gray-50 border-gray-200 text-gray-400'}`}
                    >
                      {offset}분 전
                    </button>
                  ))}
                </div>
              </div>

              {/* 요일 반복 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-sm text-gray-700">요일 반복</div>
                  <Toggle active={medRepeatEnabled} onClick={toggleMedRepeat} />
                </div>
                {medRepeatEnabled && (
                  <div className="flex gap-1">
                    {WEEKDAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleMedDay(day)}
                        className={`flex-1 font-bold text-sm py-2 rounded-xl transition-colors ${medActiveDays.includes(day) ? 'bg-purple-300 text-white' : 'bg-purple-50 text-gray-500'}`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 휴일에도 알림 */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-gray-700">휴일에도 알림</div>
                  <div className="text-xs text-gray-500 mt-0.5">공휴일에도 복약 알림을 받아요</div>
                </div>
                <Toggle
                  active={settings.takeMedicationOnHoliday}
                  onClick={() => patchSettings({ takeMedicationOnHoliday: !settings.takeMedicationOnHoliday })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 상담 알림 설정 바텀시트 */}
      {counselingAlarmSheetOpen && (
        <div className="absolute inset-0 bg-black/30 flex items-end z-50" onClick={() => setCounselingAlarmSheetOpen(false)}>
          <div className="w-full bg-white rounded-t-3xl shadow-[rgba(0,0,0,0.18)_0px_-8px_24px_0px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div className="font-bold text-base text-gray-800">상담 알림 설정</div>
              <button type="button" onClick={() => setCounselingAlarmSheetOpen(false)} className="w-8 h-8 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-500" strokeWidth={2.5} />
              </button>
            </div>
            <div className="px-5 pb-8">
              <div className="font-semibold text-sm text-gray-700 mb-2">상담 몇 시간 전에 알릴까요?</div>
              <div className="flex gap-2">
                {COUNSELING_ALARM_OPTIONS.map((option) => (
                  <button
                    key={option.minutes}
                    type="button"
                    onClick={() => toggleCounselingAlarmOffset(option.minutes)}
                    className={`flex-1 text-sm font-semibold py-2 rounded-full border transition-colors ${counselingAlarmOffsets.includes(option.minutes) ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-gray-50 border-gray-200 text-gray-400'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
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

function formatMedAlarmSummary(offsets: number[], activeDays: string[]): string {
  const weekdays = ['월', '화', '수', '목', '금'];
  const isWeekdays = activeDays.length === 5 && weekdays.every((d) => activeDays.includes(d));
  const isEveryday = activeDays.length === 7;
  const dayLabel = isEveryday ? '매일' : isWeekdays ? '평일' : activeDays.join('');
  const offsetLabel = offsets.length === 0 ? '알림 없음' : offsets.map((o) => `${o}분`).join(', ') + ' 전';
  return `${offsetLabel} · ${dayLabel}`;
}

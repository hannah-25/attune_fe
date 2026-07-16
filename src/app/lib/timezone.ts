import { getUserSettings, updateUserSettings } from '../api/user';
import {
  getAppliedTimezone,
  getDeferredTimezone,
  setAppliedTimezone,
  setDeferredTimezone,
} from './timezoneState';

/**
 * 브라우저(기기)의 IANA timezone을 반환한다. 예: 'Asia/Seoul'.
 * 브라우저가 timezone을 제공하지 못하면 null.
 */
export function getBrowserTimezone(): string | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezone && timezone.trim() ? timezone : null;
  } catch {
    return null;
  }
}

/**
 * 사용자가 "나중에"로 보류한 timezone을 기록한다(세션 한정).
 */
export function deferTimezone(timezone: string): void {
  setDeferredTimezone(timezone);
}

export type TimezoneChange = {
  browserTimezone: string;
  serverTimezone: string | null;
};

/**
 * 기기 timezone이 서버 설정과 다른지 감지한다. PATCH는 하지 않는다.
 * - 변경이 필요하면 { browserTimezone, serverTimezone } 반환.
 * - 변경 불필요/감지 불가/보류됨이면 null.
 *
 * 호출 시점: 보호 라우트 진입, 포그라운드 복귀(visibilitychange).
 * 호출부에서 로그인/게스트/온라인 여부를 먼저 확인한다.
 */
export async function detectTimezoneChange(): Promise<TimezoneChange | null> {
  const browserTimezone = getBrowserTimezone();
  // 브라우저가 timezone을 주지 않으면 서버 기본값을 유지한다.
  if (!browserTimezone) return null;

  // 이미 적용했거나, 이번 세션에서 보류한 tz면 서버에 묻지 않는다.
  if (getAppliedTimezone() === browserTimezone) return null;
  if (getDeferredTimezone() === browserTimezone) return null;

  let serverTimezone: string | null;
  try {
    const settings = await getUserSettings();
    serverTimezone = settings.timezone ?? null;
  } catch (err) {
    // 조회 실패 시 서버 기본값을 유지하고 다음 기회에 재시도한다.
    if (import.meta.env.DEV) console.error('[timezone] settings fetch failed:', err);
    return null;
  }

  if (serverTimezone === browserTimezone) {
    // 서버와 이미 일치 → 다음 감지에서 재조회하지 않도록 기록.
    setAppliedTimezone(browserTimezone);
    return null;
  }

  return { browserTimezone, serverTimezone };
}

/**
 * 사용자가 "현지 시간 적용"을 누르면 호출한다. 서버에 PATCH하고 적용값을 기록한다.
 * 실패 시 예외를 던진다(적용값 미기록 → 다음 기회에 재감지).
 */
export async function applyTimezone(timezone: string): Promise<void> {
  await updateUserSettings({ timezone });
  setAppliedTimezone(timezone);
}

import { getAccessToken } from '../api/client';
import { getUserSettings, updateUserSettings } from '../api/user';

let lastSyncedToken: string | null = null;

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
 * 앱 실행/로그인 시 호출한다. 브라우저 timezone이 서버에 저장된 값과 다를 때만
 * 사용자 설정 API로 업데이트한다.
 * - 브라우저가 timezone을 제공하지 못하면 서버 기본값을 유지(호출 안 함).
 * - 이미 동일하면 업데이트 API를 호출하지 않는다.
 */
export async function syncUserTimezone(): Promise<void> {
  const token = getAccessToken();
  if (!token || lastSyncedToken === token) return;

  const browserTimezone = getBrowserTimezone();
  if (!browserTimezone) return;

  lastSyncedToken = token;

  try {
    const settings = await getUserSettings();
    if (settings.timezone === browserTimezone) return;
    await updateUserSettings({ timezone: browserTimezone });
  } catch (err) {
    lastSyncedToken = null;
    // 타임존 동기화 실패는 앱 사용을 막지 않는다.
    if (import.meta.env.DEV) console.error('[timezone] sync failed:', err);
  }
}

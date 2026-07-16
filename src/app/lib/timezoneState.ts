// timezone 동기화 상태 저장소.
//
// 의존성이 없는 독립 모듈로 둔다: client.ts(세션 해제)와 timezone.ts(동기화) 양쪽에서
// 참조해야 하는데, client.ts → timezone.ts → user.ts → client.ts 순환을 피하기 위함.

// 마지막으로 서버에 적용(또는 서버와 일치 확인)한 timezone.
const APPLIED_TZ_KEY = 'timezone_applied';
// 사용자가 "나중에"로 보류한 timezone(세션 한정).
const DEFERRED_TZ_KEY = 'timezone_deferred';

function read(storage: Storage, key: string): string | null {
  try {
    const value = storage.getItem(key);
    return value && value.trim() ? value : null;
  } catch {
    return null;
  }
}

function write(storage: Storage, key: string, value: string): void {
  try {
    storage.setItem(key, value);
  } catch {
    // 저장 실패(프라이빗 모드 등)는 동기화 자체를 막지 않는다.
  }
}

export function getAppliedTimezone(): string | null {
  return read(localStorage, APPLIED_TZ_KEY);
}

export function setAppliedTimezone(timezone: string): void {
  write(localStorage, APPLIED_TZ_KEY, timezone);
}

export function getDeferredTimezone(): string | null {
  return read(sessionStorage, DEFERRED_TZ_KEY);
}

export function setDeferredTimezone(timezone: string): void {
  write(sessionStorage, DEFERRED_TZ_KEY, timezone);
}

/**
 * 세션 해제(로그아웃/탈퇴/세션 만료) 시 호출한다.
 *
 * 적용·보류 상태는 계정별 값이므로 반드시 비워야 한다. 남겨두면 같은 기기에서
 * 다른 계정이 로그인했을 때 "이미 적용됨"으로 오판해 그 계정의 timezone이
 * 영영 동기화되지 않는다.
 */
export function resetTimezoneSyncState(): void {
  try {
    localStorage.removeItem(APPLIED_TZ_KEY);
    sessionStorage.removeItem(DEFERRED_TZ_KEY);
  } catch {
    // 무시: 상태 초기화 실패가 로그아웃을 막아선 안 된다.
  }
}

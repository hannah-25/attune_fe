// timezone 동기화 상태 저장소.
//
// 의존성이 없는 독립 모듈로 둔다: client.ts(세션 해제)와 timezone.ts(동기화) 양쪽에서
// 참조해야 하는데, client.ts → timezone.ts → user.ts → client.ts 순환을 피하기 위함.
//
// 두 값 모두 sessionStorage에 둔다. 서버 설정은 여러 기기가 공유하는 가변 상태라
// localStorage에 영구 캐시하면 다른 기기에서 바뀐 값을 영영 감지하지 못한다.
// 세션당 1회는 서버에 다시 묻게 해서 스테일 범위를 세션으로 묶는다.

// 마지막으로 서버에 적용(또는 서버와 일치 확인)한 timezone.
const APPLIED_TZ_KEY = 'timezone_applied';
// 사용자가 "나중에"로 보류한 timezone.
const DEFERRED_TZ_KEY = 'timezone_deferred';

// 스토리지는 반드시 try 안에서 꺼낸다: 시크릿 모드/사이트 데이터 차단 환경에선
// 전역 sessionStorage 접근 자체가 SecurityError를 던질 수 있어, 인자로 넘기면
// 함수 진입 전(인자 평가 시점)에 터져 아래 catch가 무용지물이 된다.
function read(key: string): string | null {
  try {
    const value = window.sessionStorage.getItem(key);
    return value && value.trim() ? value : null;
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // 저장 실패(프라이빗 모드 등)는 동기화 자체를 막지 않는다.
  }
}

function remove(key: string): void {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // 무시: 상태 초기화 실패가 로그아웃을 막아선 안 된다.
  }
}

export function getAppliedTimezone(): string | null {
  return read(APPLIED_TZ_KEY);
}

export function setAppliedTimezone(timezone: string): void {
  write(APPLIED_TZ_KEY, timezone);
}

export function getDeferredTimezone(): string | null {
  return read(DEFERRED_TZ_KEY);
}

export function setDeferredTimezone(timezone: string): void {
  write(DEFERRED_TZ_KEY, timezone);
}

/**
 * 세션 해제(로그아웃/탈퇴/세션 만료) 시 호출한다.
 *
 * 적용·보류 상태는 계정별 값이므로 반드시 비워야 한다. 남겨두면 같은 탭에서
 * 다른 계정이 로그인했을 때 "이미 적용됨"으로 오판해 그 계정의 timezone이
 * 동기화되지 않는다.
 */
export function resetTimezoneSyncState(): void {
  // 한쪽이 던져도 나머지는 반드시 비운다.
  remove(APPLIED_TZ_KEY);
  remove(DEFERRED_TZ_KEY);
}

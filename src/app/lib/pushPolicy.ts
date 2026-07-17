// 앱 시작 시 이 기기의 푸시 구독을 되살릴지 판정한다. DOM에 의존하지 않는다.
//
// Notification.permission만으로는 "브라우저가 구독을 폐기한 것"과 "사용자가 알림을 끈 것"을
// 구별할 수 없다. 둘 다 permission은 granted로 남기 때문이다. 구별하지 못한 채 재구독하면
// 사용자가 끈 알림이 앱을 열 때마다 되살아난다. 그래서 기기의 의도를 명시적으로 기록해두고
// 그것만 신뢰한다.

export type PushOptIn = 'true' | 'false' | null;

export type PushSyncAction =
  | 'skip'
  | 'register-existing'
  | 'create-and-register';

export type PushSyncDecision = {
  action: PushSyncAction;
  // 의도 기록이 도입되기 전에 구독한 기기 — 구독이 실제로 있으면 opt-in으로 승격한다.
  promoteOptIn: boolean;
};

export function decidePushSync(optIn: PushOptIn, hasSubscription: boolean): PushSyncDecision {
  // 사용자가 껐다. 되살리지 않는다.
  if (optIn === 'false') {
    return { action: 'skip', promoteOptIn: false };
  }

  if (optIn === 'true') {
    return {
      action: hasSubscription ? 'register-existing' : 'create-and-register',
      promoteOptIn: false,
    };
  }

  // 의도를 모른다(레거시). 남아있는 구독은 의도의 증거이므로 살리되,
  // 없는 구독을 새로 만들면 의도를 추측하는 셈이 되므로 만들지 않는다.
  return hasSubscription
    ? { action: 'register-existing', promoteOptIn: true }
    : { action: 'skip', promoteOptIn: false };
}

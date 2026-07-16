import { useCallback, useEffect, useRef, useState } from 'react';
import { getAccessToken } from '../api/client';
import { isGuestMode } from '../guest';
import { applyTimezone, deferTimezone, detectTimezoneChange, TimezoneChange } from '../lib/timezone';

const FONT_FAMILY = "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/**
 * 기기 timezone이 서버 설정과 다를 때 확인 바텀시트를 띄운다.
 * - 보호 라우트 진입 및 포그라운드 복귀(visibilitychange) 시 재감지.
 * - "현지 시간 적용" → PATCH, "나중에" → 세션 동안 해당 tz 재알림 안 함.
 * - 서버에 timezone이 없으면(최초 설정) 묻지 않고 조용히 적용한다.
 */
export default function TimezoneSyncPrompt() {
  const [change, setChange] = useState<TimezoneChange | null>(null);
  const [applying, setApplying] = useState(false);
  // 확인창이 떠 있거나 감지가 진행 중이면 재감지하지 않는다(중복 요청 방지).
  const busyRef = useRef(false);

  const check = useCallback(() => {
    if (busyRef.current) return;
    if (isGuestMode() || !getAccessToken() || !navigator.onLine) return;

    busyRef.current = true;
    // 확인창을 띄웠다면 닫힐 때(close) 잠금을 해제하므로 여기서 풀지 않는다.
    let prompted = false;
    void detectTimezoneChange()
      .then(async result => {
        if (!result) return;

        // 서버에 timezone이 아직 없으면(최초 설정) 바뀐 게 없으므로 "변경되었습니다"를
        // 묻지 않고 조용히 적용한다. 실패해도 서버 기본값이 유지될 뿐이라 무시한다.
        if (result.serverTimezone === null) {
          await applyTimezone(result.browserTimezone).catch(err => {
            if (import.meta.env.DEV) console.error('[timezone] silent apply failed:', err);
          });
          return;
        }

        setChange(result);
        prompted = true;
      })
      .catch(err => {
        // 예상 못 한 예외로 잠금이 영구히 걸리지 않도록 반드시 해제한다.
        if (import.meta.env.DEV) console.error('[timezone] check failed:', err);
      })
      .finally(() => {
        if (!prompted) busyRef.current = false;
      });
  }, []);

  const close = useCallback(() => {
    setChange(null);
    busyRef.current = false;
  }, []);

  useEffect(() => {
    check();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') check();
    };
    const onOnline = () => check();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('online', onOnline);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('online', onOnline);
    };
  }, [check]);

  if (!change) return null;

  const handleApply = async () => {
    if (applying) return;
    setApplying(true);
    try {
      await applyTimezone(change.browserTimezone);
    } catch {
      // PATCH 실패 시 서버 기본값을 유지한다(적용값 미기록 → 다음 기회에 재감지).
    } finally {
      setApplying(false);
      close();
    }
  };

  const handleDefer = () => {
    if (applying) return;
    deferTimezone(change.browserTimezone);
    close();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-end z-[60]"
      onClick={handleDefer}
      style={{ fontFamily: FONT_FAMILY }}
    >
      <div
        className="w-full bg-white rounded-t-3xl pt-6 pb-10 px-5 shadow-[rgba(0,0,0,0.18)_0px_-8px_24px_0px]"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="timezone-sync-title"
      >
        <div id="timezone-sync-title" className="font-bold text-base text-center mb-2">
          현재 시간대가 변경되었습니다
        </div>
        <div className="text-sm text-gray-600 text-center leading-relaxed mb-6">
          복약 알림을 현지 시간
          <br />
          (<span className="font-semibold text-gray-800">{change.browserTimezone}</span>)으로
          변경할까요?
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleApply}
            disabled={applying}
            className="items-center flex justify-center w-full font-bold h-12 bg-[rgb(31,27,46)] text-white rounded-2xl disabled:opacity-60"
          >
            현지 시간 적용
          </button>
          <button
            type="button"
            onClick={handleDefer}
            disabled={applying}
            className="items-center flex justify-center w-full font-bold h-12 text-gray-600 rounded-2xl disabled:opacity-60"
          >
            나중에
          </button>
        </div>
      </div>
    </div>
  );
}

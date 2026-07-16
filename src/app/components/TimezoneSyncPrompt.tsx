import { useCallback, useEffect, useRef, useState } from 'react';
import { getAccessToken } from '../api/client';
import { isGuestMode } from '../guest';
import { applyTimezone, deferTimezone, detectTimezoneChange, TimezoneChange } from '../lib/timezone';

const FONT_FAMILY = "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/**
 * 기기 timezone이 서버 설정과 다를 때 확인 바텀시트를 띄운다.
 * - 보호 라우트 진입 및 포그라운드 복귀(visibilitychange) 시 재감지.
 * - "현지 시간 적용" → PATCH, "나중에" → 세션 동안 해당 tz 재알림 안 함.
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
    void detectTimezoneChange().then(result => {
      if (result) {
        setChange(result);
        // 확인창이 뜬 동안에는 잠금을 유지하고, 닫힐 때(close) 해제한다.
        return;
      }
      busyRef.current = false;
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
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
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

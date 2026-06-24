import { useEffect, useState } from 'react';
import { syncEvents } from '../offline/SyncService';

type SyncState = 'idle' | 'syncing' | 'complete';

const LABELS = {
  offline: '오프라인 · 작업이 저장됩니다',
  syncing: '동기화 중...',
  complete: '동기화 완료',
} as const;

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [syncState, setSyncState] = useState<SyncState>('idle');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setSyncState('idle');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleStart = () => setSyncState('syncing');
    const handleComplete = () => {
      setSyncState('complete');
      clearTimeout(timer);
      timer = setTimeout(() => setSyncState('idle'), 2000);
    };

    syncEvents.addEventListener('sync-start', handleStart);
    syncEvents.addEventListener('sync-complete', handleComplete);
    return () => {
      syncEvents.removeEventListener('sync-start', handleStart);
      syncEvents.removeEventListener('sync-complete', handleComplete);
      clearTimeout(timer);
    };
  }, []);

  if (isOnline && syncState === 'idle') return null;

  const bannerClass =
    'fixed top-0 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-b-xl shadow-md transition-all duration-300';

  if (!isOnline) {
    return (
      <div className={`${bannerClass} bg-gray-800 text-white`}>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
        {LABELS.offline}
      </div>
    );
  }

  if (syncState === 'syncing') {
    return (
      <div className={`${bannerClass} bg-purple-600 text-white`}>
        <span className="w-1.5 h-1.5 rounded-full bg-purple-200 inline-block animate-pulse" />
        {LABELS.syncing}
      </div>
    );
  }

  if (syncState === 'complete') {
    return (
      <div className={`${bannerClass} bg-green-600 text-white`}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-200 inline-block" />
        {LABELS.complete}
      </div>
    );
  }

  return null;
}

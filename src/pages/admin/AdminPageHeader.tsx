import { RefreshCcw } from 'lucide-react';
import logoSquare from '@src/assets/logo-square.png';

export default function AdminPageHeader({
  title,
  refreshing = false,
  onRefresh,
}: {
  title: string;
  refreshing?: boolean;
  onRefresh?: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2.5">
          <img src={logoSquare} alt="" className="h-9 w-9 object-contain" />
          <div className="hidden sm:block">
            <div className="text-sm font-extrabold tracking-tight">a.tune</div>
            <div className="text-[10px] font-bold text-gray-400">관리자 전용</div>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-base font-bold">{title}</div>
        {onRefresh ? (
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            aria-label={`${title} 새로고침`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50 disabled:opacity-50 md:w-auto md:gap-2 md:rounded-xl md:px-3.5"
          >
            <RefreshCcw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden text-xs font-bold md:inline">새로고침</span>
          </button>
        ) : (
          <div className="h-10 w-10" aria-hidden="true" />
        )}
      </div>
    </header>
  );
}

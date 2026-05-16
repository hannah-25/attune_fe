import React from 'react';

type HeaderIconButtonProps = {
  alt?: string;
  src: string;
};

type TopBarProps = {
  actionAlt?: string;
  actionIconSrc?: string;
  centered?: boolean;
  left?: React.ReactNode;
  reserveLeft?: boolean;
  reserveRight?: boolean;
  right?: React.ReactNode;
  showBack?: boolean;
  title?: React.ReactNode;
};

export function BackButton({ ariaLabel = '이전 화면' }: { ariaLabel?: string }) {
  return (
    <button
      className="items-center flex justify-center w-11 h-11 text-gray-700 rounded-xl hover:bg-white/60 transition-colors"
      aria-label={ariaLabel}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18L9 12L15 6" />
      </svg>
    </button>
  );
}

export function HeaderIconButton({ alt = '', src }: HeaderIconButtonProps) {
  return (
    <div className="items-center flex justify-center w-11 h-11">
      <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
        <div className="overflow-hidden w-4 h-4">
          <img src={src} alt={alt} className="block size-full" />
        </div>
      </div>
    </div>
  );
}

export function TopBar({
  actionAlt,
  actionIconSrc,
  centered = false,
  left,
  reserveLeft,
  reserveRight,
  right,
  showBack = false,
  title,
}: TopBarProps) {
  const shouldReserveLeft = reserveLeft ?? centered;
  const leftContent = left ?? (showBack ? <BackButton /> : shouldReserveLeft ? <div className="w-11 h-11" /> : null);
  const rightContent = right ?? (actionIconSrc ? <HeaderIconButton src={actionIconSrc} alt={actionAlt} /> : null);
  const shouldReserveRight = reserveRight ?? centered;

  return (
    <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-[0]">
      <div className={`items-center flex justify-between${centered ? ' relative' : ''}`}>
        {leftContent}
        {centered ? (
          <div className="absolute left-[50%] translate-x-[-50%] font-bold text-sm">{title}</div>
        ) : (
          <div className="font-bold text-sm">{title}</div>
        )}
        {rightContent ?? (shouldReserveRight ? <div className="w-11 h-11" /> : null)}
      </div>
    </div>
  );
}

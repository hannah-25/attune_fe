import React from 'react';

type HeaderIconButtonProps = {
  alt?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  src?: string;
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
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
};

type BackButtonProps = {
  ariaLabel?: string;
  onClick?: () => void;
};

export function BackButton({ ariaLabel = '이전 화면', onClick }: BackButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    window.history.back();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
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

export function HeaderIconButton({ alt = '', icon, onClick, src }: HeaderIconButtonProps) {
  const inner = (
    <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
      {icon ?? (src ? (
        <div className="overflow-hidden w-4 h-4">
          <img src={src} alt={alt} className="block size-full" />
        </div>
      ) : null)}
    </div>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="items-center flex justify-center w-11 h-11">
        {inner}
      </button>
    );
  }
  return (
    <div className="items-center flex justify-center w-11 h-11">
      {inner}
    </div>
  );
}

export function TopBar({
  actionAlt,
  actionIconSrc,
  left,
  right,
  showBack = false,
  subtitle,
  title,
}: TopBarProps) {
  const leftContent = left ?? (showBack ? <BackButton /> : <div className="w-11 h-11" />);
  const rightContent = right ?? (actionIconSrc ? <HeaderIconButton src={actionIconSrc} alt={actionAlt} /> : <div className="w-11 h-11" />);

  return (
    <div className="flex flex-col gap-1 pt-1 pr-3 pb-5 pl-3 shrink-[0]">
      <div className="items-center flex justify-between relative">
        {leftContent}
        <div className="absolute left-[50%] translate-x-[-50%] font-bold text-base">{title}</div>
        {rightContent}
      </div>
      {subtitle && <div className="text-center text-gray-600 text-xs">{subtitle}</div>}
    </div>
  );
}

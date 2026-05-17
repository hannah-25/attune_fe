import React from 'react';
import { twMerge } from 'tailwind-merge';

export function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pb-[160px] px-4', className)}>
      {children}
    </div>
  );
}

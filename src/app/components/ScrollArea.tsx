import React from 'react';
import { twMerge } from 'tailwind-merge';

export function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] px-4', className)}>
      {children}
      {/* Safari on iOS ignores padding-bottom on flex scroll containers — use a real element instead */}
      <div className="h-[200px] shrink-0" aria-hidden="true" />
    </div>
  );
}

import React from 'react';
import { useLocation } from 'react-router';

type AppViewportProps = {
  children: React.ReactNode;
};

export function AppViewport({ children }: AppViewportProps) {
  const { pathname } = useLocation();
  const isPageScrollable = pathname === '/' || pathname === '/calendar';

  return (
    <div className="fixed inset-0 flex h-dvh min-h-dvh w-full flex-col overflow-hidden bg-gray-50">
      <div
        className={
          isPageScrollable
            ? 'flex h-dvh min-h-dvh w-full flex-col overflow-y-auto'
            : 'flex h-dvh min-h-dvh w-full flex-col overflow-hidden'
        }
      >
        {children}
      </div>
    </div>
  );
}

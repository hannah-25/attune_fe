import React from 'react';
import { useLocation } from 'react-router';
import { OfflineIndicator } from './OfflineIndicator';

type AppViewportProps = {
  children: React.ReactNode;
};

export function AppViewport({ children }: AppViewportProps) {
  const { pathname } = useLocation();
  const isOverview = pathname === '/overview';
  const isAdmin = pathname.startsWith('/admin');
  const isPageScrollable = pathname === '/' || pathname === '/calendar';

  if (isOverview || isAdmin) {
    return (
      <div className="fixed inset-0 overflow-auto bg-white">
        {children}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex h-dvh min-h-dvh w-full flex-col overflow-hidden bg-gray-50">
      <OfflineIndicator />
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

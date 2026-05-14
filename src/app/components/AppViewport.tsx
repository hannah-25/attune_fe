import React from 'react';
import { useLocation } from 'react-router';

type AppViewportProps = {
  children: React.ReactNode;
};

export function AppViewport({ children }: AppViewportProps) {
  const { pathname } = useLocation();
  const isIndexPage = pathname === '/';

  return (
    <div
      className={
        isIndexPage
          ? 'fixed inset-0 flex h-dvh min-h-dvh w-full flex-col overflow-y-auto bg-gray-50'
          : 'fixed inset-0 flex h-dvh min-h-dvh w-full flex-col overflow-hidden bg-gray-50 [&>*]:h-dvh [&>*]:min-h-dvh [&>*]:w-full [&>*]:shrink-0'
      }
    >
      {children}
    </div>
  );
}

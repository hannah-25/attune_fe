import React from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { HeaderIconButton } from './TopBar';

export function NavBackButton({ onClick }: { onClick?: () => void }) {
  return (
    <HeaderIconButton
      icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />}
      onClick={onClick}
    />
  );
}

export function NavCloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <HeaderIconButton
      icon={<X className="h-4 w-4 text-gray-700" strokeWidth={2.4} />}
      onClick={onClick}
    />
  );
}

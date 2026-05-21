import React from 'react';
import { BackButton } from './TopBar';

type OnboardingTopBarProps = {
  description?: React.ReactNode;
  progressClassName: string;
  step: number;
  title: React.ReactNode;
  total?: number;
};

export function OnboardingTopBar({
  description,
  progressClassName,
  step,
  title,
  total = 4,
}: OnboardingTopBarProps) {
  return (
    <div className="flex flex-col gap-2.5 pt-0 pr-0 pb-0 pl-0 shrink-[0]">
      <div className="relative h-1 bg-purple-50 rounded-sm">
        <div className={`absolute left-0 top-0 bottom-0 rounded-sm ${progressClassName}`} />
      </div>
      <div className="items-start flex pt-1 pr-4 pl-1">
        <BackButton />
        <div className="grow">
          <div className="font-semibold text-gray-900 text-sm leading-tight">{title}</div>
          {description ? (
            <div className="mt-1 text-gray-600 text-xs leading-relaxed">{description}</div>
          ) : null}
        </div>
        <div className="text-gray-600 text-xs whitespace-nowrap ml-2 mt-0.5 shrink-0">
          {step} / {total}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export type Tab = '홈' | '일지' | '약' | '캘린더' | '커뮤니티' | '리포트' | '상담';
export type TabBarVariant = 'main' | 'report' | 'counseling';

const icons: Record<Tab, React.ReactNode> = {
  홈: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
    </svg>
  ),
  일지: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
    </svg>
  ),
  약: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect x="3" y="10" width="18" height="4" rx="2" />
      <line x1="12" y1="10" x2="12" y2="14" />
    </svg>
  ),
  캘린더: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <rect x="3" y="4.5" width="18" height="17" rx="2" />
      <path d="M3 10h18M8 2v4M16 2v4" />
    </svg>
  ),
  커뮤니티: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2 20c0-3.314 3.134-6 7-6s7 2.686 7 6" />
      <path d="M17.5 14.5c2 .5 4.5 1.8 4.5 4.5" />
    </svg>
  ),
  리포트: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  상담: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
};

const TAB_PRESETS: Record<TabBarVariant, Tab[]> = {
  main: ['홈', '일지', '약', '캘린더', '커뮤니티'],
  report: ['홈', '일지', '약', '캘린더', '리포트'],
  counseling: ['홈', '일지', '약', '캘린더', '상담'],
};

interface TabBarProps {
  active?: Tab;
  variant?: TabBarVariant;
  tabs?: Tab[];
}

function TabBarItem({ active, tab }: { active: boolean; tab: Tab }) {
  return (
    <div
      className={`items-center flex flex-col grow justify-center basis-[0%] text-xs gap-1 min-h-11 ${active ? 'font-bold' : 'font-medium text-gray-500'}`}
      aria-current={active ? 'page' : undefined}
    >
      {icons[tab]}
      {tab}
    </div>
  );
}

export function TabBar({ active, variant = 'main', tabs }: TabBarProps) {
  const visibleTabs = tabs ?? TAB_PRESETS[variant];

  return (
    <nav
      className="items-center flex justify-around absolute h-[62px] left-3 right-3 bottom-[14px] backdrop-blur-[20px] backdrop-saturate-[1.8] bg-white/80 border-white/60 border shadow-[rgba(60,40,90,0.12)_0px_10px_30px_0px,_rgba(255,255,255,0.7)_0px_1px_0px_0px_inset] z-[20] rounded-[1.9375rem]"
      aria-label="하단 내비게이션"
    >
      {visibleTabs.map(tab => (
        <TabBarItem key={tab} tab={tab} active={active === tab} />
      ))}
    </nav>
  );
}

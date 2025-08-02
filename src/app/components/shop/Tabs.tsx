'use client';

import { twMerge } from 'tailwind-merge';

export default function Tabs({
  tabs,
  selectedTab,
  setSelectedTab,
  activeTab = 'border-[1.5px] border-[#FFB84C] bg-[#FFB84C] text-white shadow-sm',
  inactiveTab = 'border border-[#E0E0E0] bg-[#F9F9F9] text-[#AAAAAA]',
  className,
}: {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  activeTab?: string;
  inactiveTab?: string;
  className?: string;
}) {
  return (
    <div className="flex gap-2.5 px-2 py-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          className={twMerge(
            'h-9 min-w-[80px] rounded-md px-4 text-base font-semibold transition-all cursor-pointer',
            selectedTab === tab ? activeTab : inactiveTab,
            className
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

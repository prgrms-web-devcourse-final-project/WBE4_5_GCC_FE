// import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Tabs({
  tabs,
  selectedTab,
  setSelectedTab,
  activeTab = 'border-1 border-[#ffb84c] bg-[#ffb84c] text-white dark:text-[var(--dark-bg-primary)]',
  inactiveTab = 'border border-b-0 border-[#d9d9d9] bg-white dark:bg-[var(--dark-bg-primary)] text-[#AAAAAA]',
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
    <div className="flex">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          className={twMerge(
            'h-[30px] min-w-[70px] cursor-pointer rounded-t-md px-4 py-2 text-xs font-semibold',
            selectedTab === tab ? activeTab : inactiveTab,
            className,
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

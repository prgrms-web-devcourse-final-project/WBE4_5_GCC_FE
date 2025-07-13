import clsx from 'clsx';

export default function Tabs({
  tabs,
  selectedTab,
  setSelectedTab,
}: {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}) {
  return (
    <>
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={clsx(
              'h-[30px] min-w-[70px] cursor-pointer rounded-t-md px-4 py-2 text-xs font-semibold',
              selectedTab === tab
                ? 'border-1 border-[#FFB84C] bg-[#FFB84C] text-white'
                : 'border border-b-0 border-[#D9D9D9] bg-white text-[#AAAAAA]',
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  );
}

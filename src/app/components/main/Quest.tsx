import { useState } from 'react';
import Tabs from '../shop/Tabs';
import QuestList from './QuestList';

export default function Quest({
  setOpenQuest,
  className,
}: {
  setOpenQuest: (value: boolean) => void;
  className?: string;
}) {
  const quests = [
    {
      id: 1,
      title: '루틴 5일 연속 달성하기',
      reward: 50,
      max: 5,
      now: 5,
      category: '주간 퀘스트',
    },
    {
      id: 2,
      title: '청소/정리 루틴 5일 연속 달성하기',
      reward: 20,
      max: 5,
      now: 3,
      category: '주간 퀘스트',
    },
    {
      id: 3,
      title: '세탁/의류 5일 연속 달성하기',
      reward: 20,
      max: 5,
      now: 4,
      category: '주간 퀘스트',
    },
    {
      id: 4,
      title: '이벤트 퀘스트 1',
      reward: 20,
      max: 5,
      now: 3,
      category: '이벤트 퀘스트',
    },
    {
      id: 5,
      title: '이벤트 퀘스트2',
      reward: 20,
      max: 5,
      now: 5,
      category: '이벤트 퀘스트',
    },
    {
      id: 6,
      title: '이벤트 퀘스트3',
      reward: 20,
      max: 5,
      now: 4,
      category: '이벤트 퀘스트',
    },
    {
      id: 7,
      title: '이벤트 퀘스트4',
      reward: 20,
      max: 5,
      now: 2,
      category: '이벤트 퀘스트',
    },
    {
      id: 8,
      title: '이벤트 퀘스트5',
      reward: 20,
      max: 5,
      now: 5,
      category: '이벤트 퀘스트',
    },
    {
      id: 9,
      title: '이벤트 퀘스트6',
      reward: 20,
      max: 5,
      now: 2,
      category: '이벤트 퀘스트',
    },
    {
      id: 10,
      title: '이벤트 퀘스트7',
      reward: 20,
      max: 5,
      now: 0,
      category: '이벤트 퀘스트',
    },
  ];
  const tabs = ['주간 퀘스트', '이벤트 퀘스트'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const filteredQuest =
    selectedTab === '전체'
      ? quests
      : quests.filter((quest) => quest.category === selectedTab);
  return (
    <>
      {/* 퀘스트 뒷 배경. 터치시 모달 창 닫힘 */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => setOpenQuest(false)}
      >
        {/* 퀘스트 모달 박스 */}

        <div
          className="absolute z-100 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            activeTab="border-1 border-[#A47148] bg-[#A47148] text-white"
            className="h-[37px] min-w-[140px] text-[14px]"
          />
          <div
            className={`mx-auto flex h-[569px] w-full min-w-[350px] flex-col items-center gap-4 overflow-y-scroll rounded-[8px] rounded-tl-none border-3 border-[#A47148] bg-white px-4 py-[18px] ${className}`}
          >
            {filteredQuest.map((quest) => (
              <QuestList key={quest.id} quest={quest} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

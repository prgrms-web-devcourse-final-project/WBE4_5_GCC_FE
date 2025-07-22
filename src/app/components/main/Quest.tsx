import { useEffect, useState } from 'react';
import Tabs from '../shop/Tabs';
import QuestList from './QuestList';
import { fetchUserQuest } from '@/api/member';
import type { Quest } from '../../../../types/User';

export default function Quest({
  setOpenQuest,
  className,
}: {
  setOpenQuest: (value: boolean) => void;
  className?: string;
}) {
  const tabs = ['주간 퀘스트', '이벤트 퀘스트'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [userQuest, setUserQuest] = useState<Quest[]>([]);

  useEffect(() => {
    const loadUserQuest = async () => {
      try {
        const data = await fetchUserQuest();
        console.log('유저 퀘스트:', data);
        setUserQuest(data.data);
      } catch (err) {
        console.error('유저 정보 불러오기 실패', err);
      }
    };

    loadUserQuest();
  }, []);

  const filteredQuest =
    selectedTab === '전체'
      ? userQuest
      : userQuest.filter((quest) => {
          if (selectedTab === '주간 퀘스트' && !quest.isDone) {
            return quest.questKey.startsWith('weekly_');
          }
          if (selectedTab === '이벤트 퀘스트' && !quest.isDone) {
            return quest.questKey.startsWith('event_');
          }
          return false;
        });

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
              <QuestList key={quest.questKey} quest={quest} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import Tabs from '../shop/Tabs';
import QuestList from './QuestList';
import { fetchUserQuest } from '@/api/member';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../common/ui/LoadingSpinner';
import { EventQuest, Quest, QuestResponse } from '../../../../types/general';

export default function QuestPage({
  setOpenQuest,
  className,
}: {
  setOpenQuest: (value: boolean) => void;
  className?: string;
}) {
  const tabs = ['주간 퀘스트', '이벤트 퀘스트'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const {
    data: userQuest = { weeklyQuests: [], eventQuests: [] },
    isLoading,
    isError,
  } = useQuery<QuestResponse, Error>({
    queryKey: ['user-quests'],
    queryFn: fetchUserQuest,
    staleTime: 5 * 60 * 1000, // 5분 캐싱
    retry: 0,
  });

  const allQuests: (Quest | EventQuest)[] = [
    ...userQuest.weeklyQuests,
    ...userQuest.eventQuests,
  ];

  const filteredQuest: (Quest | EventQuest)[] =
    selectedTab === '주간 퀘스트'
      ? userQuest.weeklyQuests.filter((quest) => !quest.isRewarded)
      : selectedTab === '이벤트 퀘스트'
        ? userQuest.eventQuests.filter((quest) => !quest.isRewarded)
        : allQuests;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="text-red-500">퀘스트 불러오기 실패</div>
      </div>
    );
  }

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
            className={`mx-auto flex h-[569px] w-full min-w-[360px] flex-col items-center gap-4 overflow-y-scroll rounded-[8px] rounded-tl-none border-3 border-[#A47148] bg-white px-4 py-[18px] ${className}`}
          >
            {filteredQuest.map((quest) => (
              <QuestList
                key={quest.questKey}
                quest={quest}
                type={selectedTab === '이벤트 퀘스트' ? 'EVENT' : 'WEEKLY'}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

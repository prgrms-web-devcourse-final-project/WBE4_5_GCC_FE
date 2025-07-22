import Image from 'next/image';
import coin from '/public/coin.svg';
import { Quest } from '../../../../types/User';
import { acceptQuest } from '@/api/quests';
import AlertModal from '../common/alert/AlertModal';
import { useState } from 'react';

interface QuestListProps {
  quest: Quest;
}

export default function QuestList({ quest }: QuestListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = async () => {
    await acceptQuest(quest.questKey);
    setIsOpen(true);
  };

  return (
    <>
      <div
        className="flex h-[70px] w-full min-w-[315px] justify-center gap-4 border-b border-dotted pb-[17px]"
        key={quest.questKey}
      >
        <div className="flex min-w-[238px] flex-col gap-[10px]">
          <h1 className="text-[14px] font-semibold">{quest.questInfo}</h1>
          {/* 진행율 */}
          <div className="relative flex h-[22px] w-full items-center justify-center rounded-[20px] border-1 border-[#A47148] bg-[#FFF4D1]">
            {quest.questProgress >= 1 && (
              <div
                className="absolute left-0 h-[22px] rounded-[20px] border-1 border-[#A47148] bg-[#A47148]"
                style={{ width: `${quest.questProgress}%` }}
              />
            )}
            <span className="z-100 flex text-[10px] font-medium">
              {quest.questProgress}%
            </span>
          </div>
        </div>
        <button
          className="relative flex h-[50px] w-[50px] cursor-pointer flex-col items-center justify-center gap-[6px] rounded-[8px] border-2 border-[#A47148]"
          disabled={quest.questProgress !== 100}
          onClick={handleClick}
        >
          {/* 퀘스트 진행률이 100일때만 수령가능 */}
          {quest.questProgress !== 100 && (
            <div className="absolute inset-0 z-50 w-full cursor-auto bg-black/50"></div>
          )}
          <Image src={coin} alt="coin" className="h-5 w-5" />
          <h1 className="text-[10px]">+ {quest.questReward}p</h1>
        </button>
      </div>
      {isOpen && (
        <AlertModal
          isOpen={true}
          type="success"
          title={`${quest.questInfo} 보상으로 ${quest.questReward} 포인트 획득!`}
          confirmText="확인"
          onConfirm={() => setIsOpen(false)} // 모달 닫기
        />
      )}
    </>
  );
}

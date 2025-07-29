import Image from 'next/image';
import coin from '/public/coin.svg';
import { acceptQuest } from '@/api/quests';
import AlertModal from '../common/alert/AlertModal';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EventQuest, Quest } from '../../../../types/general';

interface QuestListProps {
  quest: Quest | EventQuest;
}

export default function QuestList({ quest }: QuestListProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const acceptQuestMutation = useMutation({
    mutationFn: (key: string) => acceptQuest(key),
    onSuccess: () => {
      console.log('퀘스트 보상받기 성공');
      setIsOpen(true);

      // 보상받기 후 퀘스트 목록 최신화
      queryClient.invalidateQueries({ queryKey: ['user-quests'] });
    },
    onError: (error) => {
      console.error('퀘스트 보상받기 실패', error);
    },
  });

  const handleClick = () => {
    acceptQuestMutation.mutate('weekly_quest_01');
  };

  const questProgress = Math.floor((quest.progress / quest.target) * 100);

  return (
    <>
      <div
        className="flex h-[70px] w-full min-w-[315px] justify-between gap-4 border-b border-dotted pb-[17px]"
        key={quest.questKey}
      >
        <div className="flex min-w-[256px] flex-col gap-[10px]">
          <h1 className="text-[14px] font-semibold">{quest.questName}</h1>
          {/* 진행율 */}
          <div className="relative flex h-[22px] w-full items-center justify-center rounded-[20px] border-1 border-[#A47148] bg-[#FFF4D1]">
            {quest.progress >= 1 && (
              <div
                className="absolute left-0 h-[22px] rounded-[20px] border-1 border-[#A47148] bg-[#A47148]"
                style={{ width: `${questProgress}%` }}
              />
            )}
            <span className="z-1 flex text-[10px] font-medium">
              {quest.progress} / {quest.target}
            </span>
          </div>
        </div>
        <button
          className="relative flex h-[50px] w-[50px] cursor-pointer flex-col items-center justify-center gap-[6px] rounded-[8px] border-2 border-[#A47148]"
          disabled={questProgress !== 100}
          onClick={handleClick}
        >
          {/* 퀘스트 진행률이 100일때만 수령가능 */}
          {questProgress !== 100 && (
            <div className="absolute inset-0 z-50 w-full cursor-auto rounded-[6px] bg-black/50"></div>
          )}
          <Image src={coin} alt="coin" className="h-5 w-5" />
          <h1 className="text-[10px]">+ {quest.points}p</h1>
        </button>
      </div>
      {isOpen && (
        <AlertModal
          isOpen={true}
          type="success"
          title={`${quest.questName} 보상으로 ${quest.points} 포인트 획득!`}
          confirmText="확인"
          onConfirm={() => setIsOpen(false)} // 모달 닫기
        />
      )}
    </>
  );
}

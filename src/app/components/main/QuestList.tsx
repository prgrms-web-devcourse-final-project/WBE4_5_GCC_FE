import Image from 'next/image';
import coin from '/public/coin.svg';
import { acceptQuest } from '@/api/quests';
import AlertModal from '../common/alert/AlertModal';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EventQuest, Quest, QuestResponse } from '../../../../types/general';

interface QuestListProps {
  quest: Quest | EventQuest;
  type: 'WEEKLY' | 'EVENT';
}

export default function QuestList({ quest, type }: QuestListProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const acceptQuestMutation = useMutation({
    mutationFn: ({
      type,
      id,
    }: {
      type: string;
      id: number;
      rewardPoint?: number;
    }) => acceptQuest(type, id),
    onMutate: async ({ rewardPoint, id }) => {
      // 프로필에 들어가는 포인트 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: ['user-point'] });
      const previousPoints = queryClient.getQueryData<{ points: number }>([
        'user-point',
      ]);

      // 퀘스트 목록 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: ['user-quests'] });
      const previousQuests = queryClient.getQueryData<QuestResponse>([
        'user-quests',
      ]);

      queryClient.setQueryData(['user-point'], (old: { points: number }) => {
        if (!old) return old;
        return {
          ...old,
          points: old.points + (rewardPoint ?? 0),
        };
      });

      queryClient.setQueryData(
        ['user-quests'],
        (old: QuestResponse | undefined) => {
          if (!old) return old;

          const updatedWeekly = Array.isArray(old.weeklyQuests)
            ? old.weeklyQuests.filter((q) => q.progressId !== id)
            : [];

          const updatedEvent = Array.isArray(old.eventQuests)
            ? old.eventQuests.filter((q) => q.progressId !== id)
            : [];

          return {
            ...old,
            weeklyQuests: updatedWeekly,
            eventQuests: updatedEvent,
          };
        },
      );

      return { previousPoints, previousQuests };
    },
    onError: (err, _variables, context) => {
      if (context?.previousPoints) {
        queryClient.setQueryData(['user-point'], context.previousPoints);
      }
      if (context?.previousQuests) {
        queryClient.setQueryData(['user-quests'], context.previousQuests);
      }
      console.error('퀘스트 보상받기 실패', err);
    },

    onSuccess: () => {
      // 보상받기 후 퀘스트 목록, 유저 포인트 최신화
      queryClient.invalidateQueries({ queryKey: ['user-quests'] });
      queryClient.invalidateQueries({ queryKey: ['user-point'] });
    },
  });

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleQuest = () => {
    acceptQuestMutation.mutate({ type, id: quest.progressId });
    setIsOpen(false);
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
          onConfirm={handleQuest} // 모달 닫기
        />
      )}
    </>
  );
}

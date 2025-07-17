import Image from 'next/image';
import coin from '/public/coin.svg';
import { Quest } from '../../../../types/User';

interface QuestListProps {
  quest: Quest;
}

export default function QuestList({ quest }: QuestListProps) {
  return (
    <>
      <div className="flex h-[70px] w-full min-w-[315px] justify-center gap-4 border-b border-dotted pb-[17px]">
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
        <div className="relative flex h-[50px] w-[50px] flex-col items-center justify-center gap-[6px] rounded-[8px] border-2 border-[#A47148]">
          {!quest.isDone && (
            <div className="absolute inset-0 z-50 w-full bg-black/50"></div>
          )}
          <Image src={coin} alt="coin" className="h-5 w-5" />
          <h1 className="text-[10px]">+ {quest.questReward}p</h1>
        </div>
      </div>
    </>
  );
}

import Image from 'next/image';
import coin from '/public/coin.svg';

interface QuestListProps {
  quest: {
    id: number;
    title: string;
    reward: number;
    max: number;
    now: number;
    category: string;
  };
}

export default function QuestList({ quest }: QuestListProps) {
  const currentStep = quest.now;
  const totalSteps = quest.max;
  const finished = currentStep === totalSteps;
  const percentage = (currentStep / totalSteps) * 100;
  return (
    <>
      <div className="flex h-[70px] w-full min-w-[315px] justify-center gap-4 border-b border-dotted pb-[17px]">
        <div className="flex min-w-[238px] flex-col gap-[10px]">
          <h1 className="text-[14px] font-semibold">{quest.title}</h1>
          {/* 진행율 */}
          <div className="relative flex h-[22px] w-full items-center justify-center rounded-[20px] border-1 border-[#A47148] bg-[#FFF4D1]">
            {currentStep >= 1 && (
              <div
                className="absolute left-0 h-[22px] rounded-[20px] border-1 border-[#A47148] bg-[#A47148]"
                style={{ width: `${percentage}%` }}
              />
            )}
            <span className="z-100 flex text-[10px] font-medium">
              {quest.now}/{quest.max}
            </span>
          </div>
        </div>
        <div className="relative flex h-[50px] w-[50px] flex-col items-center justify-center gap-[6px] rounded-[8px] border-2 border-[#A47148]">
          {!finished && (
            <div className="absolute inset-0 z-50 w-full bg-black/50"></div>
          )}
          <Image src={coin} alt="coin" className="h-5 w-5" />
          <h1 className="text-[10px]">+ {quest.reward}p</h1>
        </div>
      </div>
    </>
  );
}

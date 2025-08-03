import { Ellipsis, CircleCheck } from 'lucide-react';
import YellowCheckIcon from '../routine/YellowCheckIcon';
export default function OnBoardingRoutine({
  title,
  category,
  time,
  isCompleted,
}: {
  title: string;
  category: string;
  time?: string;
  isCompleted?: boolean;
}) {
  const options = [
    '🧹 청소 / 정리',
    '💡 자기개발',
    '🧳 외출',
    '🧺 세탁 / 의류',
    '🍳 요리',
    '💸 소비',
    '♻️ 쓰레기 / 환경',
    '🏃🏻 건강',
    '📄 행정',
  ];
  const iconHandler =
    options.find((item) => item.includes(category)) || category;
  return (
    <>
      <div
        className={`flex w-full cursor-pointer items-center justify-between border px-3 py-4 select-none hover:shadow-sm ${isCompleted ? 'border-[#ffb84c]' : 'border-[#9e9e9e]'} rounded-[8px] bg-white dark:bg-[var(--dark-white)]/15`}
      >
        {isCompleted ? (
          <YellowCheckIcon />
        ) : (
          <CircleCheck className="mr-4 h-[30px] w-[30px] text-[#c4c4c4]" />
        )}
        <div className="relative flex w-full flex-col space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm">{title}</p>
            <Ellipsis className="h-[32px] w-[32px] cursor-pointer text-[#9e9e9e]" />
          </div>

          <div className="flex items-center justify-between gap-1.5 text-xs text-[#9e9e9e]">
            <div>
              <span>{iconHandler}</span>
            </div>

            <div className="ml-auto flex gap-1 text-[10px]">
              <span>⏰</span>
              <span className="ml-1">{time}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

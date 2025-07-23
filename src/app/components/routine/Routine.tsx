import { ChevronRight, CircleCheck, Star } from 'lucide-react';
import YellowCheckIcon from './YellowCheckIcon';
import Button from '../common/ui/Button';
import { useRouter } from 'next/navigation';

export default function Routine({
  title,
  category,
  subCategory,
  time,
  isImportant,
  isCompleted,
  onClick,
  onEditClick,
  onDeleteClick,
  scheduleId,
}: {
  title: string;
  category: string;
  subCategory?: string;
  time?: string;
  isImportant?: boolean;
  isCompleted?: boolean;
  onClick: () => void;
  onEditClick: () => void;
  onDeleteClick: (scheduleId: number) => void;
  scheduleId: number;
}) {
  const router = useRouter();
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
    <div
      className={`flex w-full cursor-pointer items-center justify-between border px-3 py-4 ${isCompleted ? 'border-[#FFB84C]' : 'border-[#9E9E9E]'} rounded-[8px] bg-white`}
      onClick={onClick}
    >
      {isCompleted ? (
        <YellowCheckIcon />
      ) : (
        <CircleCheck className="mr-4 h-[30px] w-[30px] text-[#C4C4C4]" />
      )}

      <div className="flex w-full flex-col space-y-1">
        <div className="flex items-center">
          <p className="text-sm">{title}</p>
          {isImportant && (
            <Star className="ml-1.5 h-4 w-4 fill-[#FFB84C] text-[#FFB84C]" />
          )}
          <div className="ml-auto flex gap-1 text-[10px]">
            {time && (
              <>
                <span>⏰</span>
                <span className="ml-1">{time}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-1.5 text-xs text-[#9E9E9E]">
          <div>
            <span>{iconHandler}</span>
            {subCategory && (
              <>
                <ChevronRight className="h-3 w-[9px]" />
                <span>{subCategory}</span>
              </>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              className="h-[25px] w-[50px] rounded-2xl border border-black bg-white text-black active:border-[#ffb84c] active:bg-[#FFB84C] active:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onEditClick();
                router.push('/routine/edit-routine');
              }}
            >
              수정
            </Button>
            <Button
              className="h-[25px] w-[50px] rounded-2xl border border-black bg-white text-black active:border-none active:bg-[#ff4444] active:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(scheduleId);
              }}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

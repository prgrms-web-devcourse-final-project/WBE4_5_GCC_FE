import { ChevronRight, CircleCheck, Ellipsis, Star } from 'lucide-react';
import YellowCheckIcon from './YellowCheckIcon';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Routine({
  title,
  category,
  //emoji,
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
  //emoji: string;
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

  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-between border px-3 py-4 hover:shadow-sm ${isCompleted ? 'border-[#ffb84c]' : 'border-[#9e9e9e]'} rounded-[8px] bg-white dark:bg-[var(--dark-white)]/15`}
      onClick={onClick}
    >
      {isCompleted ? (
        <YellowCheckIcon />
      ) : (
        <CircleCheck className="mr-5 h-[36px] w-[36px] text-[#c4c4c4]" />
      )}

      <div className="relative flex w-full flex-col space-y-1 py-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-lg font-semibold text-[#222] dark:text-[var(--dark-gray-700)]">{title}</p>
            {isImportant && (
              <Star className="ml-2 h-4 w-4 fill-[#ffb84c] text-[#ffb84c]" />
            )}
          </div>
          <Ellipsis
            className="h-[24px] w-[24px] cursor-pointer dark:text-[var(--dark-gray-700)] mb-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-2 text-[16px] text-[#9e9e9e] font-regular">
          <div>
            <span>{iconHandler}</span>
            {subCategory && (
              <>
                <ChevronRight className="h-3 w-[9px]" />
                <span>{subCategory}</span>
              </>
            )}
          </div>
          <div className="ml-auto flex gap-1 text-sm">
            {time && (
              <>
                <span>⏰</span>
                <span className="ml-1">{time}</span>
              </>
            )}
          </div>
          {/* 수정삭제 창 */}
          {isOpen && (
            <div
              ref={popupRef}
              className="absolute top-8 right-0 flex min-w-[85px] flex-col rounded-lg border border-[#e0e0e0] bg-white dark:bg-[var(--dark-bg-tertiary)]"
            >
              <button
                className="min-h-[33px] cursor-pointer rounded-t-lg border-b border-[#e0e0e0] px-5 py-2 text-[16px] font-medium text-black hover:bg-[#e0e0e0]"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick();
                  router.push('/routine/edit-routine');
                }}
              >
                수정
              </button>
              <button
                className="min-h-[33px] cursor-pointer rounded-b-lg px-5 py-2 text-[16px] font-medium text-[#D32F2F] hover:bg-[#e0e0e0] dark:text-[var(--dark-red)]"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(scheduleId);
                }}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

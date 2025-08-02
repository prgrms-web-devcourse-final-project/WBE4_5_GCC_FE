import { ChevronRight, CircleCheck, Ellipsis, Star } from 'lucide-react';
import YellowCheckIcon from './YellowCheckIcon';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
      className={`flex w-full cursor-pointer items-center justify-between border px-3 py-4 hover:shadow-sm ${isCompleted ? 'border-[var(--primary-yellow)]' : 'border-[var(--gray-500)]'} rounded-[8px] bg-[var(--white)] dark:bg-[var(--dark-white)]/15`}
      onClick={onClick}
    >
      {isCompleted ? (
        <YellowCheckIcon />
      ) : (
        <CircleCheck className="mr-4 h-[30px] w-[30px] text-[var(--gray-400)]" />
      )}

      <div className="relative flex w-full flex-col space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm dark:text-[var(--dark-gray-700)]">{title}</p>
            {isImportant && (
              <Star className="ml-1.5 h-4 w-4 fill-[var(--primary-yellow)] text-[var(--primary-yellow)]" />
            )}
          </div>
          <Ellipsis
            className="h-[32px] w-[32px] cursor-pointer dark:text-[var(--dark-gray-700)]"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-1.5 text-xs text-[var(--gray-500)]">
          <div>
            <span>{iconHandler}</span>
            {subCategory && (
              <>
                <ChevronRight className="h-3 w-[9px]" />
                <span>{subCategory}</span>
              </>
            )}
          </div>
          <div className="ml-auto flex gap-1 text-[10px]">
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
              className="absolute top-5 right-0 flex min-w-[85px] flex-col rounded-lg border border-[var(--gray-300)] bg-[var(--white)] dark:bg-[var(--dark-bg-tertiary)]"
            >
              <button
                className="min-h-[33px] cursor-pointer rounded-t-lg border-b border-[var(--gray-300)] px-5 py-2 text-[14px] font-medium text-black hover:bg-[var(--gray-300)]"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditClick();
                  router.push('/routine/edit-routine');
                }}
              >
                수정
              </button>
              <button
                className="min-h-[33px] cursor-pointer rounded-b-lg px-5 py-2 text-[14px] font-medium text-[#D32F2F] hover:bg-[var(--gray-300)] dark:text-[var(--dark-red)]"
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

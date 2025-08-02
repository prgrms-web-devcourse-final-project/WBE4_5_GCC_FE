'use client';

import clsx from 'clsx';
import Image from 'next/image';

interface CollectionItem {
  id: number;
  key: string;
  name: string;
  info: string;
  requirement: number;
  currentProgress: number;
  status: 'ACHIEVABLE' | 'OWNED' | 'LOCKED' | 'EQUIPPED';
  image: {
    src: string;
    width: number;
    height: number;
  };
  category: string;
  isLocked: boolean;
}

interface Props {
  item: CollectionItem;
  isSelected: boolean;
  onSelect: (item: CollectionItem) => void;
  action?: React.ReactNode; // 보상 수령 버튼 슬롯
}

export default function CollectionItemCard({
  item,
  isSelected,
  onSelect,
  action,
}: Props) {
  return (
    <div
      key={item.id}
      onClick={() => onSelect(item)}
      className={clsx(
        'px-auto relative h-45 w-[160px] rounded-[5px] border text-center select-none dark:bg-[var(--dark-white)]/37',
        isSelected
          ? 'border-[3px] border-[var(--primary-yellow)]'
          : 'border-[var(--gray-350)]',
      )}
      style={{
        boxShadow: '1px 2px 3px 0 rgba(0, 0, 0, 0.15)',
      }}
    >
      <div className="flex h-21">
        <Image
          src={item.image.src}
          alt={item.name}
          width={item.image.width}
          height={item.image.height}
          priority
          className="mx-auto my-auto h-auto w-11"
        />
      </div>
      {/* 여기 !item.status 느낌표 지워줘야 됨. 테스트 이후에 */}
      {item.status === 'LOCKED' && !action && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[5px] bg-[var(--black)] dark:bg-[var(--dark-gray-200)]/85">
          <Image
            src="/images/lock.svg"
            alt="잠금아이콘"
            width={79}
            height={79}
            priority
          />
          <p className="mt-[6px] text-xs font-semibold text-white dark:text-[var(--dark-bg-primary)]">
            {item.info}
          </p>
          <button className="relative mt-4 h-7.5 min-w-34 overflow-hidden rounded-[3px] border border-[var(--primary-yellow)] bg-[var(--white)] text-sm font-semibold text-[#A47148] dark:bg-[var(--dark-bg-primary)]">
            {/* 채워진 배경 */}
            <div
              className="absolute top-0 left-0 z-0 h-full bg-[#FFE29A]"
              style={{
                width: `${(item.currentProgress / item.requirement) * 100}%`,
              }}
            />
            {/* 텍스트 */}
            <span className="relative z-10">
              {item.currentProgress}/{item.requirement}
            </span>
          </button>
        </div>
      )}

      <div>
        <div
          className={`${item.isLocked ? 'border-black/20' : 'border-[var(--gray-300)]'} flex flex-col border-t-[0.5px] border-[var(--gray-300)] px-3 text-left`}
        >
          <div className="text-[#222222 ] mt-3 text-xs font-semibold dark:text-[var(--dark-gray-300)]">
            {item.name}
          </div>
          <div
            className={`text-[10px] ${item.isLocked ? 'text-[#515151]' : 'text-[var(--gray-700)] dark:text-[var(--dark-gray-300)]'}`}
          >
            {item.info}
          </div>

          {/* 착용 / 수령 버튼 영역 */}
          <div className="mt-2 flex justify-center">
            {action ? (
              action // 수령 가능한 뱃지의 경우 수령 버튼 렌더링
            ) : !item.isLocked ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(item);
                }}
                className={clsx(
                  'h-7.5 min-w-34 cursor-pointer rounded-[3px] border border-[var(--gray-300)] text-sm',
                  isSelected
                    ? 'border-[var(--primary-yellow)] bg-[var(--primary-yellow)] font-semibold text-white dark:text-[var(--dark-bg-primary)]'
                    : 'border-[var(--gray-300)] bg-[var(--white)] text-[var(--gray-700)]',
                )}
              >
                {isSelected ? '착용 중' : '착용하기'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

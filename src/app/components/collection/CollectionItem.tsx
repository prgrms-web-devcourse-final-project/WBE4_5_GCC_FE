'use client';

import clsx from 'clsx';
import Image from 'next/image';

interface CollectionItem {
  id: number;
  name: string;
  description: string;
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
        'px-auto relative h-[123px] min-w-[92px] rounded-[5px] border text-center select-none',
        isSelected ? 'border-[#FFB84C]' : 'border-[#D9D9D9]',
      )}
      style={{
        boxShadow: '1px 2px 3px 0 rgba(0, 0, 0, 0.15)',
      }}
    >
      <div className="flex h-[66px]">
        <Image
          src={item.image.src}
          alt={item.name}
          width={item.image.width}
          height={item.image.height}
          priority
          className="mx-auto my-2 h-auto w-auto"
        />
      </div>
      {item.isLocked && !action && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[5px] bg-[#222222]/70">
          <Image
            src="/images/lock.svg"
            alt="잠금아이콘"
            width={54}
            height={54}
            priority
          />
        </div>
      )}
      <div>
        <div
          className={`${item.isLocked ? 'border-black/20' : 'border-[#E0E0E0]'} border-t-[0.5px] border-[#E0E0E0] px-[9px] text-left`}
        >
          <div className="mt-1 text-[8px] font-medium">{item.name}</div>
          <div
            className={`text-[6px] ${item.isLocked ? 'text-[#515151]' : 'text-[#616161]'}`}
          >
            {item.description}
          </div>
        </div>

        {/* 착용 / 수령 버튼 영역 */}
        <div>
          {action ? (
            action // 수령 가능한 뱃지의 경우 수령 버튼 렌더링
          ) : !item.isLocked ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              className={clsx(
                'h-4 min-w-18 rounded-[3px] border border-[#E0E0E0] text-[8px]',
                isSelected
                  ? 'border-[#FFB84C] bg-[#FFB84C] font-semibold text-white'
                  : 'border-[#E0E0E0] bg-white text-[#616161]',
              )}
            >
              {isSelected ? '착용 중' : '착용하기'}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

import clsx from 'clsx';
import Image from 'next/image';
import { X } from 'lucide-react';
import coin from '/public/coin.svg';
import { ShopItem } from '../../../../types/general';

interface ItemCardProps {
  item: ShopItem;
  onClick: () => void;
  onDeleteClick?: (item: ShopItem) => void;
  isDeleteMode?: boolean;
  isOwned?: boolean;
}

export default function ItemCard({
  item,
  onClick,
  onDeleteClick,
  isDeleteMode = false,
  isOwned = false,
}: ItemCardProps) {
  return (
    <div
      className={clsx(
        'relative flex h-[220px] w-[170px] flex-col rounded-xl border border-[#d9d9d9] bg-white shadow-sm',
        isOwned ? 'cursor-default' : 'cursor-pointer'
      )}
      onClick={onClick}
    >
      {isDeleteMode && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onDeleteClick) onDeleteClick(item);
          }}
          className="absolute top-[-8px] right-[-8px] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#E0E0E0]"
        >
          <X className="h-auto w-4 text-[#616161]" strokeWidth={2} />
        </button>
      )}

      <div className="flex h-[100px] items-center justify-center py-5 px-5">
        {item.itemKey && (
          <Image
            src={`/images/items/thumbs/${item.itemKey}.png`}
            alt={item.itemName}
            width={80}
            height={80}
            className="h-[70px] w-[70px]"
            priority
          />
        )}
      </div>

      <div className="border-t border-[#E0E0E0] px-3 py-2 text-left">
        <div className="mt-1 text-[14px] font-semibold leading-tight line-clamp-1">{item.itemName}</div>
        <div className="mt-1 h-[30px] text-[12px] font-medium leading-snug text-[#616161] overflow-hidden text-ellipsis line-clamp-2">
          {item.itemDescription || '아이템 설명이 없어요'}
        </div>

        {isOwned ? (
          <div className="mt-4 flex h-7 w-full items-center justify-center rounded-md border border-[#FFB84C] bg-[#FFB84C] text-[12px] font-semibold text-white">
            보유 중
          </div>
        ) : (
          <div className="mt-4 flex h-7 w-full items-center justify-between rounded-md border border-[#cfcfcf] pr-3 pl-2">
            <Image src={coin} alt="coin" className="h-5 w-4" />
            <span className="text-[12px] font-semibold text-[#FFB84C]">
              {item.itemPoint != null ? `${item.itemPoint}` : `${item.itemPrice}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

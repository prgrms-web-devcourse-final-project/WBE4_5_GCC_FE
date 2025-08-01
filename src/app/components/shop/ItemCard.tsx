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
    <>
      <div
        className={clsx(
          'relative flex aspect-[92/128] h-[140px] min-w-[92px] flex-col rounded-[5px] border-1 border-[#d9d9d9] shadow-[1px_2px_4px_rgba(0,0,0,0.1)]',
          isOwned ? 'cursor-default' : 'cursor-pointer',
        )}
        onClick={onClick}
      >
        {isDeleteMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onDeleteClick) onDeleteClick(item as ShopItem);
            }}
            className="absolute top-[-6px] right-[-6px] z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#E0E0E0]"
          >
            <X className="h-auto w-[10px] text-[#616161]" strokeWidth={2} />
          </button>
        )}
        <div className="flex h-[65px] place-items-center py-3 pr-5 pl-6">
          {item.itemKey && (
            <Image
              src={`/images/items/thumbs/${item.itemKey}.png`}
              alt={item.itemName}
              width={50}
              height={44}
              className="h-[44px] w-[50px]"
              priority
            />
          )}
        </div>
        <div className="border-t-[0.5px] border-[#E0E0E0] px-[9px] py-[6px] text-left">
          <div className="text-[8px] font-medium">{item.itemName}</div>
          <div className="h-[21px] text-[7px] font-medium text-[#616161]">
            {item.itemDescription || '아이템 설명이 없어요'}
          </div>
          {/* 포인트 박스 / 보유 중 */}
          {isOwned ? (
            <div className="mt-[5px] flex h-5 w-full cursor-default items-center justify-center rounded-[6px] border-1 border-[#FFB84C] bg-[#FFB84C] py-[2px] text-[8px] font-semibold text-white">
              보유 중
            </div>
          ) : (
            <div className="mt-[5px] flex h-5 w-full items-center justify-between rounded-[6px] border-1 border-[#cfcfcf] py-[2px] pr-[14px] pl-[6px]">
              <Image src={coin} alt="coin" className="h-[15px] w-[15px]" />
              <span className="text-[12px] text-[#FFB84C]">
                {item.itemPoint != null
                  ? `${item.itemPoint}`
                  : `${item.itemPrice}`}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

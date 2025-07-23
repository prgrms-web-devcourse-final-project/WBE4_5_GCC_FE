import Image, { StaticImageData } from 'next/image';
import item1 from '@/app/assets/images/item1.png';
import coin from '/public/coin.svg';
import { X } from 'lucide-react';

interface Item {
  itemId: number;
  itemKey: string;
  itemName: string;
  itemPrice: number;
  itemType: 'TOP' | 'BOTTOM' | 'ACCESSORY';
  itemDescription?: string;
  createTime?: string;
  updateTime?: string;
}

interface ItemCardProps {
  item: Item;
  onClick: () => void;
  onDeleteClick?: (item: Item) => void;
  isDeleteMode?: boolean;
}

export default function ItemCard({
  item,
  onClick,
  onDeleteClick,
  isDeleteMode = false,
}: ItemCardProps) {
  return (
    <>
      <div
        className="relative flex aspect-[92/128] h-[140px] min-w-[92px] flex-col rounded-[5px] border-1 border-[#d9d9d9] shadow-[1px_2px_4px_rgba(0,0,0,0.1)]"
        onClick={onClick}
      >
        {isDeleteMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onDeleteClick) onDeleteClick(item as Item);
            }}
            className="absolute top-[-6px] right-[-6px] z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#E0E0E0]"
          >
            <X className="h-auto w-[10px] text-[#616161]" strokeWidth={2} />
          </button>
        )}
        <div className="px-5 py-3">
          <Image src={item1} alt="item" width={50} height={44} />
        </div>
        <div className="border-t-[0.5px] border-[#E0E0E0] px-[9px] py-[6px] text-left">
          <div className="text-[8px] font-medium">{item.itemName}</div>
          <div className="h-[21px] text-[7px] font-medium text-[#616161]">
            {item.itemDescription || ''}
          </div>
          {/* 포인트 박스 */}
          <div className="mt-[5px] flex h-5 w-full items-center justify-between rounded-[6px] border-1 border-[#cfcfcf] py-[2px] pr-[14px] pl-[6px]">
            <Image src={coin} alt="coin" className="h-[15px] w-[15px]" />
            <span className="text-[12px] text-[#FFB84C]">{item.itemPrice}</span>
          </div>
        </div>
      </div>
    </>
  );
}

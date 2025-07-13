import Image, { StaticImageData } from 'next/image';
import item1 from '@/app/assets/images/item1.png';
import coin from '/public/coin.svg';

interface ItemCardProps {
  item: {
    id: number;
    image: StaticImageData;
    name: string;
    description: string;
    price: number;
  };
  onClick: () => void;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <>
      <div
        className="aspect-[92/128] w-[92px] rounded-[5px] border-1 border-[#d9d9d9] shadow-[1px_2px_4px_rgba(0,0,0,0.1)]"
        onClick={onClick}
      >
        <div className="px-5 py-3">
          <Image src={item1} alt="item" className="h-[44px] w-[50px]" />
        </div>
        <div className="border-t-[0.5px] border-[#E0E0E0] px-[9px] py-[6px] text-left">
          <div className="text-[8px] font-medium">{item.name}</div>
          <div className="text-[7px] font-medium text-[#616161]">
            {item.description}
          </div>
          {/* 포인트 박스 */}
          <div className="mt-[5px] flex h-5 w-full items-center justify-between rounded-[6px] border-1 border-[#cfcfcf] p-1">
            <Image src={coin} alt="coin" className="h-[15px] w-[15px]" />
            <span className="text-[12px] text-[#FFB84C]">{item.price}</span>
          </div>
        </div>
      </div>
    </>
  );
}

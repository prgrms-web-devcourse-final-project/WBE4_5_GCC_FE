'use client';
import Image from 'next/image';
import coin from '/public/coin.svg';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ShopHeader({ points }: { points: number }) {
  const router = useRouter();

  return (
    <>
      <div className="relative flex h-[56px] w-[100%] items-center justify-center border-b-1 border-[#CCCCCC] px-5 select-none">
        <ChevronLeft
          className="absolute left-6 h-[24px] w-[24px] cursor-pointer text-[#222222]"
          onClick={() => {
            router.push('/');
          }}
        />
        <p className="text-[18px] font-semibold">상점</p>
        {/* 포인트 박스 */}
        <div className="absolute right-7 mt-[5px] flex h-[21px] w-[64px] items-center justify-between rounded-[6px] border-1 border-[#cfcfcf] p-1">
          <Image src={coin} alt="coin" className="h-[15px] w-[15px]" />
          <span className="text-[12px] text-[#FFB84C]">{points}</span>
        </div>
      </div>
    </>
  );
}

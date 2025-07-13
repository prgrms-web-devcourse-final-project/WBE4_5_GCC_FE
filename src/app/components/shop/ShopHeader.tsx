'use client';
import Image from 'next/image';
import backBtn from '/public/BackPageBtn.svg';

import { useRouter } from 'next/navigation';
import PointBox from './PointBox';
export default function ShopHeader() {
  const router = useRouter();

  return (
    <>
      <div className="relative flex h-[56px] w-[100%] items-center justify-center px-5 select-none">
        <Image
          src={backBtn}
          alt="뒤로가기"
          className="absolute left-6 h-[24px] w-[24px] cursor-pointer"
          onClick={() => {
            router.push('/');
          }}
        />
        <p className="text-lg font-semibold">상점</p>
        <PointBox
          width={64}
          height={21}
          coinWidth={13}
          coinHeight={13}
          className="absolute right-6"
        />
      </div>
    </>
  );
}

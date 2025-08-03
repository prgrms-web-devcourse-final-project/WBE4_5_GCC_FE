import Image from 'next/image';
import character from '/public/images/mainCharacter.png';
import bg from '/public/images/itemBackGround.svg';
import hat1 from '/public/onBoarding/hat1.svg';
import hat2 from '/public/onBoarding/hat2.svg';
import hat3 from '/public/onBoarding/hat3.svg';
import hat4 from '/public/onBoarding/hat4.svg';
import top1 from '/public/onBoarding/top1.svg';
import top2 from '/public/onBoarding/top2.svg';
import top3 from '/public/onBoarding/top3.svg';
import top4 from '/public/onBoarding/top4.svg';
import top5 from '/public/onBoarding/top5.svg';
import top6 from '/public/onBoarding/top6.svg';
import top7 from '/public/onBoarding/top7.svg';
import top8 from '/public/onBoarding/top8.svg';
import bot1 from '/public/onBoarding/bot1.svg';
import bot2 from '/public/onBoarding/bot2.svg';
import bot3 from '/public/onBoarding/bot3.svg';
import bot4 from '/public/onBoarding/bot4.svg';
import bot5 from '/public/onBoarding/bot5.svg';
import bot6 from '/public/onBoarding/bot6.svg';
import bot7 from '/public/onBoarding/bot7.svg';
import bot8 from '/public/onBoarding/bot8.svg';

export default function ThirdDiv({ show }: { show: boolean }) {
  return (
    <div
      className={`flex w-full max-w-[390px] justify-center rounded-[20px] border border-[#b4b4b4] px-[28px] pt-[45px] pb-10 transition-all delay-1200 duration-700 ease-out select-none ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      }`}
    >
      <div>
        <div className="relative mb-6 w-[260px]">
          <Image src={bg} alt="배경" className="w-full" />
          <Image
            src={character}
            alt="캐릭터"
            className="absolute top-1/2 left-1/2 w-[120px] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-[14px]">
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={hat1} alt="모자 1" className="w-[38px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={hat2} alt="모자 2" className="w-[38px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={hat3} alt="모자 3" className="w-[38px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={hat4} alt="모자 4" className="w-[38px]" />
            </div>
          </div>

          <div className="flex gap-[14px]">
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={top1} alt="상의 1" className="w-[38px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={top2} alt="상의 2" className="w-[38px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={top3} alt="상의 3" className="w-[38px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={top4} alt="상의 4" className="w-[38px]" />
            </div>
          </div>

          <div className="flex gap-[14px]">
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={bot1} alt="하의 1" className="w-[28px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={bot2} alt="하의 2" className="w-[28px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={bot3} alt="하의 3" className="w-[28px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={bot4} alt="하의 4" className="w-[28px]" />
            </div>
          </div>

          <div className="flex gap-[14px]">
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={top5} alt="상의 5" className="w-[38px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={top6} alt="상의 6" className="w-[38px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={top7} alt="상의 7" className="w-[38px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={top8} alt="상의 8" className="w-[38px]" />
            </div>
          </div>

          <div className="flex gap-[14px]">
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={bot5} alt="하의 5" className="w-[28px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={bot6} alt="하의 6" className="w-[28px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={bot7} alt="하의 7" className="w-[28px]" />
            </div>
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[10px] border border-[#D9D9D9]">
              <Image src={bot8} alt="하의 8" className="w-[28px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useOnBoardingStore } from '@/store/onBoarding';
import { useEffect, useState } from 'react';
import { Dot } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ThirdDiv from './ThirdDiv';
export default function Third() {
  const router = useRouter();
  const { setStep, step } = useOnBoardingStore();

  const totalSteps = 5;
  const skip = () => router.push('/login');
  const goNext = () => setStep(4);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100); // 첫 렌더 후 실행
  }, []);
  return (
    <>
      <div className="flex h-[calc(100vh-54px)] flex-col items-center justify-between">
        {/* 상단 텍스트 */}
        <div className="mb-[40px] flex flex-col items-center text-[20px] select-none">
          <h2
            className={`transition-all duration-700 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          >
            퀘스트를 완료하면 포인트가 차곡차곡
          </h2>
          <h1
            className={`font-bold transition-all delay-800 duration-700 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          >
            나만의 <span className="text-[#FFB84C]">캐릭터를</span> 꾸며보세요!
          </h1>
        </div>
        <ThirdDiv show={show} />

        <div className="flex w-full justify-between bg-white p-[26px] px-15 font-semibold">
          <button
            className="cursor-pointer text-[12px] transition-all duration-100 ease-in hover:text-[#ffb84c] sm:text-[16px]"
            onClick={skip}
          >
            skip
          </button>
          <div className="flex gap-2">
            {[...Array(totalSteps)].map((_, i) => (
              <Dot
                key={i}
                className={`h-8 w-8 ${
                  step === i + 1 ? 'text-[#FFB84C]' : 'text-gray-400'
                }`}
              />
            ))}
          </div>
          <button
            className="cursor-pointer text-[12px] transition-all duration-100 ease-in hover:text-[#ffb84c] sm:text-[16px]"
            onClick={goNext}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}

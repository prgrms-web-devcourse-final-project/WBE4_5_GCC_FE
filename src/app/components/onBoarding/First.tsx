import { useOnBoardingStore } from '@/store/onBoarding';
import Image from 'next/image';
import logo from '/public/logo.png';
import image2 from '/public/onBoarding/image2.svg';
import { Dot } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function First() {
  const router = useRouter();
  const { setStep, step } = useOnBoardingStore();

  const totalSteps = 5;
  const skip = () => router.push('/login');
  const goNext = () => setStep(2);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="flex flex-col justify-between overflow-hidden bg-white">
      {/* 상단 영역 */}
      <div className="flex flex-col items-center select-none">
        <Image
          src={logo}
          alt="logo"
          className={`mb-4 w-[260px] transition-all duration-700 ease-out ${
            show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        />
        <h1
          className={`mb-4 text-2xl font-bold transition-all delay-300 duration-700 ease-out ${
            show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          혼자 사는 모든 순간을,
        </h1>
        <p
          className={`text-3xl font-bold transition-all delay-600 duration-700 ease-out ${
            show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}
        >
          더 가치있게
        </p>
      </div>

      {/* 중앙 이미지 */}
      <div
        className={`flex flex-1 items-center justify-center transition-all delay-1000 duration-800 ease-out ${
          show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
      >
        <Image src={image2} alt="image2" className="w-[190px]" />
      </div>

      {/* 하단 네비 */}
      <div className="flex w-full justify-between bg-[#FFB84C] p-[20px] text-white">
        <button
          onClick={skip}
          className="cursor-pointer text-[12px] transition-all duration-100 ease-in hover:text-black sm:text-[16px]"
        >
          skip
        </button>
        <div className="flex gap-2">
          {[...Array(totalSteps)].map((_, i) => (
            <Dot
              key={i}
              className={`h-8 w-8 ${
                step === i + 1 ? 'text-white' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          className="cursor-pointer text-[16px] transition-all duration-100 ease-in hover:text-black"
        >
          다음
        </button>
      </div>
    </div>
  );
}

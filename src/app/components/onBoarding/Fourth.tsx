import { useOnBoardingStore } from '@/store/onBoarding';
import { useRouter } from 'next/navigation';
import { Dot } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import fourth1 from '/public/onBoarding/fourth1.svg';
import fourth2 from '/public/onBoarding/fourth2.png';

export default function Fourth() {
  const router = useRouter();
  const { setStep, step } = useOnBoardingStore();

  const goNext = () => {
    setStep(5);
  };

  const skip = () => {
    router.push('/login');
  };

  const totalSteps = 5;

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100); // 첫 렌더 후 실행
  }, []);
  return (
    <>
      <div className="flex flex-col items-center px-10">
        <div className="mb-[40px] flex flex-col items-center pt-[90px] text-[20px] select-none">
          <h2
            className={`transition-all duration-700 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          >
            당신의 성장을 한눈에
          </h2>
          <h1
            className={`font-bold transition-all delay-800 duration-700 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          >
            <span className="text-[#FFB84C]">루틴 리포트</span>로 확인하세요
          </h1>
        </div>
        <div
          className={`w-full max-w-[390px] rounded-[20px] border border-[#b4b4b4] px-[28px] pt-[45px] transition-all delay-1200 duration-700 ease-out select-none ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
        >
          <div
            className={`transition-all delay-1500 duration-700 ease-out select-none ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          >
            <p className="mb-4 font-semibold">이번 주 나의 루틴 결과는?</p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="relative flex min-h-[80px] w-full items-start justify-between rounded-lg bg-[#fff4d1] px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <p className="text-sm text-[#616161]">루틴 완료율</p>
                  <p className="self-end text-[20px] font-semibold text-[#FFB84C]">
                    84%
                  </p>
                </div>
                <div className="relative flex min-h-[80px] w-full items-start justify-between rounded-lg bg-[#fff4d1] px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <p className="text-sm text-[#616161]">총 루틴 수</p>
                  <p className="self-end text-[20px] font-semibold">52개</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="relative flex min-h-[80px] w-full items-start justify-between rounded-lg bg-[#fff4d1] px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <p className="text-sm text-[#616161]">가장 많이 수행</p>
                  <p className="self-end text-[14px] font-semibold">건강 🏃🏻</p>
                </div>
                <div className="relative flex min-h-[80px] w-full items-start justify-between rounded-lg bg-[#fff4d1] px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <p className="text-sm text-[#616161]">누적 포인트</p>
                  <p className="self-end text-[18px] font-semibold text-[#FFB84C]">
                    1,002 P
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`transition-all delay-1800 duration-700 ease-out select-none ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          >
            <Image src={fourth1} alt="fourth" />
          </div>

          <div
            className={`transition-all delay-2100 duration-700 ease-out select-none ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          >
            <Image src={fourth2} alt="fourth2" />
          </div>
        </div>
      </div>
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
    </>
  );
}

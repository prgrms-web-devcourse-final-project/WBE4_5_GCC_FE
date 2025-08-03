import { useOnBoardingStore } from '@/store/onBoarding';
import ProgressBar from '../common/ProgressBar';
import OnBoardingRoutine from './OnBoardingRoutine';
import { useRouter } from 'next/navigation';
import { Dot } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Second() {
  const router = useRouter();
  const { setStep, step } = useOnBoardingStore();
  // const setStep = useOnBoardingStore((state) => state.setStep);

  const goNext = () => {
    setStep(3);
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
        {/* 상단 텍스트 */}
        <div className="mb-[40px] flex flex-col items-center pt-[90px] text-[20px] select-none">
          <h2
            className={`transition-all duration-700 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          >
            매일의 작은 습관을
          </h2>
          <h1
            className={`font-bold transition-all delay-800 duration-700 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          >
            나만의 <span className="text-[#FFB84C]">루틴</span>으로
          </h1>
        </div>
        <div
          className={`w-full max-w-[390px] rounded-[20px] border border-[#b4b4b4] px-[28px] pt-[45px] transition-all delay-1200 duration-700 ease-out select-none ${show ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
        >
          <p className="mb-2">2025년 10월 2일</p>

          <ProgressBar
            currentStep={20}
            totalSteps={100}
            wrapperClassName="h-7 bg-[#FFB84C]/20 mb-[25px]"
            per={'20%'}
            barClassName="h-7 bg-[#FFB84C] rounded-full text-white text-xl font-bold flex items-center justify-center text-center leading-[2.75rem]"
          />
          <div className="flex flex-col gap-[15px] pb-[50px]">
            {/* 루틴 아이템 */}
            <OnBoardingRoutine
              title="빨래 돌리기"
              category="세탁 / 의류"
              time="13:00"
              isCompleted
            />
            <OnBoardingRoutine
              title="월세 입금"
              category="행정"
              time="상관없음"
            />
            <OnBoardingRoutine
              title="닭가슴살 사오기"
              category="요리"
              time="18:00"
            />
            <OnBoardingRoutine
              title="저녁산책 다녀오기"
              category="건강"
              time="퇴근 후"
            />
            <OnBoardingRoutine
              title="책 한권 읽기"
              category="자기개발"
              time="자기 전"
            />
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

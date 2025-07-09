'use client';
import NextBtn from '@/app/components/common/NextBtn';
import ProgressBar from '@/app/components/common/PrgressBar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const options = ['1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상'];

export default function Page() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    console.log('선택됨:', selectedIndex);
  }, [selectedIndex]);
  const goNext = selectedIndex !== null;

  return (
    <>
      {/* 전체 박스 */}
      <div className="px-5 mt-[50px] max-w-screen-sm mx-auto w-full select-none">
        <ProgressBar currentStep={5} totalSteps={6} />
        <h1 className="font-semibold text-[20px] mb-7">
          자취 경력이 어떻게 되시나요?
        </h1>
        <div className="flex flex-wrap gap-[10px] mb-4">
          {options.slice(0, 3).map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`
        flex items-center justify-center 
        h-[43px] px-[15px] py-[13px] rounded-[50px] border 
        text-sm transition-colors
        ${
          selectedIndex === idx
            ? 'text-[#FFB84C] border-[#FFB84C]'
            : 'border-[#E0E0E0]'
        }
      `}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex gap-[10px]">
          {options.slice(3).map((option, idx) => (
            <button
              key={idx + 3}
              onClick={() => setSelectedIndex(idx + 3)}
              className={`
        flex items-center justify-center 
        h-[43px] px-[15px] py-[13px] rounded-[50px] border 
        text-sm transition-colors
        ${
          selectedIndex === idx + 3
            ? 'text-[#FFB84C] border-[#FFB84C]'
            : 'border-[#E0E0E0]'
        }
      `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <NextBtn
        label="다음"
        className={`${goNext ? 'bg-[#222222]' : 'bg-[#c4c4c4]'}`}
        disabled={!goNext}
        onClick={() => router.push('/signup/step6')}
      />
    </>
  );
}

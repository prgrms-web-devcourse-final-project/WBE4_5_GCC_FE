'use client';

import ProgressBar from '@/app/components/common/PrgressBar';
import { useSignUpStore } from '@/store/SignupStore';

import { useEffect, useState } from 'react';

const options = ['1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상'];

export default function History() {
  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    console.log('선택됨:', selectedIndex);
  }, [selectedIndex]);
  const goNext = selectedIndex !== null;

  useEffect(() => {
    setIsNextEnabled(goNext);
  }, [setIsNextEnabled, goNext]);

  return (
    <>
      {/* 전체 박스 */}
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm px-5 select-none">
        <ProgressBar currentStep={2} totalSteps={3} />
        <h1 className="mb-7 text-[20px] font-semibold">
          자취 경력이 어떻게 되시나요?
        </h1>
        <div className="mb-4 flex flex-wrap gap-[10px]">
          {options.slice(0, 3).map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`flex h-[43px] items-center justify-center rounded-[50px] border px-[15px] py-[13px] text-sm transition-colors ${
                selectedIndex === idx
                  ? 'border-[#FFB84C] text-[#FFB84C]'
                  : 'border-[#E0E0E0]'
              } `}
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
              className={`flex h-[43px] items-center justify-center rounded-[50px] border px-[15px] py-[13px] text-sm transition-colors ${
                selectedIndex === idx + 3
                  ? 'border-[#FFB84C] text-[#FFB84C]'
                  : 'border-[#E0E0E0]'
              } `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

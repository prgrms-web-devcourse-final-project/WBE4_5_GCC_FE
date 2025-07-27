'use client';

import ProgressBar from '@/app/components/common/ProgressBar';
import { useSignUpStore } from '@/store/SignupStore';

import { useEffect, useState } from 'react';

const options = ['1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상'];
const serverOptions = [
  'UNDER_1Y',
  'Y1_TO_3',
  'Y3_TO_5',
  'Y5_TO_10',
  'OVER_10Y',
];

export default function Experience() {
  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const setResidenceExperience = useSignUpStore(
    (state) => state.setResidenceExperience,
  );

  useEffect(() => {
    console.log('선택됨:', selectedIndex);
    if (selectedIndex !== null) {
      setResidenceExperience(serverOptions[selectedIndex]);
    }
  }, [selectedIndex, setResidenceExperience]);

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
              className={`flex h-[43px] items-center justify-center rounded-[50px] border px-[15px] py-[13px] text-sm transition-colors ${selectedIndex === idx
                  ? 'bg-[#FFB84C] text-[#ffffff]'
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
              className={`flex h-[43px] items-center justify-center rounded-[50px] border px-[15px] py-[13px] text-sm transition-colors ${selectedIndex === idx + 3
                  ? 'bg-[#FFB84C] text-[#ffffff]'
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

'use client';

import ProgressBar from '@/app/components/common/ProgressBar';
import SelectButton from '@/app/components/common/SelectButton';
import { useSignUpStore } from '@/store/SignupStore';

import { useEffect, useState } from 'react';

const options = [
  '🧹 청소 / 정리',
  '💡 자기개발',
  '🧳 외출',
  '🧺 세탁 / 의류',
  '🍳 요리',
  '💸 소비',
  '♻️ 쓰레기 / 환경',
  '🏃🏻 건강',
  '📄 행정',
];

const serverOptions = [
  'clean', // 청소 / 정리
  'self_development', // 자기개발
  'outing', // 외출
  'laundry', // 세탁 / 의류
  'cooking', // 요리
  'spending', // 소비
  'waste', // 쓰레기 / 환경
  'health', // 건강
  'administration', // 행정
];

export default function Category() {
  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);

  const setCategories = useSignUpStore((state) => state.setCategories);

  const toggleIndex = (idx: number) => {
    setSelectedIndex((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  useEffect(() => {
    const sorted = [...selectedIndex].sort((a, b) => a - b);
    setCategories(sorted);
  }, [selectedIndex, setCategories]);

  // 하나 이상 선택되었을 때만 다음 버튼 활성화
  const goNext = selectedIndex.length > 0;

  useEffect(() => {
    setIsNextEnabled(goNext);
  }, [setIsNextEnabled, goNext]);

  return (
    <>
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm px-5 select-none">
        <ProgressBar currentStep={3} totalSteps={3} />
        <h1 className="mb-7 text-[20px] font-semibold">
          관심있는 카테고리를 골라주세요
        </h1>
        <div className="mb-4 flex flex-wrap gap-[10px]">
          {options.map((option, idx) => (
            <SelectButton
              key={idx}
              text={option}
              onClick={() => toggleIndex(idx)}
              className={
                selectedIndex.includes(idx)
                  ? 'bg-[#FFB84C] text-[#ffffff]'
                  : 'border-[#E0E0E0]'
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

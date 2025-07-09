'use client';
import NextBtn from '@/app/components/common/NextBtn';
import ProgressBar from '@/app/components/common/PrgressBar';
import SelectButton from '@/app/components/common/SelectButton';
import { useRouter } from 'next/navigation';
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

export default function Page() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);

  const toggleIndex = (idx: number) => {
    setSelectedIndex((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  useEffect(() => {
    console.log('선택됨:', selectedIndex);
  }, [selectedIndex]);

  // 하나 이상 선택되었을 때만 다음 버튼 활성화
  const goNext = selectedIndex.length > 0;

  return (
    <>
      <div className="px-5 mt-[50px] max-w-screen-sm mx-auto w-full select-none">
        <ProgressBar currentStep={6} totalSteps={6} />
        <h1 className="font-semibold text-[20px] mb-7">
          관심있는 카테고리를 골라주세요
        </h1>
        <div className="flex flex-wrap gap-[10px] mb-4">
          {options.map((option, idx) => (
            <SelectButton
              key={idx}
              text={option}
              onClick={() => toggleIndex(idx)}
              className={
                selectedIndex.includes(idx)
                  ? 'text-[#FFB84C] border-[#FFB84C]'
                  : 'border-[#E0E0E0]'
              }
            />
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

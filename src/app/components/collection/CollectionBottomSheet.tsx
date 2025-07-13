'use client';

import { useEffect, useState } from 'react';
import SelectButton from '../common/SelectButton';
import Button from '../common/ui/Button';

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

export default function CollectionBottomSheet({
  isOpen,
  setIsOpen,
}: {
  isOpen?: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const toggleIndex = (idx: number) => {
    setSelectedIndex((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };
  useEffect(() => {
    console.log('선택됨:', selectedIndex);
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/50 select-none"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative min-h-[390px] w-full max-w-md rounded-t-3xl bg-white px-[20px] py-[34px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-start">
          <h2 className="px-2.5 text-[20px] font-semibold text-[#222222]">
            필터
          </h2>
        </div>
        <div className="flex flex-col">
          <div
            className="mb-4 flex flex-wrap gap-2.5"
            style={{
              paddingLeft: 'clamp(8px, 5vw, 30px)',
              paddingRight: 'clamp(8px, 4vw, 10px)',
            }}
          >
            {options.map((option, idx) => (
              <SelectButton
                key={idx}
                text={option}
                onClick={() => toggleIndex(idx)}
                className={
                  selectedIndex.includes(idx)
                    ? 'bg-[#FFB84C] text-white'
                    : 'border-[#E0E0E0]'
                }
              />
            ))}
          </div>
          <Button
            className="mt-[73px] mb-3 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            설정하기
          </Button>
        </div>
      </div>
    </div>
  );
}

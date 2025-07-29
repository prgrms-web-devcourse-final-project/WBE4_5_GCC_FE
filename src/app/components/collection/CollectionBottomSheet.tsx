'use client';

import Button from '../common/ui/Button';
import { useEffect, useState } from 'react';
import SelectButton from '../common/SelectButton';

const tier = ['🏆 플래티넘', '🥇 금', '🥈 은', '🥉 동'];
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
  '🗓️ 출석',
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

  const [selectedTierIndex, setSelectedTierIndex] = useState<number[]>([]);
  const toggleTierIndex = (index: number) => {
    setSelectedTierIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  useEffect(() => {
    console.log('선택됨:', selectedTierIndex, selectedIndex);
  }, [selectedTierIndex, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/50 select-none"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative min-h-[390px] w-full max-w-md rounded-t-3xl bg-white px-5 py-[34px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-start">
          <h2 className="text-[20px] font-semibold text-[#222222]">필터</h2>
        </div>

        {/* 티어 */}
        <div className="flex flex-col">
          <p className="text-md mb-4 font-semibold text-[#222222]">티어</p>
          <div className="mb-11 flex flex-wrap gap-2.5 bg-amber-100">
            {tier.map((tier, idx) => (
              <SelectButton
                key={idx}
                text={tier}
                onClick={() => toggleTierIndex(idx)}
                className={
                  selectedTierIndex.includes(idx)
                    ? 'bg-[#FFB84C] text-white'
                    : 'border-[#E0E0E0]'
                }
              />
            ))}
          </div>
        </div>

        {/* 카테고리 */}
        <div className="flex flex-col">
          <p className="text-md mb-4 font-semibold text-[#222222]">카테고리</p>
          <div className="flex flex-wrap gap-2.5 bg-red-100">
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

          <div className="flex gap-[14px]">
            <Button
              className="mt-[73px] mb-3 border border-[#E0E0E0] bg-white text-sm font-medium text-[#616161]"
              //onClick={() => setIsOpen(false)}
            >
              초기화
            </Button>

            <Button
              className="mt-[73px] mb-3 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              설정하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

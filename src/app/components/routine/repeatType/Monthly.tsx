import { useState } from 'react';
import MonthPicker from './MonthPicker';

interface MonthlyProps {
  onClose: () => void;
  onSubmit: (cycle: { month: string }) => void;
}

export default function Monthly({ onSubmit, onClose }: MonthlyProps) {
  const [selectedDay, setSelectedDay] = useState('1');

  const handleSubmit = () => {
    const cycle = {
      month: selectedDay,
    };

    onSubmit(cycle);
    onClose();
  };

  return (
    <>
      <div className="mx-[5px] my-[27px] flex min-h-[588px] flex-col">
        <span className="text-sm font-semibold dark:text-[var(--dark-gray-700)]">
          매월 n일 마다
        </span>
        <div className="flex justify-center">
          <div className="relative w-[150px]">
            <span className="pointer-events-none absolute top-[108px] left-[-50px] translate-x-[60px] -translate-y-1/2 text-sm dark:text-[var(--dark-gray-700)]">
              매월
            </span>
            <MonthPicker onChange={setSelectedDay} />
            <span className="pointer-events-none absolute top-[108px] left-[50px] translate-x-[60px] -translate-y-1/2 text-sm dark:text-[var(--dark-gray-700)]">
              일
            </span>
          </div>
        </div>
        {/* 확인 버튼 */}
        <button
          className="mt-[140px] rounded bg-[#ffb84c] px-4 py-2 text-white transition-colors dark:text-[var(--dark-bg-primary)]"
          onClick={handleSubmit}
        >
          확인
        </button>
      </div>
    </>
  );
}

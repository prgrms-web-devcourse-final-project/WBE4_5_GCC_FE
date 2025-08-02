import { useState } from 'react';
import DayPicker from './DayPicker';

interface DailyProps {
  onClose: () => void;
  onSubmit: (cycle: { daily: string }) => void;
}

export default function Daily({ onSubmit, onClose }: DailyProps) {
  const [selectedDay, setSelectedDay] = useState('1');

  const handleSubmit = () => {
    const cycle = {
      daily: selectedDay,
    };
    onSubmit(cycle);
    onClose();
  };

  return (
    <>
      <div className="mx-[5px] my-[27px] flex min-h-[588px] flex-col">
        <span className="text-sm font-semibold dark:text-[var(--dark-gray-700)]">
          n일 마다
        </span>
        <div className="flex justify-center">
          <div className="relative w-[150px]">
            <DayPicker onChange={setSelectedDay} />
            <span className="pointer-events-none absolute top-[108px] right-[60px] translate-x-[60px] -translate-y-1/2 text-sm dark:text-[var(--dark-gray-700)]">
              일마다
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

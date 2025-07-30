import { useState } from 'react';
import DayPicker from './DayPicker';

interface DailyProps {
  onClose: () => void;
  onSubmit: (cycle: { daily: string }) => void;
}

export default function Daily({
  onSubmit,
  onClose,
  // setRepeatType,
  // setRepeatValue,
}: DailyProps) {
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
        <span className="text-sm font-semibold">n일 마다</span>
        <div className="flex justify-center">
          <div className="relative w-[150px]">
            <DayPicker onChange={setSelectedDay} />
            <span className="pointer-events-none absolute top-[108px] right-[60px] translate-x-[60px] -translate-y-1/2 text-sm">
              일마다
            </span>
          </div>
        </div>
        {/* 확인 버튼 */}
        <button
          className="mt-[140px] rounded bg-[#FFB84C] px-4 py-2 text-white transition-colors"
          onClick={handleSubmit}
        >
          확인
        </button>
      </div>
    </>
  );
}

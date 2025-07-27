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
      <div className="relative mx-[5px] my-[27px] flex min-h-[588px] flex-col">
        <span className="text-sm font-semibold">매월 n일 마다</span>
        <div className="flex justify-center">
          <span className="pointer-events-none absolute top-[128px] left-[80px] translate-x-[60px] -translate-y-1/2 text-sm">
            매월
          </span>
          <div className="w-[150px]">
            <MonthPicker onChange={setSelectedDay} />
          </div>
          <span className="pointer-events-none absolute top-[128px] left-[170px] translate-x-[60px] -translate-y-1/2 text-sm">
            일
          </span>
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

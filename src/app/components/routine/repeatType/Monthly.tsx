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
        <span className="text-lg font-semibold mt-1 mb-8">매월 n일 마다</span>
        <div className="mx-auto flex justify-center max-w-[614px]">
          <div className="relative w-[180px]">
            <span className="pointer-events-none absolute top-[33%] left-[-60px] -translate-y-1/2 text-lg font-medium">
              매월
            </span>
            <MonthPicker onChange={setSelectedDay} />
            <span className="pointer-events-none absolute top-[33%] right-[-60px] -translate-y-1/2 text-lg font-medium">
              일
            </span>
          </div>
        </div>
        <button
          className="mt-[101px] rounded-lg bg-[#FFB84C] py-4 text-lg font-semibold text-white transition-colors hover:bg-[#ffb74d] cursor-pointer"
          onClick={handleSubmit}
        >
          확인
        </button>
      </div>
    </>
  );
}

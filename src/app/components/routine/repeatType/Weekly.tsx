import { useState } from 'react';
import WeekPicker from './WeekPicker';

interface WeeklyProps {
  onClose: () => void;
  onSubmit: (cycle: { days: string; week: string }) => void;
}

export default function Weekly({ onSubmit, onClose }: WeeklyProps) {
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const [selectedWeek, setSelectedWeek] = useState('1');
  const options = ['월', '화', '수', '목', '금', '토', '일'];

  const toggleIndex = (idx: number) => {
    setSelectedIndex((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  const convertDaysToNumbers = (days: string) => {
    const dayMap: Record<string, string> = {
      월: '1',
      화: '2',
      수: '3',
      목: '4',
      금: '5',
      토: '6',
      일: '7',
    };
    return days
      .split(', ')
      .map((day) => dayMap[day])
      .filter(Boolean)
      .join(',');
  };

  const handleSubmit = () => {
    const selectedDays =
      selectedIndex.length === options.length
        ? '매일'
        : selectedIndex.length > 0
          ? selectedIndex
            .sort((a, b) => a - b)
            .map((i) => options[i])
            .join(', ')
          : '요일 미선택';

    const cycle = {
      days: convertDaysToNumbers(selectedDays),
      week: selectedWeek,
    };

    onSubmit(cycle);
    onClose();
  };

  return (
    <>
      <div className="mx-[5px] flex min-h-[588px] flex-col">
        {/* 요일 선택 */}
        <div className="my-[27px] flex flex-col">
          <span className="text-lg font-semibold mt- mb-6 dark:text-[var(--dark-gray-700)]">요일 선택</span>
          <div className="mx-auto flex max-w-[614px] justify-between gap-8">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => toggleIndex(idx)}
                className={`inline-flex aspect-square cursor-pointer items-center justify-center rounded-full border-none text-base font-medium transition-colors ${selectedIndex.includes(idx)
                  ? 'bg-[#FFB84C] text-white dark:text-[var(--dark-bg-primary)]'
                  : 'bg-[#F5F5F5] text-[#9E9E9E] dark:bg-[var(--dark-bg-tertiary)] dark:text-[var(--dark-white)]'
                  }`}
                style={{ width: '50px' }}
              >
                {option}
              </button>
            ))}
          </div>

          <hr className="mt-7 border-[#E0E0E0]" />
        </div>

        <div className="flex flex-col">
          <div className="flex w-full">
            <span className="text-lg font-semibold dark:text-[var(--dark-gray-700)]">반복주기</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="text-base text-[#616161] dark:text-[var(--dark-gray-700)]">
                {selectedIndex.length === options.length
                  ? '매일'
                  : selectedIndex.length > 0
                    ? selectedIndex
                      .sort((a, b) => a - b)
                      .map((i) => options[i])
                      .join(', ')
                    : '요일 미선택'}{' '}
                / {selectedWeek === '1' ? '매주' : `${selectedWeek}주마다`}
              </span>
            </div>
          </div>

          {/* 주 반복 설정 */}
          <div className="inline-flex w-fit items-center gap-2 self-center">
            <div className="relative w-[150px]">
              <WeekPicker onChange={setSelectedWeek} />
              <span className="pointer-events-none absolute right-[0px] bottom-[131px] translate-x-[60px] -translate-y-1/2 text-base dark:text-[var(--dark-gray-700)]">
                주마다
              </span>
            </div>
          </div>

          {/* 확인 버튼 */}
          <button
            className={`-mt-5 rounded-lg py-4 text-lg font-semibold text-white transition-colors dark:text-[var(--dark-bg-primary)] ${selectedIndex.length === 0
              ? 'bg-[#E0E0E0]'
              : 'cursor-pointer bg-[#FFB84C]'
              }`}
            onClick={handleSubmit}
            disabled={selectedIndex.length === 0}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}

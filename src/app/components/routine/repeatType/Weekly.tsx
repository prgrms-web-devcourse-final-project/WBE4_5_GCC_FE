import { useState } from 'react';
import WeekPicker from './WeekPicker';

interface WeeklyProps {
  onClose: () => void;
  onSubmit: (cycle: { days: string; week: string }) => void;
}

export default function Weekly({ onSubmit, onClose }: WeeklyProps) {
  // 선택된 요일
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const [selectedWeek, setSelectedWeek] = useState('1');
  // 날짜 선택 옵션
  const options = ['월', '화', '수', '목', '금', '토', '일'];

  // 요일 선택
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
      .filter(Boolean) // 혹시 모를 undefined 제거
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
          <span className="text-sm font-semibold dark:text-[var(--dark-gray-700)]">
            요일 선택
          </span>
          <div className="mx-auto mt-[18px] mr-2 mb-[22px] ml-[18px] flex justify-between">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => toggleIndex(idx)}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none text-xs transition-colors ${
                  selectedIndex.includes(idx)
                    ? 'bg-[var(--primary-yellow)] text-white dark:text-[var(--dark-bg-primary)]'
                    : 'bg-[#F5F5F5] text-[var(--gray-500)] dark:bg-[var(--dark-bg-tertiary)] dark:text-[var(--dark-white)]'
                } `}
              >
                {option}
              </button>
            ))}
          </div>
          <hr className="text-[var(--gray-300)]" />
        </div>
        <div className="flex flex-col">
          <div className="flex w-full">
            <span className="text-sm font-semibold dark:text-[var(--dark-gray-700)]">
              반복주기
            </span>
            <div className="ml-auto flex items-center gap-1">
              <span className="text-xs text-[var(--gray-700)] dark:text-[var(--dark-gray-700)]">
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
              <span className="pointer-events-none absolute right-[60px] bottom-[87px] translate-x-[60px] -translate-y-1/2 text-sm dark:text-[var(--dark-gray-700)]">
                주마다
              </span>
            </div>
          </div>
          {/* 확인 버튼 */}
          <button
            className={`mt-5 rounded px-4 py-2 text-white transition-colors dark:text-[var(--dark-bg-primary)] ${
              selectedIndex.length === 0
                ? 'cursor-not-allowed bg-[var(--gray-300)]'
                : 'cursor-pointer bg-[var(--primary-yellow)]'
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

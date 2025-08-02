import { Lock } from 'lucide-react';
import clsx from 'clsx';

const toggleList = [
  { id: 1, label: '일간', locked: false },
  { id: 2, label: '주간', locked: false },
  { id: 3, label: '월간', locked: false },
];

// 일간, 주간, 월간 토글버튼
export default function ThreeToggle({
  selectedIdx,
  setSelectedIdx,
}: {
  selectedIdx: number;
  setSelectedIdx: (idx: number) => void;
}) {
  return (
    <div className="flex w-full rounded-full bg-[#fff4d1] p-1">
      {toggleList.map(({ id, label, locked }, idx) => {
        const isSelected = selectedIdx === idx;
        return (
          <button
            key={id}
            className={clsx(
              'flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all',
              isSelected
                ? 'border border-[#ffb84c] bg-[#ffb84c] text-white'
                : 'text-[#222222] dark:text-[var(--dark-gray-700)]',
              !isSelected && 'border border-transparent',
              locked && 'cursor-not-allowed',
            )}
            disabled={locked}
            onClick={() => !locked && setSelectedIdx(idx)}
          >
            {locked && <Lock size={14} />}
            {label}
          </button>
        );
      })}
    </div>
  );
}

import { Lock } from 'lucide-react';
import clsx from 'clsx';

const toggleList = [
  { id: 1, label: '일간', locked: true },
  { id: 2, label: '주간', locked: false },
  { id: 3, label: '월간', locked: true },
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
    <div className="flex w-full max-w-sm rounded-full bg-[#F5F5F5] p-1">
      {toggleList.map(({ id, label, locked }, idx) => {
        const isSelected = selectedIdx === idx;
        return (
          <button
            key={id}
            className={clsx(
              'flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all',
              isSelected
                ? 'border border-[#FFB84C] bg-white text-[#FFB84C]'
                : 'text-[#BDBDBD]',
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

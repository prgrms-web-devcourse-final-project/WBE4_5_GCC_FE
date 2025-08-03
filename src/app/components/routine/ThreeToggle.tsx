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
    <div className="flex w-full rounded-full bg-[#FFF4D1] p-1">
      {toggleList.map(({ id, label, locked }, idx) => {
        const isSelected = selectedIdx === idx;
        return (
          <button
            key={id}
            className={clsx(
              'flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-all',
              isSelected
                ? 'border border-[#FFB84C] bg-[#FFB84C] text-white shadow-[0_0_6px_rgba(255,184,76,0.6)]'
                : 'text-[#222222] dark:text-[var(--dark-gray-700)] border border-transparent hover:bg-[#FFF1D6]',
              locked && 'cursor-not-allowed opacity-50',
            )}
            disabled={locked}
            onClick={() => !locked && setSelectedIdx(idx)}
          >
            {locked && <Lock size={16} />}
            {label}
          </button>
        );
      })}
    </div>
  );
}

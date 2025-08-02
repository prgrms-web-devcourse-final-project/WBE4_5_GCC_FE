import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function Dropdown({
  options,
  selected,
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-full cursor-pointer items-center justify-between rounded-lg border border-[var(--gray-300)] px-4 py-2 text-left text-sm text-[var(--black)] dark:bg-[var(--dark-bg-tertiary)] dark:text-[var(--dark-white)]"
      >
        {selected || '선택하세요'}
        {isOpen ? (
          <ChevronUp
            className="h-[18px] w-[18px] text-[var(--gray-700)] dark:text-[var(--dark-white)]"
            strokeWidth={2}
          />
        ) : (
          <ChevronDown
            className="h-[18px] w-[18px] text-[var(--gray-700)] dark:text-[var(--dark-white)]"
            strokeWidth={2}
          />
        )}
      </button>

      {/* 옵션 목록 */}
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-[var(--gray-300)] bg-[var(--white)] text-sm shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] dark:bg-[var(--dark-bg-primary)]">
          {options.map((option, idx) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`flex h-12 cursor-pointer flex-col justify-center px-4 py-2 text-[var(--black)] transition-colors duration-150 active:bg-[var(--black)] dark:bg-[var(--dark-gray-200)]/20 dark:text-[var(--dark-gray-700)] hover:dark:bg-[var(--dark-bg-tertiary)] ${idx !== options.length - 1 ? 'border-b border-[var(--gray-300)]' : ''} `}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

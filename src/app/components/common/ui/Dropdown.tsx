import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function Dropdown({ options, selected, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 border border-[#E0E0E0] rounded-lg px-4 py-2 text-left flex justify-between items-center text-sm text-[#222222]"
      >
        {selected || '선택하세요'}
        {isOpen ? (
          <ChevronUp className="w-[18px] h-[18px] text-[#616161]" strokeWidth={2} />
        ) : (
          <ChevronDown className="w-[18px] h-[18px] text-[#616161]" strokeWidth={2} />
        )}
      </button>

      {/* 옵션 목록 */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full border border-[#E0E0E0] rounded-lg bg-white shadow-sm text-sm">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer text-[#222222]"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
        <ul className="absolute z-10 mt-2 w-full border border-[#E0E0E0] rounded-lg bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] text-sm overflow-hidden">
          {options.map((option, idx) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`
                flex flex-col justify-center h-12 px-4 py-2 cursor-pointer text-[#222222]
                active:bg-[#222222]/20 transition-colors duration-150
                ${idx !== options.length-1 ? 'border-b border-[#E0E0E0]' : ''}
              `}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

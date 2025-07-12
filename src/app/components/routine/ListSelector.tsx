'use client';

import { ChevronRight } from "lucide-react";

interface CategorySelectorProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  placeholder?: string;
  options?: string[];
  onClick: () => void;
  className?: string;
}

export default function ListSelector ({
  icon,
  label,
  value,
  placeholder,
  options = [],
  onClick,
  className,
} : CategorySelectorProps) {

  return (
    <div className={`w-full h-12 border border-[#E0E0E0] px-4 py-4 flex justify-between items-center ${className ?? ''}`}>

      {/* 좌측 영역 */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#222222]">
        <span>{icon}</span>
        <span>{label}</span>
      </div>

      {/* 우측 영역 */}
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-1 text-xs text-[#9E9E9E]"
      >
        <span className={value ? 'text-[#222222]' : 'text-[#9E9E9E]'}>
          {value || placeholder}
        </span>
        <ChevronRight className="w-auto h-3"/>
      </button>
    </div>
  );
}
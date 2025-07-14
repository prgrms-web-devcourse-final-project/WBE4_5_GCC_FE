'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import DatePicker from '@/app/components/routine/Calendar/DatePicker';

interface CategorySelectorProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  placeholder?: string;
  options?: string[];
  onClick: () => void;
  className?: string;
}

export default function ListSelector({
  icon,
  label,
  value,
  placeholder,
  options = [],
  onClick,
  className,
}: CategorySelectorProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div
      className={`flex h-12 w-full items-center justify-between border border-[#E0E0E0] px-4 py-4 ${className ?? ''}`}
    >
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
        {label === '시작일' && (
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        <ChevronRight className="h-3 w-auto" />
      </button>
    </div>
  );
}

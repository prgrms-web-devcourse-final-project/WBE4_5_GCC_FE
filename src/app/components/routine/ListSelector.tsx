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
  onClick,
  className,
}: CategorySelectorProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className={`relative w-full ${className ?? ''}`}>
      <div className="flex h-12 w-full items-center justify-between border border-[#E0E0E0] px-4 py-4">
        {/* 좌측 영역 */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#222222]">
          <span>{icon}</span>
          <span>{label}</span>
        </div>

        {/* 우측 영역 - 조건부 렌더링 */}
        {label === '시작일' ? (
          // '시작일'인 경우 DatePicker 표시
          <div className="absolute top-2 right-4 z-50 mt-2">
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        ) : (
          // 그 외에는 버튼 표시
          <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-1 text-xs text-[#9E9E9E]"
          >
            <span className={value ? 'text-[#222222]' : 'text-[#9E9E9E]'}>
              {value || placeholder}
            </span>
            <ChevronRight className="h-3 w-auto" />
          </button>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { format, parseISO } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import DatePicker from '@/app/components/routine/Calendar/DatePicker';

interface CategorySelectorProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  placeholder?: string;
  options?: string[];
  onClick?: () => void;
  className?: string;
  setSelectedDate?: (value: string) => void;
}

export default function ListSelector({
  icon,
  label,
  value,
  placeholder,
  onClick,
  className,
  setSelectedDate,
}: CategorySelectorProps) {
  const [selectedDate, setSelectedDateLocal] = useState<Date>(
    value ? parseISO(value) : new Date(),
  );

  useEffect(() => {
    if (value) {
      setSelectedDateLocal(parseISO(value));
    }
  }, [value]);

  useEffect(() => {
    if (setSelectedDate) {
      const formatted = format(selectedDate, 'yyyy-MM-dd');
      setSelectedDate(formatted);
    }
  }, [selectedDate, setSelectedDate]);

  const handleDateChange: Dispatch<SetStateAction<Date>> = (dateOrFn) => {
    setSelectedDateLocal((prevDate) => {
      const newDate =
        typeof dateOrFn === 'function' ? dateOrFn(prevDate) : dateOrFn;
      const formatted = format(newDate, 'yyyy-MM-dd');
      if (setSelectedDate) setSelectedDate(formatted);
      return newDate;
    });
  };

  const isNoBottomBorder = label === '시작일' || label === '반복주기';

  return (
    <div
      className={`relative w-full border border-[#E0E0E0] bg-white dark:border-[var(--dark-bg-tertiary)] dark:bg-[var(--dark-bg-primary)] ${className ?? ''}`}
    >
      <div
        className={`flex h-[64px] w-full items-center justify-between px-5 border-t-0 border-[#E0E0E0] bg-white dark:border-[var(--dark-bg-tertiary)] dark:bg-[var(--dark-bg-primary)] ${isNoBottomBorder ? '' : 'border-b'
          }`}
      >
        <div className="flex items-center gap-3 text-base font-semibold text-[#222222 dark:text-[var(--dark-gray-700)]">
          <span>{icon}</span>
          <span>{label}</span>
        </div>

        {label === '시작일' ? (
          <div className="z-50">
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={handleDateChange}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-1 text-base text-[#222222]"
          >
            <span
              className={`${value ? 'text-[#222222] dark:text-[var(--dark-gray-700)]' : 'text-[#c4c4c4]'
                } text-base cursor-pointer`}
            >
              {value || placeholder}
            </span>
            <ChevronRight className="h-4 w-auto text-[#c4c4c4]" />
          </button>
        )}
      </div>
    </div>
  );
}

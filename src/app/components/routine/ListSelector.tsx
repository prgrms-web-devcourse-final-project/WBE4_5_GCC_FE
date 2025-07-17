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
  setSelectedDate?: (value: string) => void; // 부모에게는 string을 넘김
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
  // 내부 상태는 Date 타입 유지
  const [selectedDate, setSelectedDateLocal] = useState<Date>(
    value ? parseISO(value) : new Date(),
  );

  // 부모에서 value가 바뀌면 내부 상태도 동기화
  useEffect(() => {
    if (value) {
      setSelectedDateLocal(parseISO(value));
    }
  }, [value]);

  // selectedDate가 변경되면 부모에게 알림
  useEffect(() => {
    if (setSelectedDate) {
      const formatted = format(selectedDate, 'yyyy-MM-dd');
      setSelectedDate(formatted);
    }
  }, [selectedDate, setSelectedDate]);

  // DatePicker에 넘길 타입에 맞춘 래퍼 함수
  const handleDateChange: Dispatch<SetStateAction<Date>> = (dateOrFn) => {
    // dateOrFn는 Date 또는 (prev: Date) => Date 형태
    setSelectedDateLocal((prevDate) => {
      const newDate =
        typeof dateOrFn === 'function' ? dateOrFn(prevDate) : dateOrFn;
      const formatted = format(newDate, 'yyyy-MM-dd');
      if (setSelectedDate) setSelectedDate(formatted);
      return newDate;
    });
  };

  return (
    <div
      className={`relative w-full border border-[#E0E0E0] ${className ?? ''}`}
    >
      <div className="flex h-12 w-full items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2 text-xs font-medium text-[#222222]">
          <span>{icon}</span>
          <span>{label}</span>
        </div>

        {label === '시작일' ? (
          <div className="absolute top-2 right-4 z-50 mt-2">
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={handleDateChange}
            />
          </div>
        ) : (
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

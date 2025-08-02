import { ChevronDown } from 'lucide-react';
import {
  startOfWeek,
  getMonth,
  getYear,
  addDays,
  format,
  isToday,
} from 'date-fns';

const weeks = ['월', '화', '수', '목', '금', '토', '일'];

interface CalendarBarProps {
  setIsOpen: (open: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

export default function CalendarBar({
  setIsOpen,
  selectedDate,
  setSelectedDate,
}: CalendarBarProps) {
  const weekStart = startOfWeek(selectedDate ?? new Date(), {
    weekStartsOn: 1,
  });
  const year = getYear(weekStart);
  const month = getMonth(weekStart);
  const today = new Date();

  const thisWeek = Array.from({ length: 7 }).map((_, i) => {
    const day = addDays(weekStart, i);
    return {
      fullDate: day,
      date: format(day, 'd'),
      label: weeks[i],
      isToday: isToday(day),
      isSelected:
        format(day, 'yyyy-MM-dd') ===
        format(selectedDate ?? today, 'yyyy-MM-dd'),
    };
  });

  return (
    <div className="mb-[20px] w-full max-w-md rounded-[10px] bg-[var(--white)] p-4 select-none dark:bg-[var(--dark-bg-primary)] dark:text-[var(--dark-gray-700)]">
      <div className="mb-[27px] flex items-center justify-start gap-1.5">
        <span className="text-lg font-semibold">
          {year}년 {month + 1}월
        </span>
        <ChevronDown
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>
      <div className="flex items-center justify-between px-5">
        {thisWeek.map((day) => (
          <div
            key={day.date + day.label}
            className="flex flex-col items-center space-y-[9px]"
          >
            <span className="text-xs">{day.label}</span>
            <div
              onClick={() => {
                setSelectedDate(day.fullDate);
                setIsOpen(false);
              }}
              className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full text-sm transition-colors hover:shadow-sm ${day.isToday && !day.isSelected ? 'border-2 border-[var(--primary-yellow)] bg-[var(--white)] text-black dark:bg-[var(--dark-bg-tertiary)] dark:text-[var(--dark-white)]' : ''} ${day.isSelected ? 'bg-[var(--primary-yellow)] text-white dark:text-[var(--dark-bg-primary)]' : ''} ${!day.isToday && !day.isSelected ? 'bg-[#EEF0F2] text-black dark:bg-[var(--dark-bg-tertiary)] dark:text-[var(--dark-white)]' : ''}`}
            >
              {day.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

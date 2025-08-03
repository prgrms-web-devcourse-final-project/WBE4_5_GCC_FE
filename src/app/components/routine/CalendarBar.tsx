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
    <div className="w-full px-6 max-w-[614px] select-none mb-8 dark:bg-[var(--dark-bg-primary)] dark:text-[var(--dark-gray-700)]">
      <div className="mb-6 flex items-center justify-start gap-1.5">
        <span className="text-xl font-semibold">
          {year}년 {month + 1}월
        </span>
        <ChevronDown
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      <div className="flex items-center justify-between">
        {thisWeek.map((day) => (
          <div
            key={day.date + day.label}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-base font-medium">{day.label}</span>

            <div
              onClick={() => {
                setSelectedDate(day.fullDate);
                setIsOpen(false);
              }}
              className={`flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-full text-base transition-colors hover:shadow-sm
${day.isToday && !day.isSelected ? 'border-2 border-[#ffb84c] bg-white text-black dark:bg-[var(--dark-bg-tertiary)] dark:text-[var(--dark-white)]' : ''} ${day.isSelected ? 'bg-[#ffb84c] text-white dark:text-[var(--dark-bg-primary)]' : ''} ${!day.isToday && !day.isSelected ? 'bg-[#EEF0F2] text-black dark:bg-[var(--dark-bg-tertiary)] dark:text-[var(--dark-white)]' : ''}`}
            >
              {day.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

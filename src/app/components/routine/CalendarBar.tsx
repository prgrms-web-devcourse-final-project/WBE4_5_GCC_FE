import { ChevronDown } from 'lucide-react';
import {
  startOfWeek,
  getMonth,
  getYear,
  addDays,
  format,
  isToday,
} from 'date-fns';
import { useState } from 'react';

const weeks = ['월', '화', '수', '목', '금', '토', '일'];

interface CalendarBarProps {
  setIsOpen: (open: boolean) => void;
}

export default function CalendarBar({ setIsOpen }: CalendarBarProps) {
  const [date, setDate] = useState(new Date());
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const year = getYear(date);
  const month = getMonth(date);

  const thisWeek = Array.from({ length: 7 }).map((_, i) => {
    const day = addDays(weekStart, i);
    return {
      date: format(day, 'd'),
      label: weeks[i],
      selected: isToday(day),
    };
  });

  console.log(setDate);
  return (
    <div className="mb-[30px] w-full max-w-md">
      <div className="mb-[27px] flex items-center justify-start gap-1.5">
        <span className="text-lg font-semibold">
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
            key={day.date}
            className="flex flex-col items-center space-y-[9px]"
          >
            <span className="text-xs">{day.label}</span>
            <div
              className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full text-sm ${day.selected ? 'bg-[#FFB84C] text-white' : 'bg-[#EEF0F2] text-black'}`}
            >
              {day.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

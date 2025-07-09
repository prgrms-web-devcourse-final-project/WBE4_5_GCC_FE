import { ChevronDown } from "lucide-react";
import {
  startOfWeek,
  getMonth,
  getYear,
  addDays,
  format,
  isToday,
} from "date-fns";
import { useState } from "react";

const weeks = ["월", "화", "수", "목", "금", "토", "일"];

export default function CalendarBar() {
  const [date, setDate] = useState(new Date());
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const year = getYear(date);           
  const month = getMonth(date);

  const thisWeek = Array.from({ length: 7 }).map((_, i) => {
    const day = addDays(weekStart, i);
    return {
      date: format(day, "d"),
      label: weeks[i],
      selected: isToday(day)
    };
  });

  console.log(setDate);
  return (
    <div className="w-full max-w-md mb-[30px] px-5">
      <div className="flex items-center justify-start gap-1.5 mb-[27px]">
        <span className="text-lg font-semibold">{year}년 {month+1}월</span>
        <ChevronDown className="w-6 h-6 cursor-pointer" />
      </div>
      <div className="flex justify-between items-center">
        {thisWeek.map((day) => (
          <div key={day.date} className="flex flex-col items-center space-y-[9px]">
            <span className="text-xs">{day.label}</span>
            <div
              className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm cursor-pointer
                ${day.selected ? "bg-[#FFB84C] text-white" : "bg-[#EEF0F2] text-black"}`}
            >
              {day.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

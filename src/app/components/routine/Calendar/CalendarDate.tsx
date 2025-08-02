import {
  format,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  startOfToday,
  isBefore,
  isAfter,
  endOfMonth,
} from 'date-fns';
import useCalender from '@/hooks/useCalendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type DatePickerProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  viewDate: Date;
  setViewDate: (date: Date) => void;
  onChangePickerType: () => void;
};

export default function CalendarDate({
  selectedDate,
  setSelectedDate,
  viewDate,
  setViewDate,
  onChangePickerType,
}: DatePickerProps) {
  const { currentMonthAllDates, weekDays } = useCalender(viewDate);
  const nextMonth = () => {
    setViewDate(addMonths(viewDate, 1));
  };
  const prevMonth = () => {
    setViewDate(subMonths(viewDate, 1));
  };
  const onChangeDate = (date: Date) => {
    setSelectedDate(date);
  };
  const today = startOfToday();

  return (
    <div className="my-4 flex flex-col gap-1">
      <div className="mb-5 flex items-center justify-between px-2">
        <div className="flex gap-2">
          <span className="text-lg font-bold">
            {format(viewDate, 'yyyy년 MM월')}
          </span>
          <button type="button" onClick={onChangePickerType}>
            <ChevronRight className="h-4 w-4 cursor-pointer text-[#222]" />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prevMonth}
            disabled={!isAfter(viewDate, endOfMonth(today))}
          >
            <ChevronLeft
              className={`h-6 w-6 ${isAfter(viewDate, endOfMonth(today)) ? 'cursor-pointer text-[#222]' : 'text-[#c4c4c4]'}`}
            />
          </button>
          <button type="button" onClick={nextMonth}>
            <ChevronRight className="h-6 w-6 cursor-pointer text-[#222]" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 place-items-center text-[12px] font-bold text-[#c4c4c4]">
        {weekDays.map((days, index) => (
          <div key={index}>{days}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 place-items-center text-base">
        {currentMonthAllDates.map((date, index) => {
          // 전달/다음달 날짜는 렌더링 X
          if (!isSameMonth(viewDate, date)) {
            return <div key={index}></div>;
          }

          return (
            <button
              disabled={isBefore(date, today)}
              key={index}
              className={`flex h-9 w-9 items-center justify-center rounded-full ${isBefore(date, today)
                ? 'cursor-auto opacity-15'
                : isSameDay(selectedDate, date)
                  ? 'cursor-pointer bg-[#FFB84C] text-white dark:text-[var(--dark-bg-primary)]'
                  : 'cursor-pointer'
                }`}
              type="button"
              onClick={() => onChangeDate(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

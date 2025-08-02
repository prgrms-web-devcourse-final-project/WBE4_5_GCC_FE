import {
  format,
  subYears,
  addYears,
  isSameMonth,
  isBefore,
  startOfToday,
  startOfMonth,
  isAfter,
  endOfYear,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import useCalender from '@/hooks/useCalendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PickerType = 'date' | 'month' | 'year' | '';

type DatePickerProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  viewDate: Date;
  setViewDate: (date: Date) => void;
  setPickerType: (type: PickerType) => void;
};

export default function Month({
  setPickerType,
  selectedDate,
  setSelectedDate,
  viewDate,
  setViewDate,
}: DatePickerProps) {
  const { allMonth } = useCalender(selectedDate);
  //다음 년도로 이동
  const onNextYear = () => {
    setSelectedDate(addYears(selectedDate, 1));
  };
  //이전 년도로 이동
  const onPrevYear = () => {
    setSelectedDate(subYears(selectedDate, 1));
  };
  // 월 변경시 캘린더 닫기 및 월 Date 변경
  const onChangeMonth = (month: Date) => {
    setPickerType('');
    setViewDate(month);
  };
  const today = startOfToday();
  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between p-3">
        <span className="flex gap-2 text-lg font-bold">
          {format(selectedDate, 'yyyy년')}
          <button type="button" onClick={() => setPickerType('date')}>
            <ChevronRight className="h-4 w-4 cursor-pointer text-[#222]" />
          </button>
        </span>
        <div>
          <button
            type="button"
            onClick={onPrevYear}
            disabled={!isAfter(selectedDate, endOfYear(today))}
          >
            <ChevronLeft
              className={`h-5 w-5 ${isAfter(selectedDate, endOfYear(today)) ? 'cursor-pointer text-[#222]' : 'text-[#c4c4c4]'}`}
            />
          </button>
          <button type="button" onClick={onNextYear}>
            <ChevronRight className="h-5 w-5 cursor-pointer text-[#222]" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3">
        {allMonth.map((month, index) => (
          <button
            type="button"
            disabled={isBefore(month, startOfMonth(today))}
            key={index}
            className={`rounded-lg p-3 text-base ${isBefore(month, startOfMonth(today))
              ? 'opacity-15'
              : isSameMonth(viewDate, month)
                ? 'cursor-pointer bg-[#FFB84C] text-white'
                : 'cursor-pointer'
              }`}
            onClick={() => onChangeMonth(month)}
          >
            {format(month, 'MMMM', { locale: ko })}
          </button>
        ))}
      </div>
    </div>
  );
}

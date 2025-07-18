import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUIStore } from '@/store/uiStore';

interface CalendarBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

export default function CalendarBottomSheet({
  isOpen,
  setIsOpen,
  selectedDate,
  setSelectedDate,
}: CalendarBottomSheetProps) {
  //화면에 보여지는 달
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const setIsCalendarBottomSheetOpen = useUIStore(
    (state) => state.setIsCalendarBottomSheetOpen,
  );

  useEffect(() => {
    setIsCalendarBottomSheetOpen(!!isOpen);
    return () => setIsCalendarBottomSheetOpen(false);
  }, [isOpen, setIsCalendarBottomSheetOpen]);

  if (!isOpen) return null;

  // 이전 달로 이동
  const handlePrevMonth = () => {
    const newDate = new Date(activeStartDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setActiveStartDate(newDate);
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    const newDate = new Date(activeStartDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setActiveStartDate(newDate);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative h-[500px] w-full max-w-md rounded-t-2xl bg-white px-4 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-6 mb-9 flex w-full items-center justify-between px-6">
          <ChevronLeft className="cursor-pointer" onClick={handlePrevMonth} />
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold">
              {activeStartDate instanceof Date
                ? `${activeStartDate.getFullYear()}년 ${activeStartDate.getMonth() + 1}월`
                : ''}
            </h2>
            <div
              className="flex h-5 w-9 cursor-pointer items-center justify-center rounded-[5px] border border-[#919191] text-xs text-[#919191]"
              onClick={() => {
                const today = new Date();
                setActiveStartDate(today);
                setSelectedDate(today);
              }}
            >
              오늘
            </div>
          </div>
          <ChevronRight className="cursor-pointer" onClick={handleNextMonth} />
        </div>

        <Calendar
          onChange={(value) => {
            if (value instanceof Date) {
              setSelectedDate(value);
            }
          }}
          value={selectedDate}
          activeStartDate={activeStartDate}
          className="w-full bg-white px-2 text-sm"
          calendarType="iso8601"
          locale="ko-KR"
          view="month"
          prev2Label={null}
          next2Label={null}
          formatDay={(locale, date) => String(date.getDate())}
        />
      </div>
    </div>
  );
}

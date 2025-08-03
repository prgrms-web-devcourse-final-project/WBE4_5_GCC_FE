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
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const setIsCalendarBottomSheetOpen = useUIStore(
    (state) => state.setIsCalendarBottomSheetOpen
  );

  useEffect(() => {
    setIsCalendarBottomSheetOpen(!!isOpen);
    return () => setIsCalendarBottomSheetOpen(false);
  }, [isOpen, setIsCalendarBottomSheetOpen]);

  if (!isOpen) return null;

  const handlePrevMonth = () => {
    const newDate = new Date(activeStartDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setActiveStartDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(activeStartDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setActiveStartDate(newDate);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/50 dark:bg-[var(--dark-gray-200)]/50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-[614px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[600px] w-full rounded-t-2xl bg-white px-6 py-6 dark:bg-[var(--dark-bg-primary)]">
          <div className="mt-3 mb-11 flex w-full items-center justify-between">
            <ChevronLeft
              className="h-6 w-6 cursor-pointer text-[#222]"
              onClick={handlePrevMonth}
            />
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-[#222]">
                {`${activeStartDate.getFullYear()}년 ${activeStartDate.getMonth() + 1}월`}
              </h2>
              <button
                className="h-7 w-12 rounded-md border border-[#919191] text-base text-[#919191] cursor-pointer"
                onClick={() => {
                  const today = new Date();
                  setActiveStartDate(today);
                  setSelectedDate(today);
                }}
              >
                오늘
              </button>
            </div>
            <ChevronRight
              className="h-6 w-6 cursor-pointer text-[#222]"
              onClick={handleNextMonth}
            />
          </div>

          <Calendar
            onChange={(value) => {
              if (value instanceof Date) {
                setSelectedDate(value);
              }
            }}
            value={selectedDate}
            activeStartDate={activeStartDate}
            calendarType="iso8601"
            locale="ko-KR"
            view="month"
            prev2Label={null}
            next2Label={null}
            formatDay={(_, date) => String(date.getDate())}
            className="custom-calendar text-[16px] dark:bg-[var(--dark-bg-primary)]"
          />
        </div>
      </div>
    </div>
  );
}

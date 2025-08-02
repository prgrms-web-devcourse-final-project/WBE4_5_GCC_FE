'use client';

import { useState, Dispatch, SetStateAction, useRef, useEffect } from 'react';
import { format, isValid } from 'date-fns';
import CalendarDate from './CalendarDate';
import Month from './Month';
import DatePickerWrapper from './DatePickerWrapper';

type PickerType = 'date' | 'month' | 'year' | '';

export interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  onChangePickerType?: () => void;
}

export default function DatePicker({
  selectedDate,
  setSelectedDate,
  wrapperClassName = '',
}: Omit<DatePickerProps, 'setPickerType'> & { wrapperClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pickerType, setPickerType] = useState<PickerType>('');
  const [viewDate, setViewDate] = useState(new Date());
  const [hasUserSelected, setHasUserSelected] = useState(false);

  const toggleDatePicker = () => {
    setPickerType((prev) => (prev === 'date' ? '' : 'date'));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setHasUserSelected(true);
    setPickerType('');
  };

  // 외부 클릭시 캘린더 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setPickerType('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderPickerByType = (type: PickerType) => {
    switch (type) {
      case 'date':
        return (
          <CalendarDate
            selectedDate={selectedDate}
            setSelectedDate={handleDateSelect}
            viewDate={viewDate}
            setViewDate={setViewDate}
            onChangePickerType={() => setPickerType('month')}
          />
        );
      case 'month':
        return (
          <Month
            setPickerType={() => setPickerType('date')}
            selectedDate={selectedDate}
            setSelectedDate={handleDateSelect}
            viewDate={viewDate}
            setViewDate={setViewDate}
          />
        );
      default:
        return null;
    }
  };

  const displayDate = isValid(selectedDate)
    ? format(selectedDate, `yyyy. MM. dd.`)
    : '날짜 선택 필요';

  return (
    <div className="relative w-[80px] text-xs" ref={ref}>
      <input
        type="text"
        value={displayDate}
        className={`focus-primary body1 w-full cursor-pointer rounded-[10px] text-center focus:border-transparent focus:ring-0 focus:outline-none ${hasUserSelected ? 'text-[var(--black)] dark:text-[var(--dark-gray-700)]' : 'text-[var(--gray-500)]'}`}
        readOnly
        onClick={toggleDatePicker}
      />
      {pickerType && (
        <DatePickerWrapper className={wrapperClassName}>
          {renderPickerByType(pickerType)}
        </DatePickerWrapper>
      )}
    </div>
  );
}

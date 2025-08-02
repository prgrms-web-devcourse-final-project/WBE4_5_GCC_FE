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
}: Omit<DatePickerProps, 'setPickerType'>) {
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setPickerType('');
      }
    }
    if (pickerType) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pickerType]);

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
    <div className="relative w-[100px] text-base" ref={ref}>
      <input
        type="text"
        value={displayDate}
        className={`focus-primary body1 w-full cursor-pointer rounded-[10px] text-center focus:border-transparent focus:ring-0 focus:outline-none ${hasUserSelected ? 'text-[#222222]' : 'text-[#c4c4c4]'
          }`}
        readOnly
        onClick={toggleDatePicker}
      />
      {pickerType && (
        <DatePickerWrapper>{renderPickerByType(pickerType)}</DatePickerWrapper>
      )}
    </div>
  );
}

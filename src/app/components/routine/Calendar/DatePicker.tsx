'use client';

import { useState, Dispatch, SetStateAction, useRef } from 'react';
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
  const ref = useRef(null);
  const [pickerType, setPickerType] = useState<PickerType>('');
  const [viewDate, setViewDate] = useState(new Date());
  const [hasUserSelected, setHasUserSelected] = useState(false);

  const toggleDatePicker = () => {
    setPickerType((prev) => (prev === 'date' ? '' : 'date'));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setHasUserSelected(true); // 직접 선택한 날짜
    setPickerType('');
  };

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
    <div className="relative w-[100px] text-xs" ref={ref}>
      <input
        type="text"
        value={displayDate}
        className={`focus-primary body1 w-full cursor-pointer rounded-[10px] px-2 py-1 text-center hover:shadow-sm focus:border-transparent focus:ring-0 focus:outline-none ${hasUserSelected ? 'text-[#222222]' : 'text-[#9E9E9E]'}`}
        readOnly
        onClick={toggleDatePicker}
      />
      {pickerType && (
        <DatePickerWrapper>{renderPickerByType(pickerType)}</DatePickerWrapper>
      )}
    </div>
  );
}

// 호출 시
// const [selectedDate, setSelectedDate] = useState(new Date());
//<DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

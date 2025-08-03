'use client';

import { useState } from 'react';
import Picker from 'react-mobile-picker';

export default function DayPicker({
  onChange,
}: {
  onChange?: (selectedDay: string) => void;
}) {
  const [value, setValue] = useState({
    days: '1',
  });

  const days = Array.from({ length: 99 }, (_, i) => (i + 1).toString());

  const handleChange = (val: { days: string }) => {
    setValue(val);
    onChange?.(val.days);
  };

  return (
    <div className="h-[230px] w-[190px] text-center">
      <Picker
        value={value}
        onChange={handleChange}
        wheelMode="normal"
        height={150}
        itemHeight={48}
      >
        <Picker.Column name="days">
          {days.map((day) => (
            <Picker.Item key={day} value={day}>
              <span
                className={`text-lg font-semibold transition-all duration-200 ${day === value.days ? 'dark:text-[var(--dark-gray-700)]' : 'text-[#BDBDBD] dark:text-[var(--dark-bg-tertiary)]'}`}
              >
                {day}
              </span>
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
    </div>
  );
}

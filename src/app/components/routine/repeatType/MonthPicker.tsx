'use client';

import { useState } from 'react';
import Picker from 'react-mobile-picker';

export default function MonthPicker({
  onChange,
}: {
  onChange?: (selectedWeek: string) => void;
}) {
  const [value, setValue] = useState({
    weeks: '1',
  });

  const weeks = [
    ...Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
    '말',
  ];

  const handleChange = (val: { weeks: string }) => {
    setValue(val);
    onChange?.(val.weeks);
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
        <Picker.Column name="weeks">
          {weeks.map((week) => (
            <Picker.Item key={week} value={week}>
              <span
                className={`text-lg font-semibold transition-all duration-200 ${week === value.weeks ? 'dark:text-[var(--dark-gray-700)]' : 'text-[#BDBDBD] dark:text-[var(--dark-bg-tertiary)]'
                  }`}
              >
                {week}
              </span>
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
    </div>
  );
}

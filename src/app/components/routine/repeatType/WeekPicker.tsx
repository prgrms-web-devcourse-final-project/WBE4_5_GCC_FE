'use client';

import { useState } from 'react';
import Picker from 'react-mobile-picker';

export default function WeekPicker({
  onChange,
}: {
  onChange?: (selectedWeek: string) => void;
}) {
  const [value, setValue] = useState({
    weeks: '1',
  });

  const weeks = ['1', '2', '3', '4', '5', '6', '7'];

  const handleChange = (val: { weeks: string }) => {
    setValue(val);
    onChange?.(val.weeks);
  };

  return (
    <div className="flex justify-center items-center h-[230px] w-full pb-20">
      <div className="w-[190px] text-center">
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
                  className={`inline-block w-full text-lg font-semibold transition-all duration-200 ${week === value.weeks ? 'text-black' : 'text-[#BDBDBD]'
                    }`}
                >
                  {week}
                </span>
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>
    </div>
  );
}

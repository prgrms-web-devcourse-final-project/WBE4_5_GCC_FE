import { useState } from 'react';
import Picker from 'react-mobile-picker';

// 반복주기 (주선택)
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
    '월 말',
  ];

  const handleChange = (val: { weeks: string }) => {
    setValue(val);
    onChange?.(val.weeks);
  };

  return (
    <>
      <div>
        <Picker value={value} onChange={handleChange} wheelMode="normal">
          <Picker.Column name="weeks">
            {weeks.map((week) => (
              <Picker.Item key={week} value={week}>
                <span
                  className={`transition-all duration-200 ${
                    week === value.weeks ? '' : 'text-[#9E9E9E]'
                  }`}
                >
                  {week}
                </span>
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>
    </>
  );
}

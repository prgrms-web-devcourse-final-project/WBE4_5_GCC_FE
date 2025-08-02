import { useState } from 'react';
import Picker from 'react-mobile-picker';

// 반복주기 (주선택)
export default function DayPicker({
  onChange,
}: {
  onChange?: (selectedWeek: string) => void;
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
    <>
      <div>
        <Picker value={value} onChange={handleChange} wheelMode="normal">
          <Picker.Column name="days">
            {days.map((day) => (
              <Picker.Item key={day} value={day}>
                <span
                  className={`transition-all duration-200 ${
                    day === value.days
                      ? 'dark:text-[var(--dark-gray-700)]'
                      : 'text-[#9e9e9e] dark:text-[var(--dark-bg-tertiary)]'
                  }`}
                >
                  {day}
                </span>
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>
    </>
  );
}

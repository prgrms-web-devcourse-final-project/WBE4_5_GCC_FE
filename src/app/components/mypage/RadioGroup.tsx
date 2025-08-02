import { Check } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
}

export default function RadioGroup({
  name,
  options,
  selected,
  onChange,
}: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-5">
      {options.map((option) => {
        const isChecked = selected === option.value;

        return (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected === option.value}
              onChange={() => onChange(option.value)}
              className="peer hidden"
            />

            {/* 라디오 버튼 */}
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border ${isChecked ? 'border-[var(--black)] bg-[var(--black)] dark:bg-[var(--dark-gray-200)]' : 'border-[var(--gray-400)]'}`}
            >
              {isChecked && (
                <Check
                  className="h-[14px] w-[14px] text-[#FDFDFD]"
                  strokeWidth={4}
                />
              )}
            </div>
            <span className="text-sm text-[var(--black)] dark:text-[var(--dark-gray-700)]">
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

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

export default function RadioGroup ({
  name,
  options,
  selected,
  onChange
} : RadioGroupProps) {

  return (
    <div className="flex flex-col gap-5">
      {options.map((option) => {
        const isChecked = selected === option.value;
        
        return (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
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
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center
              ${isChecked ? 'bg-[#222222] border-[#222222]' : 'border-[#C4C4C4]'}`}
            >
              {isChecked && (
                <Check className="w-[14px] h-[14px] text-[#FDFDFD]" strokeWidth={4}/>
              )}
            </div>
            <span className="text-sm text-[#222222]">{option.label}</span>
          </label>
        )
      })}
    </div>
  );
}
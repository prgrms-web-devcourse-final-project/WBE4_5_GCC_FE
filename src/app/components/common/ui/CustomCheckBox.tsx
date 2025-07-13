import { Check } from 'lucide-react';

interface CustomCheckBoxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export default function CustomCheckBox({
  checked,
  onChange,
  label,
}: CustomCheckBoxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />

      <div
        className={`flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border transition-colors ${checked ? 'border-[#222222] bg-[#222222]' : 'border-[#C4C4C4] bg-[#C4C4C4]'}`}
      >
        <Check
          className={`h-[14px] w-[14px] ${
            checked ? 'text-white' : 'text-[#FDFDFD]'
          }`}
          strokeWidth={4}
        />
      </div>

      {label && (
        <span className="text-xs font-medium text-[#222222]">{label}</span>
      )}
    </label>
  );
}

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
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />

      <div
        className={`w-[18px] h-[18px] flex items-center justify-center border rounded-[3px] transition-colors
          ${checked ? 'bg-[#222222] border-[#222222]' : 'bg-[#C4C4C4] border-[#C4C4C4]'}`}
      >
        <Check
          className={`w-[14px] h-[14px] ${
            checked ? 'text-white' : 'text-[#FDFDFD]'
          }`}
          strokeWidth={4}
        />
      </div>

      {label && <span className="text-xs text-[#222222] font-medium">{label}</span>}
    </label>
  );
}

import { ChevronRight } from "lucide-react";
import clsx from 'clsx';

interface SettingsItemProps {
  label: string;
  type: 'link' | 'toggle';
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
  onClick?: () => void;
}

export default function SettingsItem ({
  label,
  type,
  checked,
  onToggle,
  onClick,
} : SettingsItemProps) {
  return (
    <div
      className={clsx(
        'h-6 mb-[26px] flex items-center justify-between bg-white',
        type !== 'toggle' && 'cursor-pointer'
      )}
      onClick={type !== 'toggle' ? onClick : undefined}
    >
      <span
        className="text-sm font-semibold text-black"
      >
        {label}
      </span>

      {type === 'link' && (
        <ChevronRight className="w-auto h-4 text-[#222222]"/>
      )}


      {type === 'toggle' && (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={e => onToggle?.(e.target.checked)}
          />
          <div className="relative w-[38px] h-6 bg-[#E0E0E0] peer-focus:outline-none rounded-full peer-checked:after:translate-x-[14px] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFB84C] after:shadow-[0px_3px_8px_rgba(0,0,0,0.15)]"></div>
        </label>
      )}
    </div>
  );
}
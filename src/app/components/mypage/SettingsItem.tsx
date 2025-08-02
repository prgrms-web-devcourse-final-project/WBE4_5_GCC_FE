import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface SettingsItemProps {
  label: string;
  type: 'link' | 'toggle';
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
  onClick?: () => void;
}

export default function SettingsItem({
  label,
  type,
  checked,
  onToggle,
  onClick,
}: SettingsItemProps) {
  return (
    <div
      className={clsx(
        'mb-[26px] flex h-6 items-center justify-between bg-white dark:bg-[var(--dark-bg-primary)]',
        type !== 'toggle' && 'cursor-pointer',
      )}
      onClick={type !== 'toggle' ? onClick : undefined}
    >
      <span className="text-sm font-semibold text-black dark:text-[var(--dark-gray-700)]">
        {label}
      </span>

      {type === 'link' && (
        <ChevronRight
          className="w-auto text-[#222222] dark:text-[var(--dark-gray-700)]"
          strokeWidth={2}
        />
      )}

      {type === 'toggle' && (
        <label className="inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={checked}
            onChange={(e) => onToggle?.(e.target.checked)}
          />
          <div className="relative h-6 w-[38px] rounded-full bg-[#e0e0e0] peer-checked:bg-[#ffb84c] peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-[0px_3px_8px_rgba(0,0,0,0.15)] after:transition-all peer-checked:after:translate-x-[14px]"></div>
        </label>
      )}
    </div>
  );
}

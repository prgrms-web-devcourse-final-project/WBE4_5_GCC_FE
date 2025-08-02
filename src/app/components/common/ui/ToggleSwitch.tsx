'use client';

interface ToggleSwitchProps {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onToggle?: (checked: boolean) => void;
  className?: string;
}

export default function ToggleSwitch({
  icon,
  label,
  checked,
  onToggle,
  className,
}: ToggleSwitchProps) {
  return (
    <div
      className={`flex h-12 w-full items-center justify-between border border-[var(--gray-300)] bg-[var(--white)] px-4 py-4 dark:border-[var(--dark-bg-tertiary)] dark:bg-[var(--dark-bg-primary)] ${className ?? ''}`}
    >
      {/* 좌측 영역 */}
      <div className="flex items-center gap-2 text-xs font-medium text-[var(--black)] dark:text-[var(--dark-gray-700)]">
        <span>{icon}</span>
        <span>{label}</span>
      </div>

      {/* 우측 영역 */}
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onToggle?.(e.target.checked)}
        />
        <div className="relative h-6 w-[38px] rounded-full bg-[var(--gray-300)] peer-checked:bg-[var(--primary-yellow)] peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-[var(--white)] after:shadow-[0px_3px_8px_rgba(0,0,0,0.15)] after:transition-all peer-checked:after:translate-x-[14px] dark:bg-[var(--dark-bg-tertiary)]"></div>
      </label>
    </div>
  );
}

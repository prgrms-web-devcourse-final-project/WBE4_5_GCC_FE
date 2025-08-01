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
      className={`flex h-12 w-full items-center justify-between border border-[#E0E0E0] bg-white px-4 py-4 ${className ?? ''}`}
    >
      {/* 좌측 영역 */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#222222]">
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
        <div className="relative h-6 w-[38px] rounded-full bg-[#E0E0E0] peer-checked:bg-[#FFB84C] peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-[0px_3px_8px_rgba(0,0,0,0.15)] after:transition-all peer-checked:after:translate-x-[14px]"></div>
      </label>
    </div>
  );
}

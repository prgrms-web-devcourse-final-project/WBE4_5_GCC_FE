'use client'

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
      className={`flex h-16 w-full max-w-[614px] items-center justify-between rounded-b-lg border border-[#E0E0E0] px-5 py-4 ${className ?? ''
        }`}
    >
      {/* 좌측 영역 */}
      <div className="flex items-center gap-3 text-base font-semibold text-[#222222]">
        <span>{icon}</span>
        <span>{label}</span>
      </div>

      {/* 우측 영역 */}
      <label className="flex flex-1 justify-end">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onToggle?.(e.target.checked)}
        />
        <div className="relative h-6 w-[38px] rounded-full bg-[#E0E0E0] peer-checked:bg-[#FFB84C] peer-focus:outline-none after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-[0px_3px_8px_rgba(0,0,0,0.15)] after:transition-all peer-checked:after:translate-x-[14px] cursor-pointer" />
      </label>
    </div>
  );
}
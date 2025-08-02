'use client';

interface RoutineNameProps {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputRoutineName({
  icon,
  label,
  placeholder,
  value,
  onChange,
}: RoutineNameProps) {
  return (
    <div className="flex h-16 w-full max-w-[614px] items-center justify-between rounded-b-lg border border-[#E0E0E0] border-t-0 px-5 py-4 dark:border-[var(--dark-bg-tertiary)] dark:bg-[var(--dark-bg-primary)]">
      {/* 좌측 영역 */}
      <div className="flex items-center gap-3 text-base font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
        <span>{icon}</span>
        <span>{label}</span>
      </div>

      {/* 우측 영역 */}
      <div className="flex flex-1 justify-end">
        <input
          className={`text-right text-base outline-none dark:text-[var(--dark-gray-700)] ${value ? 'text-[#222222] dark:text-[var(--dark-gray-700)]' : 'text-[#9E9E9E'} overflow-hidden whitespace-nowrap`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: `${value.length === 0 ? placeholder.length : value.length}ch`,
            minWidth: '140px',
            maxWidth: '220px',
          }}
        />
      </div>

      <style jsx>{`
        input::placeholder {
          color: #c4c4c4;
        }
      `}</style>
    </div>
  );
}

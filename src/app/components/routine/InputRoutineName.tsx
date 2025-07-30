'use cleint';

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
    <div className="flex h-12 w-full items-center justify-between rounded-b-lg border border-[#E0E0E0] px-4 py-4">
      {/* 좌측 영역 */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#222222]">
        <span>{icon}</span>
        <span>{label}</span>
      </div>

      {/* 우측 영역 */}
      <div className="flex flex-1 justify-end">
        <input
          className={`text-right text-xs outline-none ${value ? 'text-[#222222]' : 'text-[#9E9E9E'} overflow-hidden whitespace-nowrap`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: `${value.length === 0 ? placeholder.length : value.length}ch`,
            minWidth: '120px',
            maxWidth: '200px',
          }}
        />
      </div>
    </div>
  );
}

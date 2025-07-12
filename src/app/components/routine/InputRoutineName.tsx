'use cleint'

interface RoutineNameProps {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputRoutineName ({
  icon,
  label,
  placeholder,
  value,
  onChange
} : RoutineNameProps) {

  return (
    <div className="w-full h-12 border border-[#E0E0E0] rounded-b-lg px-4 py-4 flex justify-between items-center">
      {/* 좌측 영역 */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#222222]">
        <span>{icon}</span>
        <span>{label}</span>
      </div>

      {/* 우측 영역 */}
      <div className="flex-1 flex justify-end">
        <input
          className={`text-xs text-right outline-none
            ${value ? 'text-[#222222]' : 'text-[#9E9E9E'}  
            overflow-hidden whitespace-nowrap
          `}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: `${value.length === 0 ? placeholder.length : value.length}ch`,
            minWidth: '85px',
            maxWidth: '230px'
          }}
        />
      </div>
    </div>
  );
}
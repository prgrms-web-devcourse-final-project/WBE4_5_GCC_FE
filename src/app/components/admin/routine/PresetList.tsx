import { X } from 'lucide-react';

interface Preset {
  presetId: number;
  categoryId: number;
  majorCategory: string;
  subCategory: string;
  name: string;
  triggerTime: string;
  isDone: boolean;
  isImportant: boolean;
}

interface AdminPresetProps {
  presets: Preset[];
  onClick: (preset: Preset) => void;
  isLoading: boolean;
  onDelete?: (presetId: number) => void;
}

export default function PresetList({
  presets,
  onClick,
  isLoading,
  onDelete,
}: AdminPresetProps) {
  if (isLoading) {
    return (
      <div className="mt-7 flex flex-col items-center justify-center gap-5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-11 w-full animate-pulse rounded-[8px] bg-gray-300"
          ></div>
        ))}
      </div>
    );
  }

  if (!presets || presets.length === 0) {
    return (
      <div className="mt-7 flex items-center justify-center text-gray-500">
        해당 카테고리에 루틴이 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-7 flex flex-col gap-[14px]">
      {presets.map((preset) => (
        <div
          key={preset.presetId}
          className="relative flex h-11 w-full cursor-pointer items-center justify-center rounded-[8px] border border-[#e0e0e0] text-[14px] font-medium"
          onClick={() => onClick(preset)}
        >
          {preset.name}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 부모 클릭 이벤트 방지
              onDelete?.(preset.presetId); // ✅ presetId 전달
            }}
            className="absolute top-2 right-2 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-gray-400 transition hover:bg-gray-500"
          >
            <X className="h-[14px] w-[14px] text-white dark:text-[var(--dark-bg-primary)]" />
          </button>
        </div>
      ))}
    </div>
  );
}

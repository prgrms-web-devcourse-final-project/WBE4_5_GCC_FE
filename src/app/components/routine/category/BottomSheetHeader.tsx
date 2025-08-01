import { PencilLine } from 'lucide-react';

interface BottomSheetHeaderProps {
  emoji?: string;
  title: string;
  onEdit: () => void;
}

export default function BottomSheetHeader({
  emoji,
  title,
  onEdit,
}: BottomSheetHeaderProps) {
  return (
    <div className="mb-[18px] flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-[18px]">{emoji || '🏷️'}</span>
        <h2 className="text-base font-semibold text-black">{title}</h2>
      </div>

      <button
        onClick={onEdit}
        className="flex cursor-pointer items-center gap-[7px] text-sm text-[#9E9E9E]"
      >
        <PencilLine className="size-3" />
        편집
      </button>
    </div>
  );
}

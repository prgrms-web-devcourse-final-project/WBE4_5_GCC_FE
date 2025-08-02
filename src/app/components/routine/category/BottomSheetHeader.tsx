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
    <div
      className="mb-6 flex items-center justify-between max-w-[614px] w-full"
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl flex-shrink-0">{emoji || '🏷️'}</span>
        <h2 className="text-lg font-semibold text-black truncate">{title}</h2>
      </div>

      <button
        onClick={onEdit}
        className="flex flex-shrink-0 cursor-pointer items-center gap-2 text-base text-[#9E9E9E]"
      >
        <PencilLine size={18} />
        편집
      </button>
    </div>
  );
}

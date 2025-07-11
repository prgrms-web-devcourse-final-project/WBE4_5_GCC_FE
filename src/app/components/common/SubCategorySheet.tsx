import { X } from 'lucide-react';
import { Plus } from 'lucide-react';
import { PencilLine } from 'lucide-react';

interface SubCategorySheetProps {
  categoryLabel: string;
  categoryIcon: React.ReactNode | string;
  onBack: () => void;
}

export default function SubCategorySheet({
  categoryLabel,
  categoryIcon,
  onBack,
}: SubCategorySheetProps) {
  return (
    <div className="fixed inset-0 bottom-0 z-50 flex items-center justify-center bg-[#222222]/50">
      <div className="min-h-[452px] w-full rounded-t-[24px] bg-white px-10 py-[34px]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[18px] font-semibold">
            <span className='className="w-[24px] rounded-full" flex h-[24px] items-center justify-center bg-[#F9F8FE]'>
              {categoryIcon}
            </span>
            {categoryLabel}
          </h2>
          <button onClick={onBack} className="text-[12px] text-[#9E9E9E]">
            <span className="flex items-center gap-[7px]">
              <PencilLine className="size-3" />
              편집
            </span>
          </button>
        </div>

        <div className="flex justify-center">
          <div className="mb-7 grid w-full grid-cols-3 gap-x-8 gap-y-3">
            <button className="flex cursor-pointer flex-col items-center gap-1 bg-white py-2.5 text-sm text-[#222222]">
              <div className="flex aspect-square w-[50px] items-center justify-center rounded-full bg-[#F9F8FE]">
                <X className="size-[22px]" />
              </div>
              <p className="mt-2 text-sm">선택 안 함</p>
            </button>

            <button className="flex cursor-pointer flex-col items-center gap-1 bg-white py-2.5 text-sm text-[#222222]">
              <div className="flex aspect-square w-[50px] items-center justify-center rounded-full bg-[#F9F8FE]">
                <Plus className="size-[22px]" />
              </div>
              <p className="mt-2 text-sm">직접 추가</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

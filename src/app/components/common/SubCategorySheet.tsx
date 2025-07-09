import { X } from 'lucide-react';
import { Plus } from 'lucide-react';
import { PencilLine } from 'lucide-react';

interface SubCategorySheetProps {
  categoryLabel: string;
  categoryIcon: React.ReactNode | string;
  onBack: () => void;
}

export default function SubCategorySheet ({categoryLabel, categoryIcon, onBack} : SubCategorySheetProps) {
  return (
    <div className="fixed bottom-0 inset-0 bg-[#222222]/50 flex justify-center items-center z-50">
      <div className="w-full min-h-[452px] rounded-t-[24px] bg-white px-10 py-[34px]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[18px] font-semibold flex items-center gap-2">
            <span className='className="w-[24px] h-[24px] flex items-center justify-center bg-[#F9F8FE] rounded-full"'>
              {categoryIcon}
            </span>
            {categoryLabel}
          </h2>
          <button 
            onClick={onBack} 
            className="text-[12px] text-[#9E9E9E]"
          >
            <span className="flex items-center gap-[7px]">
              <PencilLine className="size-3" />
              편집
            </span>
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-full grid grid-cols-3 gap-x-8 gap-y-3 mb-7">

            <button className="flex flex-col items-center py-2.5 gap-1 text-sm text-[#222222] bg-white cursor-pointer">
              <div className="w-[50px] aspect-square flex items-center justify-center bg-[#F9F8FE] rounded-full"><X className="size-[22px]"/></div>
              <p className="text-sm mt-2">선택 안 함</p>
            </button>

            <button className="flex flex-col items-center py-2.5 gap-1 text-sm text-[#222222] bg-white cursor-pointer">
              <div className="w-[50px] aspect-square flex items-center justify-center bg-[#F9F8FE] rounded-full"><Plus className="size-[22px]"/></div>
              <p className="text-sm mt-2">직접 추가</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
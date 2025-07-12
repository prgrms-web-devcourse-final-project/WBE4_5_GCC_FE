import clsx from 'clsx';
import { PencilLine } from 'lucide-react';

interface SubCategorySheetProps {
  categoryLabel: string;
  categoryIcon: React.ReactNode | string;
  onSelectSubCategory: (subLabel: string) => void;
  onBack: () => void;
  onCloseOutside?: () => void;
}

export default function SubCategoryGrid({
  categoryLabel,
  categoryIcon,
  onSelectSubCategory,
  onBack,
  onCloseOutside,
}: SubCategorySheetProps) {
  // dummy
  const subCategories = [
    '잠옷',
    '작업복',
  ]; 

  const handleSelect = (label: string) => {
    onSelectSubCategory(label); // 부모로 전달
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/50"
      onClick={onCloseOutside}
    >
      <div 
        className="min-h-[443px] w-full rounded-t-[24px] bg-white px-10 py-[34px]"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭시 닫히지 않도록 
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="w-auto h-[18px]">{categoryIcon}</span>
            <h2 className="text-base font-semibold text-black">{categoryLabel}</h2>
          </div>
          <button className="text-sm text-[#9E9E9E]">
            <span className="flex items-center gap-[7px]">
              <PencilLine className="size-3" />
              편집
            </span>
          </button>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <div className="min-w-[350px] border border-white border-y-[#E0E0E0]">
          {/* 서브 카테고리 목록 */}
          {subCategories.map((label, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(label)}
              className={clsx(
                'min-w-[350px] h-[54px] border-0 border-b border-[#E0E0E0] text-sm text-[#616161] font-semibold',
                idx === subCategories.length - 1 && 'border-b-0'
              )}
            >
              <div>
                <span>{label}</span>
              </div>
            </button>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

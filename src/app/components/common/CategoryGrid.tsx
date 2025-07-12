import { useState } from 'react';
import { PencilLine } from 'lucide-react';

interface Category {
  icon: React.ReactNode | string; // 아이콘 컴포넌트 or 이미지 URL
  label: string;
  onClick?: () => void;
}

interface CategoryGridProps {
  categories: Category[];
  editable?: boolean; // 편집 아이콘 보여줄지 여부
  onEditClick?: () => void;
  onSelectCategory: (label: string) => void;
  onCloseOutside?: () => void;
}

export default function CategoryGrid({
  categories,
  editable,
  onEditClick,
  onSelectCategory,
  onCloseOutside,
}: CategoryGridProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (label: string) => {
    setSelected(label);

    setTimeout(() => {
      onSelectCategory(label);
    }, 200);
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
            <span className="w-auto h-[18px]">🏷️</span>
            <h2 className="text-base font-semibold text-black">카테고리</h2>
          </div>
          {editable && (
            <button
              onClick={onEditClick}
              className="text-[12px] text-[#9E9E9E]"
            >
              <span className="flex items-center gap-[7px]">
                <PencilLine className="size-3" />
                편집
              </span>
            </button>
          )}
        </div>

        <div className="flex justify-center">
          <div className="mb-7 grid w-full grid-cols-3 gap-x-8 gap-y-3">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(cat.label)}
                className="relative flex cursor-pointer flex-col items-center gap-1 py-2.5 text-sm text-[#222222]"
              >
                {selected === cat.label && (
                  <div className="pointer-events-none absolute inset-0 z-10 rounded-[5px] bg-[#222222]/20" />
                )}
                <div className="flex aspect-square w-[50px] items-center justify-center rounded-full bg-[#F9F8FE]">
                  {cat.icon}
                </div>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

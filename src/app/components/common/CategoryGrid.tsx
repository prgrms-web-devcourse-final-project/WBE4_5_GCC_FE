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
}


export default function CategoryGrid ({ categories, editable, onEditClick, onSelectCategory }: CategoryGridProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setSelected(label);

    setTimeout(() => {
      onSelectCategory(label);
    }, 200);
  }

  return (
    <div className="fixed bottom-0 inset-0 bg-[#222222]/50 flex justify-center items-center z-50">
      <div className="w-full min-h-[452px] rounded-t-[24px] px-10 py-[34px] bg-white">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[20px] text-[#222222] font-semibold">카테고리</h2>
          {editable && (
            <button 
              onClick={onEditClick} 
              className="text-[12px] text-[#9E9E9E]"
            >
              <span className="flex items-center gap-[7px]">
                <PencilLine className="size-3"/>
                편집
              </span>
            </button>
          )}
        </div>
        
        <div className="flex justify-center">
          <div className="w-full grid grid-cols-3 gap-x-8 gap-y-3 mb-7">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleClick(cat.label)}
                className="relative flex flex-col items-center py-2.5 gap-1 text-sm text-[#222222] cursor-pointer"
              >
                {selected === cat.label && (
                  <div className="absolute inset-0 bg-[#222222]/20 rounded-[5px] z-10 pointer-events-none" />
                )}
                <div className="w-[50px] aspect-square flex items-center justify-center bg-[#F9F8FE] rounded-full">{cat.icon}</div>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
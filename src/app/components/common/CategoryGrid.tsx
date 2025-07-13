import { useState } from 'react';
import { CircleX } from 'lucide-react';
import { Category } from '../../../../types/types';
import { useEditMode } from '../routine/EditModeContext';
import AlertModal from '@/app/components/common/alert/AlertModal';

interface CategoryGridProps {
  categories: Category[];
  selected: string | null;
  onSelectCategory: (label: string) => void;
  isCustom?: boolean;
}

export default function CategoryGrid({
  categories,
  selected,
  onSelectCategory,
  isCustom = false,
}: CategoryGridProps) {
  const { isEditMode } = useEditMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="grid w-full grid-cols-3 gap-x-8 gap-y-3">
      {categories.map((cat, idx) => (
        <div key={idx} className="relative w-full flex justify-center">
          <button
            key={idx}
            onClick={() => onSelectCategory?.(cat.label)}
            className="relative flex flex-col items-center gap-1 py-2.5 text-sm text-[#222222]"
          >
            {selected === cat.label && (
              <div className="absolute inset-0 z-10 rounded-[5px] bg-[#222222]/20 pointer-events-none" />
            )}
            <div className="flex aspect-square w-[50px] items-center justify-center rounded-full bg-[#F9F8FE]">
              {cat.icon}
            </div>
            <span>{cat.label}</span>
          </button>

          {/* 커스텀 카테고리 삭제 */}
          {isEditMode && isCustom && (
            <button
              className="absolute top-1.5 right-4 p-1 z-20"
              onClick={() => setIsModalOpen(true)}
            >
              <CircleX className="w-[15px] h-auto fill-[#E0E0E0] text-[#616161]" />
            </button>
          )}
        </div>
      ))}
      
      {isModalOpen && (
        <AlertModal
          isOpen={true}
          type="delete"
          title="정말 삭제하시겠습니까?"
          description="삭제 후 복구가 불가능합니다."
          confirmText="삭제"
          cancelText="취소"
          onConfirm={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

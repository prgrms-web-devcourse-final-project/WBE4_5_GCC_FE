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
  isManage?: boolean;
}

export default function CategoryGrid({
  categories,
  selected,
  onSelectCategory,
  isCustom = false,
  isManage = false,
}: CategoryGridProps) {
  const { isEditMode } = useEditMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [flash, setFlash] = useState(false);

  const handleClick = (label: string) => {
    onSelectCategory?.(label);
    setFlash(true);
    setTimeout(() => setFlash(false), 150);
  };

  return (
    <div className="grid w-full grid-cols-3 gap-x-8 gap-y-3">
      {categories.map((cat, idx) => {
        const isSelected = selected === cat.label;

        console.log(
          'selected:',
          selected,
          'cat.label:',
          cat.label,
          'match:',
          selected === cat.label,
        );
        return (
          <div key={idx} className="relative flex w-full justify-center">
            <button
              onClick={() => onSelectCategory?.(cat.label)}
              className={`relative flex w-full flex-col items-center gap-1 py-2.5 text-sm text-[var(--black)] dark:text-[var(--dark-gray-700)] ${
                isSelected ? 'bg-gray-200' : 'bg-transparent'
              } rounded-[5px] transition`}
            >
              {isSelected && (
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[5px] bg-[var(--black)] dark:bg-[var(--dark-gray-200)]/20" />
              )}
              <div className="flex aspect-square w-[50px] items-center justify-center rounded-full bg-[var(--gray-100)]">
                {cat.icon}
              </div>
              <span>{cat.label}</span>
            </button>

            {/* 커스텀 카테고리 삭제 */}
            {isEditMode && isCustom && (
              <button
                className="absolute top-1.5 right-4 z-20 p-1"
                onClick={() => setIsModalOpen(true)}
              >
                <CircleX className="h-auto w-[15px] fill-[var(--gray-300)] text-[var(--gray-700)]" />
              </button>
            )}

            {/* 관리자 카테고리 삭제 */}
            {isEditMode && isManage && (
              <button
                className="absolute top-1.5 right-4 z-20 p-1"
                onClick={() => setIsModalOpen(true)}
              >
                <CircleX className="h-auto w-[15px] fill-[var(--gray-300)] text-[var(--gray-700)]" />
              </button>
            )}
          </div>
        );
      })}

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

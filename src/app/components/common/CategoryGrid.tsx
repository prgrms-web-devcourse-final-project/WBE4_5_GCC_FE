import { useState } from 'react';
import { CircleX } from 'lucide-react';
import { CategoryItem } from '../../../../types/types';
import { useEditMode } from '../routine/EditModeContext';
import AlertModal from '@/app/components/common/alert/AlertModal';
import { DeleteAdminCategoryById } from '@/api/admin/adminCategories';

interface CategoryGridProps {
  categories: CategoryItem[];
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
  const [targetCategory, setTargetCategory] = useState<CategoryItem | null>(
    null,
  );

  const [flash, setFlash] = useState(false);

  const handleClick = (label: string) => {
    onSelectCategory?.(label);
    setFlash(true);
    setTimeout(() => setFlash(false), 150);
  };

  const handleDelete = async () => {
    if (!targetCategory) return;

    try {
      await DeleteAdminCategoryById(targetCategory.categoryId);
      console.log('카테고리 삭제 성공');
      // 삭제 후 리스트 리프레시 -> 상위 컴포넌트로 콜백 전달
    } catch (error) {
      console.error('카테고리 삭제 실패:', error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="grid w-full grid-cols-3 place-items-center gap-x-8 gap-y-3">
      {categories.map((cat, idx) => {
        const isSelected = selected === cat.categoryName;
        //console.log(
        //  'selected:',
        //  selected,
        //  'cat.label:',
        //  cat.label,
        //  'match:',
        //  selected === cat.label,
        //);
        return (
          <div key={idx} className="flex w-full justify-center">
            <button
              onClick={() => onSelectCategory?.(cat.categoryName)}
              className={`relative flex w-full max-w-[92px] flex-col items-center gap-1 py-2.5 text-sm text-[#222222] ${
                isSelected ? 'bg-gray-200' : 'bg-transparent'
              } rounded-[5px] transition`}
            >
              {/* 커스텀 카테고리 삭제 */}
              {isEditMode && (isCustom || isManage) && (
                <div className="absolute top-1 right-4 z-20 p-1">
                  <CircleX
                    className="h-auto w-[15px] fill-[#E0E0E0] text-[#616161]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTargetCategory(cat);
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              )}

              {isSelected && (
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[5px] bg-[#222222]/20" />
              )}
              <div className="flex aspect-square w-[50px] items-center justify-center rounded-full bg-[#F9F8FE]">
                {cat.emoji}
              </div>
              <span>{cat.categoryName}</span>
            </button>
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
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

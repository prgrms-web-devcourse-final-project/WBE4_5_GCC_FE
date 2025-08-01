import { useState } from 'react';
import { CircleX } from 'lucide-react';
import AlertModal from '@/app/components/common/alert/AlertModal';

import '../../../styles/recommended-routine.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteAdminCategoryById } from '@/api/admin/adminCategories';
import { DeleteCategoryById } from '@/api/categories';
import { useEditMode } from '../EditModeContext';
import { CategoryItem } from '../../../../../types/general';

interface CategoryGridProps {
  categories: CategoryItem[];
  selected: string | number | null;
  onSelectCategory: (id: number) => void;
  isCustom?: boolean;
  isManage?: boolean; // 관리자 페이지 여부
  maxHeight?: string;
}

export default function CategoryGrid({
  categories,
  selected,
  onSelectCategory,
  isCustom = false,
  isManage = false,
  maxHeight,
}: CategoryGridProps) {
  console.log('categoreis:', categories);
  const { isEditMode } = useEditMode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetCategory, setTargetCategory] = useState<CategoryItem | null>(
    null,
  );
  const queryClient = useQueryClient();

  // 유저 카테고리 삭제
  //const { mutate: deleteCategory } = useMutation({
  //  mutationFn: (id: number) => DeleteCategoryById(id),
  //  onSuccess: async () => {
  //    // 캐시를 무효화하여 stale 상태로 만들고 → 강제로 다시 fetch
  //    await queryClient.invalidateQueries({ queryKey: ['user-categories'] });
  //    await queryClient.refetchQueries({ queryKey: ['user-categories'] });
  //  },
  //  onError: (error) => {
  //    console.error('유저 카테고리 삭제 실패:', error);
  //    alert('유저 카테고리 삭제 중 오류 발생');
  //  },
  //});

  //// 관리자 카테고리 삭제
  //const { mutate: deleteAdminCategory } = useMutation({
  //  mutationFn: (id: number) => DeleteAdminCategoryById(id),
  //  onSuccess: async () => {
  //    // 캐시를 무효화하여 stale 상태로 만들고 → 강제로 다시 fetch
  //    await queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
  //    await queryClient.refetchQueries({ queryKey: ['admin-categories'] });
  //  },
  //  onError: (error) => {
  //    console.error('관리자 카테고리 삭제 실패:', error);
  //    alert('관리자 카테고리 삭제 중 오류 발생');
  //  },
  //});

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return isManage ? DeleteAdminCategoryById(id) : DeleteCategoryById(id);
    },
    onSuccess: async () => {
      const key = isManage ? 'admin-categories' : 'user-categories';
      await queryClient.invalidateQueries({ queryKey: [key] });
      await queryClient.refetchQueries({ queryKey: [key] });
      console.error(`${isManage ? '관리자' : '유저'} 카테고리 삭제 성공`);
    },
    onError: (error) => {
      console.error(
        `${isManage ? '관리자' : '유저'} 카테고리 삭제 실패:`,
        error,
      );
      alert(`${isManage ? '관리자' : '유저'} 카테고리 삭제 중 오류 발생`);
    },
  });

  //const handleDelete = () => {
  //  if (!targetCategory) return;
  //  deleteCategory(targetCategory.categoryId);
  //  setIsModalOpen(false);
  //};

  const handleDelete = () => {
    if (!targetCategory) return;
    deleteMutation.mutate(targetCategory.categoryId);
    setIsModalOpen(false);
  };

  return (
    <div
      style={{ maxHeight: maxHeight ?? 'h-full' }}
      className="routine-scroll grid w-full grid-cols-3 place-items-center gap-x-8 gap-y-3 overflow-y-auto"
    >
      {categories.map((cat, idx) => {
        const isSelected = selected === cat.categoryId;

        return (
          <div key={idx} className="flex w-full justify-center">
            <button
              onClick={() => onSelectCategory?.(cat.categoryId)}
              className={`relative flex w-full max-w-[92px] flex-col items-center gap-1 py-2.5 text-sm text-[#222222] ${
                isSelected ? 'bg-gray-200' : 'bg-transparent'
              } rounded-[5px] transition`}
            >
              {/* 카테고리 삭제 */}
              {/*{isEditMode && cat.categoryType === 'MAJOR' && (
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
              )}*/}
              {/* 편집 모드일 때만 삭제 가능 */}
              {isEditMode && (isManage || cat.categoryType === 'MAJOR') && (
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

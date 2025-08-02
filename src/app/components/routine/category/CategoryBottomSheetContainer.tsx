import { PencilLine } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getCategories } from '@/api/categories';
import { CategoryItem } from '../../../../../types/general';

import SubCategoryGrid from '../../common/SubCategoryGrid';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../common/ui/LoadingSpinner';
import CategoryGrid from './CategoryGrid';
import BottomSheetHeader from './BottomSheetHeader';

interface Props {
  onClose: () => void;
  onSelectCategory: (value: SelectedCategory) => void;
}

interface SelectedCategory extends CategoryItem {
  subCategoryName?: string;
}

export default function CategoryBottomSheetContainer({
  onClose,
  onSelectCategory,
}: Props) {
  const router = useRouter();
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<CategoryItem>();

  const handleEditClick = () => {
    router.push('/routine/edit-category');
  };

  const handleSubCategorySelect = (sub: string) => {
    if (selectedMainCategory) {
      onSelectCategory({
        ...selectedMainCategory,
        subCategoryName: sub,
      });
      onClose();
    }
  };

  const { data = [], isLoading } = useQuery<CategoryItem[]>({
    queryKey: ['user-categories'],
    queryFn: getCategories,
  });

  const allCategories = data.filter(
    (cat) => cat.categoryType === 'DEFAULT' || 'MAJOR',
  );

  if (isLoading) {
    return (
      <div className="h-1vh flex w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleOutsideClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222] dark:bg-[var(--dark-bg-primary)]/30"
      onClick={handleOutsideClick}
    >
      <div
        className="min-h-[490px] w-full rounded-t-[24px] bg-white px-4 pt-8 pb-16 dark:bg-[var(--dark-bg-secondary)]"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        <BottomSheetHeader
          emoji={selectedMainCategory?.emoji}
          title={selectedMainCategory?.categoryName || '카테고리 선택'}
          onEdit={handleEditClick}
        />

        <CategoryGrid
          categories={allCategories}
          maxHeight="412px"
          selected={selectedMainCategory?.categoryName || null}
          onSelectCategory={(id) => {
            const major = allCategories.find((cat) => cat.categoryId === id);
            if (major) {
              setSelectedMainCategory(major);
              setShowSubCategory(true);
            }
          }}
        />

        {showSubCategory &&
          selectedMainCategory &&
          selectedMainCategory.children !== undefined && (
            <div
              className="animate-slide-in fixed inset-0 z-50 flex justify-center bg-transparent"
              onClick={handleOutsideClick}
            >
              <div
                className="fixed bottom-0 w-full rounded-t-[24px] bg-white px-4 pt-8 dark:bg-[var(--dark-bg-primary)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-[18px] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[18px]">
                      {selectedMainCategory?.emoji}
                    </span>
                    <h2 className="text-base font-semibold text-black dark:text-[var(--dark-gray-700)]">
                      {selectedMainCategory?.categoryName}
                    </h2>
                  </div>
                  <button
                    onClick={handleEditClick}
                    className="flex cursor-pointer items-center gap-[7px] text-sm text-[#9e9e9e]"
                  >
                    <PencilLine className="size-3" />
                    편집
                  </button>
                </div>

                <SubCategoryGrid
                  subCategories={
                    selectedMainCategory.children?.map(
                      (cat) => cat.categoryName,
                    ) ?? []
                  }
                  onSelect={handleSubCategorySelect}
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

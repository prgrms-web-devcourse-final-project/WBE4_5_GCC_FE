import { PencilLine } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCategories } from '@/api/categories';
import { CategoryItem } from '../../../../../types/general';

import SubCategoryGrid from '../../common/SubCategoryGrid';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../common/ui/LoadingSpinner';
import CategoryGrid from './CategoryGrid';
import BottomSheetHeader from './BottomSheetHeader';

interface Props {
  onClose: () => void;
  onSelectCategory: (value: CategoryItem) => void;
}

export default function CategoryBottomSheetContainer({
  onClose,
  onSelectCategory,
}: Props) {
  const rotuer = useRouter();
  // 전체 카테고리 데이터 (major + sub)
  const [allCategoryData, setAllCategoryData] = useState<CategoryItem[]>([]);
  // 현재 선택된 대분류 카테고리
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<CategoryItem>();
  // 소분류 카테고리 창 열기
  const [showSubCategory, setShowSubCategory] = useState(false);

  const handleEditClick = () => {
    rotuer.push('/routine/edit-category');
  };

  const handleSubCategorySelect = (sub: string) => {
    if (selectedMainCategory) {
      const selectedMajor = allCategoryData.find(
        (cat) =>
          cat.categoryType === 'MAJOR' &&
          cat.categoryName === selectedMainCategory.categoryName,
      );

      if (selectedMajor) {
        onSelectCategory({
          ...selectedMajor, // MAJOR 카테고리 전달
          subCategoryName: sub, // SUB 카테고리도 전달
        });
        onClose();
      } else {
        console.warn(
          '해당 MAJOR 카테고리를 찾을 수 없습니다:',
          selectedMainCategory,
        );
      }
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['user-categories'],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });

  // 데이터 세팅
  useEffect(() => {
    if (data) setAllCategoryData(data);
    console.log(data);
  }, [data]);

  const categories = allCategoryData.filter(
    (cat) => cat.categoryType === 'MAJOR',
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
    // 창 닫기
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/50"
      onClick={handleOutsideClick}
    >
      <div
        className="min-h-[443px] w-full rounded-t-[24px] bg-white px-4 py-8"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        {/* 헤더 */}
        <BottomSheetHeader
          emoji={selectedMainCategory?.emoji}
          title={selectedMainCategory?.categoryName || '카테고리 선택'}
          onEdit={handleEditClick}
        />

        {/* MAJOR 카테고리 선택 바텀시트 */}
        <CategoryGrid
          categories={categories}
          selected={selectedMainCategory?.categoryName || null}
          onSelectCategory={(label) => {
            const major = categories.find((cat) => cat.categoryName === label);
            if (major) {
              setSelectedMainCategory(major);
              setShowSubCategory(true);
            }
          }}
        />

        {/* SUB 카테고리 선택 바텀시트 */}
        {showSubCategory && (
          <div
            className="animate-slide-in fixed inset-0 z-50 flex justify-center bg-transparent"
            onClick={handleOutsideClick}
          >
            <div
              className="fixed bottom-0 min-h-[443px] w-full rounded-t-[24px] bg-white px-4 py-8"
              onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
            >
              <div className="mb-[18px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[18px]">
                    {selectedMainCategory?.emoji}
                  </span>
                  <h2 className="text-base font-semibold text-black">
                    {selectedMainCategory?.categoryName}
                  </h2>
                </div>
                <button
                  onClick={handleEditClick}
                  className="flex cursor-pointer items-center gap-[7px] text-sm text-[#9E9E9E]"
                >
                  <PencilLine className="size-3" />
                  편집
                </button>
              </div>

              <SubCategoryGrid
                subCategories={allCategoryData
                  .filter(
                    (cat) =>
                      cat.categoryType === 'SUB' &&
                      cat.parentId === selectedMainCategory?.categoryId,
                  )
                  .map((cat) => cat.categoryName)}
                onSelect={handleSubCategorySelect}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

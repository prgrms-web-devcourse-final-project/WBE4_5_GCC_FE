'use client';

import { useState } from 'react';
import { PencilLine } from 'lucide-react';
import CategoryGrid from './CategoryGrid';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import SubCategoryGrid from './SubCategoryGrid';
import { Category } from '../../../../types/types';

interface Props {
  onClose: () => void;
  onSelectCategory: (value: React.ReactNode) => void;
}

const categories: Category[] = [
  { icon: <span>🧹</span>, label: '청소 / 정리' },
  { icon: <span>🧺</span>, label: '세탁 / 의류' },
  { icon: <span>♻️</span>, label: '쓰레기 / 환경' },
  { icon: <span>🍳</span>, label: '요리' },
  { icon: <span>💸</span>, label: '소비' },
  { icon: <span>📄</span>, label: '행정' },
  { icon: <span>🏃🏻</span>, label: '운동' },
];

const subCategoryMap: Record<string, string[]> = {
  '청소 / 정리': ['욕실', '주방', '거실', '창고'],
  '세탁 / 의류': ['빨래', '옷장 정리', '스타일링'],
  '쓰레기 / 환경': ['분리수거', '음식물', '재활용'],
  요리: ['아침 준비', '도시락', '저녁 요리'],
  소비: ['지출 점검', '영수증 정리', '예산 설정'],
  행정: ['서류 작성', '정부서비스 신청', '주소 변경'],
  운동: ['스트레칭', '러닝', '홈트레이닝'],
};

export default function CategoryBottomSheetContainer({
  onClose,
  onSelectCategory,
}: Props) {
  const rotuer = useRouter();
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    string | null
  >(null);

  const handleEditClick = () => {
    rotuer.push('/routine/edit-category');
  };

  const handleSubCategorySelect = (sub: string) => {
    if (selectedMainCategory) {
      const selectedCategoryObj = categories.find(
        (cat) => cat.label === selectedMainCategory,
      );
      const categoryIcon = selectedCategoryObj?.icon;
      // onSelectCategory로 전달
      if (categoryIcon) {
        onSelectCategory(
          // ReactNode 반환
          <span className="inline-flex items-center gap-[6px] text-xs font-medium text-[#222222] dark:text-[var(--dark-gray-700)]">
            <span className="text-xs">{categoryIcon}</span>
            <span>{selectedMainCategory}</span>
            <ChevronRight className="h-auto w-[11px]" />
            <span>{sub}</span>
          </span>,
        );
      }
      onClose();
    }
  };

  const handleOutsideClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222] dark:bg-[var(--dark-gray-200)]/50"
      onClick={handleOutsideClick}
    >
      <div
        className="min-h-[443px] w-full rounded-t-[24px] bg-white px-4 py-8 dark:bg-[var(--dark-bg-primary)]"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        {/* 헤더 */}
        <div className="mb-[18px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-[18px]pt-[2px]">
              {selectedMainCategory ? (
                categories.find((cat) => cat.label === selectedMainCategory)
                  ?.icon
              ) : (
                <span>🏷️</span>
              )}
            </span>
            <h2 className="text-base font-semibold text-black">
              {selectedMainCategory ? selectedMainCategory : '카테고리 선택'}
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

        {/* CategoryGrid 기본 화면 */}
        <CategoryGrid
          categories={categories}
          selected={selectedMainCategory}
          onSelectCategory={(label) => {
            setSelectedMainCategory(label);
            setShowSubCategory(true);
          }}
        />

        {/* SubCategory 오버레이 화면 */}
        {showSubCategory && (
          <div
            className="animate-slide-in fixed inset-0 z-50 flex items-end justify-center bg-transparent"
            onClick={handleOutsideClick}
          >
            <div
              className="min-h-[443px] w-full rounded-t-[24px] bg-white px-4 py-8 dark:bg-[var(--dark-bg-primary)]"
              onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
            >
              <div className="mb-[18px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[18px]">
                    {
                      categories.find(
                        (cat) => cat.label === selectedMainCategory,
                      )?.icon
                    }
                  </span>
                  <h2 className="text-base font-semibold text-black">
                    {selectedMainCategory}
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
                subCategories={subCategoryMap[selectedMainCategory!] || []}
                onSelect={handleSubCategorySelect}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

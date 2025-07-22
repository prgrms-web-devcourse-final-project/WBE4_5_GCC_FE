'use client';

import { useEffect, useState } from 'react';
import { PencilLine } from 'lucide-react';
import CategoryGrid from './CategoryGrid';
import { useRouter } from 'next/navigation';
import SubCategoryGrid from './SubCategoryGrid';
import { Categories } from '@/api/categories';
import { CategoryItem } from '../../../../types/types';

interface Props {
  onClose: () => void;
  onSelectCategory: (value: CategoryItem) => void;
}

export default function CategoryBottomSheetContainer({
  onClose,
  onSelectCategory,
}: Props) {
  const rotuer = useRouter();
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<CategoryItem>();
  const [loading, setLoading] = useState(false); // 나중엔 true로 바꿔야함
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [allCategoryData, setAllCategoryData] = useState<CategoryItem[]>([]);

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

  const handleOutsideClick = () => {
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await Categories();
        const data = res.data;

        setAllCategoryData(data);

        const majors = data.filter(
          (cat: CategoryItem) => cat.categoryType === 'MAJOR',
        );
        setCategories(majors);

        const subMap: Record<string, string[]> = {};
        data.forEach((cat: CategoryItem) => {
          if (cat.categoryType === 'SUB' && cat.parentName) {
            if (!subMap[cat.parentName]) subMap[cat.parentName] = [];
            subMap[cat.parentName].push(cat.categoryName);
          }
        });
        console.log('메인 카테고리:', majors);
      } catch (error) {
        console.error('카테고리 정보 불러오기 실패', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/50"
      onClick={handleOutsideClick}
    >
      <div
        className="min-h-[443px] w-full rounded-t-[24px] bg-white px-4 py-8"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        {/* 헤더 */}
        <div className="mb-[18px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-[18px]pt-[2px]">
              {selectedMainCategory ? (
                selectedMainCategory.emoji
              ) : (
                <span>🏷️</span>
              )}
            </span>
            <h2 className="text-base font-semibold text-black">
              {selectedMainCategory?.categoryName || '카테고리 선택'}
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

        {/* MAJOR 카테고리 */}
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

        {/* SUB 카테고리 (오버레이 화면) */}
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

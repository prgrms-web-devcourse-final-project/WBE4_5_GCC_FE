'use client';

import { useEffect, useState } from 'react';
import { PencilLine } from 'lucide-react';
import CategoryGrid from './CategoryGrid';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import SubCategoryGrid from './SubCategoryGrid';
import { Category } from '../../../../types/types';
import { Categories } from '@/api/categories';

interface Props {
  onClose: () => void;
  onSelectCategory: (value: React.ReactNode) => void;
}

interface CategoryItem {
  categoryId: number;
  categoryName: string;
  categoryType: 'MAJOR' | 'SUB';
  parentName: string | null;
}

const categoryIconMap: Record<string, React.ReactNode> = {
  청소: <span>🧹</span>,
  세탁: <span>🧺</span>,
  쓰레기: <span>♻️</span>,
  요리: <span>🍳</span>,
  소비: <span>💸</span>,
  행정: <span>📄</span>,
  건강: <span>🏃🏻</span>,
  자기개발: <span>💡</span>,
  외출: <span>👜</span>,
};

//const subCategoryMap: Record<string, string[]> = {
//  '청소 / 정리': ['욕실', '주방', '거실', '창고'],
//  '세탁 / 의류': ['빨래', '옷장 정리', '스타일링'],
//  '쓰레기 / 환경': ['분리수거', '음식물', '재활용'],
//  요리: ['아침 준비', '도시락', '저녁 요리'],
//  소비: ['지출 점검', '영수증 정리', '예산 설정'],
//  행정: ['서류 작성', '정부서비스 신청', '주소 변경'],
//  운동: ['스트레칭', '러닝', '홈트레이닝'],
//};

export default function CategoryBottomSheetContainer({
  onClose,
  onSelectCategory,
}: Props) {
  const rotuer = useRouter();
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    string | null
  >(null);

  const [loading, setLoading] = useState(false); // 나중엔 true로 바꿔야함
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [subCategoryMap, setSubCategoryMap] = useState<
    Record<string, string[]>
  >({});

  const handleEditClick = () => {
    rotuer.push('/routine/edit-category');
  };

  const handleSubCategorySelect = (sub: string) => {
    if (selectedMainCategory) {
      const icon = categoryIconMap[selectedMainCategory];
      if (icon) {
        onSelectCategory(
          // ReactNode 반환
          <span className="inline-flex items-center gap-[6px] text-xs font-medium text-[#222222]">
            <span className="text-xs">{icon}</span>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await Categories();
        const data = res.data;

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
        setSubCategoryMap(subMap);
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
                categoryIconMap[selectedMainCategory]
              ) : (
                <span>🏷️</span>
              )}
            </span>
            <h2 className="text-base font-semibold text-black">
              {selectedMainCategory || '카테고리 선택'}
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

        {/* Main 카테고리 */}
        <CategoryGrid
          categories={categories.map((cat) => ({
            icon: categoryIconMap[cat.categoryName] || <span>❓︎</span>,
            label: cat.categoryName,
          }))}
          selected={selectedMainCategory}
          onSelectCategory={(label) => {
            setSelectedMainCategory(label);
            setShowSubCategory(true);
          }}
        />

        {/* Sub 카테고리 (오버레이 화면) */}
        {showSubCategory && (
          <div
            className="animate-slide-in ihttps://roadmap.sh/frontendtems-end fixed inset-0 z-50 flex justify-center bg-transparent"
            onClick={handleOutsideClick}
          >
            <div
              className="min-h-[443px] w-full rounded-t-[24px] bg-white px-4 py-8"
              onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
            >
              <div className="mb-[18px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[18px]">
                    {categoryIconMap[selectedMainCategory!]}
                  </span>
                  <h2 className="text-base font-semibold text-black">
                    {selectedMainCategory}
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

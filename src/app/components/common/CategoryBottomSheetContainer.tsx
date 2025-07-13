'use client';

import { useState } from 'react';
import CategoryGrid from './CategoryGrid';
import { PencilLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SubCategoryGrid from './SubCategoryGrid';
import { Category } from '../../../../types/types';

interface Props {
  onClose: () => void;
  onSelectCategory: (value: string) => void;
}

const categories = [
  { icon: <span>🧹</span>, label: '청소 / 정리' },
  { icon: <span>🧺</span>, label: '세탁 / 의류' },
  { icon: <span>♻️</span>, label: '쓰레기 / 환경' },
  { icon: <span>🍳</span>, label: '요리' },
  { icon: <span>💸</span>, label: '소비' },
  { icon: <span>📄</span>, label: '행정' },
  { icon: <span>🏃🏻</span>, label: '건강' },
  { icon: <span>💡</span>, label: '자기개발' },
  { icon: <span>👜</span>, label: '외출' },
];

// dummy
const subCategories = [
  '빨래 널기',
  '빨래 개기',
  '세탁기 돌리기',
]; 

export default function CategoryBottomSheetContainer({onClose, onSelectCategory} : Props) {
  const rotuer = useRouter();

  const [selected, setSelected] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    icon: React.ReactNode | string;
    label: string;
  } | null>(null);

  const handleEditClick = () => {
    rotuer.push("/routine/edit-category");
  }

  const handleOutsideClick = () => {
    onClose();
  };

  const handleSelect = (label: string) => {
    setSelected(label);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/50"
      onClick={handleOutsideClick}
    >
      <div
        className="min-h-[443px] w-full px-4 rounded-t-[24px] bg-white"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        <div className="px-6 pt-7 mb-5 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="w-auto h-[18px]">
              {selectedCategory ? selectedCategory.icon : '🏷️'}
            </span>
            <h2 className="text-base font-semibold text-black">
              {selectedCategory ? selectedCategory.label : '카테고리'}
            </h2>
          </div>

          <button
            onClick={handleEditClick}
            className="text-sm text-[#9E9E9E] cursor-pointer flex items-center gap-[7px]"
          >
            <PencilLine className="size-3" />
            편집
          </button>
        </div>

        {!selectedCategory ? (
          <CategoryGrid
            categories={categories}
            selected={selectedCategory} // selectedCategory?.label ?? null -> 대분류 카테고리 선택 시 null 값이어서 까만 박스 안 보임 이슈
            onSelectCategory={(label) => {
              const category = categories.find((cat) => cat.label === label);
              if (category) {
                setSelectedCategory(category);
              }
            }}
          />
          ) : (
            <SubCategoryGrid
            subCategories={subCategories}
            onSelect={(subLabel) => {
              onSelectCategory(subLabel);
              onClose(); // 선택 후 모달 닫기
            }}
            />
          )}
      </div>
    </div>
  );
}
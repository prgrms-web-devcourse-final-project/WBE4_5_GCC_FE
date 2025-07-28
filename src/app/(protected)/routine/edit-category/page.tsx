'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getCategories } from '@/api/categories';
import { CategoryItem } from '../../../../../types/general';

import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';
import CategoryGrid from '@/app/components/routine/category/CategoryGrid';

export default function Page() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem>();

  const { data: categories = [], isLoading } = useQuery<CategoryItem[], Error>({
    queryKey: ['edit-categories'],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });

  const majorCategories = categories.filter(
    (cat) => cat.categoryType === 'MAJOR',
  );

  const handleSelect = (label: string) => {
    const category = [...majorCategories].find(
      (cat) => cat.categoryName === label,
    );
    if (category) {
      setSelectedCategory(category);
      // edit-subcategory 이동 시 label과 icon 전달,
      router.push(
        `/routine/edit-subcategory?label=${encodeURIComponent(
          category.categoryName,
        )}&icon=${encodeURIComponent(category?.emoji || '❓')}`,
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-4 py-10">
      <CategoryGrid
        categories={majorCategories}
        selected={selectedCategory?.categoryName || null}
        onSelectCategory={handleSelect}
        //isManage={true} // 관리자 페이지일 때 사용
      />
    </div>
  );
}

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
    queryKey: ['user-categories'],
    queryFn: getCategories,
    staleTime: 0,
  });

  const majorCategories = categories.filter(
    (cat) => cat.categoryType === 'DEFAULT' || cat.categoryType === 'MAJOR',
  );

  const handleSelect = (categoryId: number) => {
    const category = majorCategories.find(
      (cat) => cat.categoryId === categoryId,
    );
    if (category) {
      setSelectedCategory(category);
      router.push(
        `/routine/edit-subcategory?categoryId=${category.categoryId}&label=${category.categoryName}&icon=${category.emoji}`,
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
        selected={selectedCategory?.categoryId || null}
        onSelectCategory={(id) => handleSelect(id)}
        //isManage={} // 관리자 페이지일 때 사용 default 값이 false라서 유저 쪽에서는 안 넘겨줘도 됨
      />
    </div>
  );
}

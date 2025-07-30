'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminCategories } from '@/api/admin/adminCategories';

import CategoryEdit from '@/app/components/admin/CategoryEdit';

import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';
import CategoryGrid from '@/app/components/routine/category/CategoryGrid';
import { CategoryItem } from '../../../../types/general';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null,
  );

  const {
    data: categories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: AdminCategories,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col">
        <div>
          <div className="flex flex-col gap-2 px-4 py-10">
            <CategoryGrid
              categories={categories}
              selected={selectedCategory?.categoryId || null}
              onSelectCategory={(label) => {
                const category = categories.find(
                  (cat: CategoryItem) => cat.categoryName === label,
                );
                if (!category) return;

                setSelectedCategory(category);
                setIsOpen(true);
              }}
              isCustom={true}
            />
          </div>
          {selectedCategory && (
            <CategoryEdit
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              label={selectedCategory.categoryName}
              icon={selectedCategory.emoji}
              categoryId={selectedCategory.categoryId}
              onEditComplete={refetch} // 수정 후 갱신
            />
          )}
        </div>
      </div>
    </div>
  );
}

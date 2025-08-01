'use client';

import { UseAdminCategory } from '@/api/admin/adminCategories';

interface RoutineSelectorProps {
  selectedCategoryId: number | null;
  selectAction: (id: number | null) => void;
}

export default function RoutineSelector({
  selectedCategoryId,
  selectAction,
}: RoutineSelectorProps) {
  const { data: categories, isLoading } = UseAdminCategory();

  return (
    <div className="routine-scroll flex gap-2 overflow-x-scroll">
      {!isLoading && (
        <div
          onClick={() => selectAction(null)}
          className={`flex h-[40px] min-w-[76px] flex-shrink-0 cursor-pointer items-center justify-center rounded-2xl border px-5 py-3 select-none ${selectedCategoryId === null ? 'border-[#FFB84C] bg-[#FFB84C] text-white' : 'border-[#e0e0e0]'}`}
        >
          <span className="text-[12px] font-medium">전체보기</span>
        </div>
      )}

      {!isLoading &&
        categories?.map((category) => (
          <div
            key={category.categoryId}
            onClick={() => selectAction(category.categoryId)}
            className={`flex h-[40px] min-w-[76px] flex-shrink-0 cursor-pointer items-center justify-center rounded-2xl border px-5 py-3 select-none ${selectedCategoryId === category.categoryId ? 'border-[#FFB84C] bg-[#FFB84C] text-white' : 'border-[#e0e0e0]'}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-[18px]">{category.emoji}</span>
              <span className="text-[12px] font-medium">
                {category.categoryName}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}

import { UseAdminCategory } from '@/api/admin/adminCategories';
import '../../../styles/recommended-routine.css';

export default function RoutineSelector() {
  const { data: categories, isLoading } = UseAdminCategory();
  return (
    <div className="routine-scroll flex gap-2 overflow-x-scroll">
      {!isLoading &&
        categories?.map((category, idx) => (
          <div
            key={idx}
            className="flex h-[40px] min-w-[76px] flex-shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-[#e0e0e0] px-5 py-3 select-none"
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

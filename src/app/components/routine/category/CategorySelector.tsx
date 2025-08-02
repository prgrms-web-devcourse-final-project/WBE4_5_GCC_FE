import { ChevronDown, ChevronRight } from 'lucide-react';
import { CategoryItem } from '../../../../../types/general';

interface CategorySelectorProps {
  icon: string;
  label: string;
  value: CategoryItem | null;
  placeholder?: string;
  onClick: () => void;
}

export default function CategorySelector({
  icon,
  label,
  value,
  placeholder,
  onClick,
}: CategorySelectorProps) {
  const iconForValue = value?.categoryName && value.emoji;

  const categoryDisplay = value ? (
    <span className="flex items-center gap-1 text-base">
      <span>{value.categoryName}</span>
      {value.subCategoryName && (
        <>
          <ChevronRight className="h-auto w-[14px] text-[#222222] dark:text-[var(--dark-gray-700)]" />
          <span>{value.subCategoryName}</span>
        </>
      )}
    </span>
  ) : (
    <span className="text-base text-[#BDBDBD]">{placeholder}</span>
  );

  return (
    <div className="flex h-16 w-full max-w-[614px] items-center justify-between rounded-t-lg border border-[#E0E0E0] px-5 py-4 dark:border-[var(--dark-bg-tertiary)] dark:bg-[var(--dark-bg-primary)]">
      {/* 좌측 영역 */}
      <div className="flex items-center gap-3 text-base font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
        <span>{icon}</span>
        <span>{label}</span>
      </div>

      {/* 우측 영역 */}
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-2 text-sm text-[#9E9E9E] cursor-pointer"
      >
        <span
          className={`flex items-center gap-2 ${value ? 'text-[#222222] dark:text-[var(--dark-gray-700)]' : 'text-[#c4c4c4]'
            }`}
        >
          <span className="text-base">{iconForValue || ''}</span>
          {categoryDisplay}
        </span>
        <ChevronDown className="h-4 w-auto text-[#9E9E9E]" />
      </button>
    </div>
  );
}

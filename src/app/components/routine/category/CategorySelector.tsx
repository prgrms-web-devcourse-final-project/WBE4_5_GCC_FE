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
    <span className="flex items-center gap-1">
      <span>{value.categoryName}</span>
      {value.subCategoryName && (
        <>
          <ChevronRight className="h-auto w-[11px] text-[var(--black)] dark:text-[var(--dark-gray-700)]" />
          <span>{value.subCategoryName}</span>
        </>
      )}
    </span>
  ) : (
    <span>{placeholder}</span>
  );

  return (
    <div className="flex h-12 w-full items-center justify-between rounded-t-lg border border-[var(--gray-300)] bg-[var(--white)] px-4 py-4 select-none dark:border-[var(--dark-bg-tertiary)] dark:bg-[var(--dark-bg-primary)]">
      <div className="flex items-center gap-2 text-xs font-medium text-[var(--black)] dark:text-[var(--dark-gray-700)]">
        <span>{icon}</span>
        <span className="dark:text-[var(--dark-gray-700)]">{label}</span>
      </div>
      <button
        type="button"
        onClick={onClick}
        className="flex cursor-pointer items-center gap-2 rounded-xl px-1 py-2 text-xs text-[var(--gray-500)] hover:shadow-sm"
      >
        <span
          className={`flex items-center gap-2 ${
            value
              ? 'text-[var(--black)] dark:text-[var(--dark-gray-700)]'
              : 'text-[var(--gray-500)]'
          }`}
        >
          <span>{iconForValue || ''}</span>
          <span>{categoryDisplay}</span>
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}

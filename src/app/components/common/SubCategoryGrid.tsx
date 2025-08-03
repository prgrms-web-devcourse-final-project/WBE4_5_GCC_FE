import clsx from 'clsx';

interface SubCategoryGridProps {
  subCategories: string[];
  onSelect: (label: string) => void;
}

export default function SubCategoryGrid({
  subCategories,
  onSelect,
}: SubCategoryGridProps) {
  return (
    <div className="min-h-[476px] w-full border-t border-[#e0e0e0] dark:border-t-[var(--dark-bg-tertiary)]">
      <button
        onClick={() => onSelect('')}
        className="h-[54px] w-full border-b border-[#e0e0e0] text-sm font-semibold text-[#616161] dark:border-b-[var(--dark-bg-tertiary)] dark:text-[var(--dark-gray-700)]"
      >
        선택 안 함
      </button>

      {subCategories.map((label, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(label)}
          className={clsx(
            'h-[54px] w-full border-b border-[#e0e0e0] text-sm font-semibold text-[#616161] dark:border-b-[var(--dark-bg-tertiary)] dark:text-[var(--dark-gray-700)]',
            idx === subCategories.length && 'border-b-0',
          )}
        >
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

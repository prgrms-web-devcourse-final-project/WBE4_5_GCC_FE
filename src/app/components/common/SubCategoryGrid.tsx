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
    <div className="w-full min-h-[476px] border-t border-[#E0E0E0]">
      <button
        onClick={() => onSelect('')}
        className="h-[54px] w-full border-b border-[#E0E0E0] text-sm font-semibold text-[#616161]"
      >
        선택 안 함
      </button>

      {subCategories.map((label, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(label)}
          className={clsx(
            'h-[54px] w-full border-b border-[#E0E0E0] text-sm font-semibold text-[#616161]',
            idx === subCategories.length && 'border-b-0',
          )}
        >
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

import clsx from 'clsx';

interface SubCategoryGridProps {
  subCategories: string[],
  onSelect: (label: string) => void,
}

export default function SubCategoryGrid({
  subCategories,
  onSelect,
}: SubCategoryGridProps) {

  return (
    <div className="w-full border-t border-[#E0E0E0]">
      {subCategories.map((label, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(label)}
          className={clsx(
            'w-full h-[54px] border-b border-[#E0E0E0] text-sm text-[#616161] font-semibold',
            idx === subCategories.length - 1 && 'border-b-0'
          )}
        >
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

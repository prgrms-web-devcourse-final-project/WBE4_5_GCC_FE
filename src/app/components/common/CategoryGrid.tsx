import { Category } from '../../../../types/types';

interface CategoryGridProps {
  categories: Category[];
  selected: string | null;
  onSelectCategory: (label: string) => void;
}

export default function CategoryGrid({
  categories,
  selected,
  onSelectCategory,
}: CategoryGridProps) {

  return (
    <div className="grid w-full grid-cols-3 gap-x-8 gap-y-3">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          onClick={() => onSelectCategory?.(cat.label)}
          className="relative flex flex-col items-center gap-1 py-2.5 text-sm text-[#222222]"
        >
          {selected === cat.label && (
            <div className="absolute inset-0 z-10 rounded-[5px] bg-[#222222]/20 pointer-events-none" />
          )}
          <div className="flex aspect-square w-[50px] items-center justify-center rounded-full bg-[#F9F8FE]">
            {cat.icon}
          </div>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

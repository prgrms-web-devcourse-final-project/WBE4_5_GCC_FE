import { ChevronDown } from 'lucide-react';
import { CategoryItem } from '../../../../types/types';

interface CategorySelectorProps {
  icon: React.ReactNode;
  label: string;
  value: CategoryItem | null;
  placeholder?: string;
  onClick: () => void;
  storedMajorCategory?: string;
  storedSubCategory?: string | null;
}

const categoryIconMap: Record<string, React.ReactNode> = {
  청소: <span>🧹</span>,
  세탁: <span>🧺</span>,
  쓰레기: <span>♻️</span>,
  요리: <span>🍳</span>,
  소비: <span>💸</span>,
  행정: <span>📄</span>,
  건강: <span>🏃🏻</span>,
  자기개발: <span>💡</span>,
  외출: <span>👜</span>,
};

export default function CategorySelector({
  icon,
  label,
  value,
  placeholder,
  onClick,
  storedMajorCategory,
  storedSubCategory,
}: CategorySelectorProps) {
  const iconForValue =
    value?.categoryName && categoryIconMap[value.categoryName];

  const categoryDisplayText = value
    ? value.subCategoryName
      ? `${value.categoryName}` > `${value.subCategoryName}`
      : value.categoryName
    : placeholder;

  return (
    <div className="flex h-12 w-full items-center justify-between rounded-t-lg border border-[#E0E0E0] px-4 py-4">
      {/* 좌측 영역 */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#222222]">
        <span>{icon}</span>
        <span>{label}</span>
      </div>

      {/* 우측 영역 */}
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-2 text-xs text-[#9E9E9E]"
      >
        <span
          className={`flex items-center gap-2 ${
            value ? 'text-[#222222]' : 'text-[#9E9E9E]'
          }`}
        >
          <span>{iconForValue || ''}</span>
          <span>{categoryDisplayText}</span>
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}

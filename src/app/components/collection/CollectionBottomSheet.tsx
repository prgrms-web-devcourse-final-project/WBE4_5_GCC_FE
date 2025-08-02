'use client';

import Button from '../common/ui/Button';
import { useState } from 'react';
import { getCategories } from '@/api/categories';
import SelectButton from '../common/SelectButton';
import { CategoryItem } from '../../../../types/general';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../common/ui/LoadingSpinner';

const tierLabelMap: Record<'PLATINUM' | 'GOLD' | 'SILVER' | 'BRONZE', string> =
  {
    PLATINUM: '🏆 플래티넘',
    GOLD: '🥇 금',
    SILVER: '🥈 은',
    BRONZE: '🥉 동',
  };

export default function CollectionBottomSheet({
  isOpen,
  setIsOpenAction,
  onApplyAction,
}: {
  isOpen?: boolean;
  setIsOpenAction: (open: boolean) => void;
  onApplyAction: (filters: { tiers: string[]; categories: string[] }) => void;
}) {
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const toggleTier = (tier: string) => {
    setSelectedTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier],
    );
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const { data: categories = [], isLoading } = useQuery<CategoryItem[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });

  const handleApply = () => {
    onApplyAction({
      tiers: selectedTiers,
      categories: selectedCategories,
    });
    setIsOpenAction(false);
  };

  const handleReset = () => {
    setSelectedTiers([]);
    setSelectedCategories([]);
    onApplyAction({ tiers: [], categories: [] });
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222] select-none dark:bg-[var(--dark-gray-200)]/50"
      onClick={() => setIsOpenAction(false)}
    >
      <div
        className="relative min-h-[390px] w-full min-w-[390px] rounded-t-3xl bg-white px-5 py-[34px] dark:bg-[var(--dark-bg-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-start">
          <h2 className="text-[20px] font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
            필터
          </h2>
        </div>

        {/* 티어 */}
        <div className="flex flex-col">
          <p className="text-md mb-4 font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
            티어
          </p>
          <div className="mb-11 flex flex-wrap gap-2.5">
            {Object.entries(tierLabelMap).map(([tierKey, label]) => (
              <SelectButton
                key={tierKey}
                text={label}
                onClick={() => toggleTier(tierKey)}
                className={
                  selectedTiers.includes(tierKey)
                    ? 'bg-[#ffb84c] text-white dark:text-[var(--dark-bg-primary)]'
                    : 'border-[#e0e0e0]'
                }
              />
            ))}
          </div>
        </div>

        {/* 카테고리 */}
        <div className="flex flex-col">
          <p className="text-md mb-4 font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
            카테고리
          </p>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <SelectButton
                key={category.categoryId}
                text={`${category.emoji} ${category.categoryName}`}
                onClick={() => toggleCategory(category.categoryName)}
                className={
                  selectedCategories.includes(category.categoryName)
                    ? 'bg-[#ffb84c] text-white dark:text-[var(--dark-bg-primary)]'
                    : 'border-[#e0e0e0]'
                }
              />
            ))}
          </div>

          <div className="flex gap-[14px]">
            <Button
              className="mt-[73px] mb-3 border border-[#e0e0e0] bg-white text-sm font-medium text-[#616161] dark:bg-[var(--dark-bg-primary)]"
              onClick={handleReset}
            >
              초기화
            </Button>

            <Button
              className="mt-[73px] mb-3 text-sm font-medium"
              onClick={handleApply}
            >
              설정하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

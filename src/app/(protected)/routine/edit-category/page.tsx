'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoryGrid from '@/app/components/common/CategoryGrid';
import { Categories } from '@/api/categories';
import { CategoryItem } from '../../../../../types/types';

export default function Page() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem>();

  const [loading, setLoading] = useState(false); // 나중엔 true로 바꿔야함
  const [majorCategories, setMajorCategories] = useState<CategoryItem[]>([]);
  const [customCategories, setCustomCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Categories();
        const data: CategoryItem[] = res.data;

        const majors = data.filter((cat) => cat.categoryType === 'MAJOR');

        setMajorCategories(majors);
      } catch (error) {
        console.error('카테고리 로딩 실패', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (label: string) => {
    const category = [...majorCategories, ...customCategories].find(
      (cat) => cat.categoryName === label,
    );
    if (category) {
      setSelectedCategory(selectedCategory);
      // edit-subcategory 이동 시 label과 icon 전달,
      router.push(
        `/routine/edit-subcategory?label=${encodeURIComponent(
          category.categoryName,
        )}&icon=${encodeURIComponent(category?.emoji || '❓')}`,
      );
    }
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-10">
      <CategoryGrid
        categories={majorCategories}
        selected={selectedCategory?.categoryName || null}
        onSelectCategory={handleSelect}
        //isManage={true} // 관리자 페이지일 때 사용
      />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoryGrid from '@/app/components/common/CategoryGrid';
import { Categories } from '@/api/categories';

interface CategoryItem {
  categoryId: number;
  categoryName: string;
  categoryType: 'MAJOR' | 'SUB' | 'CUSTOM';
  parentName: string | null;
}

const categoryIconMap: Record<string, React.ReactNode> = {
  청소: '🧹',
  세탁: '🧺',
  쓰레기: '♻️',
  요리: '🍳',
  소비: '💸',
  행정: '📄',
  건강: '🏃🏻',
  자기개발: '💡',
  외출: '👜',
};

const customCategories = [{ icon: <span>🐾</span>, label: '반려동물' }];

export default function Page() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<{
    icon: React.ReactNode | string;
    label: string;
  } | null>(null);

  const [loading, setLoading] = useState(false); // 나중엔 true로 바꿔야함
  const [majorCategories, setMajorCategories] = useState<CategoryItem[]>([]);
  const [customCategories, setCustomCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Categories();
        const data: CategoryItem[] = res.data;

        const majors = data.filter((cat) => cat.categoryType === 'MAJOR');
        const customs = data.filter((cat) => cat.categoryType === 'CUSTOM');

        setMajorCategories(majors);
        setCustomCategories(customs);
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
      setSelectedCategory({
        icon: categoryIconMap[category.categoryName] || <span>❓︎</span>,
        label: category.categoryName,
      });
      // edit-subcategory 이동 시 label과 icon 전달,
      router.push(
        `/routine/edit-subcategory?label=${encodeURIComponent(
          category.categoryName,
        )}&icon=${encodeURIComponent(
          (categoryIconMap[category.categoryName] as string) || '❓',
        )}`,
      );
    }
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-10">
      <CategoryGrid
        categories={majorCategories.map((cat) => ({
          icon: categoryIconMap[cat.categoryName] || <span>❓︎</span>,
          label: cat.categoryName,
        }))}
        selected={selectedCategory?.label || null}
        onSelectCategory={handleSelect}
        //isManage={true} // 관리자 페이지일 때 사용
      />
      <CategoryGrid
        categories={customCategories.map((cat) => ({
          icon: categoryIconMap[cat.categoryName] || <span>❓︎</span>,
          label: cat.categoryName,
        }))}
        selected={selectedCategory?.label || null}
        onSelectCategory={handleSelect}
        isCustom={true}
      />
    </div>
  );
}

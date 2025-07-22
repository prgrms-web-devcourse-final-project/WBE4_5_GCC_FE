'use client';

import { useState, useEffect } from 'react';

import CategoryGrid from '@/app/components/common/CategoryGrid';
import CategoryEdit from '@/app/components/admin/CategoryEdit';
import { AdminCategories } from '@/api/admin/adminCategories';

interface AdminCategory {
  categoryId: number;
  categoryName: string;
  emoji: string;
  categoryType: 'MAJOR';
  createTime: string;
  updateTime: string | null;
}

export default function Page() {
  const [loading, setLoading] = useState(false); // 나중엔 true로 바꿔야 함
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<AdminCategory | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AdminCategories();
        console.log('카테고리 목록:', res);
        setCategories(res.data);
      } catch (error) {
        console.error('카테고리 목록을 불러오지 못했습니다', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div>
          <div className="flex flex-col gap-2 px-4 py-10">
            <CategoryGrid
              categories={categories}
              selected={selectedCategory?.categoryName || null}
              onSelectCategory={(label) => {
                const category = categories.find(
                  (cat) => cat.categoryName === label,
                );
                if (!category) return;

                setSelectedCategory(category);
                setIsOpen(true);
              }}
              isCustom={true}
            />
          </div>
          <CategoryEdit
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            label={selectedCategory?.categoryName}
          />
        </div>
      </div>
    </div>
  );
}

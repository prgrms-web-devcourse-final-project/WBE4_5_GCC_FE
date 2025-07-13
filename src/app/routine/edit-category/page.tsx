'use client'

import { useState } from 'react';
import CategoryGrid from '@/app/components/common/CategoryGrid';

const categories = [
  { icon: <span>🧹</span>, label: '청소 / 정리' },
  { icon: <span>🧺</span>, label: '세탁 / 의류' },
  { icon: <span>♻️</span>, label: '쓰레기 / 환경' },
  { icon: <span>🍳</span>, label: '요리' },
  { icon: <span>💸</span>, label: '소비' },
  { icon: <span>📄</span>, label: '행정' },
  { icon: <span>🏃🏻</span>, label: '건강' }, 
  { icon: <span>💡</span>, label: '자기개발' },
  { icon: <span>👜</span>, label: '외출' },
];

export default function page () {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    icon: React.ReactNode | string;
    label: string;
  } | null>(null);
  
    const handleSelect = (label: string) => {
      setSelected(label);
    };

  return (
    <div className="px-4 py-10">
      <CategoryGrid
        categories={categories}
        selected={selectedCategory?.label || null}
        onSelectCategory={(label) => {
          const category = categories.find((cat) => cat.label === label);
          if (category) {
            setSelectedCategory(category);
          }
        }}
      />
    </div>
  );
}
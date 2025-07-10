'use client'

import { useState } from "react";
import CategoryGrid from "./CategoryGrid";
import SubCategorySheet from "./SubCategorySheet";

export default function CategoryBottomSheetContainer () {
  const [selectedCategory, setSelectedCategory] = useState< {icon: React.ReactNode | string; label:string } | null>(null);
  const categories=[
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

  return (
    <>
      {!selectedCategory ? (
        <CategoryGrid 
          categories={categories}
          editable={true}
          onEditClick={() => console.log('편집 클릭')}
          onSelectCategory={(label) => {
            const category = categories.find((cat) => cat.label === label);
            if (category) setSelectedCategory(category);
          }}
        />
      ) : (
        <SubCategorySheet 
          categoryLabel={selectedCategory.label}
          categoryIcon={selectedCategory.icon}
          onBack={() => setSelectedCategory(null)}
        />
      )}
    </>
  );
}
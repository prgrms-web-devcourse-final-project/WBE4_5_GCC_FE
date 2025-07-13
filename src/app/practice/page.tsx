'use client';

import ItemCard from '../components/shop/ItemCard';
import Tabs from '../components/shop/Tabs';
import { useState } from 'react';
import item1 from '@/app/assets/images/item1.png';

export default function Practice() {
  const tabList = ['전체', '상의', '하의', '액세서리'];
  const [selectedTab, setSelectedTab] = useState(`${tabList[0]}`);

  const items = [
    {
      id: 1,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '상의',
    },
    {
      id: 2,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '상의',
    },
    {
      id: 3,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '상의',
    },
    {
      id: 4,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '하의',
    },
    {
      id: 5,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
    },
    {
      id: 6,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
    },
    {
      id: 7,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
    },
    {
      id: 8,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
    },
    {
      id: 9,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
    },
    {
      id: 10,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
    },
    {
      id: 11,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
    },
    {
      id: 12,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
    },
  ];

  const filteredItem =
    selectedTab === '전체'
      ? items
      : items.filter((item) => item.category === selectedTab);
  return (
    <>
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm px-5">
        <Tabs
          tabs={tabList}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <div className="rounded-2 mx-auto flex w-full flex-wrap gap-5 border-1 border-[#d9d9d9] px-4 py-6">
          {filteredItem.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

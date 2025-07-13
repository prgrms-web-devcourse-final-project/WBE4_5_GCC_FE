'use client';

import { useState } from 'react';
import item1 from '@/app/assets/images/item1.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 기능 구현때 삭제
import { StaticImageData } from 'next/image';
import Tabs from '@/app/components/shop/Tabs';
import ItemCard from '@/app/components/shop/ItemCard';
import { useRouter } from 'next/navigation';

export default function AdminShop() {
  const router = useRouter();
  const tabList = ['전체', '상의', '하의', '액세서리'];
  const [selectedTab, setSelectedTab] = useState(tabList[0]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'failed'>('success');

  type Item = {
    id: number;
    image: StaticImageData;
    name: string;
    description: string;
    category: string;
    price: number;
  };

  const items = [
    {
      id: 1,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '상의',
      price: 200,
    },
    {
      id: 2,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '상의',
      price: 1000,
    },
    {
      id: 3,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '상의',
      price: 700,
    },
    {
      id: 4,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '하의',
      price: 800,
    },
    {
      id: 5,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 2200,
    },
    {
      id: 6,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 5200,
    },
    {
      id: 7,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 200,
    },
    {
      id: 8,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 100,
    },
    {
      id: 9,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 900,
    },
    {
      id: 10,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 10,
    },
    {
      id: 11,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 300,
    },
    {
      id: 12,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 1200,
    },
    {
      id: 13,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '상의',
      price: 1200,
    },
    {
      id: 14,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '하의',
      price: 6200,
    },
    {
      id: 15,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '하의',
      price: 200,
    },
    {
      id: 16,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '하의',
      price: 1200,
    },
  ];

  const filteredItem =
    selectedTab === '전체'
      ? items
      : items.filter((item) => item.category === selectedTab);

  return (
    <>
      <div className="mx-auto mt-[38px] flex w-full max-w-screen-sm flex-col px-5">
        <Tabs
          tabs={tabList}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <div className="rounded-2 border-1 border-[#d9d9d9] px-4 py-6">
          <div className="grid grid-cols-3 gap-5">
            {/* 아이템 등록 버튼 */}
            <button
              className="flex aspect-[92/128] w-[92px] items-center justify-center rounded-[5px] border-1 border-[#d9d9d9] text-[12px] text-[#9A9898] shadow-[1px_2px_4px_rgba(0,0,0,0.1)]"
              onClick={() => {
                router.push('/admin/shop/add-item');
              }}
            >
              + 아이템 등록
            </button>
            {filteredItem.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => {
                  setSelectedItem(item);
                  setSelectedPrice(item.price);
                  router.push(`/admin/shop/edit-item/${item.id}`);
                }}
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-[41px] flex items-center justify-center space-x-[11px]">
            <button className="text-[#222222]">
              <ChevronLeft className="h-3 w-auto" />
            </button>
            <button className="text-[10px] font-medium text-gray-700">1</button>
            <button className="text-[10px] font-medium text-gray-700">2</button>
            <button className="flex h-[17px] w-[18px] items-center justify-center rounded-[3px] bg-[#222222] text-center text-[10px] font-semibold text-white">
              3
            </button>
            <button className="text-[#D9D9D9]">
              <ChevronRight className="h-3 w-auto" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

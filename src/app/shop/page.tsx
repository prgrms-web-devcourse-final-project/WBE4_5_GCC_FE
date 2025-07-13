'use client';

import ItemCard from '../components/shop/ItemCard';
import Tabs from '../components/shop/Tabs';
import { useState } from 'react';
import item1 from '@/app/assets/images/item1.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PurchaseModal from '../components/shop/PurchaseModal';
import PurchaseAlert from '../components/shop/PurchaseAlert';

// 기능 구현때 삭제
import { StaticImageData } from 'next/image';

export default function Practice() {
  const tabList = ['전체', '상의', '하의', '액세서리'];
  const [selectedTab, setSelectedTab] = useState(tabList[0]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'failed'>('success');
  const [showPModal, setShowPModal] = useState(false);
  const [showPAlert, setShowPAlert] = useState(false);

  // 테스트
  const userPoint = 1200;

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

        <div className="rounded-2 flex flex-wrap justify-center gap-5 border-1 border-[#d9d9d9] px-4 py-6">
          {filteredItem.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={() => {
                setSelectedItem(item);
                setSelectedPrice(item.price);
                setShowPModal(true);
              }}
            />
          ))}

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

      {/* 구매 모달 */}
      {showPModal && selectedItem && (
        <PurchaseModal
          isOpen={true}
          title="해당 아이템을 구매할까요?"
          confirmText="구매"
          cancelText="취소"
          item={selectedItem}
          onConfirm={() => {
            setAlertType(
              userPoint >= selectedItem.price ? 'success' : 'failed',
            );
            setShowPAlert(true);
            setShowPModal(false);
          }}
          onCancel={() => setShowPModal(false)}
        />
      )}

      {/* 구매 알림 모달 */}
      {showPAlert && (
        <PurchaseAlert
          isOpen={true}
          type={alertType}
          onConfirm={() => setShowPAlert(false)}
          userPoint={userPoint}
          itemPrice={selectedPrice ?? undefined}
        />
      )}
    </>
  );
}

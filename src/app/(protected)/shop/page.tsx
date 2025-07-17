'use client';

import { useEffect, useState } from 'react';
import item1 from '@/app/assets/images/item1.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ItemPurchaseByKey, Items } from '@/api/items';

// 기능 구현때 삭제
import { StaticImageData } from 'next/image';
import Tabs from '@/app/components/shop/Tabs';
import ItemCard from '@/app/components/shop/ItemCard';
import PurchaseModal from '@/app/components/shop/PurchaseModal';
import PurchaseAlert from '@/app/components/shop/PurchaseAlert';
import BackHeader from '@/app/components/common/ui/BackHeader';

interface Item {
  itemId: number;
  itemType: 'TOP' | 'BOTTOM' | 'ACCESSORY';
  itemDescription: string;
  itemKey: string;
  itemName: string;
  itemPoint: number;
}

export default function Practice() {
  // 나중엔 true로 바꿔야함
  const [loading, setLoading] = useState(false);
  const tabList = ['전체', '상의', '하의', '액세서리'];
  const [selectedTab, setSelectedTab] = useState(tabList[0]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'failed'>('success');
  const [showPModal, setShowPModal] = useState(false);
  const [showPAlert, setShowPAlert] = useState(false);

  const [items, setItems] = useState<Item[]>([]);

  // 테스트
  //const userPoint = 1200;
  const [points, setPoints] = useState(1200);

  const tabMap: Record<string, Item['itemType']> = {
    상의: 'TOP',
    하의: 'BOTTOM',
    액세서리: 'ACCESSORY',
  };

  const filteredItem =
    selectedTab === '전체'
      ? items
      : items.filter((item) => item.itemType === tabMap[selectedTab]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await Items();
        setItems(res.data);
      } catch (error) {
        console.error('불러오기 실패', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-screen-sm flex-col overflow-y-auto px-5">
        <Tabs
          tabs={tabList}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <div className="min-w-[350px] rounded-lg rounded-tl-none border-1 border-[#d9d9d9] px-4 py-6">
          <div className="grid grid-cols-3 gap-5">
            {filteredItem.map((item) => (
              <ItemCard
                key={item.itemId}
                item={{
                  id: item.itemId,
                  image: item1,
                  name: item.itemName,
                  description: item.itemDescription,
                  price: item.itemPoint,
                }}
                onClick={() => {
                  setSelectedItem(item);
                  setSelectedPrice(item.itemPoint);
                  setShowPModal(true);
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

      {/* 구매 모달 */}
      {showPModal && selectedItem && (
        <PurchaseModal
          isOpen={true}
          title="해당 아이템을 구매할까요?"
          confirmText="구매"
          cancelText="취소"
          item={{
            image: item1,
            name: selectedItem.itemName,
            price: selectedItem.itemPoint,
          }}
          onConfirm={async () => {
            const canBuy = points >= selectedItem.itemPoint;
            const remainingPoints = points - selectedItem.itemPoint;

            if (!canBuy) {
              setAlertType('failed');
              setShowPAlert(true);
              setShowPModal(false);
              return;
            }

            try {
              // 서버에 구매 요청 (포인트 차감)
              await ItemPurchaseByKey(selectedItem.itemKey);
              console.log('아이템 구매 성공');
              // 클라이언트 포인트 갱신
              setPoints(remainingPoints);
              setAlertType('success');
            } catch (error) {
              console.error('아이템 구매 실패', error);
              setAlertType('failed');
            } finally {
              setShowPAlert(true);
              setShowPModal(false);
            }
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
          userPoint={points}
          itemPrice={selectedPrice ?? undefined}
        />
      )}
    </>
  );
}

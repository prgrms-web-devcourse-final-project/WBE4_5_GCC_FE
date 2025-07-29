'use client';

import item1 from '@/app/assets/images/item1.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useState } from 'react';
import { useUserStore } from '@/store/UserStore';
import { ShopItem } from '../../../../types/general';
import { ItemPurchaseByKey, fetchItems } from '@/api/items';
import { useQuery, useMutation } from '@tanstack/react-query';

import Tabs from '@/app/components/shop/Tabs';
import ItemCard from '@/app/components/shop/ItemCard';
import PurchaseAlert from '@/app/components/shop/PurchaseAlert';
import PurchaseModal from '@/app/components/shop/PurchaseModal';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';

export default function Shop() {
  const tabList = ['전체', '상의', '하의', '액세서리'];
  const [selectedTab, setSelectedTab] = useState(tabList[0]);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'failed'>('success');
  const [showPModal, setShowPModal] = useState(false);
  const [showPAlert, setShowPAlert] = useState(false);

  const currentPoint = useUserStore((state) => state.points);
  const [points, setPoints] = useState(currentPoint); // 500 포인트
  const [currentPage, setCurrentPage] = useState(1);
  const [ownedItemKeys, setOwnedItemKeys] = useState<string[]>([]);
  console.log(setCurrentPage);

  const tabMap: Record<string, ShopItem['itemType']> = {
    상의: 'TOP',
    하의: 'BOTTOM',
    액세서리: 'ACCESSORY',
  };

  // 아이템 목록 불러오기
  const { data, isLoading } = useQuery<{ items: ShopItem[] }, Error>({
    queryKey: ['shop-items', currentPage],
    queryFn: fetchItems,
    staleTime: 5 * 60 * 1000,
  });

  // 아이템 구매
  const purchaseMutation = useMutation({
    mutationFn: (key: string) => ItemPurchaseByKey(key),
    onSuccess: () => {
      console.log('아이템 구매 성공');
      setAlertType('success');
    },
    onError: (error) => {
      console.error('아이템 구매 실패', error);
      setAlertType('failed');
    },
    onSettled: () => {
      setShowPModal(false);
      setShowPAlert(true);
    },
  });

  const filteredItem =
    selectedTab === '전체'
      ? data?.items || []
      : (data?.items || []).filter(
          (item) => item.itemType === tabMap[selectedTab],
        );

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-screen-sm flex-col overflow-y-auto px-5">
        <Tabs
          tabs={tabList}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <div className="min-h-[250px] w-full min-w-[350px] rounded-lg rounded-tl-none border-1 border-[#d9d9d9] px-4 py-6">
          <div className="grid min-h-[140px] w-full grid-cols-3 place-items-center gap-5">
            {filteredItem.map((item) => (
              <ItemCard
                key={item.itemId}
                item={{
                  itemKey: item.itemKey,
                  itemType: item.itemType,
                  itemId: item.itemId,
                  itemName: item.itemName,
                  itemDescription: item.itemDescription,
                  itemPoint: item.itemPoint,
                }}
                onClick={() => {
                  if (ownedItemKeys.includes(item.itemKey)) return; // 이미 보유한 아이템일 경우 클릭 막음
                  setSelectedItem(item);
                  setSelectedPrice(item.itemPoint ?? null);
                  setShowPModal(true);
                }}
                isOwned={ownedItemKeys.includes(item.itemKey)} // 보유 중 아이템
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
            price: selectedItem.itemPoint!,
          }}
          onConfirm={async () => {
            const canBuy = points >= selectedItem.itemPoint!;
            const remainingPoints = points - selectedItem.itemPoint!;

            if (!canBuy) {
              setAlertType('failed');
              setShowPAlert(true);
              setShowPModal(false);
              return;
            }

            try {
              if (!selectedItem) return;
              // 서버에 구매 요청 (포인트 차감)
              await purchaseMutation.mutateAsync(selectedItem.itemKey);
              setPoints(remainingPoints); // 성공 시 포인트 차감
              setOwnedItemKeys((prev) => [...prev, selectedItem.itemKey]); // 보유 중인 아이템으로 상태 업데이트
            } catch (error) {
              console.log('상점 아이템 구매 에러 발생:', error);
            }
          }}
          onCancel={() => setShowPModal(false)}
        />
      )}

      {/* 구매 성공 여부 알림 모달 */}
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

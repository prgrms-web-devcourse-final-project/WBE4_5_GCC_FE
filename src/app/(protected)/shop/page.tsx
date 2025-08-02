'use client';

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
  const [points, setPoints] = useState(currentPoint);
  const [currentPage, setCurrentPage] = useState(1);
  //const [ownedItemKeys, setOwnedItemKeys] = useState<string[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const tabMap: Record<string, ShopItem['itemType'] | 'ALL'> = {
    전체: 'ALL',
    상의: 'TOP',
    하의: 'BOTTOM',
    액세서리: 'ACCESSORY',
  };

  // 아이템 목록 불러오기
  const { data, isLoading, refetch } = useQuery<{ items: ShopItem[] }, Error>({
    queryKey: ['shop-items', currentPage],
    queryFn: fetchItems,
    staleTime: 5 * 60 * 1000,
  });

  const filteredItems = data?.items.filter((item) => {
    if (tabMap[selectedTab] === 'ALL') return true;
    return item.itemType === tabMap[selectedTab];
  });

  // 아이템 구매
  const purchaseMutation = useMutation({
    mutationFn: (id: number) => ItemPurchaseByKey(id),
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

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col overflow-y-auto px-5 py-7">
        <Tabs
          tabs={tabList}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <div className="min-h-[250px] w-full min-w-[350px] px-4 py-4">
          <div className="min-h-[150px] w-full grid grid-cols-3 gap-x-8 gap-y-6 place-items-center" style={{ minWidth: '350px' }}>
            {filteredItems?.map((item: ShopItem) => (
              <ItemCard
                key={item.itemId}
                item={{
                  itemKey: item.itemKey,
                  itemType: item.itemType,
                  itemId: item.itemId,
                  itemName: item.itemName,
                  itemDescription: item.itemDescription,
                  itemPoint: item.itemPrice,
                }}
                onClick={() => {
                  if (item.isOwned) return; // 이미 보유한 아이템일 경우 클릭 막음
                  setSelectedItem(item);
                  setSelectedPrice(item.itemPrice!);
                  setShowPModal(true);
                }}
                isOwned={item.isOwned} // 보유 중 아이템
              />
            ))}
          </div>

          {/* 페이지네이션 */}
          {/*<div className="mt-[41px] flex items-center justify-center space-x-[11px]">
            <button className="text-[#222222] dark:text-[var(--dark-gray-700)]">
              <ChevronLeft className="h-3 w-auto" />
            </button>
            <button className="text-[10px] font-medium text-gray-700">1</button>
            <button className="text-[10px] font-medium text-gray-700">2</button>
            <button className="flex h-[17px] w-[18px] items-center justify-center rounded-[3px] bg-[#222222] dark:bg-[var(--dark-gray-200)] text-center text-[10px] font-semibold text-white dark:text-[var(--dark-bg-primary)]">
              3
            </button>
            <button className="text-[#d9d9d9]">
              <ChevronRight className="h-3 w-auto" />
            </button>
          </div>*/}
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
            image: `/images/items/thumbs/${selectedItem.itemKey}.png`,
            name: selectedItem.itemName,
            price: selectedItem.itemPrice!,
          }}
          onConfirm={async () => {
            if (isPurchasing) return; // 아이템 구매 시 카드 중복 클릭 방지
            setIsPurchasing(true);

            const canBuy = points >= selectedItem.itemPrice!;
            const remainingPoints = points - selectedItem.itemPrice!;

            if (!canBuy) {
              setAlertType('failed');
              setShowPAlert(true);
              setShowPModal(false);
              setIsPurchasing(false);
              return;
            }

            try {
              if (!selectedItem) return;
              // 서버에 구매 요청 (포인트 차감)
              await purchaseMutation.mutateAsync(selectedItem.itemId);
              await refetch(); // 아이템 목록 갱신
              setPoints(remainingPoints); // 성공 시 포인트 차감
              //setOwnedItemKeys((prev) => [...prev, selectedItem.itemKey]); // 보유 중인 아이템으로 상태 업데이트
            } catch (error) {
              console.log('상점 아이템 구매 에러 발생:', error);
            } finally {
              setShowPAlert(false);
              setShowPAlert(true);
              setIsPurchasing(false);
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

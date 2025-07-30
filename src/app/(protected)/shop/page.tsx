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
import clsx from 'clsx';
import Image from 'next/image';

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
  const [ownedItemKeys, setOwnedItemKeys] = useState<string[]>([]);
  console.log(setCurrentPage);

  const [selectedTryItem, setSelectedTryItem] = useState<
    Record<'TOP' | 'BOTTOM' | 'ACCESSORY', string | null>
  >({
    TOP: null,
    BOTTOM: null,
    ACCESSORY: null,
  });
  const [equippedItem, setEquippedItem] = useState<
    Record<'TOP' | 'BOTTOM' | 'ACCESSORY', string | null>
  >({
    TOP: null,
    BOTTOM: null,
    ACCESSORY: null,
  });

  const tabMap: Record<string, ShopItem['itemType'] | 'ALL'> = {
    전체: 'ALL',
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
      <div className="mx-auto flex min-h-screen w-full max-w-screen-sm flex-col overflow-y-auto px-5">
        <div className="flex flex-col">
          <div className="relative mt-[27px] mb-[29px] flex h-[198px] w-full items-center justify-center overflow-hidden rounded-lg">
            {/* 배경 이미지 */}
            <Image
              src="/images/itemBackGround.svg"
              alt="bg"
              fill
              priority
              className="object-cover"
            />
            {/* 아이템박스 */}
            <div className="absolute left-[33px] z-0 space-y-[9px]">
              <div
                className="relative h-[52px] w-[52px] rounded-[4px] border border-[#FFB84C] bg-white"
                onClick={() => {
                  if (selectedTryItem.ACCESSORY) {
                    const equippedKey = data?.items.find(
                      (item: ShopItem) =>
                        item.itemKey === selectedTryItem.ACCESSORY,
                    );
                    //if (equippedKey) {
                    //  handleModal(equippedKey);
                    //}
                  }
                }}
              >
                {selectedTryItem.ACCESSORY && (
                  <Image
                    src={`/images/items/thumbs/${selectedTryItem.ACCESSORY}.png`}
                    alt="액세서리"
                    width={53}
                    height={53}
                    priority
                    className="cursor-pointer object-contain p-[4px]"
                  />
                )}
              </div>
              <div
                className="relative h-[52px] w-[52px] rounded-[4px] border border-[#FFB84C] bg-white"
                onClick={() => {
                  if (selectedTryItem.TOP) {
                    const equippedKey = data?.items.find(
                      (item: ShopItem) => item.itemKey === selectedTryItem.TOP,
                    );
                    //if (equippedKey) {
                    //  handleModal(equippedKey);
                    //}
                  }
                }}
              >
                {selectedTryItem.TOP && (
                  <Image
                    src={`/images/items/thumbs/${selectedTryItem.TOP}.png`}
                    alt="상의"
                    width={53}
                    height={53}
                    priority
                    className="cursor-pointer object-contain p-[4px]"
                  />
                )}
              </div>
              <div
                className="relative h-[52px] w-[52px] rounded-[4px] border border-[#FFB84C] bg-white"
                onClick={() => {
                  if (selectedTryItem.BOTTOM) {
                    const equippedKey = data?.items.find(
                      (item: ShopItem) =>
                        item.itemKey === selectedTryItem.BOTTOM,
                    );
                    //if (equippedKey) {
                    //  handleModal(equippedKey);
                    //}
                  }
                }}
              >
                {selectedTryItem.BOTTOM && (
                  <Image
                    src={`/images/items/thumbs/${selectedTryItem.BOTTOM}.png`}
                    alt="하의"
                    width={53}
                    height={53}
                    priority
                    className="cursor-pointer object-contain p-[4px]"
                  />
                )}
              </div>
            </div>

            {/* 기본 캐릭터 (맨 아래) */}
            <div className="relative flex h-[130px] w-[130px] flex-shrink-0 items-center justify-center overflow-hidden">
              <Image
                src="/images/mainCharacter.png"
                alt="기본 캐릭터"
                width={130}
                height={130}
                priority
                className="absolute inset-0 z-0"
              />
              {/* 상의 아이템 */}
              {selectedTryItem.TOP && (
                <Image
                  src={`/images/items/${selectedTryItem.TOP}.png`}
                  alt="상의"
                  width={130}
                  height={130}
                  priority
                  className="absolute inset-0 top-[4px] z-10"
                />
              )}
              {/* 하의 아이템 */}
              {selectedTryItem.BOTTOM && (
                <Image
                  src={`/images/items/${selectedTryItem.BOTTOM}.png`}
                  alt="하의"
                  width={130}
                  height={130}
                  priority
                  className="absolute inset-0 z-20"
                />
              )}
              {/* 악세사리 아이템 */}
              {selectedTryItem.ACCESSORY && (
                <Image
                  src={`/images/items/${selectedTryItem.ACCESSORY}.png`}
                  alt="액세서리"
                  width={130}
                  height={130}
                  priority
                  className="absolute inset-0 z-30"
                />
              )}
            </div>
          </div>
        </div>

        <Tabs
          tabs={tabList}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <div className="min-h-[250px] w-full min-w-[350px] rounded-lg rounded-tl-none border-1 border-[#d9d9d9] px-4 py-6">
          <div className="grid min-h-[140px] w-full grid-cols-3 place-items-center gap-5">
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
                  if (ownedItemKeys.includes(item.itemKey)) return; // 이미 보유한 아이템일 경우 클릭 막음
                  setSelectedItem(item);
<<<<<<< HEAD
                  setSelectedPrice(item.itemPrice!);
=======
                  setSelectedPrice(item.itemPoint ?? null);
>>>>>>> dev
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
<<<<<<< HEAD
            price: selectedItem.itemPrice!,
          }}
          onConfirm={async () => {
            const canBuy = points >= selectedItem.itemPrice!;
            const remainingPoints = points - selectedItem.itemPrice!;
=======
            price: selectedItem.itemPoint!,
          }}
          onConfirm={async () => {
            const canBuy = points >= selectedItem.itemPoint!;
            const remainingPoints = points - selectedItem.itemPoint!;
>>>>>>> dev

            if (!canBuy) {
              setAlertType('failed');
              setShowPAlert(true);
              setShowPModal(false);
              return;
            }

            try {
              if (!selectedItem) return;
              // 서버에 구매 요청 (포인트 차감)
              await purchaseMutation.mutateAsync(selectedItem.itemId);
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

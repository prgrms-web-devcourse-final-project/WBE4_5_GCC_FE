'use client';

import clsx from 'clsx';
import Image from 'next/image';
import BackHeader from '@/app/components/common/ui/BackHeader';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/app/components/common/ui/Button';
import { equipItem, fetchUserItem } from '@/api/member';
import { Item } from '../../../../../types/User';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';
import AlertModal from '@/app/components/common/alert/AlertModal';

const tabs = ['전체', '상의', '하의', '액세서리'];

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [userItem, setUserItem] = useState<Item[]>([]);
  const [modalItem, setModalItem] = useState<Item | null>(null);
  const [selectedTab, setSelectedTab] = useState('전체');
  const [hasInitialized, setHasInitialized] = useState(false);
  const [showModal, setShowModal] = useState(false);
  type SelectedItemState = Record<'TOP' | 'BOTTOM' | 'ACCESSORY', Item | null>;

  const [selectedItem, setSelectedItem] = useState<SelectedItemState>({
    TOP: null,
    BOTTOM: null,
    ACCESSORY: null,
  });
  const [equippedItem, setEquippedItem] = useState<
    Record<'TOP' | 'BOTTOM' | 'ACCESSORY', Item | null>
  >({
    TOP: null,
    BOTTOM: null,
    ACCESSORY: null,
  });

  // 보유아이템 목록 불러오기
  const { data, isLoading } = useQuery<{ data: Item[] }, Error>({
    queryKey: ['user-items'],
    queryFn: fetchUserItem,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!data) return;

    const allData = data;
    setUserItem(allData.data);
    // 로딩 시 장착된 아이템 초기화
    const initSelected: Record<'TOP' | 'BOTTOM' | 'ACCESSORY', Item | null> = {
      TOP: null,
      BOTTOM: null,
      ACCESSORY: null,
    };

    allData.data.forEach((item: Item) => {
      if (item.isEquipped) {
        initSelected[item.itemtype] = item;
      }
    });

    // api 호출 시 아이템 비교용
    setEquippedItem(initSelected); // 로딩 시 장작된 아이템 저장하기
    setSelectedItem(initSelected); // 착용중, 착용해제 할 아이템 저장하기
    setHasInitialized(true);
  }, [data]);

  useEffect(() => {
    if (hasInitialized) {
      console.log('선택된 아이템:', selectedItem);
    }
  }, [selectedItem, hasInitialized]);

  const categories: ('TOP' | 'BOTTOM' | 'ACCESSORY')[] = [
    'TOP',
    'BOTTOM',
    'ACCESSORY',
  ];

  const handleModal = (item: Item) => {
    setShowModal(true);
    setModalItem(item);
  };

  // 착용중 -> 착용하기 토글
  const handleSelect = (item: Item) => {
    setSelectedItem((prev) => ({
      ...prev,
      [item.itemtype]: prev[item.itemtype]?.id === item.id ? null : item,
    }));
    setShowModal(false);
  };

  const { mutate: mutateEquipItem } = useMutation({
    mutationFn: (itemId: number) => equipItem(itemId),

    // 낙관적 업데이트
    onMutate: async (newItemId: number) => {
      await queryClient.cancelQueries({ queryKey: ['equipped-items'] });

      const previousItems = queryClient.getQueryData(['equipped-items']);

      // 임시 업데이트: 이전 데이터를 기반으로 새로운 상태 적용
      queryClient.setQueryData(
        ['equipped-items'],
        (old: Record<string, Item | null>) => {
          if (!old) return old;

          // 어떤 카테고리인지 판단해서 해당 카테고리의 아이템을 바꿔야 함
          // selectedItem을 통해 카테고리를 알 수 있다고 가정
          const updated = { ...old };
          for (const category of categories) {
            if (selectedItem[category]?.id === newItemId) {
              updated[category] = selectedItem[category];
            }
          }
          return updated;
        },
      );

      return { previousItems }; // 실패 시 rollback용
    },

    // 실패 시 rollback
    onError: (err, _, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(['equipped-items'], context.previousItems);
      }
    },

    // 성공 시 최신화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipped-items'] });
      queryClient.invalidateQueries({ queryKey: ['user-items'] });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });

  // 저장하기 버튼 누를 시
  // 이미 입고있던 옷 유지 -> 호출 필요없음
  // 다른옷으로 바꿨다면 -> equip만 호출 -> 기존옷은 자동으로 해제
  // 테스트 시 상의로만 테스트 가능 -> top_item_01
  const handleSubmit = async () => {
    let equipKey: number | null = null;

    categories.forEach((category) => {
      const selected = selectedItem[category];
      const equipped = equippedItem[category];

      const isChanged = selected?.id !== equipped?.id;

      if (isChanged) {
        if (selected) {
          equipKey = selected.id;
        } else if (equipped) {
          equipKey = equipped.id;
        }
      }
    });

    console.log('장착할 아이템:', equipKey);
    if (equipKey !== null) {
      mutateEquipItem(equipKey);
    }
    router.push('/mypage');
  };

  // 저장하기 버튼 누를 시
  // 이미 입고있던 옷 유지 -> 호출 필요없음
  // 다른옷으로 바꿨다면 -> equip만 호출 -> 기존옷은 자동으로 해제
  // 테스트 시 상의로만 테스트 가능 -> top_item_01
  // const handleSubmit = async () => {
  //   let equip;

  //   categories.forEach((category) => {
  //     const selectedKey = selectedItem[category];
  //     const equippedKey = equippedItem[category];

  //     // 저장하기 직전, 선택된 아이템과 화면 첫 로딩 시 기존 장착된 아이템 비교
  //     if (selectedKey?.id !== equippedKey?.id) {
  //       // 카테고리별 기존 장착된 아이템은 있었으나, 현재 선택된 아이템은 없을 때 -> 장착해제
  //       // if (selectedKey === null && equippedKey !== null) {
  //       //   // unEquip.push(equippedKey);
  //       // }
  //       // 카테고리별 현재 선택된 아이템이 있을 때 -> 장착(기존 장착된 아이템이 있었어도 현재 선택된 아이템으로 교체됨)
  //       if (selectedKey !== null) {
  //         equip = selectedKey.id;
  //       }
  //     }
  //   });

  //   // const equipString = equip.join(',');

  //   if (equip) {
  //     await equipItem(equip);
  //   }
  //   console.log('장착할 아이템:', equip);
  //   router.push('/mypage');
  // };

  const filteredItem =
    selectedTab === '전체'
      ? userItem
      : userItem.filter((item) => {
          if (selectedTab === '상의') {
            return item.itemKey.startsWith('top_');
          }
          if (selectedTab === '하의') {
            return item.itemKey.startsWith('bottom_');
          }
          if (selectedTab === '액세서리') {
            return item.itemKey.startsWith('accessory_');
          }
          return false;
        });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="h-1vh mx-auto flex w-full max-w-5xl flex-col">
      <BackHeader title="캐릭터 꾸미기" />
      <div className="flex flex-col px-5">
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
                if (selectedItem.ACCESSORY) {
                  const equippedKey = userItem.find(
                    (item) => item.itemKey === selectedItem.ACCESSORY?.itemKey,
                  );
                  if (equippedKey) {
                    handleModal(equippedKey);
                  }
                }
              }}
            >
              {selectedItem.ACCESSORY && (
                <Image
                  src={`/images/items/thumbs/${selectedItem.ACCESSORY?.itemKey}.png`}
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
                if (selectedItem.TOP) {
                  const equippedKey = userItem.find(
                    (item) => item.itemKey === selectedItem.TOP?.itemKey,
                  );
                  if (equippedKey) {
                    handleModal(equippedKey);
                  }
                }
              }}
            >
              {selectedItem.TOP && (
                <Image
                  src={`/images/items/thumbs/${selectedItem.TOP?.itemKey}.png`}
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
                if (selectedItem.BOTTOM) {
                  const equippedKey = userItem.find(
                    (item) => item.itemKey === selectedItem.BOTTOM?.itemKey,
                  );
                  if (equippedKey) {
                    handleModal(equippedKey);
                  }
                }
              }}
            >
              {selectedItem.BOTTOM && (
                <Image
                  src={`/images/items/thumbs/${selectedItem.BOTTOM.itemKey}.png`}
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
            {selectedItem.TOP && (
              <Image
                src={`/images/items/${selectedItem.TOP.itemKey}.png`}
                alt="상의"
                width={130}
                height={130}
                priority
                className="absolute inset-0 z-10"
              />
            )}
            {/* 하의 아이템 */}
            {selectedItem.BOTTOM && (
              <Image
                src={`/images/items/${selectedItem.BOTTOM.itemKey}.png`}
                alt="하의"
                width={130}
                height={130}
                priority
                className="absolute inset-0 z-20"
              />
            )}
            {/* 악세사리 아이템 */}
            {selectedItem.ACCESSORY && (
              <Image
                src={`/images/items/${selectedItem.ACCESSORY.itemKey}.png`}
                alt="액세서리"
                width={130}
                height={130}
                priority
                className="absolute inset-0 z-30"
              />
            )}
          </div>
        </div>

        <div className="mb-[22px] min-h-[340px]">
          {/* 탭 버튼 */}
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={clsx(
                  'h-[30px] min-w-[70px] cursor-pointer rounded-t-md px-4 py-2 text-xs font-semibold',
                  selectedTab === tab
                    ? 'border-1 border-[#FFB84C] bg-[#FFB84C] text-white'
                    : 'border border-b-0 border-[#D9D9D9] bg-white text-[#AAAAAA]',
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 아이템 카드 리스트 */}
          <div
            className="relative grid min-h-[340px] w-full grid-cols-3 gap-y-[15px] rounded-tr-lg rounded-b-lg border border-[#D9D9D9] bg-white px-[15px] pt-[23px] pb-[54px]"
            style={{ columnGap: 'clamp(8px, 4vw, 21px)' }}
          >
            {filteredItem.map((item) => {
              const isSelected =
                selectedItem[item.itemtype]?.itemKey === item.itemKey;

              return (
                <div
                  key={item.itemKey}
                  className={clsx(
                    'px-auto aspect-[92/128] h-[106px] min-w-[92px] cursor-pointer rounded-[5px] border py-[7px] text-center',
                    isSelected
                      ? 'border-2 border-[#FFB84C]'
                      : 'border-[#D9D9D9]',
                  )}
                  style={{
                    boxShadow: '1px 2px 3px 0 rgba(0, 0, 0, 0.15)',
                  }}
                  // onClick={() => handleSelect(item)}
                  onClick={() => handleModal(item)}
                >
                  <Image
                    src={`/images/items/thumbs/${item.itemKey}.png`}
                    alt={item.itemName}
                    width={50}
                    height={50}
                    priority
                    className="mx-auto h-auto"
                  />
                  <div className="border-t-[0.5px] border-[#E0E0E0] px-[9px] pt-[6px] text-left">
                    <div className="text-[8px] font-medium">
                      {item.itemName}
                    </div>
                    <div className="h-[21px] text-[7px] font-medium text-[#616161]">
                      {item.itemDescription}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 페이지네이션 */}
            <div className="absolute bottom-[13px] left-1/2 -translate-x-1/2">
              <div className="flex items-center justify-center space-x-[11px]">
                <button className="text-[#222222]">
                  <ChevronLeft className="h-3 w-auto" />
                </button>
                <button className="text-[10px] font-medium text-gray-700">
                  1
                </button>
                <button className="text-[10px] font-medium text-gray-700">
                  2
                </button>
                <button className="flex h-[17px] w-[18px] items-center justify-center rounded-[3px] bg-[#222222] text-center text-[10px] font-semibold text-white">
                  3
                </button>
                <button className="text-[#D9D9D9]">
                  <ChevronRight className="h-3 w-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-5">
        <Button
          className="h-[48px] bg-[#222222] text-sm font-medium text-white"
          onClick={handleSubmit}
        >
          저장하기
        </Button>
      </div>
      {showModal && modalItem && (
        <AlertModal
          isOpen={true}
          type="none"
          title={
            selectedItem[modalItem.itemtype]?.itemKey === modalItem.itemKey ? (
              <>
                {modalItem.itemName}를<br />
                장착 해제하시겠습니까?
              </>
            ) : (
              <>
                {modalItem.itemName}를<br />
                장착하시겠습니까?
              </>
            )
          }
          confirmText={
            selectedItem[modalItem.itemtype]?.itemKey === modalItem.itemKey
              ? '장착 해제'
              : '장착'
          }
          cancelText="취소"
          onConfirm={() => handleSelect(modalItem)}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

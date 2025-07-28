'use client';

import clsx from 'clsx';
import Image from 'next/image';
import BackHeader from '@/app/components/common/ui/BackHeader';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import character from '../../../../../public/images/character.png';
import Button from '@/app/components/common/ui/Button';
import { equipItem, fetchUserItem, unequipItem } from '@/api/member';
import { Item } from '../../../../../types/User';
import ItemImg from '../../../assets/images/item1.png';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';

const tabs = ['전체', '상의', '하의', '액세서리'];

export default function Page() {
  const router = useRouter();
  const [userItem, setUserItem] = useState<Item[]>([]);
  const [selectedTab, setSelectedTab] = useState('전체');
  const [hasInitialized, setHasInitialized] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
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
    const initSelected: Record<'TOP' | 'BOTTOM' | 'ACCESSORY', string | null> =
      {
        TOP: null,
        BOTTOM: null,
        ACCESSORY: null,
      };

    allData.data.forEach((item: Item) => {
      if (item.isEquipped) {
        initSelected[item.itemtype] = item.itemKey;
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

  // 착용중 -> 착용하기 토글
  const handleSelect = (item: Item) => {
    setSelectedItem((prev) => ({
      ...prev,
      [item.itemtype]:
        prev[item.itemtype] === item.itemKey ? null : item.itemKey,
    }));
  };

  // 저장하기 버튼 누를 시
  // 이미 입고있던 옷 유지 -> 호출 필요없음
  // 다른옷으로 바꿨다면 -> equip만 호출 -> 기존옷은 자동으로 해제
  // 옷 장착을 해제했다면 -> unequip만 호출
  // 테스트 시 상의로만 테스트 가능 -> top_item_01
  const handleSubmit = async () => {
    const unEquip: string[] = [];
    const equip: string[] = [];

    categories.forEach((category) => {
      const selectedKey = selectedItem[category];
      const equippedKey = equippedItem[category];

      // 저장하기 직전, 선택된 아이템과 화면 첫 로딩 시 기존 장착된 아이템 비교
      if (selectedKey !== equippedKey) {
        // 카테고리별 기존 장착된 아이템은 있었으나, 현재 선택된 아이템은 없을 때 -> 장착해제
        if (selectedKey === null && equippedKey !== null) {
          unEquip.push(equippedKey);
        }
        // 카테고리별 현재 선택된 아이템이 있을 때 -> 장착(기존 장착된 아이템이 있었어도 현재 선택된 아이템으로 교체됨)
        else if (selectedKey !== null) {
          equip.push(selectedKey);
        }
      }
    });

    const unEquipString = unEquip.join(',');
    const equipString = equip.join(',');

    if (unEquipString) {
      await unequipItem(unEquipString);
    }
    if (equipString) {
      await equipItem(equipString);
    }

    console.log('해제할 아이템:', unEquipString);
    console.log('장착할 아이템:', equipString);
    router.push('/mypage');
  };

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
    <div className="h-1vh flex flex-col">
      <BackHeader title="캐릭터 꾸미기" />
      <div className="flex flex-col px-5">
        <div className="mt-[27px] mb-[29px] flex h-[178px] min-w-[350px] items-center justify-center rounded-lg border border-[#D9D9D9]">
          <Image
            src={character}
            alt="기본 캐릭터"
            height={100}
            priority
            className="m-2 my-auto w-auto"
          />
        </div>

        <div className="mb-[22px] min-h-[340px] min-w-[350px]">
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
          <div className="relative grid min-h-[340px] min-w-[350px] grid-cols-3 gap-x-[21px] gap-y-[15px] rounded-tr-lg rounded-b-lg border border-[#D9D9D9] bg-white px-[15px] pt-[23px] pb-[54px]">
            {filteredItem.map((item) => {
              const isSelected = selectedItem[item.itemtype] === item.itemKey;

              return (
                <div
                  key={item.itemKey}
                  className={clsx(
                    'px-auto aspect-[92/128] h-[140px] min-w-[92px] rounded-[5px] border py-[7px] text-center',
                    isSelected ? 'border-[#FFB84C]' : 'border-[#D9D9D9]',
                  )}
                  style={{
                    boxShadow: '1px 2px 3px 0 rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <Image
                    src={ItemImg}
                    alt={item.itemName}
                    width={50}
                    priority
                    className="mx-auto mt-[3px] mb-2 h-auto"
                  />
                  <div className="border-t-[0.5px] border-[#E0E0E0] px-[9px] pt-[6px] text-left">
                    <div className="text-[8px] font-medium">
                      {item.itemName}
                    </div>
                    <div className="h-[21px] text-[7px] font-medium text-[#616161]">
                      {item.itemDescription}
                    </div>
                  </div>
                  <button
                    onClick={() => handleSelect(item)}
                    className={clsx(
                      'min-h-4 min-w-18 cursor-pointer rounded-[3px] border border-[#E0E0E0] text-[8px]',
                      isSelected
                        ? 'border-[#FFB84C] bg-[#FFB84C] font-semibold text-white'
                        : 'border-[#E0E0E0] bg-white text-[#616161]',
                    )}
                  >
                    {isSelected ? '착용 중' : '착용하기'}
                  </button>
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
    </div>
  );
}

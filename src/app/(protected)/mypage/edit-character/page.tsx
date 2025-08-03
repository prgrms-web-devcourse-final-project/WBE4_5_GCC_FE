'use client';

import clsx from 'clsx';
import Image from 'next/image';
import BackHeader from '@/app/components/common/ui/BackHeader';
import { useEffect, useState } from 'react';
import { equipItem, fetchUserItem } from '@/api/member';
import { Item } from '../../../../../types/User';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';
import AlertModal from '@/app/components/common/alert/AlertModal';
import Button from '@/app/components/common/ui/Button';

const tabs = ['전체', '상의', '하의', '액세서리'];

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [userItem, setUserItem] = useState<Item[]>([]);
  const [modalItem, setModalItem] = useState<Item | null>(null);
  const [selectedTab, setSelectedTab] = useState('전체');
  const [showModal, setShowModal] = useState(false);
  type SelectedItemState = Record<'TOP' | 'BOTTOM' | 'ACCESSORY', Item | null>;

  const [selectedItem, setSelectedItem] = useState<SelectedItemState>({
    TOP: null,
    BOTTOM: null,
    ACCESSORY: null,
  });
  const [equippedItem, setEquippedItem] = useState<SelectedItemState>({
    TOP: null,
    BOTTOM: null,
    ACCESSORY: null,
  });

  const { data, isLoading } = useQuery<{ data: Item[] }, Error>({
    queryKey: ['user-items'],
    queryFn: fetchUserItem,
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });

  useEffect(() => {
    if (!data) return;

    const allData = data.data;
    setUserItem(allData);

    const initSelected: SelectedItemState = {
      TOP: null,
      BOTTOM: null,
      ACCESSORY: null,
    };

    allData.forEach((item: Item) => {
      if (item.isEquipped) {
        initSelected[item.itemtype] = item;
      }
    });

    setEquippedItem(initSelected);
    setSelectedItem(initSelected);
  }, [data]);

  const categories: (keyof SelectedItemState)[] = [
    'TOP',
    'BOTTOM',
    'ACCESSORY',
  ];

  const handleModal = (item: Item) => {
    setShowModal(true);
    setModalItem(item);
  };

  const handleSelect = (item: Item) => {
    setSelectedItem((prev) => ({
      ...prev,
      [item.itemtype]: prev[item.itemtype]?.id === item.id ? null : item,
    }));
    setShowModal(false);
  };

  const { mutate: mutateEquipItem } = useMutation({
    mutationFn: equipItem,
    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey: ['user-items'] });
      const previousUserItems = queryClient.getQueryData<{ data: Item[] }>([
        'user-items',
      ]);
      if (previousUserItems) {
        const newData = {
          data: previousUserItems.data.map((item) => {
            const target = previousUserItems.data.find((i) => i.id === itemId);
            const type = target?.itemtype;
            if (!type) return item;
            if (item.id === itemId)
              return { ...item, isEquipped: !item.isEquipped };
            if (item.itemtype === type) return { ...item, isEquipped: false };
            return item;
          }),
        };
        queryClient.setQueryData(['user-items'], newData);
      }
      return { previousUserItems };
    },
    onError: (_err, _itemId, context) => {
      if (context?.previousUserItems) {
        queryClient.setQueryData(['user-items'], context.previousUserItems);
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['user-items'] }),
  });

  const handleSubmit = () => {
    const changedItems: number[] = [];
    categories.forEach((category) => {
      const selected = selectedItem[category];
      const equipped = equippedItem[category];
      if (selected?.id !== equipped?.id) {
        const id = selected?.id ?? equipped?.id;
        if (id !== undefined) {
          changedItems.push(id);
        }
      }
    });

    if (!changedItems.length) return router.push('/mypage');

    changedItems.forEach((id) => mutateEquipItem(id));
    router.push('/mypage');
  };

  const filteredItem =
    selectedTab === '전체'
      ? userItem
      : userItem.filter((item) =>
          item.itemKey.startsWith(
            selectedTab === '상의'
              ? 'top_'
              : selectedTab === '하의'
                ? 'bottom_'
                : 'accessory_',
          ),
        );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[614px] px-4 py-4">
      <BackHeader title="캐릭터 꾸미기" />

      <div className="relative my-6 flex h-[220px] items-center justify-center rounded-lg">
        <Image
          src="/images/itemBackGround.svg"
          alt="bg"
          fill
          className="rounded-lg object-cover"
        />

        <div className="absolute left-5 z-10 space-y-3">
          {(['ACCESSORY', 'TOP', 'BOTTOM'] as const).map((type) => (
            <div
              key={type}
              className="relative h-12 w-12 cursor-pointer rounded border border-[#ffb84c] bg-white"
              onClick={() =>
                selectedItem[type] && handleModal(selectedItem[type]!)
              }
            >
              {selectedItem[type] && (
                <Image
                  src={`/images/items/thumbs/${selectedItem[type]!.itemKey}.png`}
                  alt={type}
                  width={48}
                  height={48}
                  className="object-contain p-1"
                />
              )}
            </div>
          ))}
        </div>

        <div className="relative z-0 h-[140px] w-[140px]">
          <Image
            src="/images/mainCharacter.png"
            alt="기본 캐릭터"
            width={140}
            height={140}
            className="absolute inset-0 z-0"
          />
          {(['TOP', 'BOTTOM', 'ACCESSORY'] as const).map(
            (type, i) =>
              selectedItem[type] && (
                <Image
                  key={type}
                  src={`/images/items/${selectedItem[type]!.itemKey}.png`}
                  alt={type}
                  width={140}
                  height={140}
                  className={`absolute inset-0 z-${10 + i * 10}`}
                />
              ),
          )}
        </div>
      </div>

      <div className="mt-7 mb-7">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={clsx(

                'h-9 px-5 text-sm font-medium rounded cursor-pointer',

                selectedTab === tab
                  ? 'bg-[#ffb84c] text-white'
                  : 'border border-gray-300 bg-white text-gray-400',
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {filteredItem.map((item) => {
            const isSelected =
              selectedItem[item.itemtype]?.itemKey === item.itemKey;
            return (
              <div
                key={item.itemKey}
                className={clsx(
                  'cursor-pointer rounded p-2 text-center text-xs shadow-sm',
                  isSelected
                    ? 'border-2 border-[#ffb84c]'
                    : 'border border-gray-200',
                )}
                onClick={() => handleModal(item)}
              >
                <Image
                  src={`/images/items/thumbs/${item.itemKey}.png`}
                  alt={item.itemName}
                  width={40}
                  height={40}
                  className="mx-auto"
                />

                <div className="mt-1 text-sm font-semibold">{item.itemName}</div>
                <div className="text-[11px] text-gray-500 mt-1 min-h-[1.5em]">

                  {item.itemDescription}
                </div>
              </div>
            );
          })}
        </div>
      </div>


      <div className="mt-10">
        <Button onClick={handleSubmit} className="w-full h-12 text-base">

          저장하기
        </Button>
      </div>

      {showModal && modalItem && (
        <AlertModal
          isOpen={true}
          type="none"
          title={
            selectedItem[modalItem.itemtype]?.itemKey === modalItem.itemKey
              ? `${modalItem.itemName}를\n장착 해제하시겠습니까?`
              : `${modalItem.itemName}를\n장착하시겠습니까?`
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

'use client';

import { ImagePlus } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { use, useEffect, useState } from 'react';
import { ShopItem } from '../../../../../../types/general';
import { AdminItems, EditAdminItemByKey } from '@/api/admin/adminItems';

import Input from '@/app/components/common/ui/Input';
import Button from '@/app/components/common/ui/Button';
import Dropdown from '@/app/components/common/ui/Dropdown';
import AlertModal from '@/app/components/common/alert/AlertModal';

export default function EditItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState('');

  const [itemTitle, setItemTitle] = useState('');
  const [itemKey, setItemKey] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [isListed, setIsListed] = useState(true);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>('');
  const options = ['상의', '하의', '악세사리'];
  const list = [true, false];

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'delete';
    title: string;
    description?: string;
    onConfirm: () => void;
  } | null>(null);

  // 전체 아이템 조회 후 해당 아이템 찾기
  const { data: items = [] } = useQuery({
    queryKey: ['admin-items'],
    queryFn: AdminItems,
    select: (res) => res.data,
  });

  useEffect(() => {
    if (!id || !items.length) return;

    const foundItem = items.find(
      (item: ShopItem) => String(item.itemId) === String(id),
    );
    if (!foundItem) return;

    // 초기 값
    setItemTitle(foundItem.itemName);
    setItemDescription(foundItem.itemDescription ?? '');
    setItemPrice(String(foundItem.itemPrice));
    setSelected(foundItem.itemType);
    setItemKey(foundItem.itemKey);
    setPreviewUrl(`/images/items/thumbs/${foundItem.itemKey}.png`);
  }, [id, items]);

  // 아이템 수정 API 호출
  const { mutate: editItemMutate, isPending } = useMutation({
    mutationFn: ({
      itemName,
      itemPrice,
      itemType,
      itemDescription,
      isListed,
    }: {
      itemName: string;
      itemPrice: number;
      itemType: string;
      itemDescription: string;
      isListed: boolean;
    }) =>
      EditAdminItemByKey(itemKey, {
        itemName,
        itemPrice: itemPrice,
        itemType,
        itemDescription,
        isListed,
      }),

    onSuccess: () => {
      setModalState({
        isOpen: true,
        type: 'success',
        title: '아이템이 성공적으로 수정되었습니다!',
        onConfirm: () => {
          setModalState(null);
          queryClient.invalidateQueries({ queryKey: ['admin-items'] });
          router.push('/admin/shop');
        },
      });
    },

    onError: () => {
      setModalState({
        isOpen: true,
        type: 'delete',
        title: '아이템 수정 실패',
        description: '관리자 확인 요청 바랍니다.',
        onConfirm: () => setModalState(null),
      });
    },
  });

  const handleSubmit = () => {
    if (!itemKey) return;
    editItemMutate({
      itemName: itemTitle,
      itemPrice: Number(itemPrice),
      itemType: selected,
      itemDescription,
      isListed,
    });
  };

  const isDisabled =
    !itemTitle || !itemDescription || !itemPrice || !selected || !previewUrl;

  return (
    <div className="h-1vh flex flex-col gap-6 px-5 py-7">
      <div className="flex flex-col gap-[10px]">
        <h1>아이템 분류</h1>
        <Dropdown
          options={options}
          selected={selected}
          onSelect={(value) => {
            setSelected(value);
          }}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <h1>아이템 이름</h1>
        <Input
          type="text"
          placeholder="ex)민트 티셔츠"
          value={itemTitle}
          onChange={(e) => {
            setItemTitle(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <h1>아이템 이미지</h1>
        <div className="flex h-[121px] w-full flex-col items-center justify-center rounded-[8px] border-1 border-[#e0e0e0]">
          {previewUrl ? (
            <div className="relative h-full w-full">
              <Image
                src={previewUrl}
                alt="preview"
                fill
                className="rounded-[8px] object-contain"
              />
              <button
                className="bg-opacity-50 absolute top-2 right-2 rounded-xl bg-[#ff0000] px-2 py-1 text-xs text-white"
                onClick={() => {
                  setPreviewUrl(null);
                  setImageFile(null);
                }}
              >
                삭제
              </button>
            </div>
          ) : (
            <>
              <label
                htmlFor="item-image"
                className="flex h-[121px] w-full cursor-pointer flex-col items-center justify-center rounded-[8px]"
              >
                <ImagePlus className="h-10 w-10 text-[#9e9e9e]" />
                <input
                  id="item-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      const url = URL.createObjectURL(file);
                      setPreviewUrl(url);
                    }
                  }}
                  className="hidden"
                />
              </label>
            </>
          )}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-[10px]">
          <h1>아이템 설명</h1>
          <Input
            type="text"
            placeholder="ex)시원한 색감의 반팔 티셔츠"
            value={itemDescription}
            onChange={(e) => {
              setItemDescription(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-[10px]">
          <h1>아이템 가격</h1>
          <Input
            type="number"
            placeholder="ex) 500"
            value={itemPrice}
            onChange={(e) => {
              setItemPrice(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="relative mb-4">
        <div className="flex flex-col gap-[10px]">
          <h1>리스트 여부</h1>
          <select
            value={isListed.toString()}
            className="h-12 w-full appearance-none rounded-lg border border-[#E0E0E0] px-4 py-2 pr-10 text-sm focus:outline-none"
            onChange={(e) => setIsListed(e.target.value === 'true')}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <ChevronDown
            className="h-[18px] w-[18px] text-[#616161] cursor-pointer absolute right-4 bottom-1 -translate-y-1/2"
            strokeWidth={2}
          />
        </div>
      </div>
      <Button disabled={isDisabled || isPending} onClick={handleSubmit}>
        등록하기
      </Button>

      {modalState?.isOpen && (
        <AlertModal
          isOpen={modalState.isOpen}
          type={modalState.type}
          title={modalState.title}
          description={modalState.description}
          confirmText="확인"
          onConfirm={modalState.onConfirm}
        />
      )}
    </div>
  );
}

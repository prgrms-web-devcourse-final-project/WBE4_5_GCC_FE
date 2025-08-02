'use client';

import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { AdminItems, AddAdminItems } from '@/api/admin/adminItems';

import Input from '@/app/components/common/ui/Input';
import Button from '@/app/components/common/ui/Button';
import Dropdown from '@/app/components/common/ui/Dropdown';
import AlertModal from '@/app/components/common/alert/AlertModal';
import { ShopItem } from '../../../../../types/general';

const options = ['TOP', 'BOTTOM', 'ACCESSORY'];

export default function AddItem() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [itemType, setItemType] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemKey, setItemKey] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [isListed, setIsListed] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'delete';
    title: string;
    description?: string;
    onConfirm: () => void;
  } | null>(null);

  // 전체 아이템 목록 조회
  const { data: items = [] } = useQuery({
    queryKey: ['admin-items'],
    queryFn: AdminItems,
    select: (res) => res.data,
  });

  // 키 생성 함수
  const generateItemKey = (type: string, index: number) => {
    const prefix = type.toLowerCase();
    const number = String(index).padStart(2, '0');
    return `${prefix}_item_${number}`;
  };

  // 중복되지 않는 키 생성
  const generateUniqueItemKey = async (type: string): Promise<string> => {
    for (let i = 1; i <= 99; i++) {
      const key = generateItemKey(type, i);
      const isDuplicate = items.some((item: ShopItem) => item.itemKey === key);
      if (!isDuplicate) return key;
    }
    throw new Error('사용 가능한 itemKey를 찾을 수 없습니다.');
  };

  const handleGenerateItemKey = async () => {
    if (!itemType) return;
    setIsGenerating(true);
    try {
      const newKey = await generateUniqueItemKey(itemType);
      setItemKey(newKey);
    } catch (error) {
      alert(`itemKey 생성 실패, ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const addItemMutation = useMutation({
    mutationFn: AddAdminItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-items'] }); // 아이템 목록 갱신
      setModalState({
        isOpen: true,
        type: 'success',
        title: '아이템이 성공적으로 추가되었습니다!',
        onConfirm: () => {
          setModalState(null);
          router.push('/admin/shop');
        },
      });
    },
    onError: () => {
      setModalState({
        isOpen: true,
        type: 'delete',
        title: '아이템 추가 실패',
        description: '관리자에게 문의해주세요.',
        onConfirm: () => setModalState(null),
      });
    },
  });

  const handleSubmit = () => {
    addItemMutation.mutate({
      itemKey,
      itemType,
      itemName,
      itemPrice: Number(itemPrice),
      isListed,
      itemDescription,
    });
  };

  const isDisabled =
    !itemType || !itemName || !itemKey || !itemDescription || !itemPrice;

  return (
    <div className="h-1vh flex flex-col gap-6 bg-white px-5 py-7">
      {/* 분류 */}
      <div className="flex flex-col gap-[10px]">
        <h1>아이템 분류</h1>
        <Dropdown
          options={options}
          selected={itemType}
          onSelect={(value) => {
            setItemType(value);
            setItemKey('');
          }}
        />
      </div>

      {/* 이름 */}
      <div className="flex flex-col gap-[10px]">
        <h1>아이템 이름</h1>
        <Input
          type="text"
          placeholder="ex) 민트 티셔츠"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>

      {/* 키 */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center justify-between">
          <span>아이템 키</span>
          <button
            type="button"
            onClick={handleGenerateItemKey}
            className="text-xs text-blue-500 underline"
            disabled={!itemType || isGenerating}
          >
            {isGenerating ? '생성 중...' : '자동 생성'}
          </button>
        </label>
        <Input
          value={itemKey}
          onChange={(e) => setItemKey(e.target.value)}
          placeholder="예: top_item_01"
        />
      </div>

      {/* 이미지 */}
      {/*<div className="flex flex-col gap-[10px]">
        <h1>아이템 이미지</h1>
        <div className="flex h-[121px] w-full items-center justify-center rounded-[8px] border border-[#e0e0e0]">
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
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>*/}

      {/* 설명 */}
      <div className="flex flex-col gap-[10px]">
        <h1>아이템 설명</h1>
        <Input
          type="text"
          placeholder="ex) 시원한 색감의 반팔 티셔츠"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
      </div>

      {/* 가격 */}
      <div className="flex flex-col gap-[10px]">
        <h1>아이템 가격</h1>
        <Input
          type="number"
          min={0}
          placeholder="ex) 500"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
      </div>

      {/* 리스트 여부 */}
      <div className="relative mb-4">
        <div className="flex flex-col gap-[10px]">
          <h1>상점 등록</h1>
          <select
            value={isListed.toString()}
            className="h-12 w-full appearance-none rounded-lg border border-[#E0E0E0] px-4 py-2 pr-10 text-sm focus:outline-none"
            onChange={(e) => setIsListed(e.target.value === 'true')}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <ChevronDown
            className="absolute right-4 bottom-1 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-[#616161]"
            strokeWidth={2}
          />
        </div>
      </div>

      {/* 등록 버튼 */}
      <Button
        disabled={isDisabled || addItemMutation.isPending}
        onClick={handleSubmit}
      >
        등록하기
      </Button>

      {/* 모달 */}
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

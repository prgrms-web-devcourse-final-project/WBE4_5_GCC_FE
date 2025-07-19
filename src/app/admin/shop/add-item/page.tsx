'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/common/ui/Input';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import Dropdown from '@/app/components/common/ui/Dropdown';
import Button from '@/app/components/common/ui/Button';
import AlertModal from '@/app/components/common/alert/AlertModal';
import { AddAdminItems } from '@/api/admin/adminItems';

const options = ['TOP', 'BOTTOM', 'ACCESSORY'];

// 랜덤 키값 생성 (서버와 중복방지 처리는 안 되어 있음)
const generateItemKey = (type: string, index: number) => {
  const prefix = type.toLowerCase();
  const number = String(index).padStart(2, '0');
  return `${prefix}_item_${number}`;
};

export default function AddItem() {
  const router = useRouter();

  const [itemType, setItemType] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemKey, setItemKey] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [modalstate, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'delete';
    title: string;
    description?: string;
    onConfirm: () => void;
  } | null>(null);

  const handleGenerateItemKey = () => {
    const randomIndex = Math.floor(Math.random() * 99) + 1;
    const newKey = generateItemKey(itemType, randomIndex);
    setItemKey(newKey);
  };

  const handleSubmit = async () => {
    try {
      await AddAdminItems({
        itemKey,
        itemName,
        price: Number(itemPrice),
        itemType,
      });

      setModalState({
        isOpen: true,
        type: 'success',
        title: '아이템이 성공적으로 추가되었습니다!',
        onConfirm: () => {
          setModalState(null);
          router.push('/admin/shop');
        },
      });
    } catch (error) {
      setModalState({
        isOpen: true,
        type: 'delete',
        title: '아이템 추가 실패',
        description: '관리자에게 문의해주세요.',
        onConfirm: () => setModalState(null),
      });
    }
  };

  const isDisabled =
    !itemType ||
    !itemName ||
    !itemKey ||
    !itemDescription ||
    !itemPrice ||
    !imageFile;

  return (
    <div className="h-1vh flex flex-col gap-6 px-5 py-7">
      <div className="flex flex-col gap-[10px]">
        <h1>아이템 분류</h1>
        <Dropdown
          options={options}
          selected={itemType}
          onSelect={(value) => {
            setItemType(value);
            setItemKey(''); // 키값 초기화
          }}
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <h1>아이템 이름</h1>
        <Input
          type="text"
          placeholder="ex)민트 티셔츠"
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center justify-between">
          <span>아이템 키</span>
          <button
            type="button"
            onClick={handleGenerateItemKey}
            className="text-xs text-blue-500 underline"
            disabled={!itemType}
          >
            자동 생성
          </button>
        </label>
        <Input
          value={itemKey}
          onChange={(e) => setItemKey(e.target.value)}
          placeholder="예: top_item_01"
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
      <Button disabled={isDisabled} onClick={handleSubmit}>
        등록하기
      </Button>

      {modalstate?.isOpen && (
        <AlertModal
          isOpen={modalstate.isOpen}
          type={modalstate.type}
          title={modalstate.title}
          description={modalstate.description}
          confirmText="확인"
          onConfirm={modalstate.onConfirm}
        />
      )}
    </div>
  );
}

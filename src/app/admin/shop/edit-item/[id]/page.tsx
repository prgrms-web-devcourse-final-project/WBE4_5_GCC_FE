'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import item1 from '@/app/assets/images/item1.png';
import Input from '@/app/components/common/ui/Input';

import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import Dropdown from '@/app/components/common/ui/Dropdown';
import Button from '@/app/components/common/ui/Button';
import { AdminItemById, EditAdminItemById } from '@/api/admin/adminItems';
import AlertModal from '@/app/components/common/alert/AlertModal';

export default function EditItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [selected, setSelected] = useState('');

  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(item1.src);
  const options = ['상의', '하의', '악세사리'];

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'delete';
    title: string;
    description?: string;
    onConfirm: () => void;
  } | null>(null);

  const handleSubmit = async () => {
    try {
      await EditAdminItemById(id, {
        itemKey: `${selected.toLowerCase()}_item_000`, // itemKey 입력란 필요할 듯
        itemName: itemTitle,
        price: Number(itemPrice),
        itemType: selected,
      });
      setModalState({
        isOpen: true,
        type: 'success',
        title: '아이템이 성공적으로 수정되었습니다!',
        onConfirm: () => {
          setModalState(null);
          router.push('/admin/shop');
        },
      });
    } catch (error) {
      setModalState({
        isOpen: true,
        type: 'delete',
        title: '아이템 수정 실패',
        description: '관리자 확인 요청 바랍니다.',
        onConfirm: () => setModalState(null),
      });
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await AdminItemById(id);
        const data = res.data;

        setItemTitle(data.itemName);
        setItemDescription(data.itemDescription ?? '');
        setItemPrice(String(data.itemPrice));
        setSelected(data.itemType);
        //setPreviewUrl(data.itemImageUrl ?? item1); //이미지 필드 어떻게 받아올 지 (itemImageUrl 같은 건 응답 값에 없음 -> 임시)
      } catch (error) {
        console.error('아이템 상세 정보 조회 실패', error);
      }
    };
    fetchItem();
  }, [id]);

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
      <Button disabled={isDisabled} onClick={handleSubmit}>
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

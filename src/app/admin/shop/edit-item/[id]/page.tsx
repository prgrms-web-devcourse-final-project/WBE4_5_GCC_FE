'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import item1 from '@/app/assets/images/item1.png';
import Input from '@/app/components/common/ui/Input';

import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import Dropdown from '@/app/components/common/ui/Dropdown';
import Button from '@/app/components/common/ui/Button';

export default function EditItem({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selected, setSelected] = useState('');

  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const options = ['상의', '하의', '악세사리'];

  const items = [
    {
      id: 1,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '상의',
      price: 200,
    },
    {
      id: 2,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '상의',
      price: 1000,
    },
    {
      id: 3,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '상의',
      price: 700,
    },
    {
      id: 4,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '하의',
      price: 800,
    },
    {
      id: 5,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 2200,
    },
    {
      id: 6,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 5200,
    },
    {
      id: 7,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 200,
    },
    {
      id: 8,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 100,
    },
    {
      id: 9,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 900,
    },
    {
      id: 10,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 10,
    },
    {
      id: 11,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 300,
    },
    {
      id: 12,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '액세서리',
      price: 1200,
    },
    {
      id: 13,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '상의',
      price: 1200,
    },
    {
      id: 14,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '하의',
      price: 6200,
    },
    {
      id: 15,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '하의',
      price: 200,
    },
    {
      id: 16,
      image: item1,
      name: '인형탈',
      description: '누군가 닮았어요.',
      category: '하의',
      price: 1200,
    },
  ];

  const item = items.find((i) => i.id === Number(params.id));

  useEffect(() => {
    if (!item) return;
    setItemTitle(item.name);
    setItemDescription(item.description);
    setItemPrice(String(item.price));
    setSelected(item.category);
    setPreviewUrl(item.image.src);
  }, [item]);

  if (!item) return notFound();

  const isDisabled =
    !itemTitle || !itemDescription || !itemPrice || !selected || !imageFile;

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
      {/* onClick={handleSubmit} */}
      <Button disabled={isDisabled}>등록하기</Button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/common/ui/Input';

import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import Dropdown from '@/app/components/common/ui/Dropdown';
import Button from '@/app/components/common/ui/Button';

export default function AddItem() {
  const router = useRouter();
  const [selected, setSelected] = useState('');

  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const options = ['상의', '하의', '악세사리'];

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

// 서버로 전송하는 법이래요... 지피티한테 물어봐야할듯

// const handleSubmit = async () => {
//   if (!itemTitle || !itemDescription || !itemPrice || !category || !imageFile) {
//     alert('모든 항목을 입력해주세요');
//     return;
//   }

//   const formData = new FormData();
//   formData.append('title', itemTitle);
//   formData.append('description', itemDescription);
//   formData.append('price', itemPrice.toString());
//   formData.append('category', category);
//   formData.append('image', imageFile); // 서버에서 'image' 필드로 받아야 함

//   try {
//     const res = await fetch('/api/items', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!res.ok) throw new Error('업로드 실패');
//     alert('업로드 성공!');
//     router.push('/'); // 목록 페이지 등으로 이동
//   } catch (error) {
//     console.error(error);
//     alert('업로드 실패');
//   }
// };

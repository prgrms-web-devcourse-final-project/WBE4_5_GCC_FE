'use client';
import { useState } from 'react';
import BottomSheet from '../common/ui/BottomSheet';
import Input from '../common/ui/Input';
import { X } from 'lucide-react';

// 언제할래요 바텀시트
export default function CategoryEdit({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [value, setValue] = useState('');
  const handleClick = () => {
    setIsOpen(false);
  };
  return (
    <>
      <BottomSheet
        className="max-h-[176px] px-5 py-8"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="flex items-center justify-between">
          <X className="h-3 w-3 cursor-pointer" onClick={handleClick} />
          <h2 className="text-base font-semibold text-black">
            카테고리 이름을 입력하세요.
          </h2>
          <button className="cursor-pointer text-sm" onClick={handleClick}>
            확인
          </button>
        </div>
        <Input
          className="my-[18px] px-3"
          placeholder="ex) 식비"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </BottomSheet>
    </>
  );
}

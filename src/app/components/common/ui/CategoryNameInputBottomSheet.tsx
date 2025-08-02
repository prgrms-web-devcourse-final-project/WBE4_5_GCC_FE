'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function CategoryNameInputBottomSheet({
  onClose,
  onSubmit,
}: Props) {
  const [subCatName, setSubCatName] = useState('');

  const handleSubmit = () => {
    if (subCatName.trim()) {
      onSubmit(subCatName);
      setSubCatName('');
      onClose();
    }
  };

  const handleOutsideClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222] dark:bg-[var(--dark-gray-200)]/50"
      onClick={handleOutsideClick}
    >
      <div
        className="min-h-[443px] w-full rounded-t-[24px] bg-white px-3 py-6 dark:bg-[var(--dark-bg-primary)]"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        {/* 헤더 */}
        <div className="flex justify-between text-[#222222] dark:text-[var(--dark-gray-700)]">
          <X onClick={() => onClose()} className="h-auto w-6 cursor-pointer" />
          <p className="text-lg font-medium">카테고리 이름을 입력하세요</p>
          <button onClick={handleSubmit} className="cursor-pointer text-sm">
            확인
          </button>
        </div>
        {/* 인풋창 */}
        <div className="mt-[27px] flex h-[62px] min-w-[354px] justify-start rounded-lg border border-[#222222] px-4 py-5">
          <input
            type="text"
            placeholder="ex.식비"
            value={subCatName}
            onChange={(e) => setSubCatName(e.target.value)}
            className="focus:border-transparent focus:ring-0 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

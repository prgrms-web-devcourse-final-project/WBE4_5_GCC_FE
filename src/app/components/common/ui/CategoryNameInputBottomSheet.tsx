'use client';

import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function CategoryNameInputBottomSheet({ onClose } : Props) {

  const handleOutsideClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/50"
      onClick={handleOutsideClick}
    >
      <div
        className="min-h-[443px] w-full px-3 py-6 rounded-t-[24px] bg-white"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        {/* 헤더 */}
        <div className="flex justify-between text-[#222222]">
          <X
            onClick={() => onClose()}  
            className="w-6 h-auto cursor-pointer"
          />
          <p className="text-lg font-medium">카테고리 이름을 입력하세요</p>
          <button
            onClick={() => onClose()} 
            className="text-sm cursor-pointer"
          >
            확인
          </button>
        </div>
        {/* 인풋창 */}
        <div className="mt-[27px] min-w-[354px] h-[62px] px-4 py-5 flex justify-start border border-[#222222] rounded-lg">
          <input 
            type="text"
            placeholder="ex.식비" 
            className="focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
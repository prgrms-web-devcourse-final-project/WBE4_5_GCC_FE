'use client';

import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { BadgeQuestionMark } from 'lucide-react';
import CategoryNameInputBottomSheet from '@/app/components/common/ui/CategoryNameInputBottomSheet';

export default function page () {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-8 px-5 py-7">

        <div className="flex items-center gap-3">
          {/* 좌측 아이콘 영역 */}
          <div className="flex justify-center items-center w-[45px] h-[45px] rounded-lg border border-[#E0E0E0]">
            <BadgeQuestionMark className="w-6 h-auto text-[#9E9E9E]" strokeWidth={2}/>
          </div>

          {/* 우측 인풋 영역 */}
          <div className="min-w-70 py-2 border border-transparent border-b-[#E0E0E0] text-xl text-[#9E9E9E]">
            <input 
              type="text" 
              placeholder="카테고리 이름 입력"
              className="focus:outline-none focus:ring-0 focus:border-transparent"
              onFocus={() => setIsBottomSheetOpen(true)}
            />
          </div>
        </div>

        <button className="flex gap-2">
          <CirclePlus className="w-5 h-auto fill-[#388E3C] text-white "/>
          <p className="text-medium text-base text-[#388E3C]">세부 카테고리</p>
        </button>
      </div>

      {isBottomSheetOpen && (
        <CategoryNameInputBottomSheet onClose={() => setIsBottomSheetOpen(false)} />
      )}
    </>
  );
}
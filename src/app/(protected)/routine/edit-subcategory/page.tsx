'use client';

import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { CircleMinus } from 'lucide-react';
import { BadgeQuestionMark } from 'lucide-react';
import AlertModal from '@/app/components/common/alert/AlertModal';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-7 px-5 py-7">
        <div className="flex items-center gap-3">
          {/* 좌측 아이콘 영역 */}
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-lg border border-[#E0E0E0]">
            <BadgeQuestionMark
              className="h-auto w-6 text-[#9E9E9E]"
              strokeWidth={2}
            />
          </div>

          {/* 우측 인풋 영역 */}
          <div className="min-w-70 border border-transparent border-b-[#E0E0E0] py-2 text-xl text-[#9E9E9E]">
            <input
              type="text"
              placeholder="카테고리 이름 입력"
              className="focus:border-transparent focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        <button className="flex gap-2">
          <CirclePlus className="h-auto w-5 fill-[#388E3C] text-white" />
          <p className="text-medium text-base text-[#388E3C]">세부 카테고리</p>
        </button>

        {/* 소분류 영역 */}
        <div className="flex flex-col gap-5">
          <div className="flex gap-2.5">
            <button onClick={() => setIsModalOpen(true)}>
              <CircleMinus className="h-auto w-5 fill-[#D32F2F] text-white" />
            </button>
            <p className="min-w-[307px] border border-transparent border-b-[#E0E0E0] text-sm text-black">
              잠옷
            </p>
          </div>

          <div className="flex gap-2.5">
            <button onClick={() => setIsModalOpen(true)}>
              <CircleMinus className="h-auto w-5 fill-[#D32F2F] text-white" />
            </button>
            <p className="min-w-[307px] border border-transparent border-b-[#E0E0E0] text-sm text-black">
              작업복
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AlertModal
          isOpen={true}
          type="delete"
          title="정말 삭제하시겠습니까?"
          description="삭제 후 복구가 불가능합니다."
          confirmText="삭제"
          cancelText="취소"
          onConfirm={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

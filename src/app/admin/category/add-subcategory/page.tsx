'use client';

import { useState } from 'react';
import { BadgeQuestionMark } from 'lucide-react';
import CategoryEdit from '@/app/components/admin/CategoryEdit';

export default function EditSubcategoryPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div>
        <div className="flex flex-col">
          <div>
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
                  <button
                    className="focus:border-transparent focus:ring-0 focus:outline-none"
                    onClick={() => setIsOpen(true)}
                  >
                    카테고리의 이름 입력
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CategoryEdit isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}

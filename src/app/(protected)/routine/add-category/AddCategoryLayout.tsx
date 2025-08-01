'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function AddCategoryLayout({
  children,
  onComplete,
  isLoading = false,
}: {
  children: React.ReactNode;
  onComplete: () => void;
  isLoading?: boolean;
}) {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col">
        <header className="relative flex w-full items-center justify-between border-[0.5px] border-transparent border-b-[#CCCCCC] px-3 py-4">
          <div>
            <ChevronLeft
              className="h-auto w-6 text-[#222222]"
              strokeWidth={2}
              onClick={() => router.push('/routine/edit-category')}
            />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#222222]">
            카테고리 추가
          </div>

          <div className="text-medium flex gap-[7px] text-sm text-[#616161]">
            <button
              onClick={onComplete}
              disabled={isLoading}
              className={`cursor-pointer ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              완료
            </button>
          </div>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
}

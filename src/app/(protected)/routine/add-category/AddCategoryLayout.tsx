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
      <div className="flex min-h-screen flex-col">
        <header className="relative flex w-full items-center justify-between border-[0.5px] border-transparent border-b-[var(--gray-200)] px-3 py-4">
          <div>
            <ChevronLeft
              className="h-auto w-6 text-[var(--black)] dark:text-[var(--dark-gray-700)]"
              strokeWidth={2}
              onClick={() => router.push('/routine/edit-category')}
            />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[var(--black)] dark:text-[var(--dark-gray-700)]">
            카테고리 추가
          </div>

          <div className="text-medium flex gap-[7px] text-sm text-[var(--gray-700)]">
            <button
              onClick={onComplete}
              disabled={isLoading}
              className={`cursor-pointer dark:text-[var(--dark-gray-700)] ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
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

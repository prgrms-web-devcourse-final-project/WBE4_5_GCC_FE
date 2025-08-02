'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditSubcategoryLayout({
  children,
  label,
  onComplete,
}: {
  children: React.ReactNode;
  label: string;
  onComplete?: () => void;
}) {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col">
        <header className="relative flex w-full items-center justify-between border-[0.5px] border-transparent border-b-[var(--gray-200)] px-3 py-4">
          <div>
            <ChevronLeft
              className="h-auto w-6 text-[var(--black)] dark:text-[var(--dark-gray-700)]"
              strokeWidth={2}
              onClick={() => router.push('/routine/edit-category')}
            />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[var(--black)] dark:text-[var(--dark-gray-700)]">
            {label}
          </div>

          <div className="text-medium flex gap-[7px] text-sm text-[var(--gray-700)] dark:text-[var(--dark-gray-700)]">
            <button onClick={onComplete} className="cursor-pointer">
              완료
            </button>
          </div>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
}

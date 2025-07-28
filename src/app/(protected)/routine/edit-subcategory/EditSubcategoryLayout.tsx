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
        <header className="relative flex w-full items-center justify-between border-[0.5px] border-transparent border-b-[#CCCCCC] px-3 py-4">
          <div>
            <ChevronLeft
              className="h-auto w-6 text-[#222222]"
              strokeWidth={2}
              onClick={() => router.push('/routine/edit-category')}
            />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#222222]">
            {label}
          </div>

          <div className="text-medium flex gap-[7px] text-sm text-[#616161]">
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

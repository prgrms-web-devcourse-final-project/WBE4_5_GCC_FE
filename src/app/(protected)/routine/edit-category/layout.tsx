// EditCategoryLayout.tsx
'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  EditModeProvider,
  useEditMode,
} from '@/app/components/routine/EditModeContext';

function Header() {
  const router = useRouter();
  const { isEditMode, toggleEditMode } = useEditMode();

  const handleAddCat = () => {
    router.push('/routine/add-category');
  };

  return (
    <header className="relative flex w-full items-center justify-between border-b border-[#CCCCCC] px-3 py-4">
      <Link href="/routine/add-routine">
        <ChevronLeft className="h-auto w-6 text-[#222222]" strokeWidth={2} />
      </Link>
      <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#222222]">
        카테고리 편집
      </div>
      <div className="flex gap-[7px] text-sm text-[#616161]">
        <button onClick={handleAddCat} className="cursor-pointer">
          추가
        </button>
        <button onClick={toggleEditMode} className="cursor-pointer">
          {isEditMode ? '완료' : '편집'}
        </button>
      </div>
    </header>
  );
}

export default function EditCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EditModeProvider>
      <div className="flex flex-col">
        <Header />
        <div>{children}</div>
      </div>
    </EditModeProvider>
  );
}

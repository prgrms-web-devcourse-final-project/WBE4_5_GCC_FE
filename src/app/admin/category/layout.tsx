'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  EditModeProvider,
  useEditMode,
} from '@/app/components/routine/EditModeContext';
import {
  CategoryFormProvider,
  useCategoryForm,
} from '@/app/components/admin/context/CategoryFormContext';
import { CreateAdminCategories } from '@/api/admin/adminCategories';

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isEditPage = pathname === '/admin/category';
  const isAddCategoryPage = pathname === '/admin/category/add-category';
  const { isEditMode, toggleEditMode } = useEditMode();

  // CategoryFromContext
  const { name } = useCategoryForm();

  const handleFinish = async () => {
    if (!name) {
      alert('이모지와 카테고리 이름을 모두 입력해주세요.');
      return;
    }

    try {
      await CreateAdminCategories({
        categoryName: name,
        //emoji,
        categoryType: 'MAJOR',
      });
      router.back();
    } catch (error) {
      console.error('카테고리 생성 중 오류 발생:', error);
    }
  };

  const handleAddCat = () => {
    router.push('/admin/category/add-category');
  };

  const pageTitle =
    pathname === '/admin/category/add-category'
      ? '카테고리 추가'
      : '카테고리 관리';

  return (
    <header className="relative flex w-full items-center justify-between border-b border-[#CCCCCC] px-3 py-4">
      <ChevronLeft
        className="h-auto w-6 text-[#222222]"
        strokeWidth={2}
        onClick={handleFinish}
      />
      <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#222222]">
        {pageTitle}
      </div>
      <div className="text-medium flex gap-[7px] text-sm text-[#616161]">
        {isEditPage && (
          <>
            <button onClick={handleAddCat} className="cursor-pointer">
              추가
            </button>
            <button onClick={toggleEditMode} className="cursor-pointer">
              {isEditMode ? '완료' : '편집'}
            </button>
          </>
        )}

        {isAddCategoryPage && (
          <button className="cursor-pointer" onClick={handleFinish}>
            완료
          </button>
        )}
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
      <CategoryFormProvider>
        <div className="flex flex-col">
          <Header />
          <div>{children}</div>
        </div>
      </CategoryFormProvider>
    </EditModeProvider>
  );
}

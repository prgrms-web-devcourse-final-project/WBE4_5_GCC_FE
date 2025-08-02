'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  const isEditPage = pathname === '/admin/category';
  const isAddCategoryPage = pathname === '/admin/category/add-category';
  const { isEditMode, toggleEditMode } = useEditMode();
  const { emoji, name } = useCategoryForm(); // CategoryFromContext

  // 카테고리 생성
  const { mutate, isPending } = useMutation({
    mutationFn: CreateAdminCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] }); // 카테고리 목록 갱신
      router.back();
    },
    onError: (error) => {
      console.error('카테고리 생성 중 오류 발생:', error);
      alert('카테고리 생성 중 오류 발생');
    },
  });

  const handleSubmit = async () => {
    if (!name || !emoji) {
      alert('이모지와 카테고리 이름을 모두 입력해주세요.');
      return;
    }
    //console.log('제출 데이터:', { name, emoji });
    mutate({ categoryName: name, emoji }); // 최신 값이 들어감
  };

  const handleAddCat = () => {
    router.push('/admin/category/add-category');
  };

  const pageTitle =
    pathname === '/admin/category/add-category'
      ? '카테고리 추가'
      : '카테고리 관리';

  return (
    <header className="relative flex w-full items-center justify-between border-b border-[#cccccc] px-3 py-4">
      <ChevronLeft
        className="h-auto w-6 text-[#222222] dark:text-[var(--dark-gray-700)]"
        strokeWidth={2}
        onClick={router.back}
      />
      <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
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
          <button
            className="cursor-pointer"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? '등록 중...' : '완료'}
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

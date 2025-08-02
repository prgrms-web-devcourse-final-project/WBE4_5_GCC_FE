'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CirclePlus, CircleMinus } from 'lucide-react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import EditSubcategoryLayout from './EditSubcategoryLayout';
import AlertModal from '@/app/components/common/alert/AlertModal';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';
import CategoryNameInputBottomSheet from '@/app/components/common/ui/CategoryNameInputBottomSheet';

import {
  getCategories,
  DeleteCategoryById,
  CreateCategory,
  EditCategoryById,
} from '@/api/categories';
import { CategoryItem } from '../../../../../types/general';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const icon = searchParams.get('icon');
  const labelFromParams = searchParams.get('label');
  const categoryIdFromParams = searchParams.get('categoryId');

  const [label, setLabel] = useState('');
  const [categoryType, setCategoryType] = useState<
    'DEFAULT' | 'MAJOR' | 'SUB'
  >();
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<CategoryItem[]>([]);

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const pickerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery<CategoryItem[], Error>({
    queryKey: ['user-categories'],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!categories || !labelFromParams) return;
    const target = categories.find(
      (cat) => String(cat.categoryId) === categoryIdFromParams,
    );
    if (target) {
      setLabel(target.categoryName);
      setCategoryType(target.categoryType);
      setSelectedEmoji(target.emoji || icon || null);
      setSubCategories(target.children || []);
    }
  }, [categories, categoryIdFromParams, icon, labelFromParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };
    if (isPickerOpen)
      document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPickerOpen]);

  // 커스텀 카테고리의 MAJOR 카테고리 수정
  const editMajorCategoryMutation = useMutation({
    mutationFn: (payload: { categoryName: string; emoji: string | null }) => {
      if (!originalParent) throw new Error('수정할 카테고리 없음');
      return EditCategoryById(originalParent.categoryId, {
        categoryName: payload.categoryName,
        categoryType: 'MAJOR',
        parentId: null,
        emoji: payload.emoji,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-categories'] });
    },
    onError: (err) => {
      console.error('카테고리 수정 실패', err);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: DeleteCategoryById,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['user-categories'] });
      setSubCategories((prev) =>
        prev.filter((cat) => cat.categoryId !== deletedId),
      );
      setIsModalOpen(false);
      setDeleteTargetId(null);
    },
  });

  const originalParent = categories.find(
    (cat) => String(cat.categoryId) === categoryIdFromParams,
  );

  console.log('원본 부모:', originalParent);

  const handleAddSubCategory = async (newSubName: string) => {
    if (!label || !originalParent) return;
    const payload = {
      categoryName: newSubName,
      categoryType: 'SUB',
      parentId: originalParent.categoryId,
      emoji: null,
    };
    try {
      await CreateCategory(payload);
      queryClient.invalidateQueries({ queryKey: ['user-categories'] });
    } catch (err) {
      alert('세부 카테고리 추가 실패');
      console.error('추가 실패 payload:', payload, err);
    }
  };

  const handleComplete = () => {
    router.push('/routine/edit-category');
    queryClient.invalidateQueries({ queryKey: ['user-categories'] });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <EditSubcategoryLayout onComplete={handleComplete} label={label}>
        <div className="flex min-h-screen flex-col gap-7 px-5 py-7">
          <div className="flex items-center gap-3">
            <div
              onClick={() =>
                categoryType !== 'DEFAULT' && setIsPickerOpen(true)
              }
              className={`flex h-[45px] w-[45px] items-center justify-center rounded-lg border border-[var(--gray-300)] ${categoryType === 'DEFAULT' ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span className="text-2xl">{selectedEmoji || icon}</span>
            </div>

            <div className="w-70 flex-auto border border-transparent border-b-[var(--gray-300)] py-2 text-xl text-black dark:text-[var(--dark-gray-700)]">
              <input
                type="text"
                value={label}
                placeholder="카테고리 이름 입력"
                onChange={(e) => {
                  const newName = e.target.value;
                  setLabel(newName);

                  if (categoryType === 'MAJOR') {
                    editMajorCategoryMutation.mutate({
                      categoryName: newName,
                      emoji: selectedEmoji,
                    });
                  }
                }}
                disabled={categoryType === 'DEFAULT'}
                className="focus:border-transparent focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={() => setIsBottomSheetOpen(true)}
            className="flex gap-2"
          >
            <CirclePlus className="h-auto w-5 fill-[#388E3C] text-white dark:text-[var(--dark-bg-primary)]" />
            <p className="text-medium text-base text-[#388E3C]">
              세부 카테고리
            </p>
          </button>

          <div className="flex flex-col gap-5">
            {subCategories.map((sub) => (
              <div key={sub.categoryId} className="flex gap-2.5">
                <button
                  onClick={() => {
                    setDeleteTargetId(sub.categoryId);
                    setIsModalOpen(true);
                  }}
                >
                  <CircleMinus className="h-auto w-5 fill-[#D32F2F] text-white dark:text-[var(--dark-bg-primary)]" />
                </button>
                <p className="w-[307px] flex-auto border border-transparent border-b-[var(--gray-300)] text-sm text-black">
                  {sub.categoryName}
                </p>
              </div>
            ))}
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
            onCancel={() => {
              setIsModalOpen(false);
              setDeleteTargetId(null);
            }}
            onConfirm={() => {
              if (deleteTargetId !== null) {
                deleteCategoryMutation.mutate(deleteTargetId);
              }
            }}
          />
        )}

        {isBottomSheetOpen && (
          <CategoryNameInputBottomSheet
            onClose={() => setIsBottomSheetOpen(false)}
            onSubmit={async (newSubName) => {
              await handleAddSubCategory(newSubName);
              setIsBottomSheetOpen(false);
            }}
          />
        )}
      </EditSubcategoryLayout>

      {isPickerOpen && (
        <div ref={pickerRef} className="absolute top-47 left-5 z-50">
          <EmojiPicker
            onEmojiClick={(emojiData: EmojiClickData) => {
              const newEmoji = emojiData.emoji;
              setSelectedEmoji(newEmoji);
              setIsPickerOpen(false);

              if (categoryType === 'MAJOR') {
                editMajorCategoryMutation.mutate({
                  categoryName: label,
                  emoji: newEmoji,
                });
              }
            }}
          />
        </div>
      )}
    </>
  );
}

'use client';

import { CirclePlus } from 'lucide-react';
import { CircleMinus } from 'lucide-react';
import { BadgeQuestionMark } from 'lucide-react';

import EditSubcategoryLayout from './EditSubcategoryLayout';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import AlertModal from '@/app/components/common/alert/AlertModal';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';
import CategoryNameInputBottomSheet from '@/app/components/common/ui/CategoryNameInputBottomSheet';

import { useEffect, useRef, useState } from 'react';
import { CategoryItem } from '../../../../../types/general';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCategories,
  DeleteCategoryById,
  EditCategoryById,
} from '@/api/categories';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const icon = searchParams.get('icon');
  const labelFromParams = searchParams.get('label');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const [label, setLabel] = useState('');
  const [subCategories, setSubCategories] = useState<CategoryItem[]>([]);
  const [categoryType, setCategoryType] = useState<'MAJOR' | 'SUB'>();
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const queryClient = useQueryClient();
  const pickerRef = useRef<HTMLDivElement>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  // 이모지 클릭 핸들러
  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji);
    setIsPickerOpen(false);
  };

  // 이모지 피커 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };

    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);

  useEffect(() => {
    if (labelFromParams) setLabel(labelFromParams);
  }, [labelFromParams]);

  // 카테고리 목록 조회
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useQuery<CategoryItem[], Error>({
    queryKey: ['edit-subcategory'],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });

  // 서브(소분류) 카테고리 수정
  const editSubCategories = async (subCategories: CategoryItem[]) => {
    return await Promise.all(
      subCategories.map((sub) =>
        EditCategoryById(sub.categoryId, {
          categoryName: sub.categoryName,
          categoryType: 'SUB',
          parentName: label,
          emoji: null,
        }),
      ),
    );
  };

  const editCategoryMutation = useMutation({
    mutationFn: editSubCategories,
    onSuccess: () => {
      alert('카테고리 수정 완료!');
      queryClient.invalidateQueries({ queryKey: ['edit-subcategory'] });
      router.push('/routine/edit-category');
    },
    onError: (error) => {
      console.error('카테고리 수정 실패', error);
      alert('카테고리 수정에 실패했습니다.');
    },
  });

  // 카테고리 삭제
  const deleteCategoryMutation = useMutation({
    mutationFn: DeleteCategoryById,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['delete-subcategory'] });
      setSubCategories((prev) =>
        prev.filter((cat) => cat.categoryId !== deletedId),
      );
      setIsModalOpen(false);
      setDeleteTargetId(null);
    },
    onError: (error) => {
      console.error('삭제 실패', error);
      alert('삭제 실패');
      setIsModalOpen(false);
    },
  });

  // MAJOR 카테고리는 이름 수정 막기
  useEffect(() => {
    if (!categories || !labelFromParams) return;
    const matched = categories.find(
      (cat) => cat.categoryName === labelFromParams,
    );
    if (matched) {
      setCategoryType(matched.categoryType);
      setLabel(matched.categoryName);
    }
  }, [categories, labelFromParams]);

  // 서브 카테고리 불러오기
  useEffect(() => {
    if (!categories || !label) return;

    const major = categories.find(
      (cat) => cat.categoryName === label && cat.categoryType === 'MAJOR',
    );

    const newSubCategories = major?.children ?? [];

    // 현재 subCategories와 다를 때만 set
    setSubCategories((prev) => {
      const isSame =
        prev.length === newSubCategories.length &&
        prev.every(
          (prevCat, index) =>
            prevCat.categoryId === newSubCategories[index].categoryId,
        );
      return isSame ? prev : newSubCategories;
    });
  }, [categories, label]);

  // 완료 버튼에서 카테고리 수정 API 호출
  const handleComplete = async () => {
    if (!label || categoryType === 'SUB') {
      alert('카테고리 정보를 확인해주세요.');
      return;
    }
    editCategoryMutation.mutate(subCategories);
  };

  // 헤더 완료 버튼 클릭 시 서브 카테고리 저장
  const handleAddSubCategory = (newSubName: string) => {
    setSubCategories((prev) => [
      ...prev,
      {
        categoryId: 1, // 여기 Id 값 어떤 걸로 전달 할 지.. 현재 스웨거에서는 id가 1,2,3 인 데이터에 대해서만 수정 요청을 할 수 있도록 되어 있음.
        categoryName: newSubName,
        categoryType: 'SUB',
        parentName: label,
      },
    ]);
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
        <div className="flex flex-col gap-7 px-5 py-7">
          <div className="flex items-center gap-3">
            {/* 좌측 아이콘 영역 */}
            <div
              onClick={() => setIsPickerOpen(true)}
              className="flex h-[45px] w-[45px] items-center justify-center rounded-lg border border-[#E0E0E0]"
            >
              {selectedEmoji ? (
                <span className="text-2xl">{selectedEmoji}</span>
              ) : (
                <span className="text-2xl">{icon}</span>
              )}
            </div>

            {/* 우측 인풋 영역 */}
            <div className="w-70 flex-auto border border-transparent border-b-[#E0E0E0] py-2 text-xl text-black">
              <input
                type="text"
                value={label}
                placeholder="카테고리 이름 입력"
                onChange={(e) => setLabel(e.target.value)}
                className="focus:border-transparent focus:ring-0 focus:outline-none"
                disabled={categoryType === 'MAJOR'}
              />
            </div>
          </div>

          {/* 서브 카테고리 추가 */}
          <button
            onClick={() => {
              //setMode('SUB');
              setIsBottomSheetOpen(true);
            }}
            className="flex gap-2"
          >
            <CirclePlus className="h-auto w-5 fill-[#388E3C] text-white" />
            <p className="text-medium text-base text-[#388E3C]">
              세부 카테고리
            </p>
          </button>

          {/* 소분류 (서브 카테고리) 영역 */}
          <div className="flex flex-col gap-5">
            {subCategories.map((sub) => (
              <div key={sub.categoryId} className="flex gap-2.5">
                <button
                  onClick={() => {
                    setDeleteTargetId(sub.categoryId);
                    setIsModalOpen(true);
                  }}
                >
                  <CircleMinus className="h-auto w-5 fill-[#D32F2F] text-white" />
                </button>
                <p className="w-[307pxp] flex-auto border border-transparent border-b-[#E0E0E0] text-sm text-black">
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
            onSubmit={(newSubName) => {
              handleAddSubCategory(newSubName);
              setIsBottomSheetOpen(false);
            }}
          />
        )}
      </EditSubcategoryLayout>
      {/* Emoji picker modal */}
      {isPickerOpen && (
        <div ref={pickerRef} className="absolute top-47 left-5 z-50">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </>
  );
}

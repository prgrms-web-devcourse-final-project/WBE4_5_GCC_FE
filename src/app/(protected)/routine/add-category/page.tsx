'use client';

import { BadgeQuestionMark } from 'lucide-react';
import { CirclePlus, CircleMinus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CreateCategory } from '@/api/categories';
import { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import AddCategoryLayout from './AddCategoryLayout';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import CategoryNameInputBottomSheet from '@/app/components/common/ui/CategoryNameInputBottomSheet';

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pickerRef = useRef<HTMLDivElement>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [mode, setMode] = useState<'MAJOR' | 'SUB' | null>(null); // 바텀 시트를 열은 버튼의 출처 (대분류 카테고리 인풋창 or 세부 카테고리 추가 버튼)

  const [mainCategoryName, setMainCategoryName] = useState('');
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  // 이모지 클릭 핸들러
  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji);
    setIsPickerOpen(false);
  };

  // 서브 카테고리 삭제
  const handleRemoveSub = (index: number) => {
    setSubCategories((prev) => prev.filter((_, i) => i !== index));
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

  const createCategoryMutation = useMutation({
    mutationFn: (category: {
      categoryName: string;
      categoryType: 'MAJOR' | 'SUB';
      emoji: string | null;
      parentName: string | null;
    }) => CreateCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['add-category'] });
    },
    onError: (error) => {
      console.log('카테고리 생성 실패', error);
      alert('카테고리 생성 실패');
    },
  });

  // 헤더 완료 버튼 클릭 시 카테고리 생성 API 호출
  const handleComplete = async () => {
    if (!mainCategoryName || !selectedEmoji) {
      alert('대분류 이름과 이모지를 입력해주세요');
      return;
    }

    try {
      await createCategoryMutation.mutateAsync({
        categoryName: mainCategoryName,
        categoryType: 'MAJOR',
        emoji: selectedEmoji,
        parentName: null,
      });

      await Promise.all(
        subCategories.map((subName) =>
          createCategoryMutation.mutateAsync({
            categoryName: subName,
            categoryType: 'SUB',
            emoji: null,
            parentName: mainCategoryName,
          }),
        ),
      );

      alert('카테고리 생성 완료!');
      router.push('/routine/edit-category');
    } catch (err) {
      console.error('카테고리 생성 실패', err);
    }
  };

  return (
    <>
      <AddCategoryLayout onComplete={handleComplete}>
        <div className="flex flex-col gap-7 px-5 py-7">
          <div className="relative flex items-center gap-3">
            {/* 좌측 아이콘 영역 */}
            <div
              onClick={() => setIsPickerOpen(true)}
              className="flex min-h-[45px] min-w-[45px] items-center justify-center rounded-lg border border-[#E0E0E0]"
            >
              {selectedEmoji ? (
                <span className="text-2xl">{selectedEmoji}</span>
              ) : (
                <BadgeQuestionMark
                  className="h-auto w-6 text-[#9E9E9E]"
                  strokeWidth={2}
                />
              )}
            </div>

            {/* 우측 인풋 영역 */}
            <div className="w-full min-w-70 border border-transparent border-b-[#E0E0E0] py-2 text-xl text-black">
              <input
                type="text"
                value={mainCategoryName}
                placeholder="카테고리 이름 입력"
                className="focus:border-transparent focus:ring-0 focus:outline-none"
                onClick={() => {
                  setMode('MAJOR');
                  setIsBottomSheetOpen(true);
                }}
                readOnly // 직접 입력 방지 -> BottomSheet에서만 수정 가능
              />
            </div>
          </div>

          <button
            onClick={() => {
              setMode('SUB');
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
            {subCategories.map((name, index) => (
              <div key={index} className="flex gap-2.5">
                <button onClick={() => handleRemoveSub(index)}>
                  <CircleMinus className="h-auto w-5 fill-[#D32F2F] text-white" />
                </button>
                <p className="w-[307pxp] flex-auto border border-transparent border-b-[#E0E0E0] text-sm text-black">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {isBottomSheetOpen && (
          <CategoryNameInputBottomSheet
            onClose={() => setIsBottomSheetOpen(false)}
            // 바텀 시트가 열린 버튼 출처에 따라 onSubmit 버튼 분기처리
            onSubmit={async (name) => {
              if (mode === 'MAJOR') {
                setMainCategoryName(name);
              } else if (mode === 'SUB') {
                setSubCategories((prev) => [...prev, name]);
              }
              setIsBottomSheetOpen(false);
            }}
          />
        )}

        {/* Emoji picker modal */}
        {isPickerOpen && (
          <div ref={pickerRef} className="absolute top-47 left-5 z-50">
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </div>
        )}
      </AddCategoryLayout>
    </>
  );
}

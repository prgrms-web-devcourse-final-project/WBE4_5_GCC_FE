'use client';

import { useEffect, useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditAdminCategoryById } from '@/api/admin/adminCategories';

import { X } from 'lucide-react';
import Input from '../common/ui/Input';
import { BadgeQuestionMark } from 'lucide-react';
import BottomSheet from '../common/ui/BottomSheet';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

// 언제할래요 바텀시트
export default function CategoryEdit({
  isOpen,
  setIsOpen,
  label,
  icon,
  categoryId,
  onEditComplete,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  label?: string;
  icon?: string;
  categoryId: number;
  onEditComplete: () => void; // 수정 후 리렌더링
}) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await EditAdminCategoryById(String(categoryId), {
        categoryName: value,
        emoji: selectedEmoji ?? '',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] }); // 카테고리 목록 갱신
      onEditComplete();
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('카테고리 수정 실패:', error);
      alert('카테고리 수정 중 오류 발생');
    },
  });

  const handleClick = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!value || !selectedEmoji) {
      alert('이모지와 카테고리 이름을 모두 입력해주세요.');
      return;
    }
    mutate();
  };

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
    if (label) setValue(label);
  }, [label]);

  useEffect(() => {
    if (icon) {
      setSelectedEmoji(icon);
    }
  }, [icon]);

  return (
    <>
      <BottomSheet
        className="max-h-[176px] px-5 py-8"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="flex items-center justify-between">
          <X className="h-3 w-3 cursor-pointer" onClick={handleClick} />
          <h2 className="text-base font-semibold text-black">
            카테고리 이름을 입력하세요.
          </h2>
          <button
            className="cursor-pointer text-sm"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? '저장 중...' : '확인'}
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* 좌측 아이콘 영역 */}
          <div
            onClick={() => setIsPickerOpen(true)}
            className="flex h-12 min-w-12 items-center justify-center rounded-lg border border-[var(--gray-300)]"
          >
            {selectedEmoji ? (
              <span className="text-2xl">{selectedEmoji}</span>
            ) : (
              <BadgeQuestionMark
                className="h-auto w-6 text-[var(--gray-500)]"
                strokeWidth={2}
              />
            )}
          </div>
          <Input
            className="my-[18px] px-3"
            placeholder="ex) 식비"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </BottomSheet>
      {/* Emoji picker modal */}
      {isPickerOpen && (
        <div ref={pickerRef} className="absolute top-50 left-5 z-50">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </>
  );
}

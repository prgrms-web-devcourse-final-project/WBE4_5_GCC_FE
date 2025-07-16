'use client';

import { useState, useRef, useEffect } from 'react';
import { CirclePlus } from 'lucide-react';
import { BadgeQuestionMark } from 'lucide-react';
import CategoryNameInputBottomSheet from '@/app/components/common/ui/CategoryNameInputBottomSheet';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

export default function Page() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // 이모지 클릭 핸들러
  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji);
    setIsPickerOpen(false);
  };

  // 외부 클릭 감지
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

  return (
    <>
      <div className="flex flex-col gap-7 px-5 py-7">
        <div className="relative flex items-center gap-3">
          {/* 좌측 아이콘 영역 */}
          <div
            onClick={() => setIsPickerOpen(true)}
            className="flex h-[45px] w-[45px] items-center justify-center rounded-lg border border-[#E0E0E0]"
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
          <div className="min-w-70 border border-transparent border-b-[#E0E0E0] py-2 text-xl text-[#9E9E9E]">
            <input
              type="text"
              placeholder="카테고리 이름 입력"
              className="focus:border-transparent focus:ring-0 focus:outline-none"
              onFocus={() => setIsBottomSheetOpen(true)}
            />
          </div>
        </div>

        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="flex gap-2"
        >
          <CirclePlus className="h-auto w-5 fill-[#388E3C] text-white" />
          <p className="text-medium text-base text-[#388E3C]">세부 카테고리</p>
        </button>
      </div>

      {isBottomSheetOpen && (
        <CategoryNameInputBottomSheet
          onClose={() => setIsBottomSheetOpen(false)}
          onSubmit={() => console.log('메인 카테고리 추가 함수 추가')}
        />
      )}

      {/* Emoji picker modal */}
      {isPickerOpen && (
        <div ref={pickerRef} className="absolute top-57 left-5 z-50">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </>
  );
}

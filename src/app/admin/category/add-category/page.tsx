'use client';

import { BadgeQuestionMark } from 'lucide-react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import CategoryNameInputBottomSheet from '@/app/components/common/ui/CategoryNameInputBottomSheet';

import { useEffect, useRef, useState } from 'react';
import { useCategoryForm } from '../../../components/admin/context/CategoryFormContext';

export default function EditSubcategoryPage() {
  const [isOpen, setIsOpen] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const [categoryName, setCategoryName] = useState('');
  const { setEmoji, setName } = useCategoryForm();

  // 이모지 클릭 핸들러
  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji);
    setEmoji(emojiData.emoji); // context 저장
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

  return (
    <>
      <div>
        <div className="flex flex-col bg-white">
          <div>
            <div className="flex flex-col gap-7 px-5 py-7">
              <div className="flex items-center gap-3">
                {/* 좌측 아이콘 영역 */}
                <div
                  onClick={() => setIsPickerOpen(true)}
                  className="flex h-[45px] min-w-[45px] items-center justify-center rounded-lg border border-[#e0e0e0]"
                >
                  {selectedEmoji ? (
                    <span className="text-2xl">{selectedEmoji}</span>
                  ) : (
                    <BadgeQuestionMark
                      className="h-auto w-6 text-[#9e9e9e]"
                      strokeWidth={2}
                    />
                  )}
                </div>

                {/* 우측 인풋 영역 */}
                <div className="flex w-full min-w-70 border border-transparent border-b-[#e0e0e0] py-2 text-xl text-black">
                  <input
                    type="text"
                    value={categoryName}
                    placeholder="카테고리 이름 입력"
                    className="focus:border-transparent focus:ring-0 focus:outline-none"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    readOnly // 직접 입력 방지 -> BottomSheet에서만 수정 가능
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <CategoryNameInputBottomSheet
            onClose={() => setIsOpen(false)}
            onSubmit={async (name) => {
              setCategoryName(name);
              setName(name); // Context로 저장
              setIsOpen(false);
            }}
          />
        )}
      </div>
      {/* Emoji picker modal */}
      {isPickerOpen && (
        <div ref={pickerRef} className="absolute top-35 left-5 z-50">
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import Button from "@/app/components/common/ui/Button"
import RadioGroup from '@/app/components/profile/RadioGroup';
import CustomCheckBox from '@/app/components/common/ui/CustomCheckBox';

export default function page() {
  const [selectedReason, setSelectedReason] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [customReason, setCustomReason] = useState('');

  const reasons = [
    { label: '기록하는 게 귀찮아요', value: 'lazy' },
    { label: '루틴이 잘 안 맞았어요', value: 'not-fit' },
    { label: '앱이 어렵거나 불편했어요', value: 'inconvenient' },
    { label: '기대했던 기능이 없어요', value: 'no-feature' },
    { label: '이미 비슷한 앱을 쓰고 있어요', value: 'using-other' },
    { label: '혼자 하니까 동기부여가 안 됐어요', value: 'no-motivation' },
    { label: '직접 입력', value: 'custom' },
  ];

  // 탈퇴하기 버튼 활성화 조건
  const isSubmitEnabled = isAgreed && (
    (selectedReason !== '' && selectedReason !== 'custom') ||
    (selectedReason === 'custom' && customReason.trim() !== '')
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto'; // 초기화
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 컨텐츠에 맞게 높이 조절
  }
}, [customReason]);

  return (
    <div className="min-h-screen flex flex-col justify-between px-5 py-7 ">
      {/* 버튼 제외 컨텐츠 */}
      <div className="flex flex-col">
        <div className="flex flex-col font-semibold text-base text-[#222222] mb-[30px]">
          <h1>정말 떠나시겠어요?</h1>
          <h1>계정을 삭제하면 지금까지의 기록이 모두 사라지고</h1>
          <h1>7일 동안은 다시 돌아올 수 없어요 🥲</h1>
        </div>

        <div className="rounded-[3px] font-medium text-xs text-[#222222] mb-10">
          <CustomCheckBox
            label="탈퇴 시 모든 정보가 삭제되는 것에 동의합니다."
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
        </div>

        <div className="flex flex-col mb-6">
          <h1 className="font-semibold text-lg text-[#222222]">회원 탈퇴 이유를 알려주세요.</h1>
          <h2 className="font-normal text-sm text-[#616161]">더 좋은 서비스를 제공하기 위해 노력하겠습니다.</h2>
        </div>

        <div>
          <RadioGroup 
            name="reason"
            options={reasons}
            selected={selectedReason}
            onChange={setSelectedReason}
          />

          <div className="relative mt-4 w-full">
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              ref={textareaRef}
              className="mt-4 w-full min-h-20 border border-[#E0E0E0] rounded-[5px] p-2 pb-6 text-xs text-[#222222] resize-none overflow-hidden"
              maxLength={200}
              rows={4}
              placeholder='더 나은 서비스를 제공해드릴 수 있도록 소중한 의견을 들려주세요.'
            />
            {/* 실선 */}
            <div className="absolute left-2 right-[14px] bottom-[30px] h-px bg-[#E0E0E0]"/>
            {/* 글자수 */}
            <div className="absolute right-[14px] bottom-[10px] text-[#9E9E9E] text-[10px]">
              {customReason.length}/200
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button 
          type='submit' 
          disabled={!isSubmitEnabled}
          onClick={() => console.log('탈퇴하기')}
        >
          탈퇴하기
        </Button>
      </div>
    </div>
  );
}

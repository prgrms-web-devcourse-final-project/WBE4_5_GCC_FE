'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '@/app/components/common/ui/Button';
import RadioGroup from '@/app/components/mypage/RadioGroup';
import CustomCheckBox from '@/app/components/common/ui/CustomCheckBox';
import BackHeader from '@/app/components/common/ui/BackHeader';

export default function Page() {
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
  const isSubmitEnabled =
    isAgreed &&
    ((selectedReason !== '' && selectedReason !== 'custom') ||
      (selectedReason === 'custom' && customReason.trim() !== ''));

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 컨텐츠에 맞게 높이 조절
    }
  }, [customReason]);

  return (
    <div className="flex min-h-screen flex-col gap-7">
      {/* 버튼 제외 컨텐츠 */}
      <BackHeader title="회원탈퇴" />
      <div className="flex flex-col px-5">
        <div className="mb-[30px] flex flex-col text-base font-semibold text-[#222222]">
          <h1>정말 떠나시겠어요?</h1>
          <h1>계정을 삭제하면 지금까지의 기록이 모두 사라지고</h1>
          <h1>7일 동안은 다시 돌아올 수 없어요 🥲</h1>
        </div>

        <div className="mb-10 rounded-[3px] text-xs font-medium text-[#222222]">
          <CustomCheckBox
            label="탈퇴 시 모든 정보가 삭제되는 것에 동의합니다."
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
        </div>

        <div className="mb-6 flex flex-col">
          <h1 className="text-lg font-semibold text-[#222222]">
            회원 탈퇴 이유를 알려주세요.
          </h1>
          <h2 className="text-sm font-normal text-[#616161]">
            더 좋은 서비스를 제공하기 위해 노력하겠습니다.
          </h2>
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
              className="mt-4 min-h-20 w-full resize-none overflow-hidden rounded-[5px] border border-[#E0E0E0] p-2 pb-6 text-xs text-[#222222]"
              maxLength={200}
              rows={4}
              placeholder="더 나은 서비스를 제공해드릴 수 있도록 소중한 의견을 들려주세요."
            />
            {/* 실선 */}
            <div className="absolute right-[14px] bottom-[30px] left-2 h-px bg-[#E0E0E0]" />
            {/* 글자수 */}
            <div className="absolute right-[14px] bottom-[10px] text-[10px] text-[#9E9E9E]">
              {customReason.length}/200
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[70px] left-5 right-5">
        <Button
          type="submit"
          disabled={!isSubmitEnabled}
          onClick={() => console.log('탈퇴하기')}
        >
          탈퇴하기
        </Button>
      </div>
    </div>
  );
}

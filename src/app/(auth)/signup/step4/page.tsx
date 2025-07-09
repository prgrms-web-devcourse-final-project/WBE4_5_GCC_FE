'use client';
import NextBtn from '@/app/components/common/NextBtn';
import ProgressBar from '@/app/components/common/PrgressBar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Step4() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');

  // 중복 확인 후 넘어가기로 변경해야함
  const goNext = true;
  return (
    <>
      {/* 전체 박스 */}
      <div className="px-5 mt-[50px] max-w-screen-sm mx-auto w-full select-none">
        {/* 진행률 바 */}
        <ProgressBar currentStep={4} totalSteps={6} />

        <div className="flex flex-col gap-6 mt-11">
          <span>닉네임을 입력해 주세요</span>
          <div className="flex gap-[10px]">
            <input
              type="text"
              value={nickname}
              placeholder="2~15자 이내로 입력해주세요"
              className="w-full h-[48px] p-[15px] rounded-[8px] text-[#9E9E9E] items-center border border-[#e0e0e0]"
              onChange={(e) => setNickname(e.target.value)}
            />
            <button className="flex justify-center items-center w-[114px] h-[48px] bg-[#222222] rounded-[8px] text-[white] font-medium text-[14px]">
              중복확인
            </button>
          </div>
        </div>
      </div>
      <NextBtn
        label="다음"
        disabled={!goNext}
        className={`${goNext ? 'bg-[#222222]' : 'bg-[#c4c4c4]'}`}
        onClick={() => router.push('/signup/step5')}
      />
    </>
  );
}

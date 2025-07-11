'use client';

import ProgressBar from '@/app/components/common/PrgressBar';
import { useSignUpStore } from '@/store/SignupStore';
import { useEffect, useState } from 'react';
import Input from '../common/ui/Input';
import Button from '../common/ui/Button';

export default function Nickname() {
  const nickname = useSignUpStore((state) => state.nickname);
  const setNickName = useSignUpStore((state) => state.setNickName);
  const [checkNickName, setCheckNickName] = useState(false);
  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);

  const [error, setError] = useState(false);
  const [okay, setOkay] = useState(false);

  // 닉네임 중복 확인 로직 (미구현)
  const checkHandler = () => {
    setCheckNickName(true);
    setOkay(true);
  };
  // 중복 확인 후 넘어가기로 변경해야함
  const goNext = checkNickName;

  useEffect(() => {
    setIsNextEnabled(goNext);
  }, [setIsNextEnabled, goNext]);
  return (
    <>
      {/* 전체 박스 */}
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm px-5 select-none">
        {/* 진행률 바 */}
        <ProgressBar currentStep={1} totalSteps={3} />

        <div className="mt-11 mb-2 flex flex-col gap-6">
          <span>닉네임을 입력해 주세요</span>
          <div className="flex gap-[10px]">
            <Input
              value={nickname}
              placeholder="2~15자 이내로 입력해주세요"
              onChange={(e) => setNickName(e.target.value)}
            />
            <Button
              disabled={nickname === ''}
              onClick={checkHandler}
              className={`w-[114px] ${nickname.length >= 2 ? 'bg-[#222222]' : 'bg-[#c4c4c4]'}`}
            >
              중복 확인
            </Button>
          </div>
        </div>
        {error && (
          <p className="text-[14px] text-red-500">중복된 닉네임 입니다.</p>
        )}
        {okay && (
          <p className="text-[14px] text-green-600">
            사용 가능한 닉네임 입니다.
          </p>
        )}
      </div>
    </>
  );
}

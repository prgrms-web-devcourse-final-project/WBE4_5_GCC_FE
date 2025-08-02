'use client';

import { useEffect, useState } from 'react';
import { useSignUpStore } from '@/store/SignupStore';
import { checkNickname } from '@/api/auth';
import ProgressBar from '../common/ProgressBar';
import Input from '../common/ui/Input';
import Button from '../common/ui/Button';

export default function Nickname() {
  const nickname = useSignUpStore((state) => state.nickname);
  const setNickname = useSignUpStore((state) => state.setNickname);
  const [nicknameStatus, setNicknameStatus] = useState<
    'idle' | 'valid' | 'invalid'
  >('idle');
  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);

  const isNicknameLengthValid = nickname.length >= 2 && nickname.length <= 15;

  // 닉네임 중복 확인 로직
  const validateNickname = async () => {
    try {
      await checkNickname(nickname);
      setNicknameStatus('valid');
    } catch (error) {
      setNicknameStatus('invalid');
      console.error('닉네임 중복 에러:', error);
    }
  };

  // 닉네임 입력 시 중복 상태 초기화
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const noSpaceNickname = e.target.value.replace(/\s/g, '');
    setNickname(noSpaceNickname);
    setNicknameStatus('idle');
  };

  // 다음 버튼 활성화 조건
  const goNext = nicknameStatus === 'valid';

  useEffect(() => {
    setIsNextEnabled(goNext);
  }, [setIsNextEnabled, goNext]);

  return (
    <>
      {/* 전체 박스 */}
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm px-5 select-none">
        {/* 진행률 바 */}
        <ProgressBar currentStep={1} totalSteps={4} />

        <div className="mt-11 mb-2 flex flex-col gap-6">
          <h1 className="text-[20px] font-semibold">닉네임을 입력해 주세요</h1>
          <div className="flex gap-[10px]">
            <Input
              value={nickname}
              placeholder="2~15자 이내로 입력해주세요"
              onChange={onChangeNickname}
            />
            <Button
              disabled={!isNicknameLengthValid}
              onClick={validateNickname}
              className={`w-[114px] ${isNicknameLengthValid ? 'bg-[var(--black)] dark:bg-[var(--dark-gray-200)]' : 'bg-[var(--gray-400)]'}`}
            >
              중복 확인
            </Button>
          </div>
        </div>

        {nicknameStatus === 'invalid' && (
          <p className="text-[14px] text-[#D32F2F]">
            이미 사용 중인 닉네임입니다.
          </p>
        )}
        {nicknameStatus === 'valid' && (
          <p className="text-[14px] text-[#388E3C]">
            사용 가능한 닉네임입니다.
          </p>
        )}
      </div>
    </>
  );
}

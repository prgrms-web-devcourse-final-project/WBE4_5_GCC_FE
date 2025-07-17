'use client';

import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSignUpStore } from '@/store/SignupStore';
import Input from '../common/ui/Input';
import Button from '../common/ui/Button';
import { emailCheck } from '@/api/api';

export default function UserInfo() {
  const name = useSignUpStore((state) => state.name);
  const email = useSignUpStore((state) => state.email);
  const password = useSignUpStore((state) => state.password);
  const checkPassword = useSignUpStore((state) => state.checkPassword);
  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);
  const setName = useSignUpStore((state) => state.setName);
  const setEmail = useSignUpStore((state) => state.setEmail);
  const setPassword = useSignUpStore((state) => state.setPassword);
  const setCheckPassword = useSignUpStore((state) => state.setCheckPassword);

  const [canUseEmail, setCanUseEmail] = useState<true | false | null>(null);
  const [okay, setOkay] = useState(false);

  // 비밀번호 유효성 검사
  // 영문 대소문자
  const hasLowerUpper = /[a-z]/.test(password) && /[A-Z]/.test(password);
  // 숫자 포함
  const hasNumber = /[0-9]/.test(password);
  // 특수문자 포함
  const hasSpecial = /[/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-='|]/.test(
    password,
  );
  // 8자리 이상
  const hasMinLength = password.length >= 8;

  // 조건이 맞는지 확인
  const checkConditionIcon = (condition: boolean) => {
    return <Check size={16} color={condition ? '#388E3C' : '#9E9E9E'} />
  };
  const checkConditionText = (condition: boolean) => {
    return condition ? 'text-[#388E3C] ' : 'text-[#9E9E9E] ';
  };

  // 비밀번호 텍스트로 변경
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  // 이메일 중복 확인 로직
  const checkHandler = async () => {
    try {
      await emailCheck(email);
      setCanUseEmail(true);
      setOkay(true);
    } catch (error) {
      setCanUseEmail(false);
      console.log('닉네임 중복:', error);
    }
  };

  // 다음 버튼 활성화 조건
  const isPasswordOkay =
    hasLowerUpper && hasNumber && hasSpecial && hasMinLength;
  const goNext =
    name.trim() !== '' &&
    email.trim() !== '' &&
    canUseEmail === true &&
    okay &&
    isPasswordOkay &&
    password === checkPassword;

  useEffect(() => {
    setIsNextEnabled(goNext);
  }, [goNext, setIsNextEnabled]);

  return (
    <>
      {/* 전체 박스 */}
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm px-5">
        {/* 이름 */}
        <div className="mb-[34px]">
          <p className="mb-[10px] text-[16px] font-semibold">이름</p>
          <Input
            placeholder="이름을 입력해 주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* 이메일 */}
        <div className="mb-[34px]">
          <p className="mb-[10px] text-[16px] font-semibold">이메일(아이디)</p>
          <div className="flex gap-[10px]">
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setOkay(false);
              }}
              placeholder="이메일을 입력해주세요"
            />
            <Button className="w-[75px]" onClick={checkHandler}>
              중복 확인
            </Button>
          </div>
          <div className="mt-2">
            {canUseEmail === false && (
              <p className="text-[14px] text-[#D32F2F]">중복된 이메일 입니다.</p>
            )}
            {canUseEmail === true && (
              <p className="text-[14px] text-[#388E3C]">
                사용 가능한 이메일 입니다.
              </p>
            )}
          </div>
        </div>
        {/* 비밀번호 */}
        <div className="mb-[34px]">
          <p className="mb-[10px] text-[16px] font-semibold">비밀번호</p>

          <div className="relative flex h-[50px] w-full items-center">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-5 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showCheckPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                <Eye size={20} color="#9E9E9E" />
              ) : (
                <EyeClosed size={20} color="#9E9E9E" />
              )}
            </button>
          </div>
          {/* 비밀번호 확인 체크 */}
          <div className="mt-[10px] text-[12px]">
            <div className="flex gap-9">
              <div className="flex w-[160px] items-center gap-[6px]">
                {checkConditionIcon(hasLowerUpper)}
                <span className={checkConditionText(hasLowerUpper)}>
                  영문 대소문자 최소 1개 포함
                </span>
              </div>
              <div className="flex w-[160px] items-center gap-[6px]">
                {checkConditionIcon(hasNumber)}
                <span className={checkConditionText(hasNumber)}>숫자 포함</span>
              </div>
            </div>
            <div className="flex gap-9">
              <div className="flex w-[160px] items-center gap-[6px]">
                {checkConditionIcon(hasMinLength)}
                <span className={checkConditionText(hasMinLength)}>
                  8자리 이상
                </span>
              </div>
              <div className="flex w-[160px] items-center gap-[6px]">
                {checkConditionIcon(hasSpecial)}
                <span className={checkConditionText(hasSpecial)}>
                  특수 문자 포함( \ &quot; 제외)
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* 비밀번호 확인 */}
        <div className="mb-[34px]">
          <p className="mb-[10px] text-[16px] font-semibold">비밀번호 확인</p>

          <div className="relative flex h-[50px] w-full items-center">
            <Input
              type={showCheckPassword ? 'text' : 'password'}
              value={checkPassword}
              placeholder="비밀번호를 한번 더 입력해주세요"
              onChange={(e) => setCheckPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-5 cursor-pointer"
              onClick={() => setShowCheckPassword((prev) => !prev)}
              aria-label={showCheckPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showCheckPassword ? (
                <Eye size={20} color="#9e9e9e" />
              ) : (
                <EyeClosed size={20} color="#9e9e9e" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

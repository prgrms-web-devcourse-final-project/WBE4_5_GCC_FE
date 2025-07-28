'use client';
import { Eye, EyeClosed, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import Input from '@/app/components/common/ui/Input';
import { useFindPwdStore } from '@/store/useFindPwdStore';

export default function ResetPage() {
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const setIsNextEnabled = useFindPwdStore((state) => state.setIsNextEnabled);
  const setNewPassword = useFindPwdStore((state) => state.setNewPassword);

  // 비밀번호 유효성 검사
  const hasLowerUpper = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-='|]/.test(password);
  const hasMinLength = password.length >= 8;

  const checkConditionIcon = (condition: boolean) => {
    return <Check size={16} color={condition ? '#388E3C' : '#9E9E9E'} />;
  };
  const checkConditionText = (condition: boolean) =>
    condition ? 'text-[#388E3C]' : 'text-[#9E9E9E]';

  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const isPasswordOkay =
    hasLowerUpper && hasNumber && hasSpecial && hasMinLength;
  const goNext = isPasswordOkay && password === checkPassword;

  useEffect(() => {
    setIsNextEnabled(goNext);
    if (goNext) {
      setNewPassword(password);
    }
  }, [goNext, setIsNextEnabled, setNewPassword, password]);

  return (
    <>
      <div className="mx-auto mt-[50px] w-full max-w-screen-sm px-5">
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
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                <Eye size={20} color="#9E9E9E" />
              ) : (
                <EyeClosed size={20} color="#9E9E9E" />
              )}
            </button>
          </div>

          {/* 비밀번호 조건 */}
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
          <div className="relative h-[50px] w-full items-center">
            <Input
              type={showCheckPassword ? 'text' : 'password'}
              value={checkPassword}
              placeholder="비밀번호를 한번 더 입력해주세요"
              onChange={(e) => setCheckPassword(e.target.value)}
              error={
                checkPassword.length > 0 && checkPassword !== password
                  ? '비밀번호가 일치하지 않습니다.'
                  : ''
              }
            />
            <button
              type="button"
              className="absolute right-5 top-3.5 cursor-pointer"
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
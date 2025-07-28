'use client';

import { Eye, EyeClosed, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSignUpStore } from '@/store/SignupStore';
import Input from '../common/ui/Input';
import { checkEmail } from '@/api/auth';

export default function UserInfo({ onValidChange }: { onValidChange?: (valid: boolean) => void }) {
  const name = useSignUpStore((state) => state.name);
  const email = useSignUpStore((state) => state.email);
  const password = useSignUpStore((state) => state.password);
  const checkPassword = useSignUpStore((state) => state.checkPassword);
  const setIsNextEnabled = useSignUpStore((state) => state.setIsNextEnabled);
  const setName = useSignUpStore((state) => state.setName);
  const setEmail = useSignUpStore((state) => state.setEmail);
  const setPassword = useSignUpStore((state) => state.setPassword);
  const setCheckPassword = useSignUpStore((state) => state.setCheckPassword);

  const [emailStatus, setEmailStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  // 이메일 조건 검사
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // 이메일 중복 확인 로직
  const validateEmail = async () => {
    if (!email.trim()) return;
    if (!emailRegex.test(email)) return;

    try {
      await checkEmail(email);
      setEmailStatus('valid');
    } catch (error) {
      setEmailStatus('invalid');
      console.error('❌ 이메일 중복:', error);
    }
  };

  // 비밀번호 조건 검사
  const hasLowerUpper = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-='|]/.test(password,);
  const hasMinLength = password.length >= 8;

  const isPasswordOkay =
    hasLowerUpper && hasNumber && hasSpecial && hasMinLength;

  const checkConditionIcon = (condition: boolean) => {
    return <Check size={16} color={condition ? '#388E3C' : '#9E9E9E'} />
  };

  const checkConditionText = (condition: boolean) => {
    return condition ? 'text-[#388E3C] ' : 'text-[#9E9E9E] ';
  };

  // 다음 버튼 활성화 조건
  const isFormValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    emailStatus === 'valid' &&
    isPasswordOkay &&
    password === checkPassword;

  useEffect(() => {
    setIsNextEnabled(isFormValid);
    onValidChange?.(isFormValid);
  }, [isFormValid, setIsNextEnabled, onValidChange]);

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
                setEmailStatus('idle');
              }}
              onBlur={validateEmail}
              placeholder="이메일을 입력해주세요"
            />
          </div>
          <div className="mt-2">
            {emailStatus === 'invalid' && (
              <p className="text-[14px] text-[#D32F2F]">이미 사용 중인 이메일입니다. 다른 이메일을 입력해 주세요.</p>
            )}
            {emailStatus === 'valid' && (
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

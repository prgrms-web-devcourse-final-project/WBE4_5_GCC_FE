'use client';

import { useEffect, useState } from 'react';
import { Eye, EyeClosed, Check } from 'lucide-react';
import Input from '@/app/components/common/ui/Input';
import Button from '@/app/components/common/ui/Button';
import useDebounce from '@/hooks/useDebounce';
import BackHeader from '@/app/components/common/ui/BackHeader';
import { handleChangePassword } from '@/api/member';
import AlertMessage from '@/app/components/common/alert/AlertMessage';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

export default function Page() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const hasUpperAndLower = /(?=.*[a-z])(?=.*[A-Z])/;
  const hasNumber = /(?=.*\d)/;
  const hasSpecialChar = /(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-='|])/;
  const isAtLeast8 = /^.{8,}$/;

  const getPasswordChecks = (pw: string) => ({
    upperAndLower: hasUpperAndLower.test(pw),
    number: hasNumber.test(pw),
    special: hasSpecialChar.test(pw),
    length: isAtLeast8.test(pw),
  });

  const [passwordChecks, setPasswordChecks] = useState({
    upperAndLower: false,
    number: false,
    special: false,
    length: false,
  });

  // 비밀번호 조건 만족하는지 확인
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordChecks(getPasswordChecks(value));
  };

  const conditionList = [
    { key: 'upperAndLower', label: '영문 대소문자 최소 1개 포함' },
    { key: 'number', label: '숫자 포함' },
    { key: 'special', label: '특수 문자 포함(\\ " 제외)' },
    { key: 'length', label: '8자리 이상' },
  ];

  // 비밀번호 다 입력되면 일치 확인
  const debouncedConfirm = useDebounce(confirmPassword, 500);

  useEffect(() => {
    if (debouncedConfirm.length === 0) {
      setConfirmPasswordError('');
      return;
    }

    if (debouncedConfirm !== newPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  }, [debouncedConfirm, newPassword]);

  // 다음 버튼 활성화 조건
  const isPasswordOkay = newPassword.length > 0 && confirmPassword.length > 0;
  // && password.length > 0;
  const goNext =
    isPasswordOkay && isPasswordValid && newPassword === confirmPassword;

  // 알림창 시간
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const newPasswordMutation = useMutation({
    mutationFn: (newPassword: string) => handleChangePassword(newPassword),
    onSuccess: () => {
      router.push('/mypage');
    },
    onError: (error) => {
      console.error('비밀번호 변경 실패', error);
      setErrors('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      setShowAlert(true);
    },
  });

  // 변경하기 버튼
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setErrors('비밀번호 조건을 확인해주세요');
      setShowAlert(true);
      return;
    }
    newPasswordMutation.mutate(newPassword);
  };

  return (
    <div className="flex min-h-screen flex-col gap-7">
      {/* 상단 컨텐츠 */}
      <BackHeader title="비밀번호 변경" />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-6 px-5">
          <div className="flex flex-col gap-y-2.5">
            <h1 className="text-[16px] font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
              새 비밀번호
            </h1>
            <div className="relative">
              <Input
                type={showNew ? 'text' : 'password'}
                placeholder="새 비밀번호를 입력해 주세요"
                value={newPassword}
                autoComplete="off"
                onChange={(e) => handleNewPasswordChange(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? (
                  <Eye className="h-auto w-[18px] text-[#9e9e9e]" />
                ) : (
                  <EyeClosed className="h-auto w-[18px] text-[#9e9e9e]" />
                )}
              </button>
            </div>

            {/* 비밀번호 조건 */}
            <div className="mt-[10px] grid grid-cols-2 gap-x-6 gap-y-[10px]">
              {conditionList.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-[6px]">
                  <Check
                    className={`h-auto w-4 ${passwordChecks[key as keyof typeof passwordChecks] ? 'text-[#388E3C] dark:text-[var(--dark-green)]' : 'text-[#c4c4c4]'}`}
                  />
                  <p
                    className={`text-[12px] ${passwordChecks[key as keyof typeof passwordChecks] ? 'text-[#388E3C] dark:text-[var(--dark-green)]' : 'text-[#9e9e9e]'}`}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-2.5">
            <h1 className="text-[16px] font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
              새 비밀번호 확인
            </h1>
            <div className="relative h-[50px] w-full items-center">
              <Input
                type={showConfirm ? 'text' : 'password'}
                placeholder="새 비밀번호를 한 번 더 입력해 주세요"
                value={confirmPassword}
                autoComplete="off"
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPasswordError}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <Eye className="h-auto w-[18px] text-[#9e9e9e]" />
                ) : (
                  <EyeClosed className="h-auto w-[18px] text-[#9e9e9e]" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="fixed right-5 bottom-[70px] left-5">
          <div className="flex justify-center">
            {errors && showAlert && (
              <AlertMessage type="error" message={errors} className="mb-10" />
            )}
          </div>
          <Button className="flex justify-center" type="submit" disabled={!goNext}>
            변경하기
          </Button>
        </div>
      </form>
    </div>
  );
}

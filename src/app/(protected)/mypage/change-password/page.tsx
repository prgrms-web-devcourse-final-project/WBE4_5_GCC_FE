'use client';

import { useState } from 'react';
import { Eye, EyeClosed, Check } from 'lucide-react';
import Input from '@/app/components/common/ui/Input';
import Button from '@/app/components/common/ui/Button';
import BackHeader from '@/app/components/common/ui/BackHeader';

export default function Page() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string }>({});

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  return (
    <div className="flex min-h-screen flex-col gap-7">
      {/* 상단 컨텐츠 */}
      <BackHeader title="비밀번호 변경" />
      <div className="flex flex-col gap-y-6 px-5">
        <div className="flex flex-col gap-y-2.5">
          <h1 className="text-[16px] font-semibold text-[#222222]">
            기존 비밀번호
          </h1>
          <div className="relative">
            <Input
              type={showOld ? 'text' : 'password'}
              placeholder="기존 비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={() => setShowOld(!showOld)}
            >
              {showOld ? (
                <Eye className="h-auto w-[18px] text-[#9E9E9E]" />
              ) : (
                <EyeClosed className="h-auto w-[18px] text-[#9E9E9E]" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <h1 className="text-[16px] font-semibold text-[#222222]">
            새 비밀번호
          </h1>
          <div className="relative">
            <Input
              type={showNew ? 'text' : 'password'}
              placeholder="새 비밀번호를 입력해 주세요"
              value={newPassword}
              onChange={(e) => handleNewPasswordChange(e.target.value)}
              error={errors.password}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? (
                <Eye className="h-auto w-[18px] text-[#9E9E9E]" />
              ) : (
                <EyeClosed className="h-auto w-[18px] text-[#9E9E9E]" />
              )}
            </button>
          </div>

          {/* 비밀번호 조건 */}
          <div className="mt-[10px] grid grid-cols-2 gap-x-6 gap-y-[10px]">
            {conditionList.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-[6px]">
                <Check
                  className={`h-auto w-4 ${passwordChecks[key as keyof typeof passwordChecks] ? 'text-[#388E3C]' : 'text-[#C4C4C4]'}`}
                />
                <p
                  className={`text-[12px] ${passwordChecks[key as keyof typeof passwordChecks] ? 'text-[#388E3C]' : 'text-[#9E9E9E]'}`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <h1 className="text-[16px] font-semibold text-[#222222]">
            새 비밀번호 확인
          </h1>
          <div className="relative">
            <Input
              type={showConfirm ? 'text' : 'password'}
              placeholder="새 비밀번호를 한 번 더 입력해 주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.password}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <Eye className="h-auto w-[18px] text-[#9E9E9E]" />
              ) : (
                <EyeClosed className="h-auto w-[18px] text-[#9E9E9E]" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[70px] left-5 right-5">
        <Button
          type="submit"
          onClick={() => console.log("변경하기")}
        >
          변경하기
        </Button>
      </div>
    </div>
  );
}

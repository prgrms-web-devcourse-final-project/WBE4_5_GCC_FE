'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/common/ui/Input';
import { Eye, EyeClosed } from 'lucide-react';
import Button from '@/app/components/common/ui/Button';
import AlertMessage from '@/app/components/common/alert/AlertMessage';
import { handleConfirmPassword } from '@/api/member';
import BackHeader from '@/app/components/common/ui/BackHeader';

export default function UserInfo() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string }>({});
  const [showAlert, setShowAlert] = useState(false);

  // 확인 버튼 활성화 조건
  const isSubmitEnabled = password.length > 0;

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleSubmit = async () => {
    try {
      const result = await handleConfirmPassword(password);

      if (result) {
        router.push('/mypage/change-password/modify');
      }
    } catch (error) {
      console.error('비밀번호 확인 실패:', error);
      setErrors({ password: '비밀번호가 일치하지 않습니다.' });
      setShowAlert(true);
    }
  };

  return (
    <div className="h-1vh flex flex-col">
      <BackHeader title="비밀번호 변경" />
      {/* 버튼 제외 콘텐츠 */}
      <div className="px-5">
        <div className="mt-[27px] mb-[27px] flex flex-col text-base font-semibold text-[#222222]">
          <h1>정보를 안전하게 보호하기 위해</h1>
          <h1>비밀번호를 다시 한 번 입력해 주세요</h1>
        </div>

        <div className="flex flex-col gap-2.5">
          <h2 className="text-sm font-semibold text-[#222222]">
            비밀번호 확인
          </h2>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="회원정보 변경을 위해 비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({});
              }}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="h-auto w-[18px] text-[#9E9E9E]" />
              ) : (
                <EyeClosed className="h-auto w-[18px] text-[#9E9E9E]" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="fixed right-5 bottom-[70px] left-5">
        <div className="flex justify-center">
          {errors.password && showAlert && (
            <AlertMessage
              type="error"
              message={errors.password}
              className="mb-10"
            />
          )}
        </div>
        <Button
          type="submit"
          disabled={!isSubmitEnabled}
          onClick={handleSubmit}
        >
          확인
        </Button>
      </div>
    </div>
  );
}

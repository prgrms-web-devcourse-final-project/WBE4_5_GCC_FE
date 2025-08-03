'use client';

import Image from 'next/image';
import { ChevronRight, Eye, EyeClosed } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Input from '@/app/components/common/ui/Input';
import Button from '@/app/components/common/ui/Button';
import { useRouter } from 'next/navigation';
import { useSignUpStore } from '@/store/SignupStore';
import { signIn } from '@/api/auth';
import { useUserStore } from '@/store/UserStore';
import kakao from '/public/kakao.svg';
import logo from '/public/logo.png';

export default function Page() {
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const router = useRouter();
  const { setEmail } = useUserStore();

  const isSubmittingRef = useRef(false);

  const logInHandler = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      await signIn(emailInput, password);
      setEmail(emailInput);

      if (emailInput === 'admin@test.com') {
        router.push('/admin');
      } else {
        router.push('/home');
      }
    } catch (err) {
      setErrors({
        password: '이메일 또는 비밀번호를 다시 확인하세요.',
      });
      console.error(err);
    } finally {
      setTimeout(() => {
        isSubmittingRef.current = false;
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;

    const newErrors: { email?: string; password?: string } = {};

    if (!emailInput) {
      newErrors.email = '이메일을 입력해 주세요.';
    } else if (!emailInput.includes('@')) {
      newErrors.email = '잘못된 형식의 이메일 주소입니다.';
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해 주세요.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      logInHandler();
    }
  };

  const reset = useSignUpStore((state) => state.reset);
  useEffect(() => {
    reset();
  }, [reset]);

  const handleKakaoLogin = () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    window.location.href = 'https://honlife.kro.kr/oauth2/authorization/kakao';
  };

  const handleGoogleLogin = () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    window.location.href = 'https://honlife.kro.kr/oauth2/authorization/google';
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-5 pt-20 select-none dark:bg-[var(--dark-bg-primary)]">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="Loutie Logo"
            width={240}
            height={120}
            priority
          />
        </div>
        <form className="mt-[35px] space-y-4" onSubmit={handleSubmit}>
          <Input
            placeholder="이메일을 입력해 주세요"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            error={errors.email}
          />
          <div className="relative">
            <Input
              placeholder="비밀번호를 입력해 주세요"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-3.5 right-5 cursor-pointer"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? (
                <Eye size={20} color="#9E9E9E" />
              ) : (
                <EyeClosed size={20} color="#9E9E9E" />
              )}
            </button>
          </div>

          <div className="my-6 space-y-6">
            <Button
              type="submit"
              className="h-[56px] bg-[#ffb84c] text-[16px] font-bold"
            >
              로그인
            </Button>

            <div className="flex items-center gap-10 text-sm text-gray-400">
              <hr className="flex-1 border-gray-300" />
              <span>또는</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="button"
                className="gap-2 border border-[#e0e0e0] bg-white text-black dark:bg-[var(--dark-bg-primary)]"
                onClick={handleGoogleLogin}
              >
                <Image
                  src="/images/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
                구글 계정으로 로그인
              </Button>
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FEE500] py-3 font-medium text-[#000000] transition-colors hover:bg-[#FDD800]"
                onClick={handleKakaoLogin}
              >
                <Image src={kakao} alt="Kakao Logo" className="h-5 w-5" />
                카카오로 로그인
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-center gap-6 text-sm text-[#909090]">
          <a
            onClick={() => router.push('/signup')}
            className="flex cursor-pointer items-center"
          >
            회원가입
            <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </a>
          <a
            onClick={() => router.push('/find-password')}
            className="flex cursor-pointer items-center"
          >
            비밀번호를 잊으셨나요?
            <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

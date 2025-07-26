'use client';

import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Input from '@/app/components/common/ui/Input';
import Button from '@/app/components/common/ui/Button';
import { useRouter } from 'next/navigation';
import { useSignUpStore } from '@/store/SignupStore';
import { handleSignIn } from '@/api/api';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const logInHandler = async () => {
    try {
      await handleSignIn(email, password);
      if (email === 'admin@test.com') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (err) {
      setErrors({
        password: '이메일 또는 비밀번호를 다시 확인하세요.',
      });
      console.error(err);
    }
  };

  const router = useRouter();
  // 이메일과 비밀번호 유효성 검사
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = '이메일을 입력해 주세요.';
    } else if (!email.includes('@')) {
      newErrors.email = '잘못된 형식의 이메일 주소입니다.';
    }

    if (!password) {
      newErrors.password = '비밀번호를 입력해 주세요.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      logInHandler();
      return;
    }
  };

  const reset = useSignUpStore((state) => state.reset);
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="mt-[150px] flex min-h-screen flex-col items-center bg-white px-5">
      <div className="w-full max-w-md">
        <h1 className="text-center text-4xl font-bold">LOGO</h1>
        <form className="mt-[35px] space-y-4" onSubmit={handleSubmit}>
          <Input
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <div className="my-6 space-y-6">
            <Button
              type="submit"
              className="h-[56px] bg-[#FFB84C] text-[16px] font-bold"
            >
              로그인
            </Button>
            <div className="flex items-center gap-10 text-sm text-gray-400">
              <hr className="flex-1 border-gray-300" />
              <span>또는</span>
              <hr className="flex-1 border-gray-300" />
            </div>
            <Button className="gap-2 border border-[#E0E0E0] bg-white text-black">
              <Image
                src="/images/google.svg"
                alt="Google"
                width={20}
                height={20}
              />
              구글 계정으로 로그인
            </Button>
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
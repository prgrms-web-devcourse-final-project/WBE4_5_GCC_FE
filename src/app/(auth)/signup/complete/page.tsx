'use client';

import { signIn } from '@/api/auth';
import { useSignUpStore } from '@/store/SignupStore';
import { useRouter } from 'next/navigation';
import LottieAnimation from '@/app/components/common/LottieAnimation';

export default function SignUpComplete() {
  const router = useRouter();
  const userEmail = useSignUpStore((state) => state.email);
  const userPassword = useSignUpStore((state) => state.password);

  const logInHandler = async () => {
    await signIn(userEmail, userPassword);
    if (userEmail === 'admin@test.com') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="flex flex-col items-center text-center w-[350px]">
        <div className="mb-2 w-full">
          <LottieAnimation className="w-full h-auto" />
        </div>
        <h1 className="mb-4 text-3xl font-bold leading-tight text-[#222222]">
          회원가입이 완료되었습니다
        </h1>
        <p className="mb-10 text-xl leading-relaxed text-[#9e9e9e]">
          지금 바로 나만의 루틴을 시작해보세요!
        </p>
        <button
          onClick={logInHandler}
          className="w-full rounded-xl bg-[#222222] py-4 mt-30 text-lg font-semibold text-white shadow-md transition-colors hover:bg-[#444444] cursor-pointer"
        >
          홈으로
        </button>
      </div>
    </div>
  );
}

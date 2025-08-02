'use client';

import { useSignUpStore } from '@/store/SignupStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SignUpComplete() {
  const router = useRouter();
  const userEmail = useSignUpStore((state) => state.email);

  // 로그인 핸들러
  const logInHandler = async () => {
    if (userEmail === 'admin@test.com') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 dark:bg-[var(--dark-bg-primary)]">
      <div className="mb-9">
        <Image src="/images/check3d.png" alt="완료" width={160} height={160} />
      </div>
      <h1 className="mb-4 text-2xl font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
        회원가입이 완료되었습니다
      </h1>
      <p className="mb-[182px] text-center text-base text-[#9e9e9e]">
        지금 바로 나만의 루틴을 시작해보세요!
      </p>
      <button
        onClick={logInHandler}
        className="w-full max-w-xs cursor-pointer rounded-lg bg-[#222222] py-4 text-center font-semibold text-white shadow-md transition-colors hover:bg-[#444444] dark:bg-[var(--dark-gray-200)] dark:text-[var(--dark-bg-primary)]"
      >
        홈으로
      </button>
    </div>
  );
}

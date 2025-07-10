'use client';

import BackBtn from '@/app/components/common/ui/BackHeader';
import NextBtn from '@/app/components/common/ui/NextBtn';
import { useSignUpStore } from '@/store/SignupStore';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const step = useSignUpStore((state) => state.step);
  const setStep = useSignUpStore((state) => state.setStep);
  const router = useRouter();
  const isNextEnabled = useSignUpStore((state) => state.isNextEnabled);

  const goNext = () => {
    // if (step === 1) {
    //   router.push('/login');
    // }
    if (step < 6) {
      setStep(step + 1);
    }
    if (step === 6) {
      router.push('/login');
    }
  };

  // 경로에 따른 제목 설정
  const changeTitle = () => {
    if (step === 1) return '회원가입';
    if (step === 2) return '이메일 인증';
    if (step === 3) return '이용약관';
    if (step === 4) return '닉네임 입력';
    if (step === 5) return '자취 경력 입력';
    if (step === 6) return '관심 카테고리 설정';
    return '회원가입';
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <BackBtn title={changeTitle()} />
        <div>{children}</div>
        <NextBtn
          label="다음"
          onClick={goNext}
          disabled={!isNextEnabled}
          className={`${isNextEnabled ? 'bg-[#222222]' : 'bg-[#c4c4c4]'}`}
        />
      </div>
    </>
  );
}

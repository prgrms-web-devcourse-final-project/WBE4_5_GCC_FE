'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignUpStore } from '@/store/SignupStore';

interface BackHeaderProps {
  title: string;
  useStep?: boolean; // 회원가입처럼 step 로직을 쓸지
  defaultBackPath?: string; // step === 1 이면 갈 경로
}

export default function BackHeader({
  title,
  useStep = false,
  defaultBackPath = '/',
}: BackHeaderProps) {
  const router = useRouter();
  const params = useSearchParams();
  const step = useSignUpStore((state) => state.step);
  const setStep = useSignUpStore((state) => state.setStep);
  const isSocial = params.get('social') === 'true';

  const goBack = () => {
    if (isSocial) {
      router.push('/login');
      return;
    }

    if (useStep) {
      if (step === 1) {
        router.push(defaultBackPath);
      } else {
        setStep(step - 1);
      }
    } else {
      router.back(); // 일반적인 라우팅 환경에서는 뒤로 가기
    }
  };

  return (
    <div className="relative flex h-[56px] w-full items-center justify-center">
      <ChevronLeft
        className="absolute left-3 h-6 w-6 cursor-pointer"
        onClick={goBack}
      />
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
}

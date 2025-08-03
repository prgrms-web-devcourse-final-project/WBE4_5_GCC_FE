'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignUpStore } from '@/store/SignupStore';

interface BackHeaderProps {
  title: string;
  useStep?: boolean; // 회원가입처럼 step 로직을 쓸지
  defaultBackPath?: string; // step === 1 이면 갈 경로
  step?: number; // 현재 step 값 (optional)
}

export default function BackHeader({
  title,
  useStep = false,
  defaultBackPath = '/home',
  step,
}: BackHeaderProps) {
  const router = useRouter();
  const params = useSearchParams();
  const currentStep = useSignUpStore((state) => state.step);
  const setStep = useSignUpStore((state) => state.setStep);
  const isSocial = params.get('social') === 'true';

  const goBack = () => {
    if (isSocial) {
      router.push('/login');
      return;
    }

    if (useStep) {
      const activeStep = step ?? currentStep;
      if (activeStep === 1) {
        router.push(defaultBackPath);
      } else {
        setStep(activeStep - 1);
      }
    } else {
      router.back();
    }
  };

  const activeStep = step ?? currentStep;

  return (
    <div className="relative flex h-[56px] w-full items-center justify-center bg-white">
      {activeStep !== 3 && activeStep !== 4 && (
        <ChevronLeft
          className="absolute left-3 h-6 w-6 cursor-pointer dark:text-[var(--dark-gray-700)]"
          onClick={goBack}
        />
      )}
      <p className="text-lg font-semibold dark:text-[var(--dark-gray-700)]">
        {title}
      </p>
    </div>
  );
}

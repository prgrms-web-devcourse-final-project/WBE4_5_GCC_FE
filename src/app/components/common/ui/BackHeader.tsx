import { ChevronLeft } from 'lucide-react';

import { useSignUpStore } from '@/store/SignupStore';
import { useRouter } from 'next/navigation';

export default function BackHeader({ title }: { title: string }) {
  const router = useRouter();
  const step = useSignUpStore((state) => state.step);
  const setStep = useSignUpStore((state) => state.setStep);
  const goBack = () => {
    if (step === 1) {
      router.push('/login');
    }
    if (step >= 2) {
      setStep(step - 1);
    }
  };
  return (
    <>
      <div className="relative flex h-[56px] w-[100%] items-center justify-center px-5">
        <ChevronLeft
          className="absolute left-3 h-6 w-6 cursor-pointer"
          onClick={goBack}
        />
        <p className="text-lg font-semibold">{title}</p>
      </div>
    </>
  );
}

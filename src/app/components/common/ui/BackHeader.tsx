import Image from 'next/image';
import backBtn from '/public/BackPageBtn.svg';

import { useSignUpStore } from '@/store/SignupStore';
import { useRouter } from 'next/navigation';

export default function BackBtn({ title }: { title: string }) {
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
        <Image
          src={backBtn}
          alt="뒤로가기"
          className="absolute left-6 h-[24px] w-[24px] cursor-pointer"
          onClick={goBack}
        />
        <p className="font-semibold">{title}</p>
      </div>
    </>
  );
}

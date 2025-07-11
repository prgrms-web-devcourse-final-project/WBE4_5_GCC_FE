import Image from 'next/image';
import backBtn from '/public/BackPageBtn.svg';

import { useSignUpStore } from '@/store/SignupStore';

export default function BackHeader({ title }: { title: string }) {
  const step = useSignUpStore((state) => state.step);
  const setStep = useSignUpStore((state) => state.setStep);
  const goBack = () => {
    if (step >= 2) {
      setStep(step - 1);
    }
  };
  return (
    <>
      <div className="relative flex h-[56px] w-[100%] items-center justify-center">
        <Image
          src={backBtn}
          alt="뒤로가기"
          className="absolute left-3 h-[24px] w-[24px] cursor-pointer"
          onClick={goBack}
        />
        <p className="text-lg font-semibold">{title}</p>
      </div>
    </>
  );
}

import Image from 'next/image';
import backBtn from '/public/BackPageBtn.svg';

import { useSignUpStore } from '@/store/SignupStore';

export default function BackBtn({ title }: { title: string }) {
  
  const step = useSignUpStore((state)=> state.step)
  const setStep = useSignUpStore((state)=> state.setStep)
  const goBack = () => {
    if(step>=2){
      setStep (step -1)
    }
  }
  return (
    <>
      <div className="h-[56px] flex items-center justify-center relative w-[100%]">
        <Image
          src={backBtn}
          alt="뒤로가기"
          className="absolute left-3 w-[24px] h-[24px] cursor-pointer"
          onClick={goBack}
        />
        <p className="font-semibold">{title}</p>
      </div>
    </>
  );
}

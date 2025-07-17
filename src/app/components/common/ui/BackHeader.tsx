'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
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

  const step = useSignUpStore((state) => state.step);
  const setStep = useSignUpStore((state) => state.setStep);

  const goBack = () => {
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

// import { ChevronLeft } from 'lucide-react';

// import { useSignUpStore } from '@/store/SignupStore';
// import { useRouter } from 'next/navigation';

// export default function BackHeader({ title,useStep,defaultBackPath }: { title: string; useStep?: boolean; // 회원가입처럼 step 로직을 쓸지
//   defaultBackPath?: string; // step === 1 이면 갈 경로 }) {
//   const router = useRouter();
//   const step = useSignUpStore((state) => state.step);
//   const setStep = useSignUpStore((state) => state.setStep);
//   const goBack = () => {
//     if (step === 1) {
//       router.push('/login');
//     } else {
//       setStep(step - 1);
//     }
//   };
//   return (
//     <>
//       <div className="relative flex h-[56px] w-[100%] items-center justify-center px-5">
//         <ChevronLeft
//           className="absolute left-3 h-6 w-6 cursor-pointer"
//           onClick={goBack}
//         />
//         <p className="text-lg font-semibold">{title}</p>
//       </div>
//     </>
//   );
// }

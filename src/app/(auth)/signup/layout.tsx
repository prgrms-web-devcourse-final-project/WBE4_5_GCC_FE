'use client';

import BackHeader from '@/app/components/common/ui/BackHeader';
import NextBtn from '@/app/components/common/ui/NextBtn';

import { useSignUpStore } from '@/store/SignupStore';

// import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const step = useSignUpStore((state) => state.step);
  const setStep = useSignUpStore((state) => state.setStep);

  const name = useSignUpStore((state) => state.name);
  const email = useSignUpStore((state) => state.email);
  const password = useSignUpStore((state) => state.password);
  const wantEmail = useSignUpStore((state) => state.wantEmail);
  const residenceExperience = useSignUpStore(
    (state) => state.residenceExperience,
  );
  const categories = useSignUpStore((state) => state.categories);
  const nickname = useSignUpStore((state) => state.nickname);

  const isNextEnabled = useSignUpStore((state) => state.isNextEnabled);

  const signUpHandler = () => {};

  const goNext = () => {
    if (step < 6) {
      setStep(step + 1);
    }
    if (step === 6) {
      console.log(
        `전송된 정보: name: ${name}, email: ${email}, password: ${password}, wantEmail: ${wantEmail}, experience: ${residenceExperience}, categories: ${categories}, nickname: ${nickname}`,
      );
      signUpHandler();
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <BackHeader title="회원가입" useStep defaultBackPath="/login" />
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

'use client';

import BackHeader from '@/app/components/common/ui/BackHeader';
import NextBtn from '@/app/components/common/ui/NextBtn';
import { useSignUpStore } from '@/store/SignupStore';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { signUp } from '@/api/auth';
import { handleChangeProfile } from '@/api/member';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const step = useSignUpStore((state) => state.step);
  const setStep = useSignUpStore((state) => state.setStep);

  const name = useSignUpStore((state) => state.name);
  const email = useSignUpStore((state) => state.email);
  const password = useSignUpStore((state) => state.password);
  const residenceExperience = useSignUpStore(
    (state) => state.residenceExperience,
  );
  const nickname = useSignUpStore((state) => state.nickname);
  const regionDept1 = useSignUpStore((state) => state.regionDept1);
  const regionDept2 = useSignUpStore((state) => state.regionDept2);
  const regionDept3 = useSignUpStore((state) => state.regionDept3);

  const isNextEnabled = useSignUpStore((state) => state.isNextEnabled);

  const goNext = async () => {
    try {
      if (step === 2) {
        try {
          await signUp(email, password, name);
          setStep(step + 1);
        } catch (err) {
          console.error('❌ 기본정보 입력된 회원가입 실패:', err);
        }
        return;
      }

      if (step === 7) {
        try {
          await handleChangeProfile(
            name,
            nickname,
            residenceExperience,
            regionDept1,
            regionDept2,
            regionDept3,
          );
          router.push('/signup/complete');
        } catch (err) {
          console.error('❌ 추가정보 입력된 최종 회원가입 실패:', err);
        }
        return;
      }

      if (step < 7) {
        setStep(step + 1);
      }
    } catch (error) {
      console.error('❌ 에러 발생:', error);
    }
  };

  const params = useSearchParams();
  useEffect(() => {
    const isSocial = params.get('social');
    if (isSocial === 'true') {
      setStep(4);
    }
  }, [params, setStep]);

  return (
    <div className="flex min-h-screen flex-col">
      {pathname !== '/signup/complete' && (
        <BackHeader title="회원가입" useStep defaultBackPath="/login" />
      )}

      <div>{children}</div>

      {pathname !== '/signup/complete' && (
        <NextBtn
          label={step === 7 ? '가입하기' : '다음'}
          onClick={goNext}
          disabled={!isNextEnabled}
          className={`${isNextEnabled ? 'bg-[#222222]' : 'bg-[#c4c4c4]'}`}
        />
      )}
    </div>
  );
}

'use client';

import BackHeader from '@/app/components/common/ui/BackHeader';
import NextBtn from '@/app/components/common/ui/NextBtn';
import { useFindPwdStore } from '@/store/useFindPwdStore';
import { usePathname, useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isNextEnabled = useFindPwdStore((state) => state.isNextEnabled);

  // 다음 버튼 조건
  const goNext = () => {
    if (!isNextEnabled) return;
    if (pathname === '/find-password') {
      router.push('/find-password/reset');
    } else if (pathname === '/find-password/reset') {
      router.push('/login');
    }
  };

  let label = '다음';
  if (pathname === '/find-password/reset') {
    label = '변경하기';
  }

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <BackHeader title="비밀번호 변경" />
        <div>{children}</div>
        <NextBtn
          label={label}
          onClick={goNext}
          disabled={!isNextEnabled}
          className={`${isNextEnabled ? 'bg-[#222222]' : 'bg-[#c4c4c4]'}`}
        />
      </div>
    </>
  );
}

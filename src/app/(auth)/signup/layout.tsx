'use client';

import BackBtn from '@/app/components/common/BackHeader';

import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 경로에 따른 제목 설정
  const changeTitle = () => {
    if (pathname.includes('/signup/step1')) return '회원가입';
    if (pathname.includes('/signup/step2')) return '이메일 인증';
    if (pathname.includes('/signup/step3')) return '이용약관';
    if (pathname.includes('/signup/step4')) return '닉네임 입력';
    if (pathname.includes('/signup/step5')) return '자취 경력 입력';
    if (pathname.includes('/signup/step6')) return '관심 카테고리 설정';
    return '회원가입';
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <BackBtn title={changeTitle()} />
        {children}
      </div>
    </>
  );
}

'use client';

import BackHeader from '@/app/components/common/ui/BackHeader';
import NextBtn from '@/app/components/common/ui/NextBtn';
import { useFindPwdStore } from '@/store/useFindPwdStore';
import { usePathname, useRouter } from 'next/navigation';
import { handleChangePassword } from '@/api/member';
import AlertMessage from '@/app/components/common/alert/AlertMessage';
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isNextEnabled = useFindPwdStore((state) => state.isNextEnabled);
  const newPassword = useFindPwdStore((state) => state.newPassword);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const goNext = async () => {
    if (!isNextEnabled) return;

    if (pathname === '/find-password') {
      router.push('/find-password/reset');
    } else if (pathname === '/find-password/reset') {
      try {
        await handleChangePassword(newPassword);
        setShowSuccessAlert(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (error) {
        console.error('❌ 비밀번호 재설정 실패:', error);
      }
    }
  };

  // 알림 setTimeout
  useEffect(() => {
    if (showSuccessAlert || showErrorAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert, showErrorAlert]);

  const label = pathname === '/find-password/reset' ? '변경하기' : '다음';

  return (
    <div className="flex min-h-screen flex-col">
      <BackHeader title="비밀번호 재설정" />
      <div>{children}</div>

      {showSuccessAlert && (
        <div className="fixed bottom-[120px] left-0 z-50 flex w-full justify-center">
          <AlertMessage
            type="success"
            message="비밀번호가 성공적으로 변경되었습니다."
          />
        </div>
      )}

      <NextBtn
        label={label}
        onClick={goNext}
        disabled={!isNextEnabled}
        className={` ${isNextEnabled ? 'bg-[#222222]' : 'bg-[#c4c4c4]'}`}
      />
    </div>
  );
}

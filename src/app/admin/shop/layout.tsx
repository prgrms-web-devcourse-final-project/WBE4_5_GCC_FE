'use client';
import BackHeader from '@/app/components/common/ui/BackHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackHeader title="상점 관리" />
      {children}
    </>
  );
}

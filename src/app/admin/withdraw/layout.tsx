'use client';
import BackHeader from '@/app/components/common/ui/BackHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackHeader title="탈퇴 사유 분석" />
      <hr className="h-[0.5px] border-0 bg-[#cccccc]" />
      {children}
    </>
  );
}

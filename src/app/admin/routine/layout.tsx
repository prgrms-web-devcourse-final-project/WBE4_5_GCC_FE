'use client';
import BackHeader from '@/app/components/common/ui/BackHeader';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col">
        <BackHeader title="추천 루틴 관리" />
        <div className="p-[26px]">{children}</div>
      </div>
    </>
  );
}

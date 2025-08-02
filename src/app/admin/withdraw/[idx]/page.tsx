'use client';
import { AdminWithdraw } from '@/api/admin/adminWithdraw';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';

interface Reason {
  reason: string;
  createTime: string;
}

export default function Page() {
  const { idx } = useParams();

  const { data: reasons = [], isLoading } = useQuery<Reason[]>({
    queryKey: ['adminWithdrawReasons'],
    queryFn: AdminWithdraw,
    staleTime: 5 * 60 * 1000,
  });

  const reason = reasons[Number(idx)] || null;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen bg-[var(--white)] px-5 dark:bg-[var(--dark-bg-primary)]">
        <div className="mt-5 mb-3 flex h-[300px] w-full flex-col rounded-[8px] border border-[var(--gray-300)] px-2.5 py-2">
          <p className="my-2 text-xs">
            {reason ? reason.reason : '탈퇴 사유를 불러오는 중입니다...'}
          </p>
          <p className="mt-auto ml-auto text-[10px] text-[var(--gray-500)]">
            {dayjs(reason?.createTime).format('YY.MM.DD')}
          </p>
        </div>
      </div>
    </>
  );
}

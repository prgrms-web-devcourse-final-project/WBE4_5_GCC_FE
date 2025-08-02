'use client';
import { AdminWithdraw } from '@/api/admin/adminWithdraw';
import MultiLineChart from '@/app/components/admin/withdraw/MultiLineChart';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import AlertMessage from '@/app/components/common/alert/AlertMessage';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/app/components/common/ui/LoadingSpinner';

interface Reason {
  reason: string;
  createTime: string;
}

export default function Page() {
  const router = useRouter();
  const [errors, setErrors] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { data: reasons = [], isLoading } = useQuery<Reason[]>({
    queryKey: ['adminWithdrawReasons'],
    queryFn: AdminWithdraw,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen flex-col bg-white px-5 dark:bg-[var(--dark-bg-primary)]">
        <div className="mt-6">
          <MultiLineChart setShowAlert={setShowAlert} setErrors={setErrors} />
        </div>
        <div className="mt-10">
          <p className="text-base font-bold">이런 점이 아쉬웠어요 🥹</p>
          <hr className="my-3 text-[#e0e0e0]" />
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="mb-3 flex max-h-12 cursor-pointer rounded-[8px] border border-[#e0e0e0] px-2.5 py-2"
              onClick={() => router.push(`/admin/withdraw/${idx}`)}
            >
              <p className="mt-2 truncate text-xs">{reason.reason}</p>
              <p className="mt-5 ml-auto text-[10px] text-[#9e9e9e]">
                {dayjs(reason.createTime).format('YY.MM.DD')}
              </p>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="mt-[41px] flex items-center justify-center space-x-[11px]">
          <button className="text-[#222222] dark:text-[var(--dark-gray-700)]">
            <ChevronLeft className="h-3 w-auto" />
          </button>
          <button className="text-[10px] font-medium text-gray-700">1</button>
          <button className="text-[10px] font-medium text-gray-700">2</button>
          <button className="flex h-[17px] w-[18px] items-center justify-center rounded-[3px] bg-[#222222] text-center text-[10px] font-semibold text-white dark:bg-[var(--dark-gray-200)] dark:text-[var(--dark-bg-primary)]">
            3
          </button>
          <button className="text-[#d9d9d9]">
            <ChevronRight className="h-3 w-auto" />
          </button>
        </div>
      </div>
      <div className="fixed top-[160px] right-5 left-5">
        <div className="flex justify-center">
          {showAlert && (
            <AlertMessage type="error" message={errors} className="mb-10" />
          )}
        </div>
      </div>
    </>
  );
}

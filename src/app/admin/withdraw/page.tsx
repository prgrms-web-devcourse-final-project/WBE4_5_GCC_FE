'use client';
import { AdminWithdraw, AdminWithdrawReason } from '@/api/admin/adminWithdraw';
import MultiLineChart from '@/app/components/admin/withdraw/MultiLineChart';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import AlertMessage from '@/app/components/common/alert/AlertMessage';
import { useMutation } from '@tanstack/react-query';

interface Reason {
  reason: string;
  createTime: string;
}

interface WithdrawType {
  withdrawType: string;
  withdrawCount: number;
}

export default function Page() {
  const router = useRouter();
  const [errors, setErrors] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [preDate, setPreDate] = useState<Date | null>(null);
  const [nextDate, setNextDate] = useState<Date | null>(null);

  const [dashboard, setDashboard] = useState<WithdrawType[] | null>(null);
  const [reasons, setReasons] = useState<Reason[]>([]);

  const { mutate: fetchDashboard } = useMutation({
    mutationFn: async ({
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    }) => {
      // 오류남
      // const [withdrawData, reasonData] = await Promise.all([
      //   AdminWithdraw(startDate, endDate),
      //   AdminWithdrawReason(startDate, endDate),
      // ]);
      const res = AdminWithdraw(startDate, endDate);
      return res;
    },
    onSuccess: (withdrawData) => {
      console.log('출금 데이터:', withdrawData);
      // console.log('사유 데이터:', reasonData);
      // setReasons(reasonData);
      setDashboard(withdrawData);
    },
    onError: () => {
      setErrors('대시보드 데이터를 불러오지 못했어요.');
      setShowAlert(true);
    },
  });

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  useEffect(() => {
    const today = new Date();
    const start = dayjs(today).startOf('day').toDate();
    const end = dayjs(today).endOf('day').toDate();

    setPreDate(start);
    setNextDate(end);

    fetchDashboard({
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    });
  }, []);

  // if (isFetchingDashboard) {
  //   return (
  //     <div className="flex h-screen w-full items-center justify-center">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="flex min-h-screen flex-col bg-white px-5 dark:bg-[var(--dark-bg-primary)]">
        <div className="mt-6">
          <MultiLineChart
            setShowAlert={setShowAlert}
            setErrors={setErrors}
            onPreDateChange={(date) => setPreDate(date)}
            onNextDateChange={(date) => setNextDate(date)}
            data={dashboard ?? []}
            onClick={() => {
              if (!preDate || !nextDate) return;
              fetchDashboard({
                startDate: dayjs(preDate).startOf('day').toISOString(),
                endDate: dayjs(nextDate).endOf('day').toISOString(),
              });
            }}
          />
        </div>
        <div className="mt-10">
          <p className="text-base font-bold">이런 점이 아쉬웠어요 🥹</p>
          <hr className="my-3 text-[#e0e0e0]" />

          {reasons.length === 0 ? (
            <div className="flex h-14 items-center justify-center">
              <p className="text-sm text-[#9e9e9e]">조회데이터가 없어요!</p>
            </div>
          ) : (
            reasons.map((reason, idx) =>
              reason ? (
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
              ) : null,
            )
          )}
        </div>

        {/* 페이지네이션 */}
        {/* <div className="mt-[41px] flex items-center justify-center space-x-[11px]">
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
        </div> */}
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

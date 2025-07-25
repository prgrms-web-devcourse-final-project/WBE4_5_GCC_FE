'use client';
import { AdminWithdraw } from '@/api/admin/adminWithdraw';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';

interface Reason {
  reason: string;
  createTime: string;
}

export default function Page() {
  const { idx } = useParams();
  const [reason, setReason] = useState<Reason | null>(null);

  useEffect(() => {
    const fetchWithdraw = async () => {
      try {
        const res = await AdminWithdraw();
        const list: Reason[] = res.data;
        const current = list[Number(idx)];
        setReason(current || null);
      } catch (error) {
        console.error('불러오기 실패', error);
      }
    };
    fetchWithdraw();
  }, [idx]);
  return (
    <>
      <div className="flex min-h-screen bg-white px-5">
        <div className="mt-5 mb-3 flex h-[300px] w-full flex-col rounded-[8px] border border-[#e0e0e0] px-2.5 py-2">
          <p className="my-2 text-xs">
            {reason ? reason.reason : '탈퇴 사유를 불러오는 중입니다...'}
          </p>
          <p className="mt-auto ml-auto text-[10px] text-[#9e9e9e]">
            {dayjs(reason?.createTime).format('YY.MM.DD')}
          </p>
        </div>
      </div>
    </>
  );
}

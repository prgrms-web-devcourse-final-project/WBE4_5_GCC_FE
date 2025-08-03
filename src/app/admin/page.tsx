'use client';
import { useState } from 'react';
import ThreeToggle from '../components/routine/ThreeToggle';
import { useRouter } from 'next/navigation';
import UserLineChart from '../components/admin/UserLineChart';
import AdminCard from '../components/admin/AdminCard';

export default function Page() {
  const [selectedIdx, setSelectedIdx] = useState(1);
  const router = useRouter();
  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-white px-8 dark:bg-[var(--dark-bg-primary)]">
        <ThreeToggle
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
        <div className="flex w-full max-w-md flex-col">
          <div className="mt-7 mb-12 flex">
            <UserLineChart
              labels={{
                uv: '총 회원',
                pv: '신규회원',
                xyz: '방문자',
                abc: '이탈자',
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-[20px]">
            <AdminCard
              title="카테고리 관리"
              description="카테고리 목록을 관리할 수 있어요"
              imageSrc="/images/icons/categoryIcon.svg"
              imageClassName="w-[71px] h-[61px] mt-3"
              onClick={() => router.push('/admin/category')}
            />
            <AdminCard
              title="추천 루틴 관리"
              description="추천 루틴을 등록하고 수정할 수 있어요"
              imageSrc="/images/icons/routineIcon.svg"
              imageClassName="w-[60px] h-[73px] mt-1"
              onClick={() => router.push('/admin/routine')}
            />
            <AdminCard
              title="상점 아이템 관리"
              description="상점에 노출할 아이템을 관리할 수 있어요"
              imageSrc="/images/icons/shopIcon.svg"
              imageClassName="w-[81px] h-[70px] mt-3"
              onClick={() => router.push('/admin/shop')}
            />
            <AdminCard
              title="탈퇴 사유 분석"
              description="탈퇴 사유 현황을 한눈에 볼 수 있어요"
              imageSrc="/images/icons/leaveIcon.svg"
              imageClassName="w-[79px] h-[66px] mt-4"
              onClick={() => router.push('/admin/withdraw')}
            />
          </div>
        </div>
      </div>
    </>
  );
}

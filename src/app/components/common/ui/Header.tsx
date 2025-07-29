'use client';

import Image from 'next/image';
import { Bell } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import logo from '/public/Logo.svg';
import coin from '/public/coin.svg';
import { useUserStore } from '@/store/UserStore';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [openNoti, setOpenNoti] = useState(false);

  const currentPoint = useUserStore((state) => state.points);

  const isHome = pathname === '/';
  const isAdmin = pathname === '/admin';
  const isRoutine = pathname === '/routine';
  const isReport = pathname === '/report';
  const isShop = pathname === '/shop';
  const isMypage = pathname === '/mypage';

  let title = '';
  if (isRoutine) title = '루틴';
  else if (isReport) title = '리포트';
  else if (isShop) title = '상점';
  else if (isMypage) title = '마이페이지';

  const showHeader = isHome || isAdmin || title;

  if (!showHeader) return null;

  return (
    <>
      <div className="fixed top-0 z-50 flex h-[56px] w-full items-center justify-between bg-white px-5 py-[18px] shadow-sm select-none">
        {isHome || isAdmin ? (
          <Image
            src={logo}
            alt="logo"
            width={116}
            onClick={() => router.push('/')}
            className="h-auto cursor-pointer"
            style={{ height: 'auto' }}
          />
        ) : (
          <div className="text-xl font-semibold">{title}</div>
        )}
        {isShop ? (
          <div className="flex items-center space-x-1">
            <Image src={coin} alt="coin" width={14} height={14} />
            <span className="text-[12px] font-semibold text-[#FFB84C]">
              {currentPoint}
            </span>
          </div>
        ) : (
          <Bell
            className="cursor-pointer text-[#222222]"
            size={20}
            onClick={() => setOpenNoti(true)}
          />
        )}
      </div>

      <div
        className="mb-[96px]"
        style={{ marginTop: 'env(safe-area-inset-top)' }}
      />
    </>
  );
}

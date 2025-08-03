'use client';

import { List, BarChart2, User, House, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-[614px] -translate-x-1/2 border-t border-[#e0e0e0] bg-white shadow-md dark:border-t-[var(--dark-bg-secondary)] dark:bg-[var(--dark-bg-primary)]">
      <ul className="flex justify-between px-10 py-4">
        <li>
          <Link
            href="/routine"
            className={`flex flex-col items-center ${
              isActive('/routine')
                ? 'text-[#FFB84C]'
                : 'text-[#222222] dark:text-[var(--dark-gray-700)]'
            }`}
          >
            <List size={32} />
            <span className="mt-2 text-sm dark:text-[var(--dark-gray-700)]">
              루틴
            </span>
          </Link>
        </li>

        <li>
          <Link
            href="/report"
            className={`flex flex-col items-center ${
              isActive('/report')
                ? 'text-[#FFB84C]'
                : 'text-[#222222] dark:text-[var(--dark-gray-700)]'
            }`}
          >
            <BarChart2 size={32} />
            <span className="mt-2 text-sm dark:text-[var(--dark-gray-700)]">
              리포트
            </span>
          </Link>
        </li>

        <li>
          <Link
            href="/home"
            aria-label="홈"
            className="relative -mt-10 flex h-22 w-22 items-center justify-center rounded-full bg-[#FFB84C] text-white shadow-lg dark:text-[var(--dark-bg-primary)]"
          >
            <House size={40} />
          </Link>
        </li>

        <li>
          <Link
            href="/shop"
            className={`flex flex-col items-center ${
              isActive('/shop')
                ? 'text-[#FFB84C]'
                : 'text-[#222222] dark:text-[var(--dark-gray-700)]'
            }`}
          >
            <ShoppingCart size={32} />
            <span className="mt-2 text-sm dark:text-[var(--dark-gray-700)]">
              상점
            </span>
          </Link>
        </li>

        <li>
          <Link
            href="/mypage"
            className={`flex flex-col items-center ${
              isActive('/mypage')
                ? 'text-[#FFB84C]'
                : 'text-[#222222] dark:text-[var(--dark-gray-700)]'
            }`}
          >
            <User size={32} />
            <span className="mt-2 text-sm dark:text-[var(--dark-gray-700)]">
              프로필
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

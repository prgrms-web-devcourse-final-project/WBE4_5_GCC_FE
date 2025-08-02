import { House, List, BarChart2, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';

export default function BottomNav() {
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-[#e0e0e0] bg-white shadow-md dark:border-[var(--dark-bg-tertiary)] dark:bg-[var(--dark-bg-primary)]">
      <ul className="mx-auto flex max-w-md justify-between px-6 py-3">
        <li>
          <Link
            href="/routine"
            className="flex flex-col items-center text-[#222222] hover:text-[#ffb84c] active:text-[#ffb84c] dark:text-[var(--dark-gray-700)]"
          >
            <List size={24} />
            <span className="mt-1 text-xs">루틴</span>
          </Link>
        </li>

        <li>
          <Link
            href="/report"
            className="flex flex-col items-center text-[#222222] hover:text-[#ffb84c] active:text-[#ffb84c] dark:text-[var(--dark-gray-700)]"
          >
            <BarChart2 size={24} />
            <span className="mt-1 text-xs">리포트</span>
          </Link>
        </li>

        <li>
          <Link
            href="/"
            className="relative -mt-8 flex h-18 w-18 items-center justify-center rounded-full bg-[#ffb84c] text-white shadow-lg hover:bg-[#FFE29A] active:bg-[#FFE29A] dark:text-[var(--dark-bg-primary)]"
            aria-label="홈"
          >
            <House size={32} />
          </Link>
        </li>

        <li>
          <Link
            href="/shop"
            className="flex flex-col items-center text-[#222222] hover:text-[#ffb84c] active:text-[#ffb84c] dark:text-[var(--dark-gray-700)]"
          >
            <ShoppingCart size={24} />
            <span className="mt-1 text-xs">상점</span>
          </Link>
        </li>

        <li>
          <Link
            href="/mypage"
            className="flex flex-col items-center text-[#222222] hover:text-[#ffb84c] active:text-[#ffb84c] dark:text-[var(--dark-gray-700)]"
          >
            <User size={24} />
            <span className="mt-1 text-xs">프로필</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

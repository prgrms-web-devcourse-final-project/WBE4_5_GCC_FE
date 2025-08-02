import { List, BarChart2, User, Home, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0e0e0] shadow-md z-50">
      <ul className="mx-auto flex max-w-md justify-between px-6 py-3">
        <li>
          <Link href="/routine" className="flex flex-col items-center text-[#222222] hover:text-[#FFB84C] active:text-[#FFB84C]">
            <List size={24} />
            <span className="text-xs mt-1">루틴</span>
          </Link>
        </li>

        <li>
          <Link href="/report" className="flex flex-col items-center text-[#222222] hover:text-[#FFB84C] active:text-[#FFB84C]">
            <BarChart2 size={24} />
            <span className="text-xs mt-1">리포트</span>
          </Link>
        </li>

        <li>
          <Link
            href="/"
            className="relative -mt-8 flex h-18 w-18 items-center justify-center rounded-full bg-[#FFB84C] text-white shadow-lg hover:bg-[#FFE29A] active:bg-[#FFE29A]"
            aria-label="홈"
          >
            <House size={32} />
          </Link>
        </li>

        <li>
          <Link href="/shop" className="flex flex-col items-center text-[#222222] hover:text-[#FFB84C] active:text-[#FFB84C]">
            <ShoppingCart size={24} />
            <span className="text-xs mt-1">상점</span>
          </Link>
        </li>

        <li>
          <Link href="/mypage" className="flex flex-col items-center text-[#222222] hover:text-[#FFB84C] active:text-[#FFB84C]">
            <User size={24} />
            <span className="text-xs mt-1">프로필</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
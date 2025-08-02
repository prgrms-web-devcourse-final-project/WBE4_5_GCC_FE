import { List, BarChart2, User, Home, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[480px] rounded-full bg-[#FFB84C]/15 backdrop-blur-md shadow-lg px-10 py-4">
      <ul className="flex justify-between items-center">
        <NavItem href="/routine" icon={<List size={24} />} label="루틴" />
        <NavItem href="/report" icon={<BarChart2 size={24} />} label="리포트" />
        <NavItem href="/" icon={<Home size={24} />} label="홈" active />
        <NavItem href="/shop" icon={<ShoppingCart size={24} />} label="상점" />
        <NavItem href="/mypage" icon={<User size={24} />} label="프로필" />
      </ul>
    </nav>
  );
}

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex flex-col items-center text-sm transition-all ${active ? 'text-[#FFB84C] font-semibold' : 'text-[#616161]/40'
          }`}
      >
        {icon}
        <span className="mt-1">{label}</span>
      </Link>
    </li>
  );
}

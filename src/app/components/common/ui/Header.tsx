'use client';
import Image from 'next/image';
import logo from '/public/Logo.svg';
import bell from '/public/bell.svg';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const showHeader = !pathname.startsWith('/signup');
  return (
    <>
      {showHeader && (
        <div className="flex w-full items-center justify-between py-[18px]">
          <Image src={logo} alt="logo" width={116} height={28} />
          <Image src={bell} alt="bell" width={20} height={20} />
        </div>
      )}
    </>
  );
}

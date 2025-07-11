'use client';
import Image from 'next/image';
import logo from '/public/Logo.svg';
import bell from '/public/bell.svg';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const showHeader = !(
    pathname.startsWith('/signup') || pathname.startsWith('/login')
  );
  return (
    <>
      {showHeader && (
        <div className="flex w-full items-center justify-between px-5 py-[18px]">
          <Image
            src={logo}
            alt="logo"
            width={116}
            //height={28}
            onClick={() => router.push('/')}
            className="h-auto" // Image Warning
          />
          <Image src={bell} alt="bell" width={20} height={20} />
        </div>
      )}
    </>
  );
}

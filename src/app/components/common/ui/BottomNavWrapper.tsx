'use client';

import { usePathname } from 'next/navigation';
import BottomNav from './BottomNav';

export default function BottomNavWrapper() {
  const pathname = usePathname();

  const isHidden =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/signup/complete');

  if (isHidden) return null;

  return <BottomNav />;
}
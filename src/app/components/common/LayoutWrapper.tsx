'use client';

import { usePathname } from 'next/navigation';
import { useUIStore } from '@/store/uiStore';
import Header from './ui/Header';
import BottomNav from './ui/BottomNav';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isBottomSheetOpen = useUIStore((state) => state.isBottomSheetOpen);
  const isCalendarBottomSheetOpen = useUIStore(
    (state) => state.isCalendarBottomSheetOpen,
  );

  const hiddenBottomNavRoutes = [
    '/login',
    '/find-password',
    '/signup',
    '/signup/complete',
    '/find-password/reset',
    '/collection',
    // '/admin',
  ];

  const isMypageSubRoute =
    pathname.startsWith('/mypage/') && pathname !== '/mypage';

  const isAdminSubRoute =
    pathname.startsWith('/admin/') && pathname !== '/admin';

  const showBottomNav =
    !hiddenBottomNavRoutes.includes(pathname) &&
    !isBottomSheetOpen &&
    !isCalendarBottomSheetOpen &&
    !isMypageSubRoute &&
    !isAdminSubRoute;

  return (
    <>
      <div className="mx-auto max-w-[640px] border-[var(--gray-300)]">
        <Header />
        <main className="bg-[#F8F5F1] dark:bg-[var(--dark-bg-secondary)]">
          {children}
        </main>
        {showBottomNav && <BottomNav />}
      </div>
    </>
  );
}
